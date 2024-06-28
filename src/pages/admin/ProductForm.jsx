import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productSchema from "../../schemaValid/productSchema";
import { useForm } from "react-hook-form";
import { ProductContext } from "../../contexts/productContext";
import instance from "../../axios";

const ProductForm = () => {
    const { id } = useParams();
    const { dispatch } = useContext(ProductContext);
    const navigate = useNavigate();
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    const [thumbnailOption, setThumbnailOption] = useState("giữ");

    const { register, formState: { errors }, handleSubmit, reset } = useForm({
        resolver: zodResolver(productSchema)
    });

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const { data } = await instance.get(`/products/${id}`);
                    reset(data);
                    setThumbnailUrl(data.thumbnail);
                } catch (error) {
                    console.error(error);
                }
            })();
        }
    }, [id, reset]);

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        return data.secure_url;
    };

    const onSubmit = async (formData) => {
        try {
            let updatedProduct = {
                ...formData
             }
            if (thumbnailOption === "tải lên" && formData.thumbnail && formData.thumbnail[0]) {
                const thumbnailUrl = await uploadImage(formData.thumbnail[0]);
                updatedProduct = { ...updatedProduct, thumbnail: thumbnailUrl };
            }

            if (id) {
                const res = await instance.patch(`/products/${id}`, updatedProduct);
                dispatch({ type: "UPDATE_PRODUCTS", payload: res.data });
            } else {
                const res = await instance.post("/products", updatedProduct);
                dispatch({ type: "ADD_PRODUCTS", payload: res.data });
            }

            navigate("/admin");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>{id ? "Chỉnh Sửa Sản Phẩm" : "Thêm Sản Phẩm"}</h1>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Tiêu Đề</label>
                <input type="text" className="form-control" id="title" {...register("title")} />
                {errors.title && <p className="text-danger">{errors.title.message}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Giá</label>
                <input type="number" className="form-control" id="price" {...register("price")} />
                {errors.price && <p className="text-danger">{errors.price.message}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Mô Tả</label>
                <input type="text" className="form-control" id="description" {...register("description")} />
                {errors.description && <p className="text-danger">{errors.description.message}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="thumbnailOption" className="form-label">Chọn Tùy Chọn Thumbnail</label>
                <select
                    className="form-control"
                    id="thumbnailOption"
                    value={thumbnailOption}
                    onChange={(e) => setThumbnailOption(e.target.value)}
                >
                    <option value="giữ">Giữ Thumbnail Hiện Tại</option>
                    <option value="link">Thêm Thumbnail từ Link</option>
                    <option value="tải lên">Tải Lên Thumbnail từ Máy Tính</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
                {thumbnailOption === "link" && (
                    <input type="text" className="form-control" id="thumbnail" {...register("thumbnail")} />
                )}
                {thumbnailOption === "tải lên" && (
                    <input type="file" className="form-control" id="thumbnail" {...register("thumbnail", { required: true })} />
                )}
                {errors.thumbnail && <p className="text-danger">{errors.thumbnail.message}</p>}
                {thumbnailUrl && (
                    <img src={thumbnailUrl} alt="Thumbnail Sản Phẩm" style={{ maxWidth: "200px", marginTop: "10px" }} />
                )}
            </div>
            <div className="mb-3">
                <button className="btn btn-primary w-100" type="submit">
                    {id ? "Chỉnh Sửa Sản Phẩm" : "Thêm Sản Phẩm"}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
