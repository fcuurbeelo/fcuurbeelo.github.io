/* ==========================================================================
   Francisco Curbelo - Interacciones
   ========================================================================== */

(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  const header = document.querySelector('.site-header');
  const navLinks = Array.from(document.querySelectorAll('.nav__list a'));
  const yearEl = document.querySelector('[data-year]');
  const progressBar = document.querySelector('[data-progress-bar]');
  const progressDots = Array.from(document.querySelectorAll('[data-progress-dot]'));
  const sections = Array.from(document.querySelectorAll('main section'));
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  const typedEl = document.querySelector('[data-typed]');
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileCloses = Array.from(document.querySelectorAll('[data-mobile-close]'));
  const mobileLinks = Array.from(document.querySelectorAll('.mobile-nav__list a'));
  const copyBtn = document.querySelector('[data-copy]');
  const langBtns = Array.from(document.querySelectorAll('.lang-switch__btn, .mobile-nav__lang .lang-switch__btn'));

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const translations = {
    es: {
      'nav.about': 'Sobre mí',
      'nav.journey': 'Formación y experiencia',
      'nav.projects': 'Proyectos',
      'nav.contact': 'Contacto',
      'hero.role': '— Desarrollador de software',
      'hero.intro': 'Estudiante de CFGS DAM en IES Lomo de la Herradura. Enfocado en lógica backend, bases de datos relacionales y desarrollo de aplicaciones.',
      'hero.cta': 'Contacto',
      'about.lead': 'Soy Francisco Curbelo, desarrollador en formación con ganas de construir soluciones prácticas con código claro.',
      'about.p1': 'Base en Java, PHP, SQL y desarrollo web. Me centro en lógica, estructuras de datos y arquitectura ordenada.',
      'about.p2': 'En IES Lomo de la Herradura trabajo con Java para sistemas de gestión y diseño de bases de datos relacionales. En Fraemma participé en la migración y desarrollo de un ERP/CRM privado con PHP y Laravel (aplicación interna, backend, funcionalidades internas, bases de datos y lógica).',
      'about.p3': 'Busco una oportunidad junior para seguir creciendo como Full Stack Developer, aportando soluciones útiles y aprendiendo cada día.'
    },
    en: {
      'nav.about': 'About',
      'nav.journey': 'Education & Experience',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact',
      'hero.role': '— Software Developer',
      'hero.intro': 'CFGS DAM student at IES Lomo de la Herradura. Focused on backend logic, relational databases and application development.',
      'hero.cta': 'Contact',
      'about.lead': "I'm Francisco Curbelo, a developer in training eager to build practical solutions with clean code.",
      'about.p1': 'Focus on Java, PHP, SQL and web development. I care about logic, data structures and clean architecture.',
      'about.p2': 'At IES Lomo de la Herradura I work with Java for management systems and relational database design. At Fraemma I took part in migrating and developing a private ERP/CRM with PHP and Laravel (internal app, backend, internal features, databases and logic).',
      'about.p3': 'Looking for a junior opportunity to grow as a Full Stack Developer, adding value while learning every day.'
    }
  };

  const applyLang = (lang) => {
    const dict = translations[lang] || translations.es;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      if (el.classList.contains('no-translate')) return;
      const key = el.dataset.i18n;
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('.no-translate').forEach((el) => {
      // keep original
    });
    langBtns.forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    document.documentElement.lang = lang;
    try { localStorage.setItem('lang', lang); } catch (e) {}
  };

  langBtns.forEach((btn) => btn.addEventListener('click', () => applyLang(btn.dataset.lang)));
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'es') applyLang(saved);
  } catch (e) {}

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const updateProgress = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    const ratio = Math.min(1, Math.max(0, window.scrollY / max));
    if (progressBar) progressBar.style.height = ratio * 100 + '%';
    const total = sections.length;
    if (total === 0) return;
    const index = Math.min(total - 1, Math.floor(ratio * total + 0.4));
    progressDots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });

  const updateNav = () => {
    const offset = window.scrollY + 200;
    let current = sections[0] ? sections[0].id : null;
    for (const section of sections) {
      if (section.offsetTop <= offset) current = section.id;
    }
    navLinks.forEach((link) => {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('is-active', href === '#' + current);
    });
    mobileLinks.forEach((link) => {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('is-active', href === '#' + current);
    });
  };
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach((el) => {
      el.style.transitionDelay = (Array.from(revealEls).indexOf(el) % 6) * 80 + 'ms';
      obs.observe(el);
    });
  } else {
    revealEls.forEach((el, idx) => {
      el.style.transitionDelay = (idx % 6) * 80 + 'ms';
      el.classList.add('is-in');
    });
  }

  const words = ['Full Stack Developer', 'Java · PHP · Laravel', 'SQL · PostgreSQL · MySQL', 'Git · GitHub'];
  if (typedEl && !reduceMotion.matches) {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const type = () => {
      const word = words[wordIndex];
      if (!deleting) {
        typedEl.textContent = word.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === word.length) {
          deleting = true;
          setTimeout(type, 1400);
          return;
        }
        setTimeout(type, 70);
        return;
      }
      typedEl.textContent = word.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 40);
    };
    type();
  } else if (typedEl) {
    typedEl.textContent = words[0];
  }

  const setMobileOpen = (open) => {
    if (!mobileNav || !navToggle) return;
    mobileNav.classList.toggle('is-open', open);
    mobileNav.setAttribute('aria-hidden', String(!open));
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  if (navToggle) navToggle.addEventListener('click', () => setMobileOpen(!mobileNav.classList.contains('is-open')));
  mobileCloses.forEach((el) => el.addEventListener('click', () => setMobileOpen(false)));
  mobileLinks.forEach((link) => link.addEventListener('click', () => setMobileOpen(false)));

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const target = document.getElementById(copyBtn.dataset.copy || '');
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target.textContent.replace(/\n/g, '\n'));
        const prev = copyBtn.textContent;
        copyBtn.textContent = 'Copiado';
        setTimeout(() => (copyBtn.textContent = prev), 1400);
      } catch (e) {}
    });
  }

  const demoOpeners = Array.from(document.querySelectorAll('[data-demo-open]'));
  const demoClosers = Array.from(document.querySelectorAll('[data-demo-close]'));
  const demoModals = Array.from(document.querySelectorAll('.demo-modal'));

  const setDemoOpen = (id, open) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.toggle('is-open', open);
    modal.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  demoOpeners.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setDemoOpen(btn.dataset.demoOpen, true);
      initGestorDemo();
    });
  });
  demoClosers.forEach((btn) => btn.addEventListener('click', () => {
    demoModals.forEach((m) => {
      m.classList.remove('is-open');
      m.setAttribute('aria-hidden', 'true');
    });
    document.body.style.overflow = '';
  }));
  demoModals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('demo-modal__backdrop')) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  });

  let gestorState = null;
  const initGestorDemo = () => {
    const root = document.getElementById('gestor-sim');
    if (!root) return;
    const screen = root.querySelector('[data-gestor-screen]');
    const input = root.querySelector('[data-gestor-input]');
    const send = root.querySelector('[data-gestor-send]');
    const reset = root.querySelector('[data-gestor-reset]');
    if (!screen || !input) return;

    const alumnos = [];
    const state = {
      mode: 'menu',
      sub: null,
      temp: {}
    };
    gestorState = state;

    const print = (text) => {
      const div = document.createElement('div');
      div.className = 'demo-terminal__line';
      div.textContent = text;
      screen.appendChild(div);
      screen.scrollTop = screen.scrollHeight;
    };
    const printBlank = () => {
      const div = document.createElement('div');
      div.className = 'demo-terminal__line demo-terminal__line--blank';
      div.textContent = ' ';
      screen.appendChild(div);
    };

    const showMenu = () => {
      state.mode = 'menu';
      state.sub = null;
      state.temp = {};
      printBlank();
      print('==================================');
      print('        GESTOR DE ALUMNOS');
      print('==================================');
      printBlank();
      print('1. Añadir alumno');
      print('2. Ver alumnos');
      print('3. Eliminar alumnos');
      print('4. Contar aprobados y suspendidos');
      print('5. Calcular media');
      print('6. Salir');
      printBlank();
      print('Seleccione una opción:');
      input.placeholder = '1-6';
      input.value = '';
    };

    const show = () => {
      screen.innerHTML = '';
      showMenu();
    };

    const handle = (val) => {
      const v = val.trim();
      if (!v) return;

      if (state.mode === 'menu') {
        const n = Number(v);
        if (n < 1 || n > 6) {
          print('Opción no válida.');
          showMenu();
          return;
        }
        if (n === 1) {
          state.mode = 'add';
          state.step = 'name';
          printBlank();
          print('--- NUEVO ALUMNO ---');
          print('Introduzca el nombre del alumno:');
          input.placeholder = 'Nombre';
          input.value = '';
          return;
        }
        if (n === 2) {
          state.mode = 'view';
          state.sub = 'menu';
          printBlank();
          print('------ CONSULTA DE ALUMNOS ------');
          print('1. Mostrar todos los alumnos');
          print('2. Buscar alumno por nombre');
          print('3. Buscar alumno por nota');
          print('4. Volver al menú');
          printBlank();
          print('Seleccione una opción:');
          input.placeholder = '1-4';
          input.value = '';
          return;
        }
        if (n === 3) {
          state.mode = 'del';
          state.sub = 'menu';
          printBlank();
          print('------ ELIMINAR ALUMNOS ------');
          print('1. Eliminar alumno por nombre');
          print('2. Eliminar alumno por nota');
          print('3. Volver al menú');
          printBlank();
          print('Seleccione una opción:');
          input.placeholder = '1-3';
          input.value = '';
          return;
        }
        if (n === 4) {
          printBlank();
          print('--- APROBADOS Y SUSPENDIDOS ---');
          if (alumnos.length === 0) {
            print('No hay alumnos registrados.');
          } else {
            let ap = 0, sus = 0;
            alumnos.forEach((a) => a.nota >= 5 ? ap++ : sus++);
            print('Aprobados: ' + ap);
            print('Suspendidos: ' + sus);
          }
          printBlank();
          showMenu();
          return;
        }
        if (n === 5) {
          printBlank();
          print('--- CALCULAR MEDIA ---');
          if (alumnos.length === 0) {
            print('No hay alumnos registrados.');
          } else {
            let sum = 0;
            alumnos.forEach((a) => (sum += a.nota));
            print('Media: ' + (sum / alumnos.length).toFixed(2));
          }
          printBlank();
          showMenu();
          return;
        }
        if (n === 6) {
          printBlank();
          print('¡Hasta luego!');
          return;
        }
        return;
      }

      if (state.mode === 'add') {
        if (state.step === 'name') {
          state.temp.name = v;
          state.step = 'note';
          print('Introduzca la nota (0-10):');
          input.placeholder = '0-10';
          input.value = '';
          return;
        }
        if (state.step === 'note') {
          const n = Number(v);
          if (isNaN(n) || n < 0 || n > 10) {
            print('La nota debe estar entre 0 y 10.');
            print('Introduzca la nota (0-10):');
            input.placeholder = '0-10';
            input.value = '';
            return;
          }
          alumnos.push({ name: state.temp.name, nota: n });
          print('Alumno añadido correctamente ✔');
          printBlank();
          showMenu();
          return;
        }
      }

      if (state.mode === 'view') {
        if (state.sub === 'menu') {
          const n = Number(v);
          if (n === 1) {
            printBlank();
            print('--- LISTADO DE ALUMNOS ---');
            if (alumnos.length === 0) print('No hay alumnos registrados.');
            else alumnos.forEach((a) => print('- ' + a.name + ' | ' + a.nota));
            printBlank();
            print('1. Mostrar todos | 2. Buscar | 3. Buscar por nota | 4. Volver');
            print('Seleccione una opción:');
            input.placeholder = '1-4';
            input.value = '';
            return;
          }
          if (n === 2) {
            state.sub = 'searchName';
            print('Ingrese el nombre del alumno a buscar:');
            input.placeholder = 'Nombre';
            input.value = '';
            return;
          }
          if (n === 3) {
            state.sub = 'searchNote';
            print('Ingrese la nota del alumno:');
            input.placeholder = '0-10';
            input.value = '';
            return;
          }
          if (n === 4) {
            showMenu();
            return;
          }
          print('Opción no válida.');
          return;
        }
        if (state.sub === 'searchName') {
          const found = alumnos.filter((a) => a.name.toLowerCase().includes(v.toLowerCase()));
          if (found.length === 0) print('No se ha encontrado ningún alumno con ese nombre');
          else found.forEach((a) => print(a.name + ' - ' + a.nota));
          printBlank();
          print('1. Mostrar todos | 2. Buscar | 3. Buscar por nota | 4. Volver');
          print('Seleccione una opción:');
          state.sub = 'menu';
          input.placeholder = '1-4';
          input.value = '';
          return;
        }
        if (state.sub === 'searchNote') {
          const n = Number(v);
          if (isNaN(n) || n < 0 || n > 10) {
            print('Nota inválida.');
            print('Ingrese la nota del alumno:');
            input.placeholder = '0-10';
            input.value = '';
            return;
          }
          const found = alumnos.filter((a) => a.nota === n);
          if (found.length === 0) print('No hay ningún alumno con esa nota');
          else found.forEach((a) => print(a.name + ' - ' + a.nota));
          printBlank();
          print('1. Mostrar todos | 2. Buscar | 3. Buscar por nota | 4. Volver');
          print('Seleccione una opción:');
          state.sub = 'menu';
          input.placeholder = '1-4';
          input.value = '';
          return;
        }
      }

      if (state.mode === 'del') {
        if (state.sub === 'menu') {
          const n = Number(v);
          if (n === 1) {
            state.sub = 'delName';
            print('Ingrese el nombre del alumno a eliminar:');
            input.placeholder = 'Nombre';
            input.value = '';
            return;
          }
          if (n === 2) {
            state.sub = 'delNote';
            print('Ingrese la nota del alumno a eliminar:');
            input.placeholder = '0-10';
            input.value = '';
            return;
          }
          if (n === 3) {
            showMenu();
            return;
          }
          print('Opción no válida.');
          return;
        }
        if (state.sub === 'delName') {
          const before = alumnos.length;
          for (let i = alumnos.length - 1; i >= 0; i--) {
            if (alumnos[i].name.toLowerCase().includes(v.toLowerCase())) alumnos.splice(i, 1);
          }
          if (alumnos.length < before) print('Alumno eliminado correctamente ✔');
          else print('No se encontró ningún alumno con ese nombre');
          printBlank();
          print('1. Eliminar por nombre | 2. Eliminar por nota | 3. Volver');
          print('Seleccione una opción:');
          state.sub = 'menu';
          input.placeholder = '1-3';
          input.value = '';
          return;
        }
        if (state.sub === 'delNote') {
          const n = Number(v);
          if (isNaN(n) || n < 0 || n > 10) {
            print('Nota inválida.');
            print('Ingrese la nota del alumno a eliminar:');
            input.placeholder = '0-10';
            input.value = '';
            return;
          }
          const before = alumnos.length;
          for (let i = alumnos.length - 1; i >= 0; i--) {
            if (alumnos[i].nota === n) alumnos.splice(i, 1);
          }
          if (alumnos.length < before) print('Alumno eliminado correctamente ✔');
          else print('No se encontró ningún alumno con esa nota');
          printBlank();
          print('1. Eliminar por nombre | 2. Eliminar por nota | 3. Volver');
          print('Seleccione una opción:');
          state.sub = 'menu';
          input.placeholder = '1-3';
          input.value = '';
          return;
        }
      }
    };

    show();
    const onSend = () => {
      handle(input.value);
      input.focus();
    };
    if (send) send.onclick = onSend;
    if (input) {
      input.onkeydown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onSend();
        }
      };
    }
    if (reset) reset.onclick = () => {
      alumnos.length = 0;
      show();
    };
    if (input) input.focus();
  };

  if (!isTouch && !reduceMotion.matches) {
    const dot = document.querySelector('.cursor-dot');
    if (dot) {
      document.body.classList.add('has-cursor');
      let mx = window.innerWidth / 2, my = window.innerHeight / 2;
      window.addEventListener('mousemove', (e) => {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate(${mx}px, ${my}px)`;
      }, { passive: true });
    }
  }

  const canvas = document.querySelector('[data-bg-canvas]');
  if (canvas && !reduceMotion.matches) {
    const ctx = canvas.getContext('2d');
    let w, h;
    const dots = [];
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      dots.length = 0;
      const count = Math.min(90, Math.floor((w * h) / 18000));
      for (let i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.6 + 0.4,
        });
      }
    };
    resize();
    window.addEventListener('resize', resize);
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(79, 155, 255, 0.22)';
        ctx.fill();
      }
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i], b = dots[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 170) {
            ctx.strokeStyle = `rgba(109, 231, 249, ${0.1 * (1 - dist / 170)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else draw();
    });
  }
})();
