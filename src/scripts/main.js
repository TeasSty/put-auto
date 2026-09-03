function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return [...root.querySelectorAll(sel)];
}

function initMenu() {
  const toggle = qs('[data-menu-toggle]');
  const nav = qs('[data-mobile-nav]');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', (e) => {
    if (e.target instanceof HTMLAnchorElement) setOpen(false);
  });
}

function initReveal() {
  const nodes = qsa('.reveal');
  if (!nodes.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodes.forEach((n) => n.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  nodes.forEach((n) => io.observe(n));
}

function buildMessage({ country, budget, body, term }) {
  return [
    'Здравствуйте! Хочу рассчитать путь авто.',
    `Страна: ${country}`,
    `Бюджет: ${budget}`,
    `Кузов: ${body}`,
    `Срок: ${term}`,
    'Подскажите ориентир по смете и следующим шагам.',
  ].join('\n');
}

function estimateText(budget) {
  if (budget.includes('до 900')) return 'экономия ориентир 150–250 тыс. ₽';
  if (budget.includes('900 000 – 1 500')) return 'экономия ориентир 150–350 тыс. ₽';
  if (budget.includes('1 500 000 – 2 500')) return 'экономия ориентир 250–450 тыс. ₽';
  return 'экономия ориентир 300–500 тыс. ₽';
}

function routeLines(country) {
  const map = {
    Япония: ['Аукцион JP', 'Ставка и выкуп', 'Владивосток', 'Иркутск · выдача'],
    Корея: ['Аукцион / рынок KR', 'Проверка и выкуп', 'Логистика', 'Иркутск · выдача'],
    Китай: ['Площадка CN', 'Проверка и выкуп', 'Забайкальск', 'Иркутск · выдача'],
  };
  return map[country] || map['Япония'];
}

function initCalc() {
  const root = qs('[data-calc]');
  if (!root) return;

  const estimate = qs('[data-calc-estimate]', root);
  const route = qs('[data-calc-route]', root);
  const wa = qs('[data-calc-wa]', root);
  const tg = qs('[data-calc-tg]', root);
  const budgetEl = qs('[data-calc-budget]', root);
  const bodyEl = qs('[data-calc-body]', root);
  const termEl = qs('[data-calc-term]', root);

  const read = () => {
    const country = qs('[data-calc-country]:checked', root)?.value || 'Япония';
    const budget = budgetEl.value;
    const body = bodyEl.value;
    const term = termEl.value;
    return { country, budget, body, term };
  };

  const render = () => {
    const data = read();
    estimate.textContent = estimateText(data.budget);
    route.innerHTML = routeLines(data.country)
      .map((line, i) => `<li><strong>${String(i + 1).padStart(2, '0')}</strong> · ${line}</li>`)
      .join('');

    const msg = buildMessage(data);
    wa.href = `https://wa.me/79501444418?text=${encodeURIComponent(msg)}`;
    tg.href = `https://t.me/putavto38`;
    tg.dataset.msg = msg;
  };

  root.addEventListener('change', render);
  tg.addEventListener('click', (e) => {
    const msg = tg.dataset.msg;
    if (!msg) return;
    // Telegram deep-link with text is unreliable for public usernames; copy helper via prompt fallback
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(msg).catch(() => {});
    }
  });

  render();
}

function initForm() {
  const form = qs('[data-lead-form]');
  if (!form) return;

  const status = qs('[data-form-status]', form);
  const submitBtn = qs('[data-submit]', form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    status.dataset.state = '';

    const fd = new FormData(form);
    if (String(fd.get('bot-field') || '').trim()) {
      status.dataset.state = 'ok';
      status.textContent = 'Заявка принята.';
      form.reset();
      return;
    }

    const name = String(fd.get('name') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    const budget = String(fd.get('budget') || '').trim();
    const message = String(fd.get('message') || '').trim();

    if (name.length < 2 || phone.length < 6) {
      status.dataset.state = 'error';
      status.textContent = 'Укажите имя и телефон.';
      return;
    }

    submitBtn.disabled = true;
    status.textContent = 'Отправляем…';

    const waText = [
      'Здравствуйте! Заявка с сайта Путь Авто.',
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      budget ? `Бюджет/модель: ${budget}` : null,
      message ? `Комментарий: ${message}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      const body = new URLSearchParams();
      for (const [k, v] of fd.entries()) body.append(k, String(v));

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!res.ok) throw new Error('netlify-form-unavailable');

      status.dataset.state = 'ok';
      status.textContent = 'Заявка отправлена. Мы свяжемся с вами.';
      form.reset();
    } catch {
      status.dataset.state = 'ok';
      status.textContent = 'Открываем WhatsApp с вашей заявкой…';
      window.location.href = `https://wa.me/79501444418?text=${encodeURIComponent(waText)}`;
    } finally {
      submitBtn.disabled = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initReveal();
  initCalc();
  initForm();
});
