// Transport data
const BUS_COMPANIES = [
  {name: 'Greenline Travels', price: 'NPR 800', rating: 4.5, img: 'bus1.jpg'},
  {name: 'Sajha Yatayat', price: 'NPR 750', rating: 4.3, img: 'bus2.jpg'},
  {name: 'Nepal Yatayat', price: 'NPR 700', rating: 4.2, img: 'bus3.jpg'}
];

const FLIGHTS = [
  {name: 'Buddha Air', price: 'NPR 4500', rating: 4.6, img: 'flight1.jpg'},
  {name: 'Yeti Airlines', price: 'NPR 4200', rating: 4.4, img: 'flight2.jpg'},
  {name: 'Shree Airlines', price: 'NPR 4800', rating: 4.5, img: 'flight3.jpg'}
];

// Heritage dataset
const HERITAGES = {
  patan: {
    id:'patan',
    title:'Patan Durbar Square',
    short:'Newar architecture and Patan Museum',
    long: `Patan Durbar Square in Lalitpur is famed for its artistic courtyards, Krishna Mandir and centuries-old Newari craftsmanship. A UNESCO site, ideal for cultural exploration and photography.`,
    coords:[27.6725,85.3206],
    images:['patan.jpg', 'patan1.jpg', 'patan2.jpg', 'patan3.jpg'],
    price:1500, // NPR
    hours:'06:00 – 18:00',
    recommended:'1–2 hours',
    distance:'Within Kathmandu Valley'
  },
  bhaktapur: {
    id:'bhaktapur',
    title:'Bhaktapur Durbar Square',
    short:'Medieval city with pottery and palaces',
    long: `Bhaktapur Durbar Square is an exceptional example of Newar architecture — home to the 55-Window Palace, Vatsala Temple and rich handicraft traditions.`,
    coords:[27.6710,85.4293],
    images:['bhaktapur.jpg', 'bhkt.jpg', 'bhaktapur3.jpg','bhaktapur2.jpg'],
    price:1500,
    hours:'06:00 – 18:00',
    recommended:'2–3 hours',
    distance:'~13 km from Kathmandu'
  },
  swayambhunath: {
    id:'swayambhunath',
    title:'Swayambhunath Stupa',
    short:'Monkey Temple with valley views',
    long: `Swayambhunath, perched on a hill, offers panoramic views of Kathmandu Valley and is a spiritual center for Buddhists and Hindus alike.`,
    coords:[27.7149,85.2900],
    images:['swayambhunath.jpg', 'swayambhunath1.jpg','swayambhunath2.jpg'],
    price:1500,
    hours:'All day (visiting hours vary)',
    recommended:'1–1.5 hours',
    distance:'Within Kathmandu Valley'
  },
  pashupatinath: {
    id:'pashupatinath',
    title:'Pashupatinath Temple',
    short:'Sacred Hindu temple on Bagmati River',
    long: `Pashupatinath is Nepal's most significant Hindu temple complex dedicated to Lord Shiva, known for its ritual ghats and ceremonies.`,
    coords:[27.7100,85.3240],
    images:['pashupatinath.jpg', 'pashupatinath1.jpg','pashupatinath2.jpg'],
    price:1500,
    hours:'04:00 – 19:00',
    recommended:'1–2 hours',
    distance:'Within Kathmandu Valley'
  }
};

// state
let current = null;
let qty = 1;
let selectedPayment = null;
const MAPS = {};

// DOM refs
const detailPanel = document.getElementById('detailPanel');
const detailTitle = document.getElementById('detailTitle');
const shortDesc = document.getElementById('shortDesc');
const slideshowContainer = document.getElementById('slideshowContainer');
const longDesc = document.getElementById('longDesc');
const ticketPriceEl = document.getElementById('ticketPrice');
const qtyEl = document.getElementById('qty');
const totalPriceEl = document.getElementById('totalPrice');
const paymentMethodsRoot = document.getElementById('paymentMethods');
const openMapsBtn = document.getElementById('openMaps');
const directionsBtn = document.getElementById('directionsBtn');
const weatherTemp = document.getElementById('weatherTemp');
const weatherDesc = document.getElementById('weatherDesc');
const weatherExtra = document.getElementById('weatherExtra');
const hoursEl = document.getElementById('hours');
const recEl = document.getElementById('recommended');
const distEl = document.getElementById('distance');

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(()=>document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible')),60);
  document.getElementById('year').innerText = new Date().getFullYear();

  // card clicks
  document.querySelectorAll('#cards .card').forEach(c=>{
    c.addEventListener('click', () => openDetail(c.dataset.id));
  });

  document.getElementById('backBtn').addEventListener('click', () => {
    detailPanel.classList.remove('show');
    window.scrollTo({top:document.getElementById('explore').offsetTop - 20, behavior:'smooth'});
  });

  // login check (demo)
  if(localStorage.getItem('loggedIn') !== 'true'){
    document.getElementById('loginPopup').style.display = 'flex';
    document.getElementById('loginPopup').setAttribute('aria-hidden','false');
  }
});

function redirectToLogin(){
  // demo: mark logged in to allow viewing without real auth
  localStorage.setItem('loggedIn','true');
  document.getElementById('loginPopup').style.display='none';
  document.getElementById('loginPopup').setAttribute('aria-hidden','true');
}

function initSlideshow(container, images, title){
  container.innerHTML = '';
  let currentIndex = 0;
  const imgs = [];
  let autoSlideInterval;

  images.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `${title} - Image ${index + 1}`;
    if(index === 0) img.classList.add('active');
    container.appendChild(img);
    imgs.push(img);
  });

  const nextSlide = () => {
    imgs[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % imgs.length;
    imgs[currentIndex].classList.add('active');
  };

  const prevSlide = () => {
    imgs[currentIndex].classList.remove('active');
    currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
    imgs[currentIndex].classList.add('active');
  };

  // Left arrow
  const leftArrow = document.createElement('button');
  leftArrow.className = 'slideshow-arrow slideshow-arrow-left';
  leftArrow.innerHTML = '‹';
  leftArrow.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    prevSlide();
    startAutoSlide();
  });
  container.appendChild(leftArrow);

  // Right arrow
  const rightArrow = document.createElement('button');
  rightArrow.className = 'slideshow-arrow slideshow-arrow-right';
  rightArrow.innerHTML = '›';
  rightArrow.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    nextSlide();
    startAutoSlide();
  });
  container.appendChild(rightArrow);

  const startAutoSlide = () => {
    setTimeout(() => {
      autoSlideInterval = setInterval(nextSlide, 3000);
    }, 3000);
  };
  startAutoSlide();
}

function openDetail(id){
  if(localStorage.getItem('loggedIn') !== 'true'){
    document.getElementById('loginPopup').style.display='flex';
    document.getElementById('loginPopup').setAttribute('aria-hidden','false');
    return;
  }

  const h = HERITAGES[id];
  if(!h) return;
  current = h;
  qty = 1;
  selectedPayment = null;
  detailTitle.innerText = h.title;
  shortDesc.innerText = h.short;
  initSlideshow(slideshowContainer, h.images, h.title);
  longDesc.innerText = h.long;
  ticketPriceEl.innerText = `${h.price} NPR`;
  qtyEl.innerText = qty;
  totalPriceEl.innerText = `${h.price * qty} NPR`;
  hoursEl.innerText = h.hours;
  recEl.innerText = h.recommended;
  distEl.innerText = h.distance;

  // clear payment selection
  paymentMethodsRoot.querySelectorAll('.payment-method').forEach(pm => pm.classList.remove('active'));

  detailPanel.classList.add('show');

  // init map & weather
  initMap('map', h.coords, h.title);
  fetchWeather(h.coords);

  // external links
  openMapsBtn.onclick = ()=> {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.title)}`;
    window.open(url,'_blank');
  };
  directionsBtn.onclick = ()=> {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(h.title)}`;
    window.open(url,'_blank');
  };

  // load ratings for this heritage
  if(window.loadHeritageRatings) window.loadHeritageRatings(id);

  setTimeout(()=> detailPanel.scrollIntoView({behavior:'smooth', block:'start'}),80);
}

function changeQty(delta){
  qty = Math.max(1, qty + delta);
  qtyEl.innerText = qty;
  totalPriceEl.innerText = `${current.price * qty} NPR`;
}

function selectPayment(el){
  paymentMethodsRoot.querySelectorAll('.payment-method').forEach(pm=>pm.classList.remove('active'));
  el.classList.add('active');
  selectedPayment = el.innerText.trim();
}

function addToCart(){
  if(!current){ alert('Select a site first'); return; }
  showToast(`${qty} ticket(s) for ${current.title} added to cart.`);
}

function buyNow(){
  if(!current){ alert('Select a site first'); return; }
  if(!selectedPayment){ showToast('Please select a payment method.'); return; }
  // Demo purchase flow
  showToast(`Purchased ${qty} ticket(s) for ${current.title} via ${selectedPayment}.`);
}

function showToast(msg){
  const el = document.createElement('div');
  el.style.position='fixed';
  el.style.bottom='20px';
  el.style.left='50%';
  el.style.transform='translateX(-50%)';
  el.style.background='rgba(7,18,40,0.9)';
  el.style.color='#fff';
  el.style.padding='12px 18px';
  el.style.borderRadius='10px';
  el.style.boxShadow='0 8px 30px rgba(8,24,64,0.4)';
  el.style.zIndex=1600;
  el.innerText = msg;
  document.body.appendChild(el);
  setTimeout(()=>{ el.style.opacity='0'; setTimeout(()=>el.remove(),300) }, 2200);
}



// Map creation / reuse
function initMap(containerId, coords, title){
  const el = document.getElementById(containerId);
  if(!el) return;
  // reuse single map instance
  if(MAPS[containerId]){
    try {
      MAPS[containerId].setView(coords, 15);
      MAPS[containerId + '_marker'].setLatLng(coords);
    } catch(e){}
    return;
  }
  const map = L.map(containerId, {zoomControl:false}).setView(coords, 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:19}).addTo(map);
  const marker = L.marker(coords).addTo(map).bindPopup(title).openPopup();
  MAPS[containerId] = map;
  MAPS[containerId + '_marker'] = marker;
  setTimeout(()=> map.invalidateSize(), 300);
}

// Fetch weather data from WeatherAPI
async function fetchWeather(coords){
  try{
    const [lat, lon] = coords;
    weatherTemp.innerText = '...';
    weatherDesc.innerText = 'Loading...';
    weatherExtra.innerText = '';
    document.getElementById('weatherFeels').innerText = 'Feels like: —';
    document.getElementById('weatherHumidity').innerText = 'Humidity: —';
    document.getElementById('weatherPressure').innerText = 'Pressure: —';
    document.getElementById('weatherUV').innerText = 'UV Index: —';

    const apiKey = '91990f72982a41738b293259250412';
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`);
    if (!response.ok) throw new Error('Weather API error');
    const data = await response.json();

    // Populate weather data
    weatherTemp.innerText = `${data.current.temp_c}°C`;
    weatherDesc.innerText = data.current.condition.text;
    weatherExtra.innerText = `Wind ${data.current.wind_kph} km/h • Updated`;
    document.getElementById('weatherFeels').innerText = `Feels like: ${data.current.feelslike_c}°C`;
    document.getElementById('weatherHumidity').innerText = `Humidity: ${data.current.humidity}%`;
    document.getElementById('weatherPressure').innerText = `Pressure: ${data.current.pressure_mb} hPa`;
    document.getElementById('weatherUV').innerText = `UV Index: ${data.current.uv}`;
  }catch(err){
    weatherTemp.innerText = '—';
    weatherDesc.innerText = 'Weather unavailable';
    weatherExtra.innerText = '';
    document.getElementById('weatherFeels').innerText = 'Feels like: —';
    document.getElementById('weatherHumidity').innerText = 'Humidity: —';
    document.getElementById('weatherPressure').innerText = 'Pressure: —';
    document.getElementById('weatherUV').innerText = 'UV Index: —';
    console.warn(err);
  }
}

function mapWeatherCode(code){
  if(code === 0) return 'Clear';
  if(code === 1 || code === 2 || code === 3) return 'Partly cloudy';
  if(code >= 45 && code <= 48) return 'Fog';
  if(code >= 51 && code <= 67) return 'Rain';
  if(code >= 71 && code <= 86) return 'Snow';
  if(code >= 95) return 'Thunderstorm';
  return 'Cloudy';
}

// small guard
window.addEventListener('resize', ()=> {
  if(MAPS['map']) MAPS['map'].invalidateSize && MAPS['map'].invalidateSize();
});

// Heritage rating functionality
(function initHeritageRating(){
  const starEls = document.querySelectorAll('#heritageStars .rating-star');
  const avgEl = document.getElementById('heritageAvg');
  const countEl = document.getElementById('heritageCount');
  let selected = null;
  let currentHeritageId = null;

  function loadRatings(heritageId){
    currentHeritageId = heritageId;
    const key = `gonepal_heritage_rating_${heritageId}`;
    let stored = null;
    try { stored = JSON.parse(localStorage.getItem(key) || 'null'); } catch(e){ stored = null; }
    let ratingData = stored && typeof stored.sum === 'number' && typeof stored.count === 'number' ? stored : { sum:0, count:0 };
    updateDisplay(ratingData);
    return ratingData;
  }

  function updateDisplay(data){
    if(!countEl) return;
    if(data.count === 0){
      if(avgEl) avgEl.textContent = '—';
      countEl.textContent = '0';
    } else {
      const avg = data.sum / data.count;
      if(avgEl) avgEl.textContent = avg.toFixed(1);
      countEl.textContent = data.count;
    }
  }

  // star interactions
  starEls.forEach(st => {
    st.setAttribute('tabindex','0');
    st.addEventListener('mouseenter', () => {
      const v = Number(st.dataset.value);
      starEls.forEach(s => s.classList.toggle('hover', Number(s.dataset.value) <= v));
    });
    st.addEventListener('mouseleave', () => starEls.forEach(s => s.classList.remove('hover')));
    st.addEventListener('click', () => {
      if(localStorage.getItem('loggedIn') !== 'true'){
        showToast('Please login to rate this heritage site');
        return;
      }
      selected = Number(st.dataset.value);
      starEls.forEach(s => {
        const val = Number(s.dataset.value);
        if(val <= selected){
          s.classList.add('selected');
          s.classList.remove('unfilled');
        } else {
          s.classList.remove('selected');
          s.classList.add('unfilled');
        }
      });
      // save rating
      const key = `gonepal_heritage_rating_${currentHeritageId}`;
      let data = loadRatings(currentHeritageId);
      data.sum = (data.sum || 0) + selected;
      data.count = (data.count || 0) + 1;
      localStorage.setItem(key, JSON.stringify(data));
      updateDisplay(data);
      showToast('Thanks for rating!');
    });
    st.addEventListener('keydown', (e) => {
      const curr = Number(document.activeElement.dataset.value);
      if(e.key === 'ArrowRight' || e.key === 'ArrowUp'){ e.preventDefault(); const next = Math.min(5, curr+1); document.querySelector(`#heritageStars .rating-star[data-value="${next}"]`)?.focus(); }
      if(e.key === 'ArrowLeft' || e.key === 'ArrowDown'){ e.preventDefault(); const prev = Math.max(1, curr-1); document.querySelector(`#heritageStars .rating-star[data-value="${prev}"]`)?.focus(); }
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); st.click(); }
    });
  });

  // expose loadRatings to global scope for openDetail
  window.loadHeritageRatings = loadRatings;
})();

// Transport functions
function selectTransport(type) {
  const transportOptions = document.querySelectorAll('.transport-btn');
  transportOptions.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  const transportDetails = document.getElementById('transportDetails');
  transportDetails.style.display = 'block';

  const busSection = document.getElementById('busSection');
  const airplaneSection = document.getElementById('airplaneSection');

  if (type === 'bus') {
    busSection.style.display = 'block';
    airplaneSection.style.display = 'none';
    loadBusCompanies();
  } else if (type === 'airlines') {
    busSection.style.display = 'none';
    airplaneSection.style.display = 'block';
    loadAirlinesTickets();
  }
}

function loadBusCompanies() {
  const busList = document.getElementById('busList');
  busList.innerHTML = '';

  BUS_COMPANIES.forEach((company, i) => {
    const busItem = document.createElement('div');
    busItem.className = 'bus-item';
    busItem.innerHTML = `
      <img src="${company.img}" alt="${company.name}">
      <div class="info">
        <h5>${company.name}</h5>
        <p>${company.price} • ${company.rating} ★</p>
        <div class="rating-stars" id="busStars_${i}" role="radiogroup" aria-label="Rate ${company.name}">
          <button class="rating-star unfilled" data-value="1" aria-label="1 star">★</button>
          <button class="rating-star unfilled" data-value="2" aria-label="2 stars">★</button>
          <button class="rating-star unfilled" data-value="3" aria-label="3 stars">★</button>
          <button class="rating-star unfilled" data-value="4" aria-label="4 stars">★</button>
          <button class="rating-star unfilled" data-value="5" aria-label="5 stars">★</button>
        </div>
        <div style="margin-top:4px; font-size:0.8rem; color:var(--muted)">
          <span id="busAvg_${i}">—</span> (<span id="busCount_${i}">0</span> ratings)
        </div>
      </div>
      <div class="cta">
        <button class="btn btn-ghost" onclick="viewBus('${company.name}')">View</button>
        <button class="btn btn-primary" onclick="bookBus('${company.name}')">Book</button>
      </div>
    `;
    busList.appendChild(busItem);
  });
  // Initialize bus ratings
  BUS_COMPANIES.forEach((company, i) => {
    initBusRating(i, company.name);
  });
}

function loadAirlinesTickets() {
  const airlinesBooking = document.getElementById('airlinesBooking');
  airlinesBooking.innerHTML = '<h5 style="margin:0 0 10px;color:var(--primary-700)">Airlines Tickets</h5>';

  FLIGHTS.forEach((flight, i) => {
    const flightOption = document.createElement('div');
    flightOption.className = 'flight-option';
    flightOption.innerHTML = `
      <img src="${flight.img}" alt="${flight.name}">
      <div class="info">
        <h5>${flight.name}</h5>
        <p>${flight.price} • ${flight.rating} ★</p>
        <div class="rating-stars" id="airlineStars_${i}" role="radiogroup" aria-label="Rate ${flight.name}">
          <button class="rating-star unfilled" data-value="1" aria-label="1 star">★</button>
          <button class="rating-star unfilled" data-value="2" aria-label="2 stars">★</button>
          <button class="rating-star unfilled" data-value="3" aria-label="3 stars">★</button>
          <button class="rating-star unfilled" data-value="4" aria-label="4 stars">★</button>
          <button class="rating-star unfilled" data-value="5" aria-label="5 stars">★</button>
        </div>
        <div style="margin-top:4px; font-size:0.8rem; color:var(--muted)">
          <span id="airlineAvg_${i}">—</span> (<span id="airlineCount_${i}">0</span> ratings)
        </div>
      </div>
      <div class="cta">
        <button class="btn btn-ghost" onclick="viewFlight('${flight.name}')">View</button>
        <button class="btn btn-primary" onclick="bookFlight('${flight.name}')">Book</button>
      </div>
    `;
    airlinesBooking.appendChild(flightOption);
  });
  // Initialize airline ratings
  FLIGHTS.forEach((flight, i) => {
    initAirlineRating(i, flight.name);
  });
}

function viewBus(name) {
  showToast(`${name} — bus schedule and details. Full booking coming soon.`);
}

function bookBus(name) {
  showToast(`Initiating booking for ${name} — demo.`);
}

function viewFlight(name) {
  showToast(`${name} — flight details and schedule. Full booking coming soon.`);
}

function bookFlight(name) {
  showToast(`Initiating booking for ${name} — demo.`);
}

// Bus rating functionality
function loadBusRatings(busName) {
  const ratings = JSON.parse(localStorage.getItem(`busRatings_${busName}`)) || [];
  return ratings;
}

function saveBusRating(busName, rating) {
  const ratings = loadBusRatings(busName);
  ratings.push(rating);
  localStorage.setItem(`busRatings_${busName}`, JSON.stringify(ratings));
}

function updateBusRatingDisplay(i, busName) {
  const ratings = loadBusRatings(busName);
  const avg = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : '—';
  const count = ratings.length;
  document.getElementById(`busAvg_${i}`).innerText = avg;
  document.getElementById(`busCount_${i}`).innerText = count;
}

function initBusRating(i, busName) {
  const stars = document.querySelectorAll(`#busStars_${i} .rating-star`);
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.dataset.value);
      saveBusRating(busName, rating);
      updateBusRatingDisplay(i, busName);
      stars.forEach(s => {
        if (parseInt(s.dataset.value) <= rating) {
          s.classList.add('selected');
          s.classList.remove('unfilled');
        } else {
          s.classList.remove('selected');
          s.classList.add('unfilled');
        }
      });
    });
  });
}

// Airline rating functionality
function loadAirlineRatings(airlineName) {
  const ratings = JSON.parse(localStorage.getItem(`airlineRatings_${airlineName}`)) || [];
  return ratings;
}

function saveAirlineRating(airlineName, rating) {
  const ratings = loadAirlineRatings(airlineName);
  ratings.push(rating);
  localStorage.setItem(`airlineRatings_${airlineName}`, JSON.stringify(ratings));
}

function updateAirlineRatingDisplay(i, airlineName) {
  const ratings = loadAirlineRatings(airlineName);
  const avg = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : '—';
  const count = ratings.length;
  document.getElementById(`airlineAvg_${i}`).innerText = avg;
  document.getElementById(`airlineCount_${i}`).innerText = count;
}

function initAirlineRating(i, airlineName) {
  const stars = document.querySelectorAll(`#airlineStars_${i} .rating-star`);
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.dataset.value);
      saveAirlineRating(airlineName, rating);
      updateAirlineRatingDisplay(i, airlineName);
      stars.forEach(s => {
        if (parseInt(s.dataset.value) <= rating) {
          s.classList.add('selected');
          s.classList.remove('unfilled');
        } else {
          s.classList.remove('selected');
          s.classList.add('unfilled');
        }
      });
    });
  });
}