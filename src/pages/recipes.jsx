import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
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

    const { data, error, isLoaded } = useRecipes();
    const [recipe, setRecipe] = useLocalStorage({});
    const [list, setList] = useLocalStorage('items', []);

    if (!isLoaded) {
        return <Loading />;
    } else if (error) {
        return <Error />
    } else {

        return (
            <div>
                <div className="home-content">
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
    onRedirecting: () => <Loading />,
});


