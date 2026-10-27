import { useMemo, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiSliders, FiX } from 'react-icons/fi';
import ProductCard from '../components/ProductCard.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import { categories, products } from '../data/products.js';

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get('q') || '');
  const [category, setCategory] = useState(params.get('category') || 'All');
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [mobileFilters, setMobileFilters] = useState(false);
  useEffect(() => { setSearch(params.get('q') || ''); setCategory(params.get('category') || 'All'); }, [params]);
  const filtered = useMemo(() => {
    let list = products.filter((p) => (category === 'All' || p.category === category) && p.price <= maxPrice && `${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'price-low') list = [...list].sort((a,b) => a.price-b.price);
    if (sort === 'price-high') list = [...list].sort((a,b) => b.price-a.price);
    if (sort === 'rating') list = [...list].sort((a,b) => b.rating-a.rating);
    if (sort === 'name') list = [...list].sort((a,b) => a.name.localeCompare(b.name));
    return list;
  }, [category, search, sort, maxPrice]);
  const chooseCategory = (value) => { setCategory(value); setParams((prev) => { const next = new URLSearchParams(prev); value === 'All' ? next.delete('category') : next.set('category', value); return next; }); };
  const clear = () => { setCategory('All'); setSearch(''); setMaxPrice(5000); setParams({}); };
  return <main className="container page-container">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Shop</span></div>
    <div className="shop-heading"><div><span className="eyebrow">THE STYLEKART COLLECTION</span><h1>Find your next favourite.</h1><p>Thoughtful picks for every day, all in one place.</p></div><div className="shop-count">{filtered.length} products</div></div>
    <div className="shop-toolbar"><button className="filter-toggle" onClick={() => setMobileFilters(!mobileFilters)}><FiSliders /> Filters</button><label className="shop-search"><span className="visually-hidden">Search products</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search the collection..." /></label><label className="sort-select">Sort by <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option><option value="name">Name A–Z</option></select></label></div>
    <div className="shop-layout">
      <aside className={`filter-sidebar ${mobileFilters ? 'filters-open' : ''}`}><div className="filter-head"><h3>Filters</h3><button onClick={() => setMobileFilters(false)} aria-label="Close filters"><FiX /></button></div><div className="filter-group"><h4>Categories</h4>{categories.map((item) => <button key={item} className={`category-filter ${category === item ? 'active' : ''}`} onClick={() => chooseCategory(item)}>{item}<span>{item === 'All' ? products.length : products.filter((p) => p.category === item).length}</span></button>)}</div><div className="filter-group"><div className="filter-price-heading"><h4>Maximum price</h4><strong>₹{maxPrice.toLocaleString('en-IN')}</strong></div><input className="form-range" type="range" min="500" max="5000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} /><div className="range-labels"><span>₹500</span><span>₹5,000</span></div></div><button className="clear-filters" onClick={clear}>Clear all filters</button></aside>
      <div className="shop-results"><div className="results-summary"><span>Showing <strong>{filtered.length}</strong> of {products.length} products</span>{category !== 'All' && <button onClick={() => chooseCategory('All')}>{category} <FiX /></button>}</div>{filtered.length ? <div className="product-grid shop-product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><span className="empty-icon">⌕</span><h2>No products found</h2><p>Try a different search or clear your filters.</p><button className="btn-primary-custom" onClick={clear}>Clear filters</button></div>}</div>
    </div>
  </main>;
}