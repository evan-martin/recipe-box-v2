import { Link } from "react-router-dom";

function RecipeCard({ recipe, setRecipe }) {

    return (
        <>
            <Link to={recipe._id} onClick={() => { setRecipe(recipe) }} >
                <div>
                    {recipe.name}
                </div>
            </Link>
        </>
    )
}

export default RecipeCard