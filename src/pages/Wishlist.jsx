import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import ProductCard from '../components/ProductCard.jsx';
import { useStore } from '../context/StoreContext.jsx';

export default function Wishlist() {
  const { wishlistProducts } = useStore();
  return <main className="container page-container"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Wishlist</span></div><div className="page-heading"><span className="eyebrow">SAVED FOR LATER</span><h1>Your wishlist.</h1><p>All the good finds you want to come back to.</p></div>{wishlistProducts.length ? <div className="product-grid">{wishlistProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><span className="empty-icon"><FiHeart /></span><h2>Nothing saved just yet.</h2><p>Tap the heart on a product to keep it here for later.</p><Link to="/shop" className="btn-primary-custom">Explore products</Link></div>}</main>;
}