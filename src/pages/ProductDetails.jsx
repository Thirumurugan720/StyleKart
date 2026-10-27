import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiHeart, FiMinus, FiPlus, FiShield, FiTruck } from 'react-icons/fi';
import ProductCard from '../components/ProductCard.jsx';
import { products, formatPrice } from '../data/products.js';
import { useStore } from '../context/StoreContext.jsx';

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  if (!product) return <main className="container page-container empty-state"><h2>Product not found</h2><Link to="/shop" className="btn-primary-custom">Back to shop</Link></main>;
  const saved = wishlist.includes(product.id);
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  return <main className="container page-container">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/shop">Shop</Link><span>/</span><span>{product.name}</span></div>
    <div className="detail-layout"><div className="detail-image"><img src={product.image} alt={product.name} /></div><div className="detail-info"><span className="eyebrow">{product.category.toUpperCase()} / STYLEKART EDIT</span><h1>{product.name}</h1><div className="detail-rating"><span>★ {product.rating}</span><span>{product.reviews} verified-style reviews</span></div><div className="detail-price"><strong>{formatPrice(product.price)}</strong><del>{formatPrice(product.oldPrice)}</del><span>{Math.round((1-product.price/product.oldPrice)*100)}% off</span></div><p className="detail-description">{product.description}</p><div className="stock-note"><span></span> Available to order</div><div className="quantity-row"><span>Quantity</span><div className="quantity-control"><button onClick={() => setQuantity((q) => Math.max(1, q-1))} aria-label="Decrease quantity"><FiMinus /></button><strong>{quantity}</strong><button onClick={() => setQuantity((q) => q+1)} aria-label="Increase quantity"><FiPlus /></button></div></div><div className="detail-buttons"><button className="btn-primary-custom" onClick={() => { addToCart(product, quantity); navigate('/cart'); }}>Add to cart · {formatPrice(product.price*quantity)}</button><button className={`detail-wishlist ${saved ? 'is-saved' : ''}`} onClick={() => toggleWishlist(product)} aria-label="Toggle wishlist"><FiHeart fill={saved ? 'currentColor' : 'none'} /></button></div><div className="detail-perks"><p><FiTruck /><span><strong>Shipping on eligible orders</strong><small>Free shipping above ₹999</small></span></p><p><FiShield /><span><strong>Shop with confidence</strong><small>Secure checkout experience</small></span></p></div><p className="demo-note">Demo storefront: product availability and reviews are illustrative.</p></div></div>
    {related.length > 0 && <section className="content-section related-section"><div className="section-title-row"><div><span className="eyebrow">YOU MAY ALSO LIKE</span><h2>More to discover</h2></div><Link to={`/shop?category=${product.category}`} className="text-link">View category →</Link></div><div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}
    <Link to="/shop" className="back-link"><FiArrowLeft /> Back to all products</Link>
  </main>;
}