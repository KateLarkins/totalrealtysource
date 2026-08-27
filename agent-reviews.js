(function () {
  'use strict';
  const params = new URLSearchParams(location.search);
  const slug = params.get('agent') || 'lynda-climer';
  const profiles = window.TRS_AGENT_PROFILES || {};
  const allReviews = window.TRS_TESTIMONIALS || {};
  const profile = profiles[slug] || profiles['lynda-climer'];
  const clean = function (value) { return String(value || '').trim(); };
  const reviews = (allReviews[slug] || []).slice().sort(function (a, b) {
    return String(b[3] || '').localeCompare(String(a[3] || ''));
  });

  document.title = profile.name + ' Client Reviews | Total Realty Source';
  document.querySelector('meta[name="description"]')?.setAttribute('content', 'Read client testimonials for ' + profile.name + ', a Total Realty Source real estate professional serving West Tennessee.');
  document.getElementById('review-agent-crumb').textContent = profile.name + ' Reviews';
  document.getElementById('review-agent-name').textContent = profile.name;
  document.getElementById('review-agent-role').textContent = profile.role;
  const photo = document.getElementById('review-agent-photo');
  photo.src = profile.photo;
  photo.alt = profile.name + ', ' + profile.role;
  const contact = document.getElementById('review-contact-link');
  contact.href = 'contact.html?agent=' + encodeURIComponent(profile.name);
  contact.textContent = 'Contact ' + profile.name.split(' ')[0];
  const profileLink = document.getElementById('review-profile-link');
  profileLink.href = profile.profile;
  document.getElementById('review-count').textContent = reviews.length + (reviews.length === 1 ? ' review' : ' reviews');
  document.getElementById('write-review-intro').textContent = 'We appreciate you taking the time to fill out a testimonial. Thanks for choosing ' + profile.name + ' as your agent!';

  const contactForm = document.getElementById('reviews-contact-form');
  const defaultMessage = "I'm interested in working with " + profile.name + '.';
  document.getElementById('reviews-contact-heading').textContent = 'Contact ' + profile.name;
  contactForm.querySelector('textarea').value = defaultMessage;
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const form = event.currentTarget;
    const button = form.querySelector('button[type="submit"]');
    const status = document.getElementById('reviews-contact-status');
    const data = new FormData(form);
    button.disabled = true;
    status.textContent = 'Sending your message…';
    fetch('https://total-realty-source-api.total-realty-source.workers.dev/api/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        agent: slug,
        name: clean(data.get('name')),
        phone: clean(data.get('phone')),
        email: clean(data.get('email')),
        message: clean(data.get('message')),
        website: clean(data.get('website'))
      })
    }).then(async function (response) {
      const result = await response.json().catch(function () { return {}; });
      if (!response.ok) throw new Error(result.error || 'Message could not be sent.');
      form.reset();
      form.querySelector('textarea').value = defaultMessage;
      status.textContent = 'Your message was sent privately to ' + profile.name + '.';
    }).catch(function (error) {
      const phone = profile.phone ? ' Please call ' + profile.phone + '.' : '';
      status.textContent = String(error.message || 'Message could not be sent').replace(/[.!?]+$/, '') + '.' + phone;
    }).finally(function () {
      button.disabled = false;
    });
  });

  const reviewForm = document.getElementById('write-review-form');
  reviewForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const form = event.currentTarget;
    const button = form.querySelector('button[type="submit"]');
    const status = document.getElementById('write-review-status');
    const data = new FormData(form);
    button.disabled = true;
    status.textContent = 'Submitting your testimonial…';
    fetch('https://total-realty-source-api.total-realty-source.workers.dev/api/review', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        agent: slug,
        name: clean(data.get('name')),
        email: clean(data.get('email')),
        rating: clean(data.get('rating')),
        review: clean(data.get('review')),
        website: clean(data.get('website'))
      })
    }).then(async function (response) {
      const result = await response.json().catch(function () { return {}; });
      if (!response.ok) throw new Error(result.error || 'Your testimonial could not be submitted.');
      form.reset();
      status.textContent = 'Thank you. Your testimonial was sent to Total Realty Source for review.';
    }).catch(function (error) {
      status.textContent = String(error.message || 'Your testimonial could not be submitted').replace(/[.!?]+$/, '') + '. Please try again later.';
    }).finally(function () {
      button.disabled = false;
    });
  });

  const grid = document.getElementById('reviews-all-grid');
  if (!reviews.length) {
    grid.innerHTML = '<p class="reviews-empty">No public client testimonials are available yet.</p>';
    return;
  }
  reviews.forEach(function (review) {
    const card = document.createElement('article');
    card.className = 'reviews-all-card';
    const stars = document.createElement('div');
    stars.className = 'reviews-all-stars';
    stars.setAttribute('aria-label', 'Five-star review');
    stars.textContent = '★★★★★';
    const quote = document.createElement('blockquote');
    quote.textContent = review[0];
    const person = document.createElement('cite');
    person.textContent = '— ' + review[1];
    card.append(stars, quote, person);
    if (review[3]) {
      const time = document.createElement('time');
      time.dateTime = review[3];
      time.textContent = new Date(review[3] + 'T12:00:00').toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'});
      card.appendChild(time);
    }
    grid.appendChild(card);
  });
}());
