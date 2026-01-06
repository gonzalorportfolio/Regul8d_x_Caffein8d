


import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home';
import Reviews from './pages/Reviews';
import Repairs from './pages/Repairs';
import AffiliateLinks from './pages/AffiliateLinks';
import NavBar from './pages/NavBar';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <><NavBar /><Home /></>,
  },
  {
    path: '/reviews',
    element: <><NavBar /><Reviews /></>,
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
