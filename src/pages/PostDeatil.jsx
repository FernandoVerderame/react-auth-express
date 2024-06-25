import axios from "../utils/axiosClient.js";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard/PostCard";

const PostDeatil = () => {

    const navigate = useNavigate();

    const { slug } = useParams();
    const [post, setPost] = useState(null);

    const fetchPost = async () => {
        try {
            const res = await axios.get(`/posts/${slug}`);
            const newPost = res.data;
            setPost(newPost);
        } catch (error) {
            console.error("Errore nel recupero del post:", error);
        }
    };

    useEffect(() => {
        fetchPost();
        return () => {
            setPost(null);
        };
    }, [slug]);

    const deletePost = async slug => {
        await axios.delete(`${apiUrl}/posts/${slug}`);
        navigate('/posts');
    }

    return (
        <section className="container my-4">
            <PostCard
                isShow={true}
                title={post?.title}
                slug={post?.slug}
                image={post?.image}
                tags={post?.tags}
                content={post?.content}
                category={post?.category}
                user={post?.user}
                onDelete={deletePost}
            />
            <button
                onClick={() => { navigate(-1) }}
                className="btn btn-secondary mt-4"
            >
                Torna indietro
            </button>
        </section>
    );
}

export default PostDeatil;
