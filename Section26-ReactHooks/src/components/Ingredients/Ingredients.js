import React, { useReducer, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
  switch(action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Error');
  }
};

const httpReducer = (httpState, action) => {
  switch(action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { ...httpState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.errorMsg };
    case 'CLEAR':
      return { ...httpState, error: null };
    default:
      throw new Error('Error');
  }
};

const Ingredients = () => {
  const [ ingredients, dispatch ] = useReducer(ingredientReducer, []);
  const [ httpState, dispatchHttp ] = useReducer(httpReducer, { loading: false, error: null });
  //const [ ingredients, setIngredients ] = useState([]);
  //const [ isLoading, setIsLoading ] = useState(false);
  //const [ error, setError ] = useState();

  const filteredIngredientsHandler = useCallback(filteredIngredients =>{
    //setIngredients(filteredIngredients);
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients,
    });
  }, []);

  const addIngredientHandler = useCallback(ingredient => {
    //setIsLoading(true);
    dispatchHttp({ type: 'SEND'});
    fetch('https://react-hooks-course-e1cc5.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      //setIsLoading(false);
      dispatchHttp({ type: 'RESPONSE'});
      return response.json();
    }).then(responseData => {
      /*setIngredients(prevIngredients => [
        ...prevIngredients,
        {id: responseData.name, ...ingredient}
      ]);*/
      dispatch({type: 'ADD', ingredient: {id: responseData.name, ...ingredient}});
    });
  }, []);

  const removeIngredientHandler = useCallback(id => {
    //setIsLoading(true);
    dispatchHttp({ type: 'SEND'});
    fetch(`https://react-hooks-course-e1cc5.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    }).then(response => {
      dispatchHttp({ type: 'RESPONSE'});
      // setIngredients(prevIngredients => prevIngredients.filter(ingr => ingr.id !== id));
      dispatch({type: 'DELETE', id});
    }).catch(err => {
      //setError('Something went wrong!');
      //setLoading(false);
      dispatchHttp({ type: 'ERROR', errorMsg: 'Something went wrong!' });
    });
  }, []);

  const clearError = useCallback(() => {
    dispatchHttp({ type: 'CLEAR'});
  }, []);

  const ingredientList = useMemo(() => <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler}/>, [ ingredients, removeIngredientHandler ]);

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
