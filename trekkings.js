// TREKS data
const TREKS = {
  everest: {
    id:'everest',
    title:'Everest Base Camp Trek',
    short:'Classic high-altitude trek to Kala Patthar and EBC with Sherpa culture.',
    long:'A 12–15 day trek that takes you through Lukla, Namche Bazaar and Tengboche to Everest Base Camp. Expect dramatic glaciers, high passes and vibrant Sherpa villages.',
    coords:[27.9881,86.9250],
    images:['everestbase.jpg', 'everestbase1.jpg', 'everest2.jpg'],
    duration:'12–15 days',
    altitude:'5,364 m (Kala Patthar)',
    rating:4.9,
    tag:'Classic'
  },
  annapurna: {
    id:'annapurna',
    title:'Annapurna Circuit',
    short:'A diverse circuit crossing Thorong La with varied ecosystems and mountain views.',
    long:'Typically 10–18 days depending on start/finish. The route climbs to Thorong La (5,416 m) and passes through terraced farmland, alpine plateaus and Hindu cultural zones.',
    coords:[28.5983,83.9311],
    images:['annapurnai.jpg', 'anapurna1.jpg', 'annapurna.jpg'],
    duration:'10–18 days',
    altitude:'5,416 m (Thorong La)',
    rating:4.7,
    tag:'Circuit'
  },
  langtang: {
    id:'langtang',
    title:'Langtang Valley Trek',
    short:'Close-to-Kathmandu trek through rhododendron forests and Tamang villages.',
    long:'A 6–8 day trek ideal for shorter schedules. Easy access from Kathmandu, rich culture, alpine scenery and chance to visit Kyanjing Gompa.',
    coords:[28.2215,85.5270],
    image:'lang.jpg',
    duration:'6–8 days',
    altitude:'4,984 m (Kyanjin Ri)',
    rating:4.5,
    tag:'Short'
  },
  upper_mustang: {
    id:'upper_mustang',
    title:'Upper Mustang Trek',
    short:'Ancient Tibetan-influenced kingdom with arid canyons and monasteries.',
    long:'Permits required. This 8–12 day trek explores the walled capital Lo Manthang, desert-like landscapes and Buddhist caves—an evocative trans-Himalayan experience.',
    coords:[28.9982,83.8148],
    image:'uppermustang.jpg',
    duration:'8–12 days',
    altitude:'4,000–4,200 m',
    rating:4.6,
    tag:'Offbeat'
  }
};

// Lodging mockup for treks (teahouses / lodges near trailheads)
const LODGES = {
  everest: [
    {name:'Namche Teahouse', price:'$18/night', rating:4.3, img:'lodge1.jpg'},
    {name:'Tengboche Lodge', price:'$25/night', rating:4.5, img:'lodge2.jpg'},
    {name:'Pangboche Inn', price:'$30/night', rating:4.6, img:'lodge3.jpg'}
  ],
  annapurna: [
    {name:'Besi Sahar Lodge', price:'$20/night', rating:4.1, img:'lodge4.jpg'},
    {name:'Manang Guesthouse', price:'$28/night', rating:4.5, img:'lodge5.jpg'},
    {name:'Muktinath Lodge', price:'$35/night', rating:4.7, img:'lodge6.jpg'}
  ],
  langtang: [
    {name:'Syabrubesi Hotel', price:'$22/night', rating:4.2, img:'lodge7.jpg'},
    {name:'Kyanjin Gompa Lodge', price:'$27/night', rating:4.4, img:'lodge8.jpg'},
    {name:'Langtang View', price:'$24/night', rating:4.3, img:'lodge9.jpg'}
  ],
  upper_mustang: [
    {name:'Jomsom Caravan', price:'$30/night', rating:4.4, img:'lodge10.jpg'},
    {name:'Lo Manthang Guest', price:'$40/night', rating:4.6, img:'lodge11.jpg'},
    {name:'Mustang Retreat', price:'$55/night', rating:4.8, img:'lodge12.jpg'}
  ]
};

// Preload images
Object.values(TREKS).forEach(t => {
  if (t.images) {
    t.images.forEach(img => { const i = new Image(); i.src = img; });
  } else {
    const i = new Image(); i.src = t.image;
  }
});

const MAPS = {};
let currentTrek = null;
let autoSlideInterval = null;
const detailPanel = document.getElementById('detailPanel');
const detailTitle = document.getElementById('detailTitle');
const shortDesc = document.getElementById('shortDesc');
const longDesc = document.getElementById('longDesc');
const routeFacts = document.getElementById('routeFacts');
const hotelsList = document.getElementById('hotelsList');
const weatherTemp = document.getElementById('weatherTemp');
const weatherDesc = document.getElementById('weatherDesc');
const weatherExtra = document.getElementById('weatherExtra');
const weatherFeels = document.getElementById('weatherFeels');
const weatherHumidity = document.getElementById('weatherHumidity');
const weatherPressure = document.getElementById('weatherPressure');
const weatherUV = document.getElementById('weatherUV');
const durationEl = document.getElementById('duration');
const altitudeEl = document.getElementById('altitude');
const difficultyEl = document.getElementById('difficulty');
const openMapsBtn = document.getElementById('openMaps');
const directionsBtn = document.getElementById('directionsBtn');

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(()=>document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible')),60);
  document.getElementById('year').innerText = new Date().getFullYear();

  renderCards();
  initTrekRating();

  document.getElementById('backBtn').addEventListener('click', () => {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    detailPanel.classList.remove('show');
    window.scrollTo({top:document.getElementById('routes').offsetTop - 20, behavior:'smooth'});
  });
});

function renderCards() {
  const cardsContainer = document.getElementById('cards');
  const sortedTreks = Object.values(TREKS).sort((a, b) => b.rating - a.rating);

  sortedTreks.forEach(trek => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = trek.id;
    card.innerHTML = `
      <img src="${trek.images ? trek.images[0] : trek.image}" alt="${trek.title}">
      <span class="tag">${trek.tag}</span>
      <h3>${trek.title}</h3>
      <p>${trek.short}</p>
    `;
    card.addEventListener('click', () => openDetail(trek.id));
    cardsContainer.appendChild(card);
  });
}

function openDetail(id){
  const t = TREKS[id];
  if(!t) return;
  if (autoSlideInterval) clearInterval(autoSlideInterval);
  currentTrek = t;
  detailTitle.innerText = t.title;
  shortDesc.innerText = t.short;

  // Handle hero image or slideshow
  const heroWrap = document.getElementById('heroImageWrap');
  heroWrap.innerHTML = ''; // clear previous content

  if (t.images && t.images.length > 1) {
    heroWrap.classList.add('slideshow');

    // Create images
    t.images.forEach((imgSrc, index) => {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = t.title;
      if (index === 0) img.classList.add('active');
      heroWrap.appendChild(img);
    });

    // Create arrows
    const leftArrow = document.createElement('button');
    leftArrow.className = 'slideshow-arrow slideshow-arrow-left';
    leftArrow.innerHTML = '‹';
    leftArrow.addEventListener('click', () => changeSlide(-1));
    heroWrap.appendChild(leftArrow);

    const rightArrow = document.createElement('button');
    rightArrow.className = 'slideshow-arrow slideshow-arrow-right';
    rightArrow.innerHTML = '›';
    rightArrow.addEventListener('click', () => changeSlide(1));
    heroWrap.appendChild(rightArrow);

    // Slideshow variables and functions
    let currentSlide = 0;
    function showSlide(index) {
      const imgs = heroWrap.querySelectorAll('img');
      imgs.forEach(img => img.classList.remove('active'));
      imgs[index].classList.add('active');
      currentSlide = index;
    }
    function changeSlide(direction) {
      currentSlide = (currentSlide + direction + t.images.length) % t.images.length;
      showSlide(currentSlide);
    }
    // Start auto-slide after 4 seconds
      setTimeout(() => {
        autoSlideInterval = setInterval(() => changeSlide(1), 3000);
      }, 3000);
  } else {
    heroWrap.classList.remove('slideshow');
    const img = document.createElement('img');
    img.src = t.images ? t.images[0] : t.image;
    img.alt = t.title;
    heroWrap.appendChild(img);
  }

  longDesc.innerText = t.long;
  durationEl.innerText = t.duration;
  altitudeEl.innerText = t.altitude;
  difficultyEl.innerText = t.difficulty;

  // route facts
  routeFacts.innerHTML = '';
  const facts = [
    `Start point: ${routeStartName(id)}`,
    `Typical days: ${t.duration}`,
    `Permit: ${requiresPermit(id) ? 'Required' : 'Not required'}`
  ];
  facts.forEach(f => {
    const li = document.createElement('li');
    li.style.color = 'var(--muted)';
    li.style.margin = '6px 0';
    li.innerText = f;
    routeFacts.appendChild(li);
  });

  // lodges
  hotelsList.innerHTML = '';
  const sortedHotels = [...(LODGES[id] || [])].sort((a, b) => b.rating - a.rating);
  sortedHotels.forEach((h, i) => {
    const node = document.createElement('div');
    node.className = 'hotel';
    node.innerHTML = `
      <img src="${h.img}" alt="${h.name}">
      <div class="info">
        <h5>${h.name}</h5>
        <p>${h.price} • ${h.rating} ★</p>
        <div class="rating-stars" id="hotelStars_${i}" role="radiogroup" aria-label="Rate ${h.name}">
          <button class="rating-star unfilled" data-value="1" aria-label="1 star">★</button>
          <button class="rating-star unfilled" data-value="2" aria-label="2 stars">★</button>
          <button class="rating-star unfilled" data-value="3" aria-label="3 stars">★</button>
          <button class="rating-star unfilled" data-value="4" aria-label="4 stars">★</button>
          <button class="rating-star unfilled" data-value="5" aria-label="5 stars">★</button>
        </div>
        <div style="margin-top:4px; font-size:0.8rem; color:var(--muted)">
          <span id="hotelAvg_${i}">—</span> (<span id="hotelCount_${i}">0</span> ratings)
        </div>
      </div>
      <div class="cta">
        <button class="btn btn-ghost" onclick="viewLodge('${id}','${h.name.replace(/'/g,"\\'")}')">View</button>
        <button class="btn btn-primary" onclick="bookLodge('${h.name.replace(/'/g,"\\'")}')">Book</button>
      </div>
    `;
    hotelsList.appendChild(node);
  });
  // Initialize hotel ratings
  sortedHotels.forEach((h, i) => {
    initHotelRating(i, id, h.name);
  });

  detailPanel.classList.add('show');

  // map centered on trail coords
  initMap('map', t.coords, t.title);

  // weather at trailhead (approx)
  fetchWeather(t.coords);

  // external links
  openMapsBtn.onclick = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.title)}`;
    window.open(url, '_blank');
  };
  directionsBtn.onclick = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(routeStartName(id))}`;
    window.open(url, '_blank');
  };

  setTimeout(()=> detailPanel.scrollIntoView({behavior:'smooth', block:'start'}), 80);
  updateTrekRatingDisplay();
}

function routeStartName(id){
  if(id==='everest') return 'Lukla, Nepal';
  if(id==='annapurna') return 'Besisahar, Nepal';
  if(id==='langtang') return 'Syabrubesi, Nepal';
  if(id==='upper_mustang') return 'Jomsom, Nepal';
  return 'Nepal';
}

function requiresPermit(id){
  return id === 'upper_mustang';
}

function viewLodge(trekId, lodgeName){
  alert(`${lodgeName} — basic info. Full lodge pages coming soon.`);
}
function bookLodge(name){
  alert(`Initiating booking flow for ${name} — demo.`);
}

// transport functions
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
  } else if (type === 'airplane') {
    busSection.style.display = 'none';
    airplaneSection.style.display = 'block';
    loadAirplaneTickets();
  }
}

function loadBusCompanies() {
  const busList = document.getElementById('busList');
  busList.innerHTML = '';

  const busCompanies = [
    {name: 'Greenline Travels', price: '$25/ticket', rating: 4.5, img: 'bus4.jpg'},
    {name: 'Nepal Yatayat', price: '$20/ticket', rating: 4.2, img: 'bus2.jpg'},
    {name: 'Sajha Yatayat', price: '$18/ticket', rating: 4.0, img: 'bus3.jpg'}
  ];

  busCompanies.forEach((company, i) => {
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
  busCompanies.forEach((company, i) => {
    initBusRating(i, company.name);
  });
}

function loadAirplaneTickets() {
  const airplaneBooking = document.getElementById('airplaneBooking');
  airplaneBooking.innerHTML = '<h5 style="margin:0 0 10px;color:var(--primary-700)">Airplane Tickets</h5>';

  const flights = [
    {airline: 'Buddha Air', route: 'Kathmandu to Lukla', price: '$150/ticket', duration: '25 min', img: 'flight1.jpg', rating: 4.6},
    {airline: 'Yeti Airlines', route: 'Kathmandu to Pokhara', price: '$120/ticket', duration: '30 min', img: 'flight2.jpg', rating: 4.4},
    {airline: 'Tara Air', route: 'Pokhara to Jomsom', price: '$100/ticket', duration: '20 min', img: 'flight4.jpg', rating: 4.5}
  ];

  // Sort flights by rating in descending order (highest first)
  const sortedFlights = [...flights].sort((a, b) => b.rating - a.rating);

  sortedFlights.forEach((flight, i) => {
    const flightOption = document.createElement('div');
    flightOption.className = 'flight-option';
    flightOption.innerHTML = `
      <img src="${flight.img}" alt="${flight.airline}">
      <div class="info">
        <h5>${flight.airline}</h5>
        <p>${flight.route} • ${flight.price} • ${flight.duration} • ${flight.rating} ★</p>
        <div class="rating-stars" id="airlineStars_${i}" role="radiogroup" aria-label="Rate ${flight.airline}">
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
        <button class="btn btn-ghost" onclick="viewFlight('${flight.airline}')">View</button>
        <button class="btn btn-primary" onclick="bookFlight('${flight.airline}')">Book</button>
      </div>
    `;
    airplaneBooking.appendChild(flightOption);
  });
  // Initialize airline ratings
  sortedFlights.forEach((flight, i) => {
    initAirlineRating(i, flight.airline);
  });
}

function viewBus(name) {
  alert(`${name} — bus schedule and details. Full booking coming soon.`);
}

function bookBus(name) {
  alert(`Initiating booking for ${name} — demo.`);
}

function viewFlight(name) {
  alert(`${name} — flight details and schedule. Full booking coming soon.`);
}

function bookFlight(name) {
  alert(`Initiating booking for ${name} — demo.`);
}

// map helpers
function initMap(containerId, coords, title){
  const el = document.getElementById(containerId);
  if(!el) return;
  if(MAPS[containerId]){
    try{ MAPS[containerId].setView(coords, 9); MAPS[containerId + '_marker'].setLatLng(coords); } catch(e){}
    return;
  }
  const map = L.map(containerId, {zoomControl:false}).setView(coords, 9);
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
    weatherFeels.innerText = 'Feels like: —';
    weatherHumidity.innerText = 'Humidity: —';
    weatherPressure.innerText = 'Pressure: —';
    weatherUV.innerText = 'UV Index: —';

    const apiKey = '91990f72982a41738b293259250412';
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`);
    if (!response.ok) throw new Error('Weather API error');
    const data = await response.json();

    // Populate weather data
    weatherTemp.innerText = `${data.current.temp_c}°C`;
    weatherDesc.innerText = data.current.condition.text;
    weatherExtra.innerText = `Wind ${data.current.wind_kph} km/h • Updated`;
    weatherFeels.innerText = `Feels like: ${data.current.feelslike_c}°C`;
    weatherHumidity.innerText = `Humidity: ${data.current.humidity}%`;
    weatherPressure.innerText = `Pressure: ${data.current.pressure_mb} hPa`;
    weatherUV.innerText = `UV Index: ${data.current.uv}`;
  }catch(err){
    weatherTemp.innerText = '—';
    weatherDesc.innerText = 'Weather unavailable';
    weatherExtra.innerText = '';
    weatherFeels.innerText = 'Feels like: —';
    weatherHumidity.innerText = 'Humidity: —';
    weatherPressure.innerText = 'Pressure: —';
    weatherUV.innerText = 'UV Index: —';
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

window.addEventListener('resize', ()=> {
  if(MAPS['map']) MAPS['map'].invalidateSize && MAPS['map'].invalidateSize();
});

// Rating functions
function loadTrekRatings(trekId) {
  const ratings = JSON.parse(localStorage.getItem(`trekRatings_${trekId}`)) || [];
  return ratings;
}

function saveTrekRating(trekId, rating) {
  const ratings = loadTrekRatings(trekId);
  ratings.push(rating);
  localStorage.setItem(`trekRatings_${trekId}`, JSON.stringify(ratings));
}

function updateTrekRatingDisplay() {
  if (!currentTrek) return;
  const ratings = loadTrekRatings(currentTrek.id);
  const avg = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : '—';
  const count = ratings.length;
  document.getElementById('trekAvg').innerText = avg;
  document.getElementById('trekCount').innerText = count;
}

function initTrekRating() {
  const stars = document.querySelectorAll('#trekStars .rating-star');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.dataset.value);
      if (!currentTrek) return;
      saveTrekRating(currentTrek.id, rating);
      updateTrekRatingDisplay();
      // Update star display
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

function loadHotelRatings(trekId, hotelName) {
  const ratings = JSON.parse(localStorage.getItem(`hotelRatings_${trekId}_${hotelName}`)) || [];
  return ratings;
}

function saveHotelRating(trekId, hotelName, rating) {
  const ratings = loadHotelRatings(trekId, hotelName);
  ratings.push(rating);
  localStorage.setItem(`hotelRatings_${trekId}_${hotelName}`, JSON.stringify(ratings));
}

function updateHotelRatingDisplay(i, trekId, hotelName) {
  const ratings = loadHotelRatings(trekId, hotelName);
  const avg = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : '—';
  const count = ratings.length;
  document.getElementById(`hotelAvg_${i}`).innerText = avg;
  document.getElementById(`hotelCount_${i}`).innerText = count;
}

function initHotelRating(i, trekId, hotelName) {
  const stars = document.querySelectorAll(`#hotelStars_${i} .rating-star`);
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.dataset.value);
      saveHotelRating(trekId, hotelName, rating);
      updateHotelRatingDisplay(i, trekId, hotelName);
      // Update star display
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
      // Update star display
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
      // Update star display
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
