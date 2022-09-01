import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useRecipes } from "../hooks/useRecipes";
import { Route, Routes } from "react-router-dom";
import Read from "./read";
import useLocalStorage from "../hooks/useLocalStorage";
import Home from "./home";
import Create from "./create";
import Update from "./update";
import ShoppingList from "./shopping-list";
import Loading from '../components/loading'
import Error from '../components/error'

const Recipes = () => {

    const { error, isLoaded, recipes, setRecipes, shoppingList, setShoppingList } = useRecipes();
    const [recipe, setRecipe] = useLocalStorage([]);

    if (!isLoaded) {
        return <Loading />;
    } else if (error) {
        return <Error />
    } else {
        return (

            <div>
                <div className="home-content">
                    <Routes>
                        <Route path="/" element={<Home recipes={recipes} setRecipe={setRecipe} />} />
                        <Route path="/:id" element={<Read recipe={recipe} shoppingList={shoppingList} setShoppingList={setShoppingList} />} />
                        <Route path="/new-recipe" element={<Create recipes={recipes} setRecipes={setRecipes} />} />
                        <Route path="/update/:id" element={<Update recipe={recipe} setRecipe={setRecipe} recipes={recipes} setRecipes={setRecipes} />} />
                        <Route path="/shopping-list" element={<ShoppingList shoppingList={shoppingList} setShoppingList={setShoppingList} />} />
                    </Routes>
                </div>
            </div>
        )
    };
}

export default withAuthenticationRequired(Recipes, {
    onRedirecting: () => <Loading />,
});


