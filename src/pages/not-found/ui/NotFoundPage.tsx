import type { ReactElement } from 'react';

export const NotFoundPage = (): ReactElement => (
  <>
    <p className="eyebrow">{"Acor Web / 404"}</p>
    <h1>
{"Эта страница"}
      <br />
      <em>{"ушла дальше."}</em>
    </h1>
    <p className="intro-description">{"Вернитесь в студию или откройте портфолио — там всё на месте."}</p>
    <div className="error-actions">
      <a className="dark-button" href="/">{"На главную ↗︎"}</a>
      <a className="text-link" href="/cases">{"Смотреть проекты ↗︎"}</a>
    </div>
  </>
);
