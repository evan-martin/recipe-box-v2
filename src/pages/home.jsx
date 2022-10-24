import useLocalStorage from '../hooks/useLocalStorage';
import RecipeCard from '../components/recipe-card';
import Fab from '@mui/material/Fab';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { Clear } from '@mui/icons-material';
import CustomInput from '../components/custom-input';
import './page-styles/home.scss'

function Home({ recipes, setRecipe }) {

    const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '')

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleClear = () => {
        setSearchTerm('')
        document.getElementById('search').value = ''
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        document.getElementById('search').blur()
    }

    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
        || recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
        || recipe.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredRecipes.reverse()

    return (

        <>
            <div className='search-bar'>
                <form onSubmit={handleSubmit}>
                    <CustomInput
                        id='search'
                        placeholder='Search'
                        autoComplete='off'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon />
                                </InputAdornment>
                            ), endAdornment: (
                                <IconButton
                                    onClick={handleClear}
                                    sx={{ visibility: searchTerm ? "visible" : "hidden" }}
                                >
                                    <Clear />
                                </IconButton>
                            ),
                        }}
                        variant='outlined'
                        size='large'
                        defaultValue={searchTerm.trim()}
                        onChange={event => setSearchTerm(' ' + event.target.value)}
                    />
                </form>
            </div>

            <div className='grid'>
                {filteredRecipes.map((recipe) => (
                    <div className='grid-item' key={recipe.id}>
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