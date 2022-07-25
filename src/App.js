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
import Header from './components/header'
import Footer from './components/footer'
import ScrollToTop from './components/scroll-to-top'
import './App.css'

function App() {

  const { data, error, isLoaded } = useRecipes();
  const [recipe, setRecipe] = useLocalStorage({});

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    return (
      <div className='app'>
        <BrowserRouter>
          <Header />
          <div className='content-container'>
            <ScrollToTop>
              <Routes>
                <Route path="/" element={<Home data={data} setRecipe={setRecipe} />} />
                <Route path="/:id" element={<Read recipe={recipe} />} />
                <Route path="/update/:id" element={<Update recipe={recipe} setRecipe={setRecipe} />} />
                <Route path="/new-recipe" element={<Create setRecipe={setRecipe} />} />
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
