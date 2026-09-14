'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';

const LOGO_SRC = '/logo.png';

function navClass(isActive, extra = '') {
  return [extra, isActive ? 'active' : ''].filter(Boolean).join(' ');
}

export default function NavBar() {
  const pathname = usePathname();
  const menuId = useId();
  const hamburgerRef = useRef(null);
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => {
      setIsMobileNav(mq.matches);
      if (!mq.matches) setMenuOpen(false);
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const menuHidden = isMobileNav && !menuOpen;

  const navLinkProps = (href) => {
    const isActive = pathname === href;
    return {
      href,
      onClick: closeMenu,
      className: navClass(isActive, href === '/start-here' ? 'nav-start-here' : ''),
      ...(isActive ? { 'aria-current': 'page' } : {}),
    };
  };

  return (
    <nav className={sticky ? 'sticky' : ''} aria-label="Main navigation">
      <Link href="/" className="myName" onClick={closeMenu}>
        {logoLoaded ? null : <span className="brand-text">REGUL8DCAFFEIN8D</span>}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO_SRC}
          alt={logoLoaded ? 'Regul8d Caffein8d home' : ''}
          className={`nav-logo${logoLoaded ? ' loaded' : ''}`}
          onLoad={() => setLogoLoaded(true)}
          onError={() => setLogoLoaded(false)}
        />
      </Link>

      <div className="nav-right">
        <ul
          id={menuId}
          className={menuOpen ? 'open' : ''}
          inert={menuHidden ? true : undefined}
          aria-hidden={menuHidden ? true : undefined}
        >
          <li>
            <Link {...navLinkProps('/about')}>About</Link>
          </li>
          <li>
            <Link {...navLinkProps('/glossary')}>Glossary</Link>
          </li>
          <li>
            <Link {...navLinkProps('/collection')}>My Collection</Link>
          </li>
          <li>
            <Link {...navLinkProps('/reviews')}>Reviews</Link>
          </li>
          <li>
            <Link {...navLinkProps('/substack')}>Substack</Link>
          </li>
          <li>
            <Link {...navLinkProps('/start-here')}>Start Here</Link>
          </li>
        </ul>

        <button
          ref={hamburgerRef}
          type="button"
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls={menuId}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
    </nav>
  );
}
