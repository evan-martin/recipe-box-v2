import RecipeCard from '../components/recipe-card';
import Fab from '@mui/material/Fab';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './page-styles/home.scss'

function Home({ data, setRecipe }) {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <div className='grid'>
                {data.map((recipe) => (
                    <div className='grid-item' key={recipe._id}>
                        <RecipeCard recipe={recipe} setRecipe={setRecipe} />
                    </div>
                ))}
            </div>
            <div className='fab'>
                <Fab color='secondary' onClick={scrollToTop}>
                    <ArrowUpwardIcon />
                </Fab>
            </div>
        </>
    )
}

export default Home