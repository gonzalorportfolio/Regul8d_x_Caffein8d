import { NavLink } from 'react-router';
const NavBar = () => {
    return (
         <nav>
          <NavLink to="/" className="myName">Gonzalo Romero</NavLink>
          <ul>
            <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
            <li><NavLink to="/portfolio" activeClassName="active">Portfolio</NavLink></li>
            <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
          </ul>
        </nav>
    )
};

export default NavBar;