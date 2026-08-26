(function () {
  'use strict';
  const clean = value => String(value || '').replace(/\s+/g, ' ').trim().slice(0, 120);
  const publish = (eventName, details) => {
    const payload = Object.assign({event:'trs_lead_interaction',interaction:eventName,page_path:location.pathname}, details || {});
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    window.dispatchEvent(new CustomEvent('trs:lead-interaction', {detail:payload}));
    try {
      const key='trs_lead_event_counts';
      const counts=JSON.parse(sessionStorage.getItem(key)||'{}');
      counts[eventName]=(counts[eventName]||0)+1;
      sessionStorage.setItem(key,JSON.stringify(counts));
    } catch (_) {}
  };
  document.addEventListener('click', event => {
    const target=event.target.closest('a,button,[data-modal]');
    if (!target) return;
    const href=target.getAttribute('href')||'';
    const label=clean(target.getAttribute('aria-label')||target.textContent);
    if (href.startsWith('tel:')) publish('phone_click',{link_text:label});
    else if (href.startsWith('mailto:')) publish('email_click',{link_text:label});
    else if (/google\.com\/maps|maps\.apple\.com/i.test(href)) publish('directions_click',{link_text:label});
    else if (/contact\.html/i.test(href)) publish('contact_intent',{link_text:label});
    if (target.matches('[data-modal],.card[data-modal]')) publish('listing_open',{listing:clean(target.dataset.modal)});
    if (/save|heart/i.test(`${target.className} ${label}`)) publish('property_save',{link_text:label});
  });
  document.addEventListener('submit', event => {
    const form=event.target;
    if (form instanceof HTMLFormElement && /contact|agent/i.test(`${form.id} ${form.className} ${form.action}`)) publish('contact_form_submit',{form_name:clean(form.id||form.getAttribute('name')||'contact')});
  });
  window.trsTrackLeadInteraction=publish;
})();
