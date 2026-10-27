import { Link } from 'react-router-dom';
export default function NotFound() {
  return <main className="container page-container empty-state"><span className="eyebrow">404 / WRONG TURN</span><h1>That page wandered off.</h1><p>Let's get you back to the good finds.</p><Link to="/" className="btn-primary-custom">Back to home</Link></main>;
}