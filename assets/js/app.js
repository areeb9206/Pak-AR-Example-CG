const body = document.body;
const header = document.querySelector('.header');
const progress = document.querySelector('.top-progress');
const backTop = document.querySelector('.back-top');
const menuBtn = document.querySelector('.menu-btn');
const navItems = document.querySelectorAll('.nav-item.has-dropdown');
const products = [
  {name:'Eco-Friendly Poly Bags', url:'products/eco-friendly-poly-bags/', img:'assets/images/eco-biodegradable.webp', tags:'biodegradable compostable sustainable retail shopping'},
  {name:'EVA Frosted Poly Bags', url:'products/eva-frosted-poly-bags/', img:'assets/images/eva-frosted.webp', tags:'frosted eva zip clothing textile apparel'},
  {name:'Online Flyer Bags', url:'products/online-flyer-bags/', img:'assets/images/flyer-bags.webp', tags:'courier flyer ecommerce glue pocket parcel'},
  {name:'PVC Bags', url:'products/pvc-bags/', img:'assets/images/pvc-bags.webp', tags:'pvc transparent premium apparel textile'},
  {name:'Non-Woven Bags', url:'products/non-woven-bags/', img:'assets/images/nonwoven-bags.webp', tags:'non woven shopping grocery promotional'},
  {name:'Laminated Printed Poly Bags', url:'products/laminated-printed-poly-bags/', img:'assets/images/laminated-print.webp', tags:'laminated printed fashion retail custom'}
];
const prefix = document.documentElement.dataset.pathPrefix || '';
function asset(path){ return prefix + path; }
function go(path){ window.location.href = prefix + path; }
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 10);
  backTop?.classList.toggle('show', y > 650);
  if(progress){
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = h > 0 ? `${(y / h) * 100}%` : '0%';
  }
});
menuBtn?.addEventListener('click', () => {
  const open = body.classList.toggle('menu-open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
navItems.forEach(item => {
  const link = item.querySelector('.nav-link');
  link?.addEventListener('click', e => {
    if(window.matchMedia('(max-width: 940px)').matches){
      e.preventDefault();
      item.classList.toggle('open');
    }
  });
});
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', () => body.classList.remove('menu-open'));
});
backTop?.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
const slides = Array.from(document.querySelectorAll('.hero-slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
let slideIndex = 0;
function showSlide(i){
  if(!slides.length) return;
  slideIndex = (i + slides.length) % slides.length;
  slides.forEach((s,idx)=>s.classList.toggle('active', idx===slideIndex));
  dots.forEach((d,idx)=>d.classList.toggle('active', idx===slideIndex));
}
dots.forEach((dot,i)=>dot.addEventListener('click',()=>showSlide(i)));
if(slides.length){setInterval(()=>showSlide(slideIndex+1), 5600)}
const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('in'); revealObserver.unobserve(entry.target); } });
},{threshold:.12}) : null;
document.querySelectorAll('.reveal').forEach(el => revealObserver ? revealObserver.observe(el) : el.classList.add('in'));
const counterObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || '';
    let start = 0;
    const step = Math.max(1, Math.ceil(target / 70));
    const timer = setInterval(() => {
      start += step;
      if(start >= target){ start = target; clearInterval(timer); }
      el.textContent = `${start}${suffix}`;
    }, 18);
    counterObserver.unobserve(el);
  });
},{threshold:.35}) : null;
document.querySelectorAll('[data-count]').forEach(el => counterObserver ? counterObserver.observe(el) : el.textContent = `${el.dataset.count}${el.dataset.suffix || ''}`);
function openModal(selector){
  const modal = document.querySelector(selector);
  if(!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeModal(modal){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
document.querySelectorAll('[data-open-modal]').forEach(btn => btn.addEventListener('click', () => {
  const target = btn.dataset.openModal;
  const product = btn.dataset.product;
  openModal(target);
  if(product){
    const select = document.querySelector(`${target} select[name="product"]`);
    if(select) select.value = product;
  }
}));
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', e => { if(e.target.matches('.modal-backdrop,.modal-close')) closeModal(modal); });
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') document.querySelectorAll('.modal.open').forEach(closeModal);
});
const searchInput = document.querySelector('#siteSearch');
const suggestions = document.querySelector('#suggestions');
function renderSuggestions(q=''){
  if(!suggestions) return;
  const query = q.trim().toLowerCase();
  const list = products.filter(p => !query || `${p.name} ${p.tags}`.toLowerCase().includes(query)).slice(0,6);
  suggestions.innerHTML = list.map(p => `
    <a class="suggestion" href="${asset(p.url)}">
      <img src="${asset(p.img)}" alt="${p.name}">
      <span><b>${p.name}</b><small>View product details and request a quote</small></span>
    </a>`).join('');
}
searchInput?.addEventListener('input', e => renderSuggestions(e.target.value));
document.querySelector('[data-open-modal="#searchModal"]')?.addEventListener('click', () => setTimeout(()=>{renderSuggestions(''); searchInput?.focus();},60));
const productSearch = document.querySelector('#productSearch');
const productCards = Array.from(document.querySelectorAll('[data-product-card]'));
const filterButtons = document.querySelectorAll('[data-filter]');
let activeFilter = 'all';
function filterProducts(){
  const q = (productSearch?.value || '').toLowerCase().trim();
  productCards.forEach(card => {
    const cats = card.dataset.category || '';
    const text = card.textContent.toLowerCase();
    const byFilter = activeFilter === 'all' || cats.includes(activeFilter);
    const bySearch = !q || text.includes(q);
    card.dataset.hidden = String(!(byFilter && bySearch));
  });
}
productSearch?.addEventListener('input', filterProducts);
filterButtons.forEach(btn => btn.addEventListener('click', () => {
  filterButtons.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = btn.dataset.filter;
  filterProducts();
}));
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const open = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
});
const faqSearch = document.querySelector('#faqSearch');
faqSearch?.addEventListener('input', e => {
  const q = e.target.value.toLowerCase().trim();
  document.querySelectorAll('.faq-item').forEach(item => {
    item.style.display = !q || item.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
});
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const wrap = btn.closest('.tabs');
    const target = btn.dataset.tab;
    wrap.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    wrap.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    wrap.querySelector(`#${target}`)?.classList.add('active');
  });
});
document.querySelectorAll('.product-gallery').forEach(gallery => {
  const main = gallery.querySelector('.gallery-main img');
  gallery.querySelectorAll('.thumb').forEach(btn => btn.addEventListener('click', () => {
    gallery.querySelectorAll('.thumb').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const img = btn.querySelector('img');
    if(main && img){ main.src = img.src; main.alt = img.alt; }
  }));
  gallery.querySelector('.gallery-main')?.addEventListener('click', () => {
    const lb = document.querySelector('.lightbox');
    const lbImg = lb?.querySelector('img');
    if(lb && lbImg && main){ lbImg.src = main.src; lbImg.alt = main.alt; lb.classList.add('open'); }
  });
});
document.querySelector('.lightbox')?.addEventListener('click', e => e.currentTarget.classList.remove('open'));
document.querySelectorAll('form[data-validate]').forEach(form => {
  form.addEventListener('submit', e => {
    const required = Array.from(form.querySelectorAll('[required]'));
    const invalid = required.find(field => !field.value.trim());
    if(invalid){
      e.preventDefault();
      invalid.focus();
      invalid.scrollIntoView({behavior:'smooth', block:'center'});
    }
  });
});
