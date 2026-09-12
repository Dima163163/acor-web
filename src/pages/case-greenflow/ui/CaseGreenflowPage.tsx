import type { CSSProperties, ReactElement } from 'react';

export const CaseGreenflowPage = (): ReactElement => (
  <>
    <section className="page-intro wrap">
      <p className="eyebrow">{"E-commerce / Бренд / Концепт"}</p>
      <h1>
{"Природа ближе,"}
        <br />
        <em>{"чем кажется."}</em>
      </h1>
      <p className="intro-description">{"Концепция магазина растений, где спокойная визуальная среда помогает выбрать живую деталь для своего пространства."}</p>
    </section>
    <section className="wrap case-scene project--flora">
      <img src="/assets/flora.jpg" alt="Визуальная концепция GreenFlow" width="1536" height="1024" />
    </section>
    <section className="wrap section-space case-story">
      <div>
        <p className="eyebrow">{"Задача концепции"}</p>
        <h2>{"Соединить эмоциональный выбор с понятной покупкой."}</h2>
      </div>
      <div>
        <p className="eyebrow">{"Наше решение"}</p>
        <p>{"Натуральная палитра, предметная фотография и простая структура каталога. Информация об уходе становится частью выбора, а не примечанием."}</p>
        <p className="case-note">{"Демонстрационная концепция Acor Web. Визуализации созданы для портфолио; результаты реального клиента не заявляются."}</p>
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
            <img src="/assets/flora.jpg" alt="Визуальная форма проекта" loading="lazy" width="1536" height="1024" />
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
