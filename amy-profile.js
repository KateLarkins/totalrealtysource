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
        const addressSource = card.querySelector('.address');
        const addressLines = (addressSource?.innerHTML || '').split(/<br\s*\/?\s*>/i).map(clean).filter(Boolean);
        const address = document.createElement('span');
        address.className = 'agent-property-address';
        const street = document.createElement('span');
        street.textContent = addressLines[0] || clean(addressSource?.textContent);
        address.appendChild(street);
        if (addressLines.length > 1) {
          const locality = document.createElement('span');
          locality.textContent = addressLines.slice(1).join(', ');
          address.appendChild(locality);
        }
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
    const form=event.currentTarget,button=form.querySelector('button[type="submit"]'),status=document.getElementById('amy-contact-status'),data=new FormData(form);
    button.disabled=true;status.textContent='Sending your message…';
    fetch('https://total-realty-source-api.total-realty-source.workers.dev/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({agent:'amy-mclemore',name:clean(data.get('name')),phone:clean(data.get('phone')),email:clean(data.get('email')),message:clean(data.get('message')),website:clean(data.get('website'))})})
      .then(async response=>{const result=await response.json().catch(()=>({}));if(!response.ok)throw new Error(result.error||'Message could not be sent.');form.reset();form.querySelector('textarea').value="I'm interested in working with Amy McLemore.";status.textContent='Your message was sent privately to Amy McLemore.';})
      .catch(error=>{status.textContent=`${String(error.message||'Load failed').replace(/[.!?]+$/,'')}. Please call 731-234-0049.`;})
      .finally(()=>{button.disabled=false;});
  });

  document.getElementById('share-amy-profile')?.addEventListener('click', async () => {
    const shareUrl = 'https://totalrealtysource.com/amy-mclemore.html';
    const shareData = {title:'REALTOR® Amy McLemore', text:'Meet REALTOR® Amy McLemore with Total Realty Source.', url:shareUrl};
    try { if (navigator.share) await navigator.share(shareData); else throw new Error('Native sharing unavailable'); }
    catch (error) { if (error?.name === 'AbortError') return; try { await navigator.clipboard.writeText(shareUrl); alert('Agent profile link copied.'); } catch (_) { prompt('Copy this agent profile link:', shareUrl); } }
  });

  const reviewCarousel = document.querySelector('#reviews .agent-review-grid');
  const reviewPrevious = document.querySelector('[data-amy-review="previous"]');
  const reviewNext = document.querySelector('[data-amy-review="next"]');
  const reviewCards = Array.from(reviewCarousel.querySelectorAll('.agent-review-card'));
  let reviewStart = 0;
  const updateReviewArrows = () => {
    reviewCards.forEach((card, index) => { card.hidden = index < reviewStart || index >= reviewStart + 4; });
    reviewPrevious.classList.toggle('is-hidden', reviewStart === 0);
    reviewNext.classList.toggle('is-hidden', reviewStart + 4 >= reviewCards.length);
  };
  const moveReviews = direction => {
    reviewStart = direction > 0 ? Math.min(reviewStart + 2, Math.max(0, reviewCards.length - 4)) : Math.max(0, reviewStart - 2);
    updateReviewArrows();
  };
  document.querySelectorAll('[data-amy-review]').forEach(button => button.addEventListener('click', () => {
    moveReviews(button.dataset.amyReview === 'next' ? 1 : -1);
  }));
  let reviewWheelReady = true;
  reviewCarousel.addEventListener('wheel', event => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 12 || !reviewWheelReady) return;
    event.preventDefault();
    reviewWheelReady = false;
    moveReviews(event.deltaX > 0 ? 1 : -1);
    setTimeout(() => { reviewWheelReady = true; }, 350);
  }, {passive:false});
  let reviewTouchX = 0;
  reviewCarousel.addEventListener('touchstart', event => { reviewTouchX = event.touches[0]?.clientX || 0; }, {passive:true});
  reviewCarousel.addEventListener('touchend', event => { const endX = event.changedTouches[0]?.clientX || reviewTouchX; const distance = reviewTouchX - endX; if (Math.abs(distance) > 45) moveReviews(distance > 0 ? 1 : -1); }, {passive:true});
  requestAnimationFrame(updateReviewArrows);

  loadListings();
})();
