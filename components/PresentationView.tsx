import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import './PresentationView.css';

export const PresentationView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const scalerRef = useRef<HTMLDivElement>(null);
  const rootRef2 = useRef<HTMLDivElement>(null);
  const scalerRef2 = useRef<HTMLDivElement>(null);

  const totalSlides = 12;
  const totalSlides2 = 14;

  const resizePresentation = () => {
    if (rootRef.current && scalerRef.current) {
      const parentWidth = rootRef.current.offsetWidth;
      const baseWidth = 1280;
      const scale = Math.min(parentWidth / baseWidth, 1); // Ограничиваем масштаб до 1, чтобы не увеличивать
      scalerRef.current.style.transform = `scale(${scale})`;
      rootRef.current.style.height = `${720 * scale}px`;
      // Убеждаемся, что контент не выходит за пределы
      scalerRef.current.style.maxWidth = `${baseWidth * scale}px`;
      scalerRef.current.style.maxHeight = `${720 * scale}px`;
    }
  };

  const resizePresentation2 = () => {
    if (rootRef2.current && scalerRef2.current) {
      const parentWidth = rootRef2.current.offsetWidth;
      const baseWidth = 1280;
      const scale = Math.min(parentWidth / baseWidth, 1);
      scalerRef2.current.style.transform = `scale(${scale})`;
      rootRef2.current.style.height = `${720 * scale}px`;
      scalerRef2.current.style.maxWidth = `${baseWidth * scale}px`;
      scalerRef2.current.style.maxHeight = `${720 * scale}px`;
    }
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', resizePresentation);
    window.addEventListener('resize', resizePresentation2);
    // Initial resize
    resizePresentation();
    resizePresentation2();
    // Delay to ensure fonts load/layout settles
    setTimeout(resizePresentation, 100);
    setTimeout(resizePresentation2, 100);
    setTimeout(resizePresentation, 500);
    setTimeout(resizePresentation2, 500);

    return () => {
      window.removeEventListener('resize', resizePresentation);
      window.removeEventListener('resize', resizePresentation2);
    };
  }, []);

  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) setCurrentIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const nextSlide2 = () => {
    if (currentIndex2 < totalSlides2 - 1) setCurrentIndex2(prev => prev + 1);
  };

  const prevSlide2 = () => {
    if (currentIndex2 > 0) setCurrentIndex2(prev => prev - 1);
  };

  // Список всех изображений для lightbox
  const allImages = [
    { src: '/d1.png', alt: 'Main Screen Screenshot' },
    { src: '/d2.png', alt: 'Geometry Detail' },
    { src: '/d4.png', alt: 'Tracking Screenshot' },
    { src: '/d5.png', alt: 'Loyalty Card Screenshot' },
    { src: '/example1.png', alt: 'Full Project View' },
    { src: '/u1.png', alt: 'Main Screen Screenshot' },
    { src: '/u2.png', alt: 'Transition Screenshot' },
    { src: '/u3.png', alt: 'Mascot Screenshot' },
    { src: '/u4.png', alt: 'Sections Screenshot' },
    { src: '/example2-new.png', alt: 'Full Project View 2' },
  ];

  const openImage = (imagePath: string) => {
    const index = allImages.findIndex(img => img.src === imagePath);
    if (index !== -1) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]); // Re-bind with fresh state if needed, or use functional updates in nextSlide which is safer. Actually functional updates are used so dep array could be empty? No, nextSlide/prevSlide use Functional updates so they dont close over state.
  // Wait, nextSlide is defined outside. Let's fix the Effect dep array to be safe, or just rely on the click handlers which are fine.
  // Better to strip logic into the handler directly to avoid staleness if we moved it out.
  // Actually the functions nextSlide/prevSlide rely on 'currentIndex' inside the `if` check?
  // Yes: "if (currentIndex < totalSlides - 1)". So that closes over stale state if the effect doesn't update.
  // I shall fix this by checking state inside the setter or adding deps.

  // Simpler:
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Навигация для первого слайдера (если не в lightbox)
      if (!lightboxOpen) {
        if (e.key === 'ArrowRight') {
          setCurrentIndex(prev => (prev < totalSlides - 1 ? prev + 1 : prev));
        }
        if (e.key === 'ArrowLeft') {
          setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev));
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);


  return (
    <>
    <div id="concept-presentation-root" ref={rootRef}>
      <div id="concept-scaler" ref={scalerRef}>

        {/* Слайд 1: Титульный */}
        <div className={`slide-container ${currentIndex === 0 ? 'active' : ''}`}>
          <div className="slide-content">
            <div style={{ maxWidth: '900px' }}>
              <p className="mono-text" style={{ marginBottom: '20px', fontSize: '20px' }}>// ДОКУМЕНТ ЗАЩИТЫ ВИЗУАЛЬНОЙ СТРАТЕГИИ</p>
              <h1>INDUSTRIAL<br />LUXURY &<br /><span className="accent-text">PRECISION</span></h1>
              <div style={{ marginTop: '40px', padding: '30px', border: '1px solid #334155', background: 'rgba(30,41,59,0.3)' }}>
                <p style={{ margin: 0, color: '#f8fafc', fontSize: '20px' }}><strong>ЦЕЛЬ:</strong> Создать образ «Инфраструктурной Корпорации».</p>
                <p style={{ margin: '10px 0 0', color: '#94a3b8', fontSize: '18px' }}><strong>ЗАДАЧА:</strong> Обосновать высокий чек ($20k+) через визуальную психологию.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Слайд 2: Проблема и Решение (ПОДРОБНО) */}
        <div className={`slide-container ${currentIndex === 1 ? 'active' : ''}`}>
          <div className="slide-content">
            <h2 className="slide-title">1. ПОЧЕМУ МЫ ОТКАЗАЛИСЬ ОТ «СТАНДАРТОВ РЫНКА»</h2>
            <div className="two-column tiled">
              <div>
                <h3><i className="fa-solid fa-ban"></i> ПРОБЛЕМА: «МАЛЫЙ БИЗНЕС»</h3>
                <p>95% сайтов в вашей нише выглядят одинаково: белый стерильный фон, синие кнопки и стоковые фото улыбающихся людей с гаечными ключами.</p>
                <hr style={{ borderColor: '#334155', margin: '20px 0' }} />
                <p><strong>Визуальный посыл:</strong> «Мы — бригада ремонтников. Мы приедем, починим и уедем. Мы стоим дешево».</p>
                <p className="mono-text" style={{ color: '#64748b', marginTop: '15px' }}>РЕЗУЛЬТАТ: ПРОВАЛ В ПРЕМИУМ-СЕГМЕНТЕ</p>
              </div>
              <div style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', borderColor: '#f97316' }}>
                <h3><i className="fa-solid fa-building-shield"></i> РЕШЕНИЕ: «КОРПОРАЦИЯ»</h3>
                <p>Мы создаем сайт не для ремонтников, а для <strong>Инженерной Экосистемы</strong>. Мы используем коды тяжелого люкса и промышленности.</p>
                <hr style={{ borderColor: '#f97316', margin: '20px 0', opacity: 0.3 }} />
                <p><strong>Визуальный посыл:</strong> «Мы — Институция. Нам можно доверить дом за $10M. У нас есть ресурсы, штат и гарантии».</p>
                <p className="mono-text" style={{ marginTop: '15px' }}>РЕЗУЛЬТАТ: ДОВЕРИЕ ЭЛИТЫ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Слайд 3: Сравнение (ДЕТАЛЬНО) */}
        <div className={`slide-container ${currentIndex === 2 ? 'active' : ''}`}>
          <div className="slide-content">
            <h2 className="slide-title">2. СМЕНА ВЕСОВОЙ КАТЕГОРИИ БРЕНДА</h2>
            <p style={{ marginBottom: '20px' }}>Мы не просто «рисуем красиво». Мы меняем восприятие вашего бизнеса в голове клиента.</p>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>АСПЕКТ</th>
                  <th style={{ color: '#64748b' }}>ОБЫЧНЫЙ ПОДРЯДЧИК</th>
                  <th style={{ color: '#f97316' }}>ВАШ НОВЫЙ БРЕНД (ENTERPRISE)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ЧТО ПРОДАЕМ?</td>
                  <td style={{ color: '#64748b' }}>Часы работы («Руки мастера»)</td>
                  <td className="our-column">Инженерную Систему и Протоколы</td>
                </tr>
                <tr>
                  <td>ГЛАВНЫЙ СТРАХ</td>
                  <td style={{ color: '#64748b' }}>Неопределенность («Приедут ли?»)</td>
                  <td className="our-column">Снят через прозрачность и Трекинг</td>
                </tr>
                <tr>
                  <td>ОЩУЩЕНИЕ</td>
                  <td style={{ color: '#64748b' }}>Временное решение</td>
                  <td className="our-column">Пожизненный Партнер (Safety)</td>
                </tr>
                <tr>
                  <td>ВОСПРИЯТИЕ ЦЕНЫ</td>
                  <td style={{ color: '#64748b' }}>«Почему так дорого?»</td>
                  <td className="our-column">«Это стоит своих денег»</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Слайд 4: Цвет (ПСИХОЛОГИЯ) */}
        <div className={`slide-container ${currentIndex === 3 ? 'active' : ''}`}>
          <div className="slide-content">
            <h2 className="slide-title">3A. ЦВЕТОВАЯ ПСИХОЛОГИЯ: КОД ВЛАСТИ</h2>
            <div className="two-column">
              <div>
                <h3 className="accent-text">ENTERPRISE NAVY (Глубокий Темный)</h3>
                <p>Мы выбрали глубокую темную тему (Dark Mode) как фундамент. Это не просто стиль, это маркер статуса:</p>
                <ul>
                  <li><strong>Код Премиума:</strong> Так выглядят интерфейсы Tesla, банковские приложения (FinTech) и системы «Умный дом». Светлый сайт = простота. Темный сайт = технологии и эксклюзивность.</li>
                  <li><strong>Фокус:</strong> Темный фон работает как сцена в театре, заставляя контент (фото объектов) буквально светиться.</li>
                </ul>
                <br />
                <h3 className="accent-text">PIONEER ORANGE (Сигнальный)</h3>
                <p>Цвет высокого напряжения и безопасности. Он используется <strong>строго дозированно</strong>. Он работает как маяк, принудительно ведя глаз пользователя к кнопке действия.</p>
              </div>
              <div className="placeholder-box" style={{ padding: 0, overflow: 'hidden', border: '2px solid #f97316' }}>
                <img
                  src="/d1.png"
                  alt="Main Screen Screenshot"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => openImage('/d1.png')}
                  loading={currentIndex === 3 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Слайд 5: Геометрия (АРГУМЕНТАЦИЯ) */}
        <div className={`slide-container ${currentIndex === 4 ? 'active' : ''}`}>
          <div className="slide-content" style={{ padding: 0, display: 'grid', gridTemplateColumns: '45% 55%', height: '100%' }}>
            <div style={{ padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 className="slide-title" style={{ marginLeft: '-20px' }}>3B. ГЕОМЕТРИЯ: «WE DON'T CUT CORNERS»</h2>
              <h3 className="accent-text">ПОЧЕМУ НЕТ СКРУГЛЕНИЙ? (0PX RADIUS)</h3>
              <p>Вы заметите, что в дизайне полностью отсутствуют «милые» скругленные кнопки, привычные по приложениям такси.</p>
              <br />
              <p><strong>Инженерная ДНК:</strong> Посмотрите на ваше оборудование — воздуховоды, профили, металл. Там нет скруглений. Там есть четкие стыки и резка.</p>
              <p><strong>Психология:</strong> Скругление = Мягкость и Масс-маркет. Острый угол = <strong>Дисциплина, Точность и Бескомпромиссность</strong>.</p>
              <p style={{ marginTop: '20px', borderLeft: '3px solid #f97316', paddingLeft: '15px' }}><em>Этим мы подсознательно говорим клиенту: «Мы не срезаем углы — ни в работе, ни в дизайне. У нас всё четко до миллиметра».</em></p>
            </div>
            <div style={{ background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <div className="placeholder-box" style={{ padding: 0, overflow: 'hidden', border: '2px solid #f97316' }}>
                <img
                  src="/d2.png"
                  alt="Geometry Detail"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }}
                  onClick={() => openImage('/d2.png')}
                  loading={currentIndex === 4 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Слайд 6: Типографика (ГОЛОС БРЕНДА) */}
        <div className={`slide-container ${currentIndex === 5 ? 'active' : ''}`}>
          <div className="slide-content">
            <h2 className="slide-title">3C. ТИПОГРАФИКА: ГОЛОС КОМАНДИРА</h2>
            <div className="tiled-content">
              <div className="tile">
                <div className="icon"><i className="fa-solid fa-text-height"></i></div>
                <h3>ЭФФЕКТ МАСШТАБА</h3>
                <p>Заголовки <span className="mono-text">PRECISION INFRASTRUCTURE</span> выглядят не как рекламный текст, а как надписи на несущих балках небоскреба. Они транслируют устойчивость.</p>
              </div>
              <div className="tile">
                <div className="icon"><i className="fa-solid fa-font"></i></div>
                <h3>SANS SERIF CAPS</h3>
                <p>Мы используем массивный шрифт без засечек в верхнем регистре (ALL CAPS). Мы не просим внимания — мы его берем. Это голос индустриального гиганта.</p>
              </div>
              <div className="tile">
                <div className="icon"><i className="fa-solid fa-calculator"></i></div>
                <h3>ДАННЫЕ КАК ПРИБОРЫ</h3>
                <p>Все цифры (цены, статистика) набраны <strong>моноширинным</strong> шрифтом. Они выглядят как показатели на технической приборной панели, вызывая доверие к вашим расчетам.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Слайд 7: Аватар клиента (ПОРТРЕТ) */}
        <div className={`slide-container ${currentIndex === 6 ? 'active' : ''}`}>
          <div className="slide-content">
            <h2 className="slide-title">4. ДЛЯ КОГО МЫ ЭТО ДЕЛАЕМ? (AVATAR)</h2>
            <div className="persona-card">
              <div className="persona-icon"><i className="fa-solid fa-user-shield"></i></div>
              <div>
                <h3 className="accent-text" style={{ fontSize: '32px' }}>ВЛАДЕЛЕЦ ЭЛИТНОЙ НЕДВИЖИМОСТИ</h3>
                <p className="mono-text" style={{ marginBottom: '20px' }}>ПСИХОЛОГИЧЕСКИЙ ПОРТРЕТ</p>
                <ul>
                  <li><strong>Ценности:</strong> Время, Приватность и Безопасность. Цена для него вторична, если закрыты риски.</li>
                  <li><strong>Главный страх:</strong> «Придет частник, наследит, испортит дорогой интерьер и исчезнет».</li>
                  <li><strong>Чего хочет:</strong> Он ищет «Институцию», которой можно делегировать проблему целиком. Хочет заплатить один раз и забыть.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Слайд 8: Элементы доверия (HERO SECTION) */}
        <div className={`slide-container ${currentIndex === 7 ? 'active' : ''}`}>
          <div className="slide-content" style={{ padding: 0, display: 'grid', gridTemplateColumns: '45% 55%', height: '100%' }}>
            <div style={{ padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 className="slide-title" style={{ marginLeft: '-20px' }}>5. ПЕРВЫЙ ЭКРАН: WOW-ЭФФЕКТ</h2>
              <h3 className="accent-text">AURORA & THE BEAR (Метафора)</h3>
              <p>Вместо скучного кондиционера на стене мы используем метафору <strong>Северного Сияния</strong>. Это образ идеального, чистого, природного холода. Это выглядит эпично и сразу отстраивает от конкурентов.</p>
              <br />
              <h3 className="accent-text">МАСКОТ (BRAND RECALL)</h3>
              <p>Мы вводим персонажа — Медведя. Но это не мультяшка, а брутальный профи в экипировке. Это создает мощнейшую узнаваемость: <em>«Позвони тем ребятам с медведем»</em>.</p>
            </div>
            <div style={{ background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <div className="placeholder-box" style={{ padding: 0, overflow: 'hidden', border: '2px solid #f97316', background: '#000' }}>
                <img
                  src="/d1.png"
                  alt="Hero Section"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }}
                  onClick={() => openImage('/d1.png')}
                  loading={currentIndex === 7 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Слайд 9: Технологии (UBER STYLE) */}
        <div className={`slide-container ${currentIndex === 8 ? 'active' : ''}`}>
          <div className="slide-content">
            <h2 className="slide-title">6. ТЕХНОЛОГИИ: УБИВАЕМ НЕИЗВЕСТНОСТЬ</h2>
            <div className="two-column">
              <div>
                <h3 className="accent-text">THE UBER EXPERIENCE</h3>
                <p>Главная боль клиента — ожидание мастера вслепую («Буду с 9 до 18»). Это раздражает занятых людей.</p>
                <p style={{ marginTop: '15px' }}><strong>Решение:</strong> Мы разместили в центре сайта блок с демонстрацией <strong>Live Tracking</strong> (Отслеживание в реальном времени). Мы показываем интерфейс приложения: карта, фото мастера, точное время прибытия.</p>
                <ul style={{ marginTop: '15px' }}>
                  <li>Переносим стандарты Uber/Amazon в консервативную сферу HVAC.</li>
                  <li>Доказываем, что компания полностью оцифрована и прозрачна.</li>
                </ul>
              </div>
              <div className="placeholder-box" style={{ padding: 0, overflow: 'hidden', border: '2px solid #f97316' }}>
                <img
                  src="/d4.png"
                  alt="Tracking Screenshot"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }}
                  onClick={() => openImage('/d4.png')}
                  loading={currentIndex === 8 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Слайд 10: Членство (LTV) */}
        <div className={`slide-container ${currentIndex === 9 ? 'active' : ''}`}>
          <div className="slide-content">
            <h2 className="slide-title">7. PIONEER SHIELD: LTV & ЛОЯЛЬНОСТЬ</h2>
            <div className="two-column">
              <div className="placeholder-box" style={{ padding: 0, overflow: 'hidden', border: '2px solid #f97316' }}>
                <img
                  src="/d5.png"
                  alt="Loyalty Card Screenshot"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }}
                  onClick={() => openImage('/d5.png')}
                  loading={currentIndex === 9 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
              <div>
                <h3 className="accent-text">ПРИВИЛЕГИЯ, А НЕ «ОБЯЗАЛОВКА»</h3>
                <p>Обычно сервисные контракты продают скучно. Мы пошли другим путем.</p>
                <p>Мы визуально упаковали членство в программе как вступление в закрытый клуб, похожее на получение банковской <strong>Black Card</strong>.</p>
                <ul>
                  <li><strong>Месседж:</strong> Это не налог на обслуживание. Это пропуск к приоритетному статусу и защите активов.</li>
                  <li><strong>Бизнес-цель:</strong> Резкое увеличение LTV (пожизненной ценности клиента).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Слайд 11: Roadmap (5 ШАГОВ) */}
        <div className={`slide-container ${currentIndex === 10 ? 'active' : ''}`}>
          <div className="slide-content">
            <h2 className="slide-title">8. ДОРОЖНАЯ КАРТА ПРОЕКТА</h2>
            <p style={{ marginBottom: '30px' }}>Прозрачный план действий от утверждения концепта до запуска.</p>
            <div className="roadmap-container">
              <div className="roadmap-step active">
                <div className="roadmap-dot">01</div>
                <h3>КОНЦЕПТ</h3>
                <p>Утверждение визуального стиля и стратегии (Мы здесь)</p>
              </div>
              <div className="roadmap-step">
                <div className="roadmap-dot">02</div>
                <h3>ДИЗАЙН</h3>
                <p>Отрисовка всех внутренних страниц и состояний</p>
              </div>
              <div className="roadmap-step">
                <div className="roadmap-dot">03</div>
                <h3>FRONTEND</h3>
                <p>Верстка интерактивных макетов (HTML/CSS/JS)</p>
              </div>
              <div className="roadmap-step">
                <div className="roadmap-dot">04</div>
                <h3>BACKEND</h3>
                <p>Разработка админки и подключение функционала</p>
              </div>
              <div className="roadmap-step">
                <div className="roadmap-dot">05</div>
                <h3>ЗАПУСК</h3>
                <p>Наполнение контентом, тестирование и релиз</p>
              </div>
            </div>
          </div>
        </div>

        {/* Слайд 12: Итоговый аргумент */}
        <div className={`slide-container ${currentIndex === 11 ? 'active' : ''}`}>
          <div className="slide-content" style={{ textAlign: 'center' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <p className="mono-text" style={{ marginBottom: '20px', fontSize: '20px' }}>// ФИНАЛЬНЫЙ ВЫВОД</p>
              <h1 style={{ fontSize: '60px', marginBottom: '40px' }}>ЭТОТ ДИЗАЙН РЕШАЕТ ОДНУ ЗАДАЧУ:<br /><span className="accent-text">ОБОСНОВАНИЕ ВАШЕГО ЧЕКА</span></h1>
              <div style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto', background: 'rgba(249,115,22,0.1)', padding: '40px', border: '1px solid #f97316' }}>
                <p style={{ fontSize: '24px', color: '#fff', marginBottom: '20px' }}><strong>Вопрос клиента:</strong> «Почему установка стоит $15,000, а у соседа $8,000?»</p>
                <p style={{ fontSize: '24px', color: '#cbd5e1' }}><strong>Ответ дизайна:</strong> «Потому что вы нанимаете не бригаду с инструментами, а <u>Инфраструктурную Корпорацию</u> с технологиями, гарантиями и протоколами безопасности».</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* UI Кнопки навигации для первого слайдера */}
      <div className="pres-counter">
        <span id="pres-current" className="current-slide">{String(currentIndex + 1).padStart(2, '0')}</span> / <span id="pres-total">{totalSlides}</span>
      </div>
      <div className="pres-controls">
        <button id="pres-prev" className="pres-btn" onClick={prevSlide}><i className="fa-solid fa-chevron-left"></i></button>
        <button id="pres-next" className="pres-btn" onClick={nextSlide}><i className="fa-solid fa-chevron-right"></i></button>
      </div>
    </div>

    {/* Кнопка просмотра всего проекта - после первого слайдера */}
    <div style={{
      width: '100%',
      maxWidth: '1280px',
      margin: '20px auto 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100
    }}>
      <button
        onClick={() => openImage('/example1.png')}
        style={{
          background: '#f97316',
          border: '2px solid #f97316',
          color: '#000',
          padding: '12px 32px',
          fontSize: '14px',
          fontFamily: 'Oswald, sans-serif',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(249, 115, 22, 0.25)',
          letterSpacing: '1px',
          borderRadius: '4px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          whiteSpace: 'nowrap'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#fff';
          e.currentTarget.style.color = '#f97316';
          e.currentTarget.style.borderColor = '#f97316';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(249, 115, 22, 0.4)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#f97316';
          e.currentTarget.style.color = '#000';
          e.currentTarget.style.borderColor = '#f97316';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(249, 115, 22, 0.25)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
      >
        <i className="fa-solid fa-expand" style={{ fontSize: '14px' }}></i>
        Посмотреть весь проект
      </button>
    </div>

    {/* Второй слайдер - полностью отдельный контейнер */}
    <div id="concept-presentation-root-2" ref={rootRef2} style={{ marginTop: '20px', width: '100%', maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div id="concept-scaler-2" ref={scalerRef2}>

          {/* Слайд 1: Титульный */}
          <div className={`slide-container ${currentIndex2 === 0 ? 'active' : ''}`}>
            <div className="slide-content">
              <div style={{ maxWidth: '900px' }}>
                <p className="mono-text" style={{ marginBottom: '20px', fontSize: '20px' }}>// ДОКУМЕНТ ЗАЩИТЫ ВИЗУАЛЬНОЙ СТРАТЕГИИ</p>
                <h1>PREMIUM<br />CLEAN &<br /><span className="accent-text">MODERN</span></h1>
                <div style={{ marginTop: '40px', padding: '30px', border: '1px solid #334155', background: 'rgba(30,41,59,0.3)' }}>
                  <p style={{ margin: 0, color: '#f8fafc', fontSize: '20px' }}><strong>ЦЕЛЬ:</strong> Создать образ «Премиального HVAC Сервиса» для элитного сегмента Irvine.</p>
                  <p style={{ margin: '10px 0 0', color: '#94a3b8', fontSize: '18px' }}><strong>ЗАДАЧА:</strong> Обосновать высокий чек через визуальную психологию «White Shirt» — чистоты, технологий и доверия.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Слайд 2: Проблема и Решение */}
          <div className={`slide-container ${currentIndex2 === 1 ? 'active' : ''}`}>
            <div className="slide-content">
              <h2 className="slide-title">1. ПОЧЕМУ МЫ ОТКАЗАЛИСЬ ОТ «СТАНДАРТОВ РЫНКА»</h2>
              <div className="two-column tiled">
                <div>
                  <h3><i className="fa-solid fa-ban"></i> ПРОБЛЕМА: «СТЕРИЛЬНЫЙ БЕЛЫЙ»</h3>
                  <p>95% сайтов HVAC выглядят одинаково: белый стерильный фон, синие кнопки, стоковые фото улыбающихся техников с инструментами.</p>
                  <hr style={{ borderColor: '#334155', margin: '20px 0' }} />
                  <p><strong>Визуальный посыл:</strong> «Мы — обычная бригада. Мы приедем, починим, уедем. Мы стоим дешево».</p>
                  <p className="mono-text" style={{ color: '#64748b', marginTop: '15px' }}>РЕЗУЛЬТАТ: НЕТ ДОВЕРИЯ В ПРЕМИУМ-СЕГМЕНТЕ</p>
                </div>
                <div style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', borderColor: '#f97316' }}>
                  <h3><i className="fa-solid fa-building-shield"></i> РЕШЕНИЕ: «PREMIUM CLEAN»</h3>
                  <p>Мы создаем сайт не для ремонтников, а для <strong>Премиального Сервисного Партнера</strong>. Мы используем коды чистоты, технологий и доверия.</p>
                  <hr style={{ borderColor: '#f97316', margin: '20px 0', opacity: 0.3 }} />
                  <p><strong>Визуальный посыл:</strong> «Мы — Институция. Нам можно доверить дом за $5M+. У нас есть технологии, протоколы и гарантии».</p>
                  <p className="mono-text" style={{ marginTop: '15px' }}>РЕЗУЛЬТАТ: ДОВЕРИЕ ЭЛИТЫ IRVINE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Слайд 3: Сравнение */}
          <div className={`slide-container ${currentIndex2 === 2 ? 'active' : ''}`}>
            <div className="slide-content">
              <h2 className="slide-title">2. СМЕНА ВЕСОВОЙ КАТЕГОРИИ БРЕНДА</h2>
              <p style={{ marginBottom: '20px' }}>Мы не просто «рисуем красиво». Мы меняем восприятие вашего бизнеса в голове клиента.</p>
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th style={{ width: '25%' }}>АСПЕКТ</th>
                    <th style={{ color: '#64748b' }}>ОБЫЧНЫЙ ПОДРЯДЧИК</th>
                            <th style={{ color: '#f97316' }}>ВАШ НОВЫЙ БРЕНД (PREMIUM)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ЧТО ПРОДАЕМ?</td>
                    <td style={{ color: '#64748b' }}>Часы работы («Руки мастера»)</td>
                    <td className="our-column">Премиальный Сервис и Технологии</td>
                  </tr>
                  <tr>
                    <td>ГЛАВНЫЙ СТРАХ</td>
                    <td style={{ color: '#64748b' }}>Неопределенность («Приедут ли?»)</td>
                    <td className="our-column">Снят через прозрачность и Tracking</td>
                  </tr>
                  <tr>
                    <td>ОЩУЩЕНИЕ</td>
                    <td style={{ color: '#64748b' }}>Временное решение</td>
                    <td className="our-column">Пожизненный Партнер (Trust)</td>
                  </tr>
                  <tr>
                    <td>ВОСПРИЯТИЕ ЦЕНЫ</td>
                    <td style={{ color: '#64748b' }}>«Почему так дорого?»</td>
                    <td className="our-column">«Это стоит своих денег»</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Слайд 4: Цветовая Психология */}
          <div className={`slide-container ${currentIndex2 === 3 ? 'active' : ''}`}>
            <div className="slide-content">
              <h2 className="slide-title">3A. ЦВЕТОВАЯ ПСИХОЛОГИЯ: КОД ПРЕМИУМА</h2>
              <div className="two-column">
                <div>
                  <h3 className="accent-text">PIONEER ORANGE (#f97316)</h3>
                  <p>HubSpot-style Orange — цвет высокого напряжения и действия. Используется <strong>строго дозированно</strong> для CTAs и ключевых элементов. Работает как маяк, принудительно ведя глаз к действию.</p>
                  <br />
                  <h3 className="accent-text">PROFESSIONAL BLUE (#f97316)</h3>
                  <p>Профессиональный синий — цвет доверия и технологий. Используется для акцентов, ссылок и вторичных элементов. Создает ощущение надежности и инженерной точности.</p>
                  <br />
                  <h3 className="accent-text">LIGHT BLUE (#f97316)</h3>
                  <p>Светло-синий — для градиентов и переходов. Создает ощущение чистоты воздуха и технологичности систем.</p>
                  <br />
                  <h3 style={{ color: '#FAFBFC' }}>CLEAN WHITE & LIGHT GRAYS</h3>
                  <p>Философия «White Shirt» — преобладающие светлые фоны (#FFFFFF, #FAFBFC) создают ощущение чистоты, стерильности и технологичности. Это не просто стиль — это маркер премиальности.</p>
                </div>
                <div className="placeholder-box" style={{ padding: 0, overflow: 'hidden', border: '2px solid #f97316' }}>
                  <img
                    src="/u1.png"
                    alt="Main Screen Screenshot"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }}
                    onClick={() => openImage('/u1.png')}
                    loading={currentIndex2 === 3 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Слайд 5: Контраст Hero / Light Sections */}
          <div className={`slide-container ${currentIndex2 === 4 ? 'active' : ''}`}>
            <div className="slide-content" style={{ padding: 0, display: 'grid', gridTemplateColumns: '45% 55%', height: '100%' }}>
              <div style={{ padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 className="slide-title" style={{ marginLeft: '-20px' }}>3B. КОНТРАСТ: ТЕМНЫЙ HERO → СВЕТЛЫЕ СЕКЦИИ</h2>
                <h3 className="accent-text">ПСИХОЛОГИЯ ПЕРЕХОДА</h3>
                <p>Первый экран — темный (Dark Navy #161C24) с эффектом Aurora. Это создает <strong>WOW-эффект</strong> и драматизм.</p>
                <br />
                <p><strong>Затем плавный переход в светлые секции</strong> — это метафора перехода от «проблемы» (темнота, холод) к «решению» (свет, чистота, технологии).</p>
                <p style={{ marginTop: '20px', borderLeft: '3px solid #f97316', paddingLeft: '15px' }}><em>Этим мы подсознательно говорим: «Мы берем вашу проблему (темнота) и превращаем ее в идеальный комфорт (свет)».</em></p>
              </div>
              <div style={{ background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <div className="placeholder-box" style={{ padding: 0, overflow: 'hidden', border: '2px solid #f97316' }}>
                  <img
                    src="/u2.png"
                    alt="Transition Screenshot"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }}
                    onClick={() => openImage('/u2.png')}
                    loading={currentIndex2 === 4 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Слайд 6: Aurora Effect */}
          <div className={`slide-container ${currentIndex2 === 5 ? 'active' : ''}`}>
            <div className="slide-content">
              <h2 className="slide-title">3C. AURORA EFFECT: МЕТАФОРА ИДЕАЛЬНОГО КОМФОРТА</h2>
              <div className="tiled-content">
                <div className="tile">
                  <div className="icon"><i className="fa-solid fa-snowflake"></i></div>
                  <h3>ВИЗУАЛЬНАЯ МЕТАФОРА</h3>
                  <p>Северное сияние — это образ <span className="mono-text">идеального, чистого, природного холода</span>. Это не просто декорация — это подсознательный сигнал о качестве воздуха и систем.</p>
                </div>
                <div className="tile">
                  <div className="icon"><i className="fa-solid fa-palette"></i></div>
                  <h3>ДИНАМИЧЕСКИЙ ПЕРЕЛИВ</h3>
                  <p>Анимация Aurora создает ощущение <strong>живого, дышащего</strong> пространства. Это не статичный сайт — это интерактивный опыт, который говорит о технологичности компании.</p>
                </div>
                <div className="tile">
                  <div className="icon"><i className="fa-solid fa-star"></i></div>
                  <h3>УНИКАЛЬНОСТЬ</h3>
                  <p>95% конкурентов используют скучные градиенты. Aurora эффект <strong>мгновенно отстраивает</strong> вас от рынка и создает незабываемый brand recall.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Слайд 7: Маскот */}
          <div className={`slide-container ${currentIndex2 === 6 ? 'active' : ''}`}>
            <div className="slide-content" style={{ padding: 0, display: 'grid', gridTemplateColumns: '45% 55%', height: '100%' }}>
              <div style={{ padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 className="slide-title" style={{ marginLeft: '-20px' }}>4. МАСКОТ: BRAND RECALL & ДОВЕРИЕ</h2>
                <h3 className="accent-text">THE BEAR (Медведь)</h3>
                <p>Мы вводим персонажа — Медведя в экипировке Pioneer. Но это не мультяшка, а <strong>профессиональный профи</strong>.</p>
                <br />
                <p><strong>Психология:</strong> Медведь ассоциируется с силой, надежностью и защитой. В контексте HVAC это создает ощущение, что ваш дом под <strong>надежной защитой</strong>.</p>
                <ul style={{ marginTop: '15px' }}>
                  <li><strong>Brand Recall:</strong> «Позвони тем ребятам с медведем» — мгновенная узнаваемость.</li>
                  <li><strong>Доверие:</strong> Персонаж создает эмоциональную связь и человезирует бренд.</li>
                </ul>
              </div>
              <div style={{ background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <div className="placeholder-box" style={{ padding: 0, overflow: 'hidden', border: '2px solid #f97316' }}>
                  <img
                    src="/u3.png"
                    alt="Mascot Screenshot"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }}
                    onClick={() => openImage('/u3.png')}
                    loading={currentIndex2 === 6 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Слайд 8: Typography */}
          <div className={`slide-container ${currentIndex2 === 7 ? 'active' : ''}`}>
            <div className="slide-content">
              <h2 className="slide-title">5. ТИПОГРАФИКА: ГОЛОС ПРЕМИУМА</h2>
              <div className="tiled-content">
                <div className="tile">
                  <div className="icon"><i className="fa-solid fa-text-height"></i></div>
                  <h3>CLEAN SANS-SERIF</h3>
                  <p>Используем <span className="mono-text">Outfit</span> — современный sans-serif без засечек. Это шрифт премиальных брендов, который транслирует <strong>чистоту и профессионализм</strong>.</p>
                </div>
                <div className="tile">
                  <div className="icon"><i className="fa-solid fa-font"></i></div>
                  <h3>ИЕРАРХИЯ</h3>
                  <p>Четкая типографическая иерархия с крупными заголовками и читаемым body text. Мы не кричим — мы <strong>уверенно заявляем</strong> о качестве.</p>
                </div>
                <div className="tile">
                  <div className="icon"><i className="fa-solid fa-calculator"></i></div>
                  <h3>ПРОСТРАНСТВО</h3>
                  <p>Философия «White Shirt» — <strong>ample spacing</strong> (просторные отступы). Это не экономия места — это демонстрация уверенности и премиальности.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Слайд 9: Аватар клиента */}
          <div className={`slide-container ${currentIndex2 === 8 ? 'active' : ''}`}>
            <div className="slide-content">
              <h2 className="slide-title">6. ДЛЯ КОГО МЫ ЭТО ДЕЛАЕМ? (AVATAR)</h2>
              <div className="persona-card">
                <div className="persona-icon"><i className="fa-solid fa-user-shield"></i></div>
                <div>
                  <h3 className="accent-text" style={{ fontSize: '32px' }}>ВЛАДЕЛЕЦ ЭЛИТНОЙ НЕДВИЖИМОСТИ IRVINE</h3>
                  <p className="mono-text" style={{ marginBottom: '20px' }}>ПСИХОЛОГИЧЕСКИЙ ПОРТРЕТ</p>
                  <ul>
                    <li><strong>Ценности:</strong> Время, Приватность, Безопасность и Качество. Цена вторична, если закрыты риски.</li>
                    <li><strong>Главный страх:</strong> «Придет частник, наследит, испортит дорогой интерьер и исчезнет».</li>
                    <li><strong>Чего хочет:</strong> Он ищет «Институцию», которой можно делегировать проблему целиком. Хочет заплатить один раз и забыть.</li>
                    <li><strong>Локация:</strong> Irvine, CA — один из самых премиальных районов Калифорнии. Клиент привык к качеству.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Слайд 10: Элементы доверия */}
          <div className={`slide-container ${currentIndex2 === 9 ? 'active' : ''}`}>
            <div className="slide-content">
              <h2 className="slide-title">7. ЭЛЕМЕНТЫ ДОВЕРИЯ: УБИВАЕМ НЕИЗВЕСТНОСТЬ</h2>
              <div className="two-column">
                <div>
                  <h3 className="accent-text">RATINGS & REVIEWS</h3>
                  <p>Секция «Our Reputation Speaks» с реальными рейтингами (Google, Facebook, Yelp, Angi). Мы не скрываем отзывы — мы их <strong>гордо демонстрируем</strong>.</p>
                  <br />
                  <h3 className="accent-text">TRUST BADGES</h3>
                  <p>500+ Reviews, Licensed & Insured, 24/7 Service — визуальные бейджи доверия, размещенные стратегически.</p>
                  <br />
                  <h3 className="accent-text">COMPLETED PROJECTS</h3>
                  <p>Галерея завершенных проектов с реальными фотографиями установок HVAC и Solar. Доказательство опыта и качества.</p>
                </div>
                <div className="placeholder-box" style={{ padding: 0, overflow: 'hidden', border: '2px solid #f97316' }}>
                  <img
                    src="/u4.png"
                    alt="Sections Screenshot"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }}
                    onClick={() => openImage('/u4.png')}
                    loading={currentIndex2 === 9 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Слайд 11: Интерактивность */}
          <div className={`slide-container ${currentIndex2 === 10 ? 'active' : ''}`}>
            <div className="slide-content">
              <h2 className="slide-title">8. ИНТЕРАКТИВНОСТЬ: СОВРЕМЕННЫЕ ТЕХНОЛОГИИ</h2>
              <div className="two-column tiled">
                <div>
                  <h3 className="accent-text"><i className="fa-solid fa-question-circle"></i> QUIZ SECTION</h3>
                  <p>Интерактивный опросник для персонализации рекомендаций. Это не просто форма — это <strong>демонстрация технологичности</strong>.</p>
                  <p style={{ marginTop: '15px' }}>Клиент видит, что компания использует современные инструменты для понимания его потребностей.</p>
                </div>
                <div>
                  <h3 className="accent-text"><i className="fa-solid fa-rocket"></i> GSAP ANIMATIONS</h3>
                  <p>Плавные, профессиональные анимации при скролле. Это не «дешевые» эффекты — это <strong>премиальный UX</strong>, который говорит о внимании к деталям.</p>
                  <p style={{ marginTop: '15px' }}>Каждая секция появляется с анимацией, создавая ощущение дорогого, продуманного продукта.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Слайд 12: Структура сайта */}
          <div className={`slide-container ${currentIndex2 === 11 ? 'active' : ''}`}>
            <div className="slide-content">
              <h2 className="slide-title">9. СТРУКТУРА: ЛОГИКА ПРЕМИУМА</h2>
              <p style={{ marginBottom: '30px' }}>Каждая секция решает конкретную задачу в воронке доверия.</p>
              <div className="tiled-content">
                <div className="tile">
                  <div className="icon"><i className="fa-solid fa-home"></i></div>
                  <h3>HERO</h3>
                  <p>WOW-эффект с Aurora и Маскотом. Первое впечатление — самое важное.</p>
                </div>
                <div className="tile">
                  <div className="icon"><i className="fa-solid fa-star"></i></div>
                  <h3>RATINGS</h3>
                  <p>Немедленное доказательство качества через рейтинги и отзывы.</p>
                </div>
                <div className="tile">
                  <div className="icon"><i className="fa-solid fa-cogs"></i></div>
                  <h3>SERVICES</h3>
                  <p>Детальное описание услуг с 3D эффектами и feature lists.</p>
                </div>
                <div className="tile">
                  <div className="icon"><i className="fa-solid fa-sun"></i></div>
                  <h3>HEAT PUMPS</h3>
                  <p>Образовательный контент о современных технологиях.</p>
                </div>
                <div className="tile">
                  <div className="icon"><i className="fa-solid fa-wind"></i></div>
                  <h3>AIR QUALITY</h3>
                  <p>Демонстрация экспертизы в области качества воздуха.</p>
                </div>
                <div className="tile">
                  <div className="icon"><i className="fa-solid fa-check-circle"></i></div>
                  <h3>PROJECTS</h3>
                  <p>Портфолио завершенных проектов — доказательство опыта.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Слайд 13: Roadmap */}
          <div className={`slide-container ${currentIndex2 === 12 ? 'active' : ''}`}>
            <div className="slide-content">
              <h2 className="slide-title">10. ДОРОЖНАЯ КАРТА ПРОЕКТА</h2>
              <p style={{ marginBottom: '30px' }}>Прозрачный план действий от концепта до запуска.</p>
              <div className="roadmap-container">
                <div className="roadmap-step active">
                  <div className="roadmap-dot">01</div>
                  <h3>КОНЦЕПТ</h3>
                  <p>Утверждение визуального стиля и стратегии (Мы здесь)</p>
                </div>
                <div className="roadmap-step">
                  <div className="roadmap-dot">02</div>
                  <h3>ДИЗАЙН</h3>
                  <p>Отрисовка всех внутренних страниц и состояний</p>
                </div>
                <div className="roadmap-step">
                  <div className="roadmap-dot">03</div>
                  <h3>FRONTEND</h3>
                  <p>Верстка интерактивных макетов (React/Next.js)</p>
                </div>
                <div className="roadmap-step">
                  <div className="roadmap-dot">04</div>
                  <h3>BACKEND</h3>
                  <p>Разработка админки и подключение функционала</p>
                </div>
                <div className="roadmap-step">
                  <div className="roadmap-dot">05</div>
                  <h3>ЗАПУСК</h3>
                  <p>Наполнение контентом, тестирование и релиз</p>
                </div>
              </div>
            </div>
          </div>

          {/* Слайд 14: Итоговый аргумент */}
          <div className={`slide-container ${currentIndex2 === 13 ? 'active' : ''}`}>
            <div className="slide-content" style={{ textAlign: 'center', padding: '40px 60px' }}>
              <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <p className="mono-text" style={{ marginBottom: '15px', fontSize: '18px' }}>// ФИНАЛЬНЫЙ ВЫВОД</p>
                <h1 style={{ fontSize: '48px', marginBottom: '30px', lineHeight: '1.1' }}>ЭТОТ ДИЗАЙН РЕШАЕТ ОДНУ ЗАДАЧУ:<br /><span className="accent-text">ОБОСНОВАНИЕ ВАШЕГО ПРЕМИУМА</span></h1>
                <div style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto', background: 'rgba(249,115,22,0.1)', padding: '30px', border: '1px solid #f97316' }}>
                  <p style={{ fontSize: '20px', color: '#fff', marginBottom: '15px' }}><strong>Вопрос клиента:</strong> «Почему установка стоит $15,000, а у соседа $8,000?»</p>
                  <p style={{ fontSize: '20px', color: '#cbd5e1' }}><strong>Ответ дизайна:</strong> «Потому что вы нанимаете не бригаду с инструментами, а <u>Премиального Сервисного Партнера</u> с технологиями Aurora, гарантиями и протоколами чистоты».</p>
                </div>
                <div style={{ marginTop: '25px', padding: '20px', border: '1px solid #f97316', background: 'rgba(249,115,22,0.1)' }}>
                  <p style={{ fontSize: '18px', color: '#cbd5e1' }}><strong>Философия «White Shirt»:</strong> Чистота, Профессионализм, Технологии. Это не просто стиль — это <span className="accent-text">ваша ДНК</span>.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* UI Кнопки навигации для второго слайдера */}
        <div className="pres-counter" style={{ position: 'absolute', bottom: '30px', left: '30px' }}>
          <span className="current-slide">{String(currentIndex2 + 1).padStart(2, '0')}</span> / <span>{totalSlides2}</span>
        </div>
        <div className="pres-controls" style={{ position: 'absolute', bottom: '30px', right: '30px' }}>
          <button className="pres-btn" onClick={prevSlide2}><i className="fa-solid fa-chevron-left"></i></button>
          <button className="pres-btn" onClick={nextSlide2}><i className="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>

      {/* Кнопка просмотра всего проекта - после второго слайдера */}
      <div style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '20px auto 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100
      }}>
        <button
          onClick={() => openImage('/example2-new.png')}
          style={{
            background: '#f97316',
            border: '2px solid #f97316',
            color: '#000',
            padding: '12px 32px',
            fontSize: '14px',
            fontFamily: 'Oswald, sans-serif',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.25)',
            letterSpacing: '1px',
            borderRadius: '4px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.color = '#f97316';
            e.currentTarget.style.borderColor = '#f97316';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(249, 115, 22, 0.4)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f97316';
            e.currentTarget.style.color = '#000';
            e.currentTarget.style.borderColor = '#f97316';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(249, 115, 22, 0.25)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
        >
          <i className="fa-solid fa-expand" style={{ fontSize: '14px' }}></i>
          Просмотреть весь проект
        </button>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={allImages}
        controller={{ closeOnBackdropClick: true }}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
      />
    </>
  );
};
