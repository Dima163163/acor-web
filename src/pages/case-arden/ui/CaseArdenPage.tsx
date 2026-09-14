import type { CSSProperties, ReactElement } from 'react';
import { CaseVisual } from '../../../shared/ui/CaseVisual';

export const CaseArdenPage = (): ReactElement => (
  <>
    <section className="page-intro wrap">
      <p className="eyebrow">{"Architecture / Web / Study 01"}</p>
      <h1>
{"Пространство."}
        <br />
{"В новом "}
        <em>{"измерении."}</em>
      </h1>
      <p className="intro-description">{"Архитектура начинается с ощущения. В этой концепции сайт передаёт тишину пространства через масштаб изображений, паузы и точную типографику."}</p>
    </section>
    <section className="wrap case-scene project--arden" data-study="architecture" data-case-demo="architecture" style={{ viewTransitionName: 'case-study-architecture' } as CSSProperties}>
      <CaseVisual kind="architecture" />
    </section>
    <section className="wrap case-demo section-space" aria-labelledby="architecture-demo-title">
      <div className="case-demo-heading">
        <div>
          <p className="eyebrow">{"Интерактив / маршрут"}</p>
          <h2 id="architecture-demo-title">{"Выберите точку внимания."}</h2>
        </div>
        <p>{"Небольшая демонстрация того, как один и тот же материал меняет акцент в зависимости от сценария чтения."}</p>
      </div>
      <div className="case-demo-controls" role="group" aria-label="Сценарий архитектурной концепции">
        <button type="button" className="case-demo-button is-active" data-demo-value="panorama" aria-pressed="true">{"Панорама"}</button>
        <button type="button" className="case-demo-button" data-demo-value="plan" aria-pressed="false">{"План"}</button>
        <button type="button" className="case-demo-button" data-demo-value="material" aria-pressed="false">{"Материал"}</button>
      </div>
      <output className="case-demo-output" data-demo-output="">{"Панорама задаёт ощущение места до деталей."}</output>
      <details className="case-annotation">
        <summary>{"Почему так устроено"}</summary>
        <p>{"Сначала человек считывает масштаб, затем ищет подтверждение в планировке и материалах. Поэтому визуальная иерархия повторяет естественный порядок вопросов."}</p>
      </details>
    </section>
    <section className="wrap section-space case-story">
      <div>
        <p className="eyebrow">{"Задача концепции"}</p>
        <h2>{"Сделать архитектурный проект понятным до первого визита."}</h2>
      </div>
      <div>
        <p className="eyebrow">{"Наше решение"}</p>
        <p>{"Крупная фотография задаёт настроение, а последовательная навигация помогает перейти от общего впечатления к деталям пространства."}</p>
        <p className="case-note">{"Демонстрационная study Acor Web. Изображения и данные абстрактны и показывают принцип, а не результат реального клиента."}</p>
      </div>
    </section>
    <section className="wrap case-details section-space" aria-labelledby="case-details-title">
      <div className="case-details-heading">
        <div>
          <p className="eyebrow">{"Решение / в разрезе"}</p>
          <h2 id="case-details-title">{"От тихого первого взгляда к уверенной детали."}</h2>
        </div>
        <p>{"Собрали путь, в котором изображение задаёт атмосферу, а каждая следующая секция отвечает на новый вопрос человека."}</p>
      </div>
      <div className="case-info-grid">
        <article>
          <span>{"Контекст"}</span>
          <strong>{"Архитектурный проект с длинным циклом выбора"}</strong>
        </article>
        <article>
          <span>{"Для кого"}</span>
          <strong>{"Люди, которые выбирают пространство не по каталогу"}</strong>
        </article>
        <article>
          <span>{"Фокус"}</span>
          <strong>{"Масштаб, пауза и доверие к деталям"}</strong>
        </article>
        <article>
          <span>{"На выходе"}</span>
          <strong>{"Сценарий от первого ощущения до визита"}</strong>
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
            <div className="compare-architecture-ui" aria-hidden="true"><span>RESIDENTIAL STUDY / 01</span><strong>Quiet geometry.</strong><i></i><i></i><i></i></div>
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
          <p>{"Понять пространство до первого визита."}</p>
        </li>
        <li>
          <span>{"02"}</span>
          <b>{"Иерархия"}</b>
          <p>{"От общего впечатления к планировке и материалам."}</p>
        </li>
        <li>
          <span>{"03"}</span>
          <b>{"Форма"}</b>
          <p>{"Дать архитектуре говорить крупным изображением."}</p>
        </li>
        <li>
          <span>{"04"}</span>
          <b>{"Следующий шаг"}</b>
          <p>{"Оставить человеку понятный путь к разговору."}</p>
        </li>
      </ol>
    </section>
    <section className="wrap case-next">
      <a className="text-link" href="/cases">{"← Ко всем проектам"}</a>
      <a className="dark-button" href="/contact">{"Обсудить похожую задачу ↗︎"}</a>
    </section>
  </>
);
