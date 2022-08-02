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


function Home({ data, setRecipe  }) {

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

    const filteredRecipes = data.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
        || recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
        || recipe.method.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredRecipes.reverse()

    return (

        <>
            <div className='banner'></div>
            <div className='search-bar'>
                <h1>Recipe Box</h1>
                <form onSubmit={handleSubmit}>
                <CustomInput
                    id='search'
                    placeholder='Search'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon />
                            </InputAdornment>
                        ), endAdornment: (
                            <IconButton
                                onClick={handleClear}
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