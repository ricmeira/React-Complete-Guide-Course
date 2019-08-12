import * as actionTypes from '../actions';

const initialState = {
    persons: []
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_PERSON:
            return {
                persons: state.persons.concat(action.person)
            }
        case actionTypes.DELETE_PERSON:
            const updatedArray = state.persons.filter(person => person.id !== action.personId);
            return {
                persons: updatedArray
            }
    }
    return state;
}

export default reducer;