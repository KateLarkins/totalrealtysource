(function () {
  'use strict';

  const navMarkup = '<nav class="topnav"><div class="logo"><a href="index.html"><img src="logo.png/horizontallogo.png" alt="Total Realty Source"></a></div><div class="nav-links desktop-links"><a href="index.html" class="nav-link">Home</a><div class="dropdown-container"><a href="forsale.html" class="nav-link">For Sale ▾</a><div class="dropdown"><a href="forsale.html?type=homes" class="dropdown-item">Homes for Sale</a><a href="forsale.html?type=land" class="dropdown-item">Land for Sale</a><a href="forsale.html?type=other" class="dropdown-item">Other Properties</a><a href="forsale.html?saved=1" class="dropdown-item">Saved Homes</a></div></div><a href="events.html" class="nav-link">Events</a><a href="about.html" class="nav-link">Agents</a><a href="contact.html" class="nav-link">Contact</a></div><button class="nav-arrow mobile-arrow" type="button" aria-label="Open navigation">☰</button></nav><div class="nav-drawer" id="navDrawer"><button class="drawer-back" type="button">← Back</button><a href="index.html" class="drawer-link">Home</a><div class="drawer-dropdown"><a href="forsale.html" class="drawer-link">For Sale ▾</a><div class="drawer-submenu"><a href="forsale.html?type=homes" class="drawer-link">Homes for Sale</a><a href="forsale.html?type=land" class="drawer-link">Land for Sale</a><a href="forsale.html?type=other" class="drawer-link">Other Properties</a><a href="forsale.html?saved=1" class="drawer-link">Saved Homes</a></div></div><a href="events.html" class="drawer-link">Events</a><a href="about.html" class="drawer-link">Agents</a><a href="contact.html" class="drawer-link">Contact</a></div>';
  const footerMarkup = `<footer class="agent-footer" style="background:#023E6C;color:#fff;font-family:'Lora',serif;"><div style="max-width:1500px;margin:0 auto;padding:70px 50px 55px;display:flex;flex-wrap:wrap;gap:70px;width:100%;"><div style="flex:1.3;min-width:280px;"><h2 style="margin:0 0 20px;font-family:'Bodoni Moda',serif;">Total Realty Source</h2><p style="line-height:1.8;max-width:460px;">Providing buyer representation, seller representation, residential and commercial property services, land and acreage searches, rentals, property management, and renovation services across West Tennessee.</p><div style="display:flex;gap:20px;align-items:center;justify-content:center;margin-top:24px;flex-wrap:wrap;"><img src="Logos/546-5466842_realtor-mls-logo-no-background-hd-png-download.png-removebg-preview.png" alt="MLS Logo" style="height:72px;"><a href="https://www.facebook.com/totalrealtysource/" target="_blank" rel="noopener"><img src="Logos/facebook-app-round-white-icon.webp" alt="Total Realty Source on Facebook" style="height:34px;"></a><a href="https://www.instagram.com/totalrealtysource/" target="_blank" rel="noopener"><img src="Logos/Screenshot_2025-12-30_at_1.45.15_PM-removebg-preview.png" alt="Total Realty Source on Instagram" style="height:34px;"></a></div></div><div style="flex:.8;min-width:180px;"><h4>Navigation</h4><p><a href="index.html">Home</a></p><p><a href="forsale.html">Homes for Sale</a></p><p><a href="events.html">Events</a></p><p><a href="about.html">Agents</a></p><p><a href="contact.html">Contact</a></p></div><div style="flex:1;min-width:230px;"><h4>Office</h4><p style="line-height:1.8;">117 South Main Street<br>Medina, Tennessee 38355</p><p><a href="tel:+17315749340">731 574 9340</a></p></div><div style="flex:1.4;min-width:280px;"><h4>Areas We Serve</h4><div class="areas-grid" style="display:grid;grid-template-columns:repeat(2,minmax(110px,1fr));gap:8px 22px;"><a href="forsale.html?location=Jackson">Jackson</a><a href="forsale.html?location=Medina">Medina</a><a href="forsale.html?location=Milan">Milan</a><a href="forsale.html?location=Humboldt">Humboldt</a><a href="forsale.html?location=Dyer">Dyer</a><a href="forsale.html?location=Dyersburg">Dyersburg</a><a href="forsale.html?location=McKenzie">McKenzie</a><a href="forsale.html?location=Trenton">Trenton</a></div></div></div><div style="width:100%;padding:22px;text-align:center;border-top:1px solid rgba(255,255,255,.25);font-size:13px;">West Tennessee Real Estate Services • Residential • Commercial • Land • Rentals</div></footer>`;
  const testimonials = {
    'lynda-climer': [["Lynda's knowledge of homes, land, and local values made the buying process reassuring. Her guidance throughout the transaction was greatly appreciated.",'Zillow reviewer, June 2013','https://www.zillow.com/profile/LyndaClimer'],["Lynda's experience helped the sellers prepare and list their home while they were living out of state, resulting in a contract within about a month.",'Zillow reviewer, May 2013','https://www.zillow.com/profile/LyndaClimer']],
    'brandie-bassett': [["Brandie did such a great job helping us find the right home for our family. She was really good at following up with us throughout the whole process and helping keep us on track to make sure deadlines were met, yet while not being pushy.",'Jen Njuguna'],["I would highly recommend Brandie Bassett, Total Realty Source! It is important to select the right agent and she exceeded our expectations. From the beginning Brandie prepared an analysis of our property and took the time to review each item we should consider when listing our home for sale.",'Carolyn Brock'],["Brandie provided exceptional service from start to finish! She was responsive, communicative and guided me throughout the homebuying process. Her patience and knowledge of the local market were unmatched.",'Kendria Smith'],['Brandie was so amazing in our home search! She was so responsive and worked to find homes within our budget and in the area that we were looking.','Heather R.'],["Thanks for everything you have done for me. You were the sweetest and most down-to-earth Realtor and I couldn't have asked for anyone more awesome.",'Amanda D.'],['Brandie is the consummate professional. Every aspect from listing to close was seamless as a result of her efforts.','Jack K.'],['Brandie was such a pleasure to work with in selling my home. She went above and beyond, always answering my questions.','Tammy B.']],
    'jackie-david': [['Jackie made a first home purchase easy to understand and was thorough, professional, and excellent to work with.','Gregg Ward'],["Jackie's work ethic, client-first approach, and magnificent work selling our parents' home were exceptional.",'Katie Jo Brewer'],["Jackie is the most helpful real estate agent I have ever dealt with. She went above and beyond in my home-buying process. She always had my back.",'Kevin Amalong'],['Jackie was professional, personable, knew the area, and was very knowledgeable in every aspect of the real estate business. From our offer to closing, she was there every step of the way.','Sharon Pertiller']],
    'ashley-mcmillan': [['We are beyond blessed to have worked with Ashley McMillan on buying our first home! She went above and beyond to make everything as easy as possible and was patient and kind through the whole process.','Dalton'],['Ashley is thoughtful and goes above and beyond to help in any way possible. She is always one call or text away and gives her honest feedback on every situation.','Travis and Tiffany Sutton'],['We sold our first house and Ashley was there for us through all of it. It was a smooth process. We would definitely recommend her!','Beth']],
    'lisa-ballinger': [["Lisa is absolutely amazing! She goes to bat for her clients and exceeds expectations. I've worked with her for years and wouldn't have anyone else.",'Danielle Parker'],['I would absolutely recommend Lisa. She went above and beyond to get us our home and also helped us sell a home. She has so much compassion and works fast.','Mandy Wollard'],["Lisa's knowledge, tireless service, and above-and-beyond work across multiple home sales were outstanding.",'Richard Ballinger']],
    'tammy-jones': [["Tammy's knowledge and expertise helped make finding and purchasing a dream home easy and smooth. Her familiarity with the local area was especially valuable.",'Zillow reviewer, November 2023','https://www.zillow.com/profile/tammyjonesrealtor'],["After working with Tammy on personal homes, vacation homes, and investment property, the reviewer praised the experience and proactive service she brought to both buying and selling.",'Zillow reviewer, November 2023','https://www.zillow.com/profile/tammyjonesrealtor']]
  };

  function installTestimonials() {
    if (document.querySelector('#reviews, .agent-testimonials-section')) return;
    const slug = location.pathname.split('/').pop().replace(/\.html$/i, '');
    const reviews = testimonials[slug];
    const main = document.querySelector('.agent-shell');
    if (!reviews?.length || !main) return;
    const section = document.createElement('section');
    section.className = 'panel agent-testimonials-section';
    const heading = document.createElement('h2');
    heading.textContent = 'Client Testimonials';
    const grid = document.createElement('div');
    grid.className = 'agent-testimonials-grid';
    reviews.forEach(function (review) {
      const card = document.createElement('article');
      card.className = 'agent-testimonial-card';
      const stars = document.createElement('div');
      stars.className = 'agent-testimonial-stars';
      stars.setAttribute('aria-label', 'Five-star review');
      stars.textContent = '★★★★★';
      const quote = document.createElement('blockquote');
      quote.textContent = review[0];
      const person = document.createElement('cite');
      person.textContent = '— ' + review[1];
      card.append(stars, quote, person);
      if (review[2]) {
        const source = document.createElement('a');
        source.className = 'agent-testimonial-source';
        source.href = review[2];
        source.target = '_blank';
        source.rel = 'noopener noreferrer';
        source.textContent = 'Read the original review on Zillow';
        source.style.cssText = "display:inline-block;margin-top:10px;color:#0b4068;font:600 12px/1.45 'Lora',Georgia,serif;text-underline-offset:3px";
        card.appendChild(source);
      }
      grid.appendChild(card);
    });
    section.append(heading, grid);
    main.appendChild(section);
  }

  function installLayout() {
    const oldHeader = document.querySelector('.agent-header');
    let installedNavigation = false;
    if (oldHeader) {
      const holder = document.createElement('div');
      holder.innerHTML = navMarkup;
      oldHeader.replaceWith(...holder.children);
      installedNavigation = true;
    }
    const oldFooter = document.querySelector('footer');
    if (oldFooter) oldFooter.outerHTML = footerMarkup;
    installTestimonials();

    let backButton = document.querySelector('.agent-back-button');
    if (!backButton) {
      const backBar = document.createElement('div');
      backBar.className = 'agent-profile-back-bar';
      backBar.innerHTML = '<div><button class="agent-back-button" type="button"><span aria-hidden="true">←</span> Back</button></div>';
      const profileMain = document.querySelector('.agent-shell, .agent-profile-shell, main');
      profileMain?.parentNode.insertBefore(backBar, profileMain);
      backButton = backBar.querySelector('.agent-back-button');
      backButton?.addEventListener('click', function () {
        if (history.length > 1) history.back();
        else location.href = 'about.html';
      });
    } else {
      backButton.parentElement?.parentElement?.classList.add('agent-profile-back-bar');
    }

    if (!document.getElementById('agent-shared-layout-styles')) {
      const styles = document.createElement('style');
      styles.id = 'agent-shared-layout-styles';
      styles.textContent = '.agent-profile-back-bar{display:block!important;width:100%;background:#fff;border-bottom:1px solid #d8dde1}.agent-profile-back-bar>div{width:min(1380px,100%);margin:auto;padding:16px 28px}.agent-profile-back-bar .agent-back-button{display:inline-flex!important;align-items:center;gap:9px;min-height:40px;padding:7px 12px!important;color:#111!important;background:#fff!important;border:1px solid #cbd2d7!important;border-radius:6px!important;font:600 14px \'Lora\',Georgia,serif!important;cursor:pointer}@media(max-width:760px){.agent-profile-back-bar>div{padding:10px 16px}.agent-profile-back-bar .agent-back-button{min-height:42px;padding:8px 12px!important}}';
      document.head.appendChild(styles);
    }

    if (!installedNavigation) return;
    const drawer = document.getElementById('navDrawer');
    document.querySelector('.mobile-arrow')?.addEventListener('click', function () { drawer?.classList.toggle('open'); });
    drawer?.querySelector('.drawer-back')?.addEventListener('click', function () { drawer.classList.remove('open'); });
    drawer?.querySelector('.drawer-dropdown > .drawer-link')?.addEventListener('click', function (event) {
      event.preventDefault();
      this.parentElement.classList.toggle('open');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installLayout);
  else installLayout();
}());
