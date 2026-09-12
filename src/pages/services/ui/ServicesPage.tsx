import type { ReactElement } from 'react';

export const ServicesPage = (): ReactElement => (
  <>
    <section className="page-intro wrap">
      <p className="eyebrow">{"Экспертиза"}</p>
      <h1>
{"Сложное внутри."}
        <br />
        <em>{"Простое для людей."}</em>
      </h1>
      <p className="intro-description">{"Подключаемся на этапе идеи или помогаем уже работающему продукту стать лучше."}</p>
    </section>
    <section className="wrap">
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
    <section className="wrap section-space">
      <div className="section-heading">
        <h2>{"Работаем в вашем ритме."}</h2>
        <p>
{"Отдельный этап или весь цикл."}
          <br />
{"Состав и формат обсуждаем под задачу."}
        </p>
      </div>
      <div className="process-grid">
        <article>
          <span>{"01 / ПОГРУЖЕНИЕ"}</span>
          <h3>
{"Задаём"}
            <br />
{"правильные вопросы."}
          </h3>
          <p>{"Разбираем бизнес, аудиторию и ограничения. Договариваемся о том, что будет результатом."}</p>
        </article>
        <article>
          <span>{"02 / СОЗДАНИЕ"}</span>
          <h3>
{"Думаем и делаем"}
            <br />
{"вместе."}
          </h3>
          <p>{"Показываем промежуточные решения, обсуждаем их и двигаемся короткими понятными этапами."}</p>
        </article>
        <article>
          <span>{"03 / ЗАПУСК"}</span>
          <h3>
{"Доводим"}
            <br />
{"до работающего."}
          </h3>
          <p>{"Проверяем продукт, выпускаем и помогаем команде освоить новый инструмент."}</p>
        </article>
      </div>
    </section>
    <section className="wrap service-facts section-space" aria-labelledby="service-facts-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{"Прозрачность работы"}</p>
          <h2 id="service-facts-title">
{"Понятно, что"}
            <br />
            <em>{"будет дальше."}</em>
          </h2>
        </div>
        <p>{"Формат и состав команды подбираем под задачу. Показываем решения по пути, чтобы важные вопросы не откладывались на финал."}</p>
      </div>
      <div className="service-facts-grid">
        <article>
          <span>{"Формат"}</span>
          <strong>
{"От отдельного этапа"}
            <br />
{"до полного цикла"}
          </strong>
          <p>{"Подключаемся там, где нужна дополнительная экспертиза, или ведём проект целиком."}</p>
        </article>
        <article>
          <span>{"Коммуникация"}</span>
          <strong>
{"Промежуточные версии"}
            <br />
{"видны команде"}
          </strong>
          <p>{"Обсуждаем решения короткими итерациями и фиксируем следующий шаг."}</p>
        </article>
        <article>
          <span>{"Среда"}</span>
          <strong>
{"Инструменты"}
            <br />
{"подбираются под продукт"}
          </strong>
          <p className="service-fact-tags">{"Figma · React · TypeScript · Node.js · SwiftUI"}</p>
        </article>
      </div>
    </section>
    <section className="wrap section-space service-estimator" id="service-estimator" aria-labelledby="service-estimator-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{"Ориентир / без сметы"}</p>
          <h2 id="service-estimator-title">
{"Соберите примерный"}
            <br />
            <em>{"маршрут проекта."}</em>
          </h2>
        </div>
        <p>{"Это не расчёт стоимости, а быстрый способ понять, какие роли и сроки могут понадобиться."}</p>
      </div>
      <div className="estimator-grid">
        <div className="estimator-controls">
          <label>
{"Что создаём"}
            <select id="estimate-type">
              <option value="web">{"Сайт"}</option>
              <option value="app">{"Приложение"}</option>
              <option value="design">{"Визуальная система"}</option>
            </select>
          </label>
          <label>
{"Глубина участия"}
            <select id="estimate-scope">
              <option value="start">{"Стартовый этап"}</option>
              <option value="full">{"Полный цикл"}</option>
              <option value="support">{"Развитие после запуска"}</option>
            </select>
          </label>
          <label>
{"Темп"}
            <select id="estimate-pace">
              <option value="steady">{"Ровный"}</option>
              <option value="fast">{"Ускоренный"}</option>
            </select>
          </label>
        </div>
        <aside className="estimator-result" aria-live="polite">
          <span className="eyebrow">{"Ваш ориентир"}</span>
          <strong id="estimate-title">{"Сайт / стартовый этап"}</strong>
          <p id="estimate-copy">{"Погружение, структура и визуальная гипотеза."}</p>
          <div className="estimator-meta">
            <span>
              <small>{"Срок"}</small>
              <b id="estimate-weeks">{"3–5 недель"}</b>
            </span>
            <span>
              <small>{"Команда"}</small>
              <b id="estimate-team">{"2–3 роли"}</b>
            </span>
          </div>
          <a className="text-link" id="estimate-cta" href="/contact?type=web">{"Уточнить маршрут ↗︎"}</a>
        </aside>
      </div>
    </section>
    <section className="wrap section-space service-faq" id="service-faq" aria-labelledby="service-faq-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{"Частые вопросы"}</p>
          <h2 id="service-faq-title">
{"Чтобы начать, не нужно"}
            <br />
            <em>{"знать всё заранее."}</em>
          </h2>
        </div>
        <p>{"Собрали ответы на вопросы, которые обычно появляются до первого разговора."}</p>
      </div>
      <div className="faq-list">
        <details open>
          <summary>{"Можно подключить только один этап?"}</summary>
          <p>{"Да. Начинаем с исследования, концепции или разработки — состав команды и объём фиксируем после короткого обсуждения."}</p>
        </details>
        <details>
          <summary>{"Работаете с готовым дизайном?"}</summary>
          <p>{"Да. Проверим систему, найдём узкие места и подключимся к реализации или развитию продукта."}</p>
        </details>
        <details>
          <summary>{"Как выглядит первый шаг?"}</summary>
          <p>{"После заявки возвращаемся с уточняющими вопросами и предлагаем ближайший результат, который имеет смысл получить первым."}</p>
        </details>
        <details>
          <summary>{"Можно начать без подробного ТЗ?"}</summary>
          <p>{"Можно. В брифе достаточно описать контекст и желаемое изменение — детали соберём вместе."}</p>
        </details>
      </div>
    </section>
  </>
);
