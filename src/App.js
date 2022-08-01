import { useRecipes } from './hooks/useRecipes'
import useLocalStorage from './hooks/useLocalStorage'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Home from './pages/home'
import Read from './pages/read'
import Update from './pages/update'
import Create from './pages/create'
import ShoppingList from './pages/shopping-list'
import Header from './components/header'
import Footer from './components/footer'
import Loading from './components/loading'
import Error from './components/error'
import ScrollToTop from './components/scroll-to-top'
import './App.css'

function App() {

  const { data, error, isLoaded } = useRecipes();
  const [recipe, setRecipe] = useLocalStorage({});
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [list, setList] = useLocalStorage('items', []);

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  if (error) {
    return <Error error={error.message} />;
  } else if (!isLoaded) {
    return <Loading />;
  } else {

    return (
      <div className='app' data-theme={theme}>
        <BrowserRouter>
          <Header />
          <div className='content-container'>
            <ScrollToTop>
              <Routes>
                <Route path="/" element={<Home data={data} setRecipe={setRecipe} switchTheme={switchTheme}/>} />
                <Route path="/:id" element={<Read recipe={recipe} list={list} setList={setList} />} />
                <Route path="/update/:id" element={<Update recipe={recipe} setRecipe={setRecipe} />} />
                <Route path="/new-recipe" element={<Create setRecipe={setRecipe} />} />
                <Route path="/shopping-list" element={<ShoppingList list={list} setList={setList} />} />
              </Routes>
            </ScrollToTop>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
