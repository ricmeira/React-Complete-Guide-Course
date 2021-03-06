import React, { useReducer, useCallback, useMemo, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';

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

const Ingredients = () => {
  const [ ingredients, dispatch ] = useReducer(ingredientReducer, []);
  const { isLoading, error, data, reqExtra, reqIdentifier, sendRequest, clear } = useHttp();
  //const [ ingredients, setIngredients ] = useState([]);
  //const [ isLoading, setIsLoading ] = useState(false);
  //const [ error, setError ] = useState();

  useEffect(() => {
    if(!isLoading && reqIdentifier === 'REMOVE_INGREDIENT') {
      dispatch({ type: 'DELETE', id: reqExtra })
    } else if(!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT'){
      dispatch({ type: 'ADD', ingredient: { id: data.name, ...reqExtra }});
    }
  }, [ data, reqExtra, reqIdentifier, isLoading, error ]);

  const filteredIngredientsHandler = useCallback(filteredIngredients =>{
    //setIngredients(filteredIngredients);
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients,
    });
  }, []);

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest(
      'https://react-hooks-course-e1cc5.firebaseio.com/ingredients.json',
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    );
    /*//setIsLoading(true);
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
      ]);
      dispatch({type: 'ADD', ingredient: {id: responseData.name, ...ingredient}});
    });*/
  }, [sendRequest]);

  const removeIngredientHandler = useCallback(id => {
    sendRequest(
      `https://react-hooks-course-e1cc5.firebaseio.com/ingredients/${id}.jon`,
      'DELETE',
      null,
      id,
      'REMOVE_INGREDIENT'
    );
  }, [sendRequest]);

  const ingredientList = useMemo(() => <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler}/>, [ ingredients, removeIngredientHandler ]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
