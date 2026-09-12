import type { ReactElement } from 'react';

export const CasesPage = (): ReactElement => (
  <>
    <section className="page-intro wrap">
      <p className="eyebrow">{"Портфолио / концепции"}</p>
      <h1>
{"Каждый проект —"}
        <br />
        <em>{"новый ракурс."}</em>
      </h1>
      <p className="intro-description">{"Визуальные и продуктовые исследования студии. Эти проекты демонстрируют подход; изображения и данные в интерфейсах — концептуальные."}</p>
    </section>
    <section className="wrap work-section">
      <div className="filters" role="group" aria-label="Фильтр проектов">
        <button type="button" className="filter active" data-filter="all" aria-pressed="true">
{"Все проекты "}
          <small>{"03"}</small>
        </button>
        <button type="button" className="filter" data-filter="web" aria-pressed="false">{"Web"}</button>
        <button type="button" className="filter" data-filter="commerce" aria-pressed="false">{"E-commerce"}</button>
        <button type="button" className="filter" data-filter="product" aria-pressed="false">{"Продукты"}</button>
      </div>
      <div className="work-tools">
        <div className="work-sort" role="group" aria-label="Сортировка проектов">
          <span>{"Порядок"}</span>
          <button type="button" className="work-sort-button is-selected" data-project-sort="curated" aria-pressed="true">{"Избранное"}</button>
          <button type="button" className="work-sort-button" data-project-sort="alphabetical" aria-pressed="false">{"По названию"}</button>
        </div>
        <div className="work-view" role="group" aria-label="Вид проектов">
          <span>{"Вид"}</span>
          <button type="button" className="work-view-button is-selected" data-project-view="grid" aria-pressed="true">{"Сетка"}</button>
          <button type="button" className="work-view-button" data-project-view="list" aria-pressed="false">{"Список"}</button>
        </div>
        <span className="saved-projects" id="saved-projects" role="status"></span>
      </div>
      <p className="sr-only" role="status" id="filter-status"></p>
      <div className="project-grid">
        <article className="project project--arden project--wide" data-category="web">
          <a className="project-link" href="/cases/arden" data-cursor="Смотреть ↗︎">
            <div className="project-visual">
              <img src="/assets/arden.jpg" alt="Светлая архитектура Arden с оливковым деревом и отражением в воде" loading="lazy" width="1536" height="1024" />
              <span className="project-type">{"Архитектура · Web"}</span>
              <span className="project-wordmark">{"Arden"}</span>
            </div>
            <div className="project-caption">
              <div>
                <h3>{"Arden"}</h3>
                <p>{"Архитектура, которую можно почувствовать."}</p>
              </div>
              <span className="concept-label">{"Концепт / 2026"}</span>
            </div>
          </a>
          <button type="button" className="project-quickview" data-gallery-open="" aria-label="Посмотреть Arden на весь экран" hidden>
            <span>{"Смотреть ближе"}</span>
            <i aria-hidden="true">{"⤢"}</i>
          </button>
        </article>
        <article className="project project--flora " data-category="commerce">
          <a className="project-link" href="/cases/greenflow" data-cursor="Смотреть ↗︎">
            <div className="project-visual">
              <img src="/assets/flora.jpg" alt="Ботаническая композиция GreenFlow в оливковых и кремовых тонах" loading="lazy" width="1536" height="1024" />
              <span className="project-type">{"E-commerce · Бренд"}</span>
              <span className="project-wordmark">{"GreenFlow"}</span>
            </div>
            <div className="project-caption">
              <div>
                <h3>{"GreenFlow"}</h3>
                <p>{"Ближе к природе. Даже онлайн."}</p>
              </div>
              <span className="concept-label">{"Концепт / 2026"}</span>
            </div>
          </a>
          <button type="button" className="project-quickview" data-gallery-open="" aria-label="Посмотреть GreenFlow на весь экран" hidden>
            <span>{"Смотреть ближе"}</span>
            <i aria-hidden="true">{"⤢"}</i>
          </button>
        </article>
        <article className="project project--orbit " data-category="product">
          <a className="project-link" href="/cases/orbit" data-cursor="Смотреть ↗︎">
            <div className="project-visual">
              <div className="orbit-composition" aria-hidden="true">
                <div className="orbit-dashboard">
                  <div className="dash-nav">
                    <b>
{"orbit"}
                      <span>{"↗︎"}</span>
                    </b>
                    <span>{"Обзор"}</span>
                    <span>{"Мои счета"}</span>
                    <span>{"Аналитика"}</span>
                    <span>{"Платежи"}</span>
                    <small>{"Всё под контролем."}</small>
                  </div>
                  <div className="dash-main">
                    <div className="dash-top">
{"Ваш финансовый обзор "}
                      <i>{"О"}</i>
                    </div>
                    <p className="muted">{"Общий баланс"}</p>
                    <strong>
{"284 650 "}
                      <small>{"₽"}</small>
                    </strong>
                    <div className="dash-chart">
                      <svg viewBox="0 0 420 140">
                        <defs>
                          <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                            <stop stopColor="#4166f5" stopOpacity=".25"></stop>
                            <stop offset="1" stopColor="#4166f5" stopOpacity="0"></stop>
                          </linearGradient>
                        </defs>
                        <path d="M0 126 C40 126 48 74 80 88 S126 121 155 75 S210 85 245 48 S295 77 323 30 S370 53 420 8 L420 140 L0 140Z" fill="url(#chart-fill)"></path>
                        <path d="M0 126 C40 126 48 74 80 88 S126 121 155 75 S210 85 245 48 S295 77 323 30 S370 53 420 8" fill="none" stroke="#4166f5" strokeWidth="3"></path>
                      </svg>
                    </div>
                    <div className="dash-totals">
                      <span>
{"Поступления"}
                        <b>{"+ 86 400 ₽"}</b>
                      </span>
                      <span>
{"Расходы"}
                        <b>{"− 32 780 ₽"}</b>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="orbit-phone">
                  <div className="phone-notch"></div>
                  <span>{"orbit ↗︎"}</span>
                  <small>{"Свобода в цифрах"}</small>
                  <b>{"284 650 ₽"}</b>
                  <div className="bank-card">
                    <span>{"orbit / debit"}</span>
                    <b>{"•••• 4082"}</b>
                    <small>{"YOUR EVERYDAY"}</small>
                  </div>
                  <div className="phone-actions">
                    <i>{"↗︎"}</i>
                    <i>{"＋"}</i>
                    <i>{"⇄"}</i>
                  </div>
                  <p>
{"Ваши деньги."}
                    <br />
{"Ваш следующий шаг."}
                  </p>
                </div>
              </div>
              <span className="project-type">{"Fintech · Web / Mobile"}</span>
              <span className="project-wordmark">{"Orbit"}</span>
            </div>
            <div className="project-caption">
              <div>
                <h3>{"Orbit"}</h3>
                <p>{"Финансы в человеческом масштабе."}</p>
              </div>
              <span className="concept-label">{"Концепт / 2026"}</span>
            </div>
          </a>
          <button type="button" className="project-quickview" data-gallery-open="" aria-label="Посмотреть Orbit на весь экран" hidden>
            <span>{"Смотреть ближе"}</span>
            <i aria-hidden="true">{"⤢"}</i>
          </button>
        </article>
      </div>
    </section>
    <dialog className="project-gallery" id="project-gallery" aria-labelledby="gallery-title">
      <header className="gallery-header">
        <div>
          <p className="eyebrow">{"Acor / Концепции"}</p>
          <h2 id="gallery-title"></h2>
        </div>
        <span id="gallery-count" aria-live="polite"></span>
        <button type="button" className="gallery-close" aria-label="Закрыть просмотр">{"×"}</button>
      </header>
      <div className="gallery-stage" id="gallery-stage"></div>
      <footer className="gallery-footer">
        <p id="gallery-description"></p>
        <div className="gallery-controls">
          <button type="button" id="gallery-prev" aria-label="Предыдущий проект">{"←"}</button>
          <button type="button" id="gallery-next" aria-label="Следующий проект">{"→"}</button>
        </div>
        <a className="dark-button" id="gallery-case" href="/cases">{"Подробнее о проекте ↗︎"}</a>
      </footer>
      <p className="gallery-hint">{"Листайте стрелками или свайпом"}</p>
    </dialog>
  </>
);
