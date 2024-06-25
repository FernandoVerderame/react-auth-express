import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostCard from "../components/PostCard/PostCard";

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const PostDeatil = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);

    const fetchPost = async () => {
        try {
            const res = await axios.get(`${apiUrl}/posts/${slug}`);
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
    }, []);

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
            />
            <Link to={`/posts/${slug}/edit`} className="btn btn-warning mt-4">Modifica</Link>
        </section>
    );
}

export default PostDeatil;
