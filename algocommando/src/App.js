import { Route } from 'react-router-dom';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import './App.css';
// import "../public/css/bootstrap.css"


import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SortingPage from './Pages/SortingPage';
import ArraySearchVisualizer from './Pages/ArraySearchPage';

import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

function App()
{
  



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/learn'>
          {/* <Route index element={} /> */}
          <Route path='arraySorting' element={<SortingPage />} />
          <Route path='arraySearch' element={<ArraySearchVisualizer/>} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
