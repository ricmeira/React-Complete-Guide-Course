import * as actionTypes from './actionsTypes';

export const saveResult = ( result ) => {
    return {
        type: actionTypes.STORE_RESULT,
        result: result
    }
};

export const store_result = (result) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(saveResult(result));
        }, 2000);
    };
};

export const delete_result = (id) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElementId: id
    }
};