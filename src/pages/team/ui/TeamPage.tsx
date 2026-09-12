import type { ReactElement } from 'react';

export const TeamPage = (): ReactElement => (
  <>
    <section className="page-intro wrap">
      <p className="eyebrow">{"Команда"}</p>
      <h1>
{"Личное участие."}
        <br />
        <em>{"Общий результат."}</em>
      </h1>
      <p className="intro-description">{"За каждой деталью — человек. Под каждую задачу — нужная комбинация опыта."}</p>
    </section>
    <section className="wrap team-lead">
      <div className="initial-portrait" aria-label="Типографический портрет Дмитрия Прокопенко">
        <span>{"ДП"}</span>
        <small>{"ОСНОВАТЕЛЬ / ACOR WEB"}</small>
      </div>
      <div>
        <p className="eyebrow">{"Основатель студии"}</p>
        <h2>
{"Дмитрий"}
          <br />
{"Прокопенко"}
        </h2>
        <p>{"Объединяет команду вокруг задачи и помогает сохранять целостность продукта — от первого разговора до запуска."}</p>
        <a className="text-link" href="#team-roster">{"Познакомиться с командой ↓"}</a>
      </div>
    </section>
    <section className="wrap section-space team-roster" id="team-roster">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{"Разные люди. Одна команда."}</p>
          <h2>{"Знакомьтесь ближе."}</h2>
        </div>
        <p className="demo-team-note">{"Демонстрационные профили: имена и портреты вымышлены и созданы для макета сайта."}</p>
      </div>
      <div className="team-track-filter" role="group" aria-label="Роль в проекте">
        <span className="team-filter-label">{"Роль в проекте"}</span>
        <button type="button" className="team-track active" data-team-track="all" aria-pressed="true">{"Все роли"}</button>
        <button type="button" className="team-track" data-team-track="research" aria-pressed="false">{"Исследует"}</button>
        <button type="button" className="team-track" data-team-track="design" aria-pressed="false">{"Проектирует"}</button>
        <button type="button" className="team-track" data-team-track="build" aria-pressed="false">{"Разрабатывает"}</button>
        <button type="button" className="team-track" data-team-track="quality" aria-pressed="false">{"Проверяет"}</button>
        <button type="button" className="team-track" data-team-track="direction" aria-pressed="false">{"Ведёт"}</button>
      </div>
      <div className="team-toolbar">
        <div className="team-filters" role="group" aria-label="Направление команды">
          <button type="button" className="team-filter active" data-team-filter="all" aria-pressed="true">
{"Все "}
            <small>{"24"}</small>
          </button>
          <button type="button" className="team-filter" data-team-filter="analysis" aria-pressed="false">
{"Аналитика "}
            <small>{"3"}</small>
          </button>
          <button type="button" className="team-filter" data-team-filter="design" aria-pressed="false">
{"Дизайн "}
            <small>{"4"}</small>
          </button>
          <button type="button" className="team-filter" data-team-filter="frontend" aria-pressed="false">
{"Frontend "}
            <small>{"4"}</small>
          </button>
          <button type="button" className="team-filter" data-team-filter="backend" aria-pressed="false">
{"Backend "}
            <small>{"3"}</small>
          </button>
          <button type="button" className="team-filter" data-team-filter="mobile" aria-pressed="false">
{"Mobile "}
            <small>{"4"}</small>
          </button>
          <button type="button" className="team-filter" data-team-filter="qa" aria-pressed="false">
{"QA "}
            <small>{"3"}</small>
          </button>
          <button type="button" className="team-filter" data-team-filter="management" aria-pressed="false">
{"Управление "}
            <small>{"3"}</small>
          </button>
        </div>
        <label className="team-search">
          <span className="sr-only">{"Найти участника команды"}</span>
          <input type="search" id="team-search" placeholder="Найти человека или роль" />
          <span aria-hidden="true">{"⌕"}</span>
        </label>
      </div>
      <p id="team-result" className="team-result" role="status">{"24 участника · 7 направлений"}</p>
      <section className="roster-group" data-team-group="analysis" aria-labelledby="group-analysis">
        <div className="roster-heading">
          <h3 id="group-analysis">
{"Аналитика"}
            <sup>{"3"}</sup>
          </h3>
          <p>{"Вопросы, с которых начинается продукт."}</p>
        </div>
        <div className="people-grid">
          <article className="person-card" data-person-group="analysis">
            <button type="button" className="person-button" data-person="" data-name="Алексей Ветров" data-role="Lead business analyst" data-bio="Соединяет бизнес-задачи и пользовательские сценарии. Превращает сложные процессы в понятную структуру продукта." data-skills="Интервью · CJM · Discovery" data-quote="Хорошее решение начинается с хорошего вопроса." aria-label="Алексей Ветров, Lead business analyst — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-1.jpg')", backgroundPosition: "0% 0%"}} role="img" aria-label="Сгенерированный портрет: Алексей Ветров"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Алексей Ветров"}</span>
              <span className="person-role">{"Lead business analyst"}</span>
            </button>
          </article>
          <article className="person-card" data-person-group="analysis">
            <button type="button" className="person-button" data-person="" data-name="Анна Миронова" data-role="Product analyst" data-bio="Ищет закономерности в поведении пользователей и помогает команде принимать решения на основе данных." data-skills="Продуктовые метрики · Исследования · Гипотезы" data-quote="За каждой цифрой — чьё-то действие." aria-label="Анна Миронова, Product analyst — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-1.jpg')", backgroundPosition: "50% 0%"}} role="img" aria-label="Сгенерированный портрет: Анна Миронова"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Анна Миронова"}</span>
              <span className="person-role">{"Product analyst"}</span>
            </button>
          </article>
          <article className="person-card" data-person-group="analysis">
            <button type="button" className="person-button" data-person="" data-name="Михаил Орлов" data-role="System analyst" data-bio="Продумывает связи между интерфейсом, данными и сервисами, чтобы части продукта работали как одно целое." data-skills="Требования · API · Моделирование" data-quote="Сложное можно объяснить просто." aria-label="Михаил Орлов, System analyst — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-1.jpg')", backgroundPosition: "100% 0%"}} role="img" aria-label="Сгенерированный портрет: Михаил Орлов"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Михаил Орлов"}</span>
              <span className="person-role">{"System analyst"}</span>
            </button>
          </article>
        </div>
      </section>
      <section className="roster-group" data-team-group="design" aria-labelledby="group-design">
        <div className="roster-heading">
          <h3 id="group-design">
{"Дизайн"}
            <sup>{"4"}</sup>
          </h3>
          <p>{"Форма, в которой узнаётся характер."}</p>
        </div>
        <div className="people-grid">
          <article className="person-card" data-person-group="design">
            <button type="button" className="person-button" data-person="" data-name="Полина Левина" data-role="Art director" data-bio="Находит визуальную идею и сохраняет её характер во всех точках контакта с продуктом." data-skills="Art direction · Айдентика · Типографика" data-quote="Сильная идея выдерживает любой масштаб." aria-label="Полина Левина, Art director — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-1.jpg')", backgroundPosition: "0% 100%"}} role="img" aria-label="Сгенерированный портрет: Полина Левина"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Полина Левина"}</span>
              <span className="person-role">{"Art director"}</span>
            </button>
          </article>
          <article className="person-card" data-person-group="design">
            <button type="button" className="person-button" data-person="" data-name="Илья Горин" data-role="Senior product designer" data-bio="Проектирует сценарии и собирает интерфейсы, которые помогают человеку двигаться к своей цели." data-skills="UX/UI · Дизайн-системы · Прототипирование" data-quote="Интерфейс должен давать опору." aria-label="Илья Горин, Senior product designer — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-1.jpg')", backgroundPosition: "50% 100%"}} role="img" aria-label="Сгенерированный портрет: Илья Горин"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Илья Горин"}</span>
              <span className="person-role">{"Senior product designer"}</span>
            </button>
          </article>
          <article className="person-card" data-person-group="design">
            <button type="button" className="person-button" data-person="" data-name="Мария Белова" data-role="Motion designer" data-bio="Придумывает, как продукт двигается, отвечает на действия и объясняет происходящее." data-skills="Motion · 3D · Микровзаимодействия" data-quote="У каждого движения есть смысл." aria-label="Мария Белова, Motion designer — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-1.jpg')", backgroundPosition: "100% 100%"}} role="img" aria-label="Сгенерированный портрет: Мария Белова"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Мария Белова"}</span>
              <span className="person-role">{"Motion designer"}</span>
            </button>
          </article>
          <article className="person-card" data-person-group="design">
            <button type="button" className="person-button" data-person="" data-name="Никита Савин" data-role="Visual designer" data-bio="Работает с композицией, изображениями и деталями, из которых складывается первое впечатление." data-skills="Визуальные концепции · Графика · Web" data-quote="Деталь меняет всё." aria-label="Никита Савин, Visual designer — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-2.jpg')", backgroundPosition: "0% 0%"}} role="img" aria-label="Сгенерированный портрет: Никита Савин"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Никита Савин"}</span>
              <span className="person-role">{"Visual designer"}</span>
            </button>
          </article>
        </div>
      </section>
      <section className="roster-group" data-team-group="frontend" aria-labelledby="group-frontend">
        <div className="roster-heading">
          <h3 id="group-frontend">
{"Frontend"}
            <sup>{"4"}</sup>
          </h3>
          <p>{"Тот самый момент, когда дизайн оживает."}</p>
        </div>
        <div className="people-grid">
          <article className="person-card" data-person-group="frontend">
            <button type="button" className="person-button" data-person="" data-name="Елена Волкова" data-role="Frontend lead" data-bio="Соединяет визуальную точность, архитектуру интерфейса и качество взаимодействия." data-skills="React · Архитектура · Accessibility" data-quote="Быстро — тоже часть дизайна." aria-label="Елена Волкова, Frontend lead — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-2.jpg')", backgroundPosition: "50% 0%"}} role="img" aria-label="Сгенерированный портрет: Елена Волкова"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Елена Волкова"}</span>
              <span className="person-role">{"Frontend lead"}</span>
            </button>
          </article>
          <article className="person-card" data-person-group="frontend">
            <button type="button" className="person-button" data-person="" data-name="Даниил Морозов" data-role="Creative developer" data-bio="Создаёт интерактивные сцены и необычные переходы, которые остаются лёгкими и отзывчивыми." data-skills="WebGL · Canvas · Motion" data-quote="Удивлять, не мешая пользоваться." aria-label="Даниил Морозов, Creative developer — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-2.jpg')", backgroundPosition: "100% 0%"}} role="img" aria-label="Сгенерированный портрет: Даниил Морозов"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Даниил Морозов"}</span>
              <span className="person-role">{"Creative developer"}</span>
            </button>
          </article>
          <article className="person-card" data-person-group="frontend">
            <button type="button" className="person-button" data-person="" data-name="Алиса Крылова" data-role="Frontend developer" data-bio="Превращает сложные макеты в адаптивные страницы и внимательно проверяет их на разных устройствах." data-skills="TypeScript · CSS · Responsive" data-quote="Красиво на любом экране." aria-label="Алиса Крылова, Frontend developer — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-2.jpg')", backgroundPosition: "0% 100%"}} role="img" aria-label="Сгенерированный портрет: Алиса Крылова"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Алиса Крылова"}</span>
              <span className="person-role">{"Frontend developer"}</span>
            </button>
          </article>
          <article className="person-card" data-person-group="frontend">
            <button type="button" className="person-button" data-person="" data-name="Роман Зуев" data-role="Frontend developer" data-bio="Разрабатывает продуктовые интерфейсы и помогает поддерживать единую систему компонентов." data-skills="React · UI-системы · Performance" data-quote="Хороший компонент решает задачу." aria-label="Роман Зуев, Frontend developer — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-2.jpg')", backgroundPosition: "50% 100%"}} role="img" aria-label="Сгенерированный портрет: Роман Зуев"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Роман Зуев"}</span>
              <span className="person-role">{"Frontend developer"}</span>
            </button>
          </article>
        </div>
      </section>
      <section className="roster-group" data-team-group="backend" aria-labelledby="group-backend">
        <div className="roster-heading">
          <h3 id="group-backend">
{"Backend"}
            <sup>{"3"}</sup>
          </h3>
          <p>{"Надёжная логика за каждым действием."}</p>
        </div>
        <div className="people-grid">
          <article className="person-card" data-person-group="backend">
            <button type="button" className="person-button" data-person="" data-name="Дарья Соколова" data-role="Backend lead" data-bio="Проектирует основу продукта, связи между сервисами и работу с данными." data-skills="Архитектура · API · PostgreSQL" data-quote="Надёжность незаметна, пока всё работает." aria-label="Дарья Соколова, Backend lead — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-2.jpg')", backgroundPosition: "100% 100%"}} role="img" aria-label="Сгенерированный портрет: Дарья Соколова"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Дарья Соколова"}</span>
              <span className="person-role">{"Backend lead"}</span>
            </button>
          </article>
          <article className="person-card" data-person-group="backend">
            <button type="button" className="person-button" data-person="" data-name="Артём Новиков" data-role="Backend developer" data-bio="Создаёт бизнес-логику и интеграции, которые соединяют продукт с внешним миром." data-skills="Node.js · Интеграции · Очереди" data-quote="Каждому процессу — понятный маршрут." aria-label="Артём Новиков, Backend developer — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-3.jpg')", backgroundPosition: "0% 0%"}} role="img" aria-label="Сгенерированный портрет: Артём Новиков"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Артём Новиков"}</span>
              <span className="person-role">{"Backend developer"}</span>
            </button>
          </article>
          <article className="person-card" data-person-group="backend">
            <button type="button" className="person-button" data-person="" data-name="Виктория Озерова" data-role="Platform engineer" data-bio="Занимается окружениями, выпуском новых версий и наблюдаемостью сервисов." data-skills="CI/CD · Мониторинг · Инфраструктура" data-quote="Спокойный релиз — результат подготовки." aria-label="Виктория Озерова, Platform engineer — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-3.jpg')", backgroundPosition: "50% 0%"}} role="img" aria-label="Сгенерированный портрет: Виктория Озерова"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Виктория Озерова"}</span>
              <span className="person-role">{"Platform engineer"}</span>
            </button>
          </article>
        </div>
      </section>
      <section className="roster-group" data-team-group="mobile" aria-labelledby="group-mobile">
        <div className="roster-heading">
          <h3 id="group-mobile">
{"Mobile"}
            <sup>{"4"}</sup>
          </h3>
          <p>{"Продукт, который всегда под рукой."}</p>
        </div>
        <div className="people-grid">
          <article className="person-card" data-person-group="mobile">
            <button type="button" className="person-button" data-person="" data-name="Сергей Исаев" data-role="Mobile lead" data-bio="Продумывает целостный опыт приложения и помогает команде учитывать особенности мобильной среды." data-skills="Mobile architecture · UX · Delivery" data-quote="Один жест может заменить целый экран." aria-label="Сергей Исаев, Mobile lead — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-3.jpg')", backgroundPosition: "100% 0%"}} role="img" aria-label="Сгенерированный портрет: Сергей Исаев"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Сергей Исаев"}</span>
              <span className="person-role">{"Mobile lead"}</span>
            </button>
          </article>
          <article className="person-card" data-person-group="mobile">
            <button type="button" className="person-button" data-person="" data-name="София Николаева" data-role="iOS developer" data-bio="Создаёт приложения для iOS с вниманием к нативным жестам, состояниям и переходам." data-skills="Swift · SwiftUI · iOS" data-quote="Ощущается естественно — значит, получилось." aria-label="София Николаева, iOS developer — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-3.jpg')", backgroundPosition: "0% 100%"}} role="img" aria-label="Сгенерированный портрет: София Николаева"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"София Николаева"}</span>
              <span className="person-role">{"iOS developer"}</span>
            </button>
          </article>
          <article className="person-card" data-person-group="mobile">
            <button type="button" className="person-button" data-person="" data-name="Кирилл Мельников" data-role="Android developer" data-bio="Разрабатывает приложения для Android и делает поведение интерфейса предсказуемым на разных устройствах." data-skills="Kotlin · Compose · Android" data-quote="Детали важны на каждом устройстве." aria-label="Кирилл Мельников, Android developer — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-3.jpg')", backgroundPosition: "50% 100%"}} role="img" aria-label="Сгенерированный портрет: Кирилл Мельников"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Кирилл Мельников"}</span>
              <span className="person-role">{"Android developer"}</span>
            </button>
          </article>
          <article className="person-card" data-person-group="mobile">
            <button type="button" className="person-button" data-person="" data-name="Ксения Фролова" data-role="Mobile developer" data-bio="Соединяет продуктовые сценарии и технические возможности в кроссплатформенных приложениях." data-skills="Flutter · Интеграции · Прототипы" data-quote="Приложение должно быть рядом, а не мешать." aria-label="Ксения Фролова, Mobile developer — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-3.jpg')", backgroundPosition: "100% 100%"}} role="img" aria-label="Сгенерированный портрет: Ксения Фролова"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Ксения Фролова"}</span>
              <span className="person-role">{"Mobile developer"}</span>
            </button>
          </article>
        </div>
      </section>
      <section className="roster-group" data-team-group="qa" aria-labelledby="group-qa">
        <div className="roster-heading">
          <h3 id="group-qa">
{"QA"}
            <sup>{"3"}</sup>
          </h3>
          <p>{"Внимание к тому, что легко пропустить."}</p>
        </div>
        <div className="people-grid">
          <article className="person-card" data-person-group="qa">
            <button type="button" className="person-button" data-person="" data-name="Павел Романов" data-role="QA lead" data-bio="Помогает команде заранее находить риски и проверять самые важные сценарии продукта." data-skills="Стратегия тестирования · Риски · Релизы" data-quote="Качество начинается до первой ошибки." aria-label="Павел Романов, QA lead — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-4.jpg')", backgroundPosition: "0% 0%"}} role="img" aria-label="Сгенерированный портрет: Павел Романов"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Павел Романов"}</span>
              <span className="person-role">{"QA lead"}</span>
            </button>
          </article>
          <article className="person-card" data-person-group="qa">
            <button type="button" className="person-button" data-person="" data-name="Анастасия Лукина" data-role="QA engineer" data-bio="Исследует интерфейсы глазами пользователя и проверяет продукт в реальных условиях." data-skills="Ручное тестирование · Mobile · UX" data-quote="А что, если пользователь сделает иначе?" aria-label="Анастасия Лукина, QA engineer — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-4.jpg')", backgroundPosition: "50% 0%"}} role="img" aria-label="Сгенерированный портрет: Анастасия Лукина"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Анастасия Лукина"}</span>
              <span className="person-role">{"QA engineer"}</span>
            </button>
          </article>
          <article className="person-card" data-person-group="qa">
            <button type="button" className="person-button" data-person="" data-name="Егор Титов" data-role="Automation engineer" data-bio="Автоматизирует повторяемые проверки и делает обратную связь для команды быстрее." data-skills="E2E · API testing · Автоматизация" data-quote="Проверять уверенно, выпускать спокойно." aria-label="Егор Титов, Automation engineer — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-4.jpg')", backgroundPosition: "100% 0%"}} role="img" aria-label="Сгенерированный портрет: Егор Титов"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Егор Титов"}</span>
              <span className="person-role">{"Automation engineer"}</span>
            </button>
          </article>
        </div>
      </section>
      <section className="roster-group" data-team-group="management" aria-labelledby="group-management">
        <div className="roster-heading">
          <h3 id="group-management">
{"Управление"}
            <sup>{"3"}</sup>
          </h3>
          <p>{"Один контекст для команды и клиента."}</p>
        </div>
        <div className="people-grid">
          <article className="person-card" data-person-group="management">
            <button type="button" className="person-button" data-person="" data-name="Ольга Данилова" data-role="Project lead" data-bio="Помогает людям договориться о главном и удерживает общий фокус на протяжении проекта." data-skills="Планирование · Коммуникация · Delivery" data-quote="Ясность экономит время всей команды." aria-label="Ольга Данилова, Project lead — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-4.jpg')", backgroundPosition: "0% 100%"}} role="img" aria-label="Сгенерированный портрет: Ольга Данилова"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Ольга Данилова"}</span>
              <span className="person-role">{"Project lead"}</span>
            </button>
          </article>
          <article className="person-card" data-person-group="management">
            <button type="button" className="person-button" data-person="" data-name="Максим Котов" data-role="Project manager" data-bio="Соединяет задачи, сроки и ожидания в прозрачный рабочий процесс." data-skills="Координация · Риски · Scrum" data-quote="Следующий шаг должен быть понятен." aria-label="Максим Котов, Project manager — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-4.jpg')", backgroundPosition: "50% 100%"}} role="img" aria-label="Сгенерированный портрет: Максим Котов"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Максим Котов"}</span>
              <span className="person-role">{"Project manager"}</span>
            </button>
          </article>
          <article className="person-card" data-person-group="management">
            <button type="button" className="person-button" data-person="" data-name="Арина Смирнова" data-role="Account manager" data-bio="Помогает клиенту и команде слышать друг друга, обсуждать решения и развивать сотрудничество." data-skills="Коммуникация · Брифинг · Partnership" data-quote="Лучшие проекты начинаются с доверия." aria-label="Арина Смирнова, Account manager — подробнее">
              <span className="person-image-wrap">
                <span className="person-portrait" style={{backgroundImage: "url('/assets/team-4.jpg')", backgroundPosition: "100% 100%"}} role="img" aria-label="Сгенерированный портрет: Арина Смирнова"></span>
                <span className="person-discover" aria-hidden="true">{"Знакомиться ↗︎"}</span>
                <span className="person-corner" aria-hidden="true">{"+"}</span>
              </span>
              <span className="person-name">{"Арина Смирнова"}</span>
              <span className="person-role">{"Account manager"}</span>
            </button>
          </article>
        </div>
      </section>
      <p className="team-empty" id="team-empty" hidden>{"Никого не нашли. Попробуйте другое имя или направление."}</p>
    </section>
    <dialog className="person-dialog" id="person-dialog" aria-labelledby="person-dialog-name">
      <button type="button" className="dialog-close" aria-label="Закрыть карточку">{"×"}</button>
      <div className="person-dialog-grid">
        <div className="dialog-image-wrap">
          <div className="person-portrait dialog-portrait" role="img"></div>
        </div>
        <div className="dialog-copy">
          <p className="eyebrow">{"Люди Acor / демо-профиль"}</p>
          <h2 id="person-dialog-name"></h2>
          <p className="dialog-role"></p>
          <blockquote className="dialog-quote"></blockquote>
          <p className="dialog-bio"></p>
          <p className="dialog-skills"></p>
          <a className="dark-button" href="/contact">{"Обсудить проект ↗︎"}</a>
        </div>
      </div>
    </dialog>
  </>
);
