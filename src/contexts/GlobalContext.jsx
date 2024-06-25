import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_BASE_API_URL;

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchData = async () => {
        const { data: tagsData } = await axios.get(`${apiUrl}/tags`);
        const { data: categoriesData } = await axios.get(`${apiUrl}/categories`);
        setTags(tagsData);
        setCategories(categoriesData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <GlobalContext.Provider value={{
            tags,
            categories
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobal = () => {
    const value = useContext(GlobalContext);

    if (value === undefined) {
        throw new Error('Non sei dentro al Global Provider!');
    }
    return value;
}

export { GlobalProvider, useGlobal }