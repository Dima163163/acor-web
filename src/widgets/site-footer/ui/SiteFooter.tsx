import { Link } from 'react-router-dom';
import { footerNavigation } from '../../../shared/config/navigation';

export const SiteFooter = () => (
  <>
    <div className="footer-top">
      <p>Есть идея? Давайте придадим ей форму.</p>
      <Link className="footer-contact" to="/contact">Начнём разговор <span>↗︎</span></Link>
    </div>
    <div className="footer-bottom">
      <Link className="brand" to="/" aria-label="Acor Web — главная">acor<span className="brand-slash">/</span><small>web</small></Link>
      <span>Дизайн с характером. Разработка с мыслью.</span>
      <nav aria-label="Ссылки в подвале">
        {footerNavigation.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
      </nav>
      <small>© Acor Web, 2026</small>
    </div>
  </>
);
