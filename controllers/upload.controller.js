// uploadController.js
import supabase from "../config/supabase.js";
import sharp from "sharp";

export const uploadImage = async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ error: "No file uploaded" });

        let { resize, compress } = req.body;

        // Parse resize if provided
        if (resize) {
            try {
                resize = JSON.parse(resize);
            } catch {
                resize = resize;
            }
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/avif",
            "image/gif",
        ];
        if (!allowedTypes.includes(req.file.mimetype)) {
            return res.status(400).json({ error: "Unsupported file type" });
        }

        let buffer = req.file.buffer;
        let image = sharp(buffer);

        // Resize if requested
        if (resize?.width && resize?.height) {
            image = image.resize(resize.width, resize.height);
        }

        // Compress based on type
        if (compress === "true") {
            const type = req.file.mimetype;

            if (type === "image/jpeg") image = image.jpeg({ quality: 70 });
            else if (type === "image/png")
                image = image.png({ compressionLevel: 8 });
            else if (type === "image/webp") image = image.webp({ quality: 70 });
            else if (type === "image/avif") image = image.avif({ quality: 50 });
            else if (type === "image/gif")
                console.warn("GIF compression skipped");
        }

        const processedBuffer = await image.toBuffer();

        // Upload to Supabase
        const fileName = `${Date.now()}_${req.file.originalname}`;
        const { data, error } = await supabase.storage
            .from("images")
            .upload(fileName, processedBuffer, {
                contentType: req.file.mimetype,
                cacheControl: "3600",
                upsert: false,
            });

        if (error) throw error;

        const publicURL = supabase.storage.from("images").getPublicUrl(fileName)
            .data.publicUrl;

        // Insert metadata into table
        const { data: imageRecord, error: imageInsertionErr } = await supabase
            .from("images")
            .insert([
                {
                    filename: req.file.originalname,
                    public_url: publicURL,
                    dimensions: resize || null,
                    is_compressed: compress === "true",
                },
            ])
            .select()
            .single();

        if (imageInsertionErr) throw imageInsertionErr;

        res.json({ status: "success", image: imageRecord });
    } catch (err) {
        console.error(err);
        return next(err);
    }
};

const uploadController = { uploadImage };

export default uploadController;
