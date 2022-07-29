import useLocalStorage from '../hooks/useLocalStorage';
import RecipeCard from '../components/recipe-card';
import Fab from '@mui/material/Fab';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ThemeSwitch from '../components/theme-switch';
import CustomInput from '../components/custom-input';
import './page-styles/home.scss'


function Home({ data, setRecipe, switchTheme }) {

    const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '')

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const filteredRecipes = data.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
        || recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
        || recipe.method.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredRecipes.reverse()

    return (

        <>
            <div className='banner'></div>
            <div className='switch'>
                <ThemeSwitch switchTheme={switchTheme}/>
            </div>
            <div className='search-bar'>
                <h1>Recipe Box</h1>
                <CustomInput
                    placeholder='Search'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant='outlined'
                    size='large'
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