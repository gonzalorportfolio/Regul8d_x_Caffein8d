'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LOGO_SRC = '/logo.png';

function navClass(isActive, extra = '') {
  return [extra, isActive ? 'active' : ''].filter(Boolean).join(' ');
}

export default function NavBar() {
  const pathname = usePathname();
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const [logoLoaded, setLogoLoaded] = useState(false);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={sticky ? 'sticky' : ''} aria-label="Main navigation">
      <Link href="/" className="myName" onClick={closeMenu}>
        {logoLoaded ? null : <span className="brand-text">REGUL8DCAFFEIN8D</span>}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO_SRC}
          alt="Regul8dCaffein8d's logo"
          className={`nav-logo${logoLoaded ? ' loaded' : ''}`}
          onLoad={() => setLogoLoaded(true)}
          onError={() => setLogoLoaded(false)}
          aria-hidden={!logoLoaded}
        />
      </Link>

      <div className="nav-right">
        <ul className={menuOpen ? 'open' : ''}>
          <li>
            <Link href="/about" onClick={closeMenu} className={navClass(pathname === '/about')}>
              About
            </Link>
          </li>
          <li>
            <Link href="/glossary" onClick={closeMenu} className={navClass(pathname === '/glossary')}>
              Glossary
            </Link>
          </li>
          <li>
            <Link href="/collection" onClick={closeMenu} className={navClass(pathname === '/collection')}>
              My Collection
            </Link>
          </li>
          <li>
            <Link href="/reviews" onClick={closeMenu} className={navClass(pathname === '/reviews')}>
              Reviews
            </Link>
          </li>
          <li>
            <Link href="/substack" onClick={closeMenu} className={navClass(pathname === '/substack')}>
              Substack
            </Link>
          </li>
          <li>
            <Link
              href="/start-here"
              onClick={closeMenu}
              className={navClass(pathname === '/start-here', 'nav-start-here')}
            >
              Start Here
            </Link>
          </li>
        </ul>

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
}
