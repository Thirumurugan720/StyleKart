import { Link } from 'react-router-dom';
import { FiArrowLeft, FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiShield } from 'react-icons/fi';
import { useStore } from '../context/StoreContext.jsx';
import { formatPrice } from '../data/products.js';

export default function Cart() {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useStore();
  const shipping = cartTotal === 0 || cartTotal >= 999 ? 0 : 79;
  const total = cartTotal + shipping;
  return <main className="container page-container">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Your cart</span></div>
    <div className="page-heading"><span className="eyebrow">YOUR PICKS, ALL TOGETHER</span><h1>Your shopping bag.</h1><p>{cart.length ? 'A few good finds, ready when you are.' : 'Your next favourite is waiting to be found.'}</p></div>
    {!cart.length ? <div className="empty-state cart-empty"><span className="empty-icon"><FiShoppingBag /></span><h2>Your cart is taking a little break.</h2><p>Explore the collection and add something you love.</p><Link to="/shop" className="btn-primary-custom">Explore the shop</Link></div> :
      <div className="cart-layout"><section className="cart-items"><div className="cart-items-heading"><strong>Items in your bag ({cart.reduce((n,i)=>n+i.quantity,0)})</strong><Link to="/shop">Continue shopping</Link></div>{cart.map((item) => <article className="cart-item" key={item.id}><Link to={`/product/${item.id}`} className="cart-item-image"><img src={item.image} alt={item.name} /></Link><div className="cart-item-info"><span className="product-category">{item.category}</span><Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link><span className="cart-item-price">{formatPrice(item.price)}</span><div className="cart-item-bottom"><div className="quantity-control"><button onClick={() => item.quantity === 1 ? removeFromCart(item.id) : updateQuantity(item.id, item.quantity-1)} aria-label="Decrease quantity"><FiMinus /></button><strong>{item.quantity}</strong><button onClick={() => updateQuantity(item.id, item.quantity+1)} aria-label="Increase quantity"><FiPlus /></button></div><button className="remove-item" onClick={() => removeFromCart(item.id)}><FiTrash2 /> Remove</button></div></div><strong className="cart-line-total">{formatPrice(item.price*item.quantity)}</strong></article>)}</section>
      <aside className="order-summary"><h2>Order summary</h2><div className="summary-line"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div><div className="summary-line"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>{cartTotal > 0 && cartTotal < 999 && <p className="shipping-hint">Add {formatPrice(999-cartTotal)} more for free shipping.</p>}<div className="summary-line summary-total"><strong>Total</strong><strong>{formatPrice(total)}</strong></div><small className="tax-note">Taxes, if applicable, are included in the displayed total for this demo.</small><Link to="/checkout" className="btn-primary-custom checkout-button">Continue to checkout →</Link><p className="secure-note"><FiShield /> Secure demo checkout</p></aside></div>}
    <Link to="/shop" className="back-link"><FiArrowLeft /> Continue shopping</Link>
  </main>;
}