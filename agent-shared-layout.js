(function () {
  'use strict';

  const navMarkup = '<nav class="topnav"><div class="logo"><a href="index.html"><img src="logo.png/horizontallogo.png" alt="Total Realty Source"></a></div><div class="nav-links desktop-links"><a href="index.html" class="nav-link">Home</a><div class="dropdown-container"><a href="forsale.html" class="nav-link">For Sale ▾</a><div class="dropdown"><a href="forsale.html?type=homes" class="dropdown-item">Homes for Sale</a><a href="forsale.html?type=land" class="dropdown-item">Land for Sale</a><a href="forsale.html?type=other" class="dropdown-item">Other Properties</a><a href="forsale.html?saved=1" class="dropdown-item">Saved Homes</a></div></div><a href="events.html" class="nav-link">Events</a><a href="about.html" class="nav-link">Agents</a><a href="contact.html" class="nav-link">Contact</a></div><button class="nav-arrow mobile-arrow" type="button" aria-label="Open navigation">☰</button></nav><div class="nav-drawer" id="navDrawer"><button class="drawer-back" type="button">← Back</button><a href="index.html" class="drawer-link">Home</a><div class="drawer-dropdown"><a href="forsale.html" class="drawer-link">For Sale ▾</a><div class="drawer-submenu"><a href="forsale.html?type=homes" class="drawer-link">Homes for Sale</a><a href="forsale.html?type=land" class="drawer-link">Land for Sale</a><a href="forsale.html?type=other" class="drawer-link">Other Properties</a><a href="forsale.html?saved=1" class="drawer-link">Saved Homes</a></div></div><a href="events.html" class="drawer-link">Events</a><a href="about.html" class="drawer-link">Agents</a><a href="contact.html" class="drawer-link">Contact</a></div>';
  const footerMarkup = `<footer class="agent-footer" style="background:#023E6C;color:#fff;font-family:'Lora',serif;"><div style="max-width:1500px;margin:0 auto;padding:70px 50px 55px;display:flex;flex-wrap:wrap;gap:70px;width:100%;"><div style="flex:1.3;min-width:280px;"><h2 style="margin:0 0 20px;font-family:'Bodoni Moda',serif;">Total Realty Source</h2><p style="line-height:1.8;max-width:460px;">Providing buyer representation, seller representation, residential and commercial property services, land and acreage searches, rentals, property management, and renovation services across West Tennessee.</p><div style="display:flex;gap:20px;align-items:center;justify-content:center;margin-top:24px;flex-wrap:wrap;"><img src="Logos/546-5466842_realtor-mls-logo-no-background-hd-png-download.png-removebg-preview.png" alt="MLS Logo" style="height:72px;"><a href="https://www.facebook.com/totalrealtysource/" target="_blank" rel="noopener"><img src="Logos/facebook-app-round-white-icon.webp" alt="Total Realty Source on Facebook" style="height:34px;"></a><a href="https://www.instagram.com/totalrealtysource/" target="_blank" rel="noopener"><img src="Logos/Screenshot_2025-12-30_at_1.45.15_PM-removebg-preview.png" alt="Total Realty Source on Instagram" style="height:34px;"></a></div></div><div style="flex:.8;min-width:180px;"><h4>Navigation</h4><p><a href="index.html">Home</a></p><p><a href="forsale.html">Homes for Sale</a></p><p><a href="events.html">Events</a></p><p><a href="about.html">Agents</a></p><p><a href="contact.html">Contact</a></p></div><div style="flex:1;min-width:230px;"><h4>Office</h4><p style="line-height:1.8;">117 South Main Street<br>Medina, Tennessee 38355</p><p><a href="tel:+17315749340">731 574 9340</a></p></div><div style="flex:1.4;min-width:280px;"><h4>Areas We Serve</h4><div class="areas-grid" style="display:grid;grid-template-columns:repeat(2,minmax(110px,1fr));gap:8px 22px;"><a href="forsale.html?location=Jackson">Jackson</a><a href="forsale.html?location=Medina">Medina</a><a href="forsale.html?location=Milan">Milan</a><a href="forsale.html?location=Humboldt">Humboldt</a><a href="forsale.html?location=Dyer">Dyer</a><a href="forsale.html?location=Dyersburg">Dyersburg</a><a href="forsale.html?location=McKenzie">McKenzie</a><a href="forsale.html?location=Trenton">Trenton</a></div></div></div><div style="width:100%;padding:22px;text-align:center;border-top:1px solid rgba(255,255,255,.25);font-size:13px;">West Tennessee Real Estate Services • Residential • Commercial • Land • Rentals</div></footer>`;
  const testimonials = {
    'lynda-climer': [["Lynda's knowledge of homes, land, and local values made the buying process reassuring. Her guidance throughout the transaction was greatly appreciated.",'User review','https://www.zillow.com/profile/LyndaClimer','2013-06-12'],["Lynda's experience helped the sellers prepare and list their home while they were living out of state, resulting in a contract within about a month.",'User review','https://www.zillow.com/profile/LyndaClimer','2013-05-15']],
    'brandie-bassett': [["Brandie did such a great job helping us find the right home for our family. She followed up throughout the process and kept every deadline on track without being pushy.",'Jen Njuguna','https://www.realtor.com/realestateagents/6273a951e9c24776e674b1c2'],["Brandie exceeded our expectations, prepared a thoughtful property analysis, answered our questions, and stayed committed from listing through closing.",'Carolyn Brock','https://www.realtor.com/realestateagents/6273a951e9c24776e674b1c2'],["Brandie provided exceptional service from start to finish. She was responsive, patient, knowledgeable about the local market, and helped secure a great deal.",'Kendria Smith','https://www.realtor.com/realestateagents/6273a951e9c24776e674b1c2'],['Brandie was responsive throughout the home search and worked hard to find homes that fit both the preferred area and budget.','Heather R.','https://www.brandiebassett.realtor/'],["Brandie's kindness, down-to-earth approach, and help throughout the transaction were deeply appreciated.",'Amanda D.','https://www.brandiebassett.realtor/'],['Every stage from listing to closing felt seamless because of Brandie’s professionalism.','Jack K.','https://www.brandiebassett.realtor/'],['Brandie went above and beyond while selling the home and consistently made herself available to answer questions.','Tammy B.','https://www.brandiebassett.realtor/']],
    'jackie-david': [['Jackie made every step easy, communicated clearly, and could be depended upon whenever normal transaction obstacles arose.','Mark Gibson','https://www.homes.com/real-estate-agents/jackie-david/4y3vdvj/','2026-02-12'],['Jackie was knowledgeable, honest, caring, and highly recommended for real estate needs.','Stacey Dunevant','https://www.homes.com/real-estate-agents/jackie-david/4y3vdvj/','2025-12-01'],['Jackie made a first home purchase easy and enjoyable by remaining available, honest, and focused on finding the right fit.','Ashley Beckham','https://www.homes.com/real-estate-agents/jackie-david/4y3vdvj/','2025-10-07'],['Jackie was efficient, devoted, and willing to help with every question and concern during the transaction.','Michelle Mattix','https://www.homes.com/real-estate-agents/jackie-david/4y3vdvj/','2025-03-06'],['Jackie was kind, professional, attentive, and worked extremely hard for her clients.','Brandon Powers','https://www.homes.com/real-estate-agents/jackie-david/4y3vdvj/','2024-10-14'],['Jackie’s attentive and personable service helped the family sell their childhood home within a few months.','Ashley Powers','https://www.homes.com/real-estate-agents/jackie-david/4y3vdvj/','2024-10-14'],['Jackie was responsive and always willing to help.','Skylar Hurley','https://www.homes.com/real-estate-agents/jackie-david/4y3vdvj/','2024-07-03'],['Jackie provided an excellent real estate experience.','Colten Taylor','https://www.homes.com/real-estate-agents/jackie-david/4y3vdvj/','2024-04-15'],['Jackie communicated clearly, accommodated a demanding schedule, understood the market, and consistently represented the buyer’s best interests.','Josh Jarrell','https://www.homes.com/real-estate-agents/jackie-david/4y3vdvj/','2023-08-29'],['Jackie went above and beyond during a difficult home-loan process and always supported the buyer.','Kevin Amalong','https://www.homes.com/real-estate-agents/jackie-david/4y3vdvj/','2023-08-08'],['Jackie remained patient and knowledgeable throughout a long, difficult, and emotional real estate journey.','Lori Walker','https://www.homes.com/real-estate-agents/jackie-david/4y3vdvj/','2022-06-07'],['Jackie made a first-time home purchase easy and provided helpful guidance at every step.','Rianna Lewis','https://www.homes.com/real-estate-agents/jackie-david/4y3vdvj/','2022-06-03'],['Jackie made the home-buying experience stress-free and demonstrated knowledge and professionalism throughout.','Celecia Goodrich','https://www.homes.com/real-estate-agents/jackie-david/4y3vdvj/','2022-05-03'],['Jackie gave every client personal attention and remained available whenever questions or needs arose.','Shawn McCoy','https://www.homes.com/real-estate-agents/jackie-david/4y3vdvj/','2022-04-29'],['Jackie helped the family find the right home, answered every question, and made the process feel easy.','Marlene Estes','https://www.homes.com/real-estate-agents/jackie-david/4y3vdvj/','2022-04-24'],['Jackie explained each step, went beyond expectations, and made purchasing less stressful.','Zachary Estes','https://www.homes.com/real-estate-agents/jackie-david/4y3vdvj/','2022-04-11'],['Jackie marketed the listing effectively, generated offers quickly, remained accessible, and helped sell the home within weeks.','T M','https://www.homes.com/real-estate-agents/jackie-david/4y3vdvj/','2022-02-19'],['Jackie made a first home purchase easy to understand and was thorough, professional, and excellent to work with.','Gregg Ward','https://www.zillow.com/profile/jackiedavid1982','2020-12-22'],["Jackie's work ethic, client-first approach, and magnificent work selling the reviewer’s parents’ home were exceptional.",'Katie Jo Brewer','https://www.zillow.com/profile/jackiedavid1982','2020-12-21'],['Jackie was professional, personable, knowledgeable about the area, and present from the offer through closing.','Sharon Pertiller']],
    'ashley-mcmillan': [['Ashley made buying a first home easier, welcomed every question, and remained patient and kind throughout the process.','Dalton'],['Ashley is thoughtful, readily available, and willing to provide honest feedback in every situation.','Travis and Tiffany Sutton'],['Ashley supported the sellers through their first home sale and helped make the process smooth.','Beth']],
    'amy-mclemore': [["Amy was professional, caring, and dedicated; her marketing produced a full-price offer for the seller’s mother within three days.",'Teresa West','https://www.realtor.com/realestateagents/5af9b093cc3aa70010baa8ba','2026-06-19'],['Amy repeatedly went above and beyond, used strong local market knowledge, and secured another first-day full-price offer.','Lisa Mays','https://www.realtor.com/realestateagents/5af9b093cc3aa70010baa8ba','2026-06-11'],['Amy remained available throughout a stressful relocation from California to Tennessee and made the purchase feel seamless.','Duvina Fisk','https://www.realtor.com/realestateagents/5af9b093cc3aa70010baa8ba','2025-10-27'],['Amy’s hustle and results helped sell the property in approximately 45 days after the owner stopped trying to sell independently.','Jeremy Dunn','https://www.realtor.com/realestateagents/5af9b093cc3aa70010baa8ba'],['Amy helped with two purchases and one sale while providing support through obstacles and changing plans.','Brittney Goode'],['A cooperating agent described a smooth transaction on Amy’s Milan listing and hoped to work with her again.','Jennifer Easterday']],
    'lisa-ballinger': [['Lisa was knowledgeable, patient, helpful, and especially effective when working with real-estate investors.','User review','https://www.zillow.com/profile/lisaann88keys','2019-09-25'],['Lisa represented the seller throughout the complete home-sale process and provided professional guidance from beginning to end.','Helen Wade','https://www.zillow.com/profile/lisaann88keys','2019-01-15'],['Lisa supported the buyers throughout the entire process and advocated for them when lender problems arose.','User review','https://www.zillow.com/profile/lisaann88keys','2019-01-15'],['Lisa was professional, honest, trustworthy, and committed to protecting her land seller’s best interests.','Annette Ewell','https://www.zillow.com/profile/lisaann88keys','2018-10-11'],['Lisa worked hard to secure the best offer and kept the seller informed throughout the transaction.','User review','https://www.zillow.com/profile/lisaann88keys','2018-10-10'],['Lisa succeeded in selling the home after other agents had not and earned an enthusiastic recommendation.','User review','https://www.zillow.com/profile/lisaann88keys','2018-10-10'],['Lisa’s professionalism, current knowledge, and commitment consistently protected the client’s interests.','User review','https://www.zillow.com/profile/lisaann88keys','2018-10-10'],['Lisa worked extremely hard, represented the client strongly, and pursued both a top-dollar sale and the right next home.','User review','https://www.zillow.com/profile/lisaann88keys','2018-10-10'],["Lisa goes to bat for her clients, exceeds expectations, and inspires long-term loyalty.",'Danielle Parker'],['Lisa brought compassion and speed while helping with both a home purchase and a home sale.','Mandy Wollard'],["Lisa's knowledge, tireless service, and above-and-beyond work across multiple sales were outstanding.",'Richard Ballinger']],
    'tammy-jones': [["Tammy's knowledge and expertise helped make finding and purchasing a dream home easy and smooth. Her familiarity with the local area was especially valuable.",'User review','https://www.zillow.com/profile/tammyjonesrealtor','2023-11-07'],["After working with Tammy on personal homes, vacation homes, and investment property, the reviewer praised her experience and proactive service.",'User review','https://www.zillow.com/profile/tammyjonesrealtor','2023-11-06']]
  };
  const agentProfiles = {
    'lynda-climer': {name:'Lynda Climer',role:'Principal Broker',phone:'731-217-3827',photo:'Untitled design-10/5.png',profile:'lynda-climer.html'},
    'brandie-bassett': {name:'Brandie Bassett',role:'West Tennessee Real Estate Agent',phone:'731-695-2785',photo:'Untitled design-10/7.png',profile:'brandie-bassett.html'},
    'jackie-david': {name:'Jackie David',role:'West Tennessee Real Estate Agent',phone:'731-487-6545',photo:'Untitled design-10/8.png',profile:'jackie-david.html'},
    'ashley-mcmillan': {name:'Ashley McMillan',role:'West Tennessee Real Estate Agent',phone:'731-414-0317',photo:'Untitled design-10/2ashley.png',profile:'ashley-mcmillan.html'},
    'amy-mclemore': {name:'Amy McLemore',role:'West Tennessee Real Estate Agent',phone:'731-234-0049',photo:'Untitled design-10/1amy.png',profile:'amy-mclemore.html'},
    'lisa-ballinger': {name:'Lisa Ballinger',role:'West Tennessee Real Estate Agent',phone:'731-223-0919',photo:'Untitled design-10/6.png',profile:'lisa-ballinger.html'},
    'tammy-jones': {name:'Tammy Jones',role:'West Tennessee Real Estate Agent',phone:'731-225-3158',photo:'Untitled design-10/3tammy.png',profile:'tammy-jones.html'},
    'laura-burke': {name:'Laura Burke',role:'West Tennessee Real Estate Agent',phone:'312-519-8659',photo:'Untitled design-10/4.png',profile:'laura-burke.html'}
  };
  window.TRS_TESTIMONIALS = testimonials;
  window.TRS_AGENT_PROFILES = agentProfiles;

  function installTestimonials() {
    const slug = location.pathname.split('/').pop().replace(/\.html$/i, '');
    const reviews = testimonials[slug];
    const existingReviews = document.querySelector('#reviews');
    if (existingReviews) {
      if (!existingReviews.querySelector('.agent-see-all-reviews')) {
        const link = document.createElement('a');
        link.className = 'agent-see-all-reviews';
        link.href = 'agent-reviews.html?agent=' + encodeURIComponent(slug);
        link.innerHTML = '<strong>See all reviews</strong><b aria-hidden="true">→</b>';
        existingReviews.querySelector('.agent-review-grid')?.appendChild(link);
      }
      return;
    }
    if (document.querySelector('.agent-testimonials-section')) return;
    const main = document.querySelector('.agent-shell');
    if (!reviews?.length || !main) return;
    const section = document.createElement('section');
    section.className = 'panel agent-testimonials-section';
    const heading = document.createElement('h2');
    heading.textContent = 'Client Testimonials';
    const grid = document.createElement('div');
    grid.className = 'agent-testimonials-grid';
    const sortedReviews = reviews.slice().sort(function (a, b) {
      return String(b[3] || '').localeCompare(String(a[3] || ''));
    });
    sortedReviews.slice(0, 6).forEach(function (review) {
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
      if (review[3]) {
        const time = document.createElement('time');
        time.dateTime = review[3];
        time.textContent = new Date(review[3] + 'T12:00:00').toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'});
        time.style.cssText = "display:block;margin-top:5px;color:#697177;font:12px/1.4 'Lora',Georgia,serif";
        card.appendChild(time);
      }
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
    const seeAll = document.createElement('a');
    seeAll.className = 'agent-testimonial-card agent-see-all-reviews';
    seeAll.href = 'agent-reviews.html?agent=' + encodeURIComponent(slug);
    seeAll.innerHTML = '<strong>See all reviews</strong><b aria-hidden="true">→</b>';
    seeAll.style.cssText = "align-items:center;justify-content:center;justify-self:stretch;width:100%;min-height:145px;padding:24px 28px;color:#fff;background:#023e6c;border-color:#023e6c;border-radius:7px;text-align:center;text-decoration:none";
    grid.appendChild(seeAll);
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
      styles.textContent = '.agent-profile-back-bar{display:block!important;width:100%;background:#fff;border-bottom:1px solid #d8dde1}.agent-profile-back-bar>div{width:min(1380px,100%);margin:auto;padding:16px 28px}.agent-profile-back-bar .agent-back-button{display:inline-flex!important;align-items:center;gap:9px;min-height:40px;padding:7px 12px!important;color:#111!important;background:#fff!important;border:1px solid #cbd2d7!important;border-radius:6px!important;font:600 14px \'Lora\',Georgia,serif!important;cursor:pointer}.agent-see-all-reviews{box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;justify-self:stretch;gap:6px!important;width:100%!important;height:auto;min-height:145px!important;padding:24px 28px!important;color:#fff!important;background:#023e6c!important;border:1px solid #023e6c!important;border-radius:7px!important;text-align:center!important;text-decoration:none!important;font-family:\'Lora\',Georgia,serif}.agent-see-all-reviews>*{width:100%!important;margin:0 auto!important;padding:0!important;text-align:center!important}.agent-see-all-reviews strong{color:#fff!important;font-size:19px;line-height:1.15}.agent-see-all-reviews span{color:#fff!important;font-size:12px;line-height:1.25}.agent-see-all-reviews b{color:#fff!important;font-size:25px;line-height:1}@media(max-width:760px){.agent-profile-back-bar>div{padding:10px 16px}.agent-profile-back-bar .agent-back-button{min-height:42px;padding:8px 12px!important}.agent-see-all-reviews{min-height:135px!important;padding:20px!important}}';
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
