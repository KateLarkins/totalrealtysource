(function () {
  const grid = document.getElementById('amy-current-listings');
  const clean = value => String(value || '').replace(/\s+/g, ' ').trim();

  async function loadListings() {
    try {
      const response = await fetch('forsale.html', {cache:'no-store'});
      if (!response.ok) throw new Error('Listings unavailable');
      const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
      const cards = [...doc.querySelectorAll('.card[data-modal]')].filter(card => {
        const modalAgent = doc.getElementById(card.dataset.modal)?.querySelector('[data-agent-name]')?.textContent;
        return clean(modalAgent || card.dataset.agent).toLowerCase() === 'amy mclemore';
      });
      if (!cards.length) {
        grid.innerHTML = '<p class="agent-empty">Amy does not have any active listings displayed right now.</p>';
        return;
      }
      grid.replaceChildren(...cards.map(card => {
        const modal = doc.getElementById(card.dataset.modal);
        const link = document.createElement('a');
        link.className = 'agent-property-card';
        link.href = `forsale.html?listing=${encodeURIComponent(card.dataset.modal)}#${encodeURIComponent(card.dataset.modal)}`;
        const image = document.createElement('img');
        image.loading = 'lazy';
        image.src = modal?.querySelector('.slide')?.getAttribute('src') || card.querySelector(':scope > img')?.getAttribute('src') || '';
        image.alt = clean(card.querySelector('.address')?.textContent) || 'Amy McLemore listing';
        const copy = document.createElement('span');
        copy.className = 'agent-property-card-copy';
        const price = document.createElement('strong');
        price.textContent = clean(card.querySelector('.price')?.textContent) || 'Contact for price';
        const stats = document.createElement('span');
        stats.textContent = [...card.querySelectorAll('.stats > div')].map(item => `${clean(item.querySelector('strong')?.textContent)} ${clean(item.querySelector('span')?.textContent)}`).join(' · ');
        const address = document.createElement('span');
        address.textContent = clean(card.querySelector('.address')?.textContent);
        const badge = document.createElement('span');
        badge.className = 'agent-property-badge';
        badge.textContent = card.dataset.mapCategory === 'land' ? 'Land for Sale' : 'For Sale';
        copy.append(price, stats, address, badge);
        link.append(image, copy);
        return link;
      }));
    } catch (_) {
      grid.innerHTML = '<p class="agent-empty">Current listings could not be loaded. Please visit the For Sale page.</p>';
    }
  }

  document.getElementById('amy-contact-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Website inquiry for Amy McLemore from ${clean(data.get('name'))}`;
    const body = `Name: ${clean(data.get('name'))}\nPhone: ${clean(data.get('phone'))}\nEmail: ${clean(data.get('email'))}\n\n${clean(data.get('message'))}`;
    document.getElementById('amy-contact-status').textContent = 'Opening your email app with this message addressed to Amy.';
    window.location.href = `mailto:amycmclemore@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  document.querySelectorAll('[data-amy-review]').forEach(button => button.addEventListener('click', () => {
    const carousel = document.querySelector('#reviews .agent-review-grid');
    carousel.scrollBy({left:button.dataset.amyReview === 'next' ? carousel.clientWidth : -carousel.clientWidth, behavior:'smooth'});
  }));

  loadListings();
})();
