import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
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
    path: '/about',
    element: <><NavBar /><About /></>,
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
