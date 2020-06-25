import { useReducer, useCallback } from 'react';

const httpReducer = (httpState, action) => {
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null, data: null };
        case 'RESPONSE':
            return { ...httpState, loading: false, data: action.data };
        case 'ERROR':
            return { loading: false, error: action.errorMsg };
        case 'CLEAR':
            return { ...httpState, error: null };
        default:
            throw new Error('Error');
    }
};


const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null, data: null });

    const sendRequest = useCallback((url, method, body) => {
        dispatchHttp({ type: 'SEND'});

        fetch(url, {
            method,
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
            // setIngredients(prevIngredients => prevIngredients.filter(ingr => ingr.id !== id));
        }).then(responseData => {
            dispatchHttp({ type: 'RESPONSE', data: responseData });
        }).catch(err => {
            //setError('Something went wrong!');
            //setLoading(false);
            dispatchHttp({ type: 'ERROR', errorMsg: 'Something went wrong!' });
        });
    }, []);

    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest
    };
};

export default useHttp;