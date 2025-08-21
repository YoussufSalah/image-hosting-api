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
        const { data, error } = await supabase
            .from("images")
            .delete()
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
            msg: "Image got deleted successfully.",
            image: data,
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }
};

const imagesController = { getAllImages, softDeleteImage, deleteImage };

export default imagesController;
