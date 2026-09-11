(() => {
  'use strict';
  // A small, dependency-free locale layer keeps the static prototype usable in
  // four languages while preserving the original Russian markup as a fallback.
  const localeInfo = {
    ru: { short: 'RU', label: 'Русский', html: 'ru' },
    en: { short: 'EN', label: 'English', html: 'en' },
    pl: { short: 'PL', label: 'Polski', html: 'pl' },
    be: { short: 'BE', label: 'Беларуская', html: 'be' }
  };
  const localeRows = [
    ['Ваше имя', 'Your name', 'Twoje imię', 'Ваша імя'], ['Название, если есть', 'Company name, if available', 'Nazwa firmy, jeśli jest', 'Назва, калі ёсць'], ['Есть дата или готовы обсудить', 'Have a date or open to discussing it', 'Masz termin lub chcesz go omówić', 'Ёсць дата або гатовыя абмеркаваць'], ['Например, 850 000 ₽', 'For example, €8,500', 'Np. 35 000 zł', 'Напрыклад, 85 000 BYN'], ['Что хотите создать или изменить? Для кого? Какой результат важен?', 'What would you like to create or change? Who is it for? What outcome matters?', 'Co chcesz stworzyć lub zmienić? Dla kogo? Jaki efekt jest ważny?', 'Што хочаце стварыць або змяніць? Для каго? Які вынік важны?'], ['Найти человека или роль', 'Find a person or role', 'Znajdź osobę lub rolę', 'Знайсці чалавека або ролю'], ['you@company.ru', 'you@company.com', 'you@company.pl', 'you@company.by'],
    ['Русский', 'Russian', 'Rosyjski', 'Руская'], ['Проекты', 'Projects', 'Projekty', 'Праекты'], ['Услуги', 'Services', 'Usługi', 'Паслугі'], ['Студия', 'Studio', 'Studio', 'Студыя'], ['Студия / online', 'Studio / online', 'Studio / online', 'Студыя / online'], ['Команда', 'Team', 'Zespół', 'Каманда'], ['Карьера', 'Careers', 'Kariera', 'Кар’ера'], ['Lab', 'Lab', 'Lab', 'Lab'], ['Обсудить проект', 'Discuss a project', 'Omówmy projekt', 'Абмеркаваць праект'], ['Контакты', 'Contact', 'Kontakt', 'Кантакты'], ['Конфиденциальность', 'Privacy', 'Prywatność', 'Канфідэнцыяльнасць'], ['К содержимому', 'Skip to content', 'Przejdź do treści', 'Да зместу'], ['Основная навигация', 'Main navigation', 'Główna nawigacja', 'Асноўная навігацыя'], ['Мобильная навигация', 'Mobile navigation', 'Nawigacja mobilna', 'Мабільная навігацыя'], ['Ссылки в подвале', 'Footer links', 'Linki w stopce', 'Спасылкі ў падвале'], ['Открыть меню', 'Open menu', 'Otwórz menu', 'Адкрыць меню'], ['Закрыть меню', 'Close menu', 'Zamknij menu', 'Закрыць меню'], ['Язык сайта', 'Site language', 'Język strony', 'Мова сайта'], ['Переключить цветовую тему', 'Toggle colour theme', 'Przełącz motyw kolorystyczny', 'Пераключыць каляровую тэму'], ['Есть идея? Давайте придадим ей форму.', 'Have an idea? Let’s give it shape.', 'Masz pomysł? Nadajmy mu formę.', 'Ёсць ідэя? Надамо ёй форму.'], ['Начнём разговор', 'Start a conversation', 'Zacznijmy rozmowę', 'Пачнём размову'], ['Дизайн с характером. Разработка с мыслью.', 'Design with character. Development with intent.', 'Design z charakterem. Rozwój z myślą.', 'Дызайн з характарам. Распрацоўка з думкай.'], ['Смотреть проекты', 'View projects', 'Zobacz projekty', 'Глядзець праекты'], ['Обсудить задачу', 'Discuss the task', 'Omówmy zadanie', 'Абмеркаваць задачу'], ['Обсудить похожую задачу ↗︎', 'Discuss a similar task ↗︎', 'Omówmy podobne zadanie ↗︎', 'Абмеркаваць падобную задачу ↗︎'], ['Открыть письмо', 'Open email', 'Otwórz e-mail', 'Адкрыць ліст'], ['Скачать .txt', 'Download .txt', 'Pobierz .txt', 'Спампаваць .txt'], ['Откликнуться ↗︎', 'Apply ↗︎', 'Aplikuj ↗︎', 'Адгукнуцца ↗︎'], ['Карьера / открытые роли', 'Careers / open roles', 'Kariera / otwarte role', 'Кар’ера / адкрытыя ролі'], ['ПРИЁМ В КОМАНДУ / ДЕМО', 'JOIN THE TEAM / DEMO', 'DOŁĄCZ DO ZESPOŁU / DEMO', 'ДАЛУЧЭННЕ ДА КАМАНДЫ / ДЭМА'], ['Контактное лицо', 'Contact person', 'Osoba kontaktowa', 'Кантактная асоба'], ['Кого ищем', 'Who we are looking for', 'Kogo szukamy', 'Каго шукаем'], ['Как знакомимся', 'How we meet', 'Jak się poznajemy', 'Як знаёмімся'], ['Наше обещание', 'Our promise', 'Nasza obietnica', 'Наша абяцанне'], ['Демо-контакты', 'Demo contacts', 'Kontakty demo', 'Дэма-кантакты'],
    ['Независимая digital-студия', 'Independent digital studio', 'Niezależne studio digital', 'Незалежная digital-студыя'], ['ДИЗАЙН / ТЕХНОЛОГИИ / ХАРАКТЕР', 'DESIGN / TECHNOLOGY / CHARACTER', 'DESIGN / TECHNOLOGIA / CHARAKTER', 'ДЫЗАЙН / ТЭХНАЛОГІІ / ХАРАКТАР'], ['Хорошим идеям', 'Good ideas', 'Dobrym pomysłom', 'Добрым ідэям'], ['нужна', 'need', 'potrzebna jest', 'патрэбна'], ['форма.', 'form.', 'forma.', 'форма.'], ['Создаём сайты и приложения,', 'We create websites and apps,', 'Tworzymy strony i aplikacje,', 'Ствараем сайты і праграмы,'], ['в которых смысл становится опытом.', 'where meaning becomes an experience.', 'w których sens staje się doświadczeniem.', 'у якіх сэнс становіцца вопытам.'], ['ACOR / FORM STUDY — 001', 'ACOR / FORM STUDY — 001', 'ACOR / FORM STUDY — 001', 'ACOR / FORM STUDY — 001'], ['Листайте. Дальше интереснее.', 'Scroll on. It gets more interesting.', 'Przewiń. Dalej jest ciekawiej.', 'Гартайце. Далей цікавей.'], ['Стратегия. Дизайн. Разработка.', 'Strategy. Design. Development.', 'Strategia. Design. Rozwój.', 'Стратэгія. Дызайн. Распрацоўка.'], ['Форма следует за смыслом', 'Form follows meaning', 'Forma podąża za sensem', 'Форма ідзе за сэнсам'], ['Между «просто работает»', 'Between “it just works”', 'Pomiędzy „po prostu działa”', 'Паміж «проста працуе»'], ['и', 'and', 'a', 'і'], ['«невозможно забыть».', 'and “impossible to forget”.', 'a „nie da się zapomnieć”.', 'і «немагчыма забыць».'], ['Мы ищем точку встречи.', 'We look for the meeting point.', 'Szukamy punktu spotkania.', 'Мы шукаем кропку сустрэчы.'], ['Соединяем смелый дизайн и внимательную разработку. Чтобы продукт не только запоминался, но и помогал людям решать свои задачи.', 'We pair bold design with careful development, so a product is memorable and useful.', 'Łączymy odważny design z uważnym rozwojem, aby produkt zapadał w pamięć i pomagał ludziom.', 'Спалучаем смелы дызайн і ўважлівую распрацоўку, каб прадукт запамінаўся і дапамагаў людзям.'], ['Ближе к студии ↗︎', 'Meet the studio ↗︎', 'Poznaj studio ↗︎', 'Бліжэй да студыі ↗︎'], ['Избранные концепции', 'Selected concepts', 'Wybrane koncepcje', 'Абраныя канцэпцыі'], ['Работы говорят.', 'The work speaks.', 'Prace mówią.', 'Працы гавораць.'], ['Все проекты ↗︎', 'All projects ↗︎', 'Wszystkie projekty ↗︎', 'Усе праекты ↗︎'], ['Что мы делаем', 'What we do', 'Co robimy', 'Што мы робім'], ['От первой мысли.', 'From the first thought.', 'Od pierwszej myśli.', 'Ад першай думкі.'], ['До следующей версии.', 'To the next version.', 'Do kolejnej wersji.', 'Да наступнай версіі.'], ['Одна команда на всём пути.', 'One team all the way.', 'Jeden zespół na całej drodze.', 'Адна каманда на ўсім шляху.'], ['Столько экспертизы, сколько нужно задаче.', 'As much expertise as the task needs.', 'Tyle doświadczenia, ile potrzebuje zadanie.', 'Столькі экспертызы, колькі патрэбна задачы.'], ['Ваша идея — точка старта', 'Your idea is the starting point', 'Twój pomysł to punkt startu', 'Ваша ідэя — пункт старту'], ['А что создадим', 'What shall we create', 'Co stworzymy', 'А што створым'], ['вместе?', 'together?', 'razem?', 'разам?'], ['Выберите направление.', 'Choose a direction.', 'Wybierz kierunek.', 'Выберыце напрамак.'], ['Посмотрите, как меняется команда.', 'See how the team changes.', 'Zobacz, jak zmienia się zespół.', 'Паглядзіце, як змяняецца каманда.'], ['Сайт с характером', 'A website with character', 'Strona z charakterem', 'Сайт з характарам'], ['Бренд, пространство, история', 'Brand, space, story', 'Marka, przestrzeń, historia', 'Брэнд, прастора, гісторыя'], ['Удобное приложение', 'A useful app', 'Wygodna aplikacja', 'Зручная праграма'], ['Продукт в повседневной жизни', 'A product for everyday life', 'Produkt na co dzień', 'Прадукт на кожны дзень'], ['Новая визуальная система', 'A new visual system', 'Nowy system wizualny', 'Новая візуальная сістэма'], ['Идея, которую узнают', 'An idea people recognize', 'Pomysł, który rozpoznasz', 'Ідэя, якую пазнаюць'], ['ВАША ИДЕЯ / ACOR WEB', 'YOUR IDEA / ACOR WEB', 'TWÓJ POMYSŁ / ACOR WEB', 'ВАША ІДЭЯ / ACOR WEB'], ['Есть идея.', 'There is an idea.', 'Jest pomysł.', 'Ёсць ідэя.'], ['Будет сайт.', 'There will be a website.', 'Będzie strona.', 'Будзе сайт.'], ['Начать историю ↗︎', 'Start the story ↗︎', 'Zacznij historię ↗︎', 'Пачаць гісторыю ↗︎'], ['Впечатление с первого экрана.', 'A first-screen impression.', 'Wrażenie od pierwszego ekranu.', 'Уражанне з першага экрана.'], ['От структуры и визуальной идеи до быстрого, адаптивного сайта.', 'From structure and visual idea to a fast, responsive website.', 'Od struktury i pomysłu wizualnego do szybkiej, responsywnej strony.', 'Ад структуры і візуальнай ідэі да хуткага адаптыўнага сайта.'], ['Аналитик', 'Analyst', 'Analityk', 'Аналітык'], ['Дизайнер', 'Designer', 'Projektant', 'Дызайнер'], ['Обсудить сайт ↗︎', 'Discuss the website ↗︎', 'Omówmy stronę ↗︎', 'Абмеркаваць сайт ↗︎'], ['Люди за результатом', 'People behind the result', 'Ludzie za rezultatem', 'Людзі за вынікам'], ['Разные взгляды.', 'Different perspectives.', 'Różne spojrzenia.', 'Розныя погляды.'], ['Общий фокус.', 'One shared focus.', 'Wspólny fokus.', 'Агульны фокус.'], ['Аналитики, дизайнеры и разработчики за одним столом. Обсуждаем, пробуем, находим. Вместе с вами.', 'Analysts, designers and developers at one table. We discuss, test and find the way with you.', 'Analitycy, projektanci i programiści przy jednym stole. Rozmawiamy, próbujemy i znajdujemy rozwiązania razem z Tobą.', 'Аналітыкі, дызайнеры і распрацоўшчыкі за адным сталом. Абмяркоўваем, спрабуем, знаходзім разам з вамі.'], ['Познакомиться с командой ↗︎', 'Meet the team ↗︎', 'Poznaj zespół ↗︎', 'Пазнаёміцца з камандай ↗︎'], ['Как идея становится продуктом', 'How an idea becomes a product', 'Jak pomysł staje się produktem', 'Як ідэя становіцца прадуктам'], ['У каждого шага —', 'Every step has a', 'Każdy krok ma', 'У кожнага кроку —'], ['понятный результат.', 'clear result.', 'jasny rezultat.', 'зразумелы вынік.'], ['Выберите этап.', 'Choose a stage.', 'Wybierz etap.', 'Выберыце этап.'], ['Покажем, что происходит внутри.', 'See what happens inside.', 'Pokażemy, co dzieje się w środku.', 'Пакажам, што адбываецца ўнутры.'], ['Погружение', 'Discovery', 'Poznanie', 'Пагружэнне'], ['Создание', 'Creation', 'Tworzenie', 'Стварэнне'], ['Запуск', 'Launch', 'Start', 'Запуск'], ['Сначала — правильные вопросы', 'Start with the right questions', 'Zaczynamy od właściwych pytań', 'Спачатку — правільныя пытанні'], ['Собираем картину.', 'We build the picture.', 'Budujemy obraz.', 'Збіраем карціну.'], ['Находим главное.', 'We find what matters.', 'Znajdujemy sedno.', 'Знаходзім галоўнае.'], ['Проводим интервью, разбираем аудиторию и пользовательские сценарии. Вместе определяем, что продукт должен изменить.', 'We interview people, study the audience and define what the product should change.', 'Prowadzimy wywiady, poznajemy odbiorców i ustalamy, co produkt ma zmienić.', 'Праводзім інтэрв’ю, разбіраем аўдыторыю і вызначаем, што павінен змяніць прадукт.'], ['Карта сценариев', 'Scenario map', 'Mapa scenariuszy', 'Карта сцэнарыяў'], ['Требования к продукту', 'Product requirements', 'Wymagania produktu', 'Патрабаванні да прадукту'], ['План работы', 'Work plan', 'Plan pracy', 'План працы'], ['Идея приобретает форму', 'The idea takes shape', 'Pomysł nabiera formy', 'Ідэя набывае форму'], ['Пробуем. Обсуждаем.', 'We try. We discuss.', 'Próbujemy. Rozmawiamy.', 'Спрабуем. Абмяркоўваем.'], ['Доводим до деталей.', 'We refine the details.', 'Dopracowujemy szczegóły.', 'Даводзім да дэталяў.'], ['Создаём концепцию, проверяем сценарии на прототипе и превращаем дизайн в работающий интерфейс. Показываем промежуточные версии.', 'We create a concept, test scenarios in a prototype and turn design into a working interface.', 'Tworzymy koncepcję, testujemy scenariusze w prototypie i zamieniamy design w działający interfejs.', 'Ствараем канцэпцыю, правяраем сцэнарыі на прататыпе і ператвараем дызайн у працоўны інтэрфейс.'], ['Визуальная концепция', 'Visual concept', 'Koncepcja wizualna', 'Візуальная канцэпцыя'], ['Дизайн-система', 'Design system', 'System designu', 'Дызайн-сістэма'], ['Рабочий продукт', 'Working product', 'Działający produkt', 'Працоўны прадукт'], ['Всё готово к первому пользователю', 'Ready for the first user', 'Gotowe na pierwszego użytkownika', 'Усё гатова да першага карыстальніка'], ['Проверяем важное.', 'We check what matters.', 'Sprawdzamy to, co ważne.', 'Правяраем важнае.'], ['Запускаем уверенно.', 'We launch with confidence.', 'Startujemy pewnie.', 'Запускаем упэўнена.'], ['Тестируем продукт на разных устройствах, готовим выпуск и передаём команде понятные инструкции. Договариваемся о дальнейшем развитии.', 'We test on devices, prepare the release and hand the team clear instructions for what comes next.', 'Testujemy na urządzeniach, przygotowujemy wydanie i przekazujemy zespołowi jasne instrukcje.', 'Тэстуем на розных прыладах, рыхтуем рэліз і перадаём камандзе зразумелыя інструкцыі.'], ['Протестированные сценарии', 'Tested scenarios', 'Przetestowane scenariusze', 'Пратэставаныя сцэнарыі'], ['Опубликованный продукт', 'Published product', 'Opublikowany produkt', 'Апублікаваны прадукт'], ['План развития', 'Growth plan', 'Plan rozwoju', 'План развіцця'], ['Вы участвуете в решениях. Мы отвечаем за целостность.', 'You take part in decisions. We keep the whole picture together.', 'Bierzesz udział w decyzjach. Dbamy o spójność.', 'Вы ўдзельнічаеце ў рашэннях. Мы адказваем за цэласнасць.'], ['Обсудить свой процесс ↗︎', 'Discuss your process ↗︎', 'Omówmy Twój proces ↗︎', 'Абмеркаваць свой працэс ↗︎'],
    ['Студия / Acor Web', 'Studio / Acor Web', 'Studio / Acor Web', 'Студыя / Acor Web'], ['Внимание к сути.', 'Attention to the essence.', 'Uwaga na sedno.', 'Увага да сутнасці.'], ['Смелость в форме.', 'Courage in form.', 'Odwaga w formie.', 'Смеласць у форме.'], ['Мы — команда, в которой дизайн и разработка разговаривают на одном языке. Создаём цифровые продукты с характером и понятной логикой.', 'We are a team where design and development speak one language. We create digital products with character and clear logic.', 'Jesteśmy zespołem, w którym design i rozwój mówią jednym językiem. Tworzymy produkty cyfrowe z charakterem i jasną logiką.', 'Мы — каманда, у якой дызайн і распрацоўка размаўляюць на адной мове. Ствараем лічбавыя прадукты з характарам і зразумелай логікай.'], ['СМЫСЛ × ФОРМА × ТЕХНОЛОГИИ', 'MEANING × FORM × TECHNOLOGY', 'SENS × FORMA × TECHNOLOGIA', 'СЭНС × ФОРМА × ТЭХНАЛОГІІ'], ['Наш подход', 'Our approach', 'Nasze podejście', 'Наш падыход'], ['Хороший результат', 'A good result', 'Dobry rezultat', 'Добры вынік'], ['начинается', 'starts', 'zaczyna się', 'пачынаецца'], ['с диалога.', 'with a dialogue.', 'od rozmowy.', 'з дыялогу.'], ['Нам важно понять, почему продукт должен появиться. Что он изменит. Кто будет им пользоваться. Из этого рождаются решения, которые не нужно объяснять длинной презентацией.', 'We need to understand why a product should exist, what it changes and who will use it. That is where self-explanatory decisions come from.', 'Chcemy zrozumieć, po co produkt ma powstać, co zmieni i kto będzie z niego korzystać. Z tego rodzą się rozwiązania, których nie trzeba długo tłumaczyć.', 'Нам важна зразумець, навошта патрэбны прадукт, што ён зменіць і хто будзе ім карыстацца. Так нараджаюцца рашэнні, якія не трэба доўга тлумачыць.'], ['Сначала задача.', 'The task comes first.', 'Najpierw zadanie.', 'Спачатку задача.'], ['Потом инструменты.', 'Then the tools.', 'Potem narzędzia.', 'Потым інструменты.'], ['Выбираем технологии и визуальные приёмы под продукт, аудиторию и ограничения.', 'We choose technology and visual techniques for the product, audience and constraints.', 'Dobieramy technologie i środki wizualne do produktu, odbiorców i ograniczeń.', 'Выбіраем тэхналогіі і візуальныя прыёмы пад прадукт, аўдыторыю і абмежаванні.'], ['Открытость', 'Openness', 'Otwartość', 'Адкрытасць'], ['Решения видны.', 'Decisions stay visible.', 'Decyzje są widoczne.', 'Рашэнні бачныя.'], ['Вопросы обсуждаются.', 'Questions are discussed.', 'Pytania omawiamy razem.', 'Пытанні абмяркоўваюцца.'], ['Показываем промежуточные результаты и объясняем, как пришли к ним.', 'We show work in progress and explain how we got there.', 'Pokazujemy wersje pośrednie i wyjaśniamy, skąd się wzięły.', 'Паказваем прамежкавыя вынікі і тлумачым, як да іх прыйшлі.'], ['Внимание', 'Care', 'Uważność', 'Увага'], ['Детали складываются', 'Details add up', 'Szczegóły składają się', 'Дэталі складаюцца'], ['в целое.', 'into a whole.', 'w całość.', 'у цэлае.'], ['Типографика, скорость, доступность и обратная связь — одинаково важные части опыта.', 'Typography, speed, accessibility and feedback are equally important parts of the experience.', 'Typografia, szybkość, dostępność i informacja zwrotna są równie ważne.', 'Тыпаграфіка, хуткасць, даступнасць і зваротная сувязь — аднолькава важныя часткі досведу.'], ['Наблюдения студии', 'Studio notes', 'Notatki studia', 'Назіранні студыі'], ['Думаем вслух.', 'Thinking out loud.', 'Myślimy na głos.', 'Думаем услых.'], ['Проверяем делом.', 'We test it in practice.', 'Sprawdzamy w praktyce.', 'Правяраем справай.'], ['Короткие заметки о структуре, визуальном языке и поведении цифровых продуктов.', 'Short notes on structure, visual language and product behaviour.', 'Krótkie notatki o strukturze, języku wizualnym i zachowaniu produktów cyfrowych.', 'Кароткія нататкі пра структуру, візуальную мову і паводзіны лічбавых прадуктаў.'], ['01 / Структура', '01 / Structure', '01 / Struktura', '01 / Структура'], ['Красивый экран начинается до дизайна.', 'A beautiful screen starts before design.', 'Piękny ekran zaczyna się przed designem.', 'Прыгожы экран пачынаецца да дызайну.'], ['Сначала раскладываем задачу на решения и сценарии. Когда путь пользователя ясен, визуальный стиль получает опору и не превращается в декорацию.', 'We first break the task into decisions and scenarios. When the path is clear, visual style has a foundation.', 'Najpierw rozkładamy zadanie na decyzje i scenariusze. Gdy ścieżka jest jasna, styl wizualny ma oparcie.', 'Спачатку раскладваем задачу на рашэнні і сцэнарыі. Калі шлях карыстальніка ясны, візуальны стыль мае апору.'], ['02 / Движение', '02 / Motion', '02 / Ruch', '02 / Рух'], ['Анимация должна отвечать на действие.', 'Animation should answer an action.', 'Animacja powinna odpowiadać na działanie.', 'Анімацыя павінна адказваць на дзеянне.'], ['Переход, задержка или смена цвета полезны, когда объясняют связь между состояниями. Мы убираем эффект, если он не помогает понять следующий шаг.', 'A transition, delay or colour change is useful when it explains a connection between states. We remove effects that do not help.', 'Przejście, opóźnienie lub zmiana koloru mają sens, gdy wyjaśniają relację stanów.', 'Пераход, затрымка ці змена колеру карысныя, калі тлумачаць сувязь паміж станамі.'], ['03 / Запуск', '03 / Launch', '03 / Start', '03 / Запуск'], ['Первую версию можно сделать точнее.', 'The first version can be more precise.', 'Pierwszą wersję można dopracować.', 'Першую версію можна зрабіць дакладней.'], ['Запуск — начало наблюдений. Смотрим на реальные сценарии, собираем обратную связь и развиваем продукт там, где это заметно людям.', 'Launch is the start of observation. We watch real scenarios, collect feedback and improve what people notice.', 'Start to początek obserwacji. Patrzymy na scenariusze, zbieramy opinie i rozwijamy to, co widać.', 'Запуск — пачатак назіранняў. Глядзім на рэальныя сцэнарыі, збіраем водгукі і развіваем тое, што заўважаюць людзі.'],
    ['Новый проект', 'New project', 'Nowy projekt', 'Новы праект'], ['С чего начинается', 'Where does it start', 'Od czego zaczyna się', 'З чаго пачынаецца'], ['ваша идея?', 'your idea?', 'Twój pomysł?', 'ваша ідэя?'], ['Расскажите о задаче. Можно без технического задания — начнём с контекста.', 'Tell us about the task. No technical brief needed — we start with context.', 'Opowiedz o zadaniu. Nie potrzebujemy pełnego briefu — zaczynamy od kontekstu.', 'Раскажыце пра задачу. Тэхнічнае заданне не абавязкова — пачнём з кантэксту.'], ['Быстрый бриф / 04 шага', 'Quick brief / 04 steps', 'Szybki brief / 04 kroki', 'Хуткі брыф / 04 крокі'], ['Соберём контекст', 'Let’s gather context', 'Zbierzmy kontekst', 'Збяром кантэкст'], ['за минуту.', 'in a minute.', 'w minutę.', 'за хвіліну.'], ['Выберите то, что ближе. Ответы подставятся в заявку и помогут начать разговор предметно.', 'Choose what feels closest. Your answers will be added to the brief.', 'Wybierz najbliższe odpowiedzi. Trafią do zgłoszenia i ułatwią rozmowę.', 'Выберыце тое, што бліжэй. Адказы трапяць у заяўку і дапамогуць пачаць размову.'], ['Что создаём?', 'What are we creating?', 'Co tworzymy?', 'Што ствараем?'], ['Сайт', 'Website', 'Strona', 'Сайт'], ['Приложение', 'App', 'Aplikacja', 'Праграма'], ['Визуальная система', 'Visual system', 'System wizualny', 'Візуальная сістэма'], ['Другое', 'Other', 'Inne', 'Іншае'], ['Для кого?', 'Who is it for?', 'Dla kogo?', 'Для каго?'], ['Клиенты и партнёры', 'Clients and partners', 'Klienci i partnerzy', 'Кліенты і партнёры'], ['Команда внутри компании', 'Internal team', 'Zespół wewnątrz firmy', 'Каманда ўнутры кампаніі'], ['Покупатели', 'Buyers', 'Kupujący', 'Пакупнікі'], ['Широкая аудитория', 'A broad audience', 'Szeroka publiczność', 'Шырокая аўдыторыя'], ['Что должно измениться?', 'What should change?', 'Co ma się zmienić?', 'Што павінна змяніцца?'], ['Запустить новое', 'Launch something new', 'Uruchomić coś nowego', 'Запусціць новае'], ['Обновить существующее', 'Refresh what exists', 'Odświeżyć istniejące', 'Абнавіць існуючае'], ['Проверить идею', 'Validate an idea', 'Sprawdzić pomysł', 'Праверыць ідэю'], ['Развить продукт', 'Grow the product', 'Rozwinąć produkt', 'Развіць прадукт'], ['Какое ощущение важно?', 'What feeling matters?', 'Jakie odczucie jest ważne?', 'Якое адчуванне важнае?'], ['Спокойное', 'Calm', 'Spokojne', 'Спакойнае'], ['Смелое', 'Bold', 'Odważne', 'Смелае'], ['Точное', 'Precise', 'Precyzyjne', 'Дакладнае'], ['Живое', 'Alive', 'Żywe', 'Жывое'], ['← Назад', '← Back', '← Wstecz', '← Назад'], ['Следующий вопрос', 'Next question', 'Następne pytanie', 'Наступнае пытанне'], ['Ваш контекст / 01 из 04', 'Your context / 01 of 04', 'Twój kontekst / 01 z 04', 'Ваш кантэкст / 01 з 04'], ['Сайт с характером.', 'A website with character.', 'Strona z charakterem.', 'Сайт з характарам.'], ['Соберём структуру, визуальную идею и понятный путь к действию.', 'We will shape the structure, visual idea and a clear path to action.', 'Zbudujemy strukturę, pomysł wizualny i jasną ścieżkę działania.', 'Збяром структуру, візуальную ідэю і зразумелы шлях да дзеяння.'], ['Структура', 'Structure', 'Struktura', 'Структура'], ['Это черновая карта задачи — её можно уточнить в форме ниже.', 'This is a rough map of the task — refine it in the form below.', 'To robocza mapa zadania — doprecyzujesz ją w formularzu.', 'Гэта чарнавая карта задачы — яе можна ўдакладніць у форме ніжэй.'], ['После заявки', 'After you apply', 'Po zgłoszeniu', 'Пасля заяўкі'], ['будет понятен.', 'will be clear.', 'będzie jasny.', 'будзе зразумелы.'], ['Не оставляем вас один на один с формой. Сначала возвращаемся с вопросами, потом предлагаем маршрут.', 'You are not left alone with a form. We return with questions, then suggest a route.', 'Nie zostawiamy Cię samego z formularzem. Wracamy z pytaniami i proponujemy drogę.', 'Мы не пакідаем вас сам-насам з формай. Вяртаемся з пытаннямі і прапануем маршрут.'], ['Знакомимся', 'Meet each other', 'Poznajemy się', 'Знаёмімся'], ['Коротко обсуждаем контекст, аудиторию и то, что уже пробовали.', 'We briefly discuss context, audience and what you have tried.', 'Krótko omawiamy kontekst, odbiorców i dotychczasowe próby.', 'Коратка абмяркоўваем кантэкст, аўдыторыю і тое, што ўжо спрабавалі.'], ['Собираем задачу', 'Shape the task', 'Układamy zadanie', 'Збіраем задачу'], ['Фиксируем главное и показываем, какие решения нужны на первом этапе.', 'We capture what matters and show which decisions are needed first.', 'Ustalamy priorytety i pokazujemy decyzje potrzebne na początku.', 'Фіксуем галоўнае і паказваем, якія рашэнні патрэбныя спачатку.'], ['Договариваемся', 'Agree on the route', 'Ustalamy plan', 'Дамаўляемся'], ['Предлагаем состав команды, формат работы и ближайший понятный шаг.', 'We suggest the team, working format and next clear step.', 'Proponujemy skład zespołu, sposób pracy i najbliższy krok.', 'Прапануем склад каманды, фармат працы і бліжэйшы зразумелы крок.'], ['Напрямую', 'Directly', 'Bezpośrednio', 'Непасрэдна'], ['Или подготовьте короткий бриф здесь.', 'Or prepare a short brief here.', 'Albo przygotuj krótki brief tutaj.', 'Або падрыхтуйце кароткі брыф тут.'], ['Его можно сохранить и отправить нам по почте.', 'You can save it and send it by email.', 'Możesz go zapisać i wysłać e-mailem.', 'Яго можна захаваць і адправіць нам па пошце.'], ['Как вас зовут', 'Your name', 'Twoje imię', 'Як вас завуць'], ['Компания', 'Company', 'Firma', 'Кампанія'], ['Email для связи', 'Email for contact', 'E-mail do kontaktu', 'Email для сувязі'], ['Что планируете?', 'What are you planning?', 'Co planujesz?', 'Што плануеце?'], ['Несколько слов о задаче', 'A few words about the task', 'Kilka słów o zadaniu', 'Некалькі слоў пра задачу'], ['Ориентир по бюджету', 'Budget range', 'Orientacyjny budżet', 'Арыенцір па бюджэце'], ['Можно указать любую сумму или написать «обсудим».', 'Enter any amount or write “let’s discuss”.', 'Wpisz dowolną kwotę lub „omówmy”.', 'Можна ўказаць любую суму або напісаць «абмяркуем».'], ['Желаемые сроки', 'Desired timeline', 'Pożądany termin', 'Жаданыя тэрміны'], ['Откроется ваше почтовое приложение с готовым письмом.', 'Your email app will open with a ready message.', 'Otworzy się aplikacja pocztowa z gotową wiadomością.', 'Адкрыецца ваша паштовая праграма з гатовым лістом.'], ['Резервная копия брифа остаётся в браузере.', 'A backup of the brief stays in your browser.', 'Kopia briefu zostaje w przeglądarce.', 'Рэзервовая копія брыфа застаецца ў браўзеры.'], ['Ориентир / без сметы', 'Estimate / no quote', 'Orientacyjnie / bez wyceny', 'Арыенцір / без каштарысу'], ['Соберите примерный', 'Build a rough', 'Zbuduj przybliżony', 'Збярыце прыкладны'], ['маршрут проекта.', 'project route.', 'plan projektu.', 'маршрут праекта.'], ['Это не расчёт стоимости, а быстрый способ понять, какие роли и сроки могут понадобиться.', 'This is not a quote, just a quick way to see possible roles and timelines.', 'To nie jest wycena, tylko szybki obraz ról i terminów.', 'Гэта не разлік кошту, а хуткі спосаб зразумець ролі і тэрміны.'], ['Частые вопросы', 'Frequently asked questions', 'Najczęstsze pytania', 'Частыя пытанні'], ['Чтобы начать, не нужно', 'To begin, you do not need to', 'Aby zacząć, nie musisz', 'Каб пачаць, не трэба'], ['знать всё заранее.', 'know everything in advance.', 'wiedzieć wszystkiego.', 'ведаць усё загадзя.'], ['Собрали ответы на вопросы, которые обычно появляются до первого разговора.', 'We collected answers to questions that usually come up before the first conversation.', 'Zebraliśmy odpowiedzi na pytania, które zwykle pojawiają się przed pierwszą rozmową.', 'Забралі адказы на пытанні, якія звычайна ўзнікаюць да першай размовы.'],
    ['Портфолио / концепции', 'Portfolio / concepts', 'Portfolio / koncepcje', 'Партфоліа / канцэпцыі'], ['Каждый проект —', 'Every project is a', 'Każdy projekt to', 'Кожны праект —'], ['новый ракурс.', 'new angle.', 'nowa perspektywa.', 'новы ракурс.'], ['Визуальные и продуктовые исследования студии. Эти проекты демонстрируют подход; изображения и данные в интерфейсах — концептуальные.', 'Visual and product studies by the studio. They demonstrate our approach; images and interface data are conceptual.', 'Badania wizualne i produktowe studia. Projekty pokazują podejście, a obrazy i dane są koncepcyjne.', 'Візуальныя і прадуктовыя даследаванні студыі. Праекты паказваюць падыход, выявы і даныя — канцэптуальныя.'], ['Все проекты', 'All projects', 'Wszystkie projekty', 'Усе праекты'], ['E-commerce', 'E-commerce', 'E-commerce', 'E-commerce'], ['Продукты', 'Products', 'Produkty', 'Прадукты'], ['Порядок', 'Sort', 'Kolejność', 'Парадак'], ['Избранное', 'Curated', 'Wybrane', 'Абранае'], ['По названию', 'By name', 'Po nazwie', 'Па назве'], ['Вид', 'View', 'Widok', 'Выгляд'], ['Сетка', 'Grid', 'Siatka', 'Сетка'], ['Список', 'List', 'Lista', 'Спіс'], ['Концепт / 2026', 'Concept / 2026', 'Koncepcja / 2026', 'Канцэпт / 2026'], ['Архитектура, которую можно почувствовать.', 'Architecture you can feel.', 'Architektura, którą można poczuć.', 'Архітэктура, якую можна адчуць.'], ['Ближе к природе. Даже онлайн.', 'Closer to nature. Even online.', 'Bliżej natury. Nawet online.', 'Бліжэй да прыроды. Нават анлайн.'], ['Финансы в человеческом масштабе.', 'Finance at a human scale.', 'Finanse w ludzkiej skali.', 'Фінансы ў чалавечым маштабе.'], ['Экспертиза', 'Expertise', 'Ekspertyza', 'Экспертыза'], ['Сложное внутри.', 'Complex inside.', 'Złożone w środku.', 'Складанае ўнутры.'], ['Простое для людей.', 'Simple for people.', 'Proste dla ludzi.', 'Простае для людзей.'], ['Подключаемся на этапе идеи или помогаем уже работающему продукту стать лучше.', 'We join at the idea stage or help a working product become better.', 'Dołączamy na etapie pomysłu lub rozwijamy działający produkt.', 'Далучаемся на этапе ідэі або дапамагаем прадукту стаць лепшым.'], ['Работаем в вашем ритме.', 'We work at your pace.', 'Pracujemy w Twoim rytmie.', 'Працуем у вашым рытме.'], ['Отдельный этап или весь цикл.', 'One stage or the full cycle.', 'Pojedynczy etap lub cały cykl.', 'Асобны этап або поўны цыкл.'], ['Состав и формат обсуждаем под задачу.', 'We shape the team and format around the task.', 'Dobieramy skład i format do zadania.', 'Склад і фармат абмяркоўваем пад задачу.'], ['Прозрачность работы', 'Transparent work', 'Przejrzysta praca', 'Празрыстасць працы'], ['Понятно, что', 'It is clear what', 'Jasne, co', 'Зразумела, што'], ['будет дальше.', 'comes next.', 'będzie dalej.', 'будзе далей.'], ['Ориентир / без сметы', 'Estimate / no quote', 'Orientacyjnie / bez wyceny', 'Арыенцір / без каштарысу'], ['Что создаём', 'What we create', 'Co tworzymy', 'Што ствараем'], ['Глубина участия', 'Depth of involvement', 'Zakres udziału', 'Глыбіня ўдзелу'], ['Стартовый этап', 'Starting stage', 'Etap startowy', 'Стартавы этап'], ['Полный цикл', 'Full cycle', 'Pełny cykl', 'Поўны цыкл'], ['Развитие после запуска', 'Growth after launch', 'Rozwój po starcie', 'Развіццё пасля запуску'], ['Темп', 'Pace', 'Tempo', 'Тэмп'], ['Ровный', 'Steady', 'Równe', 'Роўны'], ['Ускоренный', 'Accelerated', 'Przyspieszone', 'Паскораны'], ['Ваш ориентир', 'Your estimate', 'Twój orientacyjny plan', 'Ваш арыенцір'], ['Срок', 'Timeline', 'Termin', 'Тэрмін'], ['Уточнить маршрут ↗︎', 'Clarify the route ↗︎', 'Doprecyzuj plan ↗︎', 'Удакладніць маршрут ↗︎'],
    ['Роль в проекте', 'Role in the project', 'Rola w projekcie', 'Роля ў праекце'], ['Все роли', 'All roles', 'Wszystkie role', 'Усе ролі'], ['Исследует', 'Researches', 'Bada', 'Даследуе'], ['Проектирует', 'Designs', 'Projektuje', 'Праектуе'], ['Разрабатывает', 'Builds', 'Tworzy', 'Распрацоўвае'], ['Проверяет', 'Checks', 'Sprawdza', 'Правярае'], ['Ведёт', 'Leads', 'Prowadzi', 'Вядзе'], ['Все', 'All', 'Wszystkie', 'Усе'], ['Найти участника команды', 'Find a team member', 'Znajdź osobę w zespole', 'Знайсці ўдзельніка каманды'], ['24 участника · 7 направлений', '24 people · 7 disciplines', '24 osoby · 7 obszarów', '24 чалавекі · 7 напрамкаў'], ['Вопросы, с которых начинается продукт.', 'Questions where a product begins.', 'Pytania, od których zaczyna się produkt.', 'Пытанні, з якіх пачынаецца прадукт.'], ['Форма, в которой узнаётся характер.', 'Form with a recognizable character.', 'Forma, w której poznasz charakter.', 'Форма, у якой пазнаецца характар.'], ['Тот самый момент, когда дизайн оживает.', 'The moment design comes alive.', 'Moment, gdy design ożywa.', 'Той момант, калі дызайн ажывае.'], ['Надёжная логика за каждым действием.', 'Reliable logic behind every action.', 'Pewna logika za każdym działaniem.', 'Надзейная логіка за кожным дзеяннем.'], ['Продукт, который всегда под рукой.', 'A product always at hand.', 'Produkt zawsze pod ręką.', 'Прадукт, які заўсёды пад рукой.'], ['Внимание к тому, что легко пропустить.', 'Care for what is easy to miss.', 'Uwaga na to, co łatwo przeoczyć.', 'Увага да таго, што лёгка прапусціць.'], ['Один контекст для команды и клиента.', 'One context for team and client.', 'Jeden kontekst dla zespołu i klienta.', 'Адзін кантэкст для каманды і кліента.'], ['Знакомьтесь ближе.', 'Meet everyone closer.', 'Poznajcie ich bliżej.', 'Пазнаёмцеся бліжэй.'], ['Демонстрационные профили: имена и портреты вымышлены и созданы для макета сайта.', 'Demo profiles: names and portraits are fictional and made for the site prototype.', 'Profile demonstracyjne: imiona i portrety są fikcyjne i stworzone na potrzeby makiety.', 'Дэманстрацыйныя профілі: імёны і партрэты выдуманыя і створаныя для макета сайта.'], ['Никого не нашли. Попробуйте другое имя или направление.', 'No one found. Try another name or discipline.', 'Nikogo nie znaleziono. Spróbuj innego imienia lub obszaru.', 'Нікога не знайшлі. Паспрабуйце іншае імя або напрамак.'], ['Скопировать email', 'Copy email', 'Kopiuj e-mail', 'Скапіяваць email'], ['Черновик восстановлен из этой сессии.', 'Draft restored from this session.', 'Wersja robocza przywrócona z tej sesji.', 'Чарнавік адноўлены з гэтай сесіі.'], ['Черновик очищен.', 'Draft cleared.', 'Wersja robocza wyczyszczona.', 'Чарнавік ачышчаны.'], ['Бриф скачан. Его можно прикрепить к письму или сохранить для себя.', 'Brief downloaded. Attach it to an email or keep it for yourself.', 'Brief pobrany. Dołącz go do e-maila lub zachowaj.', 'Брыф спампаваны. Яго можна далучыць да ліста або захаваць.'], ['Анимация', 'Motion', 'Animacja', 'Анімацыя'], ['вкл', 'on', 'wł.', 'уключана'], ['выкл', 'off', 'wył.', 'выключана'], ['Светлая', 'Light', 'Jasny', 'Светлая'], ['Тёмная', 'Dark', 'Ciemny', 'Цёмная'], ['Открыть поиск по сайту', 'Open site search', 'Otwórz wyszukiwanie', 'Адкрыць пошук па сайце'], ['Навигация / Acor Web', 'Navigation / Acor Web', 'Nawigacja / Acor Web', 'Навігацыя / Acor Web'], ['Куда дальше?', 'Where next?', 'Dokąd dalej?', 'Куды далей?'], ['Найти раздел или действие', 'Find a section or action', 'Znajdź sekcję lub działanie', 'Знайсці раздзел або дзеянне'], ['Ничего не нашли. Попробуйте другое слово.', 'Nothing found. Try another word.', 'Nic nie znaleziono. Spróbuj innego słowa.', 'Нічога не знайшлі. Паспрабуйце іншае слова.'], ['Ссылка скопирована', 'Link copied', 'Skopiowano link', 'Спасылка скапіявана'], ['Параметры скопированы.', 'Parameters copied.', 'Parametry skopiowane.', 'Параметры скапіяваныя.'], ['Офлайн-режим: сохранённые материалы доступны, формы можно заполнить позже.', 'Offline mode: saved materials are available; forms can be completed later.', 'Tryb offline: zapisane materiały są dostępne, a formularze można uzupełnić później.', 'Афлайн-рэжым: захаваныя матэрыялы даступныя, формы можна запоўніць пазней.'], ['Связь прервалась.', 'Connection lost.', 'Połączenie przerwane.', 'Сувязь перарвалася.'], ['Форма осталась.', 'The form remains.', 'Formularz pozostał.', 'Форма засталася.'], ['Попробуйте открыть страницу ещё раз — сохранённые материалы доступны без сети.', 'Try opening the page again — saved materials are available offline.', 'Spróbuj otworzyć stronę ponownie — zapisane materiały są dostępne offline.', 'Паспрабуйце адкрыць старонку яшчэ раз — захаваныя матэрыялы даступныя без сеткі.'], ['Вернуться в студию ↗︎', 'Return to the studio ↗︎', 'Wróć do studia ↗︎', 'Вярнуцца ў студыю ↗︎'], ['Страница не найдена — Acor Web', 'Page not found — Acor Web', 'Nie znaleziono strony — Acor Web', 'Старонка не знойдзена — Acor Web'], ['Эта страница', 'This page', 'Ta strona', 'Гэтая старонка'], ['ушла дальше.', 'has moved on.', 'poszła dalej.', 'пайшла далей.'], ['Вернитесь в студию или откройте портфолио — там всё на месте.', 'Return to the studio or open the portfolio — everything is still there.', 'Wróć do studia lub otwórz portfolio — wszystko jest na miejscu.', 'Вярніцеся ў студыю або адкрыйце партфоліа — усё на месцы.'], ['Три концепции и разбор решений', 'Three concepts and a breakdown of decisions', 'Trzy koncepcje i omówienie decyzji', 'Тры канцэпцыі і разбор рашэнняў'], ['Стратегия, дизайн и разработка', 'Strategy, design and development', 'Strategia, design i rozwój', 'Стратэгія, дызайн і распрацоўка'], ['Подход и наблюдения команды', 'The team’s approach and notes', 'Podejście i notatki zespołu', 'Падыход і назіранні каманды'], ['Люди и роли в проекте', 'People and roles in a project', 'Ludzie i role w projekcie', 'Людзі і ролі ў праекце'], ['Вакансии, стажировка и контакты для отклика', 'Open roles, internships and application contacts', 'Oferty, staż i kontakt do zgłoszeń', 'Вакансіі, стажыроўка і кантакты для водгуку'], ['Форма, движение и эксперименты', 'Form, motion and experiments', 'Forma, ruch i eksperymenty', 'Форма, рух і эксперыменты'], ['Собрать задачу и начать разговор', 'Shape a brief and start a conversation', 'Zbierz zadanie i zacznijmy rozmowę', 'Сабраць задачу і пачаць размову'], ['Заполнить заявку', 'Fill in the brief', 'Wypełnij zgłoszenie', 'Запоўніць заяўку'], ['Скопируйте URL из адресной строки', 'Copy the URL from the address bar', 'Skopiuj adres URL z paska adresu', 'Скапіруйце URL з адраснага радка'], ['Скопировать ссылку на этот бриф', 'Copy the link to this brief', 'Kopiuj link do tego briefu', 'Скапіраваць спасылку на гэты брыф'],
    ['Приложение, которым удобно пользоваться.', 'An app that feels easy to use.', 'Aplikacja, z której łatwo korzystać.', 'Праграма, якой зручна карыстацца.'], ['Продумываем ежедневные сценарии, состояния и связь между экранами.', 'We shape everyday flows, states and the connection between screens.', 'Projektujemy codzienne scenariusze, stany i relacje między ekranami.', 'Прадумваем штодзённыя сцэнарыі, станы і сувязь паміж экранамі.'], ['Визуальная система, которую узнают.', 'A visual system people recognize.', 'System wizualny, który można rozpoznać.', 'Візуальная сістэма, якую пазнаюць.'], ['Находим идею и превращаем её в устойчивый язык для продукта и команды.', 'We find the idea and turn it into a durable language for the product and team.', 'Znajdujemy pomysł i zamieniamy go w spójny język produktu i zespołu.', 'Знаходзім ідэю і ператвараем яе ва ўстойлівую мову для прадукту і каманды.'], ['Задача, которой нужна форма.', 'A task that needs shape.', 'Zadanie, które potrzebuje formy.', 'Задача, якой патрэбная форма.'], ['Разберёмся в контексте и предложим маршрут, с которого удобно начать.', 'We will understand the context and suggest a clear route to start.', 'Poznamy kontekst i zaproponujemy jasny sposób na start.', 'Разбяромся ў кантэксце і прапануем маршрут, з якога зручна пачаць.'], ['Люди выбирают с доверием.', 'People choose with confidence.', 'Ludzie wybierają z zaufaniem.', 'Людзі выбіраюць з даверам.'], ['Покажем ценность продукта до первого контакта.', 'We show the product’s value before the first contact.', 'Pokażemy wartość produktu przed pierwszym kontaktem.', 'Пакажам каштоўнасць прадукту да першага кантакту.'], ['Клиенты', 'Clients', 'Klienci', 'Кліенты'], ['Выбор становится проще.', 'The choice becomes easier.', 'Wybór staje się prostszy.', 'Выбар становіцца прасцей.'], ['Соединим настроение, аргументы и понятный следующий шаг.', 'We connect mood, reasons and a clear next step.', 'Łączymy emocje, argumenty i jasny kolejny krok.', 'Злучаем настрой, аргументы і зразумелы наступны крок.'], ['Аудитория', 'Audience', 'Odbiorcy', 'Аўдыторыя'], ['Новый продукт начинается уверенно.', 'A new product starts with confidence.', 'Nowy produkt zaczyna się pewnie.', 'Новы прадукт пачынаецца ўпэўнена.'], ['От первого вопроса до сценария, который можно выпускать.', 'From the first question to a flow ready to ship.', 'Od pierwszego pytania do scenariusza gotowego do wdrożenia.', 'Ад першага пытання да сцэнарыя, які можна выпускаць.'], ['Существующее получает новую опору.', 'An existing product gets a new foundation.', 'Istniejący produkt zyskuje nową podstawę.', 'Існуючы прадукт атрымлівае новую апору.'], ['Найдём, что мешает продукту, и аккуратно пересоберём главное.', 'We find what holds the product back and carefully reshape the essentials.', 'Znajdziemy, co przeszkadza produktowi, i spokojnie uporządkujemy to, co najważniejsze.', 'Знойдзем, што перашкаджае прадукту, і акуратна перазбяром галоўнае.'], ['Идея проходит проверку раньше.', 'The idea gets tested earlier.', 'Pomysł przechodzi weryfikację wcześniej.', 'Ідэя праходзіць праверку раней.'], ['Соберём прототип и проверим ключевой сценарий до большой разработки.', 'We will build a prototype and test the key flow before full development.', 'Zbudujemy prototyp i sprawdzimy kluczowy scenariusz przed dużym wdrożeniem.', 'Збяром прататып і праверым ключавы сцэнарый да вялікай распрацоўкі.'], ['Следующая версия становится точнее.', 'The next version becomes more precise.', 'Kolejna wersja staje się celniejsza.', 'Наступная версія становіцца дакладнейшай.'], ['Смотрим на поведение пользователей и развиваем то, что действительно нужно.', 'We watch how people use the product and grow what matters.', 'Obserwujemy zachowania użytkowników i rozwijamy to, co naprawdę potrzebne.', 'Глядзім на паводзіны карыстальнікаў і развіваем тое, што сапраўды патрэбна.'], ['Спокойное ощущение.', 'A calm feeling.', 'Spokojne odczucie.', 'Спакойнае адчуванне.'], ['Паузы, ясная иерархия и форма, которая помогает сосредоточиться.', 'Pauses, clear hierarchy and a form that helps people focus.', 'Pauzy, jasna hierarchia i forma, która pomaga się skupić.', 'Паўзы, ясная іерархія і форма, якая дапамагае засяродзіцца.'], ['Смелое ощущение.', 'A bold feeling.', 'Odważne odczucie.', 'Смелае адчуванне.'], ['Контраст, характер и визуальный жест, который сложно забыть.', 'Contrast, character and a visual gesture that is hard to forget.', 'Kontrast, charakter i gest wizualny, którego trudno zapomnieć.', 'Кантраст, характар і візуальны жэст, які цяжка забыць.'], ['Точное ощущение.', 'A precise feeling.', 'Precyzyjne odczucie.', 'Дакладнае адчуванне.'], ['Каждая деталь отвечает на действие и не спорит с задачей.', 'Every detail answers an action and stays true to the task.', 'Każdy detal odpowiada na działanie i służy zadaniu.', 'Кожная дэталь адказвае на дзеянне і не спрачаецца з задачай.'], ['Живое ощущение.', 'A lively feeling.', 'Żywe odczucie.', 'Жывое адчуванне.'], ['Движение, отклик и пространство для любопытства.', 'Motion, response and room for curiosity.', 'Ruch, reakcja i przestrzeń na ciekawość.', 'Рух, водгук і прастора для цікаўнасці.'], ['Материал', 'Material', 'Materiał', 'Матэрыял'], ['Форма', 'Shape', 'Forma', 'Форма'], ['Скопировать параметры', 'Copy parameters', 'Kopiuj parametry', 'Скапіяваць параметры'], ['Выделите и скопируйте параметры вручную.', 'Select and copy the parameters manually.', 'Zaznacz i skopiuj parametry ręcznie.', 'Вылучыце і скапіруйце параметры ўручную.'], ['Email скопирован.', 'Email copied.', 'Skopiowano e-mail.', 'Email скапіяваны.'], ['Печатная версия', 'Print version', 'Wersja do druku', 'Версія для друку'], ['Поделиться', 'Share', 'Udostępnij', 'Падзяліцца'], ['Ссылку не удалось скопировать.', 'The link could not be copied.', 'Nie udało się skopiować linku.', 'Не ўдалося скапіраваць спасылку.'], ['Прогресс чтения страницы', 'Page reading progress', 'Postęp czytania strony', 'Прагрэс чытання старонкі'], ['Прогресс заполнения брифа', 'Brief completion progress', 'Postęp wypełniania briefu', 'Прагрэс запаўнення брыфа'], ['Ваш контекст', 'Your context', 'Twój kontekst', 'Ваш кантэкст'], ['Ускоренный темп уточним после оценки рисков.', 'We will confirm the accelerated pace after assessing risks.', 'Przyspieszone tempo ustalimy po ocenie ryzyka.', 'Паскораны тэмп удакладнім пасля ацэнкі рызык.'], ['Пока обсуждаем', 'To be discussed', 'Do ustalenia', 'Пакуль абмяркоўваем'], ['До 500 тыс. ₽', 'Up to ₽500k', 'Do 500 tys. ₽', 'Да 500 тыс. ₽'], ['500 тыс. – 1 млн ₽', '₽500k–1m', '500 tys. – 1 mln ₽', '500 тыс. – 1 млн ₽'], ['1–3 млн ₽', '₽1–3m', '1–3 mln ₽', '1–3 млн ₽'], ['Более 3 млн ₽', 'Over ₽3m', 'Ponad 3 mln ₽', 'Больш за 3 млн ₽'],
    ['из', 'of', 'z', 'з'], ['Письмо подготовлено для', 'Email prepared for', 'Wiadomość przygotowana dla', 'Ліст падрыхтаваны для'], ['Если приложение не открылось, скачайте .txt-файл ниже.', 'If the email app did not open, download the .txt file below.', 'Jeśli aplikacja się nie otworzyła, pobierz plik .txt poniżej.', 'Калі паштовая праграма не адкрылася, спампуйце .txt-файл ніжэй.'], ['Скопировать ссылку на выбранный бриф', 'Copy the link to the selected brief', 'Kopiuj link do wybranego briefu', 'Скапіраваць спасылку на выбраны брыф'], ['Закрыть поиск', 'Close search', 'Zamknij wyszukiwanie', 'Закрыць пошук'], ['Поиск по сайту', 'Search the site', 'Wyszukiwanie na stronie', 'Пошук па сайце'], ['Enter — открыть · Esc — закрыть', 'Enter — open · Esc — close', 'Enter — otwórz · Esc — zamknij', 'Enter — адкрыць · Esc — закрыць'],
    ['СТУДИЯ / ONLINE', 'STUDIO / ONLINE', 'STUDIO / ONLINE', 'СТУДЫЯ / ONLINE'], ['Acor Web — главная', 'Acor Web — home', 'Acor Web — strona główna', 'Acor Web — галоўная'], ['Навигация по сайту', 'Site navigation', 'Nawigacja po stronie', 'Навігацыя па сайце'], ['Шаги брифа', 'Brief steps', 'Kroki briefu', 'Крокі брыфа'], ['Следующий шаг', 'Next step', 'Kolejny krok', 'Наступны крок'], ['будет понятен.', 'will be clear.', 'będzie jasny.', 'будзе зразумелы.'], ['Дизайн', 'Design', 'Design', 'Дызайн'], ['Смысл', 'Meaning', 'Sens', 'Сэнс'], ['Движение', 'Motion', 'Ruch', 'Рух'], ['Технологии', 'Technology', 'Technologia', 'Тэхналогіі'], ['Стратегия и аналитика', 'Strategy and research', 'Strategia i analiza', 'Стратэгія і аналітыка'], ['Разбираемся в задаче до первого экрана.', 'We understand the task before the first screen.', 'Rozumiemy zadanie, zanim powstanie pierwszy ekran.', 'Разбіраемся ў задачы да першага экрана.'], ['Проводим интервью, изучаем пользовательские сценарии и собираем требования. Результат — понятная структура продукта и план следующего этапа.', 'We interview people, study user flows and collect requirements. The result is a clear product structure and next-step plan.', 'Prowadzimy wywiady, badamy scenariusze użytkowników i zbieramy wymagania. Rezultat to jasna struktura produktu i plan kolejnego etapu.', 'Праводзім інтэрв’ю, вывучаем карыстальніцкія сцэнарыі і збіраем патрабаванні. Вынік — зразумелая структура прадукту і план наступнага этапу.'], ['Исследование · Продуктовая стратегия · UX-аудит', 'Research · Product strategy · UX audit', 'Badania · Strategia produktu · Audyt UX', 'Даследаванне · Прадуктовая стратэгія · UX-аўдыт'], ['Дизайн и айдентика', 'Design and identity', 'Design i identyfikacja', 'Дызайн і айдэнтыка'], ['Web и mobile', 'Web and mobile', 'Web i mobile', 'Web і mobile'], ['Развитие продукта', 'Product growth', 'Rozwój produktu', 'Развіццё прадукту'], ['НА ВЫХОДЕ', 'OUTPUT', 'NA WYJŚCIU', 'НА ВЫХАДЗЕ'], ['Этапы проекта', 'Project stages', 'Etapy projektu', 'Этапы праекта'], ['мин чтения', 'min read', 'min czytania', 'хв. чытання'], ['≈ 1 мин чтения', '≈ 1 min read', '≈ 1 min czytania', '≈ 1 хв. чытання'], ['Ориентир: 6–10 недель до первой версии.', 'Estimate: 6–10 weeks to the first version.', 'Orientacyjnie: 6–10 tygodni do pierwszej wersji.', 'Арыенцір: 6–10 тыдняў да першай версіі.'], ['Ориентир: 4–8 недель на пересборку главного.', 'Estimate: 4–8 weeks to reshape the essentials.', 'Orientacyjnie: 4–8 tygodni na uporządkowanie kluczowych elementów.', 'Арыенцір: 4–8 тыдняў на перазборку галоўнага.'], ['Ориентир: 2–4 недели на прототип и проверку.', 'Estimate: 2–4 weeks for a prototype and validation.', 'Orientacyjnie: 2–4 tygodnie na prototyp i weryfikację.', 'Арыенцір: 2–4 тыдні на прататып і праверку.'], ['Ориентир: короткие итерации по 2–4 недели.', 'Estimate: short 2–4 week iterations.', 'Orientacyjnie: krótkie iteracje po 2–4 tygodnie.', 'Арыенцір: кароткія ітэрацыі па 2–4 тыдні.'], ['Ориентир: 10–16 недель до первого релиза.', 'Estimate: 10–16 weeks to the first release.', 'Orientacyjnie: 10–16 tygodni do pierwszego wydania.', 'Арыенцір: 10–16 тыдняў да першага рэлізу.'], ['Ориентир: 6–12 недель на обновление ключевых сценариев.', 'Estimate: 6–12 weeks to update key flows.', 'Orientacyjnie: 6–12 tygodni na odświeżenie kluczowych scenariuszy.', 'Арыенцір: 6–12 тыдняў на абнаўленне ключавых сцэнарыяў.'], ['Ориентир: 3–5 недель на кликабельный прототип.', 'Estimate: 3–5 weeks for a clickable prototype.', 'Orientacyjnie: 3–5 tygodni na klikalny prototyp.', 'Арыенцір: 3–5 тыдняў на клікабельны прататып.'], ['Ориентир: спринты развития по 2–4 недели.', 'Estimate: 2–4 week growth sprints.', 'Orientacyjnie: sprinty rozwoju po 2–4 tygodnie.', 'Арыенцір: спрынты развіцця па 2–4 тыдні.'], ['Ориентир: 3–6 недель на базовую систему.', 'Estimate: 3–6 weeks for the base system.', 'Orientacyjnie: 3–6 tygodni na podstawowy system.', 'Арыенцір: 3–6 тыдняў на базавую сістэму.'], ['Ориентир: 2–5 недель на обновление языка.', 'Estimate: 2–5 weeks to refresh the visual language.', 'Orientacyjnie: 2–5 tygodni na odświeżenie języka.', 'Арыенцір: 2–5 тыдняў на абнаўленне мовы.'], ['Ориентир: 1–3 недели на визуальную гипотезу.', 'Estimate: 1–3 weeks for a visual hypothesis.', 'Orientacyjnie: 1–3 tygodnie na hipotezę wizualną.', 'Арыенцір: 1–3 тыдні на візуальную гіпотэзу.'], ['Ориентир: последовательные этапы по 2–3 недели.', 'Estimate: focused stages of 2–3 weeks.', 'Orientacyjnie: kolejne etapy po 2–3 tygodnie.', 'Арыенцір: паслядоўныя этапы па 2–3 тыдні.'], ['Срок зависит от формата — сначала уточним контекст.', 'Timing depends on the format — we will clarify the context first.', 'Termin zależy od formatu — najpierw doprecyzujemy kontekst.', 'Тэрмін залежыць ад фармату — спачатку ўдакладнім кантэкст.'], ['Сначала найдём, что стоит сохранить и пересобрать.', 'First we will find what to keep and reshape.', 'Najpierw ustalimy, co zachować i uporządkować.', 'Спачатку знойдзем, што захаваць і перазбудаваць.'], ['Начнём с небольшого прототипа и проверим идею.', 'We will start with a small prototype and test the idea.', 'Zaczniemy od małego prototypu i sprawdzimy pomysł.', 'Пачнём з невялікага прататыпа і праверым ідэю.'], ['Соберём план развития под ваши ограничения.', 'We will shape a growth plan around your constraints.', 'Ułożymy plan rozwoju pod Twoje ograniczenia.', 'Збяром план развіцця пад вашыя абмежаванні.'],
    ['Студия / online', 'Studio / online', 'Studio / online', 'Студыя / online'], ['Очистить черновик', 'Clear draft', 'Wyczyść wersję roboczą', 'Ачысціць чарнавік'], ['Ссылка скопирована.', 'Link copied.', 'Skopiowano link.', 'Спасылка скапіявана.'],
    ['Направления Acor Web', 'Acor Web directions', 'Kierunki Acor Web', 'Напрамкі Acor Web'], ['Тип будущего проекта', 'Future project type', 'Typ przyszłego projektu', 'Тып будучага прадукту'], ['Обсудить задачу ↗︎', 'Discuss the task ↗︎', 'Omówmy zadanie ↗︎', 'Абмеркаваць задачу ↗︎'], ['Познакомиться с командой', 'Meet the team', 'Poznaj zespół', 'Пазнаёміцца з камандай'], ['На выходе', 'Output', 'Na wyjściu', 'На выхадзе'], ['Посмотреть Arden на весь экран', 'View Arden full screen', 'Zobacz Arden na pełnym ekranie', 'Паглядзець Arden на ўвесь экран'], ['Посмотреть GreenFlow на весь экран', 'View GreenFlow full screen', 'Zobacz GreenFlow na pełnym ekranie', 'Паглядзець GreenFlow на ўвесь экран'], ['Посмотреть Orbit на весь экран', 'View Orbit full screen', 'Zobacz Orbit na pełnym ekranie', 'Паглядзець Orbit на ўвесь экран'], ['Сохранить проект Arden', 'Save Arden project', 'Zapisz projekt Arden', 'Захаваць праект Arden'], ['Сохранить проект GreenFlow', 'Save GreenFlow project', 'Zapisz projekt GreenFlow', 'Захаваць праект GreenFlow'], ['Сохранить проект Orbit', 'Save Orbit project', 'Zapisz projekt Orbit', 'Захаваць праект Orbit'], ['Светлая архитектура Arden с оливковым деревом и отражением в воде', 'Light Arden architecture with olive wood and a water reflection', 'Jasna architektura Arden z oliwnym drewnem i odbiciem wody', 'Светлая архітэктура Arden з аліўкавым дрэвам і адлюстраваннем у вадзе'], ['Ботаническая композиция GreenFlow в оливковых и кремовых тонах', 'Botanical GreenFlow composition in olive and cream tones', 'Botaniczna kompozycja GreenFlow w oliwkowych i kremowych tonach', 'Батанічная кампазіцыя GreenFlow у аліўкавых і крэмавых танах'], ['Архитектура', 'Architecture', 'Architektura', 'Архітэктура'], ['Бренд', 'Brand', 'Marka', 'Брэнд'], ['Fintech', 'Fintech', 'Fintech', 'Fintech'],
    ['Задаём правильные вопросы.', 'We ask the right questions.', 'Zadajemy właściwe pytania.', 'Задаём правільныя пытанні.'], ['Разбираем бизнес, аудиторию и ограничения. Договариваемся о том, что будет результатом.', 'We study the business, audience and constraints, then agree on the outcome.', 'Analizujemy biznes, odbiorców i ograniczenia, a potem ustalamy rezultat.', 'Разбіраем бізнес, аўдыторыю і абмежаванні. Дамаўляемся пра вынік.'], ['Думаем и делаем вместе.', 'We think and make together.', 'Myślimy i tworzymy razem.', 'Думаем і робім разам.'], ['Показываем промежуточные решения, обсуждаем их и двигаемся короткими понятными этапами.', 'We share work in progress, discuss it and move in short, clear stages.', 'Pokazujemy wersje pośrednie, omawiamy je i działamy krótkimi, jasnymi etapami.', 'Паказваем прамежкавыя рашэнні, абмяркоўваем іх і рухаемся кароткімі зразумелымі этапамі.'], ['Доводим до работающего.', 'We bring it to working.', 'Doprowadzamy do działania.', 'Даводзім да працоўнага выніку.'], ['Проверяем продукт, выпускаем и помогаем команде освоить новый инструмент.', 'We test, release and help the team adopt the new tool.', 'Testujemy, wdrażamy i pomagamy zespołowi opanować nowe narzędzie.', 'Правяраем прадукт, выпускаем і дапамагаем камандзе асвоіць новы інструмент.'], ['Формат и состав команды подбираем под задачу. Показываем решения по пути, чтобы важные вопросы не откладывались на финал.', 'We shape the format and team around the task, sharing decisions along the way.', 'Dobieramy format i zespół do zadania, pokazując decyzje po drodze.', 'Падбіраем фармат і склад каманды пад задачу, паказваючы рашэнні па ходу.'], ['Формат', 'Format', 'Format', 'Фармат'], ['От отдельного этапа', 'From one stage', 'Od jednego etapu', 'Ад асобнага этапу'], ['до полного цикла', 'to the full cycle', 'do pełnego cyklu', 'да поўнага цыклу'], ['Подключаемся там, где нужна дополнительная экспертиза, или ведём проект целиком.', 'We join where extra expertise is needed or lead the whole project.', 'Dołączamy tam, gdzie potrzebna jest dodatkowa wiedza, albo prowadzimy cały projekt.', 'Далучаемся там, дзе патрэбная дадатковая экспертыза, або вядзём праект цалкам.'], ['Коммуникация', 'Communication', 'Komunikacja', 'Камунікацыя'], ['Промежуточные версии', 'Work in progress', 'Wersje pośrednie', 'Прамежкавыя версіі'], ['видны команде', 'are visible to the team', 'są widoczne dla zespołu', 'бачныя камандзе'], ['Обсуждаем решения короткими итерациями и фиксируем следующий шаг.', 'We discuss decisions in short iterations and record the next step.', 'Omawiamy decyzje w krótkich iteracjach i zapisujemy kolejny krok.', 'Абмяркоўваем рашэнні кароткімі ітэрацыямі і фіксуем наступны крок.'], ['Среда', 'Tools', 'Środowisko', 'Асяроддзе'], ['Инструменты', 'Tools', 'Narzędzia', 'Інструменты'], ['подбираются под продукт', 'are chosen for the product', 'dobieramy do produktu', 'падбіраюцца пад прадукт'], ['Можно подключить только один этап?', 'Can we start with one stage?', 'Czy możemy zacząć od jednego etapu?', 'Ці можна пачаць толькі з аднаго этапу?'], ['Да. Начинаем с исследования, концепции или разработки — состав команды и объём фиксируем после короткого обсуждения.', 'Yes. We can start with research, concept or development, then define the team and scope together.', 'Tak. Zaczynamy od badań, koncepcji lub wdrożenia, a skład zespołu i zakres ustalamy po krótkiej rozmowie.', 'Так. Пачынаем з даследавання, канцэпцыі або распрацоўкі — склад каманды і аб’ём фіксуем пасля кароткай размовы.'], ['Работаете с готовым дизайном?', 'Can you work with an existing design?', 'Czy pracujecie z gotowym projektem?', 'Працуеце з гатовым дызайнам?'], ['Да. Проверим систему, найдём узкие места и подключимся к реализации или развитию продукта.', 'Yes. We can review the system, find gaps and help implement or grow the product.', 'Tak. Sprawdzimy system, znajdziemy słabe punkty i pomożemy we wdrożeniu lub rozwoju.', 'Так. Праверым сістэму, знойдзем вузкія месцы і далучымся да рэалізацыі або развіцця прадукту.'], ['Как выглядит первый шаг?', 'What does the first step look like?', 'Jak wygląda pierwszy krok?', 'Як выглядае першы крок?'], ['После заявки возвращаемся с уточняющими вопросами и предлагаем ближайший результат, который имеет смысл получить первым.', 'After your brief, we return with questions and suggest the first useful outcome.', 'Po briefie wracamy z pytaniami i proponujemy pierwszy sensowny rezultat.', 'Пасля заяўкі вяртаемся з удакладняльнымі пытаннямі і прапануем першы карысны вынік.'], ['Можно начать без подробного ТЗ?', 'Can we start without a detailed brief?', 'Czy można zacząć bez szczegółowego briefu?', 'Ці можна пачаць без падрабязнага ТЗ?'], ['Можно. В брифе достаточно описать контекст и желаемое изменение — детали соберём вместе.', 'Yes. Describe the context and desired change; we will work out the details together.', 'Tak. Opisz kontekst i oczekiwaną zmianę, a szczegóły ustalimy wspólnie.', 'Можна. У брыфе дастаткова апісаць кантэкст і жаданае змяненне — дэталі збяром разам.'], ['Сайт / стартовый этап', 'Website / starting stage', 'Strona / etap startowy', 'Сайт / стартавы этап'], ['Сайт / полный цикл', 'Website / full cycle', 'Strona / pełny cykl', 'Сайт / поўны цыкл'], ['Сайт / развитие', 'Website / growth', 'Strona / rozwój', 'Сайт / развіццё'], ['Приложение / стартовый этап', 'App / starting stage', 'Aplikacja / etap startowy', 'Праграма / стартавы этап'], ['Приложение / полный цикл', 'App / full cycle', 'Aplikacja / pełny cykl', 'Праграма / поўны цыкл'], ['Приложение / развитие', 'App / growth', 'Aplikacja / rozwój', 'Праграма / развіццё'], ['Визуальная система / стартовый этап', 'Visual system / starting stage', 'System wizualny / etap startowy', 'Візуальная сістэма / стартавы этап'], ['Визуальная система / полный цикл', 'Visual system / full cycle', 'System wizualny / pełny cykl', 'Візуальная сістэма / поўны цыкл'], ['Визуальная система / развитие', 'Visual system / growth', 'System wizualny / rozwój', 'Візуальная сістэма / развіццё'], ['Погружение, структура и визуальная гипотеза.', 'Discovery, structure and a visual hypothesis.', 'Poznanie, struktura i hipoteza wizualna.', 'Пагружэнне, структура і візуальная гіпотэза.'], ['Стратегия, дизайн, разработка и QA в одной команде.', 'Strategy, design, development and QA in one team.', 'Strategia, design, wdrożenie i QA w jednym zespole.', 'Стратэгія, дызайн, распрацоўка і QA ў адной камандзе.'], ['Новые сценарии, аналитика и точечные улучшения.', 'New flows, analytics and focused improvements.', 'Nowe scenariusze, analityka i celne usprawnienia.', 'Новыя сцэнарыі, аналітыка і кропкавыя паляпшэнні.'], ['Карта сценариев, прототип и техническая рамка.', 'Scenario map, prototype and technical frame.', 'Mapa scenariuszy, prototyp i ramy techniczne.', 'Карта сцэнарыяў, прататып і тэхнічная рамка.'], ['Продуктовая логика, iOS / Android, backend и QA.', 'Product logic, iOS / Android, backend and QA.', 'Logika produktu, iOS / Android, backend i QA.', 'Прадуктовая логіка, iOS / Android, backend і QA.'], ['Новые функции, проверка гипотез и выпуск итераций.', 'New features, hypothesis checks and iterative releases.', 'Nowe funkcje, testowanie hipotez i iteracyjne wydania.', 'Новыя функцыі, праверка гіпотэз і ітэрацыйныя рэлізы.'], ['Идея, направление и базовые правила языка.', 'Idea, direction and the basic language rules.', 'Pomysł, kierunek i podstawowe zasady języka.', 'Ідэя, напрамак і базавыя правілы мовы.'], ['Айдентика, интерфейс и motion в единой системе.', 'Identity, interface and motion in one system.', 'Identyfikacja, interfejs i motion w jednym systemie.', 'Айдэнтыка, інтэрфейс і motion у адзінай сістэме.'], ['Масштабирование языка на новые носители и продукты.', 'Scaling the language to new formats and products.', 'Skalowanie języka na nowe nośniki i produkty.', 'Маштабаванне мовы на новыя носьбіты і прадукты.'],
    ['2–3 недели', '2–3 weeks', '2–3 tygodnie', '2–3 тыдні'], ['2–4 недели', '2–4 weeks', '2–4 tygodnie', '2–4 тыдні'], ['3–5 недель', '3–5 weeks', '3–5 tygodni', '3–5 тыдняў'], ['3–6 недель', '3–6 weeks', '3–6 tygodni', '3–6 тыдняў'], ['4–7 недель', '4–7 weeks', '4–7 tygodni', '4–7 тыдняў'], ['5–9 недель', '5–9 weeks', '5–9 tygodni', '5–9 тыдняў'], ['8–14 недель', '8–14 weeks', '8–14 tygodni', '8–14 тыдняў'], ['10–16 недель', '10–16 weeks', '10–16 tygodni', '10–16 тыдняў'], ['12–20 недель', '12–20 weeks', '12–20 tygodni', '12–20 тыдняў'], ['1–3 роли', '1–3 roles', '1–3 osoby', '1–3 ролі'], ['2–3 роли', '2–3 roles', '2–3 osoby', '2–3 ролі'], ['2–4 роли', '2–4 roles', '2–4 osoby', '2–4 ролі'], ['3–4 роли', '3–4 roles', '3–4 osoby', '3–4 ролі'], ['3–5 ролей', '3–5 roles', '3–5 osób', '3–5 роляў'], ['4–6 ролей', '4–6 roles', '4–6 osób', '4–6 роляў'], ['5–8 ролей', '5–8 roles', '5–8 osób', '5–8 роляў'], ['Ускоренный темп уточним после оценки рисков.', 'We will confirm the accelerated pace after assessing risks.', 'Przyspieszone tempo ustalimy po ocenie ryzyka.', 'Паскораны тэмп удакладнім пасля ацэнкі рызык.'],
    ['Объёмная буква A из переплетённых серебристой и кобальтовой лент', 'A sculptural A made from interwoven silver and cobalt ribbons', 'Rzeźbiarska litera A z przeplatających się srebrnych i kobaltowych wstęg', 'Аб’ёмная літара A з пераплеценых срэбнай і кобальтавай стужак'], ['Обзор', 'Overview', 'Przegląd', 'Агляд'], ['Мои счета', 'My accounts', 'Moje konta', 'Мае рахункі'], ['Аналитика', 'Analytics', 'Analityka', 'Аналітыка'], ['Платежи', 'Payments', 'Płatności', 'Плацяжы'], ['Всё под контролем.', 'Everything under control.', 'Wszystko pod kontrolą.', 'Усё пад кантролем.'], ['Ваш финансовый обзор', 'Your financial overview', 'Twój przegląd finansów', 'Ваш фінансавы агляд'], ['Общий баланс', 'Total balance', 'Łączne saldo', 'Агульны баланс'], ['Поступления', 'Income', 'Wpływy', 'Паступленні'], ['Расходы', 'Expenses', 'Wydatki', 'Выдаткі'], ['Свобода в цифрах', 'Freedom in numbers', 'Wolność w liczbach', 'Свабода ў лічбах'], ['Ваши деньги.', 'Your money.', 'Twoje pieniądze.', 'Вашы грошы.'], ['Ваш следующий шаг.', 'Your next step.', 'Twój kolejny krok.', 'Ваш наступны крок.'], ['Смотреть ближе', 'View closer', 'Zobacz bliżej', 'Паглядзець бліжэй'], ['Закрыть просмотр', 'Close viewer', 'Zamknij podgląd', 'Закрыць прагляд'], ['Предыдущий проект', 'Previous project', 'Poprzedni projekt', 'Папярэдні праект'], ['Следующий проект', 'Next project', 'Następny projekt', 'Наступны праект'], ['Подробнее о проекте ↗︎', 'More about the project ↗︎', 'Więcej o projekcie ↗︎', 'Падрабязней пра праект ↗︎'], ['Листайте стрелками или свайпом', 'Use arrows or swipe', 'Użyj strzałek lub przesuń', 'Гартайце стрэлкамі або свайпам'], ['Acor / Концепции', 'Acor / Concepts', 'Acor / Koncepcje', 'Acor / Канцэпцыі'],
    ['Ваш продукт всегда рядом.', 'Your product is always close.', 'Twój produkt zawsze pod ręką.', 'Ваш прадукт заўсёды побач.'], ['Понятные сценарии, нативные жесты и единая логика для iOS и Android.', 'Clear flows, native gestures and one logic for iOS and Android.', 'Jasne scenariusze, natywne gesty i spójna logika dla iOS i Androida.', 'Зразумелыя сцэнарыі, натыўныя жэсты і адзіная логіка для iOS і Android.'], ['Ближе.', 'Closer.', 'Bliżej.', 'Бліжэй.'], ['Каждый день.', 'Every day.', 'Każdego dnia.', 'Кожны дзень.'], ['Обсудить приложение ↗︎', 'Discuss the app ↗︎', 'Omówmy aplikację ↗︎', 'Абмеркаваць праграму ↗︎'], ['Характер, который узнают.', 'A character people recognize.', 'Charakter, który można rozpoznać.', 'Характар, які пазнаюць.'], ['Находим визуальную идею и собираем систему, которая растёт вместе с брендом.', 'We find the visual idea and build a system that grows with the brand.', 'Znajdujemy pomysł wizualny i budujemy system, który rośnie wraz z marką.', 'Знаходзім візуальную ідэю і збіраем сістэму, якая расце разам з брэндам.'], ['Свой взгляд.', 'A point of view.', 'Własne spojrzenie.', 'Свой погляд.'], ['Своя форма.', 'A form of its own.', 'Własna forma.', 'Свая форма.'], ['Обсудить дизайн ↗︎', 'Discuss the design ↗︎', 'Omówmy design ↗︎', 'Абмеркаваць дызайн ↗︎'], ['UX/UI', 'UX/UI', 'UX/UI', 'UX/UI'], ['Арт-директор', 'Art director', 'Dyrektor artystyczny', 'Арт-дырэктар'],
    ['Архитектура · Web', 'Architecture · Web', 'Architektura · Web', 'Архітэктура · Web'], ['E-commerce · Бренд', 'E-commerce · Brand', 'E-commerce · Marka', 'E-commerce · Брэнд'], ['Fintech · Web / Mobile', 'Fintech · Web / Mobile', 'Fintech · Web / Mobile', 'Fintech · Web / Mobile'], ['Архитектура, которую можно почувствовать.', 'Architecture you can feel.', 'Architektura, którą można poczuć.', 'Архітэктура, якую можна адчуць.'], ['Концепт / 2026', 'Concept / 2026', 'Koncepcja / 2026', 'Канцэпт / 2026'],
    ['КОМАНДА / ОТКРЫТЫЕ РОЛИ', 'TEAM / OPEN ROLES', 'ZESPÓŁ / OTWARTE ROLE', 'КАМАНДА / АДКРЫТЫЯ РОЛІ'], ['Команда / открытые роли', 'Team / open roles', 'Zespół / otwarte role', 'Каманда / адкрытыя ролі'], ['Работа, в которой есть место идеям.', 'Work with room for ideas.', 'Praca, w której jest miejsce na pomysły.', 'Праца, у якой ёсць месца ідэям.'], ['Работа, в которой', 'Work with', 'Praca, w której', 'Праца, у якой'], ['есть место идеям.', 'room for ideas.', 'jest miejsce na pomysły.', 'ёсць месца ідэям.'], ['По поводу приема на работу', 'For jobs and internships,', 'W sprawie pracy i stażu', 'Па пытаннях працы і стажыроўкі'], ['и стажировку обращаться:', 'please contact:', 'skontaktuj się z:', 'звяртайцеся:'], ['Приём в команду / демо', 'Join the team / demo', 'Dołącz do zespołu / demo', 'Далучэнне да каманды / дэма'], ['Роли, которым', 'Roles that', 'Role, które', 'Ролі, якім'], ['нужна форма.', 'need shape.', 'potrzebują formy.', 'патрэбная форма.'], ['Три шага до', 'Three steps to', 'Trzy kroki do', 'Тры крокі да'], ['первого дня.', 'your first day.', 'pierwszego dnia.', 'першага дня.'], ['Любопытство —', 'Curiosity is', 'Ciekawość jest', 'Цікаўнасць —'], ['часть работы.', 'part of the work.', 'częścią pracy.', 'частка працы.'], ['Собираем людей, которым интересно думать о продукте целиком: от первого вопроса до ощущения после запуска.', 'We bring together people who think about the whole product, from the first question to the feeling after launch.', 'Łączymy ludzi, którzy myślą o całym produkcie — od pierwszego pytania po doświadczenie po starcie.', 'Збіраем людзей, якім цікава думаць прадукт цалкам: ад першага пытання да адчування пасля запуску.'], ['По поводу приема на работу и стажировку обращаться:', 'For jobs and internships, please contact:', 'W sprawie pracy i stażu skontaktuj się z:', 'Па пытаннях працы і стажыроўкі звяртайцеся:'], ['CONTACT PERSON', 'CONTACT PERSON', 'OSOBA KONTAKTOWA', 'КАНТАКТНАЯ АСОБА'], ['HR / демо-профиль', 'HR / demo profile', 'HR / profil demo', 'HR / дэма-профіль'], ['Контакты вымышлены для прототипа. Перед публикацией замените их на рабочие данные команды.', 'These contacts are fictional for the prototype. Replace them with the team’s real details before publishing.', 'Kontakty są fikcyjne na potrzeby prototypu. Przed publikacją zastąp je prawdziwymi danymi zespołu.', 'Кантакты выдуманыя для прататыпа. Перад публікацыяй замяніце іх на сапраўдныя даныя каманды.'], ['Роли, которым нужна форма.', 'Roles that need shape.', 'Role, które potrzebują formy.', 'Ролі, якім патрэбная форма.'], ['Сейчас это демонстрационный список. Его можно расширить вакансиями и ссылками на подробные описания.', 'This is a demo list for now. Add openings and links to full role descriptions as it grows.', 'To na razie lista demonstracyjna. Możesz dodać oferty i linki do pełnych opisów.', 'Пакуль гэта дэманстрацыйны спіс. Яго можна дапоўніць вакансіямі і спасылкамі на поўныя апісанні.'], ['ДИЗАЙН', 'DESIGN', 'DESIGN', 'ДЫЗАЙН'], ['Разработка', 'Development', 'Development', 'Распрацоўка'], ['Дизайн', 'Design', 'Design', 'Дызайн'], ['Старт', 'Start', 'Start', 'Старт'], ['РАЗРАБОТКА', 'DEVELOPMENT', 'DEVELOPMENT', 'РАСПРАЦОЎКА'], ['СТАРТ', 'START', 'START', 'СТАРТ'], ['Проектирует интерфейсы, задаёт визуальный язык и умеет объяснить решение через задачу пользователя.', 'Designs interfaces, sets the visual language and explains decisions through the user’s task.', 'Projektuje interfejsy, ustala język wizualny i potrafi wyjaśnić decyzję przez pryzmat potrzeb użytkownika.', 'Праектуе інтэрфейсы, задае візуальную мову і ўмее тлумачыць рашэнне праз задачу карыстальніка.'], ['Превращает концепции в быстрые, доступные и аккуратно собранные цифровые продукты.', 'Turns concepts into fast, accessible and carefully built digital products.', 'Zamienia koncepcje w szybkie, dostępne i dopracowane produkty cyfrowe.', 'Ператварае канцэпцыі ў хуткія, даступныя і акуратна сабраныя лічбавыя прадукты.'], ['Стажировка', 'Internship', 'Staż', 'Стажыроўка'], ['Для начинающих дизайнеров, аналитиков и разработчиков. Даём небольшую задачу, наставника и честную обратную связь.', 'For emerging designers, analysts and developers. You get a small task, a mentor and honest feedback.', 'Dla początkujących projektantów, analityków i programistów. Dajemy małe zadanie, mentora i szczerą informację zwrotną.', 'Для пачаткоўцаў у дызайне, аналітыцы і распрацоўцы. Даём невялікую задачу, ментара і шчырую зваротную сувязь.'], ['Узнать о стажировке ↗︎', 'Learn about the internship ↗︎', 'Dowiedz się o stażu ↗︎', 'Даведацца пра стажыроўку ↗︎'], ['Три шага до первого дня.', 'Three steps to your first day.', 'Trzy kroki do pierwszego dnia.', 'Тры крокі да першага дня.'], ['Без длинных тестовых ради тестового. Сначала разговариваем о том, как вы думаете и работаете.', 'No long tests for the sake of tests. We start by talking about how you think and work.', 'Bez długich zadań dla samego zadania. Najpierw rozmawiamy o tym, jak myślisz i pracujesz.', 'Без доўгіх тэставых дзеля тэставых. Спачатку размаўляем пра тое, як вы думаеце і працуеце.'], ['Письмо', 'Message', 'Wiadomość', 'Ліст'], ['Расскажите, чем хотите заниматься, и приложите пару работ или ссылку на профиль.', 'Tell us what you want to work on and share a couple of projects or a profile link.', 'Napisz, czym chcesz się zajmować, i dołącz kilka prac lub link do profilu.', 'Раскажыце, чым хочаце займацца, і дашліце пару работ або спасылку на профіль.'], ['Разговор', 'Conversation', 'Rozmowa', 'Размова'], ['Созваниваемся на 30 минут, обсуждаем опыт, интересы и формат взаимодействия.', 'We talk for 30 minutes about your experience, interests and how we could work together.', 'Rozmawiamy przez 30 minut o doświadczeniu, zainteresowaniach i formie współpracy.', 'Созваньваемся на 30 хвілін, абмяркоўваем досвед, інтарэсы і фармат узаемадзеяння.'], ['Задача', 'Task', 'Zadanie', 'Задача'], ['Показываем небольшой фрагмент реальной работы и вместе решаем, подходим ли друг другу.', 'We share a small piece of real work and decide together if we are a good fit.', 'Pokazujemy mały fragment prawdziwej pracy i wspólnie sprawdzamy, czy do siebie pasujemy.', 'Паказваем невялікі фрагмент рэальнай працы і разам вырашаем, ці падыходзім адно аднаму.'], ['Любопытство — часть работы.', 'Curiosity is part of the work.', 'Ciekawość jest częścią pracy.', 'Цікаўнасць — частка працы.'], ['Можно задавать вопросы, предлагать другой путь и менять мнение, если появились новые данные. Нам важны ясность, уважение к команде и желание доводить детали до результата.', 'Ask questions, suggest another path and change your mind when new data appears. We value clarity, respect for the team and care for details.', 'Możesz zadawać pytania, proponować inną drogę i zmienić zdanie, gdy pojawią się nowe dane. Cenimy jasność, szacunek i doprowadzanie szczegółów do rezultatu.', 'Можна задаваць пытанні, прапаноўваць іншы шлях і мяняць меркаванне, калі з’яўляюцца новыя даныя. Нам важныя яснасць, павага да каманды і жаданне даводзіць дэталі да выніку.'], ['Написать команде ↗︎', 'Write to the team ↗︎', 'Napisz do zespołu ↗︎', 'Напісаць камандзе ↗︎'],
  ];
  const localeMaps = Object.fromEntries(Object.keys(localeInfo).map((locale, index) => [locale, Object.fromEntries(localeRows.map((row) => [row[0], row[index] || row[0]]))]));
  const pageTitles = {
    ru: { 'index.html': 'Дизайн, который обретает форму — Acor Web', 'about.html': 'Студия — Acor Web', 'contact.html': 'Обсудить проект — Acor Web', 'cases.html': 'Проекты — Acor Web', 'services.html': 'Услуги — Acor Web', 'team.html': 'Команда — Acor Web', 'careers.html': 'Карьера — Acor Web', 'lab.html': 'Lab — Acor Web', 'privacy.html': 'Конфиденциальность — Acor Web' },
    en: { 'index.html': 'Design that takes shape — Acor Web', 'about.html': 'Studio — Acor Web', 'contact.html': 'Discuss a project — Acor Web', 'cases.html': 'Projects — Acor Web', 'services.html': 'Services — Acor Web', 'team.html': 'Team — Acor Web', 'careers.html': 'Careers — Acor Web', 'lab.html': 'Lab — Acor Web', 'privacy.html': 'Privacy — Acor Web' },
    pl: { 'index.html': 'Design, który nabiera formy — Acor Web', 'about.html': 'Studio — Acor Web', 'contact.html': 'Omówmy projekt — Acor Web', 'cases.html': 'Projekty — Acor Web', 'services.html': 'Usługi — Acor Web', 'team.html': 'Zespół — Acor Web', 'careers.html': 'Kariera — Acor Web', 'lab.html': 'Lab — Acor Web', 'privacy.html': 'Prywatność — Acor Web' },
    be: { 'index.html': 'Дызайн, які набывае форму — Acor Web', 'about.html': 'Студыя — Acor Web', 'contact.html': 'Абмеркаваць праект — Acor Web', 'cases.html': 'Праекты — Acor Web', 'services.html': 'Паслугі — Acor Web', 'team.html': 'Каманда — Acor Web', 'careers.html': 'Кар’ера — Acor Web', 'lab.html': 'Lab — Acor Web', 'privacy.html': 'Канфідэнцыяльнасць — Acor Web' }
  };
  let activeLocale = 'ru';
  try { if (localeInfo[localStorage.getItem('acor-lang')]) activeLocale = localStorage.getItem('acor-lang'); } catch { /* Locale remains Russian when storage is unavailable. */ }
  const textSources = new WeakMap();
  const attributeSources = new WeakMap();
  const t = (value) => localeMaps[activeLocale][value] || value;
  const pageKey = () => location.pathname.split('/').pop() || 'index.html';
  let languageSelect = null;
  const applyLocale = () => {
    document.documentElement.lang = localeInfo[activeLocale].html;
    const title = pageTitles[activeLocale]?.[pageKey()];
    if (title) document.title = title;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.parentElement?.tagName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach((node) => {
      const original = textSources.get(node) || node.nodeValue.replace(/\s+/g, ' ').trim();
      if (!textSources.has(node)) textSources.set(node, original);
      const translated = t(original);
      if (!translated) return;
      const match = node.nodeValue.match(/^(\s*)([\s\S]*?)(\s*)$/);
      node.nodeValue = `${match?.[1] || ''}${translated}${match?.[3] || ''}`;
    });
    document.querySelectorAll('[placeholder],[aria-label],[title],[alt]').forEach((element) => {
      const attributes = attributeSources.get(element) || {};
      ['placeholder', 'aria-label', 'title', 'alt'].forEach((name) => {
        if (!element.hasAttribute(name)) return;
        if (!(name in attributes)) attributes[name] = element.getAttribute(name);
        const value = attributes[name];
        if (value && localeMaps[activeLocale][value]) element.setAttribute(name, t(value));
      });
      attributeSources.set(element, attributes);
    });
    if (languageSelect) languageSelect.value = activeLocale;
    window.dispatchEvent(new CustomEvent('acor:locale-change', { detail: { locale: activeLocale } }));
  };
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let motionDisabled = reducedMotion.matches;
  let savedMotion = null;
  try { savedMotion = sessionStorage.getItem('acor-motion'); } catch { /* Storage may be unavailable in private contexts. */ }
  if (savedMotion === 'off') motionDisabled = true;
  const motionButton = document.querySelector('.motion-toggle');
  const cursor = document.querySelector('.cursor-caption');
  const syncMotion = () => {
    document.body.classList.toggle('motion-off', motionDisabled);
    motionButton?.setAttribute('aria-pressed', String(motionDisabled));
    if (motionButton) motionButton.innerHTML = `${t('Анимация')}: ${motionDisabled ? t('выкл') : t('вкл')} <span aria-hidden="true">◉</span>`;
    if (motionDisabled) cursor?.classList.remove('visible');
  };
  syncMotion();
  motionButton?.addEventListener('click', () => {
    motionDisabled = !motionDisabled;
    savedMotion = motionDisabled ? 'off' : 'on';
    try { sessionStorage.setItem('acor-motion', savedMotion); } catch { /* The control still works without storage. */ }
    syncMotion();
  });
  reducedMotion.addEventListener('change', (event) => {
    motionDisabled = event.matches || savedMotion === 'off';
    syncMotion();
  });

  // A quiet light/night mode gives the studio a second atmosphere without
  // changing the composition or asking the user to leave the page.
  const themeHeader = document.querySelector('.site-header');
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('acor-theme'); } catch { /* Storage may be unavailable. */ }
  let theme = savedTheme === 'night' ? 'night' : 'light';
  const themeButton = themeHeader?.querySelector('.theme-toggle') || document.createElement('button');
  themeButton.type = 'button';
  themeButton.className = 'theme-toggle';
  themeButton.setAttribute('aria-label', 'Переключить цветовую тему');
  themeButton.setAttribute('aria-pressed', String(theme === 'night'));
  themeButton.dataset.analytics = 'theme_toggle';
  if (!themeButton.parentElement && themeHeader) themeHeader.querySelector('.menu-toggle')?.insertAdjacentElement('beforebegin', themeButton);
  languageSelect = themeHeader?.querySelector('.language-select') || document.createElement('select');
  languageSelect.className = 'language-select';
  languageSelect.setAttribute('aria-label', 'Язык сайта');
  languageSelect.dataset.analytics = 'language_change';
  if (!languageSelect.options.length) Object.entries(localeInfo).forEach(([locale, info]) => {
    const option = document.createElement('option');
    option.value = locale;
    option.textContent = info.short;
    option.title = info.label;
    languageSelect.append(option);
  });
  if (!languageSelect.parentElement && themeHeader) themeButton.insertAdjacentElement('beforebegin', languageSelect);
  languageSelect.addEventListener('change', () => {
    if (!localeInfo[languageSelect.value]) return;
    activeLocale = languageSelect.value;
    try { localStorage.setItem('acor-lang', activeLocale); } catch { /* The selector still works for this page. */ }
    applyLocale();
  });
  if (themeHeader && !themeHeader.querySelector('.header-signal')) {
    const signal = document.createElement('span');
    signal.className = 'header-signal';
    signal.innerHTML = '<i aria-hidden="true"></i><span>Студия / online</span>';
    themeHeader.querySelector('.brand')?.insertAdjacentElement('afterend', signal);
  }
  const syncTheme = () => {
    document.body.classList.toggle('theme-night', theme === 'night');
    themeButton.setAttribute('aria-pressed', String(theme === 'night'));
    themeButton.innerHTML = `<span class="theme-toggle-label">${theme === 'night' ? t('Тёмная') : t('Светлая')}</span><span aria-hidden="true">${theme === 'night' ? '☾' : '◐'}</span>`;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'night' ? '#15181d' : '#f3f4f1');
  };
  syncTheme();
  themeButton.addEventListener('click', () => {
    theme = theme === 'night' ? 'light' : 'night';
    try { localStorage.setItem('acor-theme', theme); } catch { /* The control still works without storage. */ }
    syncTheme();
  });
  window.addEventListener('acor:locale-change', () => {
    syncMotion();
    syncTheme();
  });

  // Local event hooks make the prototype ready for analytics without sending
  // any data off-device. A future integration can subscribe to this event.
  const studioEvents = [];
  const trackStudioEvent = (name, detail = {}) => {
    const event = { name, detail, at: new Date().toISOString() };
    studioEvents.push(event);
    if (studioEvents.length > 40) studioEvents.shift();
    window.dispatchEvent(new CustomEvent('acor:interaction', { detail: event }));
  };
  window.acorStudioEvents = studioEvents;
  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-analytics]');
    if (target) trackStudioEvent(target.dataset.analytics, { label: target.textContent.trim().slice(0, 80) });
  }, { passive: true });

  const emailLink = document.querySelector('.email-link');
  if (emailLink && !emailLink.parentElement.querySelector('.copy-email')) {
    const copyEmail = document.createElement('button');
    copyEmail.type = 'button';
    copyEmail.className = 'copy-email';
    copyEmail.textContent = 'Скопировать email';
    const copyStatus = document.createElement('span');
    copyStatus.className = 'copy-email-status';
    copyStatus.setAttribute('role', 'status');
    copyEmail.addEventListener('click', async () => {
      const email = emailLink.textContent.replace(/\s*↗︎\s*$/, '').trim();
      try {
        await navigator.clipboard.writeText(email);
        copyStatus.textContent = t('Email скопирован.');
      } catch {
        copyStatus.textContent = email;
      }
      setTimeout(() => { copyStatus.textContent = ''; }, 2600);
    });
    emailLink.parentElement.append(copyEmail, copyStatus);
  }

  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const setMenu = (open, restoreFocus = false) => {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? t('Закрыть меню') : t('Открыть меню'));
    mobileNav.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    if (open) requestAnimationFrame(() => mobileNav.querySelector('a')?.focus());
    else if (restoreFocus) menuButton.focus();
  };
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileNav?.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (event) => {
    if (menuButton?.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setMenu(false, true);
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = Array.from(mobileNav.querySelectorAll('a')).filter((element) => !element.hidden);
    if (!focusable.length) return;
    const current = focusable.indexOf(document.activeElement);
    const next = event.shiftKey
      ? (current <= 0 ? focusable.length - 1 : current - 1)
      : (current === focusable.length - 1 ? 0 : current + 1);
    if (current === -1 || event.shiftKey && current === 0 || !event.shiftKey && current === focusable.length - 1) {
      event.preventDefault();
      focusable[next].focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (menuButton?.getAttribute('aria-expanded') === 'true' && !event.target.closest('.site-header')) setMenu(false);
  });
  window.matchMedia('(min-width: 801px)').addEventListener('change', (event) => { if (event.matches) setMenu(false); });

  // Event-driven transforms: no permanent animation loop and no scroll interception.
  const art = document.querySelector('[data-parallax]');
  const hero = document.querySelector('.hero');
  let frame = null;
  if (art && hero) {
    hero.addEventListener('pointermove', (event) => {
      if (motionDisabled || !finePointer.matches) return;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        art.style.setProperty('--mx', `${x * 20}px`);
        art.style.setProperty('--my', `${y * 14}px`);
        art.style.setProperty('--mr', `${x * 3}deg`);
      });
    });
    hero.addEventListener('pointerleave', () => {
      if (frame) cancelAnimationFrame(frame);
      art.style.setProperty('--mx', '0px'); art.style.setProperty('--my', '0px'); art.style.setProperty('--mr', '0deg');
    });
    const heroLink = hero.querySelector('.round-link');
    heroLink?.addEventListener('pointerenter', () => hero.classList.add('hero-intent'));
    heroLink?.addEventListener('pointerleave', () => hero.classList.remove('hero-intent'));
    heroLink?.addEventListener('focus', () => hero.classList.add('hero-intent'));
    heroLink?.addEventListener('blur', () => hero.classList.remove('hero-intent'));
  }
  if (finePointer.matches) {
    document.querySelectorAll('.round-link, .dark-button, .light-button, .footer-contact').forEach((target) => {
      target.classList.add('magnetic');
      target.addEventListener('pointermove', (event) => {
        if (motionDisabled) return;
        const rect = target.getBoundingClientRect();
        const x = (event.clientX - (rect.left + rect.width / 2)) / Math.max(1, rect.width);
        const y = (event.clientY - (rect.top + rect.height / 2)) / Math.max(1, rect.height);
        target.style.setProperty('--mag-x', `${x * 8}px`);
        target.style.setProperty('--mag-y', `${y * 6}px`);
      });
      target.addEventListener('pointerleave', () => {
        target.style.setProperty('--mag-x', '0px');
        target.style.setProperty('--mag-y', '0px');
      });
    });
    document.addEventListener('pointermove', (event) => {
      if (motionDisabled) return;
      document.body.style.setProperty('--spot-x', `${event.clientX}px`);
      document.body.style.setProperty('--spot-y', `${event.clientY}px`);
    }, { passive: true });
  }
  const animatedElements = document.querySelectorAll('[data-reveal], .project, .process-grid article, .role-card, .person-card, .insight-card, .after-brief-grid article, .case-info-grid article, .case-timeline li');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (!motionDisabled) entry.target.classList.add('seen');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    animatedElements.forEach((element) => observer.observe(element));
  }
  document.querySelectorAll('[data-cursor]').forEach((link) => {
    link.addEventListener('pointermove', (event) => {
      if (!cursor || motionDisabled || !finePointer.matches) return;
      cursor.textContent = link.dataset.cursor;
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.classList.add('visible');
    });
    link.addEventListener('pointerleave', () => cursor?.classList.remove('visible'));
  });
  window.addEventListener('scroll', () => cursor?.classList.remove('visible'), { passive: true });

  // Native disclosures keep their keyboard and no-script behaviour.
  const disclosures = document.querySelectorAll('.service-item');
  disclosures.forEach((item) => item.addEventListener('toggle', () => {
    if (item.open) disclosures.forEach((other) => { if (other !== item) other.open = false; });
  }));

  // Animate the actual details height so the first open does not jump the layout.
  // The summary click remains keyboard accessible; without JavaScript, native details still work.
  const smoothDisclosures = document.querySelectorAll('.service-item, .insight-card, .faq-list details');
  smoothDisclosures.forEach((details) => {
    const summary = details.querySelector('summary');
    if (!summary) return;
    let animating = false;
    let finishTimer = 0;
    let afterFinish = null;
    const closedHeight = () => {
      const computed = getComputedStyle(details);
      const padding = parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom);
      const borders = parseFloat(computed.borderTopWidth) + parseFloat(computed.borderBottomWidth);
      return Math.ceil(summary.getBoundingClientRect().height + padding + borders);
    };
    const finish = (event) => {
      if (event?.propertyName && event.propertyName !== 'height') return;
      window.clearTimeout(finishTimer);
      const callback = afterFinish;
      afterFinish = null;
      callback?.();
      details.classList.remove('disclosure-height-animating');
      details.style.removeProperty('height');
      details.style.removeProperty('overflow');
      animating = false;
    };
    details.addEventListener('transitionend', finish);
    const animateOpen = () => {
      if (details.open || animating) return;
      if (motionDisabled || reducedMotion.matches) {
        details.open = true;
        return;
      }
      animating = true;
      details.open = true;
      details.classList.add('disclosure-height-animating');
      details.style.height = `${closedHeight()}px`;
      void details.offsetHeight;
      requestAnimationFrame(() => {
        details.style.height = `${details.scrollHeight}px`;
        finishTimer = window.setTimeout(() => finish(), 700);
      });
    };
    const animateClose = () => {
      if (!details.open || animating) return;
      if (motionDisabled || reducedMotion.matches) {
        details.open = false;
        return;
      }
      animating = true;
      details.classList.add('disclosure-height-animating');
      details.style.height = `${details.offsetHeight}px`;
      details.style.overflow = 'hidden';
      void details.offsetHeight;
      afterFinish = () => { details.open = false; };
      requestAnimationFrame(() => {
        details.style.height = `${closedHeight()}px`;
        finishTimer = window.setTimeout(() => finish(), 700);
      });
    };
    summary.addEventListener('click', (event) => {
      event.preventDefault();
      if (animating) return;
      if (details.open) animateClose();
      else animateOpen();
    });
  });

  const estimateType = document.querySelector('#estimate-type');
  const estimateScope = document.querySelector('#estimate-scope');
  const estimatePace = document.querySelector('#estimate-pace');
  const estimateTitle = document.querySelector('#estimate-title');
  const estimateCopy = document.querySelector('#estimate-copy');
  const estimateWeeks = document.querySelector('#estimate-weeks');
  const estimateTeam = document.querySelector('#estimate-team');
  const estimateCta = document.querySelector('#estimate-cta');
  if (estimateType && estimateScope && estimatePace) {
    const estimates = {
      web: { start: ['Сайт / стартовый этап', 'Погружение, структура и визуальная гипотеза.', '3–5 недель', '2–3 роли'], full: ['Сайт / полный цикл', 'Стратегия, дизайн, разработка и QA в одной команде.', '8–14 недель', '4–6 ролей'], support: ['Сайт / развитие', 'Новые сценарии, аналитика и точечные улучшения.', '2–4 недели', '2–4 роли'] },
      app: { start: ['Приложение / стартовый этап', 'Карта сценариев, прототип и техническая рамка.', '4–7 недель', '3–4 роли'], full: ['Приложение / полный цикл', 'Продуктовая логика, iOS / Android, backend и QA.', '12–20 недель', '5–8 ролей'], support: ['Приложение / развитие', 'Новые функции, проверка гипотез и выпуск итераций.', '3–6 недель', '3–5 ролей'] },
      design: { start: ['Визуальная система / стартовый этап', 'Идея, направление и базовые правила языка.', '2–4 недели', '1–3 роли'], full: ['Визуальная система / полный цикл', 'Айдентика, интерфейс и motion в единой системе.', '5–9 недель', '2–4 роли'], support: ['Визуальная система / развитие', 'Масштабирование языка на новые носители и продукты.', '2–4 недели', '1–3 роли'] }
    };
    const syncEstimate = () => {
      const current = estimates[estimateType.value][estimateScope.value];
      const pace = estimatePace.value === 'fast' ? ' Ускоренный темп уточним после оценки рисков.' : '';
      estimateTitle.textContent = current[0];
      estimateCopy.textContent = current[1] + pace;
      estimateWeeks.textContent = current[2];
      estimateTeam.textContent = current[3];
      estimateCta.href = `contact.html?type=${estimateType.value}`;
    };
    [estimateType, estimateScope, estimatePace].forEach((control) => control.addEventListener('change', syncEstimate));
    window.addEventListener('acor:locale-change', syncEstimate);
    syncEstimate();
  }

  const filters = document.querySelectorAll('[data-filter]');
  const projects = document.querySelectorAll('[data-category]');
  const applyProjectFilter = (filter, { updateUrl = true } = {}) => {
    filters.forEach((button) => {
      const active = button === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    projects.forEach((project) => {
      const visible = filter.dataset.filter === 'all' || project.dataset.category === filter.dataset.filter;
      project.hidden = !visible;
      if (visible) count++;
    });
    const status = document.querySelector('#filter-status');
    if (status) status.textContent = `Показано проектов: ${count}`;
    if (updateUrl && filter.dataset.filter !== 'all') {
      const url = new URL(location.href);
      url.searchParams.set('category', filter.dataset.filter);
      history.replaceState(null, '', url);
    } else if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.delete('category');
      history.replaceState(null, '', url);
    }
  };
  filters.forEach((filter) => filter.addEventListener('click', () => applyProjectFilter(filter)));
  const initialCategory = new URLSearchParams(location.search).get('category');
  const initialFilter = Array.from(filters).find((filter) => filter.dataset.filter === initialCategory);
  if (initialFilter) applyProjectFilter(initialFilter, { updateUrl: false });

  const projectGrid = document.querySelector('.project-grid');
  const projectViewButtons = document.querySelectorAll('[data-project-view]');
  const projectSortButtons = document.querySelectorAll('[data-project-sort]');
  const savedProjectsStatus = document.querySelector('#saved-projects');
  const projectOrder = Array.from(projects);
  const projectNames = new Map(projectOrder.map((project) => [project, project.querySelector('h3')?.textContent.trim() || 'Проект']));
  let projectView = 'grid';
  let projectSort = 'curated';
  let savedProjects = [];
  try {
    projectView = localStorage.getItem('acor-project-view') === 'list' ? 'list' : 'grid';
    projectSort = localStorage.getItem('acor-project-sort') === 'alphabetical' ? 'alphabetical' : 'curated';
    savedProjects = JSON.parse(localStorage.getItem('acor-project-favorites') || '[]');
    if (!Array.isArray(savedProjects)) savedProjects = [];
  } catch { /* Preferences remain session-local when storage is unavailable. */ }
  const syncProjectTools = () => {
    projectGrid?.classList.toggle('is-list-view', projectView === 'list');
    projectViewButtons.forEach((button) => {
      const selected = button.dataset.projectView === projectView;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    projectSortButtons.forEach((button) => {
      const selected = button.dataset.projectSort === projectSort;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    if (savedProjectsStatus) savedProjectsStatus.textContent = savedProjects.length ? `Сохранено проектов: ${savedProjects.length}` : '';
  };
  const syncProjectUrl = () => {
    if (!projectGrid) return;
    const url = new URL(location.href);
    if (projectView === 'list') url.searchParams.set('view', 'list'); else url.searchParams.delete('view');
    if (projectSort === 'alphabetical') url.searchParams.set('sort', 'name'); else url.searchParams.delete('sort');
    history.replaceState(null, '', url);
  };
  const sortProjects = () => {
    if (!projectGrid) return;
    const order = projectSort === 'alphabetical'
      ? Array.from(projects).sort((a, b) => projectNames.get(a).localeCompare(projectNames.get(b), 'ru'))
      : projectOrder;
    order.forEach((project) => projectGrid.append(project));
  };
  projects.forEach((project) => {
    const projectName = projectNames.get(project);
    const save = document.createElement('button');
    save.type = 'button';
    save.className = 'project-save';
    save.dataset.analytics = 'project_save';
    save.setAttribute('aria-label', `Сохранить проект ${projectName}`);
    save.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      savedProjects = savedProjects.includes(projectName) ? savedProjects.filter((name) => name !== projectName) : [...savedProjects, projectName];
      save.classList.toggle('is-saved', savedProjects.includes(projectName));
      save.setAttribute('aria-pressed', String(savedProjects.includes(projectName)));
      save.textContent = savedProjects.includes(projectName) ? '★' : '☆';
      try { localStorage.setItem('acor-project-favorites', JSON.stringify(savedProjects)); } catch { /* Saving still works for the current page. */ }
      syncProjectTools();
    });
    save.setAttribute('aria-pressed', String(savedProjects.includes(projectName)));
    save.classList.toggle('is-saved', savedProjects.includes(projectName));
    save.textContent = savedProjects.includes(projectName) ? '★' : '☆';
    project.append(save);
  });
  projectViewButtons.forEach((button) => button.addEventListener('click', () => {
    button.dataset.analytics = `project_view_${button.dataset.projectView}`;
    projectView = button.dataset.projectView;
    try { localStorage.setItem('acor-project-view', projectView); } catch { /* The control still works without storage. */ }
    syncProjectTools(); syncProjectUrl();
  }));
  projectSortButtons.forEach((button) => button.addEventListener('click', () => {
    button.dataset.analytics = `project_sort_${button.dataset.projectSort}`;
    projectSort = button.dataset.projectSort;
    sortProjects();
    try { localStorage.setItem('acor-project-sort', projectSort); } catch { /* The control still works without storage. */ }
    syncProjectTools(); syncProjectUrl();
  }));
  const projectParams = new URLSearchParams(location.search);
  if (projectParams.get('view') === 'list') projectView = 'list';
  if (projectParams.get('sort') === 'name') projectSort = 'alphabetical';
  sortProjects(); syncProjectTools();

  const rotation = document.querySelector('#lab-rotation');
  const scale = document.querySelector('#lab-scale');
  const labObject = document.querySelector('#lab-object');
  const updateLab = () => {
    if (!rotation || !scale || !labObject) return;
    labObject.style.setProperty('--angle', `${rotation.value}deg`);
    labObject.style.setProperty('--scale', String(Number(scale.value) / 100));
    document.querySelector('#lab-angle').value = `${rotation.value}°`;
    document.querySelector('#lab-size').value = `${scale.value}%`;
  };
  rotation?.addEventListener('input', updateLab);
  scale?.addEventListener('input', updateLab);
  document.querySelector('#lab-reset')?.addEventListener('click', () => {
    rotation.value = '0'; scale.value = '90'; updateLab();
  });
  const labArt = document.querySelector('.lab-art');
  const labControls = document.querySelector('.lab-controls');
  if (labArt && labControls && rotation && scale) {
    const createLabSet = (label, name, options) => {
      const set = document.createElement('div');
      set.className = 'lab-preset-set';
      set.setAttribute('role', 'group');
      set.setAttribute('aria-label', label);
      const caption = document.createElement('span');
      caption.className = 'lab-preset-label';
      caption.textContent = label;
      set.append(caption);
      options.forEach(([value, text]) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'lab-preset';
        button.dataset.labChoice = value;
        button.textContent = text;
        button.setAttribute('aria-pressed', String(value === options[0][0]));
        button.addEventListener('click', () => {
          set.querySelectorAll('.lab-preset').forEach((option) => option.setAttribute('aria-pressed', String(option === button)));
          labArt.dataset[name] = value;
        });
        set.append(button);
      });
      return set;
    };
    labArt.dataset.material = 'chrome';
    labArt.dataset.shape = 'ribbon';
    labArt.dataset.palette = 'studio';
    labControls.append(createLabSet('Материал', 'material', [['chrome', 'Chrome'], ['cobalt', 'Cobalt'], ['paper', 'Paper']]));
    labControls.append(createLabSet('Форма', 'shape', [['ribbon', 'Ribbon'], ['orb', 'Orb'], ['letter', 'Letter']]));
    const copyButton = document.createElement('button');
    copyButton.type = 'button';
    copyButton.className = 'pill-button lab-copy';
    copyButton.textContent = 'Скопировать параметры';
    const copyStatus = document.createElement('span');
    copyStatus.className = 'lab-copy-status';
    copyStatus.setAttribute('role', 'status');
    const copyParams = async () => {
      const value = `Acor Lab — ${labArt.dataset.material}, ${labArt.dataset.shape}, ${labArt.dataset.palette || 'studio'}, поворот ${rotation.value}°, масштаб ${scale.value}%`;
      try {
        await navigator.clipboard.writeText(value);
        copyStatus.textContent = t('Параметры скопированы.');
      } catch {
        copyStatus.textContent = t('Выделите и скопируйте параметры вручную.');
        copyStatus.dataset.value = value;
      }
    };
    copyButton.addEventListener('click', copyParams);
    labControls.append(copyButton, copyStatus);
    document.querySelector('#lab-reset')?.addEventListener('click', () => {
      labArt.dataset.material = 'chrome';
      labArt.dataset.shape = 'ribbon';
      labControls.querySelectorAll('.lab-preset-set').forEach((set) => set.querySelector('.lab-preset')?.click());
      copyStatus.textContent = '';
    });
  }

  const form = document.querySelector('#brief-form');
  if (form) {
    const typeLabels = { web: 'Сайт', app: 'Приложение', design: 'Дизайн', other: 'Другое' };
    const budgetLabels = { undecided: 'Пока обсуждаем', 'under-500': 'До 500 тыс. ₽', '500-1000': '500 тыс. – 1 млн ₽', '1-3m': '1–3 млн ₽', 'over-3m': 'Более 3 млн ₽' };
    const draftKey = 'acor-brief-draft';
    const draftFields = ['name', 'company', 'email', 'type', 'message', 'budget', 'timing'];
    let restoredDraft = false;
    try {
      const draft = JSON.parse(sessionStorage.getItem(draftKey) || 'null');
      if (draft && typeof draft === 'object') {
        draftFields.forEach((name) => {
          const value = draft[name];
          if (!value) return;
          const restoredValue = name === 'budget' ? (budgetLabels[value] || value) : value;
          const fields = Array.from(form.elements).filter((field) => field.name === name);
          if (fields[0]?.type === 'radio') fields.forEach((field) => { field.checked = field.value === restoredValue; });
          else if (fields[0]) fields[0].value = restoredValue;
          restoredDraft = true;
        });
      }
    } catch { /* A private browsing context can reject sessionStorage. */ }
    const saveDraft = () => {
      const draft = {};
      draftFields.forEach((name) => {
        const radio = form.querySelector(`input[type="radio"][name="${name}"]`);
        const field = form.elements[name];
        if (radio) draft[name] = form.querySelector(`input[name="${name}"]:checked`)?.value || '';
        else if (field) draft[name] = field.value;
      });
      try { sessionStorage.setItem(draftKey, JSON.stringify(draft)); } catch { /* The form still works without storage. */ }
    };
    form.addEventListener('input', saveDraft);
    const clearDraft = document.createElement('button');
    clearDraft.type = 'button';
    clearDraft.className = 'pill-button clear-draft';
    clearDraft.dataset.analytics = 'brief_clear';
    clearDraft.textContent = 'Очистить черновик';
    clearDraft.addEventListener('click', () => {
      form.reset();
      try { sessionStorage.removeItem(draftKey); } catch { /* The form still resets locally. */ }
      const status = document.querySelector('#form-status');
      if (status) status.textContent = t('Черновик очищен.');
    });
    form.querySelector('.form-actions')?.append(clearDraft);
    if (restoredDraft) {
      const status = document.querySelector('#form-status');
      if (status) status.textContent = t('Черновик восстановлен из этой сессии.');
    }
    const initialType = new URLSearchParams(location.search).get('type');
    if (Object.hasOwn(typeLabels, initialType)) {
      const choice = Array.from(form.elements.type).find((input) => input.value === initialType);
      if (choice) choice.checked = true;
    }
    const collectBrief = () => {
      const data = new FormData(form);
      const project = typeLabels[data.get('type')] || 'Другое';
      return {
        data,
        project,
        text: [
        'ACOR WEB — БРИФ ПРОЕКТА', '',
        `Имя: ${data.get('name')}`, `Компания: ${data.get('company') || 'Не указана'}`,
        `Email: ${data.get('email')}`, `Проект: ${project}`,
        `Бюджет: ${budgetLabels[data.get('budget')] || data.get('budget') || 'Пока обсуждаем'}`, `Сроки: ${data.get('timing') || 'Обсудим'}`,
        '', 'ЗАДАЧА', String(data.get('message')), '',
        'Письмо подготовлено на сайте Acor Web.'
        ].join('\n')
      };
    };
    const downloadBrief = () => {
      const { text } = collectBrief();
      const blob = new Blob(['\ufeff', text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const download = document.createElement('a');
      download.href = url; download.download = 'acor-project-brief.txt';
      document.body.append(download); download.click(); download.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      document.querySelector('#form-status').textContent = t('Бриф скачан. Его можно прикрепить к письму или сохранить для себя.');
    };
    document.querySelector('#download-brief')?.addEventListener('click', () => {
      if (form.reportValidity()) downloadBrief();
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const { data, project, text } = collectBrief();
      const subject = encodeURIComponent(`Новый проект Acor Web — ${project}`);
      const body = encodeURIComponent(text);
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;
      document.querySelector('#form-status').textContent = t('Открываем почтовое приложение…');
      window.location.href = `mailto:hello@acorweb.ru?subject=${subject}&body=${body}`;
      window.setTimeout(() => {
        if (submitButton) submitButton.disabled = false;
        document.querySelector('#form-status').textContent = `${t('Письмо подготовлено для')} ${data.get('email')}. ${t('Если приложение не открылось, скачайте .txt-файл ниже.')}`;
      }, 900);
    });
  }
  // Ambient CSS motion runs only while the relevant artwork is in view.
  if ('IntersectionObserver' in window) {
    const motionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('motion-in-view', entry.isIntersecting));
    });
    document.querySelectorAll('.hero, .team-art').forEach((element) => motionObserver.observe(element));
  }
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.reading-progress');
  progress?.removeAttribute('aria-hidden');
  progress?.setAttribute('role', 'progressbar');
    progress?.setAttribute('aria-label', 'Прогресс чтения страницы');
  const connectionStatus = document.createElement('div');
  connectionStatus.className = 'connection-status';
  connectionStatus.setAttribute('role', 'status');
  connectionStatus.hidden = true;
  document.body.append(connectionStatus);
  const syncConnection = () => {
    connectionStatus.hidden = navigator.onLine;
    connectionStatus.textContent = navigator.onLine ? '' : t('Офлайн-режим: сохранённые материалы доступны, формы можно заполнить позже.');
  };
  window.addEventListener('online', syncConnection);
  window.addEventListener('offline', syncConnection);
  window.addEventListener('acor:locale-change', syncConnection);
  syncConnection();
  const chapterDock = document.querySelector('.chapter-dock');
  const chapters = Array.from(document.querySelectorAll('[data-chapter]'));
  const footer = document.querySelector('.site-footer');
  let scrollFrame = null;
  const updateScroll = () => {
    scrollFrame = null;
    const distance = document.documentElement.scrollHeight - innerHeight;
    progress?.style.setProperty('--reading', String(distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0));
    progress?.setAttribute('aria-valuenow', String(Math.round((distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0) * 100)));
    header?.classList.toggle('is-scrolled', scrollY > 20);
    if (chapterDock) {
      const focused = chapterDock.contains(document.activeElement);
      chapterDock.hidden = !focused && ((hero?.getBoundingClientRect().bottom ?? 0) > 100 || (footer?.getBoundingClientRect().top ?? Infinity) < innerHeight);
      let current = chapters[0];
      chapters.forEach((link) => {
        if (document.getElementById(link.dataset.chapter).getBoundingClientRect().top < innerHeight * .4) current = link;
      });
      chapters.forEach((link) => {
        if (link === current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
    if (hero && !motionDisabled && finePointer.matches && hero.getBoundingClientRect().bottom > 0) {
      hero.style.setProperty('--scroll-art', `${-Math.min(scrollY * .09, 60)}px`);
      hero.style.setProperty('--scroll-copy', `${Math.min(scrollY * .035, 20)}px`);
    }
  };
  window.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  }, { passive: true });
  window.addEventListener('resize', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  });
  chapterDock?.querySelector('.dock-top').addEventListener('click', () => {
    document.querySelector('.brand')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  });
  chapterDock?.addEventListener('focusout', () => requestAnimationFrame(updateScroll));
  updateScroll();

  const people = Array.from(document.querySelectorAll('.person-card'));
  const teamFilters = document.querySelectorAll('[data-team-filter]');
  const teamTrackFilters = document.querySelectorAll('[data-team-track]');
  const teamSearch = document.querySelector('#team-search');
  const teamParams = new URLSearchParams(location.search);
  let teamCategory = teamParams.get('group') || 'all';
  let teamTrack = teamParams.get('track') || 'all';
  const trackGroups = { research: ['analysis'], design: ['design'], build: ['frontend', 'backend', 'mobile'], quality: ['qa'], direction: ['management'] };
  if (teamSearch && teamParams.get('q')) teamSearch.value = teamParams.get('q');
  const normalize = (value) => value.toLocaleLowerCase('ru').replaceAll('ё', 'е').trim();
  const filterPeople = () => {
    const query = normalize(teamSearch?.value || '');
    let found = 0;
    people.forEach((card) => {
      const person = card.querySelector('[data-person]');
      const matchesGroup = teamCategory === 'all' || card.dataset.personGroup === teamCategory;
      const matchesTrack = teamTrack === 'all' || (trackGroups[teamTrack] || []).includes(card.dataset.personGroup);
      const matchesText = normalize(`${person.dataset.name} ${person.dataset.role} ${person.dataset.skills}`).includes(query);
      card.hidden = !(matchesGroup && matchesTrack && matchesText);
      if (!card.hidden) found++;
    });
    document.querySelectorAll('[data-team-group]').forEach((group) => {
      group.hidden = !Array.from(group.querySelectorAll('.person-card')).some((card) => !card.hidden);
    });
    const result = document.querySelector('#team-result');
    if (result) result.textContent = `Найдено: ${found}`;
    const empty = document.querySelector('#team-empty');
    if (empty) empty.hidden = found !== 0;
    if (teamFilters.length) {
      const url = new URL(location.href);
      if (teamCategory === 'all') url.searchParams.delete('group');
      else url.searchParams.set('group', teamCategory);
      if (teamTrack === 'all') url.searchParams.delete('track');
      else url.searchParams.set('track', teamTrack);
      if (query) url.searchParams.set('q', query);
      else url.searchParams.delete('q');
      history.replaceState(null, '', url);
    }
    updateScroll();
  };
  teamFilters.forEach((button) => button.addEventListener('click', () => {
    teamCategory = button.dataset.teamFilter;
    teamFilters.forEach((filter) => {
      filter.classList.toggle('active', filter === button);
      filter.setAttribute('aria-pressed', String(filter === button));
    });
    filterPeople();
  }));
  teamTrackFilters.forEach((button) => button.addEventListener('click', () => {
    teamTrack = button.dataset.teamTrack;
    teamTrackFilters.forEach((filter) => {
      filter.classList.toggle('active', filter === button);
      filter.setAttribute('aria-pressed', String(filter === button));
    });
    filterPeople();
  }));
  teamSearch?.addEventListener('input', filterPeople);
  if (teamFilters.length) {
    const initialTeamFilter = Array.from(teamFilters).find((filter) => filter.dataset.teamFilter === teamCategory) || teamFilters[0];
    teamCategory = initialTeamFilter.dataset.teamFilter;
    teamFilters.forEach((filter) => {
      filter.classList.toggle('active', filter === initialTeamFilter);
      filter.setAttribute('aria-pressed', String(filter === initialTeamFilter));
    });
    const initialTrackFilter = Array.from(teamTrackFilters).find((filter) => filter.dataset.teamTrack === teamTrack) || teamTrackFilters[0];
    if (initialTrackFilter) {
      teamTrack = initialTrackFilter.dataset.teamTrack;
      teamTrackFilters.forEach((filter) => {
        filter.classList.toggle('active', filter === initialTrackFilter);
        filter.setAttribute('aria-pressed', String(filter === initialTrackFilter));
      });
    }
    filterPeople();
  }

  const personDialog = document.querySelector('#person-dialog');
  let lastPersonButton = null;
  document.querySelectorAll('[data-person]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!personDialog) return;
      lastPersonButton = button;
      const person = button.dataset;
      personDialog.querySelector('#person-dialog-name').textContent = person.name;
      personDialog.querySelector('.dialog-role').textContent = person.role;
      personDialog.querySelector('.dialog-quote').textContent = person.quote;
      personDialog.querySelector('.dialog-bio').textContent = person.bio;
      personDialog.querySelector('.dialog-skills').textContent = person.skills;
      const sourcePortrait = button.querySelector('.person-portrait');
      const portrait = personDialog.querySelector('.dialog-portrait');
      portrait.style.backgroundImage = sourcePortrait.style.backgroundImage;
      portrait.style.backgroundPosition = sourcePortrait.style.backgroundPosition;
      portrait.setAttribute('aria-label', `Сгенерированный портрет: ${person.name}`);
      personDialog.showModal();
    });
    const card = button.closest('.person-card');
    let tiltFrame = null;
    button.addEventListener('pointermove', (event) => {
      if (motionDisabled || !finePointer.matches) return;
      if (tiltFrame) cancelAnimationFrame(tiltFrame);
      tiltFrame = requestAnimationFrame(() => {
        const rect = button.getBoundingClientRect();
        card.style.setProperty('--tilt-x', `${((event.clientY - rect.top) / rect.height - .5) * -5}deg`);
        card.style.setProperty('--tilt-y', `${((event.clientX - rect.left) / rect.width - .5) * 5}deg`);
      });
    });
    button.addEventListener('pointerleave', () => {
      if (tiltFrame) cancelAnimationFrame(tiltFrame);
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
  personDialog?.querySelector('.dialog-close').addEventListener('click', () => personDialog.close());
  personDialog?.addEventListener('click', (event) => {
    if (event.target !== personDialog) return;
    const rect = personDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) personDialog.close();
  });
  personDialog?.addEventListener('close', () => lastPersonButton?.focus());

  const projectTypes = {
    web: { heading: 'Впечатление с первого экрана.', description: 'От структуры и визуальной идеи до быстрого, адаптивного сайта.', team: ['Аналитик', 'Дизайнер', 'Frontend', 'Backend'], title: ['Есть идея.', 'Будет сайт.'], action: 'Обсудить сайт ↗︎' },
    app: { heading: 'Ваш продукт всегда рядом.', description: 'Понятные сценарии, нативные жесты и единая логика для iOS и Android.', team: ['UX/UI', 'iOS', 'Android', 'Backend', 'QA'], title: ['Ближе.', 'Каждый день.'], action: 'Обсудить приложение ↗︎' },
    design: { heading: 'Характер, который узнают.', description: 'Находим визуальную идею и собираем систему, которая растёт вместе с брендом.', team: ['Арт-директор', 'Дизайнер', 'Motion'], title: ['Свой взгляд.', 'Своя форма.'], action: 'Обсудить дизайн ↗︎' }
  };
  const builderOptions = document.querySelectorAll('[data-project-type]');
  const syncBuilder = (type, animate = false) => {
    const project = projectTypes[type];
    const scene = document.querySelector('.builder-preview');
    if (!project || !scene) return;
    builderOptions.forEach((option) => {
      const selected = option.dataset.projectType === type;
      option.classList.toggle('active', selected);
      option.setAttribute('aria-pressed', String(selected));
    });
    scene.dataset.builderState = type;
    document.querySelector('#builder-heading').textContent = t(project.heading);
    document.querySelector('#builder-description').textContent = t(project.description);
    const title = scene.querySelector('.builder-art-title');
    title.replaceChildren(document.createTextNode(t(project.title[0])), document.createElement('br'), document.createTextNode(t(project.title[1])));
    document.querySelector('#builder-team').replaceChildren(...project.team.map((role) => {
      const chip = document.createElement('span'); chip.textContent = t(role); return chip;
    }));
    const cta = document.querySelector('#builder-cta');
    cta.href = `contact.html?type=${type}`;
    cta.textContent = t(project.action);
    if (animate && !motionDisabled) scene.querySelector('.builder-response').animate([{ opacity: .25, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 450, easing: 'cubic-bezier(.22,1,.36,1)' });
  };
  builderOptions.forEach((button) => button.addEventListener('click', () => {
    const type = button.dataset.projectType;
    if (document.querySelector('.builder-preview')?.dataset.builderState === type) return;
    syncBuilder(type, true);
  }));
  if (builderOptions.length) {
    syncBuilder(document.querySelector('.builder-preview')?.dataset.builderState || builderOptions[0].dataset.projectType);
    window.addEventListener('acor:locale-change', () => syncBuilder(document.querySelector('.builder-preview')?.dataset.builderState || 'web'));
  }
  // The case link stays available; the gallery is a separate enhancement.
  const gallery = document.querySelector('#project-gallery');
  if (gallery) {
    const stage = gallery.querySelector('#gallery-stage');
    const previous = gallery.querySelector('#gallery-prev');
    const next = gallery.querySelector('#gallery-next');
    const galleryMeta = document.createElement('p');
    galleryMeta.className = 'gallery-meta';
    gallery.querySelector('.gallery-header > div').append(galleryMeta);
    const projectApproach = { Arden: 'масштаб и пауза', GreenFlow: 'ритм каталога', Orbit: 'ясная иерархия' };
    const categoryLabels = { web: 'Web', commerce: 'E-commerce', product: 'Продукт' };
    let galleryCards = [];
    let galleryIndex = 0;
    let galleryTrigger = null;
    const renderProject = (index) => {
      galleryIndex = (index + galleryCards.length) % galleryCards.length;
      const card = galleryCards[galleryIndex];
      const visual = card.querySelector('.project-visual').cloneNode(true);
      // SVG paint references must remain unique alongside the original card.
      visual.querySelectorAll('[id]').forEach((element) => {
        const oldId = element.id;
        element.id = `gallery-${oldId}`;
        visual.querySelectorAll('*').forEach((child) => {
          Array.from(child.attributes).forEach((attribute) => {
            if (attribute.value.includes(`url(#${oldId})`)) child.setAttribute(attribute.name, attribute.value.replaceAll(`url(#${oldId})`, `url(#gallery-${oldId})`));
          });
        });
      });
      stage.className = `gallery-stage ${Array.from(card.classList).filter((name) => name.startsWith('project--')).join(' ')}`;
      stage.replaceChildren(visual);
      gallery.querySelector('#gallery-title').textContent = card.querySelector('h3').textContent;
      const projectName = card.querySelector('h3').textContent.trim();
      galleryMeta.textContent = `${categoryLabels[card.dataset.category] || 'Концепция'}  /  ${projectApproach[projectName] || 'точная форма'}`;
      gallery.querySelector('#gallery-description').textContent = card.querySelector('.project-caption p').textContent;
      gallery.querySelector('#gallery-count').textContent = `${galleryIndex + 1} / ${galleryCards.length}`;
      gallery.querySelector('#gallery-case').href = card.querySelector('.project-link').href;
      previous.disabled = next.disabled = galleryCards.length < 2;
      if (!motionDisabled) visual.animate([{ opacity: .35, transform: 'scale(.98)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 350, easing: 'ease-out' });
    };
    document.querySelectorAll('[data-gallery-open]').forEach((button) => {
      button.hidden = false;
      button.addEventListener('click', () => {
        galleryTrigger = button;
        galleryCards = Array.from(document.querySelectorAll('.project')).filter((card) => !card.hidden);
        renderProject(galleryCards.indexOf(button.closest('.project')));
        cursor?.classList.remove('visible');
        gallery.showModal();
        gallery.querySelector('.gallery-close').focus();
      });
    });
    previous.addEventListener('click', () => renderProject(galleryIndex - 1));
    next.addEventListener('click', () => renderProject(galleryIndex + 1));
    gallery.querySelector('.gallery-close').addEventListener('click', () => gallery.close());
    gallery.addEventListener('close', () => galleryTrigger?.focus({ preventScroll: true }));
    gallery.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        renderProject(galleryIndex + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    let swipeStart = null;
    stage.addEventListener('pointerdown', (event) => { swipeStart = { x: event.clientX, y: event.clientY }; });
    stage.addEventListener('pointercancel', () => { swipeStart = null; });
    stage.addEventListener('pointerup', (event) => {
      if (!swipeStart) return;
      const dx = event.clientX - swipeStart.x;
      const dy = event.clientY - swipeStart.y;
      swipeStart = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) renderProject(galleryIndex + (dx < 0 ? 1 : -1));
    });
    gallery.addEventListener('click', (event) => {
      if (event.target !== gallery) return;
      const rect = gallery.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) gallery.close();
    });
  }

  const caseScene = document.querySelector('.case-scene');
  const caseIntro = document.querySelector('.page-intro');
  if (caseScene && caseIntro) {
    const projectName = caseScene.classList.contains('project--arden') ? 'Arden' : caseScene.classList.contains('project--flora') ? 'GreenFlow' : 'Orbit';
    const crumbs = document.createElement('nav');
    crumbs.className = 'case-crumbs';
    crumbs.setAttribute('aria-label', 'Навигация по проекту');
    crumbs.innerHTML = `<a href="cases.html">Проекты</a><span aria-hidden="true">/</span><span>${projectName}</span><span aria-hidden="true">/</span><span>Решение</span>`;
    caseIntro.prepend(crumbs);
  }
  if (!caseScene && caseIntro && !caseIntro.querySelector('.page-crumbs')) {
    const trail = document.createElement('nav');
    trail.className = 'page-crumbs';
    trail.setAttribute('aria-label', 'Навигация по сайту');
    const current = document.title.replace(' — Acor Web', '').trim();
    trail.innerHTML = `<a href="index.html">Acor Web</a><span aria-hidden="true">/</span><span>${current}</span>`;
    caseIntro.prepend(trail);
  }
  if (caseIntro && !caseIntro.querySelector('.reading-time')) {
    const intro = caseIntro.querySelector('.intro-description');
    const wordCount = document.querySelector('main')?.innerText.trim().split(/\s+/).filter(Boolean).length || 0;
    if (intro && wordCount > 80) {
      const readTime = document.createElement('span');
      readTime.className = 'reading-time';
      const minutes = Math.max(1, Math.round(wordCount / 180));
      const syncReadTime = () => { readTime.textContent = `≈ ${minutes} ${t('мин чтения')}`; };
      syncReadTime();
      window.addEventListener('acor:locale-change', syncReadTime);
      intro.insertAdjacentElement('afterend', readTime);
    }
  }

  const caseNext = document.querySelector('.case-next');
  if (caseNext && !caseNext.querySelector('.case-share')) {
    const shareButton = document.createElement('button');
    shareButton.type = 'button';
    shareButton.className = 'pill-button case-share';
    shareButton.dataset.analytics = 'case_share';
    shareButton.innerHTML = 'Поделиться <span aria-hidden="true">↗︎</span>';
    const shareStatus = document.createElement('span');
    shareStatus.className = 'case-share-status';
    shareStatus.setAttribute('role', 'status');
    shareButton.addEventListener('click', async () => {
      const title = document.title.replace(' — Acor Web', '');
      try {
        if (navigator.share) await navigator.share({ title, text: `Проект Acor Web: ${title}`, url: location.href });
        else {
          await navigator.clipboard.writeText(location.href);
          shareStatus.textContent = t('Ссылка скопирована.');
        }
      } catch {
        shareStatus.textContent = t('Ссылку не удалось скопировать.');
      }
      if (shareStatus.textContent) setTimeout(() => { shareStatus.textContent = ''; }, 3000);
    });
    caseNext.append(shareButton, shareStatus);
    const printButton = document.createElement('button');
    printButton.type = 'button';
    printButton.className = 'pill-button case-print';
    printButton.dataset.analytics = 'case_print';
    printButton.innerHTML = 'Печатная версия <span aria-hidden="true">↧</span>';
    printButton.addEventListener('click', () => window.print());
    caseNext.append(printButton);
  }

  const briefBuilder = document.querySelector('#brief-builder');
  if (briefBuilder) {
    const briefSteps = Array.from(briefBuilder.querySelectorAll('[data-brief-step]'));
    const briefOptions = Array.from(briefBuilder.querySelectorAll('[data-brief-option]'));
    const briefPrev = briefBuilder.querySelector('#brief-prev');
    const briefNext = briefBuilder.querySelector('#brief-next');
    const briefTitle = briefBuilder.querySelector('#brief-summary-title');
    const briefCopy = briefBuilder.querySelector('#brief-summary-copy');
    const briefTags = briefBuilder.querySelector('#brief-summary-tags');
    const briefKicker = briefBuilder.querySelector('.brief-summary-kicker');
    const briefNote = briefBuilder.querySelector('.brief-summary-note');
    const briefForm = document.querySelector('#brief-form');
    const briefProgress = document.createElement('div');
    briefProgress.className = 'brief-progress';
    briefProgress.setAttribute('role', 'progressbar');
    briefProgress.setAttribute('aria-label', 'Прогресс заполнения брифа');
    briefBuilder.querySelector('.brief-steps')?.prepend(briefProgress);
    const briefShare = document.createElement('button');
    briefShare.type = 'button';
    briefShare.className = 'brief-share';
    briefShare.dataset.analytics = 'brief_share';
    briefShare.textContent = 'Скопировать ссылку на этот бриф';
    briefShare.setAttribute('aria-label', 'Скопировать ссылку на выбранный бриф');
    briefBuilder.querySelector('.brief-summary')?.append(briefShare);
    const briefParams = new URLSearchParams(location.search);
    const briefState = {
      type: ['web', 'app', 'design', 'other'].includes(briefParams.get('type')) ? briefParams.get('type') : 'web',
      audience: ['clients', 'team', 'buyers', 'wide'].includes(briefParams.get('audience')) ? briefParams.get('audience') : 'clients',
      goal: ['launch', 'refresh', 'validate', 'grow'].includes(briefParams.get('goal')) ? briefParams.get('goal') : 'launch',
      tone: ['calm', 'bold', 'clear', 'alive'].includes(briefParams.get('tone')) ? briefParams.get('tone') : 'clear'
    };
    const briefText = {
      type: {
        web: ['Сайт с характером.', 'Соберём структуру, визуальную идею и понятный путь к действию.', 'Web'],
        app: ['Приложение, которым удобно пользоваться.', 'Продумываем ежедневные сценарии, состояния и связь между экранами.', 'Mobile'],
        design: ['Визуальная система, которую узнают.', 'Находим идею и превращаем её в устойчивый язык для продукта и команды.', 'Identity'],
        other: ['Задача, которой нужна форма.', 'Разберёмся в контексте и предложим маршрут, с которого удобно начать.', 'Custom']
      },
      audience: {
        clients: ['Люди выбирают с доверием.', 'Покажем ценность продукта до первого контакта.', 'Клиенты'],
        team: ['Команда видит общее.', 'Сделаем сложный внутренний сценарий прозрачнее.', 'Команда'],
        buyers: ['Выбор становится проще.', 'Соединим настроение, аргументы и понятный следующий шаг.', 'Покупатели'],
        wide: ['Первое впечатление работает.', 'Соберём язык, который быстро считывается разными людьми.', 'Аудитория']
      },
      goal: {
        launch: ['Новый продукт начинается уверенно.', 'От первого вопроса до сценария, который можно выпускать.', 'Запуск'],
        refresh: ['Существующее получает новую опору.', 'Найдём, что мешает продукту, и аккуратно пересоберём главное.', 'Обновление'],
        validate: ['Идея проходит проверку раньше.', 'Соберём прототип и проверим ключевой сценарий до большой разработки.', 'Проверка'],
        grow: ['Следующая версия становится точнее.', 'Смотрим на поведение пользователей и развиваем то, что действительно нужно.', 'Развитие']
      },
      tone: {
        calm: ['Спокойное ощущение.', 'Паузы, ясная иерархия и форма, которая помогает сосредоточиться.', 'Calm'],
        bold: ['Смелое ощущение.', 'Контраст, характер и визуальный жест, который сложно забыть.', 'Bold'],
        clear: ['Точное ощущение.', 'Каждая деталь отвечает на действие и не спорит с задачей.', 'Clear'],
        alive: ['Живое ощущение.', 'Движение, отклик и пространство для любопытства.', 'Alive']
      }
    };
    const briefEstimates = {
      web: { launch: 'Ориентир: 6–10 недель до первой версии.', refresh: 'Ориентир: 4–8 недель на пересборку главного.', validate: 'Ориентир: 2–4 недели на прототип и проверку.', grow: 'Ориентир: короткие итерации по 2–4 недели.' },
      app: { launch: 'Ориентир: 10–16 недель до первого релиза.', refresh: 'Ориентир: 6–12 недель на обновление ключевых сценариев.', validate: 'Ориентир: 3–5 недель на кликабельный прототип.', grow: 'Ориентир: спринты развития по 2–4 недели.' },
      design: { launch: 'Ориентир: 3–6 недель на базовую систему.', refresh: 'Ориентир: 2–5 недель на обновление языка.', validate: 'Ориентир: 1–3 недели на визуальную гипотезу.', grow: 'Ориентир: последовательные этапы по 2–3 недели.' },
      other: { launch: 'Срок зависит от формата — сначала уточним контекст.', refresh: 'Сначала найдём, что стоит сохранить и пересобрать.', validate: 'Начнём с небольшого прототипа и проверим идею.', grow: 'Соберём план развития под ваши ограничения.' }
    };
    let briefIndex = 0;
    const syncBriefUrl = () => {
      const url = new URL(location.href);
      Object.entries(briefState).forEach(([key, value]) => url.searchParams.set(key, value));
      history.replaceState(null, '', url);
    };
    const syncBrief = () => {
      briefSteps.forEach((step, index) => {
        step.hidden = index !== briefIndex;
        step.classList.toggle('is-active', index === briefIndex);
      });
      briefOptions.forEach((option) => option.classList.toggle('is-selected', briefState[option.dataset.briefOption] === option.dataset.briefValue));
      const key = ['type', 'audience', 'goal', 'tone'][briefIndex];
      const [title, copy] = briefText[key][briefState[key]];
      if (briefTitle) briefTitle.textContent = t(title);
      if (briefCopy) briefCopy.textContent = t(copy);
      if (briefKicker) briefKicker.textContent = `${t('Ваш контекст')} / ${String(briefIndex + 1).padStart(2, '0')} ${t('из')} ${String(briefSteps.length).padStart(2, '0')}`;
      if (briefTags) briefTags.innerHTML = Object.entries(briefState).map(([name, value]) => `<span>${t(briefText[name][value][2])}</span>`).join('');
      if (briefNote) briefNote.textContent = t(briefEstimates[briefState.type][briefState.goal]);
      if (briefProgress) {
        const progress = Math.round(((briefIndex + 1) / briefSteps.length) * 100);
        briefProgress.style.setProperty('--brief-progress', `${progress}%`);
        briefProgress.setAttribute('aria-valuenow', String(progress));
        briefProgress.setAttribute('aria-valuetext', `${progress}%`);
      }
      if (briefPrev) briefPrev.disabled = briefIndex === 0;
      if (briefNext) briefNext.innerHTML = briefIndex === briefSteps.length - 1 ? `${t('Заполнить заявку')} <span>↘︎</span>` : `${t('Следующий вопрос')} <span>↗︎</span>`;
      const typeChoice = briefForm?.querySelector(`input[name="type"][value="${briefState.type}"]`);
      if (typeChoice) typeChoice.checked = true;
      syncBriefUrl();
    };
    briefOptions.forEach((option) => option.addEventListener('click', () => {
      briefState[option.dataset.briefOption] = option.dataset.briefValue;
      syncBrief();
    }));
    briefPrev?.addEventListener('click', () => { briefIndex = Math.max(0, briefIndex - 1); syncBrief(); });
    briefNext?.addEventListener('click', () => {
      if (briefIndex < briefSteps.length - 1) {
        briefIndex += 1;
        syncBrief();
      } else {
        document.querySelector('#brief-form')?.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
        briefForm?.elements.name?.focus({ preventScroll: true });
      }
    });
    briefShare.addEventListener('click', async () => {
      const shareUrl = location.href;
      try {
        await navigator.clipboard.writeText(shareUrl);
        briefShare.textContent = t('Ссылка скопирована');
      } catch {
        briefShare.textContent = t('Скопируйте URL из адресной строки');
      }
      setTimeout(() => { briefShare.textContent = t('Скопировать ссылку на этот бриф'); }, 2600);
    });
    syncBrief();
    window.addEventListener('acor:locale-change', syncBrief);
  }

  document.querySelectorAll('[data-compare]').forEach((compare) => {
    const range = compare.querySelector('[data-compare-range]');
    const output = compare.querySelector('[data-compare-output]');
    range?.addEventListener('input', () => {
      compare.style.setProperty('--compare', `${range.value}%`);
      if (output) output.textContent = `${range.value}%`;
    });
  });

  const labRandom = document.querySelector('#lab-random');
  const labPaletteChoices = document.querySelectorAll('[data-lab-palette]');
  const labPageArt = document.querySelector('.lab-art');
  if (labPageArt && labRandom) {
    const palettes = ['studio', 'night', 'moss'];
    const applyLabPalette = (value) => {
      const palette = palettes.includes(value) ? value : 'studio';
      labPageArt.dataset.palette = palette;
      labPaletteChoices.forEach((button) => {
        const selected = button.dataset.labPalette === palette;
        button.classList.toggle('is-selected', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      const url = new URL(location.href);
      url.searchParams.set('palette', palette);
      history.replaceState(null, '', url);
    };
    labPaletteChoices.forEach((button) => button.addEventListener('click', () => applyLabPalette(button.dataset.labPalette)));
    document.querySelector('#lab-reset')?.addEventListener('click', () => applyLabPalette('studio'));
    const labParams = new URLSearchParams(location.search);
    applyLabPalette(labParams.get('palette') || 'studio');
    labRandom.addEventListener('click', () => {
      const sets = Array.from(document.querySelectorAll('.lab-preset-set'));
      sets.forEach((set) => {
        const choices = Array.from(set.querySelectorAll('.lab-preset'));
        choices[Math.floor(Math.random() * choices.length)]?.click();
      });
      const rotationInput = document.querySelector('#lab-rotation');
      const scaleInput = document.querySelector('#lab-scale');
      if (rotationInput) rotationInput.value = String(Math.round(Math.random() * 50 - 25));
      if (scaleInput) scaleInput.value = String(Math.round(Math.random() * 45 + 70));
      rotationInput?.dispatchEvent(new Event('input', { bubbles: true }));
      scaleInput?.dispatchEvent(new Event('input', { bubbles: true }));
      applyLabPalette(palettes[Math.floor(Math.random() * palettes.length)]);
      if (!motionDisabled) labPageArt.animate([{ transform: 'scale(.97)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'ease-out' });
    });
  }

  const commandHeader = document.querySelector('.site-header');
  if (commandHeader) {
    const commandTrigger = commandHeader.querySelector('.command-trigger') || document.createElement('button');
    commandTrigger.type = 'button';
    commandTrigger.className = 'command-trigger';
    commandTrigger.setAttribute('aria-label', 'Открыть поиск по сайту');
    commandTrigger.innerHTML = '<span aria-hidden="true">⌘</span><small>K</small>';
    if (!commandTrigger.parentElement) commandHeader.querySelector('.header-contact')?.insertAdjacentElement('afterend', commandTrigger);
    const commandDialog = document.createElement('dialog');
    commandDialog.className = 'command-palette';
    commandDialog.setAttribute('aria-labelledby', 'command-palette-title');
    commandDialog.innerHTML = '<div class="command-palette-inner"><div class="command-palette-head"><div><p class="eyebrow">Навигация / Acor Web</p><h2 id="command-palette-title">Куда дальше?</h2></div><button type="button" class="command-close" aria-label="Закрыть поиск">×</button></div><label class="command-search"><span aria-hidden="true">⌕</span><input type="search" autocomplete="off" placeholder="Найти раздел или действие" aria-label="Поиск по сайту"></label><div class="command-results" role="listbox"></div><p class="command-hint">Enter — открыть · Esc — закрыть</p></div>';
    document.body.append(commandDialog);
    const commandSearch = commandDialog.querySelector('input');
    const commandResults = commandDialog.querySelector('.command-results');
    const commandItems = [
      ['Проекты', 'cases.html', 'Три концепции и разбор решений'], ['Услуги', 'services.html', 'Стратегия, дизайн и разработка'], ['Студия', 'about.html', 'Подход и наблюдения команды'], ['Команда', 'team.html', 'Люди и роли в проекте'], ['Карьера', 'careers.html', 'Вакансии, стажировка и контакты для отклика'], ['Lab', 'lab.html', 'Форма, движение и эксперименты'], ['Контакты', 'contact.html', 'Собрать задачу и начать разговор']
    ];
    const renderCommandResults = () => {
      const query = commandSearch.value.trim().toLocaleLowerCase('ru');
      commandResults.replaceChildren(...commandItems.filter(([label, , description]) => `${label} ${description}`.toLocaleLowerCase('ru').includes(query)).map(([label, href, description]) => {
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('role', 'option');
        link.innerHTML = `<span>${t(label)}</span><small>${t(description)}</small><b aria-hidden="true">↗︎</b>`;
        return link;
      }));
      if (!commandResults.children.length) {
        const empty = document.createElement('p');
        empty.className = 'command-empty';
        empty.textContent = t('Ничего не нашли. Попробуйте другое слово.');
        commandResults.append(empty);
      }
    };
    const openCommand = () => {
      setMenu(false);
      commandSearch.value = '';
      renderCommandResults();
      commandDialog.showModal();
      commandSearch.focus();
    };
    commandTrigger.addEventListener('click', openCommand);
    commandDialog.querySelector('.command-close').addEventListener('click', () => commandDialog.close());
    commandSearch.addEventListener('input', renderCommandResults);
    commandDialog.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        commandDialog.close();
      }
    });
    window.addEventListener('acor:locale-change', renderCommandResults);
    commandDialog.addEventListener('click', (event) => { if (event.target === commandDialog) commandDialog.close(); });
    commandDialog.addEventListener('close', () => commandTrigger.focus({ preventScroll: true }));
    document.addEventListener('keydown', (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (commandDialog.open) commandDialog.close(); else openCommand();
      }
    });
    renderCommandResults();
  }

  const stepTabs = Array.from(document.querySelectorAll('[data-step]'));
  const selectStep = (button) => {
    stepTabs.forEach((tab) => {
      const selected = tab === button;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      panel.hidden = !selected;
      panel.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
      if (selected && !motionDisabled) panel.animate([{ opacity: .2, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 400, easing: 'ease-out' });
    });
  };
  stepTabs.forEach((button, index) => {
    button.addEventListener('click', () => selectStep(button));
    button.addEventListener('keydown', (event) => {
      let target;
      if (event.key === 'ArrowRight') target = (index + 1) % stepTabs.length;
      if (event.key === 'ArrowLeft') target = (index - 1 + stepTabs.length) % stepTabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = stepTabs.length - 1;
      if (target === undefined) return;
      event.preventDefault();
      selectStep(stepTabs[target]);
      stepTabs[target].focus();
    });
  });

  // Translate static and progressively-created interface text after all page
  // modules have mounted their controls.
  applyLocale();

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('service-worker.js').catch(() => {
      // The studio stays fully usable when service workers are disabled.
    }), { once: true });
  }
})();
