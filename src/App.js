import { useRecipes } from './hooks/useRecipes'
import  useLocalStorage from './hooks/useLocalStorage';
import Home from './pages/home';
import Read from './pages/read'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

function App() {
  const { data, error, isLoaded } = useRecipes();
  const [recipe, setRecipe] = useLocalStorage({});

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
      <h1>Header</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home data={data} setRecipe={setRecipe} />}/>
            <Route path="/:id" element={<Read recipe = {recipe} setRecipe={setRecipe}/>} />
          </Routes>
        </BrowserRouter>
        <h1>Footer</h1>
      </>
    );
  }
}

export default App;
