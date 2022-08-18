import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useRecipes } from "../hooks/useRecipes";
import { Route, Routes } from "react-router-dom";
import RecipeCard from "../components/recipe-card";
import Read from "./read";
import useLocalStorage from "../hooks/useLocalStorage";
import DeleteModal from '../components/delete-modal'
import Home from "./home";
import Create from "./create";
import Update from "./update";
import ShoppingList from "./shopping-list";

const Recipes = () => {
    const { logout } = useAuth0();

    const { data, error, isLoaded } = useRecipes();
    const [recipe, setRecipe] = useLocalStorage({});
    const [list, setList] = useLocalStorage('items', []);

    if (!isLoaded) {
        return <p>loading...</p>;
    } else if (error) {
        return <p>{error}</p>
    } else {

        return (
            <div>
                <div className="home-content">
                    <h1>{data.name}</h1>
                    <button onClick={() => logout({ returnTo: window.location.origin })}> Log Out</button>

                    <Routes>
                        <Route path="/" element={<Home data={data} setRecipe={setRecipe} />} />
                        <Route path="/:id" element={<Read recipe={recipe} list={list} setList={setList} />} />
                        <Route path="/new-recipe" element={<Create setRecipe={setRecipe} />} />
                        <Route path="/update/:id" element={<Update recipe={recipe} setRecipe={setRecipe} />} />
                        <Route path="/shopping-list" element={<ShoppingList list={list} setList={setList} />} />
                    </Routes>
                </div>
            </div>
        )
    };
}

export default withAuthenticationRequired(Recipes, {
    onRedirecting: () => <p>Redirect Loading...</p>,
});


