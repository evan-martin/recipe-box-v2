import { Link } from 'react-router-dom'
import RecipeCard from '../components/recipe-card';
import './page-styles/home.scss'

function Home({ data, setRecipe }) {

    return (
        <>
            <div className='grid'>
                {data.map((recipe) => (
                    <div className='grid-item' key={recipe._id}>
                        <RecipeCard recipe={recipe} setRecipe={setRecipe} />
                    </div>
                ))}
            </div>
            <Link to='/new-recipe'>
                <button>New Recipe</button>
            </Link>
        </>
    )
}

export default Home