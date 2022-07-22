import { Link } from 'react-router-dom';
import defaultRecipeImage from '../assets/default.jpg'
import './component-styles/recipe-card.scss'

function RecipeCard({ recipe, setRecipe }) {

    const validateImageURL = (imageURL) => {
        if (!imageURL) {
          return defaultRecipeImage
        } else return imageURL
      };

    return (
        <Link to={recipe._id} onClick={() => { setRecipe(recipe) }} style={{ textDecoration: 'none' }} >
            <img className='card-image' src={validateImageURL(recipe.imageURL)} />
            <p className='card-title'>{recipe.name}</p>
        </Link>
    )
}

export default RecipeCard