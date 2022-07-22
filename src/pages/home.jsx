import useLocalStorage from '../hooks/useLocalStorage';
import RecipeCard from '../components/recipe-card';
import Fab from '@mui/material/Fab';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import './page-styles/home.scss'


function Home({ data, setRecipe }) {

    const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '')

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const filteredRecipes = data.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
        || recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
        || recipe.method.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredRecipes.reverse()

    return (

        <>
            <div className='search-bar'>
                <TextField
                    placeholder='Search'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant='outlined'
                    size='small'
                    type='search'
                    defaultValue={searchTerm.trim()}
                    onChange={event => setSearchTerm(' ' + event.target.value)}
                />
            </div>

            <div className='grid'>
                {filteredRecipes.map((recipe) => (
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