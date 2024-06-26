import axios from "../utils/axiosClient.js";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/Form/Form.jsx";

const EditPost = () => {

    const { slug } = useParams();

    const navigate = useNavigate();

    const [dataToEdit, setDataToEdit] = useState(null);

    const fetchDataToEdit = async () => {
        const url = `/posts/${slug}`;
        const { data: p } = await axios.get(url);
        setDataToEdit({
            title: p.title,
            image: p.image,
            content: p.content,
            categoryId: p.categoryId,
            tags: p.tags.map(t => t.id),
            published: p.published
        });
    }

    useEffect(() => {
        fetchDataToEdit();
        return () => {
            setDataToEdit(null);
        }
    }, [slug]);

    const updatePost = async formData => {
        const res = await axios.put(`/posts/${slug}`, formData);

        if (res.status < 400) {
            navigate(`/posts/${res.data.slug}`);
        }
    }

    return (
        <>
            <section id="form" className="d-flex align-items-center flex-column mt-5">
                {dataToEdit === null ?
                    <div>Loading...</div>
                    :
                    <PostForm
                        initialData={dataToEdit}
                        onSubmit={updatePost}
                    />
                }
                <Link to="../" relative="path" className="btn btn-secondary">Annulla</Link>
            </section>
        </>
    );
}

export default EditPost;