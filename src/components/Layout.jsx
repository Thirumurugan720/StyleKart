import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiUser, FiSearch, FiMenu, FiTruck, FiHeadphones, FiShield } from 'react-icons/fi';
import { useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';

export function Header() {
  const { cartCount, wishlist, notify } = useStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const search = (event) => {
    event.preventDefault();
    navigate(`/shop${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
  };
  return <>
    <div className="top-strip">
      <div className="container d-flex justify-content-between align-items-center">
        <span><FiTruck /> Free shipping on orders above ₹999</span>
        <span className="top-help"><FiHeadphones /> Need help? <a href="mailto:hello@stylekart.example">Contact us</a></span>
      </div>
    </div>
    <header className="main-header">
      <div className="container header-main">
        <Link to="/" className="brand"><span className="brand-mark"><FiShoppingBag /></span><span>Style<span>Kart</span></span></Link>
        <form className="search-box" onSubmit={search}>
          <FiSearch />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, categories..." aria-label="Search products" />
          <button type="submit">Search</button>
        </form>
        <div className="header-actions">
          <Link to="/login" className="header-action"><FiUser /><span>Account</span></Link>
          <Link to="/wishlist" className="header-action action-with-count"><FiHeart /><span>Wishlist</span>{wishlist.length > 0 && <b>{wishlist.length}</b>}</Link>
          <Link to="/cart" className="header-action action-with-count"><FiShoppingBag /><span>Cart</span>{cartCount > 0 && <b>{cartCount}</b>}</Link>
        </div>
      </div>
      <nav className="nav-bar">
        <div className="container nav-inner">
          <div className="category-label"><FiMenu /> Shop categories</div>
          <div className="nav-links">
            <NavLink to="/">Home</NavLink><NavLink to="/shop">Shop all</NavLink><NavLink to="/shop?category=Fashion">Fashion</NavLink><NavLink to="/shop?category=Shoes">Shoes</NavLink><NavLink to="/shop?category=Electronics">Electronics</NavLink><NavLink to="/shop?category=Accessories">Accessories</NavLink><NavLink to="/about">Our story</NavLink>
          </div>
        </div>
      </nav>
    </header>
  </>;
}

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const submit = (e) => { e.preventDefault(); if (email.includes('@')) setSubscribed(true); };
  return <footer className="site-footer">
    <div className="container">
      <div className="newsletter">
        <div><span className="eyebrow light-eyebrow">THE STYLEKART EDIT</span><h3>A little style inspiration, in your inbox.</h3><p>Get new arrivals, exclusive offers and everyday favourites.</p></div>
        <form onSubmit={submit} className="newsletter-form">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" aria-label="Email address" />
          <button className="btn-primary-custom" type="submit">{subscribed ? 'Subscribed ✓' : 'Subscribe'}</button>
        </form>
      </div>
      <div className="footer-grid">
        <div><Link to="/" className="brand footer-brand"><span className="brand-mark"><FiShoppingBag /></span><span>Style<span>Kart</span></span></Link><p className="footer-description">Good finds. Great style. Everyday prices. Discover pieces that fit your life.</p></div>
        <div><h6>Explore</h6><Link to="/shop">Shop all</Link><Link to="/shop?category=Fashion">Fashion</Link><Link to="/shop?category=Electronics">Electronics</Link><Link to="/wishlist">Wishlist</Link></div>
        <div><h6>Help & support</h6><Link to="/contact">Contact us</Link><Link to="/about">About StyleKart</Link><a href="mailto:hello@stylekart.example">Email support</a><span>Returns within 7 days*</span></div>
        <div className="footer-promises"><p><FiShield /> Secure shopping experience</p><p><FiTruck /> Shipping on eligible orders</p><p><FiHeadphones /> Here when you need us</p></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} StyleKart. Demo storefront for learning.</span><span>Privacy · Terms · Shipping</span></div>
    </div>
  </footer>;
}

export function Toast() {
  const { toast } = useStore();
  return toast ? <div className="toast-message" role="status">✓ <span>{toast}</span></div> : null;
}

export function PageShell({ children }) {
  return <><Header />{children}<Footer /><Toast /></>;
}