import supabase from "../config/supabase.js";

const getAllImages = async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from("images")
            .select("*")
            .is("delete_date", null);

        if (error) throw error;

        res.status(200).json({ status: "success", images: data });
    } catch (err) {
        console.log(err);
        return next(err);
    }
};

const softDeleteImage = async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from("images")
            .update({ delete_date: new Date() })
            .eq("id", req.params.id)
            .select()
            .single();

        if (!data)
            return res.status(404).json({
                status: "fail",
                msg: `Can't find an image with ID: ${req.params.id}`,
            });

        if (error) throw error;

        res.status(200).json({
            status: "success",
            msg: "Image got soft deleted successfully.",
            image: data,
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }
};

const deleteImage = async (req, res, next) => {
    try {
        // Fetch the image record first
        const { data: image, error: fetchError } = await supabase
            .from("images")
            .select("*")
            .eq("id", req.params.id)
            .single();

        if (fetchError) throw fetchError;
        if (!image) {
            return res.status(404).json({
                status: "fail",
                msg: `Can't find an image with ID: ${req.params.id}`,
            });
        }

        // Delete the file from Supabase bucket
        const fileName = image.public_url.split("/").pop();
        const { error: deleteFileError } = await supabase.storage
            .from("images")
            .remove([fileName]);

        if (deleteFileError) throw deleteFileError;

        // Delete the DB record
        const { data: deletedData, error: deleteDBError } = await supabase
            .from("images")
            .delete()
            .eq("id", req.params.id)
            .select()
            .single();

        if (deleteDBError) throw deleteDBError;

        res.status(200).json({
            status: "success",
            msg: "Image deleted successfully (file + record).",
            image: deletedData,
        });
    } catch (err) {
        console.error(err);
        return next(err);
    }
};

const imagesController = { getAllImages, softDeleteImage, deleteImage };

export default imagesController;
