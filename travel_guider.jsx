import { useState, useEffect } from "react";

/* ─────────────────────────── DATA ─────────────────────────── */
const PLACES = [
  /* ── INDIAN DESTINATIONS ── */
  {
    id:"rajasthan", name:"Rajasthan", country:"India", region:"india",
    tagline:"Land of Kings & Colour", emoji:"🏰",
    grad:["#b5451b","#e07b39"],
    badge:"🇮🇳 India", badgeBg:"#fff3e0", badgeC:"#b5451b",
    desc:"Magnificent forts, golden deserts, and the most vivid bazaars on earth.",
    mood:["Heritage","Desert","Culture","Forts"],
    hotels:[
      {id:"h1",name:"Rambagh Palace",stars:5,rating:4.9,reviews:3400,price:"₹35,000/night",dist:"3km from Jaipur City Palace",img:"🏯",desc:"Former residence of the Maharaja of Jaipur, now a luxury palace hotel.",badge:"Heritage Palace"},
      {id:"h2",name:"Umaid Bhawan Palace",stars:5,rating:4.8,reviews:2100,price:"₹28,000/night",dist:"2km from Jodhpur Clock Tower",img:"🕌",desc:"Part of this golden-sandstone palace is still the royal family's home.",badge:"Royal Stay"},
      {id:"h3",name:"Suryagarh Jaisalmer",stars:5,rating:4.7,reviews:1800,price:"₹18,000/night",dist:"4km from Golden Fort",img:"🏜️",desc:"A fortress-resort rising from the Thar Desert sands.",badge:"Desert Luxury"},
      {id:"h4",name:"Zostel Jaipur",stars:2,rating:4.3,reviews:6200,price:"₹800/night",dist:"0.5km from Hawa Mahal",img:"🎒",desc:"Vibrant hostel loved by backpackers near the pink city's heart.",badge:"Budget Pick"},
    ],
    restaurants:[
      {id:"r1",name:"Suvarna Mahal",cuisine:"Rajasthani Royal",rating:4.9,reviews:1200,price:"₹₹₹₹",specialty:"Dal Baati Churma & Laal Maas",img:"🍛"},
      {id:"r2",name:"Chokhi Dhani",cuisine:"Village Experience",rating:4.7,reviews:9800,price:"₹₹",specialty:"Bajre ki Roti & Ker Sangri",img:"🪔"},
      {id:"r3",name:"1135 AD (Amer Fort)",cuisine:"Medieval Rajput",rating:4.8,reviews:3400,price:"₹₹₹",specialty:"Safed Maas & Rajasthani Thali",img:"🏰"},
      {id:"r4",name:"Peacock Rooftop Restaurant",cuisine:"Multi-cuisine",rating:4.5,reviews:7600,price:"₹₹",specialty:"Rajasthani Pyaaz Kachori",img:"🦚"},
    ],
    attractions:[
      {name:"Amber Fort",type:"Heritage",rating:4.9},
      {name:"Jaisalmer Fort",type:"Heritage",rating:4.8},
      {name:"Thar Desert Safari",type:"Adventure",rating:4.8},
      {name:"City Palace Jaipur",type:"Historic",rating:4.7},
    ],
  },
  {
    id:"kerala", name:"Kerala", country:"India", region:"india",
    tagline:"God's Own Country", emoji:"🌴",
    grad:["#1b7a3e","#56ab2f"],
    badge:"🇮🇳 India", badgeBg:"#e8f5e9", badgeC:"#1b5e20",
    desc:"Backwater houseboats, spice plantations, and serene Ayurvedic retreats.",
    mood:["Nature","Backwaters","Wellness","Beaches"],
    hotels:[
      {id:"h1",name:"Kumarakom Lake Resort",stars:5,rating:4.9,reviews:2800,price:"₹22,000/night",dist:"0km from Vembanad Lake",img:"🛶",desc:"Luxury villas on the edge of Vembanad Lake with private infinity pools.",badge:"Backwater Gem"},
      {id:"h2",name:"Taj Green Cove Kovalam",stars:5,rating:4.8,reviews:1900,price:"₹18,000/night",dist:"0.2km from Kovalam Beach",img:"🏖️",desc:"Clifftop resort overlooking the Arabian Sea with Ayurvedic spa.",badge:"Beach Luxury"},
      {id:"h3",name:"Spice Village Thekkady",stars:4,rating:4.7,reviews:2400,price:"₹9,000/night",dist:"1km from Periyar Wildlife",img:"🌿",desc:"Eco-resort with thatched cottages amid a spice plantation.",badge:"Eco Retreat"},
      {id:"h4",name:"Zostel Alleppey",stars:2,rating:4.4,reviews:5100,price:"₹700/night",dist:"0.5km from Alleppey Jetty",img:"⛵",desc:"Social hostel steps from the famous backwater houseboat jetty.",badge:"Budget Pick"},
    ],
    restaurants:[
      {id:"r1",name:"Malabar Junction",cuisine:"Kerala Fine Dining",rating:4.8,reviews:2100,price:"₹₹₹",specialty:"Karimeen Pollichathu & Avial",img:"🐟"},
      {id:"r2",name:"Dhe Puttu",cuisine:"Kerala Breakfast",rating:4.7,reviews:8400,price:"₹",specialty:"Puttu with Kadala Curry",img:"🫙"},
      {id:"r3",name:"Paragon Restaurant",cuisine:"Malabar",rating:4.6,reviews:12000,price:"₹₹",specialty:"Malabar Biryani & Kozhikodan Halwa",img:"🍚"},
      {id:"r4",name:"Oceanos",cuisine:"Seafood",rating:4.5,reviews:3700,price:"₹₹₹",specialty:"Kerala Prawn Moilee",img:"🦐"},
    ],
    attractions:[
      {name:"Alleppey Backwaters",type:"Nature",rating:4.9},
      {name:"Munnar Tea Gardens",type:"Nature",rating:4.8},
      {name:"Periyar Wildlife Sanctuary",type:"Wildlife",rating:4.7},
      {name:"Fort Kochi",type:"Historic",rating:4.6},
    ],
  },
  {
    id:"agra", name:"Agra & Taj Mahal", country:"India", region:"india",
    tagline:"Monument to Eternal Love", emoji:"🕌",
    grad:["#6a1b9a","#ab47bc"],
    badge:"🇮🇳 India", badgeBg:"#f3e5f5", badgeC:"#6a1b9a",
    desc:"The world's greatest love story written in white marble under the Indian sky.",
    mood:["Heritage","Romance","History","Architecture"],
    hotels:[
      {id:"h1",name:"The Oberoi Amarvilas",stars:5,rating:5.0,reviews:4200,price:"₹55,000/night",dist:"0.6km from Taj Mahal",img:"🏛️",desc:"Every room has a direct view of the Taj Mahal — the only hotel that can say that.",badge:"Taj View"},
      {id:"h2",name:"ITC Mughal Agra",stars:5,rating:4.8,reviews:3100,price:"₹20,000/night",dist:"2km from Taj Mahal",img:"🌹",desc:"Mughal-inspired architecture spread across 35 acres of lush gardens.",badge:"Mughal Luxury"},
      {id:"h3",name:"Trident Agra",stars:5,rating:4.6,reviews:2600,price:"₹12,000/night",dist:"1km from Taj Mahal",img:"🏨",desc:"Modern luxury with an outdoor pool and Taj views from upper floors.",badge:"Classic Stay"},
      {id:"h4",name:"Hotel Kamal",stars:2,rating:4.1,reviews:9800,price:"₹1,200/night",dist:"0.2km from South Gate",img:"🎒",desc:"Legendary budget hotel famous among backpackers since the 1970s.",badge:"Budget Classic"},
    ],
    restaurants:[
      {id:"r1",name:"Esphahan (Amarvilas)",cuisine:"Mughal Fine Dining",rating:5.0,reviews:1800,price:"₹₹₹₹",specialty:"Dum Pukht Biryani & Murgh Musallam",img:"👑"},
      {id:"r2",name:"Pind Balluchi",cuisine:"North Indian",rating:4.6,reviews:6700,price:"₹₹",specialty:"Dal Makhani & Tandoori Platter",img:"🍢"},
      {id:"r3",name:"Dasaprakash",cuisine:"South Indian",rating:4.5,reviews:8900,price:"₹",specialty:"Masala Dosa & Filter Coffee",img:"🥘"},
      {id:"r4",name:"Mama Chicken Mama Franky",cuisine:"Street Food",rating:4.4,reviews:14000,price:"₹",specialty:"Agra Petha & Bedai Sabzi",img:"🌮"},
    ],
    attractions:[
      {name:"Taj Mahal",type:"Wonder",rating:5.0},
      {name:"Agra Fort",type:"Heritage",rating:4.7},
      {name:"Fatehpur Sikri",type:"Historic",rating:4.6},
      {name:"Mehtab Bagh",type:"Garden",rating:4.4},
    ],
  },
  {
    id:"goa", name:"Goa", country:"India", region:"india",
    tagline:"Sun, Sand & Spice", emoji:"🏄",
    grad:["#0077b6","#48cae4"],
    badge:"🇮🇳 India", badgeBg:"#e3f2fd", badgeC:"#0077b6",
    desc:"Portuguese-flavoured beaches, cashew feni, and the most relaxed vibe in India.",
    mood:["Beach","Nightlife","Food","Relaxation"],
    hotels:[
      {id:"h1",name:"Taj Exotica Goa",stars:5,rating:4.9,reviews:5400,price:"₹25,000/night",dist:"0km from Benaulim Beach",img:"🌊",desc:"56 acres of lush gardens on South Goa's most pristine stretch.",badge:"Beach Resort"},
      {id:"h2",name:"W Goa",stars:5,rating:4.8,reviews:4200,price:"₹22,000/night",dist:"0.1km from Vagator Beach",img:"🎉",desc:"Cliffside resort with an iconic SPICE pool party and stunning sea views.",badge:"Party Luxury"},
      {id:"h3",name:"Siolim House",stars:4,rating:4.7,reviews:1200,price:"₹8,000/night",dist:"5km from Chapora Fort",img:"🏡",desc:"Restored 300-year-old Portuguese mansion with a mango orchard pool.",badge:"Heritage Stay"},
      {id:"h4",name:"Jungle Hostel Anjuna",stars:2,rating:4.5,reviews:7800,price:"₹600/night",dist:"0.5km from Anjuna Flea Market",img:"🌴",desc:"Hammocks in the trees, the cheapest beers, the best stories.",badge:"Backpacker Fave"},
    ],
    restaurants:[
      {id:"r1",name:"Fisherman's Wharf",cuisine:"Goan Seafood",rating:4.8,reviews:12000,price:"₹₹₹",specialty:"Goan Fish Curry Rice & Prawn Balchão",img:"🐠"},
      {id:"r2",name:"Gunpowder Assagao",cuisine:"South Indian",rating:4.8,reviews:8400,price:"₹₹",specialty:"Coorgi Pork & Appam with Stew",img:"🌶️"},
      {id:"r3",name:"Vinayak Family Restaurant",cuisine:"Goan Home Food",rating:4.6,reviews:9800,price:"₹",specialty:"Chicken Xacuti & Sarpatel",img:"🍽️"},
      {id:"r4",name:"Mum's Kitchen",cuisine:"Heritage Goan",rating:4.7,reviews:6200,price:"₹₹",specialty:"Duck Vindaloo & Coconut Sorpotel",img:"🦆"},
    ],
    attractions:[
      {name:"Baga Beach",type:"Beach",rating:4.6},
      {name:"Dudhsagar Falls",type:"Nature",rating:4.8},
      {name:"Old Goa Churches",type:"Heritage",rating:4.7},
      {name:"Anjuna Flea Market",type:"Shopping",rating:4.4},
    ],
  },
  /* ── INTERNATIONAL ── */
  {
    id:"paris", name:"Paris", country:"France", region:"world",
    tagline:"City of Light", emoji:"🗼",
    grad:["#1a6b9e","#5eb4f0"],
    badge:"🌍 Europe", badgeBg:"#e3f2fd", badgeC:"#1a6b9e",
    desc:"Romance, art, culture, and world-class cuisine at every cobblestone corner.",
    mood:["Romance","Art","Food","Fashion"],
    hotels:[
      {id:"h1",name:"Hôtel Le Meurice",stars:5,rating:4.9,reviews:2843,price:"€650/night",dist:"0.2km from Louvre",img:"🏨",desc:"Palace hotel overlooking the Tuileries Garden.",badge:"Palace Hotel"},
      {id:"h2",name:"Hôtel de Crillon",stars:5,rating:4.8,reviews:1920,price:"€720/night",dist:"0.5km from Place de la Concorde",img:"🏰",desc:"Historic landmark on Place de la Concorde.",badge:"Iconic"},
      {id:"h3",name:"Le Marais Boutique",stars:4,rating:4.5,reviews:986,price:"€220/night",dist:"0.3km from Pompidou",img:"🏠",desc:"Charming boutique hotel in the trendy Marais district.",badge:"Boutique"},
      {id:"h4",name:"Montmartre Inn",stars:3,rating:4.2,reviews:1544,price:"€130/night",dist:"0.1km from Sacré-Cœur",img:"🏡",desc:"Cozy stay with views of the artists' quarter.",badge:"Budget"},
    ],
    restaurants:[
      {id:"r1",name:"Le Jules Verne",cuisine:"French Fine Dining",rating:4.8,reviews:3210,price:"€€€€",specialty:"Duck confit with truffles",img:"🍽️"},
      {id:"r2",name:"Café de Flore",cuisine:"French Bistro",rating:4.6,reviews:5800,price:"€€",specialty:"Croque Monsieur & café au lait",img:"☕"},
      {id:"r3",name:"L'Ami Jean",cuisine:"Basque",rating:4.7,reviews:2100,price:"€€€",specialty:"Rice pudding & foie gras",img:"🍷"},
      {id:"r4",name:"Breizh Café",cuisine:"Crêperie",rating:4.5,reviews:1870,price:"€€",specialty:"Buckwheat galettes",img:"🥞"},
    ],
    attractions:[
      {name:"Eiffel Tower",type:"Landmark",rating:4.9},
      {name:"Louvre Museum",type:"Museum",rating:4.8},
      {name:"Notre-Dame",type:"Historic",rating:4.7},
      {name:"Champs-Élysées",type:"Shopping",rating:4.5},
    ],
  },
  {
    id:"tokyo", name:"Tokyo", country:"Japan", region:"world",
    tagline:"Neon Meets Tradition", emoji:"⛩️",
    grad:["#b71c1c","#ef5350"],
    badge:"🌏 Asia", badgeBg:"#ffebee", badgeC:"#c62828",
    desc:"A dazzling fusion of futuristic tech and ancient temple culture.",
    mood:["Tech","Food","Culture","Anime"],
    hotels:[
      {id:"h1",name:"Park Hyatt Tokyo",stars:5,rating:4.9,reviews:3200,price:"¥85,000/night",dist:"1.2km from Shinjuku",img:"🏙️",desc:"Iconic skyscraper hotel made famous by Lost in Translation.",badge:"Iconic"},
      {id:"h2",name:"The Ritz-Carlton Tokyo",stars:5,rating:4.8,reviews:2600,price:"¥90,000/night",dist:"0.8km from Roppongi Hills",img:"🏨",desc:"Stunning views from floors 45–53 of Midtown Tower.",badge:"Skyline Views"},
      {id:"h3",name:"Asakusa Culture Hostel",stars:3,rating:4.4,reviews:4100,price:"¥12,000/night",dist:"0.2km from Senso-ji",img:"🏮",desc:"Traditional décor near Tokyo's oldest temple.",badge:"Temple Side"},
      {id:"h4",name:"Shibuya Stream Excel",stars:4,rating:4.6,reviews:2200,price:"¥35,000/night",dist:"0km from Shibuya Station",img:"🌃",desc:"Modern hotel directly above the famous crossing.",badge:"Central"},
    ],
    restaurants:[
      {id:"r1",name:"Sukiyabashi Jiro",cuisine:"Sushi",rating:5.0,reviews:1800,price:"¥¥¥¥",specialty:"Omakase tuna & sea urchin",img:"🍣"},
      {id:"r2",name:"Ichiran Ramen",cuisine:"Ramen",rating:4.7,reviews:12000,price:"¥",specialty:"Tonkotsu ramen in a private booth",img:"🍜"},
      {id:"r3",name:"Narisawa",cuisine:"Innovative Japanese",rating:4.9,reviews:1200,price:"¥¥¥¥",specialty:"Satoyama farm cuisine",img:"🍱"},
      {id:"r4",name:"Tsukiji Outer Market",cuisine:"Seafood Market",rating:4.6,reviews:9800,price:"¥¥",specialty:"Fresh sashimi & tamagoyaki",img:"🦞"},
    ],
    attractions:[
      {name:"Senso-ji Temple",type:"Historic",rating:4.8},
      {name:"Shibuya Crossing",type:"Landmark",rating:4.7},
      {name:"Tokyo Skytree",type:"Viewpoint",rating:4.6},
      {name:"Shinjuku Gyoen",type:"Park",rating:4.5},
    ],
  },
  {
    id:"dubai", name:"Dubai", country:"UAE", region:"world",
    tagline:"Desert Meets Skyline", emoji:"🏙️",
    grad:["#c49000","#f7c500"],
    badge:"🌍 Middle East", badgeBg:"#fffde7", badgeC:"#b8860b",
    desc:"Superlatives are a way of life — tallest, largest, most luxurious.",
    mood:["Luxury","Shopping","Adventure","Architecture"],
    hotels:[
      {id:"h1",name:"Burj Al Arab",stars:7,rating:5.0,reviews:4500,price:"$2,500/night",dist:"1.5km from Jumeirah Beach",img:"⛵",desc:"The world's most iconic sail-shaped hotel.",badge:"Most Iconic"},
      {id:"h2",name:"Atlantis The Palm",stars:5,rating:4.7,reviews:8900,price:"$800/night",dist:"0km from Aquaventure",img:"🌊",desc:"Massive resort on the Palm Jumeirah archipelago.",badge:"Family Pick"},
      {id:"h3",name:"Address Downtown",stars:5,rating:4.8,reviews:3200,price:"$450/night",dist:"0.1km from Burj Khalifa",img:"🏗️",desc:"Steps away from the world's tallest building.",badge:"City Centre"},
      {id:"h4",name:"XVA Art Hotel",stars:4,rating:4.5,reviews:1400,price:"$220/night",dist:"0.5km from Dubai Museum",img:"🎨",desc:"Boutique art hotel in the historic Al Fahidi district.",badge:"Boutique"},
    ],
    restaurants:[
      {id:"r1",name:"Nobu Dubai",cuisine:"Japanese-Peruvian",rating:4.8,reviews:5600,price:"$$$$",specialty:"Black cod with miso",img:"🥢"},
      {id:"r2",name:"Al Hadheerah",cuisine:"Emirati",rating:4.7,reviews:3400,price:"$$$",specialty:"Traditional ouzi & live show",img:"🫕"},
      {id:"r3",name:"Torno Subito",cuisine:"Italian",rating:4.6,reviews:2100,price:"$$$",specialty:"Wood-fired pizza & pasta",img:"🍕"},
      {id:"r4",name:"Arabian Tea House",cuisine:"Emirati Café",rating:4.5,reviews:4200,price:"$$",specialty:"Karak chai & medjool dates",img:"🫖"},
    ],
    attractions:[
      {name:"Burj Khalifa",type:"Landmark",rating:4.9},
      {name:"Dubai Mall",type:"Shopping",rating:4.7},
      {name:"Desert Safari",type:"Adventure",rating:4.8},
      {name:"Old Dubai Creek",type:"Historic",rating:4.5},
    ],
  },
  {
    id:"bali", name:"Bali", country:"Indonesia", region:"world",
    tagline:"Island of the Gods", emoji:"🌺",
    grad:["#2e7d32","#81c784"],
    badge:"🌏 Asia", badgeBg:"#e8f5e9", badgeC:"#1b5e20",
    desc:"Lush rice terraces, sacred temples, and world-class surf.",
    mood:["Nature","Spiritual","Surf","Wellness"],
    hotels:[
      {id:"h1",name:"Four Seasons Sayan",stars:5,rating:4.9,reviews:2800,price:"$850/night",dist:"2km from Ubud Center",img:"🌿",desc:"Floating above the Ayung River valley in Ubud.",badge:"Jungle Luxury"},
      {id:"h2",name:"COMO Uma Ubud",stars:5,rating:4.8,reviews:1900,price:"$650/night",dist:"1.5km from Ubud Market",img:"🏞️",desc:"Panoramic rice terrace views from infinity pool.",badge:"Rice Terrace"},
      {id:"h3",name:"Alaya Ubud",stars:4,rating:4.6,reviews:3200,price:"$280/night",dist:"0.3km from Monkey Forest",img:"🐒",desc:"Lush gardens with Balinese architecture.",badge:"Cultural"},
      {id:"h4",name:"Kuta Beach Hostel",stars:2,rating:4.0,reviews:5600,price:"$35/night",dist:"0.1km from Kuta Beach",img:"🏄",desc:"Budget stay steps from the surf and nightlife.",badge:"Budget"},
    ],
    restaurants:[
      {id:"r1",name:"Locavore",cuisine:"Modern Indonesian",rating:4.9,reviews:2400,price:"$$$$",specialty:"Farm-to-table Balinese tasting menu",img:"🌾"},
      {id:"r2",name:"Warung Babi Guling",cuisine:"Balinese",rating:4.7,reviews:6800,price:"$",specialty:"Suckling pig with sambal",img:"🐷"},
      {id:"r3",name:"Mozaic Restaurant",cuisine:"French-Balinese",rating:4.8,reviews:1600,price:"$$$$",specialty:"Chef's garden tasting menu",img:"🥗"},
      {id:"r4",name:"Naughty Nuri's",cuisine:"BBQ",rating:4.5,reviews:9200,price:"$$",specialty:"Pork ribs & martinis",img:"🍖"},
    ],
    attractions:[
      {name:"Tanah Lot Temple",type:"Historic",rating:4.8},
      {name:"Tegalalang Rice Terrace",type:"Nature",rating:4.7},
      {name:"Mount Batur",type:"Adventure",rating:4.9},
      {name:"Seminyak Beach",type:"Beach",rating:4.6},
    ],
  },
];

/* ─────────────────── HELPERS ─────────────────── */
const Stars = ({ r, size=13 }) => {
  const full = Math.floor(r), half = r%1>=0.5;
  return <span style={{color:"#f59e0b",fontSize:size,letterSpacing:1}}>
    {"★".repeat(full)}{half?"½":""}{"☆".repeat(5-full-(half?1:0))}
  </span>;
};

const Chip = ({ children, bg="#f1f5f9", color="#334155", dot="" }) => (
  <span style={{
    display:"inline-flex",alignItems:"center",gap:4,
    fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:20,
    background:bg,color
  }}>{dot&&<span>{dot}</span>}{children}</span>
);

const gradStr = (g) => `linear-gradient(135deg, ${g[0]} 0%, ${g[1]} 100%)`;

const moodIcons = {
  Heritage:"🏛️",Desert:"🏜️",Culture:"🎭",Forts:"🏰",Nature:"🌿",
  Backwaters:"🛶",Wellness:"🧘",Beaches:"🏖️",Romance:"💕",
  Art:"🎨",Food:"🍴",Fashion:"👗",Tech:"💻",Anime:"🌸",
  Luxury:"💎",Shopping:"🛍️",Adventure:"🧗",Architecture:"🏗️",
  Spiritual:"🙏",Surf:"🏄",Beach:"🏖️",Nightlife:"🌙",
  Relaxation:"😌","Wildlife":"🐘","Park":"🌳","Historic":"🏛️",
  Wonder:"✨",Garden:"🌸",Heritage:"🏯","Multi-cuisine":"🍽️",
};

/* ─────────────────── COMPONENTS ─────────────────── */

/* TOP NAV */
function Nav({ onHome, title, showBack, onBack }) {
  return (
    <nav style={{
      position:"sticky",top:0,zIndex:100,
      background:"rgba(10,20,50,0.96)",backdropFilter:"blur(12px)",
      borderBottom:"1px solid rgba(255,255,255,0.08)",
      display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"0 16px",height:56,
    }}>
      <div onClick={onHome} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
        <span style={{fontSize:22}}>✈️</span>
        <span style={{color:"#fff",fontWeight:800,fontSize:16,letterSpacing:"-0.3px"}}>TravelGuider</span>
      </div>
      {showBack && (
        <button onClick={onBack} style={{
          background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",
          color:"#fff",padding:"6px 14px",borderRadius:20,cursor:"pointer",
          fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:4
        }}>← Back</button>
      )}
      {!showBack && <span style={{color:"rgba(255,255,255,0.5)",fontSize:12}}>🌍 6+ Destinations</span>}
    </nav>
  );
}

/* BREADCRUMB */
function Breadcrumb({ crumbs }) {
  return (
    <div style={{
      background:"#fff",borderBottom:"1px solid #f0f0f0",
      padding:"8px 16px",display:"flex",alignItems:"center",
      gap:4,fontSize:12,overflowX:"auto",whiteSpace:"nowrap",
    }}>
      {crumbs.map((c,i)=>(
        <span key={i} style={{display:"inline-flex",alignItems:"center",gap:4}}>
          <span style={{color:i===crumbs.length-1?"#111":"#2563eb",fontWeight:i===crumbs.length-1?600:400}}>{c}</span>
          {i<crumbs.length-1&&<span style={{color:"#d1d5db"}}>›</span>}
        </span>
      ))}
    </div>
  );
}

/* HOME PAGE */
function HomePage({ onSelect }) {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("all");
  const [hoverId, setHoverId] = useState(null);

  const tabs = [
    { id:"all", label:"🌐 All" },
    { id:"india", label:"🇮🇳 India" },
    { id:"world", label:"🌍 World" },
  ];

  const shown = PLACES.filter(p => {
    const matchQ = !q || p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.country.toLowerCase().includes(q.toLowerCase()) ||
      p.mood.some(m=>m.toLowerCase().includes(q.toLowerCase()));
    const matchTab = tab==="all" || p.region===tab;
    return matchQ && matchTab;
  });

  return (
    <div style={{background:"#0a1428",minHeight:"100vh"}}>
      {/* Hero */}
      <div style={{
        background:"linear-gradient(160deg,#0a1428 0%,#112240 40%,#0d3b2e 100%)",
        padding:"40px 16px 48px",textAlign:"center",
        position:"relative",overflow:"hidden",
      }}>
        <div style={{
          position:"absolute",top:-60,left:"50%",transform:"translateX(-50%)",
          width:320,height:320,borderRadius:"50%",
          background:"radial-gradient(circle,rgba(255,180,0,0.10),transparent 70%)",
          pointerEvents:"none"
        }}/>
        <div style={{fontSize:52,marginBottom:8}}>🌍</div>
        <h1 style={{
          fontSize:"clamp(26px,6vw,40px)",fontWeight:900,
          color:"#fff",margin:"0 0 10px",letterSpacing:"-1px",lineHeight:1.1
        }}>
          Find Your<br/>
          <span style={{
            background:"linear-gradient(90deg,#ffd700,#ff8c00)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"
          }}>Next Adventure</span>
        </h1>
        <p style={{fontSize:14,color:"rgba(255,255,255,0.6)",margin:"0 0 28px",lineHeight:1.6}}>
          Hotels · Restaurants · Places — all in one guide
        </p>

        {/* Search */}
        <div style={{maxWidth:460,margin:"0 auto",position:"relative"}}>
          <input
            value={q} onChange={e=>setQ(e.target.value)}
            placeholder="Search city, country, vibe…"
            style={{
              width:"100%",padding:"14px 20px 14px 46px",boxSizing:"border-box",
              borderRadius:40,border:"2px solid rgba(255,255,255,0.15)",
              background:"rgba(255,255,255,0.07)",color:"#fff",
              fontSize:15,outline:"none",backdropFilter:"blur(8px)",
              "::placeholder":{color:"rgba(255,255,255,0.4)"}
            }}
          />
          <span style={{
            position:"absolute",left:15,top:"50%",transform:"translateY(-50%)",
            fontSize:18,color:"rgba(255,255,255,0.5)"
          }}>🔍</span>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:20,flexWrap:"wrap"}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              padding:"8px 18px",borderRadius:20,fontSize:13,fontWeight:600,
              cursor:"pointer",border:"1.5px solid",transition:"all 0.2s",
              background: tab===t.id ? "rgba(255,215,0,0.15)" : "transparent",
              borderColor: tab===t.id ? "#ffd700" : "rgba(255,255,255,0.2)",
              color: tab===t.id ? "#ffd700" : "rgba(255,255,255,0.6)",
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div style={{padding:"24px 14px",background:"#0f1b2d"}}>
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,280px),1fr))",
          gap:16,maxWidth:960,margin:"0 auto"
        }}>
          {shown.length===0 ? (
            <div style={{gridColumn:"1/-1",textAlign:"center",padding:"48px 0",color:"rgba(255,255,255,0.4)"}}>
              <div style={{fontSize:48,marginBottom:12}}>🗺️</div>
              <p>No destinations found. Try a different search.</p>
            </div>
          ) : shown.map(p=>(
            <div key={p.id}
              onClick={()=>onSelect(p)}
              onMouseEnter={()=>setHoverId(p.id)}
              onMouseLeave={()=>setHoverId(null)}
              style={{
                borderRadius:18,overflow:"hidden",cursor:"pointer",
                background:"#162035",border:"1.5px solid rgba(255,255,255,0.07)",
                transform: hoverId===p.id ? "translateY(-5px) scale(1.01)" : "translateY(0) scale(1)",
                boxShadow: hoverId===p.id ? "0 20px 48px rgba(0,0,0,0.5)" : "0 4px 12px rgba(0,0,0,0.3)",
                transition:"all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              {/* Card top gradient banner */}
              <div style={{
                background:gradStr(p.grad),padding:"30px 20px 22px",
                textAlign:"center",position:"relative",
              }}>
                <div style={{
                  position:"absolute",top:10,right:12,
                  fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:10,
                  background:p.badgeBg,color:p.badgeC
                }}>{p.badge}</div>
                <div style={{fontSize:50,lineHeight:1}}>{p.emoji}</div>
                <h3 style={{fontSize:20,fontWeight:800,color:"#fff",margin:"10px 0 2px"}}>{p.name}</h3>
                <p style={{fontSize:12,color:"rgba(255,255,255,0.75)",margin:0}}>{p.country}</p>
              </div>

              {/* Card body */}
              <div style={{padding:"14px 16px 18px"}}>
                <p style={{
                  fontSize:12,color:"rgba(255,255,255,0.5)",margin:"0 0 6px",
                  fontStyle:"italic"
                }}>"{p.tagline}"</p>
                <p style={{fontSize:12,color:"rgba(255,255,255,0.7)",lineHeight:1.6,margin:"0 0 12px"}}>
                  {p.desc}
                </p>
                <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:14}}>
                  {p.mood.slice(0,3).map(m=>(
                    <span key={m} style={{
                      fontSize:10,padding:"3px 8px",borderRadius:10,
                      background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.55)"
                    }}>{moodIcons[m]||"✨"} {m}</span>
                  ))}
                </div>
                <button style={{
                  width:"100%",padding:"10px",borderRadius:12,
                  background:gradStr(p.grad),color:"#fff",
                  border:"none",fontSize:13,fontWeight:700,cursor:"pointer",
                  letterSpacing:"0.3px"
                }}>Explore {p.name} →</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{textAlign:"center",padding:"24px",background:"#0a1428",color:"rgba(255,255,255,0.25)",fontSize:12}}>
        © 2025 TravelGuider · Internship Project
      </div>
    </div>
  );
}

/* PLACE PAGE */
function PlacePage({ place, onCategory, onBack }) {
  const cats = [
    { id:"hotels", emoji:"🏨", label:"Hotels & Stay", sub:`${place.hotels.length} properties`, grad:["#1d4ed8","#3b82f6"] },
    { id:"restaurants", emoji:"🍽️", label:"Food & Dining", sub:`${place.restaurants.length} restaurants`, grad:["#b45309","#f59e0b"] },
    { id:"attractions", emoji:"🗺️", label:"Places to Visit", sub:`${place.attractions.length} spots`, grad:["#065f46","#34d399"] },
  ];

  return (
    <div style={{background:"#f4f6fb",minHeight:"100vh"}}>
      {/* Hero banner */}
      <div style={{background:gradStr(place.grad),padding:"32px 16px 36px",position:"relative",overflow:"hidden"}}>
        <div style={{
          position:"absolute",bottom:-30,right:-30,fontSize:120,opacity:0.15,lineHeight:1
        }}>{place.emoji}</div>
        <div style={{position:"relative"}}>
          <span style={{
            fontSize:10,fontWeight:700,padding:"4px 10px",borderRadius:10,
            background:place.badgeBg,color:place.badgeC,letterSpacing:"0.5px"
          }}>{place.badge}</span>
          <h1 style={{fontSize:"clamp(24px,6vw,36px)",fontWeight:900,color:"#fff",margin:"10px 0 4px",letterSpacing:"-0.5px"}}>
            {place.emoji} {place.name}
          </h1>
          <p style={{fontSize:14,color:"rgba(255,255,255,0.8)",margin:"0 0 4px",fontStyle:"italic"}}>
            "{place.tagline}"
          </p>
          <p style={{fontSize:13,color:"rgba(255,255,255,0.7)",margin:0,maxWidth:420}}>{place.desc}</p>
          {/* mood chips */}
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:14}}>
            {place.mood.map(m=>(
              <span key={m} style={{
                fontSize:11,padding:"4px 10px",borderRadius:20,
                background:"rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.9)",fontWeight:600
              }}>{moodIcons[m]||"✨"} {m}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Highlights strip */}
      <div style={{background:"#fff",padding:"12px 16px",borderBottom:"1px solid #e5e7eb",overflowX:"auto"}}>
        <div style={{display:"flex",gap:16,minWidth:"max-content"}}>
          {place.attractions.map(a=>(
            <div key={a.name} style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontSize:14}}>{moodIcons[a.type]||"📍"}</span>
              <span style={{fontSize:12,color:"#444",fontWeight:500}}>{a.name}</span>
              <Stars r={a.rating} size={10}/>
            </div>
          ))}
        </div>
      </div>

      {/* Category picks */}
      <div style={{padding:"24px 14px"}}>
        <h2 style={{fontSize:17,fontWeight:700,color:"#111",margin:"0 0 16px"}}>What would you like to explore?</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,240px),1fr))",gap:14}}>
          {cats.map(c=>(
            <div key={c.id} onClick={()=>onCategory(c.id)}
              style={{
                background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:16,
                padding:"24px 20px",cursor:"pointer",textAlign:"center",
                transition:"all 0.22s",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"
              }}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.12)";e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)";e.currentTarget.style.transform="translateY(0)";}}
            >
              <div style={{fontSize:42,marginBottom:10}}>{c.emoji}</div>
              <h3 style={{fontSize:15,fontWeight:700,margin:"0 0 4px",color:"#111"}}>{c.label}</h3>
              <p style={{fontSize:12,color:"#888",margin:"0 0 16px"}}>{c.sub}</p>
              <div style={{
                background:gradStr(c.grad),color:"#fff",
                padding:"8px 20px",borderRadius:20,fontSize:12,fontWeight:700,
                display:"inline-block"
              }}>Browse →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* HOTELS LIST */
function HotelsPage({ place, onHotel, onBack }) {
  const sorted = [...place.hotels].sort((a,b)=>b.rating-a.rating);
  return (
    <div style={{background:"#f4f6fb",minHeight:"100vh"}}>
      <div style={{background:gradStr(["#1d3a8a","#2563eb"]),padding:"28px 16px 32px"}}>
        <h1 style={{fontSize:24,fontWeight:800,color:"#fff",margin:"0 0 4px"}}>🏨 Hotels in {place.name}</h1>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.7)",margin:0}}>{sorted.length} properties · Sorted by rating</p>
      </div>
      <div style={{padding:"16px 14px",display:"flex",flexDirection:"column",gap:12,maxWidth:720,margin:"0 auto"}}>
        {sorted.map(h=>(
          <div key={h.id} onClick={()=>onHotel(h)}
            style={{
              background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:16,
              padding:"16px",cursor:"pointer",transition:"all 0.2s",
              display:"flex",gap:14,alignItems:"flex-start",
              boxShadow:"0 2px 6px rgba(0,0,0,0.05)"
            }}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.12)";e.currentTarget.style.borderColor="#93c5fd";}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 2px 6px rgba(0,0,0,0.05)";e.currentTarget.style.borderColor="#e5e7eb";}}
          >
            <div style={{
              width:56,height:56,borderRadius:14,flexShrink:0,
              background:gradStr(place.grad),
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:28
            }}>{h.img}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,flexWrap:"wrap"}}>
                <div>
                  <h3 style={{fontSize:15,fontWeight:700,margin:"0 0 3px",color:"#111"}}>{h.name}</h3>
                  <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                    <Stars r={h.rating} size={11}/>
                    <span style={{fontSize:11,color:"#555"}}>{h.rating} · {h.reviews.toLocaleString()} reviews</span>
                  </div>
                </div>
                <span style={{
                  fontSize:12,fontWeight:700,padding:"4px 10px",borderRadius:10,
                  background:"#e8f5e9",color:"#1b5e20",flexShrink:0
                }}>{h.price}</span>
              </div>
              <p style={{fontSize:12,color:"#666",margin:"6px 0 4px",lineHeight:1.5}}>{h.desc}</p>
              <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                <span style={{fontSize:11,color:"#888"}}>📍 {h.dist}</span>
                <span style={{fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:8,background:"#eff6ff",color:"#1d4ed8"}}>{h.badge}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* RESTAURANTS LIST */
function RestaurantsPage({ place, onBack }) {
  const sorted = [...place.restaurants].sort((a,b)=>b.rating-a.rating);
  return (
    <div style={{background:"#f4f6fb",minHeight:"100vh"}}>
      <div style={{background:gradStr(["#7c2d12","#c2410c"]),padding:"28px 16px 32px"}}>
        <h1 style={{fontSize:24,fontWeight:800,color:"#fff",margin:"0 0 4px"}}>🍽️ Famous Restaurants in {place.name}</h1>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.7)",margin:0}}>{sorted.length} picks · Local favourites & top-rated</p>
      </div>
      <div style={{padding:"16px 14px",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,260px),1fr))",gap:14,maxWidth:900,margin:"0 auto"}}>
        {sorted.map(r=>(
          <div key={r.id}
            style={{
              background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:16,
              overflow:"hidden",boxShadow:"0 2px 6px rgba(0,0,0,0.05)",
              transition:"all 0.2s"
            }}
            onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.12)"}
            onMouseLeave={e=>e.currentTarget.style.boxShadow="0 2px 6px rgba(0,0,0,0.05)"}
          >
            <div style={{
              background:gradStr(["#fff7ed","#fef3c7"]),
              padding:"24px 16px 16px",textAlign:"center",
              borderBottom:"1px solid #fde68a"
            }}>
              <div style={{fontSize:46}}>{r.img}</div>
              <div style={{marginTop:8}}>
                <Stars r={r.rating} size={15}/>
                <span style={{fontSize:12,color:"#666",marginLeft:5}}>{r.rating} ({r.reviews.toLocaleString()})</span>
              </div>
            </div>
            <div style={{padding:"14px 16px 18px"}}>
              <h3 style={{fontSize:15,fontWeight:700,margin:"0 0 6px",color:"#111"}}>{r.name}</h3>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <span style={{fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:8,background:"#fef3c7",color:"#78350f"}}>{r.cuisine}</span>
                <span style={{fontSize:13,fontWeight:700,color:"#059669"}}>{r.price}</span>
              </div>
              <p style={{fontSize:12,color:"#666",margin:0,lineHeight:1.5}}>🍴 <em>{r.specialty}</em></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ATTRACTIONS LIST */
function AttractionsPage({ place, onBack }) {
  const typeIcons = { Historic:"🏛️",Landmark:"📍",Park:"🌳",Beach:"🏖️",Adventure:"🧗",Nature:"🌿",Museum:"🖼️",Viewpoint:"🌄",Shopping:"🛍️",Entertainment:"🎭",Cultural:"🎭",Heritage:"🏯",Wonder:"✨",Garden:"🌸",Wildlife:"🐘" };
  return (
    <div style={{background:"#f4f6fb",minHeight:"100vh"}}>
      <div style={{background:gradStr(["#064e3b","#059669"]),padding:"28px 16px 32px"}}>
        <h1 style={{fontSize:24,fontWeight:800,color:"#fff",margin:"0 0 4px"}}>🗺️ Places to Visit in {place.name}</h1>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.7)",margin:0}}>Top-rated attractions</p>
      </div>
      <div style={{padding:"16px 14px",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,200px),1fr))",gap:14,maxWidth:860,margin:"0 auto"}}>
        {[...place.attractions].sort((a,b)=>b.rating-a.rating).map(a=>(
          <div key={a.name} style={{
            background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:16,
            padding:"24px 16px",textAlign:"center",
            boxShadow:"0 2px 6px rgba(0,0,0,0.05)",transition:"all 0.2s"
          }}
            onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.12)"}
            onMouseLeave={e=>e.currentTarget.style.boxShadow="0 2px 6px rgba(0,0,0,0.05)"}
          >
            <div style={{fontSize:44}}>{typeIcons[a.type]||"🎪"}</div>
            <h3 style={{fontSize:14,fontWeight:700,margin:"10px 0 6px",color:"#111"}}>{a.name}</h3>
            <span style={{fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:8,background:"#d1fae5",color:"#065f46"}}>{a.type}</span>
            <div style={{marginTop:8}}>
              <Stars r={a.rating} size={14}/>
              <div style={{fontSize:11,color:"#666",marginTop:2}}>{a.rating}/5</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* HOTEL DETAIL */
function HotelDetailPage({ hotel, place, onBack }) {
  const nearby = place.hotels.filter(h=>h.id!==hotel.id);
  const amenities = ["Free WiFi 📶","Swimming Pool 🏊","Fitness Center 🏋️","Restaurant 🍽️","24h Reception ⏰","Spa & Wellness 💆","Airport Shuttle 🚌","Room Service 🛎️","Parking 🚗","Bar & Lounge 🍹"];
  return (
    <div style={{background:"#f4f6fb",minHeight:"100vh"}}>
      {/* Hero */}
      <div style={{background:gradStr(place.grad),padding:"28px 16px 36px",position:"relative",overflow:"hidden"}}>
        <div style={{
          position:"absolute",bottom:-20,right:-20,fontSize:100,opacity:0.15,lineHeight:1
        }}>{hotel.img}</div>
        <div style={{position:"relative"}}>
          <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:10,background:place.badgeBg,color:place.badgeC}}>{hotel.badge}</span>
          <div style={{fontSize:52,margin:"10px 0 8px"}}>{hotel.img}</div>
          <h1 style={{fontSize:22,fontWeight:900,color:"#fff",margin:"0 0 6px"}}>{hotel.name}</h1>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            <Stars r={hotel.rating} size={16}/>
            <span style={{color:"rgba(255,255,255,0.85)",fontSize:13}}>{hotel.rating}/5 · {hotel.reviews.toLocaleString()} reviews</span>
          </div>
        </div>
      </div>

      <div style={{padding:"16px 14px",maxWidth:720,margin:"0 auto"}}>
        {/* Info cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:16}}>
          {[
            {label:"Price/night",value:hotel.price,bg:"#eff6ff",c:"#1d4ed8"},
            {label:"Rating",value:hotel.rating+"★",bg:"#fefce8",c:"#a16207"},
            {label:"Stars",value:"⭐".repeat(Math.min(hotel.stars,5)),bg:"#f0fdf4",c:"#15803d"},
          ].map(x=>(
            <div key={x.label} style={{background:x.bg,borderRadius:12,padding:"12px 10px",textAlign:"center"}}>
              <div style={{fontSize:10,color:x.c,marginBottom:3,fontWeight:600}}>{x.label}</div>
              <div style={{fontSize:14,fontWeight:800,color:x.c}}>{x.value}</div>
            </div>
          ))}
        </div>

        {/* About */}
        <div style={{background:"#fff",borderRadius:16,padding:"18px",marginBottom:14,border:"1.5px solid #e5e7eb"}}>
          <h2 style={{fontSize:15,fontWeight:700,margin:"0 0 8px",color:"#111"}}>About this property</h2>
          <p style={{fontSize:13,color:"#444",lineHeight:1.7,margin:"0 0 10px"}}>{hotel.desc}</p>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:12,color:"#888"}}>📍 {hotel.dist}</span>
          </div>
        </div>

        {/* Amenities */}
        <div style={{background:"#fff",borderRadius:16,padding:"18px",marginBottom:16,border:"1.5px solid #e5e7eb"}}>
          <h2 style={{fontSize:15,fontWeight:700,margin:"0 0 12px",color:"#111"}}>Amenities</h2>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {amenities.map(a=>(
              <span key={a} style={{
                fontSize:11,background:"#f8fafc",color:"#475569",
                padding:"5px 12px",borderRadius:20,border:"1px solid #e2e8f0",fontWeight:500
              }}>{a}</span>
            ))}
          </div>
        </div>

        {/* Nearby */}
        <h2 style={{fontSize:17,fontWeight:700,color:"#111",margin:"0 0 12px"}}>🏘️ Nearby Hotels in {place.name}</h2>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {nearby.map(h=>(
            <div key={h.id} style={{
              background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:14,
              padding:"14px 16px",display:"flex",gap:12,alignItems:"center",
              boxShadow:"0 1px 4px rgba(0,0,0,0.05)"
            }}>
              <div style={{
                width:44,height:44,borderRadius:12,flexShrink:0,
                background:gradStr(place.grad),
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:22
              }}>{h.img}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                  <h3 style={{fontSize:13,fontWeight:700,margin:0,color:"#111"}}>{h.name}</h3>
                  <span style={{fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:8,background:"#e8f5e9",color:"#1b5e20",flexShrink:0}}>{h.price}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginTop:3,flexWrap:"wrap"}}>
                  <Stars r={h.rating} size={10}/>
                  <span style={{fontSize:10,color:"#666"}}>{h.rating} ({h.reviews.toLocaleString()})</span>
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

/* ─────────────────── ROOT APP ─────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const [place, setPlace] = useState(null);
  const [cat, setCat] = useState(null);
  const [hotel, setHotel] = useState(null);

  useEffect(()=>{ window.scrollTo({top:0,behavior:"smooth"}); },[page]);

  const goHome   = () => { setPage("home"); setPlace(null); setCat(null); setHotel(null); };
  const goPlace  = (p) => { setPlace(p); setCat(null); setHotel(null); setPage("place"); };
  const goCat    = (c) => { setCat(c); setHotel(null); setPage("cat"); };
  const goHotel  = (h) => { setHotel(h); setPage("hotel"); };

  const catLabels = { hotels:"🏨 Hotels", restaurants:"🍽️ Restaurants", attractions:"🗺️ Attractions" };

  const crumbs = () => {
    const c = ["🏠 Home"];
    if (place) c.push(`${place.emoji} ${place.name}`);
    if (cat) c.push(catLabels[cat]||cat);
    if (hotel) c.push(hotel.name);
    return c;
  };

  const back = () => {
    if (page==="hotel") setPage("cat");
    else if (page==="cat") setPage("place");
    else if (page==="place") setPage("home");
  };

  return (
    <div style={{fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif",background:"#0a1428",minHeight:"100vh"}}>
      <Nav
        onHome={goHome}
        showBack={page!=="home"}
        onBack={back}
        title={place?.name}
      />
      {page!=="home" && <Breadcrumb crumbs={crumbs()}/>}

      {page==="home" && <HomePage onSelect={goPlace}/>}
      {page==="place" && place && <PlacePage place={place} onCategory={goCat} onBack={goHome}/>}
      {page==="cat" && place && cat==="hotels" && <HotelsPage place={place} onHotel={goHotel} onBack={()=>setPage("place")}/>}
      {page==="cat" && place && cat==="restaurants" && <RestaurantsPage place={place} onBack={()=>setPage("place")}/>}
      {page==="cat" && place && cat==="attractions" && <AttractionsPage place={place} onBack={()=>setPage("place")}/>}
      {page==="hotel" && hotel && place && <HotelDetailPage hotel={hotel} place={place} onBack={()=>setPage("cat")}/>}
    </div>
  );
}
