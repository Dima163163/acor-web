import type { CSSProperties, ReactElement } from 'react';

export const CaseOrbitPage = (): ReactElement => (
  <>
    <section className="page-intro wrap">
      <p className="eyebrow">{"Fintech / Web + Mobile / Концепт"}</p>
      <h1>
{"Ваши деньги."}
        <br />
        <em>{"Ваше движение."}</em>
      </h1>
      <p className="intro-description">{"Исследование финансового интерфейса: баланс, повседневные операции и личные цели в одной понятной системе."}</p>
    </section>
    <section className="wrap case-scene project--orbit">
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
    </section>
    <section className="wrap section-space case-story">
      <div>
        <p className="eyebrow">{"Задача концепции"}</p>
        <h2>{"Снизить визуальный шум и дать человеку ясную картину."}</h2>
      </div>
      <div>
        <p className="eyebrow">{"Наше решение"}</p>
        <p>{"Главное видно сразу. Второстепенное открывается по запросу. Web и мобильный интерфейс используют общий визуальный язык."}</p>
        <p className="case-note">{"Демонстрационная концепция Acor Web. Визуализации созданы для портфолио; результаты реального клиента не заявляются."}</p>
      </div>
    </section>
    <section className="wrap case-details section-space" aria-labelledby="case-details-title">
      <div className="case-details-heading">
        <div>
          <p className="eyebrow">{"Решение / в разрезе"}</p>
          <h2 id="case-details-title">{"От цифр на экране к ощущению контроля."}</h2>
        </div>
        <p>{"Собрали интерфейс вокруг одного спокойного вопроса: что важно увидеть сейчас, а что можно открыть позже."}</p>
      </div>
      <div className="case-info-grid">
        <article>
          <span>{"Контекст"}</span>
          <strong>{"Финансовый продукт для ежедневных решений"}</strong>
        </article>
        <article>
          <span>{"Для кого"}</span>
          <strong>{"Люди, которым нужна ясная картина своих денег"}</strong>
        </article>
        <article>
          <span>{"Фокус"}</span>
          <strong>{"Баланс между обзором и деталями"}</strong>
        </article>
        <article>
          <span>{"На выходе"}</span>
          <strong>{"Web и mobile с общей логикой"}</strong>
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
            <img src="/assets/sculpture.jpg" alt="Визуальная форма проекта" loading="lazy" width="1536" height="1024" />
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
          <p>{"Снизить шум вокруг ежедневных финансовых действий."}</p>
        </li>
        <li>
          <span>{"02"}</span>
          <b>{"Иерархия"}</b>
          <p>{"Вывести баланс и следующий шаг на первый план."}</p>
        </li>
        <li>
          <span>{"03"}</span>
          <b>{"Форма"}</b>
          <p>{"Синхронизировать web и mobile в одном языке."}</p>
        </li>
        <li>
          <span>{"04"}</span>
          <b>{"Следующий шаг"}</b>
          <p>{"Дать пользователю чувство контроля без перегруза."}</p>
        </li>
      </ol>
    </section>
    <section className="wrap case-next">
      <a className="text-link" href="/cases">{"← Ко всем проектам"}</a>
      <a className="dark-button" href="/contact">{"Обсудить похожую задачу ↗︎"}</a>
    </section>
  </>
);
