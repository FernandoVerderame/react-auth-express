// Importo lo style del Form, l'icona, la PostCard e lo useState
import { useState } from 'react';
import { useGlobal } from '../../contexts/GlobalContext';
import formStyle from './Form.module.scss';

const Form = ({ initialData, onSubmit }) => {

    const { tags, categories } = useGlobal();

    // Post di default
    const defaultPostData = initialData || {
        title: '',
        image: '',
        content: '',
        categoryId: '',
        tags: [],
        published: false
    }


    // useState del singolo nuovo Post
    const [postData, setPostData] = useState(defaultPostData);

    // Campo dei Tags
    const handleField = (name, value) => {

        setPostData(curr => ({
            ...curr,
            [name]: value
        }));
    }

    // Submit del Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(postData);
    }

    // // Rimozione di un Post
    // const removePost = (indexToDelete) => {
    //     setPosts(array => array.filter((_, i) => i !== indexToDelete));
    // }

    // Update del Post
    const changePostData = (key, newValue) => {
        setPostData(data => ({ ...data, [key]: newValue }));
    }

    return (
        <>
            {/* Form Card */}
            <div className={formStyle.cardForm}>

                {/* Card Title */}
                <div className={formStyle.cardTitle}>
                    <h3>Creazione Post</h3>
                </div>

                {/* Card Body */}
                <div className={formStyle.cardBody}>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>

                        <div className="row">
                            <div className="col-6">
                                {/* Input Title */}
                                <div className={formStyle.cardInput}>
                                    <label htmlFor="title" className="h4">Titolo</label>
                                    <input
                                        type="text"
                                        id='title'
                                        name='title'
                                        value={postData.title}
                                        onChange={(e) => changePostData('title', e.target.value)}
                                    />
                                </div>

                                {/* Input Image */}
                                <div className={formStyle.cardInput}>
                                    <label htmlFor="image" className="h4">URL Immagine</label>
                                    <input
                                        type="url"
                                        id='image'
                                        name='image'
                                        value={postData.image}
                                        onChange={(e) => changePostData('image', e.target.value)}
                                    />
                                </div>

                                {/* Input Content */}
                                <div className={formStyle.cardInput}>
                                    <label htmlFor="content" className="h4">Content</label>
                                    <textarea
                                        id='content'
                                        name='content'
                                        rows='5'
                                        value={postData.content}
                                        onChange={(e) => changePostData('content', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="col-6">
                                {/* Input Category */}
                                <div className="mb-3">
                                    <h3 className="h4">Categoria</h3>
                                    <select
                                        id="categoryId"
                                        name="categoryId"
                                        defaultValue={postData.categoryId}
                                        onChange={(e) => changePostData('categoryId', Number(e.target.value))}
                                        className={formStyle.categorySelect}
                                    >
                                        <option value="">Seleziona una categoria</option>
                                        {categories.map(c => (
                                            <option
                                                key={`categoryId${c.id}`}
                                                value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Input Tags */}
                                <div className="mb-5">
                                    <h3 className="h4">Tags</h3>
                                    <ul>
                                        {tags.map(({ id, name }, i) => (
                                            <li key={`tag-${i}`}>
                                                <input
                                                    type='checkbox'
                                                    checked={postData.tags.includes(id)}
                                                    onChange={() => {
                                                        const curr = postData.tags;
                                                        const newTags = curr.includes(id) ?
                                                            curr.filter(el => el !== id) :
                                                            [...curr, id];
                                                        handleField('tags', newTags);
                                                    }}
                                                />
                                                <label>{name}</label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={formStyle.cardBtn}>

                                    {/* Input Published */}
                                    <div className={formStyle.published}>
                                        <label htmlFor="published">Pubblicato</label>
                                        <input
                                            id='published'
                                            name='published'
                                            type='checkbox'
                                            checked={postData['published']}
                                            onChange={(e) => handleField('published', e.target.checked)}
                                        />
                                    </div>
                                    <button className='btn btn-success'>Salva</button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div >
        </>
    );
}

export default Form;