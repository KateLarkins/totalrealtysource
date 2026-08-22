/*
  Listing open houses are read automatically from forsale.html cards containing
  data-open-house-start, data-open-house-end, data-open-house-description, and data-agent.
  Community/Facebook events belong in this array. Dates must include a timezone.
  Past events are automatically hidden after their end time.
  Example:
  { type: 'community', title: 'Event name', start: '2026-09-01T10:00:00-05:00',
    end: '2026-09-01T12:00:00-05:00', location: '117 S Main St, Medina, TN',
    host: 'Total Realty Source', description: 'Event details', image: 'path/to/image.jpg', url: '#' }
*/
const MANUAL_EVENTS = [];

(function () {
  const openHouseContainer = document.getElementById('open-house-events');
  const communityContainer = document.getElementById('community-events');
  const communitySection = document.getElementById('community-events-section');
  const emptyState = document.getElementById('events-empty');
  const openHouseSection = openHouseContainer.closest('.events-section');

  function dateValue(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function dayKey(date) {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(date);
  }

  function relativeBadge(start, now) {
    const today = dayKey(now);
    const tomorrow = dayKey(new Date(now.getTime() + 86400000));
    const eventDay = dayKey(start);
    if (eventDay === today) return 'Today!';
    if (eventDay === tomorrow) return 'Tomorrow';
    return '';
  }

  function formatDate(start, end) {
    const date = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    }).format(start);
    const time = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago', hour: 'numeric', minute: '2-digit'
    });
    return `${date} · ${time.format(start)}–${time.format(end)}`;
  }

  function eventMarkup(event, now) {
    const badge = relativeBadge(event.startDate, now);
    const image = event.image
      ? `<img src="${escapeAttribute(event.image)}" alt="${escapeAttribute(event.title)}" loading="lazy">`
      : '<div class="event-image-placeholder"><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 30 32 10l24 20v26H39V39H25v17H8V30Z"/><path d="M4 31 32 7l28 24"/></svg></div>';
    const action = event.url ? `<a class="event-action" href="${escapeAttribute(event.url)}">View details</a>` : '';
    return `<article class="event-card">
      <div class="event-image">${image}</div>
      <div class="event-content">
        <div class="event-label-row"><span class="event-type">${event.type === 'open-house' ? 'Open House' : 'Community Event'}</span>${badge ? `<span class="event-day-badge">${badge}</span>` : ''}</div>
        <h3>${escapeText(event.title)}</h3>
        <p class="event-date">${escapeText(formatDate(event.startDate, event.endDate))}</p>
        ${event.location ? `<p class="event-location">${escapeText(event.location)}</p>` : ''}
        <p class="event-description">${escapeText(event.description || 'Join Total Realty Source for this upcoming event.')}</p>
        <p class="event-host"><strong>Hosted by:</strong> ${escapeText(event.host || 'Total Realty Source')}</p>
        ${action}
      </div>
    </article>`;
  }

  function escapeText(value) {
    const node = document.createElement('span');
    node.textContent = String(value || '');
    return node.innerHTML;
  }

  function escapeAttribute(value) {
    return escapeText(value).replace(/`/g, '&#96;');
  }

  async function listingOpenHouses() {
    try {
      const response = await fetch('forsale.html', { cache: 'no-store' });
      if (!response.ok) return [];
      const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
      return [...doc.querySelectorAll('.card[data-open-house-start][data-open-house-end]')].map(card => {
        const modal = doc.getElementById(card.dataset.modal);
        const startDate = dateValue(card.dataset.openHouseStart);
        const endDate = dateValue(card.dataset.openHouseEnd);
        if (!startDate || !endDate) return null;
        const address = card.querySelector('.address')?.textContent.replace(/\s+/g, ' ').trim() || 'Open House';
        return {
          type: 'open-house',
          title: address,
          location: address,
          startDate,
          endDate,
          host: card.dataset.agent || modal?.querySelector('[data-agent-name]')?.textContent.trim() || 'Total Realty Source',
          description: card.dataset.openHouseDescription || 'Tour this home in person, explore its features, and ask the listing agent your questions.',
          image: card.querySelector(':scope > img')?.getAttribute('src') || '',
          url: `forsale.html?listing=${encodeURIComponent(card.dataset.modal || '')}&from=events#${encodeURIComponent(card.dataset.modal || '')}`
        };
      }).filter(Boolean);
    } catch (error) {
      return [];
    }
  }

  async function renderEvents() {
    const now = new Date();
    const manual = MANUAL_EVENTS.map(event => ({
      ...event,
      startDate: dateValue(event.start),
      endDate: dateValue(event.end)
    })).filter(event => event.startDate && event.endDate);
    const events = [...await listingOpenHouses(), ...manual]
      .filter(event => event.endDate.getTime() > now.getTime())
      .sort((a, b) => a.startDate - b.startDate);
    const openHouses = events.filter(event => event.type === 'open-house');
    const community = events.filter(event => event.type !== 'open-house');

    openHouseContainer.innerHTML = openHouses.map(event => eventMarkup(event, now)).join('');
    communityContainer.innerHTML = community.map(event => eventMarkup(event, now)).join('');
    openHouseSection.hidden = openHouses.length === 0;
    communitySection.hidden = community.length === 0;
    emptyState.hidden = events.length !== 0;
  }

  window.toggleNavDrawer = () => document.getElementById('navDrawer')?.classList.toggle('open');
  window.closeNavDrawer = () => document.getElementById('navDrawer')?.classList.remove('open');
  document.querySelectorAll('.drawer-dropdown > .drawer-link').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      link.parentElement.classList.toggle('open');
    });
  });
  renderEvents();
})();
