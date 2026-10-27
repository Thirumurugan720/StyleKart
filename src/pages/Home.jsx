import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight, FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';
import ProductCard from '../components/ProductCard.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import { products } from '../data/products.js';

const categoryTiles = [
  { name: 'Fashion', text: 'Everyday essentials', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80' },
  { name: 'Shoes', text: 'Step into comfort', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' },
  { name: 'Electronics', text: 'Smart daily upgrades', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80' },
  { name: 'Accessories', text: 'Finishing touches', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80' }
];

export default function Home() {
  return <main>
    <section className="container hero-section">
      <div className="hero-copy">
        <span className="hero-pill"><span className="pulse-dot"></span> THE NEW SEASON EDIT</span>
        <h1>Find your<br /><span>everyday style.</span></h1>
        <p>Good finds, great style and little upgrades that make every day feel special.</p>
        <div className="hero-buttons"><Link to="/shop" className="btn-primary-custom">Explore collection <FiArrowRight /></Link><Link to="/about" className="text-link">Discover StyleKart <FiArrowUpRight /></Link></div>
        <div className="hero-social-proof"><div className="avatar-stack"><span>J</span><span>M</span><span>A</span></div><div><strong>Everyday favourites</strong><small>Picked for your lifestyle</small></div></div>
      </div>
      <div className="hero-visual">
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90" alt="Friends exploring modern fashion" />
        <div className="hero-image-shade"></div>
        <div className="hero-note"><span>STYLE NOTE 01</span><strong>Wear what<br />feels like you.</strong><Link to="/shop">Shop the edit <FiArrowRight /></Link></div>
        <div className="floating-discount"><span>THIS WEEK</span><strong>Up to 40% off</strong><small>Selected finds</small></div>
      </div>
    </section>

    <section className="container benefits-strip">
      <div><span className="benefit-icon"><FiTruck /></span><span><strong>Shipping on us</strong><small>On orders above ₹999</small></span></div>
      <div><span className="benefit-icon"><FiShield /></span><span><strong>Easy, secure checkout</strong><small>Shop with confidence</small></span></div>
      <div><span className="benefit-icon"><FiRefreshCw /></span><span><strong>Easy returns</strong><small>Within 7 days*</small></span></div>
      <div><span className="benefit-icon"><FiHeadphones /></span><span><strong>Here to help</strong><small>Friendly support</small></span></div>
    </section>

    <section className="container content-section">
      <SectionTitle eyebrow="A GOOD PLACE TO START" title="Shop by category" subtitle="Your next favourite might be just around the corner." action={<Link to="/shop" className="text-link">View all <FiArrowRight /></Link>} />
      <div className="category-grid">{categoryTiles.map((category) => <Link key={category.name} to={`/shop?category=${category.name}`} className="category-card"><img src={category.image} alt={category.name} loading="lazy" /><span className="category-overlay"></span><div><small>{category.text}</small><h3>{category.name}</h3><span className="category-arrow"><FiArrowUpRight /></span></div></Link>)}</div>
    </section>

    <section className="container content-section">
      <SectionTitle eyebrow="GOOD FINDS, BETTER PRICES" title="Trending right now" subtitle="The pieces getting a little extra attention." action={<Link to="/shop" className="text-link">Shop everything <FiArrowRight /></Link>} />
      <div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </section>

    <section className="container promo-section">
      <div className="promo-copy"><span className="eyebrow light-eyebrow">A LITTLE SOMETHING EXTRA</span><h2>Small upgrades.<br /><span>Big everyday energy.</span></h2><p>Discover thoughtful picks for your wardrobe, desk and daily routine.</p><Link to="/shop" className="btn-light-custom">Find your next favourite <FiArrowRight /></Link></div>
      <div className="promo-image"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1100&q=85" alt="Modern retail clothing collection" loading="lazy" /><div className="promo-sticker">MADE FOR<br />YOUR EVERYDAY</div></div>
    </section>

    <section className="container content-section">
      <SectionTitle eyebrow="A FEW MORE TO LOVE" title="Just landed" subtitle="Fresh finds to make your own." action={<Link to="/shop" className="text-link">Explore new arrivals <FiArrowRight /></Link>} />
      <div className="product-grid">{products.slice(4, 8).map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </section>
    <section className="container quote-section"><span className="quote-mark">“</span><p>Style isn't about having more. It's about finding the things that feel right for you.</p><span className="eyebrow">THE STYLEKART POINT OF VIEW</span></section>
  </main>;
}