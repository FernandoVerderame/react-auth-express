import axios from "axios";
import PostForm from "../components/Form/Form.jsx";
import { Link, useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_BASE_API_URL;

const CreatePost = () => {

    const navigate = useNavigate();

    const createPost = async formData => {
        const res = await axios.post(`${apiUrl}/posts`, formData);

        if (res.status < 400) {
            navigate(`/posts/${res.data.slug}`);
        }
    }

    return (
        <section id="form" className="d-flex align-items-center flex-column mt-5">
            <PostForm
                onSubmit={createPost}
            />
            <Link to="../" relative="path" className="btn btn-secondary">Torna indietro</Link>
        </section>
    );
}

export default CreatePost;