import { Link } from "react-router-dom"
import RecipeCard from "../components/recipe-card";

function Home({ data, setRecipe }) {

    return (
        <>
            {data.map((recipe) => (
                <div key={recipe._id}>
                    <RecipeCard recipe={recipe} setRecipe={setRecipe} />
                </div>
            ))}
            <Link to="/new-recipe">
                <button>New Recipe</button>
            </Link>
        </>
    )
}

export default Home