import { useEffect, useState } from "react";

const useGetFetch = <T,>(url:string) => {
    const [ data, setData ] = useState<T | null>(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState("");

    const fetchData = async () => {
        try {
            setLoading(true);
    
            const response = await fetch(url);
    
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
    
            const data = await response.json();
    
            setData(data);

    
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
    
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [url])

    return { data, loading, error} 
}

export default useGetFetch;