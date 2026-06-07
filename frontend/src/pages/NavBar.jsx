import { NavLink } from 'react-router';
import { useEffect, useState } from 'react';

const LOGO_SRC = '/logo.png';

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const NavBar = () => {
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={sticky ? 'sticky' : ''} aria-label="Main navigation">
      <NavLink to="/" className="myName" onClick={closeMenu}>
        {logoLoaded ? null : <span className="brand-text">REGUL8DCAFFEIN8D</span>}
        <img
          src={LOGO_SRC}
          alt="Regul8dCaffein8d's logo"
          className={`nav-logo${logoLoaded ? ' loaded' : ''}`}
          onLoad={() => setLogoLoaded(true)}
          onError={() => setLogoLoaded(false)}
          aria-hidden={!logoLoaded}
        />
      </NavLink>

      <div className="nav-right">
        <ul className={menuOpen ? 'open' : ''}>
          <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
          {/* Portfolio and Gear & Picks hidden — re-enable by uncommenting */}
          {/* <li><NavLink to="/repairs" onClick={closeMenu}>Portfolio</NavLink></li> */}
          {/* <li><NavLink to="/affiliatelinks" onClick={closeMenu}>Gear &amp; Picks</NavLink></li> */}
        </ul>

        <button
          className="theme-toggle"
          onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

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
      </div>
    </nav>
  );
};

export default NavBar;
