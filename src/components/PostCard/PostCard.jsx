import { useAuth } from '../../contexts/AuthContext';
import postCardStyle from './PostCard.module.scss';
import { Link } from 'react-router-dom';
import { MdDelete as DeleteBtn } from "react-icons/md";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import { useEffect, useRef, useState } from 'react';

const PostCard = ({ title, content, image, category, tags, slug, isShow, user, onDelete }) => {

    const [deleteMode, setDeleteMode] = useState(false);

    const dialogRef = useRef();

    useEffect(() => {
        if (deleteMode) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [deleteMode]);

    const deletePost = async () => {
        await onDelete(slug);
        setDeleteMode(false);
    }

    const tagColors = {
        Action: '#FF1A1A',
        Adventure: '#6A2F93',
        RPG: '#09A4DE',
        FPS: '#089854',
        MOBA: '#FF5C17',
        'Open World': '#A56E63',
        Strategy: '#FF4F8D',
        Multiplayer: '#087F7A',
        Simulation: '#0809F8',
        Esports: '#4ACBB7'
    };

    const abstract = () => content ? content.slice(0, 60) + '...' : '';

    const { isLoggedIn } = useAuth();

    return (
        <div className={postCardStyle.postCard}>

            {/* DeleteBtn */}
            <dialog ref={dialogRef}>
                <div className="d-flex justify-content-between align-items-center">
                    <h3>Sei sicuro?</h3>
                    <CloseIcon onClick={() => setDeleteMode(false)} role='button' />
                </div>
                <p>Se procedi, eliminerai definitivamente il post con titolo: "{title}".</p>
                <button onClick={deletePost} className="btn btn-danger">Elimina Pizza</button>
            </dialog>

            <div className={postCardStyle.image}>
                <img src={image ? image : "https://placehold.co/600x400"} alt={title} className={postCardStyle.img} />
                {isShow && (
                    <div className={postCardStyle.category}>
                        <strong>{category?.name}</strong>
                    </div>
                )}
            </div>

            <div className={postCardStyle.bottom}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="h5">{title}</h3>
                    {isLoggedIn && <DeleteBtn onClick={() => setDeleteMode(true)} className="fs-4" />}
                </div>
                <p className={postCardStyle.paragraph}>{abstract()}</p>
                <div className={postCardStyle.dFlex}>

                    {isShow ? (
                        <Link to={`/posts/${slug}/edit`} className="btn btn-warning mt-4">
                            Modifica
                        </Link>
                    ) : (
                        <Link to={`/posts/${slug}`} className={postCardStyle.btn}>
                            Leggi di più
                        </Link>
                    )}

                    {tags?.length > 0 ? (
                        <div>
                            <ul className={postCardStyle.tags}>
                                {tags.map((tag, i) => (
                                    <li key={`tag-${i}`} style={{ backgroundColor: tagColors[tag.name] || '#ccc' }} className={postCardStyle.postBadge}>
                                        {tag.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>Nessun tag</p>
                    )}
                </div>
                <p className="mt-3 mb-0 fst-italic text-center">{user?.name}</p>
            </div>
        </div>
    );
}

export default PostCard;
