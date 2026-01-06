import { NavLink } from 'react-router';
const NavBar = () => {
    return (
         <nav>
          <NavLink to="/" className="myName">Regul8d & Caffien8d</NavLink>
          <ul>
            <li><NavLink to="/reviews" activeClassName="active">Reviews</NavLink></li>
            <li><NavLink to="/repairs" activeClassName="active">Repairs</NavLink></li>
            <li><NavLink to="/affiliatelinks" activeClassName="active">Affiliate Links</NavLink></li>
          </ul>
        </nav>
    )
};

export default NavBar;