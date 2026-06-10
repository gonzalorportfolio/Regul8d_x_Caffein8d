import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import Repairs from './pages/Repairs';
import AffiliateLinks from './pages/AffiliateLinks';
import Glossary from './pages/Glossary';
import Collection from './pages/Collection';
import Reviews from './pages/Reviews';
import SubstackFeed from './pages/SubstackFeed';
import StartHere from './pages/StartHere';
import NavBar from './pages/NavBar';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <><NavBar /><Home /></>,
  },
  {
    path: '/about',
    element: <><NavBar /><About /></>,
  },
  {
    path: '/glossary',
    element: <><NavBar /><Glossary /></>,
  },
  {
    path: '/collection',
    element: <><NavBar /><Collection /></>,
  },
  {
    path: '/reviews',
    element: <><NavBar /><Reviews /></>,
  },
  {
    path: '/substack',
    element: <><NavBar /><SubstackFeed /></>,
  },
  {
    path: '/start-here',
    element: <><NavBar /><StartHere /></>,
  },
  {
    path: '/repairs',
    element: <><NavBar /><Repairs /></>,
  },
  {
    path: '/affiliatelinks',
    element: <><NavBar /><AffiliateLinks /></>,
  },
]);



function App() {
  return <RouterProvider router={router} />;
}

export default App
