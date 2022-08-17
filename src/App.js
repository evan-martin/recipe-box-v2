import { useRecipes } from './hooks/useRecipes'
import useLocalStorage from './hooks/useLocalStorage'
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import Recipes from './pages/recipes';
import Login from './pages/login';
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

  const {
    isAuthenticated,
  } = useAuth0();

  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

    return (
      <div className='app' data-theme={theme}>
        <Header switchTheme={switchTheme} />
        <div className='content-container'>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={isAuthenticated ? <Navigate to="/recipes" /> : <Login />} />
              <Route path="/recipes/*" element={<Recipes />} />
              {/* <Route path="/" element={<Home data={data} setRecipe={setRecipe} />} />
              <Route path="/:id" element={<Read recipe={recipe} list={list} setList={setList} />} />
              <Route path="/update/:id" element={<Update recipe={recipe} setRecipe={setRecipe} />} />
              <Route path="/new-recipe" element={<Create setRecipe={setRecipe} />} />
              <Route path="/shopping-list" element={<ShoppingList list={list} setList={setList} />} /> */}
            </Routes>
          </ScrollToTop>
        </div>
        <Footer />
      </div>
    );
  }

export default App;
