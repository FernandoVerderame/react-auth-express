import postCardStyle from './PostCard.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const PostCard = ({ title, content, image, category, tags, slug, isShow, user }) => {
    const navigate = useNavigate();

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

    return (
        <div className={postCardStyle.postCard}>
            <div className={postCardStyle.image}>
                <img src={image ? image : "https://placehold.co/600x400"} alt={title} className={postCardStyle.img} />
                {isShow && (
                    <div className={postCardStyle.category}>
                        <strong>{category?.name}</strong>
                    </div>
                )}
            </div>

            <div className={postCardStyle.bottom}>
                <h3 className="h5">{title}</h3>
                <p className={postCardStyle.paragraph}>{abstract()}</p>
                <div className={postCardStyle.dFlex}>
                    {isShow ? (
                        <button
                            onClick={() => { navigate(-1) }}
                            className={postCardStyle.btn}
                            style={{ backgroundColor: 'gray' }}
                        >
                            Torna indietro
                        </button>
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
