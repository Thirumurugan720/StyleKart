import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiShield } from 'react-icons/fi';
import { useStore } from '../context/StoreContext.jsx';
import { formatPrice } from '../data/products.js';

export default function Checkout() {
  const { cart, cartTotal, clearCart, notify } = useStore();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', phone:'', address:'', city:'', pincode:'' });
  const navigate = useNavigate();
  const shipping = cartTotal === 0 || cartTotal >= 999 ? 0 : 79;
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (!cart.length) return;
    setPlaced(true);
    clearCart();
    notify('Demo order placed successfully');
  };
  if (placed) return <main className="container page-container"><div className="success-card"><span className="success-icon"><FiCheckCircle /></span><span className="eyebrow">ORDER CONFIRMED</span><h1>Thanks, {form.name.split(' ')[0]}!</h1><p>Your demo order has been placed. This learning project does not process real payments or ship products.</p><div className="success-reference">DEMO-{Date.now().toString().slice(-6)}</div><Link to="/shop" className="btn-primary-custom">Continue exploring</Link></div></main>;
  if (!cart.length) return <main className="container page-container empty-state"><h2>Your bag is empty</h2><p>Add a few products before checking out.</p><Link to="/shop" className="btn-primary-custom">Explore the shop</Link></main>;
  return <main className="container page-container"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/cart">Cart</Link><span>/</span><span>Checkout</span></div><div className="page-heading"><span className="eyebrow">ALMOST YOURS</span><h1>Checkout.</h1><p>Add your delivery details to complete this demo order.</p></div><div className="checkout-layout"><form className="checkout-form" onSubmit={submit}><h2>Delivery details</h2><div className="form-two-col"><label>Full name<input name="name" value={form.name} onChange={update} required placeholder="Your full name" /></label><label>Email address<input name="email" type="email" value={form.email} onChange={update} required placeholder="you@example.com" /></label><label>Phone number<input name="phone" type="tel" pattern="[0-9+() -]{8,16}" value={form.phone} onChange={update} required placeholder="Your phone number" /></label><label>PIN code<input name="pincode" inputMode="numeric" pattern="[0-9]{6}" value={form.pincode} onChange={update} required placeholder="6-digit PIN code" /></label></div><label>Delivery address<textarea name="address" rows="3" value={form.address} onChange={update} required placeholder="House number, street, area" /></label><label>City<input name="city" value={form.city} onChange={update} required placeholder="City" /></label><div className="demo-payment"><FiShield /><span><strong>Demo payment</strong><small>No real payment will be collected.</small></span><span className="demo-pill">TEST MODE</span></div><button type="submit" className="btn-primary-custom checkout-button">Place demo order · {formatPrice(cartTotal+shipping)}</button></form><aside className="order-summary"><h2>Your order</h2>{cart.map((item)=><div className="checkout-item" key={item.id}><img src={item.image} alt={item.name}/><div><strong>{item.name}</strong><small>Qty: {item.quantity}</small></div><span>{formatPrice(item.price*item.quantity)}</span></div>)}<div className="summary-line"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div><div className="summary-line"><span>Shipping</span><span>{shipping===0?'FREE':formatPrice(shipping)}</span></div><div className="summary-line summary-total"><strong>Total</strong><strong>{formatPrice(cartTotal+shipping)}</strong></div></aside></div></main>;
}