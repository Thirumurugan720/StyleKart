import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiArrowUpRight } from 'react-icons/fi';
import { useStore } from '../context/StoreContext.jsx';
import { formatPrice } from '../data/products.js';

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const saved = wishlist.includes(product.id);
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);
  return <article className="product-card">
    <div className="product-image-wrap">
      <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}><img src={product.image} alt={product.name} loading="lazy" /></Link>
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <span className="discount-badge">-{discount}%</span>
      <button className={`wishlist-button ${saved ? 'is-saved' : ''}`} onClick={() => toggleWishlist(product)} aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}><FiHeart fill={saved ? 'currentColor' : 'none'} /></button>
      <button className="quick-add" onClick={() => addToCart(product)}><FiShoppingBag /> Quick add</button>
    </div>
    <div className="product-info">
      <span className="product-category">{product.category}</span>
      <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
      <div className="rating-line"><span>★ {product.rating}</span><small>({product.reviews} reviews)</small></div>
      <div className="price-line"><strong>{formatPrice(product.price)}</strong><del>{formatPrice(product.oldPrice)}</del></div>
    </div>
  </article>;
}