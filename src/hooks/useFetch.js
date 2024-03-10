import { useCallback, useEffect, useRef, useState } from "react";
import api from "@/services/api";

const useFetch = (
    url,
    { extractKey, params, autoFetchOnce } = {
        extractKey: undefined,
        autoFetchOnce: false,
    }
) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const cacheData = useRef({});

    const fetchURL= useCallback(async function (id, callback) {
        let responseData = null;
        try {
            let apiUrl = url;
            if (id) {
                apiUrl = apiUrl + `/${id}`;
            }

            if (loading) return;
            Object.keys(cacheData)?.length <= 0 && setLoading(true);

            // check cache for already fetch data
            if (cacheData.current?.[id]) {
                responseData = cacheData.current?.[id];
                return setData(cacheData.current?.[id]);
            }

            const apiData = await api.get(apiUrl, {
                params: params,
            });
            responseData = extractKey ? apiData[extractKey] : apiData;

            if (id) {
                cacheData.current[id] = responseData;
            }

            setData(responseData);
            return responseData;
        } catch (error) {
            console.error(error);
            setError(error?.message || "An error occurred");
        } finally {
            // console.log("Loading false...")
            typeof callback === "function" && (await callback(responseData));
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, extractKey, url])

    useEffect(() => {
        if (autoFetchOnce) {
            fetchURL();
        }
    }, [autoFetchOnce, fetchURL]);

    return [data, loading, {fetchURL, setData, error}];
};

export default useFetch;
