import type { CSSProperties, ReactElement } from 'react';
import { CaseVisual } from '../../../shared/ui/CaseVisual';

export const CaseGreenflowPage = (): ReactElement => (
  <>
    <section className="page-intro wrap">
      <p className="eyebrow">{"Commerce / Web / Study 02"}</p>
      <h1>
{"Природа ближе,"}
        <br />
        <em>{"чем кажется."}</em>
      </h1>
      <p className="intro-description">{"Концепция магазина растений, где спокойная визуальная среда помогает выбрать живую деталь для своего пространства."}</p>
    </section>
    <section className="wrap case-scene project--flora" data-study="commerce" data-case-demo="commerce" style={{ viewTransitionName: 'case-study-commerce' } as CSSProperties}>
      <CaseVisual kind="commerce" />
    </section>
    <section className="wrap case-demo section-space" aria-labelledby="commerce-demo-title">
      <div className="case-demo-heading">
        <div>
          <p className="eyebrow">{"Интерактив / каталог"}</p>
          <h2 id="commerce-demo-title">{"Соберите настроение подборки."}</h2>
        </div>
        <p>{"Фильтр меняет акцент карточек и показывает, как эмоциональная подача может вести к практичному действию."}</p>
      </div>
      <div className="case-demo-controls" role="group" aria-label="Категория commerce-концепции">
        <button type="button" className="case-demo-button is-active" data-demo-value="stone" aria-pressed="true">{"Камень"}</button>
        <button type="button" className="case-demo-button" data-demo-value="textile" aria-pressed="false">{"Текстиль"}</button>
        <button type="button" className="case-demo-button" data-demo-value="light" aria-pressed="false">{"Свет"}</button>
      </div>
      <output className="case-demo-output" data-demo-output="">{"Камень — фактура и спокойный контраст для первого экрана."}</output>
      <details className="case-annotation">
        <summary>{"Почему так устроено"}</summary>
        <p>{"Категории остаются короткими и визуальными. Человеку легче начать с ощущения, а уточняющие данные появляются в карточке и на следующем шаге."}</p>
      </details>
    </section>
    <section className="wrap section-space case-story">
      <div>
        <p className="eyebrow">{"Задача концепции"}</p>
        <h2>{"Соединить эмоциональный выбор с понятной покупкой."}</h2>
      </div>
      <div>
        <p className="eyebrow">{"Наше решение"}</p>
        <p>{"Натуральная палитра, предметная фотография и простая структура каталога. Информация об уходе становится частью выбора, а не примечанием."}</p>
        <p className="case-note">{"Демонстрационная study Acor Web. Изображения и данные абстрактны и показывают принцип, а не результат реального клиента."}</p>
      </div>
    </section>
    <section className="wrap case-details section-space" aria-labelledby="case-details-title">
      <div className="case-details-heading">
        <div>
          <p className="eyebrow">{"Решение / в разрезе"}</p>
          <h2 id="case-details-title">{"От вдохновения к заботливому выбору."}</h2>
        </div>
        <p>{"Соединили предметную фотографию с практичной информацией: настроение остаётся первым, но следующий шаг всегда рядом."}</p>
      </div>
      <div className="case-info-grid">
        <article>
          <span>{"Контекст"}</span>
          <strong>{"Онлайн-магазин растений и предметов для дома"}</strong>
        </article>
        <article>
          <span>{"Для кого"}</span>
          <strong>{"Люди, которые выбирают живую деталь для пространства"}</strong>
        </article>
        <article>
          <span>{"Фокус"}</span>
          <strong>{"Эмоция выбора, уход и простая покупка"}</strong>
        </article>
        <article>
          <span>{"На выходе"}</span>
          <strong>{"Каталог, который помогает решиться"}</strong>
        </article>
      </div>
      <div className="case-compare" data-compare="" style={{ '--compare': '62%' } as CSSProperties}>
        <div className="case-compare-top">
          <div>
            <p className="eyebrow">{"Структура / до и после"}</p>
            <h3>{"Проведите линию и сравните ход мысли."}</h3>
          </div>
          <output data-compare-output="">{"62%"}</output>
        </div>
        <div className="case-compare-stage">
          <div className="case-compare-base">
            <span>{"Собранная форма"}</span>
            <div className="compare-commerce-ui" aria-hidden="true"><span>CURATED OBJECTS / 02</span><strong>Texture first.</strong><div><i></i><i></i><i></i></div></div>
          </div>
          <div className="case-compare-overlay">
            <span>{"Черновая структура"}</span>
            <div className="compare-wireframe" aria-hidden="true">
              <i></i>
              <i></i>
              <i></i>
              <b></b>
            </div>
            <strong>
{"Сначала — вопрос."}
              <br />
{"Потом — ответ."}
            </strong>
          </div>
          <input type="range" min="15" max="85" defaultValue="62" aria-label="Сравнить черновую структуру и собранную форму" data-compare-range="" />
        </div>
        <p className="case-compare-caption">{"Слева — рабочая схема мысли. Справа — визуальное решение, которое из неё выросло."}</p>
      </div>
      <ol className="case-timeline">
        <li>
          <span>{"01"}</span>
          <b>{"Контекст"}</b>
          <p>{"Сделать покупку растения спокойным решением."}</p>
        </li>
        <li>
          <span>{"02"}</span>
          <b>{"Иерархия"}</b>
          <p>{"Разделить вдохновение, выбор и уход."}</p>
        </li>
        <li>
          <span>{"03"}</span>
          <b>{"Форма"}</b>
          <p>{"Показать живой объект крупно и честно."}</p>
        </li>
        <li>
          <span>{"04"}</span>
          <b>{"Следующий шаг"}</b>
          <p>{"Подвести к каталогу без лишнего давления."}</p>
        </li>
      </ol>
    </section>
    <section className="wrap case-next">
      <a className="text-link" href="/cases">{"← Ко всем проектам"}</a>
      <a className="dark-button" href="/contact">{"Обсудить похожую задачу ↗︎"}</a>
    </section>
  </>
);
