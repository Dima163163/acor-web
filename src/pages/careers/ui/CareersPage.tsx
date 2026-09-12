import type { ReactElement } from 'react';

export const CareersPage = (): ReactElement => (
  <>
    <section className="page-intro wrap">
      <p className="eyebrow">{"Команда / открытые роли"}</p>
      <h1>
{"Работа, в которой"}
        <br />
        <em>{"есть место идеям."}</em>
      </h1>
      <p className="intro-description">{"Собираем людей, которым интересно думать о продукте целиком: от первого вопроса до ощущения после запуска."}</p>
    </section>
    <section className="wrap career-contact section-space" aria-labelledby="career-contact-title">
      <div className="career-contact-panel">
        <div>
          <p className="eyebrow">{"Приём в команду / демо"}</p>
          <h2 id="career-contact-title">
{"По поводу приема на работу"}
            <br />
{"и стажировку обращаться:"}
          </h2>
        </div>
        <div className="career-contact-list">
          <a href="mailto:talent@acorweb.ru">
{"talent@acorweb.ru "}
            <span aria-hidden="true">{"↗︎"}</span>
          </a>
          <a href="tel:+79991234567">
{"+7 (999) 123-45-67 "}
            <span aria-hidden="true">{"↗︎"}</span>
          </a>
          <p>
            <span className="eyebrow">{"Контактное лицо"}</span>
            <strong>{"Анна Воронова"}</strong>
            <small>{"HR / демо-профиль"}</small>
          </p>
        </div>
        <p className="career-demo-note">{"Контакты вымышлены для прототипа. Перед публикацией замените их на рабочие данные команды."}</p>
      </div>
    </section>
    <section className="wrap career-roles section-space" aria-labelledby="career-roles-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{"Кого ищем"}</p>
          <h2 id="career-roles-title">
{"Роли, которым"}
            <br />
            <em>{"нужна форма."}</em>
          </h2>
        </div>
        <p>{"Сейчас это демонстрационный список. Его можно расширить вакансиями и ссылками на подробные описания."}</p>
      </div>
      <div className="career-role-grid">
        <article className="career-role-card">
          <span>{"01 / Дизайн"}</span>
          <h3>{"Product designer"}</h3>
          <p>{"Проектирует интерфейсы, задаёт визуальный язык и умеет объяснить решение через задачу пользователя."}</p>
          <a className="text-link" href="mailto:talent@acorweb.ru?subject=Отклик%20на%20Product%20designer">{"Откликнуться ↗︎"}</a>
        </article>
        <article className="career-role-card">
          <span>{"02 / Разработка"}</span>
          <h3>{"Frontend developer"}</h3>
          <p>{"Превращает концепции в быстрые, доступные и аккуратно собранные цифровые продукты."}</p>
          <a className="text-link" href="mailto:talent@acorweb.ru?subject=Отклик%20на%20Frontend%20developer">{"Откликнуться ↗︎"}</a>
        </article>
        <article className="career-role-card">
          <span>{"03 / Старт"}</span>
          <h3>{"Стажировка"}</h3>
          <p>{"Для начинающих дизайнеров, аналитиков и разработчиков. Даём небольшую задачу, наставника и честную обратную связь."}</p>
          <a className="text-link" href="mailto:talent@acorweb.ru?subject=Заявка%20на%20стажировку">{"Узнать о стажировке ↗︎"}</a>
        </article>
      </div>
    </section>
    <section className="wrap career-journey section-space" aria-labelledby="career-journey-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{"Как знакомимся"}</p>
          <h2 id="career-journey-title">
{"Три шага до"}
            <br />
            <em>{"первого дня."}</em>
          </h2>
        </div>
        <p>{"Без длинных тестовых ради тестового. Сначала разговариваем о том, как вы думаете и работаете."}</p>
      </div>
      <div className="career-journey-grid">
        <article>
          <span>{"01"}</span>
          <h3>{"Письмо"}</h3>
          <p>{"Расскажите, чем хотите заниматься, и приложите пару работ или ссылку на профиль."}</p>
        </article>
        <article>
          <span>{"02"}</span>
          <h3>{"Разговор"}</h3>
          <p>{"Созваниваемся на 30 минут, обсуждаем опыт, интересы и формат взаимодействия."}</p>
        </article>
        <article>
          <span>{"03"}</span>
          <h3>{"Задача"}</h3>
          <p>{"Показываем небольшой фрагмент реальной работы и вместе решаем, подходим ли друг другу."}</p>
        </article>
      </div>
    </section>
    <section className="wrap career-note section-space">
      <div className="career-note-panel">
        <p className="eyebrow">{"Наше обещание"}</p>
        <h2>
{"Любопытство —"}
          <br />
          <em>{"часть работы."}</em>
        </h2>
        <p>{"Можно задавать вопросы, предлагать другой путь и менять мнение, если появились новые данные. Нам важны ясность, уважение к команде и желание доводить детали до результата."}</p>
        <a className="light-button" href="mailto:talent@acorweb.ru">{"Написать команде ↗︎"}</a>
      </div>
    </section>
  </>
);
