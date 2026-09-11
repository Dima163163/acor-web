import { footerNavigation } from '../../../shared/config/navigation';

export const SiteFooter = () => (
  <>
    <div className="footer-top">
      <p>Есть идея? Давайте придадим ей форму.</p>
      <a className="footer-contact" href="contact.html">Начнём разговор <span>↗︎</span></a>
    </div>
    <div className="footer-bottom">
      <a className="brand" href="index.html" aria-label="Acor Web — главная">acor<span className="brand-slash">/</span><small>web</small></a>
      <span>Дизайн с характером. Разработка с мыслью.</span>
      <nav aria-label="Ссылки в подвале">
        {footerNavigation.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <small>© Acor Web, 2026</small>
    </div>
  </>
);
