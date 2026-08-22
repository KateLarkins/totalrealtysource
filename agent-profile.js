(function () {
  const agents = {
    'lynda-climer': {name:'Lynda Climer',aliases:['Lynda Climer','Lynda C Climer'],title:'Principal Broker',photo:'Untitled design-10/5.png',phone:'731-217-3827',specialties:["Buyer's Agent","Seller's Agent",'Commercial','Land','Residential'],bio:'Lynda is our Principal Broker here at Total Realty Source. With over 50 years of experience in residential, commercial, and light industrial real estate, she knows how to get things done. From listing and selling to managing and renovating properties, Lynda’s handled it all. She also works with clients on business startups and development projects. If you’re looking for someone who truly understands the ins and outs of real estate, give her a call at 731-217-3827.'},
    'brandie-bassett': {name:'Brandie Bassett',aliases:['Brandie Bassett'],title:'Real Estate Agent',photo:'Untitled design-10/7.png',phone:'731-695-2785',specialties:["Buyer's Agent","Seller's Agent",'Commercial','Investors','Residential','First Time Home Buyers'],bio:'Brandie is a dedicated real estate professional serving the West Tennessee area. Known for her commitment to client success, she takes a personalized approach to every transaction, offering thoughtful guidance and support throughout the buying or selling process. Whether you’re entering the market for the first time or making your next big move, Brandie is here to help you navigate each step with confidence. To learn more about how she can assist you, reach out to Brandie at 731-695-2785.',testimonials:[['Praised Brandie’s consistent follow-up, deadline management, help during an out-of-state inspection, and thoughtful support at closing.','Jen Njuguna'],['Said Brandie exceeded expectations through preparation, prompt communication, considerate scheduling, and total commitment from listing through closing.','Carolyn Brock'],['Praised Brandie’s responsiveness, communication, patience, local-market knowledge, and guidance in securing a strong home purchase.','Kendria Smith'],['Brandie was so amazing in our home search!! She was so responsive and worked to find homes within our budget and in the area that we were looking. She was great during every phase of purchasing our home. I highly recommend Brandie for finding your dream home. We found ours!','Heather R.'],["Thanks for everything you have done for me. I appreciate it more than you know. You were the sweetest and most down to earth realtor and I couldn't have asked for any more awesome than yourself! Thank you again!",'Amanda D.'],['Brandie is the consummate professional. Every aspect from listing to close was seamless as a result of her efforts. Thank you!','Jack K.'],['Brandie was such a pleasure to work with in selling my home. She went above & beyond, always answering my questions.','Tammy B.']]},
    'jackie-david': {name:'Jackie David',aliases:['Jackie David'],title:'Real Estate Agent',photo:'Untitled design-10/8.png',phone:'731-487-6545',website:'https://www.jackiedavidrealestate.com',specialties:["Buyer's Agent","Seller's Agent",'PSA','e-PRO','CRB','RENE','GRI','SRS'],bio:'Jackie is a seasoned agent serving West Tennessee, holding designations like PSA, e-PRO, CRB, RENE, GRI, and SRS. Whether you’re buying your first home or preparing to sell, her attentive and personalized approach ensures a seamless experience. You’re in capable hands every step of the way.',testimonials:[['Said Jackie made a first home purchase easy to understand and was thorough, professional, and excellent to work with.','Gregg Ward'],['Praised Jackie’s work ethic, client-first approach, and magnificent work selling the reviewer’s parents’ home.','Katie Jo Brewer'],["Jackie is the most helpful real estate agent I have ever dealt with. She went above and beyond in my home buying process. She always had my back even through a very trying home loan ordeal. I definitely couldn't have done it without her.",'Kevin Amalong'],['Jackie was professional, personable, knew the area, and was very knowledgeable in every aspect of the real estate business. From our offer to the closing, she was there every step of the way and made our home buying experience easy.','Sharon Pertiller']]},
    'ashley-mcmillan': {name:'Ashley McMillan',aliases:['Ashley McMillan'],title:'Real Estate Agent',photo:'Untitled design-10/2ashley.png',phone:'731-414-0317',specialties:["Buyer's Agent","Seller's Agent",'Certified Real Estate Negotiator Expert'],bio:'Ashley has built an impressive real estate career, earning recognition such as Rookie of the Year and multiple Multi-Million Dollar Sales Awards. Her proven success reflects a strong dedication to her clients and deep knowledge of the market. As a Certified Real Estate Negotiator Expert, Ashley is highly skilled at guiding clients through negotiations and securing favorable outcomes. Whether you’re buying or selling, she’s committed to providing a smooth and confident experience. To learn how Ashley can help you reach your real estate goals, give her a call at 731-414-0317.',testimonials:[['We our beyond blessed to have worked with Ashley McMillan on buying our first home! She went above and beyond on making sure everything was as easy as possible, and always allowed us to ask the question when needed! Ashley was very patient and so kind through the whole process! 10/10!','Dalton'],['Ashley is not only thoughtful but goes above and beyond to help in any way possible. She is always one call or text away and will give her honest feedback on every situation.','Travis and Tiffany Sutton'],['We sold our first house last February and Ashley was there for us through all of it. It was a smooth process. Would definitely recommend her!','Beth']]},
    'lisa-ballinger': {name:'Lisa Ballinger',aliases:['Lisa Ballinger','Lisa Ann Ballinger'],title:'Real Estate Agent',photo:'Untitled design-10/6.png',phone:'731-223-0919',specialties:["Buyer's Agent","Seller's Agent",'PSA','ABR','RENE','MRP','SFR','e-PRO','SRS'],bio:'Lisa Ballinger is a highly credentialed real estate professional, holding designations such as PSA, ABR, RENE, MRP, SFR, e-PRO, and SRS. Her in-depth industry expertise and client-focused approach make her a trusted guide throughout the buying and selling process. Whether you’re navigating your first purchase or a complex sale, Lisa provides knowledgeable, reliable support every step of the way. Contact her at 731-223-0919 to get started.',testimonials:[['Lisa is absolutely amazing! She goes to bat for her clients and exceeds expectations! I’ve worked with her for years and wouldn’t have anyone else.','Danielle Parker'],['I would absolutely recommend Lisa. She went above and beyond to get us our home! Lisa also helped us sell a home. She has so much compassion and works fast to get all the things you need to buy and/or sell.','Mandy Wollard'],['Praised Lisa’s knowledge, tireless service, and above-and-beyond work across multiple home sales.','Richard Ballinger']]},
    'tammy-jones': {name:'Tammy Jones',aliases:['Tammy Jones','Tamra L Jones'],title:'Real Estate Agent',photo:'Untitled design-10/3tammy.png',phone:'731-225-3158',specialties:["Buyer's Agent","Seller's Agent"],bio:'Tammy has been a realtor since 2007 from Town and Country Realtors 2011. Prior to becoming a realtor, Tammy was in the mortgage business for over 25 years. Tammy’s been married for over 28 years, has one daughter, and is very thankful and grateful for God allowing her to have a career that she loves and enjoys. She’s met so many amazing people with this job and looks forward to meeting many more.'},
    'laura-burke': {name:'Laura Burke',aliases:['Laura Burke'],title:'Real Estate Agent',photo:'Untitled design-10/4.png',phone:'312-519-8659',specialties:["Buyer's Agent","Seller's Agent"],bio:'Meet Laura Burke, the newest addition to our team. With a strong focus on client care, Laura brings a fresh, attentive approach to every real estate journey. Whether you’re buying your first home or making your next move, she’s here to listen, guide, and help you navigate each step with confidence. Reach out to Laura at 312-519-8659 to get started.'}
  };
  const slug = new URLSearchParams(location.search).get('agent') || '';
  const agent = agents[slug] || agents['lynda-climer'];
  const clean = value => String(value || '').replace(/\s+/g,' ').trim();
  document.title = `${agent.name} | West Tennessee Real Estate Agent`;
  const description = `${agent.name} is a ${agent.title.toLowerCase()} with Total Realty Source, helping buyers and sellers across West Tennessee.`;
  document.querySelector('meta[name="description"]').setAttribute('content', description);
  document.getElementById('agent-canonical').href = `https://totalrealtysource.com/agent-profile.html?agent=${encodeURIComponent(slug || 'lynda-climer')}`;
  document.getElementById('agent-name').textContent = agent.name;
  document.getElementById('agent-first-name').textContent = agent.name.split(' ')[0];
  document.getElementById('agent-title').textContent = `${agent.title} · Total Realty Source`;
  document.getElementById('agent-photo').src = agent.photo;
  document.getElementById('agent-photo').alt = agent.name;
  document.getElementById('agent-bio').textContent = agent.bio;
  document.getElementById('agent-listings-description').textContent = `Active properties from REALTOR® ${agent.name}.`;
  document.getElementById('contact-heading').textContent = `Contact ${agent.name}`;
  document.querySelector('#agent-contact-form textarea').value = `I'm interested in working with ${agent.name}.`;
  document.getElementById('agent-specialties').replaceChildren(...agent.specialties.map(value => {const li=document.createElement('li');li.textContent=value;return li;}));
  const testimonialSection = document.getElementById('agent-testimonial-section');
  if (agent.testimonials?.length) {
    document.getElementById('agent-testimonials').replaceChildren(...agent.testimonials.map(([quote,name]) => {
      const article=document.createElement('article');article.className='profile-testimonial';
      const stars=document.createElement('strong');stars.textContent='★★★★★';
      const text=document.createElement('p');text.textContent=quote;
      const person=document.createElement('span');person.textContent=`— ${name}`;
      article.append(stars,text,person);return article;
    }));
  } else testimonialSection.hidden = true;
  const testimonialCarousel=document.getElementById('agent-testimonials');
  const testimonialPrevious=document.querySelector('[data-testimonial-direction="previous"]');
  const testimonialNext=document.querySelector('[data-testimonial-direction="next"]');
  const testimonialCards=Array.from(testimonialCarousel.querySelectorAll('.profile-testimonial'));
  let testimonialStart=0;
  const updateTestimonialArrows=()=>{
    testimonialCards.forEach((card,index)=>{card.hidden=index<testimonialStart || index>=testimonialStart+4;});
    testimonialPrevious.classList.toggle('is-hidden',testimonialStart===0);
    testimonialNext.classList.toggle('is-hidden',testimonialStart+4>=testimonialCards.length);
  };
  const moveTestimonials=direction=>{
    testimonialStart=direction>0 ? Math.min(testimonialStart+2,Math.max(0,testimonialCards.length-4)) : Math.max(0,testimonialStart-2);
    updateTestimonialArrows();
  };
  document.querySelectorAll('[data-testimonial-direction]').forEach(button => button.addEventListener('click', () => {
    moveTestimonials(button.dataset.testimonialDirection === 'next' ? 1 : -1);
  }));
  let testimonialWheelReady=true;
  testimonialCarousel.addEventListener('wheel',event=>{
    if (Math.abs(event.deltaX)<=Math.abs(event.deltaY) || Math.abs(event.deltaX)<12 || !testimonialWheelReady) return;
    event.preventDefault();
    testimonialWheelReady=false;
    moveTestimonials(event.deltaX>0 ? 1 : -1);
    setTimeout(()=>{testimonialWheelReady=true;},350);
  },{passive:false});
  let testimonialTouchX=0;
  testimonialCarousel.addEventListener('touchstart',event=>{testimonialTouchX=event.touches[0]?.clientX || 0;},{passive:true});
  testimonialCarousel.addEventListener('touchend',event=>{const endX=event.changedTouches[0]?.clientX || testimonialTouchX;const distance=testimonialTouchX-endX;if(Math.abs(distance)>45)moveTestimonials(distance>0?1:-1);},{passive:true});
  requestAnimationFrame(updateTestimonialArrows);
  const actions = document.getElementById('agent-actions');
  actions.innerHTML = `<a class="profile-button" href="#agent-contact-form">Contact ${agent.name.split(' ')[0]}</a><a class="profile-button secondary" href="tel:${agent.phone.replace(/\D/g,'')}">${agent.phone}</a><button class="profile-button secondary" type="button" id="share-agent-profile">↗ Share Profile</button>${agent.website ? `<a class="profile-button secondary" href="${agent.website}" target="_blank" rel="noopener">Visit website</a>` : ''}`;
  document.getElementById('share-agent-profile').addEventListener('click', async () => {
    const shareUrl=`https://totalrealtysource.com/agent-share/${slug || 'lynda-climer'}.html`;
    const shareData={title:`REALTOR® ${agent.name}`,text:`Meet REALTOR® ${agent.name} with Total Realty Source.`,url:shareUrl};
    try { if(navigator.share) await navigator.share(shareData); else throw new Error('Native sharing unavailable'); }
    catch(error){if(error?.name==='AbortError')return;try{await navigator.clipboard.writeText(shareUrl);alert('Agent profile link copied.');}catch(_){prompt('Copy this agent profile link:',shareUrl);}}
  });
  document.getElementById('agent-page-back').addEventListener('click', () => history.length > 1 ? history.back() : location.assign('about.html'));

  async function loadListings() {
    const grid = document.getElementById('agent-listings');
    try {
      const response = await fetch('forsale.html',{cache:'no-store'});
      const doc = new DOMParser().parseFromString(await response.text(),'text/html');
      const aliases = agent.aliases.map(value => value.toLowerCase());
      const cards = [...doc.querySelectorAll('.card[data-modal]')].filter(card => {
        const modalAgent = doc.getElementById(card.dataset.modal)?.querySelector('[data-agent-name]')?.textContent;
        return aliases.includes(clean(modalAgent || card.dataset.agent).toLowerCase());
      });
      if (!cards.length) { grid.innerHTML=`<p class="profile-empty">${agent.name} does not have active listings displayed right now.</p>`; return; }
      grid.replaceChildren(...cards.map(card => {
        const modal=doc.getElementById(card.dataset.modal),link=document.createElement('a');link.className='profile-listing';link.href=`forsale.html?listing=${encodeURIComponent(card.dataset.modal)}#${encodeURIComponent(card.dataset.modal)}`;
        const image=document.createElement('img');image.loading='lazy';image.src=modal?.querySelector('.slide')?.getAttribute('src')||card.querySelector(':scope > img')?.getAttribute('src')||'';image.alt=clean(card.querySelector('.address')?.textContent);
        const copy=document.createElement('span');copy.className='profile-listing-copy';const price=document.createElement('strong');price.textContent=clean(card.querySelector('.price')?.textContent)||'Contact for price';
        const addressSource=card.querySelector('.address');const addressLines=(addressSource?.innerHTML||'').split(/<br\s*\/?\s*>/i).map(clean).filter(Boolean);const address=document.createElement('span');address.className='profile-listing-address';const street=document.createElement('span');street.textContent=addressLines[0]||clean(addressSource?.textContent);address.appendChild(street);if(addressLines.length>1){const locality=document.createElement('span');locality.textContent=addressLines.slice(1).join(', ');address.appendChild(locality);}copy.append(price,address);link.append(image,copy);return link;
      }));
    } catch (_) { grid.innerHTML='<p class="profile-empty">Current listings could not be loaded.</p>'; }
  }
  document.getElementById('agent-contact-form').addEventListener('submit', event => {
    event.preventDefault();
    const form=event.currentTarget,button=form.querySelector('button[type="submit"]'),status=document.getElementById('agent-contact-status'),data=new FormData(form);
    button.disabled=true;status.textContent='Sending your message…';
    fetch('https://total-realty-source-api.total-realty-source.workers.dev/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({agent:slug||'lynda-climer',name:clean(data.get('name')),phone:clean(data.get('phone')),email:clean(data.get('email')),message:clean(data.get('message')),website:clean(data.get('website'))})})
      .then(async response=>{const result=await response.json().catch(()=>({}));if(!response.ok)throw new Error(result.error||'Message could not be sent.');form.reset();form.querySelector('textarea').value=`I'm interested in working with ${agent.name}.`;status.textContent=`Your message was sent privately to ${agent.name}.`;})
      .catch(error=>{status.textContent=`${error.message} Please call ${agent.phone}.`;})
      .finally(()=>{button.disabled=false;});
  });
  loadListings();
})();
