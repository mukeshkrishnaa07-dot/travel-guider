import { useState, useEffect } from "react";

/* ══════════════════════════════════════════════════
   DATA — 20 destinations (12 India + 8 World)
══════════════════════════════════════════════════ */
const PLACES = [
  /* ─── INDIA ─── */
  {
    id:"rajasthan",name:"Rajasthan",country:"India",region:"india",
    tagline:"Land of Kings & Colour",emoji:"🏰",
    grad:["#b5451b","#e07b39"],badge:"🇮🇳 India",badgeBg:"#fff3e0",badgeC:"#b5451b",
    desc:"Magnificent forts, golden deserts, and the most vivid bazaars on earth.",
    mood:["Heritage","Desert","Culture","Forts"],
    hotelPriceINR:3500, foodPriceINR:800, attractionPriceINR:500,
    hotels:[
      {id:"h1",name:"Rambagh Palace",stars:5,rating:4.9,reviews:3400,priceINR:35000,priceFMT:"₹35,000/night",dist:"3km from City Palace",img:"🏯",desc:"Former Maharaja residence, now a luxury palace hotel.",badge:"Heritage Palace"},
      {id:"h2",name:"Umaid Bhawan Palace",stars:5,rating:4.8,reviews:2100,priceINR:28000,priceFMT:"₹28,000/night",dist:"2km from Jodhpur Clock Tower",img:"🕌",desc:"Part of this sandstone palace is still the royal family's home.",badge:"Royal Stay"},
      {id:"h3",name:"Suryagarh Jaisalmer",stars:5,rating:4.7,reviews:1800,priceINR:18000,priceFMT:"₹18,000/night",dist:"4km from Golden Fort",img:"🏜️",desc:"A fortress-resort rising from the Thar Desert sands.",badge:"Desert Luxury"},
      {id:"h4",name:"Zostel Jaipur",stars:2,rating:4.3,reviews:6200,priceINR:800,priceFMT:"₹800/night",dist:"0.5km from Hawa Mahal",img:"🎒",desc:"Vibrant hostel loved by backpackers.",badge:"Budget Pick"},
    ],
    restaurants:[
      {id:"r1",name:"Suvarna Mahal",cuisine:"Rajasthani Royal",rating:4.9,reviews:1200,priceINR:2500,priceFMT:"₹₹₹₹",specialty:"Dal Baati Churma & Laal Maas",img:"🍛"},
      {id:"r2",name:"Chokhi Dhani",cuisine:"Village Experience",rating:4.7,reviews:9800,priceINR:600,priceFMT:"₹₹",specialty:"Bajre ki Roti & Ker Sangri",img:"🪔"},
      {id:"r3",name:"1135 AD",cuisine:"Medieval Rajput",rating:4.8,reviews:3400,priceINR:1800,priceFMT:"₹₹₹",specialty:"Safed Maas & Rajasthani Thali",img:"🏰"},
      {id:"r4",name:"Peacock Rooftop",cuisine:"Multi-cuisine",rating:4.5,reviews:7600,priceINR:700,priceFMT:"₹₹",specialty:"Rajasthani Pyaaz Kachori",img:"🦚"},
    ],
    attractions:[
      {name:"Amber Fort",type:"Heritage",rating:4.9,priceINR:500},
      {name:"Jaisalmer Fort",type:"Heritage",rating:4.8,priceINR:300},
      {name:"Thar Desert Safari",type:"Adventure",rating:4.8,priceINR:2000},
      {name:"City Palace Jaipur",type:"Historic",rating:4.7,priceINR:400},
    ],
  },
  {
    id:"kerala",name:"Kerala",country:"India",region:"india",
    tagline:"God's Own Country",emoji:"🌴",
    grad:["#1b7a3e","#56ab2f"],badge:"🇮🇳 India",badgeBg:"#e8f5e9",badgeC:"#1b5e20",
    desc:"Backwater houseboats, spice plantations, and serene Ayurvedic retreats.",
    mood:["Nature","Backwaters","Wellness","Beaches"],
    hotelPriceINR:2200, foodPriceINR:600, attractionPriceINR:300,
    hotels:[
      {id:"h1",name:"Kumarakom Lake Resort",stars:5,rating:4.9,reviews:2800,priceINR:22000,priceFMT:"₹22,000/night",dist:"0km from Vembanad Lake",img:"🛶",desc:"Luxury villas on Vembanad Lake with infinity pools.",badge:"Backwater Gem"},
      {id:"h2",name:"Taj Green Cove Kovalam",stars:5,rating:4.8,reviews:1900,priceINR:18000,priceFMT:"₹18,000/night",dist:"0.2km from Kovalam Beach",img:"🏖️",desc:"Clifftop resort with Ayurvedic spa.",badge:"Beach Luxury"},
      {id:"h3",name:"Spice Village Thekkady",stars:4,rating:4.7,reviews:2400,priceINR:9000,priceFMT:"₹9,000/night",dist:"1km from Periyar Wildlife",img:"🌿",desc:"Eco-resort amid a spice plantation.",badge:"Eco Retreat"},
      {id:"h4",name:"Zostel Alleppey",stars:2,rating:4.4,reviews:5100,priceINR:700,priceFMT:"₹700/night",dist:"0.5km from Alleppey Jetty",img:"⛵",desc:"Social hostel steps from houseboat jetty.",badge:"Budget Pick"},
    ],
    restaurants:[
      {id:"r1",name:"Malabar Junction",cuisine:"Kerala Fine Dining",rating:4.8,reviews:2100,priceINR:1200,priceFMT:"₹₹₹",specialty:"Karimeen Pollichathu & Avial",img:"🐟"},
      {id:"r2",name:"Dhe Puttu",cuisine:"Kerala Breakfast",rating:4.7,reviews:8400,priceINR:200,priceFMT:"₹",specialty:"Puttu with Kadala Curry",img:"🫙"},
      {id:"r3",name:"Paragon Restaurant",cuisine:"Malabar",rating:4.6,reviews:12000,priceINR:500,priceFMT:"₹₹",specialty:"Malabar Biryani",img:"🍚"},
      {id:"r4",name:"Oceanos",cuisine:"Seafood",rating:4.5,reviews:3700,priceINR:1400,priceFMT:"₹₹₹",specialty:"Kerala Prawn Moilee",img:"🦐"},
    ],
    attractions:[
      {name:"Alleppey Backwaters",type:"Nature",rating:4.9,priceINR:1500},
      {name:"Munnar Tea Gardens",type:"Nature",rating:4.8,priceINR:200},
      {name:"Periyar Wildlife",type:"Wildlife",rating:4.7,priceINR:400},
      {name:"Fort Kochi",type:"Historic",rating:4.6,priceINR:0},
    ],
  },
  {
    id:"agra",name:"Agra & Taj Mahal",country:"India",region:"india",
    tagline:"Monument to Eternal Love",emoji:"🕌",
    grad:["#6a1b9a","#ab47bc"],badge:"🇮🇳 India",badgeBg:"#f3e5f5",badgeC:"#6a1b9a",
    desc:"The world's greatest love story written in white marble under the Indian sky.",
    mood:["Heritage","Romance","History","Architecture"],
    hotelPriceINR:5500, foodPriceINR:700, attractionPriceINR:1100,
    hotels:[
      {id:"h1",name:"The Oberoi Amarvilas",stars:5,rating:5.0,reviews:4200,priceINR:55000,priceFMT:"₹55,000/night",dist:"0.6km from Taj Mahal",img:"🏛️",desc:"Every room has a direct view of the Taj Mahal.",badge:"Taj View"},
      {id:"h2",name:"ITC Mughal Agra",stars:5,rating:4.8,reviews:3100,priceINR:20000,priceFMT:"₹20,000/night",dist:"2km from Taj Mahal",img:"🌹",desc:"Mughal-inspired architecture across 35 acres.",badge:"Mughal Luxury"},
      {id:"h3",name:"Trident Agra",stars:5,rating:4.6,reviews:2600,priceINR:12000,priceFMT:"₹12,000/night",dist:"1km from Taj Mahal",img:"🏨",desc:"Modern luxury with an outdoor pool.",badge:"Classic Stay"},
      {id:"h4",name:"Hotel Kamal",stars:2,rating:4.1,reviews:9800,priceINR:1200,priceFMT:"₹1,200/night",dist:"0.2km from South Gate",img:"🎒",desc:"Legendary budget hotel since the 1970s.",badge:"Budget Classic"},
    ],
    restaurants:[
      {id:"r1",name:"Esphahan (Amarvilas)",cuisine:"Mughal Fine Dining",rating:5.0,reviews:1800,priceINR:4000,priceFMT:"₹₹₹₹",specialty:"Dum Pukht Biryani",img:"👑"},
      {id:"r2",name:"Pind Balluchi",cuisine:"North Indian",rating:4.6,reviews:6700,priceINR:800,priceFMT:"₹₹",specialty:"Dal Makhani & Tandoori",img:"🍢"},
      {id:"r3",name:"Dasaprakash",cuisine:"South Indian",rating:4.5,reviews:8900,priceINR:300,priceFMT:"₹",specialty:"Masala Dosa",img:"🥘"},
      {id:"r4",name:"Mama Chicken",cuisine:"Street Food",rating:4.4,reviews:14000,priceINR:200,priceFMT:"₹",specialty:"Agra Petha & Bedai Sabzi",img:"🌮"},
    ],
    attractions:[
      {name:"Taj Mahal",type:"Wonder",rating:5.0,priceINR:1100},
      {name:"Agra Fort",type:"Heritage",rating:4.7,priceINR:650},
      {name:"Fatehpur Sikri",type:"Historic",rating:4.6,priceINR:610},
      {name:"Mehtab Bagh",type:"Garden",rating:4.4,priceINR:300},
    ],
  },
  {
    id:"goa",name:"Goa",country:"India",region:"india",
    tagline:"Sun, Sand & Spice",emoji:"🏄",
    grad:["#0077b6","#48cae4"],badge:"🇮🇳 India",badgeBg:"#e3f2fd",badgeC:"#0077b6",
    desc:"Portuguese-flavoured beaches, cashew feni, and the most relaxed vibe in India.",
    mood:["Beach","Nightlife","Food","Relaxation"],
    hotelPriceINR:2500, foodPriceINR:700, attractionPriceINR:200,
    hotels:[
      {id:"h1",name:"Taj Exotica Goa",stars:5,rating:4.9,reviews:5400,priceINR:25000,priceFMT:"₹25,000/night",dist:"0km from Benaulim Beach",img:"🌊",desc:"56 acres of lush gardens on South Goa's pristine stretch.",badge:"Beach Resort"},
      {id:"h2",name:"W Goa",stars:5,rating:4.8,reviews:4200,priceINR:22000,priceFMT:"₹22,000/night",dist:"0.1km from Vagator Beach",img:"🎉",desc:"Cliffside resort with iconic SPICE pool party.",badge:"Party Luxury"},
      {id:"h3",name:"Siolim House",stars:4,rating:4.7,reviews:1200,priceINR:8000,priceFMT:"₹8,000/night",dist:"5km from Chapora Fort",img:"🏡",desc:"Restored 300-year-old Portuguese mansion.",badge:"Heritage Stay"},
      {id:"h4",name:"Jungle Hostel Anjuna",stars:2,rating:4.5,reviews:7800,priceINR:600,priceFMT:"₹600/night",dist:"0.5km from Anjuna Market",img:"🌴",desc:"Hammocks in the trees, cheapest beers, best stories.",badge:"Backpacker Fave"},
    ],
    restaurants:[
      {id:"r1",name:"Fisherman's Wharf",cuisine:"Goan Seafood",rating:4.8,reviews:12000,priceINR:1500,priceFMT:"₹₹₹",specialty:"Goan Fish Curry Rice",img:"🐠"},
      {id:"r2",name:"Gunpowder Assagao",cuisine:"South Indian",rating:4.8,reviews:8400,priceINR:900,priceFMT:"₹₹",specialty:"Coorgi Pork & Appam",img:"🌶️"},
      {id:"r3",name:"Vinayak Family Restaurant",cuisine:"Goan Home Food",rating:4.6,reviews:9800,priceINR:400,priceFMT:"₹",specialty:"Chicken Xacuti",img:"🍽️"},
      {id:"r4",name:"Mum's Kitchen",cuisine:"Heritage Goan",rating:4.7,reviews:6200,priceINR:1000,priceFMT:"₹₹",specialty:"Duck Vindaloo",img:"🦆"},
    ],
    attractions:[
      {name:"Baga Beach",type:"Beach",rating:4.6,priceINR:0},
      {name:"Dudhsagar Falls",type:"Nature",rating:4.8,priceINR:800},
      {name:"Old Goa Churches",type:"Heritage",rating:4.7,priceINR:0},
      {name:"Anjuna Flea Market",type:"Shopping",rating:4.4,priceINR:0},
    ],
  },
  {
    id:"mumbai",name:"Mumbai",country:"India",region:"india",
    tagline:"City of Dreams & Bollywood",emoji:"🌆",
    grad:["#c62828","#ef5350"],badge:"🇮🇳 India",badgeBg:"#ffebee",badgeC:"#c62828",
    desc:"The financial capital where street food royalty meets Art Deco grandeur.",
    mood:["Urban","Bollywood","Food","Nightlife"],
    hotelPriceINR:4500, foodPriceINR:900, attractionPriceINR:400,
    hotels:[
      {id:"h1",name:"Taj Mahal Palace",stars:5,rating:4.9,reviews:8900,priceINR:45000,priceFMT:"₹45,000/night",dist:"0km from Gateway of India",img:"🏰",desc:"India's most iconic hotel facing the Arabian Sea since 1903.",badge:"Most Iconic"},
      {id:"h2",name:"The Oberoi Mumbai",stars:5,rating:4.8,reviews:4200,priceINR:28000,priceFMT:"₹28,000/night",dist:"Marine Drive",img:"🌊",desc:"Stunning sea views at Marine Drive.",badge:"Sea View"},
      {id:"h3",name:"ITC Grand Central",stars:5,rating:4.6,reviews:2800,priceINR:15000,priceFMT:"₹15,000/night",dist:"Parel",img:"🏨",desc:"Heritage mill district hotel with rooftop pool.",badge:"Heritage Stay"},
      {id:"h4",name:"Zostel Mumbai",stars:2,rating:4.3,reviews:7600,priceINR:900,priceFMT:"₹900/night",dist:"Colaba",img:"🎒",desc:"Backpacker hub steps from Colaba Causeway.",badge:"Budget Pick"},
    ],
    restaurants:[
      {id:"r1",name:"Wasabi by Morimoto",cuisine:"Japanese",rating:4.9,reviews:2100,priceINR:5000,priceFMT:"₹₹₹₹",specialty:"Omakase & Black Cod",img:"🍣"},
      {id:"r2",name:"Trishna",cuisine:"Coastal Seafood",rating:4.8,reviews:9800,priceINR:2000,priceFMT:"₹₹₹",specialty:"Butter Garlic Crab",img:"🦀"},
      {id:"r3",name:"Bademiya",cuisine:"Mumbai Street Food",rating:4.6,reviews:22000,priceINR:300,priceFMT:"₹",specialty:"Seekh Kebab Rolls",img:"🌯"},
      {id:"r4",name:"Khyber",cuisine:"Mughlai",rating:4.7,reviews:14000,priceINR:1500,priceFMT:"₹₹₹",specialty:"Raan & Biryani",img:"🍛"},
    ],
    attractions:[
      {name:"Gateway of India",type:"Landmark",rating:4.7,priceINR:0},
      {name:"Elephanta Caves",type:"Heritage",rating:4.6,priceINR:600},
      {name:"Marine Drive",type:"Scenic",rating:4.8,priceINR:0},
      {name:"Dharavi & Dhobi Ghat",type:"Cultural",rating:4.5,priceINR:700},
    ],
  },
  {
    id:"delhi",name:"Delhi",country:"India",region:"india",
    tagline:"Capital of a Thousand Stories",emoji:"🏛️",
    grad:["#4a148c","#7b1fa2"],badge:"🇮🇳 India",badgeBg:"#f3e5f5",badgeC:"#4a148c",
    desc:"Mughal grandeur, colonial boulevards, and the world's greatest street food.",
    mood:["Heritage","History","Food","Urban"],
    hotelPriceINR:4000, foodPriceINR:700, attractionPriceINR:500,
    hotels:[
      {id:"h1",name:"The Imperial New Delhi",stars:5,rating:4.9,reviews:5600,priceINR:40000,priceFMT:"₹40,000/night",dist:"Connaught Place",img:"🏛️",desc:"1930s Art Deco landmark on Janpath.",badge:"Heritage Luxury"},
      {id:"h2",name:"Taj Palace Delhi",stars:5,rating:4.8,reviews:3800,priceINR:25000,priceFMT:"₹25,000/night",dist:"Diplomatic Enclave",img:"👑",desc:"Gold-accented luxury in the diplomatic zone.",badge:"Palace Hotel"},
      {id:"h3",name:"Lemon Tree Premier",stars:4,rating:4.5,reviews:4200,priceINR:8000,priceFMT:"₹8,000/night",dist:"Aerocity",img:"🍋",desc:"Modern hotel near IGI Airport.",badge:"Business Stay"},
      {id:"h4",name:"Madpackers Hostel",stars:2,rating:4.4,reviews:8900,priceINR:700,priceFMT:"₹700/night",dist:"Hauz Khas",img:"🎒",desc:"Best hostel in Delhi, vibrant social scene.",badge:"Budget Pick"},
    ],
    restaurants:[
      {id:"r1",name:"Indian Accent",cuisine:"Modern Indian",rating:4.9,reviews:3400,priceINR:4500,priceFMT:"₹₹₹₹",specialty:"Doda Barfi Treacle Tart",img:"🍽️"},
      {id:"r2",name:"Karim's",cuisine:"Mughlai",rating:4.7,reviews:28000,priceINR:400,priceFMT:"₹",specialty:"Mutton Korma since 1913",img:"🍖"},
      {id:"r3",name:"Paranthe Wali Gali",cuisine:"Street Food",rating:4.6,reviews:18000,priceINR:150,priceFMT:"₹",specialty:"Stuffed Paranthas",img:"🫓"},
      {id:"r4",name:"Bukhara",cuisine:"Northwest Frontier",rating:4.8,reviews:6700,priceINR:3500,priceFMT:"₹₹₹₹",specialty:"Dal Bukhara & Seekh Kebab",img:"🔥"},
    ],
    attractions:[
      {name:"Red Fort",type:"Heritage",rating:4.8,priceINR:600},
      {name:"Qutub Minar",type:"Historic",rating:4.7,priceINR:650},
      {name:"India Gate",type:"Landmark",rating:4.6,priceINR:0},
      {name:"Humayun's Tomb",type:"Heritage",rating:4.7,priceINR:600},
    ],
  },
  {
    id:"varanasi",name:"Varanasi",country:"India",region:"india",
    tagline:"Soul of India on the Ganga",emoji:"🪔",
    grad:["#e65100","#ff8f00"],badge:"🇮🇳 India",badgeBg:"#fff8e1",badgeC:"#e65100",
    desc:"The oldest living city on earth — ghats, Ganga Aarti, and spiritual liberation.",
    mood:["Spiritual","Heritage","Culture","Photography"],
    hotelPriceINR:2000, foodPriceINR:300, attractionPriceINR:200,
    hotels:[
      {id:"h1",name:"Taj Nadesar Palace",stars:5,rating:4.9,reviews:1800,priceINR:20000,priceFMT:"₹20,000/night",dist:"City Centre",img:"🏯",desc:"200-year-old palace with organic orchard.",badge:"Heritage Palace"},
      {id:"h2",name:"BrijRama Palace",stars:5,rating:4.8,reviews:2200,priceINR:15000,priceFMT:"₹15,000/night",dist:"Darbhanga Ghat",img:"🌅",desc:"18th-century palace on the holy Ganges.",badge:"Ganga View"},
      {id:"h3",name:"Hotel Ganges View",stars:3,rating:4.5,reviews:3400,priceINR:4000,priceFMT:"₹4,000/night",dist:"Assi Ghat",img:"🛕",desc:"Charming heritage hotel above Assi Ghat.",badge:"Ghat Side"},
      {id:"h4",name:"Stops Hostel Varanasi",stars:2,rating:4.2,reviews:5600,priceINR:600,priceFMT:"₹600/night",dist:"Godaulia",img:"🎒",desc:"Backpacker favourite near the main ghats.",badge:"Budget Pick"},
    ],
    restaurants:[
      {id:"r1",name:"Pizzeria Vatika Café",cuisine:"Multi-cuisine",rating:4.6,reviews:6800,priceINR:400,priceFMT:"₹₹",specialty:"Banana Lassi & Thali",img:"🍹"},
      {id:"r2",name:"Kashi Chaat Bhandar",cuisine:"Street Food",rating:4.8,reviews:12000,priceINR:100,priceFMT:"₹",specialty:"Tamatar Chaat & Thandai",img:"🥗"},
      {id:"r3",name:"Aadha-Aadha",cuisine:"North Indian",rating:4.5,reviews:4500,priceINR:500,priceFMT:"₹₹",specialty:"Baati Chokha",img:"🍲"},
      {id:"r4",name:"Dosa Café",cuisine:"South Indian",rating:4.4,reviews:8900,priceINR:200,priceFMT:"₹",specialty:"Paper Dosa & Filter Coffee",img:"🥞"},
    ],
    attractions:[
      {name:"Dashashwamedh Ghat Aarti",type:"Spiritual",rating:5.0,priceINR:0},
      {name:"Kashi Vishwanath Temple",type:"Spiritual",rating:4.9,priceINR:0},
      {name:"Sarnath",type:"Buddhist",rating:4.7,priceINR:300},
      {name:"Ganga Boat Ride",type:"Experience",rating:4.8,priceINR:400},
    ],
  },
  {
    id:"darjeeling",name:"Darjeeling",country:"India",region:"india",
    tagline:"Queen of the Hills & Tea",emoji:"🍵",
    grad:["#2e7d32","#66bb6a"],badge:"🇮🇳 India",badgeBg:"#e8f5e9",badgeC:"#1b5e20",
    desc:"Snow-capped Himalayas, toy train rides, and the world's finest tea estates.",
    mood:["Hills","Tea","Nature","Photography"],
    hotelPriceINR:3000, foodPriceINR:400, attractionPriceINR:300,
    hotels:[
      {id:"h1",name:"Makaibari Bungalow",stars:4,rating:4.8,reviews:1400,priceINR:8000,priceFMT:"₹8,000/night",dist:"Tea Estate",img:"🌿",desc:"Stay inside a UNESCO-nominated tea estate.",badge:"Tea Estate"},
      {id:"h2",name:"Windamere Hotel",stars:4,rating:4.7,reviews:2200,priceINR:12000,priceFMT:"₹12,000/night",dist:"Observatory Hill",img:"🏔️",desc:"1887 heritage hotel with Kanchenjunga views.",badge:"Heritage Stay"},
      {id:"h3",name:"Cedar Inn",stars:3,rating:4.4,reviews:3100,priceINR:5000,priceFMT:"₹5,000/night",dist:"Mall Road",img:"🌲",desc:"Cozy cottages with mountain and valley views.",badge:"Valley View"},
      {id:"h4",name:"Zostel Darjeeling",stars:2,rating:4.3,reviews:4600,priceINR:650,priceFMT:"₹650/night",dist:"Chowrasta",img:"🎒",desc:"Social hostel in the heart of Darjeeling.",badge:"Budget Pick"},
    ],
    restaurants:[
      {id:"r1",name:"Glenary's",cuisine:"Café & Bakery",rating:4.7,reviews:14000,priceINR:600,priceFMT:"₹₹",specialty:"Darjeeling Tea & Apple Pastry",img:"☕"},
      {id:"r2",name:"Kunga Restaurant",cuisine:"Tibetan",rating:4.6,reviews:8900,priceINR:350,priceFMT:"₹",specialty:"Thukpa & Momos",img:"🥟"},
      {id:"r3",name:"The Park Restaurant",cuisine:"Continental",rating:4.5,reviews:3400,priceINR:900,priceFMT:"₹₹",specialty:"Colonial-era roast & tea",img:"🍽️"},
      {id:"r4",name:"Penang",cuisine:"Chinese-Indian",rating:4.4,reviews:6700,priceINR:400,priceFMT:"₹₹",specialty:"Chilli Chicken & Fried Rice",img:"🍜"},
    ],
    attractions:[
      {name:"Tiger Hill Sunrise",type:"Scenic",rating:4.9,priceINR:0},
      {name:"Darjeeling Toy Train",type:"Experience",rating:4.8,priceINR:1200},
      {name:"Batasia Loop",type:"Scenic",rating:4.6,priceINR:50},
      {name:"Happy Valley Tea Estate",type:"Nature",rating:4.5,priceINR:200},
    ],
  },
  {
    id:"andaman",name:"Andaman Islands",country:"India",region:"india",
    tagline:"India's Tropical Paradise",emoji:"🏝️",
    grad:["#006994","#00b4d8"],badge:"🇮🇳 India",badgeBg:"#e0f7fa",badgeC:"#006064",
    desc:"Crystal-clear turquoise water, pristine coral reefs, and empty white beaches.",
    mood:["Beach","Diving","Nature","Islands"],
    hotelPriceINR:3500, foodPriceINR:700, attractionPriceINR:600,
    hotels:[
      {id:"h1",name:"Taj Coral Reef Resort",stars:5,rating:4.9,reviews:2100,priceINR:30000,priceFMT:"₹30,000/night",dist:"Havelock Island",img:"🐠",desc:"Overwater bungalows on Radhanagar Beach.",badge:"Overwater Villas"},
      {id:"h2",name:"SeaShell Port Blair",stars:4,rating:4.6,reviews:3400,priceINR:10000,priceFMT:"₹10,000/night",dist:"Port Blair",img:"🐚",desc:"Modern resort with sea-facing rooms.",badge:"Sea View"},
      {id:"h3",name:"Symphony Palms",stars:4,rating:4.5,reviews:2800,priceINR:7000,priceFMT:"₹7,000/night",dist:"Havelock",img:"🌴",desc:"Boutique resort near Radhanagar Beach.",badge:"Boutique"},
      {id:"h4",name:"Barefoot at Havelock",stars:3,rating:4.3,reviews:4600,priceINR:3500,priceFMT:"₹3,500/night",dist:"Beach No.7",img:"🏕️",desc:"Eco-resort steps from the beach.",badge:"Eco Stay"},
    ],
    restaurants:[
      {id:"r1",name:"Anja Café Havelock",cuisine:"Seafood",rating:4.8,reviews:6700,priceINR:1200,priceFMT:"₹₹₹",specialty:"Grilled Lobster & Fish Tikka",img:"🦞"},
      {id:"r2",name:"Full Moon Café",cuisine:"Multi-cuisine",rating:4.6,reviews:9800,priceINR:700,priceFMT:"₹₹",specialty:"Coconut Fish Curry",img:"🌕"},
      {id:"r3",name:"New Lighthouse Restaurant",cuisine:"Seafood",rating:4.5,reviews:5600,priceINR:900,priceFMT:"₹₹",specialty:"Crab Masala & Squid Fry",img:"🦀"},
      {id:"r4",name:"Mandalay Restaurant",cuisine:"Thai-Indian",rating:4.4,reviews:3200,priceINR:500,priceFMT:"₹₹",specialty:"Green Curry & Pad Thai",img:"🍛"},
    ],
    attractions:[
      {name:"Radhanagar Beach",type:"Beach",rating:4.9,priceINR:0},
      {name:"Cellular Jail",type:"Historic",rating:4.7,priceINR:300},
      {name:"Scuba Diving Elephant Beach",type:"Adventure",rating:4.9,priceINR:3500},
      {name:"Ross Island",type:"Historic",rating:4.5,priceINR:50},
    ],
  },
  {
    id:"mysuru",name:"Mysuru",country:"India",region:"india",
    tagline:"City of Palaces & Silk",emoji:"🏯",
    grad:["#7b1fa2","#ce93d8"],badge:"🇮🇳 India",badgeBg:"#f3e5f5",badgeC:"#7b1fa2",
    desc:"Magnificent Wadiyar palace, fragrant sandal, and the grandest Dasara procession.",
    mood:["Heritage","Silk","Culture","Gardens"],
    hotelPriceINR:2500, foodPriceINR:500, attractionPriceINR:300,
    hotels:[
      {id:"h1",name:"Lalitha Mahal Palace Hotel",stars:5,rating:4.8,reviews:2800,priceINR:18000,priceFMT:"₹18,000/night",dist:"2km from Mysore Palace",img:"🏛️",desc:"Former Maharaja guest house, now a palace hotel.",badge:"Heritage Palace"},
      {id:"h2",name:"Radisson Blu Mysore",stars:5,rating:4.6,reviews:3400,priceINR:10000,priceFMT:"₹10,000/night",dist:"City Centre",img:"🏨",desc:"Modern luxury in the heart of Mysuru.",badge:"City Luxury"},
      {id:"h3",name:"Green Hotel",stars:3,rating:4.5,reviews:2100,priceINR:4000,priceFMT:"₹4,000/night",dist:"Jayalakshmipuram",img:"🌿",desc:"Eco-friendly heritage building with garden.",badge:"Eco Stay"},
      {id:"h4",name:"Zostel Mysore",stars:2,rating:4.2,reviews:5600,priceINR:650,priceFMT:"₹650/night",dist:"Near Palace",img:"🎒",desc:"Colorful backpacker hostel near the palace.",badge:"Budget Pick"},
    ],
    restaurants:[
      {id:"r1",name:"Lalitha Mahal Dining",cuisine:"Indian Royal",rating:4.7,reviews:3400,priceINR:2000,priceFMT:"₹₹₹",specialty:"Mysore Pak & Royal Thali",img:"👑"},
      {id:"r2",name:"Hotel RRR",cuisine:"South Indian",rating:4.6,reviews:12000,priceINR:200,priceFMT:"₹",specialty:"Unlimited South Indian Thali",img:"🍽️"},
      {id:"r3",name:"Vinayaka Mylari",cuisine:"Breakfast",rating:4.8,reviews:18000,priceINR:100,priceFMT:"₹",specialty:"Soft Idli & Butter Dosa",img:"🫙"},
      {id:"r4",name:"Oyster Bay",cuisine:"Seafood",rating:4.5,reviews:4500,priceINR:1200,priceFMT:"₹₹₹",specialty:"Neer Dosa & Prawn Masala",img:"🦐"},
    ],
    attractions:[
      {name:"Mysore Palace",type:"Heritage",rating:4.9,priceINR:100},
      {name:"Chamundi Hills",type:"Spiritual",rating:4.7,priceINR:0},
      {name:"Brindavan Gardens",type:"Garden",rating:4.5,priceINR:80},
      {name:"Mysore Zoo",type:"Wildlife",rating:4.6,priceINR:100},
    ],
  },
  {
    id:"rishikesh",name:"Rishikesh & Haridwar",country:"India",region:"india",
    tagline:"Yoga Capital of the World",emoji:"🧘",
    grad:["#2e7d32","#8bc34a"],badge:"🇮🇳 India",badgeBg:"#f1f8e9",badgeC:"#33691e",
    desc:"Rafting on the Ganga, sunrise yoga, and the most powerful Ganga Aarti on earth.",
    mood:["Spiritual","Adventure","Yoga","Nature"],
    hotelPriceINR:1800, foodPriceINR:300, attractionPriceINR:200,
    hotels:[
      {id:"h1",name:"Aloha on the Ganges",stars:4,rating:4.7,reviews:2400,priceINR:12000,priceFMT:"₹12,000/night",dist:"Tapovan",img:"🌊",desc:"Luxury tents and cottages on the Ganga banks.",badge:"Riverside Luxury"},
      {id:"h2",name:"Moustache Hostel",stars:3,rating:4.6,reviews:9800,priceINR:3500,priceFMT:"₹3,500/night",dist:"Lakshman Jhula",img:"🏕️",desc:"Award-winning hostel with Ganga view café.",badge:"Best Hostel"},
      {id:"h3",name:"Taj Rishikesh Resort",stars:5,rating:4.9,reviews:1800,priceINR:30000,priceFMT:"₹30,000/night",dist:"Shivpuri",img:"🌿",desc:"Luxury eco-resort amid Himalayan forests.",badge:"Luxury Eco"},
      {id:"h4",name:"Zostel Rishikesh",stars:2,rating:4.4,reviews:12000,priceINR:550,priceFMT:"₹550/night",dist:"Ram Jhula",img:"🎒",desc:"Social hostel near the famous suspension bridge.",badge:"Budget Pick"},
    ],
    restaurants:[
      {id:"r1",name:"Chotiwala",cuisine:"North Indian",rating:4.5,reviews:22000,priceINR:300,priceFMT:"₹",specialty:"Veg Thali & Lassi",img:"🍲"},
      {id:"r2",name:"Little Buddha Café",cuisine:"Multi-cuisine",rating:4.6,reviews:14000,priceINR:500,priceFMT:"₹₹",specialty:"Banana Pancakes & Fresh Juice",img:"🧘"},
      {id:"r3",name:"Madras Café",cuisine:"South Indian",rating:4.4,reviews:8900,priceINR:200,priceFMT:"₹",specialty:"Filter Coffee & Uttapam",img:"☕"},
      {id:"r4",name:"Rainforest Restaurant",cuisine:"Multi-cuisine",rating:4.7,reviews:6700,priceINR:700,priceFMT:"₹₹",specialty:"Riverside dining thali",img:"🌲"},
    ],
    attractions:[
      {name:"Ganga Aarti Haridwar",type:"Spiritual",rating:5.0,priceINR:0},
      {name:"White Water Rafting",type:"Adventure",rating:4.9,priceINR:1500},
      {name:"Lakshman Jhula",type:"Landmark",rating:4.6,priceINR:0},
      {name:"Beatles Ashram",type:"Historic",rating:4.5,priceINR:600},
    ],
  },
  {
    id:"hampi",name:"Hampi",country:"India",region:"india",
    tagline:"Ruins of a Glorious Empire",emoji:"🗿",
    grad:["#bf360c","#ff7043"],badge:"🇮🇳 India",badgeBg:"#fbe9e7",badgeC:"#bf360c",
    desc:"Surreal boulder landscapes, Vijayanagara Empire ruins, and a backpacker paradise.",
    mood:["Heritage","Adventure","Photography","Ruins"],
    hotelPriceINR:1500, foodPriceINR:250, attractionPriceINR:300,
    hotels:[
      {id:"h1",name:"Evolve Back Hampi",stars:5,rating:4.8,reviews:1800,priceINR:25000,priceFMT:"₹25,000/night",dist:"Kamalapuram",img:"🏛️",desc:"Luxury resort inspired by Vijayanagara architecture.",badge:"Heritage Luxury"},
      {id:"h2",name:"Mowgli Guest House",stars:3,rating:4.6,reviews:5600,priceINR:2500,priceFMT:"₹2,500/night",dist:"Virupapur Gaddi",img:"🌿",desc:"Island guesthouse with rooftop Hampi views.",badge:"Island Stay"},
      {id:"h3",name:"Goan Corner",stars:2,rating:4.3,reviews:8900,priceINR:800,priceFMT:"₹800/night",dist:"Virupaksha Temple",img:"🏕️",desc:"Cozy guesthouse near the main temple.",badge:"Temple Side"},
      {id:"h4",name:"Hampi Boulders Resort",stars:4,rating:4.7,reviews:2400,priceINR:12000,priceFMT:"₹12,000/night",dist:"Tungabhadra River",img:"🪨",desc:"Unique cottages nestled among giant boulders.",badge:"Boulder Stay"},
    ],
    restaurants:[
      {id:"r1",name:"Mango Tree Restaurant",cuisine:"Multi-cuisine",rating:4.6,reviews:14000,priceINR:400,priceFMT:"₹₹",specialty:"Banana Pancakes riverside",img:"🥞"},
      {id:"r2",name:"Laughing Buddha",cuisine:"International",rating:4.5,reviews:9800,priceINR:350,priceFMT:"₹",specialty:"Israeli Breakfast & Falafel",img:"😄"},
      {id:"r3",name:"New Shanthi",cuisine:"Israeli-Indian",rating:4.4,reviews:7600,priceINR:300,priceFMT:"₹",specialty:"Shakshuka & Hummus",img:"🥙"},
      {id:"r4",name:"Udupi Sri Krishna Bhavan",cuisine:"South Indian",rating:4.7,reviews:12000,priceINR:150,priceFMT:"₹",specialty:"Masala Dosa & Sambar",img:"🍽️"},
    ],
    attractions:[
      {name:"Virupaksha Temple",type:"Heritage",rating:4.9,priceINR:0},
      {name:"Vitthala Temple & Stone Chariot",type:"Heritage",rating:4.8,priceINR:600},
      {name:"Matanga Hill Sunrise",type:"Scenic",rating:4.9,priceINR:0},
      {name:"Tungabhadra Coracle Ride",type:"Experience",rating:4.6,priceINR:200},
    ],
  },
  /* ─── WORLD ─── */
  {
    id:"paris",name:"Paris",country:"France",region:"world",
    tagline:"City of Light",emoji:"🗼",
    grad:["#1a6b9e","#5eb4f0"],badge:"🌍 Europe",badgeBg:"#e3f2fd",badgeC:"#1a6b9e",
    desc:"Romance, art, culture, and world-class cuisine at every cobblestone corner.",
    mood:["Romance","Art","Food","Fashion"],
    hotelPriceINR:6500, foodPriceINR:1800, attractionPriceINR:1200,
    hotels:[
      {id:"h1",name:"Hôtel Le Meurice",stars:5,rating:4.9,reviews:2843,priceINR:65000,priceFMT:"€650/night",dist:"0.2km from Louvre",img:"🏨",desc:"Palace hotel overlooking the Tuileries Garden.",badge:"Palace Hotel"},
      {id:"h2",name:"Hôtel de Crillon",stars:5,rating:4.8,reviews:1920,priceINR:72000,priceFMT:"€720/night",dist:"Place de la Concorde",img:"🏰",desc:"Historic landmark on Place de la Concorde.",badge:"Iconic"},
      {id:"h3",name:"Le Marais Boutique",stars:4,rating:4.5,reviews:986,priceINR:22000,priceFMT:"€220/night",dist:"0.3km from Pompidou",img:"🏠",desc:"Charming boutique in the trendy Marais district.",badge:"Boutique"},
      {id:"h4",name:"Montmartre Inn",stars:3,rating:4.2,reviews:1544,priceINR:13000,priceFMT:"€130/night",dist:"0.1km from Sacré-Cœur",img:"🏡",desc:"Cozy stay with artists' quarter views.",badge:"Budget"},
    ],
    restaurants:[
      {id:"r1",name:"Le Jules Verne",cuisine:"French Fine Dining",rating:4.8,reviews:3210,priceINR:12000,priceFMT:"€€€€",specialty:"Duck confit with truffles",img:"🍽️"},
      {id:"r2",name:"Café de Flore",cuisine:"French Bistro",rating:4.6,reviews:5800,priceINR:2500,priceFMT:"€€",specialty:"Croque Monsieur",img:"☕"},
      {id:"r3",name:"L'Ami Jean",cuisine:"Basque",rating:4.7,reviews:2100,priceINR:5500,priceFMT:"€€€",specialty:"Rice pudding & foie gras",img:"🍷"},
      {id:"r4",name:"Breizh Café",cuisine:"Crêperie",rating:4.5,reviews:1870,priceINR:2200,priceFMT:"€€",specialty:"Buckwheat galettes",img:"🥞"},
    ],
    attractions:[
      {name:"Eiffel Tower",type:"Landmark",rating:4.9,priceINR:2800},
      {name:"Louvre Museum",type:"Museum",rating:4.8,priceINR:1700},
      {name:"Notre-Dame",type:"Historic",rating:4.7,priceINR:0},
      {name:"Champs-Élysées",type:"Shopping",rating:4.5,priceINR:0},
    ],
  },
  {
    id:"tokyo",name:"Tokyo",country:"Japan",region:"world",
    tagline:"Neon Meets Tradition",emoji:"⛩️",
    grad:["#b71c1c","#ef5350"],badge:"🌏 Asia",badgeBg:"#ffebee",badgeC:"#c62828",
    desc:"A dazzling fusion of futuristic tech and ancient temple culture.",
    mood:["Tech","Food","Culture","Anime"],
    hotelPriceINR:7000, foodPriceINR:1500, attractionPriceINR:800,
    hotels:[
      {id:"h1",name:"Park Hyatt Tokyo",stars:5,rating:4.9,reviews:3200,priceINR:85000,priceFMT:"¥85,000/night",dist:"1.2km from Shinjuku",img:"🏙️",desc:"Iconic skyscraper hotel from Lost in Translation.",badge:"Iconic"},
      {id:"h2",name:"The Ritz-Carlton Tokyo",stars:5,rating:4.8,reviews:2600,priceINR:90000,priceFMT:"¥90,000/night",dist:"0.8km from Roppongi Hills",img:"🏨",desc:"Views from floors 45–53 of Midtown Tower.",badge:"Skyline Views"},
      {id:"h3",name:"Asakusa Culture Hostel",stars:3,rating:4.4,reviews:4100,priceINR:12000,priceFMT:"¥12,000/night",dist:"0.2km from Senso-ji",img:"🏮",desc:"Traditional décor near Tokyo's oldest temple.",badge:"Temple Side"},
      {id:"h4",name:"Shibuya Stream Excel",stars:4,rating:4.6,reviews:2200,priceINR:35000,priceFMT:"¥35,000/night",dist:"0km from Shibuya Station",img:"🌃",desc:"Modern hotel directly above the famous crossing.",badge:"Central"},
    ],
    restaurants:[
      {id:"r1",name:"Sukiyabashi Jiro",cuisine:"Sushi",rating:5.0,reviews:1800,priceINR:25000,priceFMT:"¥¥¥¥",specialty:"Omakase tuna & sea urchin",img:"🍣"},
      {id:"r2",name:"Ichiran Ramen",cuisine:"Ramen",rating:4.7,reviews:12000,priceINR:1200,priceFMT:"¥",specialty:"Tonkotsu ramen private booth",img:"🍜"},
      {id:"r3",name:"Narisawa",cuisine:"Innovative Japanese",rating:4.9,reviews:1200,priceINR:30000,priceFMT:"¥¥¥¥",specialty:"Satoyama farm cuisine",img:"🍱"},
      {id:"r4",name:"Tsukiji Outer Market",cuisine:"Seafood Market",rating:4.6,reviews:9800,priceINR:2000,priceFMT:"¥¥",specialty:"Fresh sashimi",img:"🦞"},
    ],
    attractions:[
      {name:"Senso-ji Temple",type:"Historic",rating:4.8,priceINR:0},
      {name:"Shibuya Crossing",type:"Landmark",rating:4.7,priceINR:0},
      {name:"Tokyo Skytree",type:"Viewpoint",rating:4.6,priceINR:2000},
      {name:"Shinjuku Gyoen",type:"Park",rating:4.5,priceINR:500},
    ],
  },
  {
    id:"dubai",name:"Dubai",country:"UAE",region:"world",
    tagline:"Desert Meets Skyline",emoji:"🏙️",
    grad:["#c49000","#f7c500"],badge:"🌍 Middle East",badgeBg:"#fffde7",badgeC:"#b8860b",
    desc:"Superlatives are a way of life — tallest, largest, most luxurious.",
    mood:["Luxury","Shopping","Adventure","Architecture"],
    hotelPriceINR:8000, foodPriceINR:2000, attractionPriceINR:1500,
    hotels:[
      {id:"h1",name:"Burj Al Arab",stars:7,rating:5.0,reviews:4500,priceINR:210000,priceFMT:"$2,500/night",dist:"1.5km from Jumeirah Beach",img:"⛵",desc:"The world's most iconic sail-shaped hotel.",badge:"Most Iconic"},
      {id:"h2",name:"Atlantis The Palm",stars:5,rating:4.7,reviews:8900,priceINR:67000,priceFMT:"$800/night",dist:"0km from Aquaventure",img:"🌊",desc:"Massive resort on Palm Jumeirah.",badge:"Family Pick"},
      {id:"h3",name:"Address Downtown",stars:5,rating:4.8,reviews:3200,priceINR:37000,priceFMT:"$450/night",dist:"0.1km from Burj Khalifa",img:"🏗️",desc:"Steps away from the world's tallest building.",badge:"City Centre"},
      {id:"h4",name:"XVA Art Hotel",stars:4,rating:4.5,reviews:1400,priceINR:18000,priceFMT:"$220/night",dist:"0.5km from Dubai Museum",img:"🎨",desc:"Boutique art hotel in Al Fahidi district.",badge:"Boutique"},
    ],
    restaurants:[
      {id:"r1",name:"Nobu Dubai",cuisine:"Japanese-Peruvian",rating:4.8,reviews:5600,priceINR:8000,priceFMT:"$$$$",specialty:"Black cod with miso",img:"🥢"},
      {id:"r2",name:"Al Hadheerah",cuisine:"Emirati",rating:4.7,reviews:3400,priceINR:5000,priceFMT:"$$$",specialty:"Traditional ouzi & live show",img:"🫕"},
      {id:"r3",name:"Torno Subito",cuisine:"Italian",rating:4.6,reviews:2100,priceINR:4000,priceFMT:"$$$",specialty:"Wood-fired pizza",img:"🍕"},
      {id:"r4",name:"Arabian Tea House",cuisine:"Emirati Café",rating:4.5,reviews:4200,priceINR:1500,priceFMT:"$$",specialty:"Karak chai & medjool dates",img:"🫖"},
    ],
    attractions:[
      {name:"Burj Khalifa Top",type:"Landmark",rating:4.9,priceINR:2500},
      {name:"Dubai Mall & Fountain",type:"Shopping",rating:4.7,priceINR:0},
      {name:"Desert Safari",type:"Adventure",rating:4.8,priceINR:5000},
      {name:"Old Dubai Creek",type:"Historic",rating:4.5,priceINR:0},
    ],
  },
  {
    id:"bali",name:"Bali",country:"Indonesia",region:"world",
    tagline:"Island of the Gods",emoji:"🌺",
    grad:["#2e7d32","#81c784"],badge:"🌏 Asia",badgeBg:"#e8f5e9",badgeC:"#1b5e20",
    desc:"Lush rice terraces, sacred temples, and world-class surf.",
    mood:["Nature","Spiritual","Surf","Wellness"],
    hotelPriceINR:7000, foodPriceINR:1000, attractionPriceINR:600,
    hotels:[
      {id:"h1",name:"Four Seasons Sayan",stars:5,rating:4.9,reviews:2800,priceINR:71000,priceFMT:"$850/night",dist:"2km from Ubud Center",img:"🌿",desc:"Floating above Ayung River valley.",badge:"Jungle Luxury"},
      {id:"h2",name:"COMO Uma Ubud",stars:5,rating:4.8,reviews:1900,priceINR:54000,priceFMT:"$650/night",dist:"1.5km from Ubud Market",img:"🏞️",desc:"Panoramic rice terrace views.",badge:"Rice Terrace"},
      {id:"h3",name:"Alaya Ubud",stars:4,rating:4.6,reviews:3200,priceINR:23000,priceFMT:"$280/night",dist:"0.3km from Monkey Forest",img:"🐒",desc:"Lush gardens with Balinese architecture.",badge:"Cultural"},
      {id:"h4",name:"Kuta Beach Hostel",stars:2,rating:4.0,reviews:5600,priceINR:2900,priceFMT:"$35/night",dist:"0.1km from Kuta Beach",img:"🏄",desc:"Budget stay steps from the surf.",badge:"Budget"},
    ],
    restaurants:[
      {id:"r1",name:"Locavore",cuisine:"Modern Indonesian",rating:4.9,reviews:2400,priceINR:8000,priceFMT:"$$$$",specialty:"Farm-to-table Balinese menu",img:"🌾"},
      {id:"r2",name:"Warung Babi Guling",cuisine:"Balinese",rating:4.7,reviews:6800,priceINR:600,priceFMT:"$",specialty:"Suckling pig with sambal",img:"🐷"},
      {id:"r3",name:"Mozaic Restaurant",cuisine:"French-Balinese",rating:4.8,reviews:1600,priceINR:7000,priceFMT:"$$$$",specialty:"Chef's garden tasting menu",img:"🥗"},
      {id:"r4",name:"Naughty Nuri's",cuisine:"BBQ",rating:4.5,reviews:9200,priceINR:2000,priceFMT:"$$",specialty:"Pork ribs & martinis",img:"🍖"},
    ],
    attractions:[
      {name:"Tanah Lot Temple",type:"Historic",rating:4.8,priceINR:500},
      {name:"Tegalalang Rice Terrace",type:"Nature",rating:4.7,priceINR:350},
      {name:"Mount Batur Hike",type:"Adventure",rating:4.9,priceINR:2500},
      {name:"Seminyak Beach",type:"Beach",rating:4.6,priceINR:0},
    ],
  },
  {
    id:"nyc",name:"New York City",country:"USA",region:"world",
    tagline:"The City That Never Sleeps",emoji:"🗽",
    grad:["#5c3fce","#9b77e8"],badge:"🌎 Americas",badgeBg:"#ede9fe",badgeC:"#4c1d95",
    desc:"Eight million stories in a city that runs 24/7 — culture, food, and energy.",
    mood:["Urban","Art","Food","Shopping"],
    hotelPriceINR:10000, foodPriceINR:2500, attractionPriceINR:2000,
    hotels:[
      {id:"h1",name:"The Plaza Hotel",stars:5,rating:4.9,reviews:6200,priceINR:100000,priceFMT:"$1,200/night",dist:"0km from Central Park",img:"🏛️",desc:"Legendary landmark at Fifth Avenue.",badge:"Most Iconic"},
      {id:"h2",name:"The Standard High Line",stars:4,rating:4.7,reviews:4800,priceINR:43000,priceFMT:"$520/night",dist:"0.1km from High Line",img:"🌆",desc:"Hudson River views on the High Line.",badge:"Trendy"},
      {id:"h3",name:"ACE Hotel New York",stars:4,rating:4.5,reviews:3600,priceINR:27000,priceFMT:"$320/night",dist:"0.2km from Empire State",img:"🎸",desc:"Hip Midtown hotel with a legendary lobby.",badge:"Hip"},
      {id:"h4",name:"Pod 51",stars:3,rating:4.2,reviews:8900,priceINR:11000,priceFMT:"$140/night",dist:"0.5km from Grand Central",img:"🛏️",desc:"Smart pod-style rooms, prime Midtown.",badge:"Budget"},
    ],
    restaurants:[
      {id:"r1",name:"Eleven Madison Park",cuisine:"Modern American",rating:4.9,reviews:4100,priceINR:16000,priceFMT:"$$$$",specialty:"Seasonal tasting menu",img:"🌻"},
      {id:"r2",name:"Katz's Delicatessen",cuisine:"Jewish Deli",rating:4.7,reviews:18000,priceINR:1700,priceFMT:"$$",specialty:"Pastrami on rye",img:"🥪"},
      {id:"r3",name:"Joe's Pizza",cuisine:"NY Pizza",rating:4.6,reviews:22000,priceINR:700,priceFMT:"$",specialty:"Classic New York slice",img:"🍕"},
      {id:"r4",name:"Le Bernardin",cuisine:"French Seafood",rating:4.9,reviews:3200,priceINR:18000,priceFMT:"$$$$",specialty:"Barely cooked salmon",img:"🦐"},
    ],
    attractions:[
      {name:"Statue of Liberty",type:"Landmark",rating:4.8,priceINR:2000},
      {name:"Central Park",type:"Park",rating:4.9,priceINR:0},
      {name:"Times Square",type:"Entertainment",rating:4.4,priceINR:0},
      {name:"Brooklyn Bridge Walk",type:"Historic",rating:4.7,priceINR:0},
    ],
  },
  {
    id:"rome",name:"Rome",country:"Italy",region:"world",
    tagline:"The Eternal City",emoji:"🏛️",
    grad:["#c0551e","#e87640"],badge:"🌍 Europe",badgeBg:"#fdf0e6",badgeC:"#c0551e",
    desc:"Walk where emperors walked — 2,800 years of history at every step.",
    mood:["History","Food","Art","Romance"],
    hotelPriceINR:8000, foodPriceINR:2000, attractionPriceINR:1500,
    hotels:[
      {id:"h1",name:"Hotel de Russie",stars:5,rating:4.9,reviews:2900,priceINR:85000,priceFMT:"€850/night",dist:"0.3km from Piazza del Popolo",img:"🌹",desc:"Secret garden hotel beloved by artists.",badge:"Garden Hotel"},
      {id:"h2",name:"Palazzo Manfredi",stars:5,rating:4.8,reviews:1600,priceINR:78000,priceFMT:"€780/night",dist:"0.1km from Colosseum",img:"🏟️",desc:"Colosseum views from your private terrace.",badge:"Colosseum View"},
      {id:"h3",name:"Casa Howard",stars:4,rating:4.5,reviews:2200,priceINR:28000,priceFMT:"€280/night",dist:"0.2km from Spanish Steps",img:"🎨",desc:"Intimate boutique with library and hammam.",badge:"Boutique"},
      {id:"h4",name:"Generator Rome",stars:3,rating:4.1,reviews:5400,priceINR:9000,priceFMT:"€90/night",dist:"0.8km from Termini Station",img:"🎒",desc:"Vibrant hostel in a converted palazzo.",badge:"Budget"},
    ],
    restaurants:[
      {id:"r1",name:"La Pergola",cuisine:"Italian Fine Dining",rating:4.9,reviews:2800,priceINR:20000,priceFMT:"€€€€",specialty:"Ravioli di capesante",img:"🍝"},
      {id:"r2",name:"Da Enzo al 29",cuisine:"Roman Trattoria",rating:4.7,reviews:7600,priceINR:3000,priceFMT:"€€",specialty:"Cacio e pepe & supplì",img:"🧆"},
      {id:"r3",name:"Forno Campo de' Fiori",cuisine:"Roman Bakery",rating:4.6,reviews:12000,priceINR:800,priceFMT:"€",specialty:"Pizza bianca & mortadella",img:"🥖"},
      {id:"r4",name:"Grappolo d'Oro",cuisine:"Seafood",rating:4.5,reviews:3400,priceINR:6000,priceFMT:"€€€",specialty:"Spaghetti alle vongole",img:"🦪"},
    ],
    attractions:[
      {name:"Colosseum",type:"Historic",rating:4.9,priceINR:1600},
      {name:"Vatican Museums & Sistine Chapel",type:"Cultural",rating:4.8,priceINR:2200},
      {name:"Trevi Fountain",type:"Landmark",rating:4.7,priceINR:0},
      {name:"Pantheon",type:"Historic",rating:4.8,priceINR:500},
    ],
  },
  {
    id:"maldives",name:"Maldives",country:"Maldives",region:"world",
    tagline:"Heaven on the Indian Ocean",emoji:"🐚",
    grad:["#006994","#00b4d8"],badge:"🌏 Indian Ocean",badgeBg:"#e0f7fa",badgeC:"#006064",
    desc:"Overwater bungalows, bioluminescent beaches, and the clearest water on the planet.",
    mood:["Luxury","Diving","Beach","Romance"],
    hotelPriceINR:30000, foodPriceINR:5000, attractionPriceINR:3000,
    hotels:[
      {id:"h1",name:"Soneva Jani",stars:5,rating:5.0,reviews:2100,priceINR:250000,priceFMT:"$3,000/night",dist:"North Malé Atoll",img:"🏝️",desc:"The original overwater villa with slide into lagoon.",badge:"Most Exclusive"},
      {id:"h2",name:"Gili Lankanfushi",stars:5,rating:4.9,reviews:1800,priceINR:170000,priceFMT:"$2,000/night",dist:"North Malé Atoll",img:"🌊",desc:"No news, no shoes policy — pure barefoot luxury.",badge:"Barefoot Luxury"},
      {id:"h3",name:"Centara Grand Maldives",stars:5,rating:4.7,reviews:3400,priceINR:84000,priceFMT:"$1,000/night",dist:"South Ari Atoll",img:"🐠",desc:"All-inclusive resort with stunning house reef.",badge:"All-Inclusive"},
      {id:"h4",name:"Maafushi Island Guesthouse",stars:3,rating:4.3,reviews:8900,priceINR:8000,priceFMT:"$95/night",dist:"Local island",img:"🤿",desc:"Budget stay on a local island with dive shop.",badge:"Budget Pick"},
    ],
    restaurants:[
      {id:"r1",name:"Subsix (Niyama)",cuisine:"Underwater Dining",rating:5.0,reviews:800,priceINR:25000,priceFMT:"$$$$",specialty:"6m underwater dining experience",img:"🐟"},
      {id:"r2",name:"Ithaa Undersea Restaurant",cuisine:"European",rating:4.9,reviews:1200,priceINR:22000,priceFMT:"$$$$",specialty:"First undersea restaurant globally",img:"🌊"},
      {id:"r3",name:"Maldivian Thundi",cuisine:"Maldivian",rating:4.6,reviews:5600,priceINR:3000,priceFMT:"$$$",specialty:"Mas Huni & Roshi breakfast",img:"🥥"},
      {id:"r4",name:"Sea Breeze Café",cuisine:"International",rating:4.4,reviews:9800,priceINR:1500,priceFMT:"$$",specialty:"Tuna curry & coconut rice",img:"🍚"},
    ],
    attractions:[
      {name:"Bioluminescent Beach",type:"Nature",rating:5.0,priceINR:0},
      {name:"Whale Shark Snorkeling",type:"Wildlife",rating:4.9,priceINR:8000},
      {name:"Scuba Diving",type:"Adventure",rating:4.9,priceINR:6000},
      {name:"Male City Tour",type:"Cultural",rating:4.4,priceINR:1500},
    ],
  },
  {
    id:"singapore",name:"Singapore",country:"Singapore",region:"world",
    tagline:"Garden City of Wonders",emoji:"🌿",
    grad:["#1a237e","#283593"],badge:"🌏 Asia",badgeBg:"#e8eaf6",badgeC:"#1a237e",
    desc:"Futuristic Gardens by the Bay, hawker centres, and Marina Bay Sands all in one city.",
    mood:["Urban","Food","Shopping","Modern"],
    hotelPriceINR:9000, foodPriceINR:1500, attractionPriceINR:2000,
    hotels:[
      {id:"h1",name:"Marina Bay Sands",stars:5,rating:4.8,reviews:28000,priceINR:75000,priceFMT:"SGD 900/night",dist:"Marina Bay",img:"🏊",desc:"Rooftop infinity pool 57 floors above Singapore.",badge:"Most Iconic"},
      {id:"h2",name:"Capella Singapore",stars:5,rating:4.9,reviews:4200,priceINR:85000,priceFMT:"SGD 1,000/night",dist:"Sentosa Island",img:"🏛️",desc:"Colonial-era resort on Sentosa Island.",badge:"Colonial Luxury"},
      {id:"h3",name:"Hotel Vagabond",stars:4,rating:4.6,reviews:3400,priceINR:25000,priceFMT:"SGD 300/night",dist:"Bugis",img:"🎨",desc:"Eccentric boutique hotel with gallery-like rooms.",badge:"Boutique"},
      {id:"h4",name:"Footprints Hostel",stars:2,rating:4.4,reviews:12000,priceINR:3500,priceFMT:"SGD 40/night",dist:"Little India",img:"🎒",desc:"Award-winning hostel in Little India.",badge:"Budget Pick"},
    ],
    restaurants:[
      {id:"r1",name:"Odette",cuisine:"French",rating:4.9,reviews:2800,priceINR:20000,priceFMT:"$$$$",specialty:"3-Michelin star Modern French",img:"🌷"},
      {id:"r2",name:"Maxwell Hawker Centre",cuisine:"Hawker Food",rating:4.8,reviews:45000,priceINR:400,priceFMT:"$",specialty:"Hainanese Chicken Rice",img:"🍗"},
      {id:"r3",name:"Jumbo Seafood",cuisine:"Singaporean",rating:4.7,reviews:18000,priceINR:3000,priceFMT:"$$$",specialty:"Chilli Crab & Black Pepper Crab",img:"🦀"},
      {id:"r4",name:"Ya Kun Kaya Toast",cuisine:"Traditional Kopi",rating:4.5,reviews:22000,priceINR:300,priceFMT:"$",specialty:"Kaya Toast & Soft Boiled Eggs",img:"🍳"},
    ],
    attractions:[
      {name:"Gardens by the Bay",type:"Nature",rating:4.9,priceINR:2000},
      {name:"Marina Bay Sands Skypark",type:"Viewpoint",rating:4.8,priceINR:2800},
      {name:"Sentosa Island",type:"Entertainment",rating:4.7,priceINR:0},
      {name:"Chinatown & Little India",type:"Cultural",rating:4.5,priceINR:0},
    ],
  },
];

/* ══════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════ */
const moodIcons={Heritage:"🏛️",Desert:"🏜️",Culture:"🎭",Forts:"🏰",Nature:"🌿",Backwaters:"🛶",Wellness:"🧘",Beaches:"🏖️",Romance:"💕",Art:"🎨",Food:"🍴",Fashion:"👗",Tech:"💻",Anime:"🌸",Luxury:"💎",Shopping:"🛍️",Adventure:"🧗",Architecture:"🏗️",Spiritual:"🙏",Surf:"🏄",Beach:"🏖️",Nightlife:"🌙",Relaxation:"😌",Wildlife:"🐘",Urban:"🌆",Bollywood:"🎬",History:"📜",Silk:"🧵",Gardens:"🌸",Yoga:"🧘",Ruins:"🗿",Photography:"📸",Islands:"🏝️",Diving:"🤿",Hills:"⛰️",Tea:"🍵",Buddhist:"☸️",Scenic:"🌄",Modern:"🚀",Anime:"✨"};

const typeIcons={Historic:"🏛️",Landmark:"📍",Park:"🌳",Beach:"🏖️",Adventure:"🧗",Nature:"🌿",Museum:"🖼️",Viewpoint:"🌄",Shopping:"🛍️",Entertainment:"🎭",Cultural:"🎭",Heritage:"🏯",Wonder:"✨",Garden:"🌸",Wildlife:"🐘",Spiritual:"🙏",Experience:"🎯",Scenic:"🌄",Buddhist:"☸️"};

const gradStr=g=>`linear-gradient(135deg,${g[0]} 0%,${g[1]} 100%)`;

const Stars=({r,size=13})=>{
  const full=Math.floor(r),half=r%1>=0.5;
  return <span style={{color:"#f59e0b",fontSize:size}}>{"★".repeat(full)}{half?"½":""}{"☆".repeat(5-full-(half?1:0))}</span>;
};

const fmtINR=n=>"₹"+n.toLocaleString("en-IN");

/* ══════════════════════════════════════════════════
   LOGIN PAGE
══════════════════════════════════════════════════ */
function LoginPage({onLogin}){
  const [mode,setMode]=useState("login");
  const [form,setForm]=useState({name:"",email:"",password:""});
  const [err,setErr]=useState("");
  const [showPw,setShowPw]=useState(false);
  const [loading,setLoading]=useState(false);

  const update=k=>e=>setForm(f=>({...f,[k]:e.target.value}));

  const submit=()=>{
    setErr("");
    if(mode==="signup"&&!form.name.trim()){setErr("Please enter your name.");return;}
    if(!form.email.includes("@")){setErr("Enter a valid email address.");return;}
    if(form.password.length<6){setErr("Password must be at least 6 characters.");return;}
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      onLogin({name:form.name||form.email.split("@")[0],email:form.email});
    },1000);
  };

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0a1428 0%,#112240 50%,#0d3b2e 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 16px"}}>
      {/* Logo */}
      <div style={{textAlign:"center",marginBottom:32}}>
        <div style={{fontSize:56,marginBottom:8}}>✈️</div>
        <h1 style={{fontSize:28,fontWeight:900,color:"#fff",margin:"0 0 4px",letterSpacing:"-0.5px"}}>TravelGuider</h1>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.5)",margin:0}}>Discover the world's best destinations</p>
      </div>

      {/* Card */}
      <div style={{width:"100%",maxWidth:380,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:20,padding:"28px 24px",backdropFilter:"blur(12px)"}}>
        {/* Tabs */}
        <div style={{display:"flex",background:"rgba(255,255,255,0.06)",borderRadius:12,padding:4,marginBottom:24,gap:4}}>
          {["login","signup"].map(m=>(
            <button key={m} onClick={()=>{setMode(m);setErr("");}}
              style={{flex:1,padding:"8px",borderRadius:9,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,transition:"all .2s",
                background:mode===m?"rgba(255,255,255,0.15)":"transparent",
                color:mode===m?"#fff":"rgba(255,255,255,0.45)"}}>
              {m==="login"?"Sign In":"Create Account"}
            </button>
          ))}
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {mode==="signup"&&(
            <div>
              <label style={{fontSize:12,color:"rgba(255,255,255,0.6)",marginBottom:6,display:"block",fontWeight:500}}>Full Name</label>
              <div style={{position:"relative"}}>
                <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:16,color:"rgba(255,255,255,0.4)"}}>👤</span>
                <input value={form.name} onChange={update("name")} placeholder="Your full name"
                  style={{width:"100%",padding:"11px 12px 11px 38px",borderRadius:10,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.07)",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box"}}/>
              </div>
            </div>
          )}
          <div>
            <label style={{fontSize:12,color:"rgba(255,255,255,0.6)",marginBottom:6,display:"block",fontWeight:500}}>Email Address</label>
            <div style={{position:"relative"}}>
              <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:16,color:"rgba(255,255,255,0.4)"}}>📧</span>
              <input value={form.email} onChange={update("email")} placeholder="you@example.com" type="email"
                style={{width:"100%",padding:"11px 12px 11px 38px",borderRadius:10,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.07)",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box"}}/>
            </div>
          </div>
          <div>
            <label style={{fontSize:12,color:"rgba(255,255,255,0.6)",marginBottom:6,display:"block",fontWeight:500}}>Password</label>
            <div style={{position:"relative"}}>
              <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:16,color:"rgba(255,255,255,0.4)"}}>🔒</span>
              <input value={form.password} onChange={update("password")} placeholder="Min 6 characters" type={showPw?"text":"password"}
                style={{width:"100%",padding:"11px 38px 11px 38px",borderRadius:10,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.07)",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box"}}/>
              <button onClick={()=>setShowPw(!showPw)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:16,color:"rgba(255,255,255,0.4)"}}>
                {showPw?"🙈":"👁️"}
              </button>
            </div>
          </div>
          {err&&<div style={{fontSize:12,color:"#fca5a5",background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:8,padding:"8px 12px"}}>{err}</div>}
          <button onClick={submit} disabled={loading}
            style={{marginTop:4,padding:"13px",borderRadius:12,border:"none",cursor:loading?"not-allowed":"pointer",fontSize:14,fontWeight:700,color:"#0a1428",background:loading?"rgba(255,215,0,0.5)":"linear-gradient(90deg,#ffd700,#ff8c00)",letterSpacing:"0.3px",transition:"opacity .2s"}}>
            {loading?"✈️  Getting you in…":mode==="login"?"Sign In →":"Create Account →"}
          </button>
        </div>

        <p style={{textAlign:"center",marginTop:20,fontSize:12,color:"rgba(255,255,255,0.35)"}}>
          {mode==="login"?"Don't have an account? ":"Already have an account? "}
          <span onClick={()=>{setMode(mode==="login"?"signup":"login");setErr("");}} style={{color:"#ffd700",cursor:"pointer",fontWeight:600}}>
            {mode==="login"?"Sign up":"Sign in"}
          </span>
        </p>
      </div>
      <p style={{marginTop:20,fontSize:11,color:"rgba(255,255,255,0.2)",textAlign:"center"}}>© 2025 TravelGuider · Internship Project</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════ */
function Nav({user,onHome,showBack,onBack,onBudget,onLogout}){
  const [menuOpen,setMenuOpen]=useState(false);
  return(
    <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(10,20,50,0.96)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 14px",height:54}}>
      <div onClick={onHome} style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer"}}>
        <span style={{fontSize:20}}>✈️</span>
        <span style={{color:"#fff",fontWeight:800,fontSize:15,letterSpacing:"-0.3px"}}>TravelGuider</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        {showBack&&<button onClick={onBack} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",padding:"5px 12px",borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:600}}>← Back</button>}
        <button onClick={onBudget} style={{background:"linear-gradient(90deg,#ffd700,#ff8c00)",border:"none",color:"#0a1428",padding:"5px 12px",borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:700}}>💰 Budget Plan</button>
        <div style={{position:"relative"}}>
          <div onClick={()=>setMenuOpen(!menuOpen)} style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#ffd700,#ff8c00)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:13,fontWeight:700,color:"#0a1428"}}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          {menuOpen&&(
            <div style={{position:"absolute",right:0,top:38,background:"#1a2744",border:"1px solid rgba(255,255,255,0.15)",borderRadius:12,padding:"8px",minWidth:160,zIndex:200}}>
              <div style={{padding:"8px 12px",borderBottom:"1px solid rgba(255,255,255,0.08)",marginBottom:4}}>
                <div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{user.name}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>{user.email}</div>
              </div>
              <button onClick={()=>{setMenuOpen(false);onLogout();}} style={{width:"100%",padding:"7px 12px",borderRadius:8,border:"none",background:"rgba(239,68,68,0.15)",color:"#fca5a5",fontSize:12,fontWeight:600,cursor:"pointer",textAlign:"left"}}>🚪 Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════════════
   BUDGET PLANNER MODAL
══════════════════════════════════════════════════ */
function BudgetPlanner({place,onClose}){
  const isIndia=place?.region==="india";
  const symbol=isIndia?"₹":"₹ (approx)";
  const [budget,setBudget]=useState(isIndia?15000:50000);
  const [nights,setNights]=useState(3);
  const [people,setPeople]=useState(2);

  const hotels=[...place.hotels].sort((a,b)=>a.priceINR-b.priceINR);
  const restaurants=[...place.restaurants].sort((a,b)=>a.priceINR-b.priceINR);
  const attractions=[...place.attractions];

  const hotelCost=h=>h.priceINR*nights*Math.ceil(people/2);
  const foodCost=r=>r.priceINR*3*nights*people;
  const attrCost=()=>attractions.reduce((s,a)=>s+a.priceINR,0)*people;
  const miscCost=()=>Math.round(budget*0.1);

  const suggest=()=>{
    let rem=budget;
    const misc=miscCost();
    rem-=misc;
    const attr=attrCost();
    rem-=attr;
    let chosenHotel=null,chosenFood=null;
    for(const h of hotels){
      const hc=hotelCost(h);
      if(hc<=rem*0.6){chosenHotel=h;break;}
    }
    if(!chosenHotel)chosenHotel=hotels[0];
    rem-=hotelCost(chosenHotel);
    for(const r of restaurants){
      if(foodCost(r)<=rem){chosenFood=r;break;}
    }
    if(!chosenFood)chosenFood=restaurants[0];
    const total=hotelCost(chosenHotel)+foodCost(chosenFood)+attr+misc;
    const leftover=budget-total;
    return{hotel:chosenHotel,food:chosenFood,total,leftover,hcost:hotelCost(chosenHotel),fcost:foodCost(chosenFood),attr,misc};
  };

  const s=suggest();
  const pct=Math.min(100,Math.round(s.total/budget*100));
  const ok=s.leftover>=0;

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto",background:"#0f1b2d",borderRadius:"20px 20px 0 0",border:"1px solid rgba(255,255,255,0.1)",padding:"24px 18px 32px"}}>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",fontWeight:500}}>BUDGET PLANNER</div>
            <h2 style={{fontSize:18,fontWeight:800,color:"#fff",margin:"2px 0 0"}}>{place.emoji} {place.name}</h2>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.1)",border:"none",color:"rgba(255,255,255,0.6)",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:16}}>✕</button>
        </div>

        {/* Inputs */}
        <div style={{background:"rgba(255,255,255,0.04)",borderRadius:14,padding:"16px",marginBottom:16,border:"1px solid rgba(255,255,255,0.07)"}}>
          <div style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <label style={{fontSize:12,color:"rgba(255,255,255,0.6)",fontWeight:500}}>Total Budget</label>
              <span style={{fontSize:16,fontWeight:800,color:"#ffd700"}}>{fmtINR(budget)}</span>
            </div>
            <input type="range" min={isIndia?3000:10000} max={isIndia?200000:1000000} step={isIndia?1000:5000} value={budget} onChange={e=>setBudget(+e.target.value)} style={{width:"100%",accentColor:"#ffd700"}}/>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"rgba(255,255,255,0.3)",marginTop:4}}>
              <span>{fmtINR(isIndia?3000:10000)}</span><span>{fmtINR(isIndia?200000:1000000)}</span>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div>
              <label style={{fontSize:12,color:"rgba(255,255,255,0.6)",fontWeight:500,display:"block",marginBottom:6}}>Nights 🌙</label>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <button onClick={()=>setNights(n=>Math.max(1,n-1))} style={{width:28,height:28,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.2)",background:"none",color:"#fff",cursor:"pointer",fontSize:16,lineHeight:1}}>−</button>
                <span style={{fontSize:16,fontWeight:700,color:"#fff",minWidth:20,textAlign:"center"}}>{nights}</span>
                <button onClick={()=>setNights(n=>Math.min(14,n+1))} style={{width:28,height:28,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.2)",background:"none",color:"#fff",cursor:"pointer",fontSize:16,lineHeight:1}}>+</button>
              </div>
            </div>
            <div>
              <label style={{fontSize:12,color:"rgba(255,255,255,0.6)",fontWeight:500,display:"block",marginBottom:6}}>Travellers 👥</label>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <button onClick={()=>setPeople(p=>Math.max(1,p-1))} style={{width:28,height:28,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.2)",background:"none",color:"#fff",cursor:"pointer",fontSize:16,lineHeight:1}}>−</button>
                <span style={{fontSize:16,fontWeight:700,color:"#fff",minWidth:20,textAlign:"center"}}>{people}</span>
                <button onClick={()=>setPeople(p=>Math.min(10,p+1))} style={{width:28,height:28,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.2)",background:"none",color:"#fff",cursor:"pointer",fontSize:16,lineHeight:1}}>+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Budget bar */}
        <div style={{marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"rgba(255,255,255,0.5)",marginBottom:6}}>
            <span>Estimated spend</span>
            <span style={{color:ok?"#4ade80":"#f87171",fontWeight:700}}>{fmtINR(s.total)} / {fmtINR(budget)}</span>
          </div>
          <div style={{height:8,background:"rgba(255,255,255,0.1)",borderRadius:4,overflow:"hidden"}}>
            <div style={{height:"100%",width:pct+"%",background:ok?"linear-gradient(90deg,#22c55e,#4ade80)":"linear-gradient(90deg,#ef4444,#f87171)",borderRadius:4,transition:"width .4s"}}/>
          </div>
          <div style={{fontSize:11,color:ok?"#4ade80":"#f87171",marginTop:4,fontWeight:500}}>
            {ok?`✅ ${fmtINR(s.leftover)} remaining — fits your budget!`:`⚠️ Over budget by ${fmtINR(-s.leftover)} — try fewer nights or increase budget`}
          </div>
        </div>

        {/* Suggestions */}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {/* Hotel */}
          <div style={{background:"rgba(255,255,255,0.04)",borderRadius:12,padding:"14px",border:"1px solid rgba(255,255,255,0.07)"}}>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",fontWeight:600,letterSpacing:"0.5px",marginBottom:6}}>🏨 RECOMMENDED HOTEL · {nights} nights</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{s.hotel.img} {s.hotel.name}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:2}}>{"⭐".repeat(Math.min(s.hotel.stars,5))} · {s.hotel.priceFMT} · {s.hotel.dist}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0,marginLeft:8}}>
                <div style={{fontSize:14,fontWeight:800,color:"#ffd700"}}>{fmtINR(s.hcost)}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.4)"}}>total stay</div>
              </div>
            </div>
          </div>

          {/* Food */}
          <div style={{background:"rgba(255,255,255,0.04)",borderRadius:12,padding:"14px",border:"1px solid rgba(255,255,255,0.07)"}}>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",fontWeight:600,letterSpacing:"0.5px",marginBottom:6}}>🍽️ RECOMMENDED DINING · 3 meals/day × {nights} days × {people} pax</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{s.food.img} {s.food.name}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:2}}>{s.food.cuisine} · {s.food.priceFMT} per meal</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:1}}>🍴 {s.food.specialty}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0,marginLeft:8}}>
                <div style={{fontSize:14,fontWeight:800,color:"#ffd700"}}>{fmtINR(s.fcost)}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.4)"}}>total food</div>
              </div>
            </div>
          </div>

          {/* Attractions */}
          <div style={{background:"rgba(255,255,255,0.04)",borderRadius:12,padding:"14px",border:"1px solid rgba(255,255,255,0.07)"}}>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",fontWeight:600,letterSpacing:"0.5px",marginBottom:8}}>🗺️ ALL ATTRACTIONS · {people} traveller{people>1?"s":""}</div>
            {attractions.map(a=>(
              <div key={a.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.8)"}}>{typeIcons[a.type]||"📍"} {a.name}</div>
                <div style={{fontSize:12,fontWeight:600,color:"#ffd700",flexShrink:0,marginLeft:8}}>{a.priceINR===0?"Free":fmtINR(a.priceINR*people)}</div>
              </div>
            ))}
            <div style={{borderTop:"1px solid rgba(255,255,255,0.08)",marginTop:8,paddingTop:8,display:"flex",justifyContent:"space-between"}}>
              <span style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>Attractions total</span>
              <span style={{fontSize:13,fontWeight:700,color:"#ffd700"}}>{fmtINR(s.attr)}</span>
            </div>
          </div>

          {/* Misc */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"rgba(255,255,255,0.03)",borderRadius:10,border:"1px solid rgba(255,255,255,0.05)"}}>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>🚕 Transport & misc (10%)</div>
            <div style={{fontSize:13,fontWeight:700,color:"#ffd700"}}>{fmtINR(s.misc)}</div>
          </div>

          {/* Total */}
          <div style={{background:ok?"rgba(34,197,94,0.1)":"rgba(239,68,68,0.1)",borderRadius:12,padding:"14px 16px",border:`1px solid ${ok?"rgba(34,197,94,0.3)":"rgba(239,68,68,0.3)"}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",fontWeight:600}}>TOTAL ESTIMATED COST</div>
                <div style={{fontSize:22,fontWeight:900,color:ok?"#4ade80":"#f87171",marginTop:4}}>{fmtINR(s.total)}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>Your budget</div>
                <div style={{fontSize:18,fontWeight:700,color:"rgba(255,255,255,0.7)"}}>{fmtINR(budget)}</div>
              </div>
            </div>
            {ok&&<div style={{marginTop:10,fontSize:12,color:"#4ade80",background:"rgba(34,197,94,0.1)",padding:"6px 10px",borderRadius:8}}>
              💚 You'll have <strong>{fmtINR(s.leftover)}</strong> left for shopping & extras!
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════ */
function HomePage({onSelect,user}){
  const [q,setQ]=useState("");
  const [tab,setTab]=useState("all");
  const [hoverId,setHoverId]=useState(null);

  const tabs=[{id:"all",label:"🌐 All "+(PLACES.length)},{id:"india",label:"🇮🇳 India "+PLACES.filter(p=>p.region==="india").length},{id:"world",label:"🌍 World "+PLACES.filter(p=>p.region==="world").length}];

  const shown=PLACES.filter(p=>{
    const mq=!q||[p.name,p.country,...p.mood].some(s=>s.toLowerCase().includes(q.toLowerCase()));
    return mq&&(tab==="all"||p.region===tab);
  });

  return(
    <div style={{background:"#0a1428",minHeight:"100vh"}}>
      <div style={{background:"linear-gradient(160deg,#0a1428 0%,#112240 40%,#0d3b2e 100%)",padding:"32px 16px 40px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-60,left:"50%",transform:"translateX(-50%)",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,180,0,0.08),transparent 70%)",pointerEvents:"none"}}/>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.5)",margin:"0 0 6px"}}>Welcome back, <strong style={{color:"#ffd700"}}>{user.name}</strong> 👋</p>
        <h1 style={{fontSize:"clamp(24px,6vw,36px)",fontWeight:900,color:"#fff",margin:"0 0 8px",letterSpacing:"-1px",lineHeight:1.1}}>
          Find Your <span style={{background:"linear-gradient(90deg,#ffd700,#ff8c00)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Next Adventure</span>
        </h1>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.5)",margin:"0 0 24px"}}>{PLACES.length} destinations · Hotels · Food · Attractions</p>
        <div style={{maxWidth:440,margin:"0 auto",position:"relative"}}>
          <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:18,color:"rgba(255,255,255,0.4)"}}>🔍</span>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search city, country, vibe…"
            style={{width:"100%",padding:"13px 16px 13px 44px",borderRadius:40,border:"1.5px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.07)",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box"}}/>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:16,flexWrap:"wrap"}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"7px 16px",borderRadius:20,fontSize:12,fontWeight:600,cursor:"pointer",border:"1.5px solid",transition:"all .2s",
              background:tab===t.id?"rgba(255,215,0,0.12)":"transparent",
              borderColor:tab===t.id?"#ffd700":"rgba(255,255,255,0.18)",
              color:tab===t.id?"#ffd700":"rgba(255,255,255,0.55)"}}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:"20px 12px",background:"#0f1b2d"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,270px),1fr))",gap:14,maxWidth:960,margin:"0 auto"}}>
          {shown.length===0?(
            <div style={{gridColumn:"1/-1",textAlign:"center",padding:"48px 0",color:"rgba(255,255,255,0.4)"}}>
              <div style={{fontSize:48,marginBottom:12}}>🗺️</div><p>No destinations found.</p>
            </div>
          ):shown.map(p=>(
            <div key={p.id} onClick={()=>onSelect(p)}
              onMouseEnter={()=>setHoverId(p.id)} onMouseLeave={()=>setHoverId(null)}
              style={{borderRadius:18,overflow:"hidden",cursor:"pointer",background:"#162035",border:"1.5px solid rgba(255,255,255,0.07)",
                transform:hoverId===p.id?"translateY(-5px) scale(1.01)":"translateY(0) scale(1)",
                boxShadow:hoverId===p.id?"0 20px 48px rgba(0,0,0,0.5)":"0 4px 12px rgba(0,0,0,0.3)",
                transition:"all 0.25s cubic-bezier(0.34,1.56,0.64,1)"}}>
              <div style={{background:gradStr(p.grad),padding:"28px 18px 20px",textAlign:"center",position:"relative"}}>
                <div style={{position:"absolute",top:10,right:10,fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:10,background:p.badgeBg,color:p.badgeC}}>{p.badge}</div>
                <div style={{fontSize:48,lineHeight:1}}>{p.emoji}</div>
                <h3 style={{fontSize:18,fontWeight:800,color:"#fff",margin:"8px 0 2px"}}>{p.name}</h3>
                <p style={{fontSize:11,color:"rgba(255,255,255,0.7)",margin:0}}>{p.country}</p>
              </div>
              <div style={{padding:"12px 14px 16px"}}>
                <p style={{fontSize:11,color:"rgba(255,255,255,0.45)",margin:"0 0 4px",fontStyle:"italic"}}>"{p.tagline}"</p>
                <p style={{fontSize:12,color:"rgba(255,255,255,0.65)",lineHeight:1.55,margin:"0 0 10px"}}>{p.desc}</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:12}}>
                  {p.mood.slice(0,3).map(m=>(
                    <span key={m} style={{fontSize:10,padding:"2px 7px",borderRadius:10,background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.5)"}}>{moodIcons[m]||"✨"} {m}</span>
                  ))}
                </div>
                <button style={{width:"100%",padding:"9px",borderRadius:10,background:gradStr(p.grad),color:"#fff",border:"none",fontSize:12,fontWeight:700,cursor:"pointer"}}>
                  Explore {p.name} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{textAlign:"center",padding:"20px",background:"#0a1428",color:"rgba(255,255,255,0.2)",fontSize:11}}>
        © 2025 TravelGuider · Internship Project · {PLACES.length} destinations worldwide
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PLACE PAGE
══════════════════════════════════════════════════ */
function PlacePage({place,onCategory,onBudget}){
  const cats=[
    {id:"hotels",emoji:"🏨",label:"Hotels & Stay",sub:place.hotels.length+" properties",grad:["#1d4ed8","#3b82f6"]},
    {id:"restaurants",emoji:"🍽️",label:"Food & Dining",sub:place.restaurants.length+" restaurants",grad:["#b45309","#f59e0b"]},
    {id:"attractions",emoji:"🗺️",label:"Places to Visit",sub:place.attractions.length+" spots",grad:["#065f46","#34d399"]},
  ];
  return(
    <div style={{background:"#f4f6fb",minHeight:"100vh"}}>
      <div style={{background:gradStr(place.grad),padding:"28px 16px 32px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",bottom:-30,right:-20,fontSize:100,opacity:0.12}}>{place.emoji}</div>
        <div style={{position:"relative"}}>
          <span style={{fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:10,background:place.badgeBg,color:place.badgeC}}>{place.badge}</span>
          <h1 style={{fontSize:"clamp(22px,5vw,32px)",fontWeight:900,color:"#fff",margin:"8px 0 4px"}}>{place.emoji} {place.name}</h1>
          <p style={{fontSize:13,color:"rgba(255,255,255,0.8)",margin:"0 0 4px",fontStyle:"italic"}}>"{place.tagline}"</p>
          <p style={{fontSize:12,color:"rgba(255,255,255,0.65)",margin:"0 0 14px",maxWidth:380}}>{place.desc}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
            {place.mood.map(m=><span key={m} style={{fontSize:10,padding:"3px 9px",borderRadius:20,background:"rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.9)",fontWeight:600}}>{moodIcons[m]||"✨"} {m}</span>)}
          </div>
        </div>
      </div>

      {/* Attractions strip */}
      <div style={{background:"#fff",padding:"10px 14px",borderBottom:"1px solid #e5e7eb",overflowX:"auto"}}>
        <div style={{display:"flex",gap:14,minWidth:"max-content"}}>
          {place.attractions.map(a=>(
            <div key={a.name} style={{display:"flex",alignItems:"center",gap:5}}>
              <span style={{fontSize:13}}>{typeIcons[a.type]||"📍"}</span>
              <span style={{fontSize:12,color:"#444",fontWeight:500}}>{a.name}</span>
              <Stars r={a.rating} size={10}/>
            </div>
          ))}
        </div>
      </div>

      {/* Budget banner */}
      <div onClick={onBudget} style={{margin:"16px 14px 0",background:"linear-gradient(90deg,#1a2744,#0d3b2e)",borderRadius:14,padding:"14px 16px",cursor:"pointer",border:"1px solid rgba(255,215,0,0.25)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",fontWeight:600,marginBottom:3}}>✨ NEW FEATURE</div>
          <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>💰 Plan your {place.name} trip budget</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:2}}>Set your budget → get hotel + food + attractions plan</div>
        </div>
        <span style={{fontSize:20,color:"#ffd700",flexShrink:0,marginLeft:12}}>→</span>
      </div>

      <div style={{padding:"16px 14px"}}>
        <h2 style={{fontSize:16,fontWeight:700,color:"#111",margin:"0 0 12px"}}>What would you like to explore?</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,220px),1fr))",gap:12}}>
          {cats.map(c=>(
            <div key={c.id} onClick={()=>onCategory(c.id)}
              style={{background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:16,padding:"22px 18px",cursor:"pointer",textAlign:"center",transition:"all .2s",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.12)";e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)";e.currentTarget.style.transform="translateY(0)";}}>
              <div style={{fontSize:38,marginBottom:8}}>{c.emoji}</div>
              <h3 style={{fontSize:14,fontWeight:700,margin:"0 0 4px",color:"#111"}}>{c.label}</h3>
              <p style={{fontSize:11,color:"#888",margin:"0 0 14px"}}>{c.sub}</p>
              <div style={{background:gradStr(c.grad),color:"#fff",padding:"7px 16px",borderRadius:20,fontSize:11,fontWeight:700,display:"inline-block"}}>Browse →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   HOTELS LIST
══════════════════════════════════════════════════ */
function HotelsPage({place,onHotel}){
  const sorted=[...place.hotels].sort((a,b)=>b.rating-a.rating);
  return(
    <div style={{background:"#f4f6fb",minHeight:"100vh"}}>
      <div style={{background:gradStr(["#1d3a8a","#2563eb"]),padding:"24px 16px 28px"}}>
        <h1 style={{fontSize:22,fontWeight:800,color:"#fff",margin:"0 0 4px"}}>🏨 Hotels in {place.name}</h1>
        <p style={{fontSize:12,color:"rgba(255,255,255,0.65)",margin:0}}>{sorted.length} properties · Sorted by rating · Prices in {place.region==="india"?"Indian Rupees ₹":"local currency (₹ approx)"}</p>
      </div>
      <div style={{padding:"14px 12px",display:"flex",flexDirection:"column",gap:10,maxWidth:720,margin:"0 auto"}}>
        {sorted.map(h=>(
          <div key={h.id} onClick={()=>onHotel(h)}
            style={{background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:14,padding:"14px",cursor:"pointer",display:"flex",gap:12,alignItems:"flex-start",transition:"all .2s",boxShadow:"0 2px 6px rgba(0,0,0,0.05)"}}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.12)";e.currentTarget.style.borderColor="#93c5fd";}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 2px 6px rgba(0,0,0,0.05)";e.currentTarget.style.borderColor="#e5e7eb";}}>
            <div style={{width:50,height:50,borderRadius:12,flexShrink:0,background:gradStr(place.grad),display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{h.img}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,flexWrap:"wrap"}}>
                <div>
                  <h3 style={{fontSize:14,fontWeight:700,margin:"0 0 3px",color:"#111"}}>{h.name}</h3>
                  <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                    <Stars r={h.rating} size={11}/><span style={{fontSize:11,color:"#555"}}>{h.rating} · {h.reviews.toLocaleString()} reviews</span>
                  </div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:13,fontWeight:800,color:"#059669"}}>{h.priceFMT}</div>
                  {place.region==="world"&&<div style={{fontSize:10,color:"#888"}}>≈ {fmtINR(h.priceINR)}</div>}
                </div>
              </div>
              <p style={{fontSize:11,color:"#666",margin:"5px 0 4px",lineHeight:1.5}}>{h.desc}</p>
              <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                <span style={{fontSize:10,color:"#888"}}>📍 {h.dist}</span>
                <span style={{fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:8,background:"#eff6ff",color:"#1d4ed8"}}>{h.badge}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   RESTAURANTS LIST
══════════════════════════════════════════════════ */
function RestaurantsPage({place}){
  const sorted=[...place.restaurants].sort((a,b)=>b.rating-a.rating);
  return(
    <div style={{background:"#f4f6fb",minHeight:"100vh"}}>
      <div style={{background:gradStr(["#7c2d12","#c2410c"]),padding:"24px 16px 28px"}}>
        <h1 style={{fontSize:22,fontWeight:800,color:"#fff",margin:"0 0 4px"}}>🍽️ Famous Restaurants in {place.name}</h1>
        <p style={{fontSize:12,color:"rgba(255,255,255,0.65)",margin:0}}>{sorted.length} top picks · Local favourites & top-rated</p>
      </div>
      <div style={{padding:"14px 12px",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,250px),1fr))",gap:12,maxWidth:860,margin:"0 auto"}}>
        {sorted.map(r=>(
          <div key={r.id} style={{background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:14,overflow:"hidden",boxShadow:"0 2px 6px rgba(0,0,0,0.05)",transition:"all .2s"}}
            onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.12)"}
            onMouseLeave={e=>e.currentTarget.style.boxShadow="0 2px 6px rgba(0,0,0,0.05)"}>
            <div style={{background:"linear-gradient(135deg,#fff7ed,#fef3c7)",padding:"22px 16px 14px",textAlign:"center",borderBottom:"1px solid #fde68a"}}>
              <div style={{fontSize:44}}>{r.img}</div>
              <div style={{marginTop:8}}><Stars r={r.rating} size={14}/><span style={{fontSize:11,color:"#666",marginLeft:5}}>{r.rating} ({r.reviews.toLocaleString()})</span></div>
            </div>
            <div style={{padding:"12px 14px 16px"}}>
              <h3 style={{fontSize:14,fontWeight:700,margin:"0 0 5px",color:"#111"}}>{r.name}</h3>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <span style={{fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:8,background:"#fef3c7",color:"#78350f"}}>{r.cuisine}</span>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#059669"}}>{r.priceFMT}</div>
                  {place.region==="world"&&<div style={{fontSize:10,color:"#888"}}>≈{fmtINR(r.priceINR)}/meal</div>}
                </div>
              </div>
              <p style={{fontSize:11,color:"#666",margin:0,lineHeight:1.5}}>🍴 <em>{r.specialty}</em></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ATTRACTIONS LIST
══════════════════════════════════════════════════ */
function AttractionsPage({place}){
  return(
    <div style={{background:"#f4f6fb",minHeight:"100vh"}}>
      <div style={{background:gradStr(["#064e3b","#059669"]),padding:"24px 16px 28px"}}>
        <h1 style={{fontSize:22,fontWeight:800,color:"#fff",margin:"0 0 4px"}}>🗺️ Places to Visit in {place.name}</h1>
        <p style={{fontSize:12,color:"rgba(255,255,255,0.65)",margin:0}}>Top-rated attractions</p>
      </div>
      <div style={{padding:"14px 12px",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,180px),1fr))",gap:12,maxWidth:860,margin:"0 auto"}}>
        {[...place.attractions].sort((a,b)=>b.rating-a.rating).map(a=>(
          <div key={a.name} style={{background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:14,padding:"20px 14px",textAlign:"center",boxShadow:"0 2px 6px rgba(0,0,0,0.05)",transition:"all .2s"}}
            onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.12)"}
            onMouseLeave={e=>e.currentTarget.style.boxShadow="0 2px 6px rgba(0,0,0,0.05)"}>
            <div style={{fontSize:38}}>{typeIcons[a.type]||"🎪"}</div>
            <h3 style={{fontSize:13,fontWeight:700,margin:"8px 0 5px",color:"#111"}}>{a.name}</h3>
            <span style={{fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:8,background:"#d1fae5",color:"#065f46"}}>{a.type}</span>
            <div style={{marginTop:8}}><Stars r={a.rating} size={13}/><div style={{fontSize:10,color:"#666",marginTop:2}}>{a.rating}/5</div></div>
            <div style={{marginTop:8,fontSize:12,fontWeight:700,color:a.priceINR===0?"#059669":"#1d4ed8"}}>
              {a.priceINR===0?"🆓 Free":fmtINR(a.priceINR)+"/person"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   HOTEL DETAIL
══════════════════════════════════════════════════ */
function HotelDetailPage({hotel,place}){
  const nearby=place.hotels.filter(h=>h.id!==hotel.id);
  const amenities=["Free WiFi 📶","Swimming Pool 🏊","Fitness Center 🏋️","Restaurant 🍽️","24h Reception ⏰","Spa & Wellness 💆","Airport Shuttle 🚌","Room Service 🛎️","Parking 🚗","Bar & Lounge 🍹"];
  return(
    <div style={{background:"#f4f6fb",minHeight:"100vh"}}>
      <div style={{background:gradStr(place.grad),padding:"24px 16px 32px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",bottom:-20,right:-20,fontSize:90,opacity:0.12}}>{hotel.img}</div>
        <div style={{position:"relative"}}>
          <span style={{fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:10,background:place.badgeBg,color:place.badgeC}}>{hotel.badge}</span>
          <div style={{fontSize:48,margin:"8px 0 6px"}}>{hotel.img}</div>
          <h1 style={{fontSize:20,fontWeight:900,color:"#fff",margin:"0 0 5px"}}>{hotel.name}</h1>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            <Stars r={hotel.rating} size={15}/>
            <span style={{color:"rgba(255,255,255,0.8)",fontSize:13}}>{hotel.rating}/5 · {hotel.reviews.toLocaleString()} reviews</span>
          </div>
        </div>
      </div>
      <div style={{padding:"14px 12px",maxWidth:720,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
          {[{label:"Price/night",value:hotel.priceFMT,bg:"#eff6ff",c:"#1d4ed8"},{label:"Rating",value:hotel.rating+"★",bg:"#fefce8",c:"#a16207"},{label:"INR approx",value:fmtINR(hotel.priceINR),bg:"#f0fdf4",c:"#15803d"}].map(x=>(
            <div key={x.label} style={{background:x.bg,borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
              <div style={{fontSize:10,color:x.c,marginBottom:2,fontWeight:600}}>{x.label}</div>
              <div style={{fontSize:12,fontWeight:800,color:x.c}}>{x.value}</div>
            </div>
          ))}
        </div>
        <div style={{background:"#fff",borderRadius:14,padding:"16px",marginBottom:12,border:"1.5px solid #e5e7eb"}}>
          <h2 style={{fontSize:14,fontWeight:700,margin:"0 0 8px",color:"#111"}}>About this property</h2>
          <p style={{fontSize:12,color:"#444",lineHeight:1.7,margin:"0 0 8px"}}>{hotel.desc}</p>
          <span style={{fontSize:11,color:"#888"}}>📍 {hotel.dist}</span>
        </div>
        <div style={{background:"#fff",borderRadius:14,padding:"16px",marginBottom:14,border:"1.5px solid #e5e7eb"}}>
          <h2 style={{fontSize:14,fontWeight:700,margin:"0 0 12px",color:"#111"}}>Amenities</h2>
          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
            {amenities.map(a=><span key={a} style={{fontSize:11,background:"#f8fafc",color:"#475569",padding:"4px 10px",borderRadius:20,border:"1px solid #e2e8f0"}}>{a}</span>)}
          </div>
        </div>
        <h2 style={{fontSize:16,fontWeight:700,color:"#111",margin:"0 0 10px"}}>🏘️ Other Hotels in {place.name}</h2>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {nearby.map(h=>(
            <div key={h.id} style={{background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:12,padding:"12px 14px",display:"flex",gap:10,alignItems:"center"}}>
              <div style={{width:40,height:40,borderRadius:10,flexShrink:0,background:gradStr(place.grad),display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{h.img}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                  <h3 style={{fontSize:13,fontWeight:700,margin:0,color:"#111"}}>{h.name}</h3>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontSize:12,fontWeight:700,color:"#059669"}}>{h.priceFMT}</div>
                    {place.region==="world"&&<div style={{fontSize:10,color:"#888"}}>≈{fmtINR(h.priceINR)}</div>}
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginTop:3,flexWrap:"wrap"}}>
                  <Stars r={h.rating} size={10}/><span style={{fontSize:10,color:"#666"}}>{h.rating} ({h.reviews.toLocaleString()})</span>
                  <span style={{fontSize:10,color:"#888"}}>· 📍 {h.dist}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   BREADCRUMB
══════════════════════════════════════════════════ */
function Breadcrumb({crumbs}){
  return(
    <div style={{background:"#fff",borderBottom:"1px solid #f0f0f0",padding:"7px 14px",display:"flex",alignItems:"center",gap:4,fontSize:12,overflowX:"auto",whiteSpace:"nowrap"}}>
      {crumbs.map((c,i)=>(
        <span key={i} style={{display:"inline-flex",alignItems:"center",gap:4}}>
          <span style={{color:i===crumbs.length-1?"#111":"#2563eb",fontWeight:i===crumbs.length-1?600:400}}>{c}</span>
          {i<crumbs.length-1&&<span style={{color:"#d1d5db"}}>›</span>}
        </span>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════ */
export default function App(){
  const [user,setUser]=useState(null);
  const [page,setPage]=useState("home");
  const [place,setPlace]=useState(null);
  const [cat,setCat]=useState(null);
  const [hotel,setHotel]=useState(null);
  const [budgetOpen,setBudgetOpen]=useState(false);

  useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"});},[page]);

  if(!user) return <LoginPage onLogin={u=>setUser(u)}/>;

  const goHome=()=>{setPage("home");setPlace(null);setCat(null);setHotel(null);};
  const goPlace=p=>{setPlace(p);setCat(null);setHotel(null);setPage("place");};
  const goCat=c=>{setCat(c);setHotel(null);setPage("cat");};
  const goHotel=h=>{setHotel(h);setPage("hotel");};
  const goBack=()=>{if(page==="hotel")setPage("cat");else if(page==="cat")setPage("place");else if(page==="place")setPage("home");};

  const catLabels={hotels:"🏨 Hotels",restaurants:"🍽️ Restaurants",attractions:"🗺️ Attractions"};
  const crumbs=()=>{const c=["🏠 Home"];if(place)c.push(`${place.emoji} ${place.name}`);if(cat)c.push(catLabels[cat]||cat);if(hotel)c.push(hotel.name);return c;};

  return(
    <div style={{fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif",background:"#0a1428",minHeight:"100vh"}}>
      <Nav user={user} onHome={goHome} showBack={page!=="home"} onBack={goBack}
        onBudget={()=>{if(place)setBudgetOpen(true);else alert("Please select a destination first!");}}
        onLogout={()=>{setUser(null);setPage("home");setPlace(null);}}/>

      {page!=="home"&&<Breadcrumb crumbs={crumbs()}/>}

      {page==="home"&&<HomePage onSelect={goPlace} user={user}/>}
      {page==="place"&&place&&<PlacePage place={place} onCategory={goCat} onBudget={()=>setBudgetOpen(true)}/>}
      {page==="cat"&&place&&cat==="hotels"&&<HotelsPage place={place} onHotel={goHotel}/>}
      {page==="cat"&&place&&cat==="restaurants"&&<RestaurantsPage place={place}/>}
      {page==="cat"&&place&&cat==="attractions"&&<AttractionsPage place={place}/>}
      {page==="hotel"&&hotel&&place&&<HotelDetailPage hotel={hotel} place={place}/>}

      {budgetOpen&&place&&<BudgetPlanner place={place} onClose={()=>setBudgetOpen(false)}/>}
    </div>
  );
}