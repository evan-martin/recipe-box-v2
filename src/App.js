import {
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import Router from './pages/router';
import Login from './pages/login';
import Header from './components/header'
import Footer from './components/footer'
import ScrollToTop from './components/scroll-to-top'
import './App.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme'

function App() {

  const {
    isAuthenticated,
  } = useAuth0();

  return (
    <ThemeProvider theme={theme}>
      <div className='app' >
        {isAuthenticated && (
          <Header />
        )}
        <div className='content-container'>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={isAuthenticated ? <Navigate to="/recipes" /> : <Login />} />
              <Route path="/recipes/*" element={<Router />} />
            </Routes>
          </ScrollToTop>
        </div>
        {isAuthenticated && (
          <Footer />
        )}

      </div>
    </ThemeProvider>
  );
}

export default App;
