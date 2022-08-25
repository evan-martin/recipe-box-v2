import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function useRecipes() {
  const { getAccessTokenSilently } = useAuth0();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const { user } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        axios.get("https://recipe-api-authorized.herokuapp.com/api/recipes", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            user: user.email
          }
        }).then(res => {
          setIsLoaded(true);
          setRecipes(res.data['result'].recipes);
          setShoppingList(res.data['result'].shoppingList);
        })

      } catch (error) {
        setIsLoaded(true);
        setError(error);
      }
    })();
  }, [user, getAccessTokenSilently]);

  return {
    isLoaded,
    error,
    recipes,
    setRecipes,
    shoppingList,
    setShoppingList
  }
}

export { useRecipes }