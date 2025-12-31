const FESTIVALS = {
  dashain: {
    id:'dashain',
    title:'Dashain',
    short:'Nepal’s largest festival — family reunions, tika and blessings.',
    long:`Dashain celebrates the victory of good over evil with family gatherings, blessings (tika), and festive fairs. Many Nepalis travel home for the holiday, so expect busy transport and limited services on main days.`,
    image:'dashaini.jpg',
    bestTime:'September–October (Ashwin)',
    tips:[
      'Book transport and accommodation well in advance.',
      'Respect private rituals and ask before taking photos of religious ceremonies.',
      'Expect many businesses to close on major days; plan supplies ahead.'
    ],
    foods:['Sel Roti','Kheer','Kwati (mixed bean soup)'],
    duration:'10–15 days',
    locations:'Nationwide (household centric)',
    family:'Yes',
    etiquette:[
      'Remove shoes when entering temples and some homes.',
      'Accept blessings (tika) respectfully with both hands.'
    ]
  },

  tihar: {
    id:'tihar',
    title:'Tihar (Deepawali)',
    short:'Five-day festival of lights honoring animals and goddess Laxmi.',
    long:`Tihar is a colorful five-day celebration with lamps (diyo), rangolis and animal veneration. Homes are decorated with lights and families perform puja for prosperity.`,
    image:'tiharfes.jpg',
    bestTime:'October–November (Kartik)',
    tips:[
      'Join neighborhood events to experience local rituals.',
      'Be cautious with candles and open flames in crowded alleys.',
      'Try visiting local homes (with permission) to see traditional decorations.'
    ],
    foods:['Sweet rice','Gwaramari','Local sweets'],
    duration:'5 days',
    locations:'Nationwide, especially Kathmandu Valley',
    family:'Yes',
    etiquette:[
      'Do not disturb puja rituals; observe quietly.',
      'When invited, follow hosts’ cues about offerings.'
    ]
  },

  holi: {
    id:'holi',
    title:'Holi',
    short:'Festival of colors and the arrival of spring.',
    long:`Holi is a lively and playful festival where people smear colors, dance and share sweets. It is best enjoyed in open, organized events to avoid unsafe situations.`,
    image:'holii.jpg',
    bestTime:'March (Phalguna)',
    tips:[
      'Use eco-friendly and skin-safe colors.',
      'Protect electronics and wear comfortable clothes.',
      'Join community events rather than chaotic street gatherings for a safer experience.'
    ],
    foods:['Gujiya','Thandai','Pulao'],
    duration:'1–2 days (main celebrations)',
    locations:'Nationwide, with large public celebrations in cities',
    family:'Mixed (some events are more boisterous)',
    etiquette:[
      'Always ask before applying color to someone who looks hesitant.',
      'Avoid aggressive behavior and respect personal boundaries.'
    ]
  },

  teej: {
    id:'teej',
    title:'Teej',
    short:'Women’s festival of fasting, songs and cultural processions.',
    long:`Teej is a women-focused festival marked by fasting, singing and processions in red attire. It’s a great opportunity to observe traditional music, dance and local costumes.`,
    image:'teeji.jpg',
    bestTime:'August–September (Bhadra)',
    tips:[
      'Observe respectfully — many participants fast and follow religious practices.',
      'Dress modestly if photographing processions and participants.',
      'Check local event schedules to watch processions and cultural shows.'
    ],
    foods:['Seasonal fruits','Special lentil dishes','Sweets after fast'],
    duration:'1–3 days',
    locations:'Kathmandu Valley and rural communities',
    family:'Women-focused (family-friendly to observe)',
    etiquette:[
      'Ask permission before taking close photos of participants.',
      'Offer help if you see someone in need; festivals can get crowded.'
    ]
  },

  bisket: {
    id:'bisket',
    title:'Bisket Jatra',
    short:'Bhaktapur New Year celebration with chariots and rivalry rituals.',
    long:`Bisket Jatra marks the Nepalese new year in Bhaktapur and is famous for massive chariot processions, friendly tug-of-war rituals and centuries-old Newar customs. The atmosphere is energetic and community-driven.`,
    image:'bisketjatrai.jpg',
    bestTime:'April (Nepali New Year)',
    tips:[
      'Wear comfortable shoes; streets are crowded and lively.',
      'Observe the tug-of-war (chariot pulling) from a safe distance.',
      'Respect local customs around chariot handling and temple rituals.'
    ],
    foods:['Juju Dhau (king curd)','Sukuti','Local fritters'],
    duration:'2–4 days',
    locations:'Bhaktapur primarily',
    family:'Yes (crowded)',
    etiquette:[
      'Do not obstruct processions; follow crowd flow.',
      'Ask before photographing ritual leaders or children.'
    ]
  },

  gai: {
    id:'gai',
    title:'Gai Jatra',
    short:'Humorous remembrance festival where families parade cows and costumes.',
    long:`Gai Jatra is a unique Kathmandu Valley festival where families who lost relatives during the year parade with cows (or representations) and perform satirical plays. It combines mourning with humor and social commentary.`,
    image:'gaijatrai.jpg',
    bestTime:'August (Bhadra)',
    tips:[
      'Be sensitive — the festival is about remembrance and humor together.',
      'Expect street performances and satirical shows; learn local context before photographing.',
      'Seek permission before joining families in intimate processions.'
    ],
    foods:['Local sweets','Haluwa','Samosa'],
    duration:'1–2 days',
    locations:'Kathmandu Valley',
    family:'Yes (respectful observation advised)',
    etiquette:[
      'Respect mourning families; be mindful with jokes or satire.',
      'Avoid loud disruptive behavior near processions.'
    ]
  },

  indra: {
    id:'indra',
    title:'Indra Jatra',
    short:'Kathmandu festival with masked dances, chariots and Kumari display.',
    long:`Indra Jatra is a major cultural festival in Kathmandu featuring masked dances, the chariot procession of living goddess Kumari (display), and traditional music—an important Newa celebration.`,
    image:'indr.jpg',
    bestTime:'September (Ashwin)',
    tips:[
      'Arrive early for good viewing spots during chariot parades.',
      'Wear modest clothing when visiting temple areas.',
      'Follow local announcements for event timings.'
    ],
    foods:['Sukuti','Pounded rice snacks','Street pakoras'],
    duration:'7–8 days',
    locations:'Kathmandu Durbar Square and surrounding areas',
    family:'Yes',
    etiquette:[
      'Keep noise respectful near religious ceremonies.',
      'Do not attempt to approach the Kumari during sensitive moments.'
    ]
  },

  rato: {
    id:'rato',
    title:'Rato Machindranath',
    short:'Chariot festival in Patan honoring the rain deity and community well-being.',
    long:`Rato Machindranath festival is a major procession in Lalitpur (Patan) where a beautifully decorated chariot carries the deity through town to pray for good rains and fertility. The event unites communities across the valley.`,
    image:'ratomachindranathii.jpg',
    bestTime:'April–June (varies)',
    tips:[
      'Expect long processions—plan to stay for portions rather than the whole route.',
      'Local guides can explain the many symbolic rituals.',
      'Bring water and sun protection during daytime events.'
    ],
    foods:['Seasonal local snacks','Sweet breads','Tea stalls along route'],
    duration:'Several days to weeks (procession stages)',
    locations:'Patan (Lalitpur)',
    family:'Yes',
    etiquette:[
      'Do not climb on chariot structures or ropes.',
      'Follow local volunteers’ guidance for safe viewing spots.'
    ]
  },

  chhath: {
    id:'chhath',
    title:'Chhath Puja',
    short:'Sun-worshipping festival celebrated on riverbanks with collective rituals.',
    long:`Chhath is an ancient Vedic festival dedicated to the Sun god, observed with ritual bathing, fasting and offerings at riverbanks during sunrise and sunset. It is celebrated with devotion in Terai and urban riverfronts.`,
    image:'chath.jpg',
    bestTime:'October–November (Kartika)',
    tips:[
      'Respect the sanctity of riverbank rituals and avoid disturbing devotees.',
      'Wear modest, respectful clothing and keep noise low near ceremonies.',
      'Bring a small offering if participating, but ask local organizers first.'
    ],
    foods:['Thekua','Seasonal fruits','Prasad sweets'],
    duration:'4 days',
    locations:'Terai regions and riverbanks in cities',
    family:'Yes (devotional)',
    etiquette:[
      'Keep distance during offerings and rituals.',
      'Follow instructions from organizers to maintain safety on riverbanks.'
    ]
  },

  shivaratri: {
    id:'shivaratri',
    title:'Maha Shivaratri',
    short:'Night-long Hindu festival venerating Lord Shiva with fasts and temple vigils.',
    long:`Maha Shivaratri is observed with night-long vigils, prayers and offerings to Lord Shiva. Pilgrims gather at major Shiva temples like Pashupatinath for rituals and communal worship.`,
    image:'shivaratrii.jpg',
    bestTime:'February–March (Falgun)',
    tips:[
      'If visiting temples at night, be prepared for crowds and limited transport.',
      'Dress modestly and follow temple rules for offerings.',
      'Stay hydrated and plan safe transport for late returns.'
    ],
    foods:['Prasad sweets','Dairy-based offerings','Simple festive meals'],
    duration:'One night (main observance)',
    locations:'Major Shiva temples nationwide',
    family:'Yes',
    etiquette:[
      'Observe temple protocols; do not enter restricted areas.',
      'Be respectful during intense devotional activities and chants.'
    ]
  }

};

// state & DOM refs
let current = null;
const detailPanel = document.getElementById('detailPanel');
const detailTitle = document.getElementById('detailTitle');
const shortDesc = document.getElementById('shortDesc');
const heroImage = document.getElementById('heroImage');
const longDesc = document.getElementById('longDesc');
const bestTimeEl = document.getElementById('bestTime');
const tipsEl = document.getElementById('tips');
const foodsEl = document.getElementById('foods');
const durationEl = document.getElementById('duration');
const locationsEl = document.getElementById('locations');
const familyEl = document.getElementById('family');
const etiquetteEl = document.getElementById('etiquette');

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(()=>document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible')),60);
  document.getElementById('year').innerText = new Date().getFullYear();

  document.querySelectorAll('#cards .card').forEach(c=>{
    c.addEventListener('click', () => openDetail(c.dataset.id));
  });

  document.getElementById('backBtn').addEventListener('click', () => {
    detailPanel.classList.remove('show');
    window.scrollTo({top:document.getElementById('explore').offsetTop - 20, behavior:'smooth'});
  });
});

function openDetail(id){
  const f = FESTIVALS[id];
  if(!f) return;
  current = f;

  detailTitle.innerText = f.title;
  shortDesc.innerText = f.short;
  heroImage.src = f.image;
  heroImage.alt = f.title;
  longDesc.innerText = f.long;
  bestTimeEl.innerText = f.bestTime;
  durationEl.innerText = f.duration;
  locationsEl.innerText = f.locations;
  familyEl.innerText = f.family;

  // tips
  tipsEl.innerHTML = '';
  (f.tips || []).forEach(t => {
    const li = document.createElement('li');
    li.style.color = 'var(--muted)';
    li.style.margin = '6px 0';
    li.innerText = t;
    tipsEl.appendChild(li);
  });

  // foods chips
  foodsEl.innerHTML = '';
  (f.foods || []).forEach(food => {
    const d = document.createElement('div');
    d.className = 'chip';
    d.innerText = food;
    foodsEl.appendChild(d);
  });

  // etiquette
  etiquetteEl.innerHTML = '';
  (f.etiquette || []).forEach(e => {
    const li = document.createElement('li');
    li.style.color = 'var(--muted)';
    li.style.margin = '6px 0';
    li.innerText = e;
    etiquetteEl.appendChild(li);
  });

  detailPanel.classList.add('show');
  setTimeout(()=> detailPanel.scrollIntoView({behavior:'smooth', block:'start'}),80);
}