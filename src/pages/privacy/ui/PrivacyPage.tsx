import type { ReactElement } from 'react';

export const PrivacyPage = (): ReactElement => (
  <>
    <section className="page-intro wrap">
      <p className="eyebrow">{"Acor Web / прозрачность"}</p>
      <h1>
{"Данные должны быть"}
        <br />
        <em>{"понятными."}</em>
      </h1>
      <p className="intro-description">{"Здесь коротко описано, что происходит с информацией в демо-версии сайта."}</p>
    </section>
    <section className="wrap section-space privacy-content">
      <div className="privacy-grid">
        <article>
          <span>{"01"}</span>
          <h2>{"Форма"}</h2>
          <p>{"Поля брифа остаются в текущей сессии браузера, чтобы не потерять текст при переходе. Серверная отправка не подключена: кнопка готовит письмо в вашем почтовом приложении."}</p>
        </article>
        <article>
          <span>{"02"}</span>
          <h2>{"Настройки"}</h2>
          <p>{"Тема, режим анимации, вид портфолио и избранные проекты сохраняются локально на устройстве. Их можно удалить очисткой данных сайта."}</p>
        </article>
        <article>
          <span>{"03"}</span>
          <h2>{"Связь"}</h2>
          <p>
{"Для обсуждения проекта используйте "}
            <a className="text-link" href="mailto:hello@acorweb.ru">{"hello@acorweb.ru ↗︎"}</a>
{". Перед публикацией адрес и юридические формулировки нужно подтвердить владельцу проекта."}
          </p>
        </article>
      </div>
      <div className="privacy-note">
        <p className="eyebrow">{"Демо-режим"}</p>
        <p>{"На сайте нет рекламных трекеров, личного кабинета или скрытой отправки данных. Если появится аналитика или интеграция с CRM, этот экран нужно обновить и согласовать текст отдельно."}</p>
      </div>
    </section>
  </>
);
