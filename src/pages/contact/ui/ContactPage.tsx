import type { ReactElement } from 'react';

export const ContactPage = (): ReactElement => (
  <>
    <section className="page-intro wrap">
      <p className="eyebrow">{"Новый проект"}</p>
      <h1>
{"С чего начинается"}
        <br />
        <em>{"ваша идея?"}</em>
      </h1>
      <p className="intro-description">{"Расскажите о задаче. Можно без технического задания — начнём с контекста."}</p>
    </section>
    <section className="wrap brief-builder" id="brief-builder" aria-labelledby="brief-builder-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{"Быстрый бриф / 04 шага"}</p>
          <h2 id="brief-builder-title">
{"Соберём контекст"}
            <br />
            <em>{"за минуту."}</em>
          </h2>
        </div>
        <p>{"Выберите то, что ближе. Ответы подставятся в заявку и помогут начать разговор предметно."}</p>
      </div>
      <div className="brief-builder-grid">
        <div className="brief-steps" role="group" aria-label="Шаги брифа">
          <section className="brief-step is-active" data-brief-step="0">
            <div className="brief-step-top">
              <span>{"01"}</span>
              <b>{"Что создаём?"}</b>
            </div>
            <div className="brief-options">
              <button type="button" data-brief-option="type" data-brief-value="web" className="is-selected">{"Сайт"}</button>
              <button type="button" data-brief-option="type" data-brief-value="app">{"Приложение"}</button>
              <button type="button" data-brief-option="type" data-brief-value="design">{"Визуальная система"}</button>
              <button type="button" data-brief-option="type" data-brief-value="other">{"Другое"}</button>
            </div>
          </section>
          <section className="brief-step" data-brief-step="1" hidden>
            <div className="brief-step-top">
              <span>{"02"}</span>
              <b>{"Для кого?"}</b>
            </div>
            <div className="brief-options">
              <button type="button" data-brief-option="audience" data-brief-value="clients">{"Клиенты и партнёры"}</button>
              <button type="button" data-brief-option="audience" data-brief-value="team">{"Команда внутри компании"}</button>
              <button type="button" data-brief-option="audience" data-brief-value="buyers">{"Покупатели"}</button>
              <button type="button" data-brief-option="audience" data-brief-value="wide">{"Широкая аудитория"}</button>
            </div>
          </section>
          <section className="brief-step" data-brief-step="2" hidden>
            <div className="brief-step-top">
              <span>{"03"}</span>
              <b>{"Что должно измениться?"}</b>
            </div>
            <div className="brief-options">
              <button type="button" data-brief-option="goal" data-brief-value="launch">{"Запустить новое"}</button>
              <button type="button" data-brief-option="goal" data-brief-value="refresh">{"Обновить существующее"}</button>
              <button type="button" data-brief-option="goal" data-brief-value="validate">{"Проверить идею"}</button>
              <button type="button" data-brief-option="goal" data-brief-value="grow">{"Развить продукт"}</button>
            </div>
          </section>
          <section className="brief-step" data-brief-step="3" hidden>
            <div className="brief-step-top">
              <span>{"04"}</span>
              <b>{"Какое ощущение важно?"}</b>
            </div>
            <div className="brief-options">
              <button type="button" data-brief-option="tone" data-brief-value="calm">{"Спокойное"}</button>
              <button type="button" data-brief-option="tone" data-brief-value="bold">{"Смелое"}</button>
              <button type="button" data-brief-option="tone" data-brief-value="clear">{"Точное"}</button>
              <button type="button" data-brief-option="tone" data-brief-value="alive">{"Живое"}</button>
            </div>
          </section>
          <div className="brief-navigation">
            <button type="button" className="pill-button" id="brief-prev" disabled>{"← Назад"}</button>
            <button type="button" className="dark-button" id="brief-next">
{"Следующий вопрос "}
              <span>{"↗︎"}</span>
            </button>
          </div>
        </div>
        <aside className="brief-summary" aria-live="polite">
          <span className="brief-summary-kicker">{"Ваш контекст / 01 из 04"}</span>
          <h3 id="brief-summary-title">{"Сайт с характером."}</h3>
          <p id="brief-summary-copy">{"Соберём структуру, визуальную идею и понятный путь к действию."}</p>
          <div className="brief-summary-tags" id="brief-summary-tags">
            <span>{"Web"}</span>
            <span>{"Структура"}</span>
          </div>
          <div className="brief-summary-line"></div>
          <p className="brief-summary-note">{"Это черновая карта задачи — её можно уточнить в форме ниже."}</p>
        </aside>
      </div>
    </section>
    <section className="wrap after-brief" aria-labelledby="after-brief-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{"После заявки"}</p>
          <h2 id="after-brief-title">
{"Следующий шаг"}
            <br />
            <em>{"будет понятен."}</em>
          </h2>
        </div>
        <p>{"Не оставляем вас один на один с формой. Сначала возвращаемся с вопросами, потом предлагаем маршрут."}</p>
      </div>
      <div className="after-brief-grid">
        <article>
          <span>{"01"}</span>
          <h3>{"Знакомимся"}</h3>
          <p>{"Коротко обсуждаем контекст, аудиторию и то, что уже пробовали."}</p>
        </article>
        <article>
          <span>{"02"}</span>
          <h3>{"Собираем задачу"}</h3>
          <p>{"Фиксируем главное и показываем, какие решения нужны на первом этапе."}</p>
        </article>
        <article>
          <span>{"03"}</span>
          <h3>{"Договариваемся"}</h3>
          <p>{"Предлагаем состав команды, формат работы и ближайший понятный шаг."}</p>
        </article>
      </div>
    </section>
    <section className="wrap contact-grid">
      <aside>
        <p className="eyebrow">{"Напрямую"}</p>
        <a className="email-link" href="mailto:hello@acorweb.ru">{"hello@acorweb.ru ↗︎"}</a>
        <p>
{"Или подготовьте короткий бриф здесь."}
          <br />
{"Его можно сохранить и отправить нам по почте."}
        </p>
        <div className="contact-mark" aria-hidden="true">{"a↗︎"}</div>
      </aside>
      <form id="brief-form">
        <div className="form-row">
          <label>
{"Как вас зовут"}
            <input name="name" autoComplete="name" required placeholder="Ваше имя" />
          </label>
          <label>
{"Компания"}
            <input name="company" autoComplete="organization" placeholder="Название, если есть" />
          </label>
        </div>
        <label>
{"Email для связи"}
          <input type="email" name="email" autoComplete="email" required placeholder="you@company.ru" />
        </label>
        <fieldset>
          <legend>{"Что планируете?"}</legend>
          <div className="choice-group">
            <label>
              <input type="radio" name="type" defaultValue="web" defaultChecked />
              <span>{"Сайт"}</span>
            </label>
            <label>
              <input type="radio" name="type" defaultValue="app" />
              <span>{"Приложение"}</span>
            </label>
            <label>
              <input type="radio" name="type" defaultValue="design" />
              <span>{"Дизайн"}</span>
            </label>
            <label>
              <input type="radio" name="type" defaultValue="other" />
              <span>{"Другое"}</span>
            </label>
          </div>
        </fieldset>
        <label>
{"Несколько слов о задаче"}
          <textarea name="message" rows={4} required placeholder="Что хотите создать или изменить? Для кого? Какой результат важен?"></textarea>
        </label>
        <div className="form-row">
          <label>
{"Ориентир по бюджету"}
            <input name="budget" inputMode="decimal" autoComplete="off" placeholder="Например, 850 000 ₽" aria-describedby="budget-hint" />
            <small className="field-hint" id="budget-hint">{"Можно указать любую сумму или написать «обсудим»."}</small>
          </label>
          <label>
{"Желаемые сроки"}
            <input name="timing" placeholder="Есть дата или готовы обсудить" />
          </label>
        </div>
        <div className="form-submit">
          <div className="form-actions">
            <button type="submit" className="dark-button">
{"Открыть письмо "}
              <span>{"↗︎"}</span>
            </button>
            <button type="button" className="pill-button" id="download-brief">
{"Скачать .txt "}
              <span>{"↓"}</span>
            </button>
          </div>
          <p>
{"Откроется ваше почтовое приложение с готовым письмом."}
            <br />
{"Резервная копия брифа остаётся в браузере."}
          </p>
        </div>
        <p className="form-status" id="form-status" role="status"></p>
      </form>
    </section>
  </>
);
