import type { CSSProperties, ReactElement } from 'react';
import { CaseVisual } from '../../../shared/ui/CaseVisual';

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
        <article className="project project--arden project--wide" data-category="web" data-study="architecture">
          <a className="project-link" href="/cases/arden" data-cursor="Смотреть ↗︎">
            <div className="project-visual" style={{ viewTransitionName: 'case-study-architecture' } as CSSProperties}>
              <CaseVisual kind="architecture" />
            </div>
            <div className="project-caption">
              <div>
                <h3>{"Field / 01"}</h3>
                <p>{"Сайт архитектурной студии о свете, объёме и тихом маршруте."}</p>
              </div>
              <span className="concept-label">{"Концепт / 2026"}</span>
            </div>
          </a>
          <button type="button" className="project-quickview" data-gallery-open="" aria-label="Посмотреть архитектурную концепцию на весь экран" hidden>
            <span>{"Смотреть ближе"}</span>
            <i aria-hidden="true">{"⤢"}</i>
          </button>
        </article>
        <article className="project project--flora " data-category="commerce" data-study="commerce">
          <a className="project-link" href="/cases/greenflow" data-cursor="Смотреть ↗︎">
            <div className="project-visual" style={{ viewTransitionName: 'case-study-commerce' } as CSSProperties}>
              <CaseVisual kind="commerce" />
            </div>
            <div className="project-caption">
              <div>
                <h3>{"Material / 02"}</h3>
                <p>{"E-commerce для предметов, ароматов и спокойных ритуалов."}</p>
              </div>
              <span className="concept-label">{"Концепт / 2026"}</span>
            </div>
          </a>
          <button type="button" className="project-quickview" data-gallery-open="" aria-label="Посмотреть commerce-концепцию на весь экран" hidden>
            <span>{"Смотреть ближе"}</span>
            <i aria-hidden="true">{"⤢"}</i>
          </button>
        </article>
        <article className="project project--orbit " data-category="product" data-study="product">
          <a className="project-link" href="/cases/orbit" data-cursor="Смотреть ↗︎">
            <div className="project-visual" style={{ viewTransitionName: 'case-study-product' } as CSSProperties}>
              <CaseVisual kind="product" />
            </div>
            <div className="project-caption">
              <div>
                <h3>{"Vector / 03"}</h3>
                <p>{"Климатическая платформа для ясных решений о ресурсах."}</p>
              </div>
              <span className="concept-label">{"Концепт / 2026"}</span>
            </div>
          </a>
          <button type="button" className="project-quickview" data-gallery-open="" aria-label="Посмотреть продуктовую концепцию на весь экран" hidden>
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
