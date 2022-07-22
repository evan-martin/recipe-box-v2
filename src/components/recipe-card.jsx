import { Link } from 'react-router-dom';
import './component-styles/recipe-card.scss'

function RecipeCard({ recipe, setRecipe }) {

    return (
        <Link to={recipe._id} onClick={() => { setRecipe(recipe) }} style={{ textDecoration: 'none' }} >
            <img className='card-image' src={recipe.imageURL} />
            <p className='card-title'>{recipe.name}</p>
        </Link>
    )
}

export default RecipeCard