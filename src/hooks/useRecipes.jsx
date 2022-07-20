import { useState, useEffect } from 'react';
import axios from 'axios';

function useRecipes() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("https://recipe-box-master-api.herokuapp.com/").then(res => {
            setIsLoaded(true);
            setData(res.data);
            console.log("api hit")
        })
            .catch(error => {
                setIsLoaded(true);
                setError(error);
            })
    }, []);

    return {
        isLoaded,
        error,
        data,
    }
}

export { useRecipes }