import type { ReactElement } from 'react';

export const HomePage = (): ReactElement => (
  <>
    <section className="hero wrap">
      <div className="hero-topline">
        <p className="eyebrow">
          <span className="live-dot"></span>
{" Независимая digital-студия"}
        </p>
        <span className="hero-index">{"ДИЗАЙН / ТЕХНОЛОГИИ / ХАРАКТЕР"}</span>
      </div>
      <div className="hero-copy">
        <h1>
          <span className="hero-line">{"Хорошим идеям"}</span>
          <span className="hero-line">
{"нужна "}
            <em>{"форма."}</em>
          </span>
        </h1>
        <p>
{"Создаём сайты и приложения,"}
          <br />
{"в которых смысл становится опытом."}
        </p>
        <a className="round-link" href="/cases">
          <span className="round-arrow">{"↗︎"}</span>
          <span>{"Смотреть проекты"}</span>
        </a>
      </div>
      <div className="hero-art" data-parallax="">
        <img src="/assets/sculpture.jpg" alt="Объёмная буква A из переплетённых серебристой и кобальтовой лент" width="1536" height="1024" fetchPriority="high" />
        <span className="art-caption">{"ACOR / FORM STUDY — 001"}</span>
      </div>
      <div className="hero-bottom">
        <a href="#approach" className="scroll-link">
          <span>{"↓"}</span>
{" Листайте. Дальше интереснее."}
        </a>
        <span>{"Стратегия. Дизайн. Разработка."}</span>
        <button type="button" className="motion-toggle" aria-pressed="false">
{"Анимация: вкл "}
          <span aria-hidden="true">{"◉"}</span>
        </button>
      </div>
    </section>
    <section className="studio-marquee" aria-label="Направления Acor Web">
      <div className="studio-marquee-track">
        <span>{"Смысл"}</span>
        <i>{"×"}</i>
        <span>{"Форма"}</span>
        <i>{"×"}</i>
        <span>{"Движение"}</span>
        <i>{"×"}</i>
        <span>{"Технологии"}</span>
        <i>{"×"}</i>
        <span>{"Смысл"}</span>
        <i>{"×"}</i>
        <span>{"Форма"}</span>
        <i>{"×"}</i>
        <span>{"Движение"}</span>
        <i>{"×"}</i>
        <span>{"Технологии"}</span>
        <i>{"×"}</i>
      </div>
    </section>
    <section className="manifesto wrap section-space" id="approach">
      <p className="eyebrow">{"Форма следует за смыслом"}</p>
      <div>
        <h2 className="statement" data-reveal="">
{"Между «просто работает»"}
          <br />
{"и "}
          <span>{"«невозможно забыть»."}</span>
          <br />
{"Мы ищем точку встречи."}
        </h2>
        <div className="manifesto-bottom">
          <p>{"Соединяем смелый дизайн и внимательную разработку. Чтобы продукт не только запоминался, но и помогал людям решать свои задачи."}</p>
          <a className="text-link" href="/about">{"Ближе к студии ↗︎"}</a>
        </div>
      </div>
    </section>
    <section className="work-section wrap" id="work">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{"Избранные концепции"}</p>
          <h2>{"Работы говорят."}</h2>
        </div>
        <a className="text-link" href="/cases">{"Все проекты ↗︎"}</a>
      </div>
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
    <section className="capabilities wrap section-space" id="services">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{"Что мы делаем"}</p>
          <h2>
{"От первой мысли."}
            <br />
            <span className="muted">{"До следующей версии."}</span>
          </h2>
        </div>
        <p>
{"Одна команда на всём пути."}
          <br />
{"Столько экспертизы, сколько нужно задаче."}
        </p>
      </div>
      <div className="service-list">
        <details className="service-item" open>
          <summary>
            <span className="service-dot" aria-hidden="true"></span>
            <h3>{"Стратегия и аналитика"}</h3>
            <span className="service-plus" aria-hidden="true">{"+"}</span>
          </summary>
          <div className="service-body">
            <h4>{"Разбираемся в задаче до первого экрана."}</h4>
            <div>
              <p>{"Проводим интервью, изучаем пользовательские сценарии и собираем требования. Результат — понятная структура продукта и план следующего этапа."}</p>
              <span className="service-tags">{"Исследование · Продуктовая стратегия · UX-аудит"}</span>
              <a className="text-link" href="/contact?type=web">{"Обсудить задачу ↗︎"}</a>
            </div>
          </div>
        </details>
        <details className="service-item">
          <summary>
            <span className="service-dot" aria-hidden="true"></span>
            <h3>{"Дизайн и айдентика"}</h3>
            <span className="service-plus" aria-hidden="true">{"+"}</span>
          </summary>
          <div className="service-body">
            <h4>{"Находим форму, которую узнают."}</h4>
            <div>
              <p>{"Создаём визуальную концепцию, проектируем интерфейсы и объединяем их в дизайн-систему. Продумываем поведение каждой детали, от типографики до анимации."}</p>
              <span className="service-tags">{"UX/UI · Art direction · Дизайн-система · Motion"}</span>
              <a className="text-link" href="/contact?type=design">{"Обсудить задачу ↗︎"}</a>
            </div>
          </div>
        </details>
        <details className="service-item">
          <summary>
            <span className="service-dot" aria-hidden="true"></span>
            <h3>{"Web и mobile"}</h3>
            <span className="service-plus" aria-hidden="true">{"+"}</span>
          </summary>
          <div className="service-body">
            <h4>{"Превращаем концепцию в работающий продукт."}</h4>
            <div>
              <p>{"Разрабатываем сайты, личные кабинеты и приложения. Соединяем интерфейс, серверную логику и необходимые сервисы, проверяем сценарии перед запуском."}</p>
              <span className="service-tags">{"Frontend · Backend · iOS / Android · QA"}</span>
              <a className="text-link" href="/contact?type=web">{"Обсудить задачу ↗︎"}</a>
            </div>
          </div>
        </details>
        <details className="service-item">
          <summary>
            <span className="service-dot" aria-hidden="true"></span>
            <h3>{"Развитие продукта"}</h3>
            <span className="service-plus" aria-hidden="true">{"+"}</span>
          </summary>
          <div className="service-body">
            <h4>{"Запуск — точка нового отсчёта."}</h4>
            <div>
              <p>{"Наблюдаем за тем, как продуктом пользуются. Улучшаем сценарии, проверяем гипотезы и развиваем функциональность вместе с вашей командой."}</p>
              <span className="service-tags">{"Поддержка · Аналитика · SEO · Новые функции"}</span>
              <a className="text-link" href="/contact?type=web">{"Обсудить задачу ↗︎"}</a>
            </div>
          </div>
        </details>
      </div>
    </section>
    <section className="project-builder wrap section-space" aria-labelledby="builder-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{"Ваша идея — точка старта"}</p>
          <h2 id="builder-title">
{"А что создадим "}
            <em>{"вместе?"}</em>
          </h2>
        </div>
        <p>
{"Выберите направление."}
          <br />
{"Посмотрите, как меняется команда."}
        </p>
      </div>
      <div className="builder-grid">
        <div className="builder-options" role="group" aria-label="Тип будущего проекта">
          <button className="builder-option active" data-project-type="web" aria-pressed="true">
            <span>{"Сайт с характером"}</span>
            <small>{"Бренд, пространство, история"}</small>
            <i>{"↗︎"}</i>
          </button>
          <button className="builder-option" data-project-type="app" aria-pressed="false">
            <span>{"Удобное приложение"}</span>
            <small>{"Продукт в повседневной жизни"}</small>
            <i>{"↗︎"}</i>
          </button>
          <button className="builder-option" data-project-type="design" aria-pressed="false">
            <span>{"Новая визуальная система"}</span>
            <small>{"Идея, которую узнают"}</small>
            <i>{"↗︎"}</i>
          </button>
        </div>
        <div className="builder-preview" data-builder-state="web">
          <div className="builder-mini-browser" aria-hidden="true">
            <div className="mini-browser-top">
              <i></i>
              <i></i>
              <i></i>
              <span>{"your next big thing"}</span>
            </div>
            <div className="mini-browser-body">
              <span className="mini-eyebrow">{"ВАША ИДЕЯ / ACOR WEB"}</span>
              <strong className="builder-art-title">
{"Есть идея."}
                <br />
{"Будет сайт."}
              </strong>
              <span className="builder-graphic">
                <i></i>
                <i></i>
                <i></i>
              </span>
              <span className="mini-browser-link">{"Начать историю ↗︎"}</span>
            </div>
          </div>
          <div className="builder-response" aria-live="polite">
            <h3 id="builder-heading">{"Впечатление с первого экрана."}</h3>
            <p id="builder-description">{"От структуры и визуальной идеи до быстрого, адаптивного сайта."}</p>
            <div className="builder-team" id="builder-team">
              <span>{"Аналитик"}</span>
              <span>{"Дизайнер"}</span>
              <span>{"Frontend"}</span>
              <span>{"Backend"}</span>
            </div>
          </div>
          <a className="text-link" id="builder-cta" href="/contact?type=web">{"Обсудить сайт ↗︎"}</a>
        </div>
      </div>
    </section>
    <section className="studio-section" id="people">
      <div className="wrap studio-grid">
        <div>
          <p className="eyebrow">{"Люди за результатом"}</p>
          <h2>
{"Разные взгляды."}
            <br />
{"Общий фокус."}
          </h2>
          <p>{"Аналитики, дизайнеры и разработчики за одним столом. Обсуждаем, пробуем, находим. Вместе с вами."}</p>
          <a className="light-button" href="/team">{"Познакомиться с командой ↗︎"}</a>
        </div>
        <a href="/team" className="team-art" aria-label="Познакомиться с командой">
          <span className="team-ring"></span>
          <span className="portrait-fan" aria-hidden="true">
            <span className="fan-card fan-card--1">
              <span className="person-portrait" style={{backgroundImage: "url('/assets/team-1.jpg')", backgroundPosition: "0% 0%"}}></span>
              <small>{"ANALYSIS"}</small>
            </span>
            <span className="fan-card fan-card--2">
              <span className="person-portrait" style={{backgroundImage: "url('/assets/team-1.jpg')", backgroundPosition: "0% 100%"}}></span>
              <small>{"DESIGN"}</small>
            </span>
            <span className="fan-card fan-card--3">
              <span className="person-portrait" style={{backgroundImage: "url('/assets/team-2.jpg')", backgroundPosition: "50% 0%"}}></span>
              <small>{"DEVELOPMENT"}</small>
            </span>
          </span>
          <span className="team-art-caption">{"СОБИРАЕМСЯ ВОКРУГ ВАШЕЙ ЗАДАЧИ"}</span>
        </a>
      </div>
    </section>
    <section className="process-experience wrap section-space" id="process">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{"Как идея становится продуктом"}</p>
          <h2>
{"У каждого шага —"}
            <br />
            <em>{"понятный результат."}</em>
          </h2>
        </div>
        <p>
{"Выберите этап."}
          <br />
{"Покажем, что происходит внутри."}
        </p>
      </div>
      <div className="process-tabs" role="tablist" aria-label="Этапы проекта">
        <button type="button" id="step-tab-0" role="tab" aria-selected="true" aria-controls="step-panel-0" data-step="0">
          <span>{"01"}</span>
{"Погружение"}
          <i aria-hidden="true">{"↗︎"}</i>
        </button>
        <button type="button" id="step-tab-1" role="tab" aria-selected="false" aria-controls="step-panel-1" tabIndex={-1} data-step="1">
          <span>{"02"}</span>
{"Создание"}
          <i aria-hidden="true">{"↗︎"}</i>
        </button>
        <button type="button" id="step-tab-2" role="tab" aria-selected="false" aria-controls="step-panel-2" tabIndex={-1} data-step="2">
          <span>{"03"}</span>
{"Запуск"}
          <i aria-hidden="true">{"↗︎"}</i>
        </button>
      </div>
      <div className="process-panels">
        <section id="step-panel-0" className="step-panel" role="tabpanel" aria-labelledby="step-tab-0" tabIndex={0}>
          <div className="step-copy">
            <p className="eyebrow">{"Сначала — правильные вопросы"}</p>
            <h3>
{"Собираем картину."}
              <br />
{"Находим главное."}
            </h3>
            <p>{"Проводим интервью, разбираем аудиторию и пользовательские сценарии. Вместе определяем, что продукт должен изменить."}</p>
            <div className="deliverables">
              <span>{"На выходе"}</span>
              <ul>
                <li>{"Карта сценариев"}</li>
                <li>{"Требования к продукту"}</li>
                <li>{"План работы"}</li>
              </ul>
            </div>
          </div>
          <div className="process-art process-art--map" aria-hidden="true">
            <div className="map-node map-node--root">
{"Ваша задача "}
              <b>{"↗︎"}</b>
            </div>
            <span className="map-stem"></span>
            <div className="map-branches">
              <span>{"Аудитория"}</span>
              <span>{"Сценарии"}</span>
              <span>{"Контекст"}</span>
            </div>
            <div className="map-note">
              <span>{"INSIGHT / 01"}</span>
              <strong>
{"Понять человека."}
                <br />
{"Найти решение."}
              </strong>
              <div className="note-line"></div>
              <div className="note-line short"></div>
            </div>
            <small className="process-art-label">{"ОТ ВОПРОСОВ К ЯСНОСТИ"}</small>
          </div>
        </section>
        <section id="step-panel-1" className="step-panel" role="tabpanel" aria-labelledby="step-tab-1" tabIndex={0} hidden>
          <div className="step-copy">
            <p className="eyebrow">{"Идея приобретает форму"}</p>
            <h3>
{"Пробуем. Обсуждаем."}
              <br />
{"Доводим до деталей."}
            </h3>
            <p>{"Создаём концепцию, проверяем сценарии на прототипе и превращаем дизайн в работающий интерфейс. Показываем промежуточные версии."}</p>
            <div className="deliverables">
              <span>{"На выходе"}</span>
              <ul>
                <li>{"Визуальная концепция"}</li>
                <li>{"Дизайн-система"}</li>
                <li>{"Рабочий продукт"}</li>
              </ul>
            </div>
          </div>
          <div className="process-art process-art--design" aria-hidden="true">
            <div className="design-sheet sheet-back">
              <span>{"DESIGN SYSTEM"}</span>
              <div className="color-swatches">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>
              <b>{"Aa"}</b>
              <div className="note-line"></div>
            </div>
            <div className="design-sheet sheet-front">
              <span>{"YOUR NEXT PRODUCT"}</span>
              <strong>
{"Идея."}
                <br />
{"Форма."}
                <br />
{"Действие."}
              </strong>
              <i className="sheet-action">{"↗︎"}</i>
            </div>
            <small className="process-art-label">{"ОТ КОНЦЕПЦИИ К ОПЫТУ"}</small>
          </div>
        </section>
        <section id="step-panel-2" className="step-panel" role="tabpanel" aria-labelledby="step-tab-2" tabIndex={0} hidden>
          <div className="step-copy">
            <p className="eyebrow">{"Всё готово к первому пользователю"}</p>
            <h3>
{"Проверяем важное."}
              <br />
{"Запускаем уверенно."}
            </h3>
            <p>{"Тестируем продукт на разных устройствах, готовим выпуск и передаём команде понятные инструкции. Договариваемся о дальнейшем развитии."}</p>
            <div className="deliverables">
              <span>{"На выходе"}</span>
              <ul>
                <li>{"Протестированные сценарии"}</li>
                <li>{"Опубликованный продукт"}</li>
                <li>{"План развития"}</li>
              </ul>
            </div>
          </div>
          <div className="process-art process-art--launch" aria-hidden="true">
            <div className="release-sheet">
              <span>{"RELEASE CHECKLIST"}</span>
              <strong>
{"Готово"}
                <br />
{"к большему."}
              </strong>
              <p>
                <i>{"✓"}</i>
{" Интерфейс и сценарии"}
              </p>
              <p>
                <i>{"✓"}</i>
{" Скорость и адаптивность"}
              </p>
              <p>
                <i>{"✓"}</i>
{" Доступность и качество"}
              </p>
              <span className="launch-state">
                <i></i>
{"Можно запускать"}
              </span>
            </div>
            <small className="process-art-label">{"ОТ ЗАПУСКА К РАЗВИТИЮ"}</small>
          </div>
        </section>
      </div>
      <div className="process-bottom">
        <span>{"Вы участвуете в решениях. Мы отвечаем за целостность."}</span>
        <a className="text-link" href="/contact">{"Обсудить свой процесс ↗︎"}</a>
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
