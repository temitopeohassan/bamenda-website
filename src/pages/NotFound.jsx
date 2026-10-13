import { Link } from 'react-router-dom';
import { usePageTitle } from '../components/Blocks.jsx';

export default function NotFound() {
  usePageTitle('Page not found');
  return (
    <section className="section notfound">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>We couldn’t find that page.</h1>
        <p className="lead" style={{ margin: '0 auto 24px' }}>It may have moved. Try one of our companies instead.</p>
        <div className="btn-row" style={{ justifyContent: 'center' }}>
          <Link to="/" className="btn btn--dark">Go home</Link>
          <Link to="/contact" className="btn btn--outline">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
