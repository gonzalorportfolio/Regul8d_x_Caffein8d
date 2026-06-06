import { NavLink } from 'react-router';
import { useEffect, useState } from 'react';

// Drop logo.png into frontend/public/ and this will render automatically.
// Remove the import and use null to fall back to text.
const LOGO_SRC = '/logo.png';

const NavBar = () => {
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={sticky ? 'sticky' : ''} aria-label="Main navigation">
      <NavLink to="/" className="myName" onClick={closeMenu}>
        {logoLoaded ? null : <span className="brand-text">Regul8dCaffein8d</span>}
        <img
          src={LOGO_SRC}
          alt="Regul8dCaffein8d's logo"
          className={`nav-logo${logoLoaded ? ' loaded' : ''}`}
          onLoad={() => setLogoLoaded(true)}
          onError={() => setLogoLoaded(false)}
          aria-hidden={!logoLoaded}
        />
      </NavLink>

      <button
        className={`hamburger${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={menuOpen ? 'open' : ''}>
        <li><NavLink to="/reviews" onClick={closeMenu}>About</NavLink></li>
        {/* Portfolio and Gear & Picks hidden — re-enable by uncommenting */}
        {/* <li><NavLink to="/repairs" onClick={closeMenu}>Portfolio</NavLink></li> */}
        {/* <li><NavLink to="/affiliatelinks" onClick={closeMenu}>Gear &amp; Picks</NavLink></li> */}
      </ul>
    </nav>
  );
};

export default NavBar;
