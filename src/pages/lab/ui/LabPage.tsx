import type { ReactElement } from 'react';

export const LabPage = (): ReactElement => (
  <>
    <section className="page-intro wrap">
      <p className="eyebrow">{"Acor Lab / интерактив"}</p>
      <h1>
{"Немного любопытства."}
        <br />
        <em>{"Много возможностей."}</em>
      </h1>
      <p className="intro-description">{"Место для небольших экспериментов с формой, движением и ощущением интерфейса. Попробуйте сами."}</p>
    </section>
    <section className="wrap lab-experiment">
      <div className="lab-controls">
        <div>
          <p className="eyebrow">{"FORM STUDY / 001"}</p>
          <h2>{"Настройте характер."}</h2>
        </div>
        <label>
{"Поворот "}
          <input type="range" id="lab-rotation" min="-25" max="25" defaultValue="0" />
          <output id="lab-angle">{"0°"}</output>
        </label>
        <label>
{"Масштаб "}
          <input type="range" id="lab-scale" min="70" max="115" defaultValue="90" />
          <output id="lab-size">{"90%"}</output>
        </label>
        <div className="lab-actions">
          <button type="button" className="pill-button" id="lab-reset">{"Сбросить"}</button>
          <button type="button" className="pill-button" id="lab-random">
{"Случайная форма "}
            <span>{"⤨"}</span>
          </button>
        </div>
        <div className="lab-palette" role="group" aria-label="Палитра эксперимента">
          <span className="lab-preset-label">{"Палитра"}</span>
          <button type="button" className="lab-palette-choice is-selected" data-lab-palette="studio" aria-pressed="true">{"Studio"}</button>
          <button type="button" className="lab-palette-choice" data-lab-palette="night" aria-pressed="false">{"Night"}</button>
          <button type="button" className="lab-palette-choice" data-lab-palette="moss" aria-pressed="false">{"Moss"}</button>
        </div>
      </div>
      <div className="lab-art">
        <img id="lab-object" src="/assets/sculpture.jpg" alt="Скульптура Acor с управляемым поворотом и масштабом" width="1536" height="1024" />
      </div>
    </section>
    <section className="wrap section-space">
      <p className="eyebrow">{"Не только эффект"}</p>
      <h2 className="statement">
{"Движение помогает"}
        <br />
        <em>{"понять интерфейс."}</em>
      </h2>
      <p className="body-large narrow">{"Анимация показывает связь между состояниями, отвечает на действие и направляет внимание. В рабочем продукте каждый эффект должен иметь свою причину."}</p>
    </section>
  </>
);
