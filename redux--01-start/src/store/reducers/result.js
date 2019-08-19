import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return updateObject(state, {results: state.results.concat({id: new Date(), value: action.result})});
        case actionTypes.DELETE_RESULT:
            //const id = 2;
            //const updatedArray = [...state.results];
            //updatedArray.splice(id, 2);
            const updatedArray = state.results.filter(result => result.id !== action.resultElementId);
            return updateObject(state, {results: updatedArray});
    }
    return state;
};

export default reducer;