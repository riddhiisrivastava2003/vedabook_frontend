import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ganeshaHero from './assets/SacredGaneshDiety.png';

// ==========================================
// MOCK DATA: Pandits
// ==========================================
const PANDITS_DATA = [
  {
    id: 1,
    name: 'Acharya Radhe Shyam Shastri',
    title: 'Vedic Scholastic & Astrologer',
    experience: 22,
    rating: 4.95,
    reviews: 182,
    languages: ['Sanskrit', 'Hindi', 'Gujarati'],
    city: 'Varanasi',
    expertise: 'Vedic Scholastic',
    dakshina: 5100,
    specialties: ['Satyanarayan Pooja', 'Griha Pravesh', 'Vivah Sanskar'],
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=300',
    bio: 'Completed his Shastri and Acharya degrees in Shukla Yajurveda from Sampurnanand Sanskrit Vishwavidyalaya, Varanasi. Over 22 years of conducting major Griha Pravesh and weddings.',
    phone: '+91 98765 43210'
  },
  {
    id: 2,
    name: 'Pandit Devendra Dwivedi',
    title: 'Rigveda Chanting & Homa Specialist',
    experience: 14,
    rating: 4.85,
    reviews: 114,
    languages: ['Sanskrit', 'Hindi'],
    city: 'Haridwar',
    expertise: 'Puranic Rituals',
    dakshina: 4500,
    specialties: ['Rudrabhishek Pooja', 'Maha Mrityunjaya Jaap', 'Mundan Sanskar'],
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=300',
    bio: 'Trained at Haridwar Gurukul, specializing in Rigvedic chanting and Havan. Highly regarded for flawless pronunciation during Rudrabhishek.',
    phone: '+91 87654 32109'
  },
  {
    id: 3,
    name: 'Pandit Rameshwar Bhatt',
    title: 'Shraadh & Antyesti Sanskar Specialist',
    experience: 27,
    rating: 4.9,
    reviews: 248,
    languages: ['Sanskrit', 'Hindi', 'Marathi'],
    city: 'Nashik',
    expertise: 'Puranic Rituals',
    dakshina: 7500,
    specialties: ['Antyesti Sanskar', 'Pitra Dosh Pooja', 'Satyanarayan Pooja'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    bio: 'Nashik-based senior priest specializing in final passage rites, Pitra Dosh Nivaran, and ancestral offerings at Trimbakeshwar.',
    phone: '+91 76543 21098'
  },
  {
    id: 4,
    name: 'Acharya Raghavan Chariyar',
    title: 'Agama Sastra Scholar',
    experience: 18,
    rating: 4.8,
    reviews: 96,
    languages: ['Sanskrit', 'Tamil', 'Telugu', 'Hindi'],
    city: 'Chennai',
    expertise: 'Vedic Scholastic',
    dakshina: 6500,
    specialties: ['Vivah Sanskar', 'Griha Pravesh', 'Janeu / Upanayan'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    bio: 'Expert in Vaikhanasa and Pancharatra Agama wedding customs and home purifications. Offers clear explanations of rituals in English, Tamil, and Hindi.',
    phone: '+91 65432 10987'
  },
  {
    id: 5,
    name: 'Pandit Kamlesh Pandey',
    title: 'Pooja Priest & Astrological Guide',
    experience: 9,
    rating: 4.7,
    reviews: 74,
    languages: ['Hindi', 'Bhojpuri'],
    city: 'Patna',
    expertise: 'Astrological Guidance',
    dakshina: 3100,
    specialties: ['Griha Pravesh', 'Satyanarayan Pooja', 'Mundan Sanskar'],
    image: 'https://images.unsplash.com/photo-1620122303020-43ec4b6cf7f8?auto=format&fit=crop&q=80&w=300',
    bio: 'Offers astrological consultations and family pujas. Known for his cheerful explanation of spiritual lore and making children participate.',
    phone: '+91 95432 98765'
  },
  {
    id: 6,
    name: 'Mahamahopadhyaya Shastri ji',
    title: 'Mahayagya Conductor & Vedic Guru',
    experience: 35,
    rating: 5.0,
    reviews: 380,
    languages: ['Sanskrit', 'Hindi', 'Bengali'],
    city: 'Kolkata',
    expertise: 'Vedic Scholastic',
    dakshina: 11000,
    specialties: ['Rudrabhishek Pooja', 'Vivah Sanskar', 'Maha Mrityunjaya Jaap'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    bio: 'Senior Yajnik who has presided over grand yagyas and multi-pandit chanting sammelans nationwide. Advisor for classical rituals.',
    phone: '+91 99999 88888'
  }
];

// ==========================================
// MOCK DATA: Poojas & Guides
// ==========================================
const POOJAS_DATA = [
  {
    id: 'satyanarayan',
    name: 'Shree Satyanarayan Vrat Katha',
    tag: 'Pooja & Havan',
    category: 'Pooja',
    duration: '2.5 - 3 Hours',
    bestDay: 'Purnima (Full Moon) / Sankranti',
    dakshina: 3500,
    image: 'https://images.unsplash.com/photo-1609137144813-2d1091530932?auto=format&fit=crop&q=80&w=600',
    description: 'A standard auspicious worship of Lord Vishnu performed to seek harmony, prosperity, and truth in one\'s life. Ideal for new homes, career milestones, or marriage blessings.',
    vidhi: [
      'Ganesh Ambika Pooja (Invocation of Lord Ganesha and Goddess Parvati to clear obstacles)',
      'Kalash Sthapana (Installation of the copper pot filled with water and mango leaves)',
      'Navgraha Pooja (Worship of the 9 cosmic planetary deities to resolve planetary hurdles)',
      'Lord Satyanarayan Sthapana & Abhishekam (Bathing the Lord\'s image with milk, honey, yogurt, ghee, and fruit juice)',
      'Katha Recitation (Reading the 5 sacred chapters describing the fruits of the vow)',
      'Maha Aarti & Prasad Distribution (Offering the roasted flour sweet panjiri and bananas).'
    ],
    samagri: [
      { item: 'Lord Satyanarayan Photo / Idol', qty: '1 unit', checked: false },
      { item: 'Panchamrit (Milk, Curd, Ghee, Honey, Sugar)', qty: '1 bowl', checked: false },
      { item: 'Roasted Flour Prasad (Sapad / Halwa)', qty: '500g', checked: false },
      { item: 'Banana Trees / Stems (Decorative Pillars)', qty: '2 units', checked: false },
      { item: 'Mango Leaves (Aam ke Patte)', qty: '11 units', checked: false },
      { item: 'Coconuts (Nariyal)', qty: '2 units', checked: false },
      { item: 'Betel Leaves & Betel Nuts (Paan & Supari)', qty: '11 units', checked: false },
      { item: 'Sandalwood Paste & Kumkum', qty: '1 packet each', checked: false },
      { item: 'Yellow/Red Cloth (Altar sheets)', qty: '1 meter each', checked: false },
      { item: 'Aromatic Incense (Agarbatti & Dhoop)', qty: '1 packet', checked: false },
      { item: 'Pure Ghee & Camphor (Kapur)', qty: '250g & 1 packet', checked: false }
    ],
    recommendPandits: [1, 5, 3]
  },
  {
    id: 'grihapravesh',
    name: 'Griha Pravesh & Vastu Shanti Pooja',
    tag: 'New Home Blessing',
    category: 'Pooja',
    duration: '4-5 Hours',
    bestDay: 'Shubh Muhurat / Auspicious Tithi',
    dakshina: 7500,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
    description: 'Conducted before entering a new home to purify the surrounding energies, seeking blessings from Vastu Purush for happiness, health, and barrier-free living.',
    vidhi: [
      'Dwar Pooja (Entering through the main door with holy kalash and cow/calf)',
      'Vastu Purush Sthapana & Worship (Seeking permission of the layout deity)',
      'Ganesh Puja & Punyahavachanam (Purifying the walls and rooms with holy water)',
      'Navgraha Havan & Vastu Shanti Havan (Fire ritual with aromatic herbs)',
      'Boiling of Holy Milk (Symbolizing abundance and wealth entering the home)',
      'Dasa Danam (Offerings made to Pandits for charity & blessings).'
    ],
    samagri: [
      { item: 'Copper/Brass Kalash (Vessel)', qty: '1 unit', checked: false },
      { item: 'Vastu Purush Idol (Gold or Copper)', qty: '1 unit', checked: false },
      { item: 'Bricks & Sand (For temporary Havan Kund)', qty: '1 set', checked: false },
      { item: 'Havan Wood (Mango wood)', qty: '2 kg', checked: false },
      { item: 'Ghee (Clarified Butter)', qty: '1 kg', checked: false },
      { item: 'Havan Samagri Herbs Mix', qty: '500g', checked: false },
      { item: 'Yellow Mustard Seeds (Sarso)', qty: '50g', checked: false },
      { item: 'Toran of Mango leaves & Marigold', qty: '1 unit', checked: false },
      { item: 'Fresh Milk & Clay Pot (For boiling)', qty: '1 Liter & 1 Pot', checked: false },
      { item: 'Rice (Akshat)', qty: '1 kg', checked: false }
    ],
    recommendPandits: [1, 4, 5]
  },
  {
    id: 'rudrabhishek',
    name: 'Maha Rudrabhishek Pooja',
    tag: 'Planetary Peace',
    category: 'Pooja',
    duration: '3 - 4 Hours',
    bestDay: 'Pradosh / Shivratri / Monday',
    dakshina: 5500,
    image: 'https://images.unsplash.com/photo-1626306596160-c44d1872dfa6?auto=format&fit=crop&q=80&w=600',
    description: 'An powerful ablution worship of Lord Shiva chanting Namakam and Chamakam of Yajurveda. Dissolves planetary issues, heals disease, and grants inner peace.',
    vidhi: [
      'Shiva Linga Abhishek setup (Placing Shivling on dynamic brass tray)',
      'Laghu Nyasa (Purifying touch rituals invoking Rudra in our own senses)',
      'Shodashopachara Pooja (Offering 16 divine services to Lord Shiva)',
      'Chanting of Sri Rudram Namakam & Chamakam (Vedic hymns matching continuous bathing)',
      'Bathing with 11 Dravyas (Milk, Honey, Sugar, Sugar cane juice, Bhasma, Coconut water, Ghee, Gangajal, Yogurt, Sandalwood paste, Kasturi)',
      'Bilvapatra Archana (Offering Bilva leaves chanting Shiva Sahasranama).'
    ],
    samagri: [
      { item: 'Shivaling (If not present, Pandit will bring)', qty: '1 unit', checked: false },
      { item: 'Bilva Leaves (Belpatra)', qty: '108 units', checked: false },
      { item: 'Rudra Bhasma (Holy ashes)', qty: '1 packet', checked: false },
      { item: 'Gangajal (Holy Ganges water)', qty: '2 bottles', checked: false },
      { item: 'Sugarcane Juice (Ganne ka ras)', qty: '1 liter', checked: false },
      { item: 'Scented Attar (Spiritual perfume)', qty: '1 vial', checked: false },
      { item: 'Lotus Flowers & Datura Flowers', qty: '11 units each', checked: false },
      { item: 'Dry Fruits (Pancha Mewa)', qty: '250g', checked: false },
      { item: 'Havan Kund (Optional, if combined with Havan)', qty: '1 unit', checked: false }
    ],
    recommendPandits: [2, 6, 1]
  },
  {
    id: 'vivah',
    name: 'Vedic Vivah Sanskar (Marriage)',
    tag: 'Sacred Union',
    category: 'Vivah',
    duration: '5 - 6 Hours',
    bestDay: 'Vivah Shubh Muhurat',
    dakshina: 15100,
    image: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&q=80&w=600',
    description: 'The sacred sacrament of marriage binding two souls under the witness of fire, deities, and chanting Vedic vows of friendship, duty, and spiritual companionship.',
    vidhi: [
      'Vara Satkara (Welcoming the groom with holy prayers and sweets)',
      'Kanyadaan (Giving away of the bride by parents symbolizing trust)',
      'Panigrahana & Mangalsutra Bandhan (Holding hands and tying the holy thread)',
      'Laja Homa (Offering puffed rice into fire for husband\'s long life)',
      'Saptapadi (Taking the 7 sacred steps detailing dharma, food, children, and love)',
      'Sindoor Daan & Arundhati-Vasishtha Darshan (Applying vermilion and gazing at auspicious double-stars).'
    ],
    samagri: [
      { item: 'Mangalsutra & Sindoor (Vermilion)', qty: '1 set', checked: false },
      { item: 'Jaimala (Beautiful flower garlands)', qty: '2 units', checked: false },
      { item: 'Gold Rings / Ornaments', qty: '1 set', checked: false },
      { item: 'Varmala Coconut (Decorated Nariyal)', qty: '1 unit', checked: false },
      { item: 'Dry Wood & Camphor for Vivah Yagya', qty: '5 kg & 2 packets', checked: false },
      { item: 'Red Bridal Shalu/Dupatta for Gathbandhan', qty: '1 unit', checked: false },
      { item: 'Puffed Rice (Kheel / Laja)', qty: '500g', checked: false },
      { item: 'Sweets (Laddoo or Kaju Katli)', qty: '2 kg', checked: false }
    ],
    recommendPandits: [1, 4, 6]
  },
  {
    id: 'antyesti',
    name: 'Antyesti Sanskar & Shraadh (Final Rites)',
    tag: 'Last Passage Rites',
    category: 'Death',
    duration: '4 Hours',
    bestDay: 'Immediate / Pitra Paksha',
    dakshina: 8500,
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=600',
    description: 'Vedic funeral rites and departure prayers. Assists the transmigrating soul on its onward spiritual journey while granting peace to mourning family members.',
    vidhi: [
      'Panchagavya Prokshanam (Purifying the place of departure)',
      'Pinda Pradana (Offering rice balls to feed ancestors and guide the soul)',
      'Yam Sutra Chanting (Recital of sacred hymns dedicated to Lord Yama)',
      'Antyesti Dah Sanskar mantras (Mantras for cremation/burial)',
      'Kriya and Shraadh (Feeding Pandits/Brahmins on the 10th-13th day)',
      'Sapindikarana (Merging the departed soul with the ancestral line).'
    ],
    samagri: [
      { item: 'Black Sesame Seeds (Kala Til)', qty: '200g', checked: false },
      { item: 'Barley Flour (Jau ka Aata)', qty: '1 kg', checked: false },
      { item: 'White Cotton Cloth (Kafan)', qty: '5 meters', checked: false },
      { item: 'Kusha Grass (Sacred grass for rituals)', qty: '1 bundle', checked: false },
      { item: 'Gangajal & Tulsi Leaves', qty: '1 bottle & 1 bowl', checked: false },
      { item: 'Clay Pots (Matka/Kalash)', qty: '3 units', checked: false },
      { item: 'Sandwood Dust & Ghee', qty: '500g each', checked: false },
      { item: 'Cow Dung Cakes (Uple)', qty: '10 units', checked: false }
    ],
    recommendPandits: [3]
  }
];

// ==========================================
// MOCK DATA: Auspicious Muhurats
// ==========================================
const MUHURATS_DATA = [
  {
    id: 'm1',
    festival: 'Dev Uthani Gyaras',
    date: 'Nov 22, 2026',
    time: 'All Day Auspicious',
    tag: 'Best for Vivah Sanskar',
    poojaId: 'vivah'
  },
  {
    id: 'm2',
    festival: 'Dhanteras Lakshmi Havan',
    date: 'Nov 08, 2026',
    time: '05:32 PM to 07:15 PM',
    tag: 'Best for Laxmi Hawan',
    poojaId: 'satyanarayan'
  },
  {
    id: 'm3',
    festival: 'Vijaya Dashami / Dussehra',
    date: 'Oct 24, 2026',
    time: 'Abhijit Muhurat (11:42 AM)',
    tag: 'Best for Griha Pravesh',
    poojaId: 'grihapravesh'
  },
  {
    id: 'm4',
    festival: 'Maha Shivratri Abhishekam',
    date: 'Mar 08, 2026',
    time: 'Nishita Kaal Puja (Midnight)',
    tag: 'Best for Rudrabhishek',
    poojaId: 'rudrabhishek'
  }
];

// ==========================================
// MOCK DATA: Rashi Pooja Forecast
// ==========================================
const RASHI_DATA = [
  { rashi: 'Mesha (Aries)', planet: 'Mars', advice: 'Energy levels are high. Performing a fire ritual resolves pent up aggression.', poojaId: 'rudrabhishek', name: 'Maha Rudrabhishek' },
  { rashi: 'Vrishabha (Taurus)', planet: 'Venus', advice: 'Auspicious times for home expansion. Seeking family harmony is recommended.', poojaId: 'grihapravesh', name: 'Griha Pravesh & Vastu' },
  { rashi: 'Mithuna (Gemini)', planet: 'Mercury', advice: 'Excellent day for academic/legal contracts. Chanting truth vows brings clarity.', poojaId: 'satyanarayan', name: 'Shree Satyanarayan Katha' },
  { rashi: 'Karka (Cancer)', planet: 'Moon', advice: 'Emotions are sensitive today. Calm your mind by meditating with Shiva rituals.', poojaId: 'rudrabhishek', name: 'Maha Rudrabhishek' },
  { rashi: 'Simha (Leo)', planet: 'Sun', advice: 'Leadership prospects look bright. Perform Vedic chanting to align solar energies.', poojaId: 'satyanarayan', name: 'Shree Satyanarayan Katha' },
  { rashi: 'Kanya (Virgo)', planet: 'Mercury', advice: 'Excellent for accounts and structural reorganizations. Cleanse home negativity.', poojaId: 'grihapravesh', name: 'Vastu Shanti Pooja' },
  { rashi: 'Tula (Libra)', planet: 'Venus', advice: 'Focus on marital bonding and business partnerships. A perfect day for union ceremonies.', poojaId: 'vivah', name: 'Vedic Vivah Sanskar' },
  { rashi: 'Vrishchika (Scorpio)', planet: 'Mars', advice: 'Deep spiritual transformations are occurring. Overcome obstacles with Shiva chants.', poojaId: 'rudrabhishek', name: 'Maha Rudrabhishek' },
  { rashi: 'Dhanu (Sagittarius)', planet: 'Jupiter', advice: 'Expansion of spiritual wisdom. Reading sacred chapters brings mental growth.', poojaId: 'satyanarayan', name: 'Shree Satyanarayan Katha' },
  { rashi: 'Makara (Capricorn)', planet: 'Saturn', advice: 'Seek ancestral blessings to remove slow blockages in your career growth.', poojaId: 'antyesti', name: 'Shraadh Ritual' },
  { rashi: 'Kumbha (Aquarius)', planet: 'Saturn', advice: 'Great day for community service. Seek peace for ancestral lineage.', poojaId: 'antyesti', name: 'Pitra Dosh Pooja' },
  { rashi: 'Meena (Pisces)', planet: 'Jupiter', advice: 'Seeking internal harmony and peace. Conducting Satyanarayan Katha will bring joy.', poojaId: 'satyanarayan', name: 'Satyanarayan Vrat Katha' }
];

// ==========================================
// AUDIOSYNTHESIZER: Ringing Bell & Chant
// ==========================================
class SoundSynth {
  constructor() {
    this.audioCtx = null;
    this.chantOscs = [];
    this.chantGain = null;
  }

  init() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playBell() {
    this.init();
    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    const frequencies = [440, 523.25, 659.25, 880, 1046.50, 1200];
    const gains = [0.8, 0.4, 0.3, 0.5, 0.25, 0.1];
    const decays = [2.2, 1.6, 1.2, 0.8, 0.5, 0.3];

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(1, now + 0.005);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
    masterGain.connect(ctx.destination);

    const bpf = ctx.createBiquadFilter();
    bpf.type = 'bandpass';
    bpf.frequency.setValueAtTime(600, now);
    bpf.Q.setValueAtTime(1.5, now);
    bpf.connect(masterGain);

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      
      oscGain.gain.setValueAtTime(gains[idx], now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + decays[idx]);

      osc.connect(oscGain);
      oscGain.connect(bpf);

      osc.start(now);
      osc.stop(now + decays[idx] + 0.1);
    });
  }

  startChant() {
    this.init();
    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    if (this.chantOscs.length > 0) return;

    this.chantGain = ctx.createGain();
    this.chantGain.gain.setValueAtTime(0, now);
    this.chantGain.gain.linearRampToValueAtTime(0.2, now + 1.0);
    this.chantGain.connect(ctx.destination);

    const baseFreq = 110;
    const harmonics = [1, 2, 3, 4, 5];
    const amplitudes = [0.8, 0.5, 0.25, 0.15, 0.05];

    harmonics.forEach((harmonic, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = (idx === 0 || idx === 1) ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(baseFreq * harmonic, now);
      
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(4 + idx, now);
      lfoGain.gain.setValueAtTime(4, now);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.detune);
      lfo.start(now);

      oscGain.gain.setValueAtTime(amplitudes[idx] * 0.2, now);
      
      const lpf = ctx.createBiquadFilter();
      lpf.type = 'lowpass';
      lpf.frequency.setValueAtTime(250, now);
      lpf.frequency.exponentialRampToValueAtTime(500, now + 1.5);
      lpf.frequency.exponentialRampToValueAtTime(150, now + 3.0);
      lpf.Q.setValueAtTime(2.5, now);

      osc.connect(lpf);
      lpf.connect(oscGain);
      oscGain.connect(this.chantGain);

      osc.start(now);
      this.chantOscs.push({ osc, lfo });
    });
  }

  stopChant() {
    if (this.chantOscs.length === 0) return;
    
    const ctx = this.audioCtx;
    const now = ctx.currentTime;
    
    this.chantGain.gain.setValueAtTime(this.chantGain.gain.value, now);
    this.chantGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    setTimeout(() => {
      this.chantOscs.forEach(o => {
        try { o.osc.stop(); } catch(e){}
        try { o.lfo.stop(); } catch(e){}
      });
      this.chantOscs = [];
      this.chantGain = null;
    }, 900);
  }

  playRingtone() {
    this.init();
    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const ringGain = ctx.createGain();

    osc1.frequency.setValueAtTime(400, now);
    osc2.frequency.setValueAtTime(450, now);

    ringGain.gain.setValueAtTime(0, now);
    ringGain.gain.linearRampToValueAtTime(0.15, now + 0.1);
    ringGain.gain.setValueAtTime(0.15, now + 1.5);
    ringGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc1.connect(ringGain);
    osc2.connect(ringGain);
    ringGain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    
    osc1.stop(now + 2.0);
    osc2.stop(now + 2.0);
  }

  playDisconnect() {
    this.init();
    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const toneGain = ctx.createGain();

    osc.frequency.setValueAtTime(350, now);
    toneGain.gain.setValueAtTime(0.1, now);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc.connect(toneGain);
    toneGain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  }
}

const synth = new SoundSynth();

// ==========================================
// VEDIC AI GUIDE COMPONENT (Gemini API)
// ==========================================
const AIGuideWidget = ({ apiKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Namaste! 🙏 I am your Vedic AI Guide. How can I assist you with pujas, rituals, or finding the right Pandit today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
      
      const apiHistory = messages.map(m => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));
      apiHistory.push({ role: 'user', parts: [{ text: userMsg.text }] });

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: "You are a knowledgeable Vedic AI Guide for the VedaBook platform. You assist users with booking pandits, understanding Hindu rituals (Pooja, Havan, Sanskar), astrology, and spiritual queries. Keep your answers concise, respectful, and steeped in traditional Hindu values. Recommend booking a Pandit on VedaBook if they need a ritual performed." }]},
          contents: apiHistory
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates.length > 0) {
        const reply = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { role: 'model', text: reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: 'Apologies, my mind is currently meditating. Please try asking again later.' }]);
      }
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Network connection lost with the cosmic realm. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button className="ai-guide-fab" onClick={() => setIsOpen(!isOpen)} title="Vedic AI Guide">
        <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-robot'}`}></i>
      </button>

      {isOpen && (
        <div className="ai-guide-window shadow-lg border border-warning">
          <div className="ai-header bg-saffron text-white p-3 d-flex justify-content-between align-items-center">
            <h6 className="m-0 font-marcellus"><i className="bi bi-stars me-2 text-warning"></i>Vedic AI Guide</h6>
            <button className="btn-close btn-close-white" style={{fontSize: '0.8rem'}} onClick={() => setIsOpen(false)}></button>
          </div>
          
          <div className="ai-messages p-3" style={{ height: '350px', overflowY: 'auto', backgroundColor: '#FFFDF6' }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-3 d-flex ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                <div 
                  className={`p-2 rounded-3 ${msg.role === 'user' ? 'bg-orange text-white' : 'bg-light border border-warning text-dark'}`}
                  style={{ maxWidth: '80%', fontSize: '0.85rem', lineHeight: '1.4' }}
                >
                  {msg.role === 'model' && <i className="bi bi-robot me-1 text-orange"></i>}
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="d-flex justify-content-start mb-3">
                <div className="p-2 rounded-3 bg-light border border-warning text-muted" style={{ fontSize: '0.8rem' }}>
                  <span className="spinner-grow spinner-grow-sm text-warning me-1" role="status"></span>
                  Meditating...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-input border-top p-2 bg-white d-flex gap-2">
            <input 
              type="text" 
              className="form-control form-control-sm" 
              placeholder="Ask about pujas, rituals..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="btn btn-sm btn-saffron" onClick={handleSend} disabled={isTyping || !input.trim()}>
              <i className="bi bi-send-fill"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// ==========================================
// AI ASTROLOGER & KUNDALI MATCHER
// ==========================================
const AIAstrologer = ({ apiKey }) => {
  const [partner1, setPartner1] = useState({ name: '', dob: '', time: '', place: '' });
  const [partner2, setPartner2] = useState({ name: '', dob: '', time: '', place: '' });
  const [mode, setMode] = useState('match'); // 'match' or 'single'
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerateReport = async () => {
    if (!partner1.name || !partner1.dob || !partner1.time || !partner1.place) {
      setError("Please fill all details for Partner 1.");
      return;
    }
    if (mode === 'match' && (!partner2.name || !partner2.dob || !partner2.time || !partner2.place)) {
      setError("Please fill all details for Partner 2 for Kundali matching.");
      return;
    }

    setLoading(true);
    setError(null);
    setReport(null);

    const promptText = mode === 'match' 
      ? `Act as an expert, highly respected Indian Vedic Astrologer. Analyze the Kundali compatibility (Ashtakoot Gunas) for marriage between Partner 1 (${partner1.name}, Born: ${partner1.dob} at ${partner1.time} in ${partner1.place}) and Partner 2 (${partner2.name}, Born: ${partner2.dob} at ${partner2.time} in ${partner2.place}). Provide a detailed report including Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi. Calculate a score out of 36. Highlight any doshas (like Nadi or Bhakoot dosha) and suggest remedies or Poojas. Format nicely using markdown headings (##) and bold text (**text**).`
      : `Act as an expert, highly respected Indian Vedic Astrologer. Generate a detailed birth chart reading and Rashi analysis for ${partner1.name}, Born: ${partner1.dob} at ${partner1.time} in ${partner1.place}. Include their Sun sign, Moon sign (Rashi), ascendant (Lagna), and major life predictions for the coming year. Suggest auspicious Poojas or mantras for their well-being. Format nicely using markdown headings (##) and bold text (**text**).`;

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: promptText }] }]
        })
      });

      const data = await response.json();
      console.log("Gemini API Response:", data);
      
      if (data.candidates && data.candidates.length > 0) {
        if (data.candidates[0].content) {
          setReport(data.candidates[0].content.parts[0].text);
        } else {
          setError(`Reading blocked by safety filters. Reason: ${data.candidates[0].finishReason}`);
        }
      } else if (data.error) {
        setError(`API Error: ${data.error.message}`);
      } else {
        setError('The cosmic connection was interrupted. Please try again later.');
      }
    } catch (err) {
      console.error(err);
      setError('Network connection failed. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const formatReport = (text) => {
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/## (.*?)\n/g, '<h5 class="text-crimson font-marcellus mt-4 border-bottom border-warning pb-1">$1</h5>\n');
    formatted = formatted.replace(/\* (.*?)\n/g, '<li>$1</li>');
    return { __html: formatted };
  };

  return (
    <div className="animate-fade">
      <div className="text-center mb-4">
        <h2 className="traditional-title"><i className="bi bi-moon-stars-fill me-3 text-warning"></i>Vedic AI Astrologer</h2>
        <p className="text-muted">Enter birth details for accurate Kundali Matching or personalized Rashi readings powered by divine AI.</p>
        <div className="traditional-divider"><i className="bi bi-infinity divider-icon"></i></div>
      </div>

      <div className="row g-4 justify-content-center">
        {/* Form Column */}
        <div className="col-lg-5">
          <div className="card vedic-card p-4 h-100">
            <div className="d-flex justify-content-center gap-3 mb-4">
              <button className={`btn rounded-pill px-3 py-2 fw-bold ${mode === 'match' ? 'btn-saffron' : 'btn-outline-secondary'}`} onClick={() => setMode('match')}>
                Kundali Milan (2 People)
              </button>
              <button className={`btn rounded-pill px-3 py-2 fw-bold ${mode === 'single' ? 'btn-saffron' : 'btn-outline-secondary'}`} onClick={() => setMode('single')}>
                Apni Kundali/Rashi (1 Person)
              </button>
            </div>

            <h5 className="font-marcellus text-crimson mb-3 border-bottom pb-2">
              <i className="bi bi-person-fill me-2 text-warning"></i>{mode === 'match' ? 'Partner 1 Details' : 'Your Details'}
            </h5>
            <div className="row g-3 mb-4">
              <div className="col-12"><input type="text" className="form-control" placeholder="Full Name" value={partner1.name} onChange={e => setPartner1({...partner1, name: e.target.value})} /></div>
              <div className="col-4"><label className="small text-muted mb-1">DOB</label><input type="date" className="form-control" value={partner1.dob} onChange={e => setPartner1({...partner1, dob: e.target.value})} /></div>
              <div className="col-4"><label className="small text-muted mb-1">Time</label><input type="time" className="form-control" value={partner1.time} onChange={e => setPartner1({...partner1, time: e.target.value})} /></div>
              <div className="col-4"><label className="small text-muted mb-1">City</label><input type="text" className="form-control" placeholder="City" value={partner1.place} onChange={e => setPartner1({...partner1, place: e.target.value})} /></div>
            </div>

            {mode === 'match' && (
              <>
                <h5 className="font-marcellus text-crimson mb-3 border-bottom pb-2 mt-4">
                  <i className="bi bi-person-heart me-2 text-warning"></i>Partner 2 Details
                </h5>
                <div className="row g-3 mb-4">
                  <div className="col-12"><input type="text" className="form-control" placeholder="Full Name" value={partner2.name} onChange={e => setPartner2({...partner2, name: e.target.value})} /></div>
                  <div className="col-4"><label className="small text-muted mb-1">DOB</label><input type="date" className="form-control" value={partner2.dob} onChange={e => setPartner2({...partner2, dob: e.target.value})} /></div>
                  <div className="col-4"><label className="small text-muted mb-1">Time</label><input type="time" className="form-control" value={partner2.time} onChange={e => setPartner2({...partner2, time: e.target.value})} /></div>
                  <div className="col-4"><label className="small text-muted mb-1">City</label><input type="text" className="form-control" placeholder="City" value={partner2.place} onChange={e => setPartner2({...partner2, place: e.target.value})} /></div>
                </div>
              </>
            )}

            {error && <div className="alert alert-danger small py-2">{error}</div>}

            <button className="btn btn-gold w-100 py-3 fw-bold fs-5 mt-auto" onClick={handleGenerateReport} disabled={loading}>
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-2"></span> Consulting Stars...</>
              ) : (
                <><i className="bi bi-stars me-2"></i>{mode === 'match' ? 'Match Kundali' : 'Read Rashi'}</>
              )}
            </button>
          </div>
        </div>

        {/* Report Column */}
        <div className="col-lg-7">
          <div className="card vedic-card h-100 p-0 overflow-hidden bg-light" style={{ minHeight: '500px' }}>
            {loading ? (
              <div className="d-flex flex-column align-items-center justify-content-center h-100 p-5 text-center">
                <div className="mandala-loader"><i className="bi bi-sun-fill"></i></div>
                <h4 className="font-marcellus text-crimson mt-4">Analyzing Planetary Positions...</h4>
                <p className="text-muted">The AI Astrologer is calculating precise cosmic alignments based on the birth charts.</p>
              </div>
            ) : report ? (
              <div className="p-4 h-100 d-flex flex-column" style={{ overflowY: 'auto' }}>
                <div className="d-flex justify-content-between align-items-center border-bottom border-warning pb-3 mb-4">
                  <h4 className="font-marcellus text-crimson m-0"><i className="bi bi-journal-check me-2"></i>Sacred Vedic Reading</h4>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => window.print()}><i className="bi bi-printer"></i> Print</button>
                </div>
                <div 
                  className="report-content flex-grow-1" 
                  style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7', fontSize: '0.95rem', color: '#3E2723' }}
                  dangerouslySetInnerHTML={formatReport(report)}
                ></div>
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center h-100 p-5 text-center opacity-50">
                <i className="bi bi-compass fs-1 text-warning mb-3" style={{ fontSize: '4rem' }}></i>
                <h5 className="font-marcellus">Awaiting Birth Details</h5>
                <p className="small">Fill out the form and generate the report to see the cosmic insights here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  // Navigation & General state
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bellRinging, setBellRinging] = useState(false);
  const [chantActive, setChantActive] = useState(false);
  const [theme, setTheme] = useState('light');

  // Responsive Sidebar filters drawer for mobile
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter refinement sidebar states
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterExperience, setFilterExperience] = useState('All');
  const [filterLanguage, setFilterLanguage] = useState([]);
  const [filterExpertise, setFilterExpertise] = useState('All');

  // Kundli / Zodiac interactive widget state
  const [selectedRashi, setSelectedRashi] = useState(RASHI_DATA[0]);

  // Shubh Muhurat countdown timer states
  const [countdownTime, setCountdownTime] = useState({ hours: 2, minutes: 14, seconds: 45 });

  // Samagri state
  const [poojas, setPoojas] = useState(POOJAS_DATA);
  const [selectedPooja, setSelectedPooja] = useState(null);

  // Calling simulator state
  const [currentCall, setCurrentCall] = useState(null);
  const [callStatus, setCallStatus] = useState('dialing');
  const [callMuted, setCallMuted] = useState(false);
  const [callSpeaker, setCallSpeaker] = useState(false);

  // Booking modal state
  const [bookingPandit, setBookingPandit] = useState(null);
  const [bookingFormData, setBookingFormData] = useState({
    poojaType: 'Satyanarayan Vrat Katha',
    date: '2026-05-25',
    time: '09:00',
    venue: '',
    phone: '',
    gotra: '',
    nakshatra: '',
    customInstructions: '',
    includeSamagriKit: true
  });
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Group booking states
  const [multiPanditCount, setMultiPanditCount] = useState(21);
  const [multiPanditGrade, setMultiPanditGrade] = useState('Standard'); 
  const [multiPanditSamagri, setMultiPanditSamagri] = useState(true);
  const [multiPanditLiveStream, setMultiPanditLiveStream] = useState(false);
  const [multiPanditForm, setMultiPanditForm] = useState({
    ritualType: 'Bhandara / Brahmin Bhoj',
    date: '2026-06-01',
    time: '11:30',
    venue: '',
    phone: '',
    contactName: ''
  });

  // Confirmed bookings list
  const [myBookings, setMyBookings] = useState([
    {
      id: 'B-1082',
      panditName: 'Acharya Radhe Shyam Shastri',
      poojaName: 'Satyanarayan Vrat Katha',
      date: '2026-05-22',
      time: '08:30 AM',
      venue: 'H.No 12, Sector-4, Noida',
      dakshina: 5100,
      status: 'Confirmed',
      includeSamagri: true,
      panditPhone: '+91 98765 43210'
    }
  ]);

  // Audio ringtone timers
  const ringtoneTimer = useRef(null);
  const callDurationTimer = useRef(null);
  const [callTimerVal, setCallTimerVal] = useState(0);

  // Real-time ticking countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownTime(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset countdown back to 4 hours to keep simulator active
          return { hours: 3, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle bell chime
  const handleBellChime = () => {
    setBellRinging(true);
    synth.playBell();
    setTimeout(() => setBellRinging(false), 900);
  };

  // Toggle spiritual chanting
  const handleChantToggle = () => {
    if (chantActive) {
      synth.stopChant();
      setChantActive(false);
    } else {
      synth.startChant();
      setChantActive(true);
    }
  };

  // Simulate calling Pandit
  const initiateCall = (pandit) => {
    synth.init();
    setCurrentCall(pandit);
    setCallStatus('dialing');
    setCallTimerVal(0);
    
    synth.playRingtone();
    let ringCount = 1;
    
    ringtoneTimer.current = setInterval(() => {
      if (ringCount >= 2) {
        clearInterval(ringtoneTimer.current);
        setCallStatus('connected');
        callDurationTimer.current = setInterval(() => {
          setCallTimerVal(prev => prev + 1);
        }, 1000);
      } else {
        synth.playRingtone();
        ringCount++;
      }
    }, 2200);
  };

  const endCall = () => {
    if (ringtoneTimer.current) clearInterval(ringtoneTimer.current);
    if (callDurationTimer.current) clearInterval(callDurationTimer.current);
    synth.playDisconnect();
    setCallStatus('ended');
    setTimeout(() => {
      setCurrentCall(null);
    }, 1200);
  };

  const formatTimerDigits = (num) => String(num).padStart(2, '0');

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Toggle items in Samagri checklist
  const toggleSamagriCheck = (poojaId, itemIndex) => {
    setPoojas(prev => prev.map(p => {
      if (p.id === poojaId) {
        const updatedSamagri = [...p.samagri];
        updatedSamagri[itemIndex] = {
          ...updatedSamagri[itemIndex],
          checked: !updatedSamagri[itemIndex].checked
        };
        const updatedPooja = { ...p, samagri: updatedSamagri };
        if (selectedPooja && selectedPooja.id === poojaId) {
          setSelectedPooja(updatedPooja);
        }
        return updatedPooja;
      }
      return p;
    }));
  };

  // Select all or deselect all samagri
  const setAllSamagriState = (poojaId, state) => {
    setPoojas(prev => prev.map(p => {
      if (p.id === poojaId) {
        const updatedSamagri = p.samagri.map(s => ({ ...s, checked: state }));
        const updatedPooja = { ...p, samagri: updatedSamagri };
        if (selectedPooja && selectedPooja.id === poojaId) {
          setSelectedPooja(updatedPooja);
        }
        return updatedPooja;
      }
      return p;
    }));
  };

  // Calculate pricing for Multi-Pandit booking
  const calculateMultiPanditTotal = () => {
    let pricePerPandit = multiPanditGrade === 'Acharya' ? 1500 : 800;
    let base = multiPanditCount * pricePerPandit;
    if (multiPanditSamagri) base += 2500;
    if (multiPanditLiveStream) base += 3500;
    return base;
  };

  // Open booking modal
  const handleOpenBooking = (pandit, poojaName = '') => {
    setBookingPandit(pandit);
    setBookingFormData(prev => ({
      ...prev,
      poojaType: poojaName || pandit.specialties[0] || 'Satyanarayan Vrat Katha'
    }));
  };

  // Book now submit
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingFormData.venue || !bookingFormData.phone) {
      alert('Please fill out venue and contact phone number.');
      return;
    }

    const newBookingId = 'B-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      id: newBookingId,
      panditName: bookingPandit.name,
      poojaName: bookingFormData.poojaType,
      date: bookingFormData.date,
      time: bookingFormData.time,
      venue: bookingFormData.venue,
      dakshina: bookingPandit.dakshina + (bookingFormData.includeSamagriKit ? 1200 : 0),
      status: 'Confirmed',
      includeSamagri: bookingFormData.includeSamagriKit,
      panditPhone: bookingPandit.phone,
      gotra: bookingFormData.gotra,
      nakshatra: bookingFormData.nakshatra
    };

    setBookingPandit(null);
    setConfirmedBooking(newBooking);
    setMyBookings(prev => [newBooking, ...prev]);

    setTimeout(() => {
      setConfirmedBooking(null);
      setActiveTab('bookings');
    }, 3000);
  };

  // Handle Multi Pandit Booking Submit
  const handleMultiPanditSubmit = (e) => {
    e.preventDefault();
    if (!multiPanditForm.venue || !multiPanditForm.phone || !multiPanditForm.contactName) {
      alert('Please fill out Name, Venue and Contact Phone number.');
      return;
    }

    const totalEstimate = calculateMultiPanditTotal();
    const newBookingId = 'B-GRP-' + Math.floor(100 + Math.random() * 900);
    const newBooking = {
      id: newBookingId,
      panditName: `${multiPanditCount} ${multiPanditGrade} Pandits`,
      poojaName: `${multiPanditForm.ritualType} (Sacred Collective)`,
      date: multiPanditForm.date,
      time: multiPanditForm.time,
      venue: multiPanditForm.venue,
      dakshina: totalEstimate,
      status: 'Confirmed (Group Booking)',
      includeSamagri: multiPanditSamagri,
      panditPhone: 'Coordinator: +91 99999 88888'
    };

    setConfirmedBooking(newBooking);
    setMyBookings(prev => [newBooking, ...prev]);

    setTimeout(() => {
      setConfirmedBooking(null);
      setActiveTab('bookings');
    }, 3000);
  };

  const printChecklist = (poojaName, samagriItems) => {
    const printWindow = window.open('', '_blank');
    const checkedItems = samagriItems.map(s => 
      `<li>[${s.checked ? '✓' : ' '}] ${s.item} (${s.qty})</li>`
    ).join('');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>${poojaName} Samagri Checklist</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 30px; line-height: 1.6; }
            h2 { color: #8D0000; border-bottom: 2px solid #FFB300; padding-bottom: 10px; }
            ul { list-style-type: none; padding-left: 0; }
            li { padding: 10px; border-bottom: 1px solid #eee; font-size: 1.1rem; }
          </style>
        </head>
        <body>
          <h2>${poojaName} - Sacred Samagri Checklist</h2>
          <p>Bring these items or check them off as you collect them for your auspicious ritual:</p>
          <ul>${checkedItems}</ul>
          <p style="margin-top: 40px; font-size: 0.9rem; color: #777; text-align: center;">Generated from VedaBook - Online Pandit Booking</p>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Toggle Language Checkbox Filter
  const handleLanguageFilterToggle = (lang) => {
    setFilterLanguage(prev => 
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  // Filter Pandits based on sidebar refinement inputs
  const filteredPandits = PANDITS_DATA.filter(p => {
    const matchesSearch = searchQuery === '' || 
                          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const categoryMap = {
      'Pooja': ['Satyanarayan Pooja', 'Griha Pravesh', 'Rudrabhishek Pooja', 'Laxmi Kuber Havan'],
      'Vivah': ['Vivah Sanskar'],
      'Death': ['Antyesti Sanskar', 'Pitra Dosh Pooja'],
      'Mundan': ['Mundan Sanskar'],
      'Janeu': ['Janeu / Upanayan']
    };
    const matchesCategory = selectedCategory === 'All' || 
                            p.specialties.some(spec => (categoryMap[selectedCategory] || []).includes(spec));

    const matchesLocation = filterLocation === 'All' || p.city === filterLocation;

    let matchesExperience = true;
    if (filterExperience === '20+') matchesExperience = p.experience >= 20;
    else if (filterExperience === '10-20') matchesExperience = p.experience >= 10 && p.experience < 20;
    else if (filterExperience === 'under10') matchesExperience = p.experience < 10;

    const matchesLanguage = filterLanguage.length === 0 || 
                            filterLanguage.every(lang => p.languages.includes(lang));

    const matchesExpertise = filterExpertise === 'All' || p.expertise === filterExpertise;

    return matchesSearch && matchesCategory && matchesLocation && matchesExperience && matchesLanguage && matchesExpertise;
  });

  return (
    <div className={`app-wrapper ${theme === 'dark' ? 'dark-theme' : ''}`}>
      {/* Auspicious Daily Mantra Ticker */}
      <div className="auspicious-ticker">
        <div className="ticker-wrap">
          <div className="ticker-item">ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ</div>
          <div className="ticker-item">★ Shubh Muhurat Today: Dev-Devi Pooja (08:32 AM to 10:45 AM)</div>
          <div className="ticker-item">★ Ekadashi Tithi Chanting Blessings</div>
          <div className="ticker-item">ॐ नमः शिवाय ★ मंगलम भगवान विष्णु मंगलम गरुड़ध्वजः मंगलम पुण्डरीकाक्ष मंगलाय तनो हरिः</div>
          <div className="ticker-item">★ Shubh Shadi dates active booking now available for Ashadha Month</div>
        </div>
      </div>

      {/* Header / Navbar */}
      <nav className="navbar navbar-expand-lg navbar-custom sticky-top py-2">
        <div className="container-fluid px-4 px-xl-5">
          <a className="navbar-brand d-flex align-items-center" href="#" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>
            <span className="diya-container me-2">
              <span className="diya-flame"></span>
              <i className="bi bi-shield-shaded text-orange fs-4" style={{color: 'var(--saffron-primary)'}}></i>
            </span>
            <span className="brand-logo">VedaBook</span>
          </a>
          
          <div className="d-flex align-items-center gap-2 ms-auto ms-lg-0 me-3">
            <button 
              className="btn btn-sm btn-outline-warning rounded-circle d-flex align-items-center justify-content-center" 
              style={{width: '35px', height: '35px'}}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              title="Toggle Night Theme"
            >
              <i className={`bi ${theme === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill'}`}></i>
            </button>
            <div className="bell-box">
              <i 
                className={`bi bi-bell-fill temple-bell ${bellRinging ? 'ringing' : ''}`} 
                onClick={handleBellChime}
                title="Ring Temple Bell for Auspicious Start"
              ></i>
              <button 
                className={`btn btn-sm ${chantActive ? 'btn-crimson' : 'btn-outline-warning text-dark'}`}
                style={{ borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}
                onClick={handleChantToggle}
              >
                <i className={`bi ${chantActive ? 'bi-volume-up-fill' : 'bi-volume-mute-fill'} me-1`}></i>
                {chantActive ? 'Chanting OM...' : 'Play OM Chant'}
              </button>
            </div>
          </div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className={`nav-link nav-link-custom ${activeTab === 'home' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link nav-link-custom ${activeTab === 'pandits' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); setActiveTab('pandits'); }}>
                  Find Pandit
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link nav-link-custom ${activeTab === 'poojas' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); setActiveTab('poojas'); }}>
                  Ritual Guide & Vidhi
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link nav-link-custom ${activeTab === 'multipandit' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); setActiveTab('multipandit'); }}>
                  Group Booking
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link nav-link-custom fw-bold ${activeTab === 'kundali' ? 'active text-orange' : 'text-orange'}`} href="#" onClick={(e) => { e.preventDefault(); setActiveTab('kundali'); }}>
                  <i className="bi bi-stars me-1 text-warning"></i>AI Kundali Match
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link nav-link-custom ${activeTab === 'bookings' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); setActiveTab('bookings'); }} style={{position: 'relative'}}>
                  My Bookings
                  {myBookings.length > 0 && (
                    <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.65rem'}}>
                      {myBookings.length}
                    </span>
                  )}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hanging Garland & Toran Under Header */}
      <div className="marigold-garland-hanging"></div>
      <div className="marigold-leaves"></div>

      {/* Main Container */}
      <div className="container-fluid px-4 px-xl-5 py-4">

        {/* ---------------------------------------------------- */}
        {/* VIEW: HOME VIEW */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'home' && (
          <div className="animate-fade">
            {/* Hero Banner (Split Columns Layout) */}
            <div className="card hero-card">
              <div className="row align-items-center hero-content">
                <div className="col-lg-7 text-start mb-4 mb-lg-0">
                  <span className="badge bg-warning text-dark mb-2 fw-bold text-uppercase px-3 py-1">Vedic Traditions Sustained</span>
                  <h1 className="hero-title mb-3">Bring Home the Divine Blessings</h1>
                  <p className="fs-5 mb-4" style={{ color: '#E0E0E0', textShadow: '1px 1px 3px rgba(0,0,0,0.5)', lineHeight: '1.5' }}>
                    Book certified, Gurukul-trained Pandits and Acharyas. Access complete step-by-step puja guides, custom samagri requirements, and secure Vedic rituals performed directly at your venue.
                  </p>
                  
                  {/* Countdown Timer Widget (Interactive Countdown) */}
                  <div className="d-inline-flex align-items-center bg-black bg-opacity-40 p-2 px-3 rounded-pill border border-warning border-opacity-50 mb-4">
                    <span className="muhurat-pulse"></span>
                    <small className="text-warning-emphasis me-2 fw-bold" style={{ fontSize: '0.8rem' }}>Next Shubh Muhurat starts in:</small>
                    <span className="font-marcellus text-white fw-bold" style={{ letterSpacing: '1px', fontSize: '0.9rem' }}>
                      {formatTimerDigits(countdownTime.hours)}h : {formatTimerDigits(countdownTime.minutes)}m : {formatTimerDigits(countdownTime.seconds)}s
                    </span>
                  </div>

                  <div className="d-flex flex-wrap gap-3">
                    <button className="btn btn-gold btn-lg px-4" onClick={() => setActiveTab('poojas')}>
                      <i className="bi bi-calendar2-heart me-2"></i>BOOK A SEVA
                    </button>
                    <button className="btn btn-outline-light btn-lg px-4" onClick={() => initiateCall(PANDITS_DATA[0])}>
                      <i className="bi bi-chat-text me-2"></i>CONSULT PANDIT
                    </button>
                  </div>
                </div>
                
                {/* Right Hero Image */}
                <div className="col-lg-5 text-center">
                  <div className="position-relative d-inline-block rounded-4 overflow-hidden shadow-lg border border-3 border-warning" style={{ maxWidth: '85%' }}>
                    <img 
                      src={ganeshaHero}
                      alt="Sacred Ganesha Deity" 
                      className="img-fluid d-block" 
                    />
                    <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-70 py-2 text-white small font-marcellus">
                      Sri Maha Ganapati invocation for Auspicious Beginnings
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Auspicious Muhurats Section */}
            <div className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="m-0 traditional-title">Auspicious Upcoming Muhurats</h3>
                <span className="text-muted small d-none d-sm-inline"><i className="bi bi-info-circle me-1"></i>Auspicious timings based on Vedic Panchang</span>
              </div>
              <div className="d-flex gap-3 overflow-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
                {MUHURATS_DATA.map((muh) => (
                  <div 
                    key={muh.id} 
                    className="card flex-shrink-0 p-3 shadow-sm border border-warning" 
                    style={{ width: '280px', borderRadius: '15px', backgroundColor: '#FFFDF0', cursor: 'pointer' }}
                    onClick={() => {
                      const match = poojas.find(p => p.id === muh.poojaId);
                      if (match) {
                        setSelectedPooja(match);
                        setActiveTab('poojas');
                      }
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="badge bg-danger text-uppercase" style={{ fontSize: '0.65rem' }}>{muh.tag}</span>
                      <i className="bi bi-calendar-event text-orange"></i>
                    </div>
                    <h5 className="font-marcellus text-crimson mb-1 fs-6 fw-bold">{muh.festival}</h5>
                    <p className="m-0 text-dark fw-bold small"><i className="bi bi-calendar2-check me-1"></i>{muh.date}</p>
                    <p className="m-0 text-muted small"><i className="bi bi-clock me-1"></i>{muh.time}</p>
                    <button className="btn btn-sm btn-outline-danger mt-3 w-100" style={{ fontSize: '0.75rem' }}>
                      Book Muhurat Seva
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Kundli / Rashi Puja Recommendation Widget */}
            <div className="card interactive-widget-card p-4 mb-5">
              <div className="row align-items-center">
                <div className="col-lg-6 mb-3 mb-lg-0">
                  <h4 className="font-marcellus text-crimson mb-1">
                    <i className="bi bi-stars text-warning me-2"></i>Daily Rashi Puja Recommender
                  </h4>
                  <p className="small text-muted mb-3">
                    Select your Zodiac/Rashi sign below to get a customized astrological forecast check, along with the most suitable protective ritual recommended by our Vedic Acharyas.
                  </p>
                  
                  {/* Select Dropdown */}
                  <div className="d-flex gap-2 align-items-center">
                    <label className="small fw-bold text-nowrap m-0 text-dark">Select Rashi:</label>
                    <select 
                      className="form-select form-select-sm border-warning" 
                      style={{ maxWidth: '220px', borderRadius: '50px' }}
                      value={selectedRashi.rashi}
                      onChange={(e) => {
                        const match = RASHI_DATA.find(r => r.rashi === e.target.value);
                        if (match) setSelectedRashi(match);
                      }}
                    >
                      {RASHI_DATA.map(r => (
                        <option key={r.rashi} value={r.rashi}>{r.rashi}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="p-3 rounded-4 bg-warning bg-opacity-10 border border-warning" style={{ backgroundColor: '#FFFDF6' }}>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="badge bg-crimson font-marcellus text-uppercase" style={{ fontSize: '0.7rem' }}>Zodiac: {selectedRashi.rashi}</span>
                      <small className="text-muted">Ruling Planet: <strong>{selectedRashi.planet}</strong></small>
                    </div>
                    <p className="small text-dark mb-3" style={{ fontStyle: 'italic', lineHeight: '1.4' }}>
                      "{selectedRashi.advice}"
                    </p>
                    <div className="d-flex justify-content-between align-items-center pt-2 border-top border-warning-subtle">
                      <div>
                        <small className="text-muted d-block" style={{ fontSize: '0.65rem' }}>RECOMMENDED PUJA</small>
                        <strong className="small font-marcellus text-crimson">{selectedRashi.name}</strong>
                      </div>
                      <button 
                        className="btn btn-sm btn-saffron px-3" 
                        style={{ fontSize: '0.75rem' }}
                        onClick={() => {
                          const match = poojas.find(p => p.id === selectedRashi.poojaId);
                          if (match) {
                            setSelectedPooja(match);
                            setActiveTab('poojas');
                          } else {
                            setActiveTab('poojas');
                          }
                        }}
                      >
                        View Ritual Steps
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sacred Ritual Packages Categories */}
            <div className="mb-5">
              <h3 className="text-center traditional-title">Sacred Ritual Packages</h3>
              <div className="traditional-divider">
                <i className="bi bi-flower1 divider-icon"></i>
              </div>
              
              <div className="row g-3">
                {[
                  { title: 'Pooja & Hawan', subtitle: 'General worship rituals for home/office peace', tag: 'Pooja', icon: 'bi-brightness-high', img: 'https://images.unsplash.com/photo-1609137144813-2d1091530932?auto=format&fit=crop&q=80&w=400' },
                  { title: 'Vivah Sanskar', subtitle: 'Full Vedic marriage sacraments & pre-wedding steps', tag: 'Vivah', icon: 'bi-heart-fill', img: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&q=80&w=400' },
                  { title: 'Sanskar Rites', subtitle: 'Mundan, Upanayan, and family sacraments', tag: 'Mundan', icon: 'bi-award', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400' },
                  { title: 'Antim Sanskar', subtitle: 'Final passage rites, Pitra Shraddha rituals', tag: 'Death', icon: 'bi-cloud-sun-fill', img: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=400' }
                ].map((item, idx) => (
                  <div className="col-md-3 col-sm-6" key={idx}>
                    <div 
                      className="card h-100 border border-warning shadow-sm position-relative overflow-hidden text-white cursor-pointer"
                      style={{ borderRadius: '15px', height: '180px' }}
                      onClick={() => {
                        setSelectedCategory(item.tag);
                        setActiveTab('pandits');
                      }}
                    >
                      <div className="position-absolute w-100 h-100 bg-dark bg-opacity-65" style={{ zIndex: 1 }}></div>
                      <img src={item.img} alt={item.title} className="w-100 h-100 object-fit-cover position-absolute" />
                      <div className="card-body position-relative d-flex flex-column justify-content-end h-100" style={{ zIndex: 2 }}>
                        <i className={`bi ${item.icon} text-warning fs-3 mb-2`}></i>
                        <h5 className="font-marcellus fw-bold m-0">{item.title}</h5>
                        <p className="small m-0 text-light opacity-85" style={{ fontSize: '0.75rem' }}>{item.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Multi-Pandit Promotion Banner */}
            <div className="row mb-5">
              <div className="col-12">
                <div className="p-4 rounded-4 shadow-sm border border-2 border-warning text-dark d-flex flex-column flex-md-row align-items-center justify-content-between" style={{background: 'linear-gradient(to right, #FFFDEE, #FFF2DC)'}}>
                  <div className="mb-3 mb-md-0" style={{maxWidth: '700px'}}>
                    <h3 className="traditional-title text-orange mb-1">
                      <i className="bi bi-people-fill me-2"></i> Brahmin Bhojan & Collective Rituals
                    </h3>
                    <p className="m-0 text-muted" style={{fontSize: '0.9rem'}}>
                      Book a collective of 11, 21, 51, or 101 Pandits for large scale Havan, Bhojan, or continuous Vedic chants. Set customizable Brahmin grades (Standard Vedic vs Premium Acharyas), add-on samagri lists, and 4K livestream broadcasts!
                    </p>
                  </div>
                  <div>
                    <button className="btn btn-gold btn-lg text-nowrap px-4 py-2" onClick={() => setActiveTab('multipandit')}>
                      Go to Group Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* High Rating Pandits Showcase */}
            <div className="row g-4 mb-5">
              <div className="col-12 d-flex justify-content-between align-items-center">
                <h3 className="m-0 traditional-title">Veda-Certified Scholar Showcase</h3>
                <button className="btn btn-sm btn-outline-danger" onClick={() => setActiveTab('pandits')}>View All Pandits</button>
              </div>

              {PANDITS_DATA.slice(0, 3).map((p) => (
                <div className="col-md-4" key={p.id}>
                  <div className="card h-100 vedic-card">
                    <div className="d-flex p-3 align-items-center border-bottom bg-light">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        style={{width: '65px', height: '65px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--saffron-primary)'}}
                        className="me-3" 
                      />
                      <div>
                        <h5 className="m-0 font-marcellus text-crimson fw-bold h6">{p.name}</h5>
                        <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>{p.title}</small>
                        <div className="star-rating" style={{fontSize: '0.75rem'}}>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <span className="ms-1 text-dark fw-bold">{p.rating}</span>
                          <span className="text-muted"> ({p.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="text-muted small mb-2" style={{ lineHeight: '1.4' }}>
                        {p.bio.substring(0, 110)}...
                      </p>
                      <div className="d-flex justify-content-between mb-2 small text-muted">
                        <span><strong>Exp:</strong> {p.experience} Yrs</span>
                        <span><strong>City:</strong> {p.city}</span>
                      </div>
                      <div className="d-flex gap-2 mt-3">
                        <button className="btn btn-sm btn-outline-danger w-50" onClick={() => initiateCall(p)}>
                          <i className="bi bi-telephone-outbound me-1"></i> Call Now
                        </button>
                        <button className="btn btn-sm btn-saffron w-50" onClick={() => handleOpenBooking(p)}>
                          Book Online
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW: PANDITS VIEW (FIND YOUR PANDIT WITH RESPONSIVE LAYOUTS) */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'pandits' && (
          <div className="animate-fade">
            <h2 className="traditional-title text-center">Find Your Pandit</h2>
            <p className="text-center text-muted">Filter and browse Gurukul-trained Shastri scholars and specialists.</p>
            <div className="traditional-divider">
              <i className="bi bi-yin-yang divider-icon"></i>
            </div>

            {/* Category Horizontally Scrollable Chips (Highly Engaging) */}
            <div className="mb-4 text-center">
              <label className="small fw-bold text-muted d-block mb-1">Filter by Ritual Category</label>
              <div className="scrollable-chips justify-content-start justify-content-md-center">
                {['All', 'Pooja', 'Vivah', 'Death', 'Mundan', 'Janeu'].map(cat => (
                  <button 
                    key={cat} 
                    className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat} Packages
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Filters Toggle Button */}
            <div className="d-lg-none mb-3">
              <button 
                className="btn btn-outline-warning text-dark w-100 d-flex justify-content-between align-items-center py-2"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                style={{ borderRadius: '10px' }}
              >
                <span><i className="bi bi-sliders me-2"></i> {showMobileFilters ? 'Hide Selection Filters' : 'Refine Selection (Filters)'}</span>
                <i className={`bi ${showMobileFilters ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
              </button>
            </div>

            <div className="row g-4">
              {/* Refine Selection Sidebar (Collapsible on mobile) */}
              <div className={`col-lg-3 ${showMobileFilters ? 'd-block' : 'd-none d-lg-block'}`}>
                <div className="card border-warning p-3 shadow-sm" style={{ backgroundColor: '#FFFDF2', borderRadius: '15px' }}>
                  <h5 className="font-marcellus text-crimson fw-bold border-bottom pb-2 mb-3">
                    <i className="bi bi-sliders me-2"></i>Refine Selection
                  </h5>
                  
                  {/* Search bar in sidebar */}
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Search Keywords</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm"
                      placeholder="e.g. Radhe, Rudrabhishek..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Location Selector */}
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Location</label>
                    <select 
                      className="form-select form-select-sm"
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                    >
                      <option value="All">All Locations</option>
                      <option value="Varanasi">Varanasi</option>
                      <option value="Haridwar">Haridwar</option>
                      <option value="Nashik">Nashik</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Patna">Patna</option>
                      <option value="Kolkata">Kolkata</option>
                    </select>
                  </div>

                  {/* Experience Radios */}
                  <div className="mb-3">
                    <label className="form-label small fw-bold d-block">Experience</label>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="expGroup" id="expAll" checked={filterExperience === 'All'} onChange={() => setFilterExperience('All')} />
                      <label className="form-check-label small" htmlFor="expAll">Show All Experience</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="expGroup" id="exp20" checked={filterExperience === '20+'} onChange={() => setFilterExperience('20+')} />
                      <label className="form-check-label small" htmlFor="exp20">Senior Acharyas (20+ Yrs)</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="expGroup" id="exp10" checked={filterExperience === '10-20'} onChange={() => setFilterExperience('10-20')} />
                      <label className="form-check-label small" htmlFor="exp10">Experienced (10-20 Yrs)</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="expGroup" id="expUnder" checked={filterExperience === 'under10'} onChange={() => setFilterExperience('under10')} />
                      <label className="form-check-label small" htmlFor="expUnder">Under 10 Yrs</label>
                    </div>
                  </div>

                  {/* Language Checkboxes */}
                  <div className="mb-3">
                    <label className="form-label small fw-bold d-block">Languages Chanted</label>
                    {['Sanskrit', 'Hindi', 'Gujarati', 'Marathi', 'Tamil', 'Bengali'].map(lang => (
                      <div className="form-check form-check-inline" key={lang}>
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id={`lang-${lang}`}
                          checked={filterLanguage.includes(lang)}
                          onChange={() => handleLanguageFilterToggle(lang)}
                        />
                        <label className="form-check-label small" htmlFor={`lang-${lang}`}>{lang}</label>
                      </div>
                    ))}
                  </div>

                  {/* Expertise Radios */}
                  <div className="mb-3">
                    <label className="form-label small fw-bold d-block">Scholastic Specialty</label>
                    <select 
                      className="form-select form-select-sm"
                      value={filterExpertise}
                      onChange={(e) => setFilterExpertise(e.target.value)}
                    >
                      <option value="All">All Specialties</option>
                      <option value="Vedic Scholastic">Vedic Scholastic (Shastri/Acharya)</option>
                      <option value="Puranic Rituals">Puranic Rituals (Hawan/Pooja)</option>
                      <option value="Astrological Guidance">Astrological Guidance</option>
                    </select>
                  </div>

                  <button 
                    className="btn btn-sm btn-crimson w-100 mt-2"
                    onClick={() => {
                      setSearchQuery('');
                      setFilterLocation('All');
                      setFilterExperience('All');
                      setFilterLanguage([]);
                      setFilterExpertise('All');
                      setSelectedCategory('All');
                      setShowMobileFilters(false);
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              {/* Pandit listings column */}
              <div className="col-lg-9">
                <div className="row g-3">
                  {filteredPandits.length > 0 ? (
                    filteredPandits.map((p) => (
                      <div className="col-12" key={p.id}>
                        <div className="card shadow-sm border border-warning" style={{ borderRadius: '15px', backgroundColor: '#FFF' }}>
                          <div className="row g-0 align-items-center p-3">
                            {/* Profile Left */}
                            <div className="col-md-2 text-center mb-3 mb-md-0">
                              <img 
                                src={p.image} 
                                alt={p.name} 
                                style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--saffron-primary)' }}
                              />
                            </div>
                            
                            {/* Content Middle */}
                            <div className="col-md-7 px-3">
                              <div className="d-flex align-items-center flex-wrap gap-2 mb-1">
                                <h4 className="m-0 font-marcellus text-crimson fw-bold h5">{p.name}</h4>
                                <span className="badge bg-success-subtle text-success border border-success" style={{ fontSize: '0.65rem' }}>
                                  <i className="bi bi-patch-check-fill me-1"></i>VERIFIED PRIEST
                                </span>
                              </div>
                              <small className="text-muted d-block mb-2 fw-medium">{p.title}</small>
                              
                              <p className="text-muted small mb-2" style={{ lineHeight: '1.4' }}>{p.bio}</p>
                              
                              <div className="d-flex flex-wrap gap-3 small text-muted">
                                <span><i className="bi bi-clock me-1"></i><strong>Exp:</strong> {p.experience} Yrs</span>
                                <span><i className="bi bi-geo-alt me-1"></i><strong>City:</strong> {p.city}</span>
                                <span><i className="bi bi-chat-dots me-1"></i><strong>Languages:</strong> {p.languages.join(', ')}</span>
                              </div>

                              <div className="mt-2">
                                <div className="d-flex flex-wrap gap-1">
                                  {p.specialties.map(spec => (
                                    <span key={spec} className="badge bg-warning-subtle text-dark border border-warning" style={{ fontSize: '0.65rem' }}>{spec}</span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Actions Right */}
                            <div className="col-md-3 text-md-end text-start mt-3 mt-md-0 border-start ps-md-4 d-flex flex-column justify-content-between" style={{ height: '100px' }}>
                              <div>
                                <div className="star-rating" style={{ fontSize: '0.85rem' }}>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <span className="ms-1 text-dark fw-bold">{p.rating}</span>
                                </div>
                                <small className="text-muted">{p.reviews} satisfied devotees</small>
                              </div>

                              <div className="d-flex gap-2 justify-content-md-end mt-2">
                                <button className="btn btn-sm btn-outline-danger" onClick={() => initiateCall(p)}>
                                  CALL NOW
                                </button>
                                <button className="btn btn-sm btn-saffron" onClick={() => handleOpenBooking(p)}>
                                  DIRECT BOOK
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center py-5">
                      <i className="bi bi-emoji-frown fs-1 text-muted"></i>
                      <h4 className="mt-3">No Pandit matches your refined search.</h4>
                      <p className="text-muted">Try resetting your filters or adjusting key tags.</p>
                      <button className="btn btn-sm btn-saffron" onClick={() => {
                        setFilterLocation('All');
                        setFilterExperience('All');
                        setFilterLanguage([]);
                        setFilterExpertise('All');
                        setSearchQuery('');
                      }}>
                        Reset Refine Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW: POOJAS VIEW (VIDHI & SAMAGRI DETAILED PAGE) */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'poojas' && (
          <div className="animate-fade">
            {!selectedPooja ? (
              <>
                <h2 className="traditional-title text-center">Ritual Guide & Vidhi</h2>
                <p className="text-center text-muted">Access classical Sanskrit ritual details, checklists, and recommended practitioners.</p>
                <div className="traditional-divider">
                  <i className="bi bi-flower2 divider-icon"></i>
                </div>

                <div className="row g-4">
                  {poojas.map((pooja) => (
                    <div className="col-md-6" key={pooja.id}>
                      <div className="card h-100 vedic-card">
                        <div className="row g-0 h-100">
                          <div className="col-sm-5 card-img-wrap h-100">
                            <img src={pooja.image} alt={pooja.name} style={{height: '100%', objectFit: 'cover'}} />
                          </div>
                          <div className="col-sm-7 d-flex flex-column">
                            <div className="card-body flex-grow-1">
                              <span className="badge bg-danger mb-2">{pooja.tag}</span>
                              <h4 className="card-title font-marcellus text-crimson fw-bold h5">{pooja.name}</h4>
                              <p className="card-text text-muted" style={{fontSize: '0.82rem'}}>
                                {pooja.description.substring(0, 110)}...
                              </p>
                              <div className="d-flex justify-content-between text-muted" style={{fontSize: '0.75rem'}}>
                                <span><i className="bi bi-clock me-1"></i> {pooja.duration}</span>
                                <span><i className="bi bi-list-check me-1"></i> {pooja.samagri.length} Items</span>
                              </div>
                            </div>
                            <div className="p-3 border-top bg-light text-end">
                              <button 
                                className="btn btn-sm btn-saffron"
                                onClick={() => setSelectedPooja(pooja)}
                              >
                                View Samagri & Vidhi
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="animate-fade">
                <button className="btn btn-sm btn-outline-danger mb-3" onClick={() => setSelectedPooja(null)}>
                  <i className="bi bi-arrow-left me-1"></i> Back to Catalog
                </button>
                
                {/* Hero representational header */}
                <div className="card shadow-sm border border-warning rounded-4 overflow-hidden mb-4 position-relative" style={{ height: '180px' }}>
                  <div className="position-absolute w-100 h-100 bg-dark bg-opacity-60" style={{ zIndex: 1 }}></div>
                  <img src={selectedPooja.image} alt={selectedPooja.name} className="w-100 h-100 object-fit-cover position-absolute" />
                  <div className="position-relative d-flex flex-column justify-content-end p-4 text-white h-100" style={{ zIndex: 2 }}>
                    <span className="badge bg-danger align-self-start mb-2">{selectedPooja.tag}</span>
                    <h3 className="font-marcellus m-0 fw-bold">{selectedPooja.name}</h3>
                    <p className="m-0 small opacity-85">{selectedPooja.description.substring(0, 150)}...</p>
                  </div>
                </div>

                <div className="row g-4">
                  {/* Left Column: Procedure Vidhi steps */}
                  <div className="col-lg-7">
                    <div className="card shadow-sm border border-warning rounded-4 p-4 mb-4" style={{ backgroundColor: '#FFFDF0' }}>
                      <h4 className="font-marcellus text-crimson border-bottom pb-2 fw-bold">
                        <i className="bi bi-book-half me-2 text-orange"></i>Vidhi: The Sacred Procedure (विधि विधान)
                      </h4>
                      <div className="mt-3">
                        {selectedPooja.vidhi.map((step, idx) => {
                          const title = step.split(' (')[0];
                          const desc = step.includes(' (') ? step.split(' (')[1].replace(')', '') : '';
                          return (
                            <div className="d-flex mb-3 align-items-start" key={idx}>
                              <div className="stat-circle me-3" style={{ width: '35px', height: '35px', minWidth: '35px', fontSize: '0.9rem' }}>
                                {idx + 1}
                              </div>
                              <div>
                                <h6 className="m-0 font-marcellus text-dark fw-bold">{title}</h6>
                                {desc && <p className="m-0 small text-muted" style={{ lineHeight: '1.3' }}>{desc}</p>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Details session box & Checklist */}
                  <div className="col-lg-5">
                    {/* Quick Session Details & recommended pandits */}
                    <div className="card shadow-sm border border-warning rounded-4 p-3 mb-4">
                      <h5 className="font-marcellus text-crimson border-bottom pb-2 mb-2">Ritual Overview</h5>
                      <div className="row g-2 mb-3 text-center">
                        <div className="col-4 border-end">
                          <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>DURATION</small>
                          <strong className="small text-dark">{selectedPooja.duration}</strong>
                        </div>
                        <div className="col-4 border-end">
                          <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>BEST TITHI</small>
                          <strong className="small text-dark">{selectedPooja.bestDay}</strong>
                        </div>
                        <div className="col-4">
                          <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>DAKSHINA</small>
                          <strong className="small text-crimson">₹{selectedPooja.dakshina}</strong>
                        </div>
                      </div>

                      <h6 className="font-marcellus text-orange mb-2">Recommended Specialists</h6>
                      <div className="d-flex flex-column gap-2 mb-3">
                        {PANDITS_DATA.filter(p => selectedPooja.recommendPandits.includes(p.id)).slice(0, 2).map(p => (
                          <div className="d-flex align-items-center justify-content-between p-2 rounded bg-light border" key={p.id}>
                            <div className="d-flex align-items-center">
                              <img src={p.image} alt={p.name} style={{width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover'}} className="me-2" />
                              <div>
                                <h6 className="m-0 font-marcellus" style={{fontSize: '0.8rem'}}>{p.name}</h6>
                                <small className="text-muted" style={{fontSize: '0.7rem'}}>Exp: {p.experience} Yrs | {p.city}</small>
                              </div>
                            </div>
                            <button 
                              className="btn btn-sm btn-saffron text-nowrap"
                              style={{fontSize: '0.7rem', padding: '2px 6px'}}
                              onClick={() => handleOpenBooking(p, selectedPooja.name)}
                            >
                              Book Now
                            </button>
                          </div>
                        ))}
                      </div>

                      <button 
                        className="btn btn-saffron w-100 py-2 font-marcellus fw-bold" 
                        onClick={() => {
                          const defaultP = PANDITS_DATA.find(p => selectedPooja.recommendPandits.includes(p.id)) || PANDITS_DATA[0];
                          handleOpenBooking(defaultP, selectedPooja.name);
                        }}
                      >
                        BOOK THIS RITUAL
                      </button>
                    </div>

                    {/* Samagri ingredients Checklist */}
                    <div className="card shadow-sm rounded-4 p-0 overflow-hidden" style={{ border: '2px solid var(--marigold-gold)', backgroundColor: '#FFFDF0' }}>
                      <div className="p-3 bg-saffron text-white d-flex justify-content-between align-items-center">
                        <h5 className="font-marcellus fw-bold m-0"><i className="bi bi-basket-fill me-2 text-warning"></i>Samagri Checklist</h5>
                        <button className="btn btn-sm btn-outline-light d-flex align-items-center gap-1" onClick={() => printChecklist(selectedPooja.name, selectedPooja.samagri)} style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                          <i className="bi bi-printer-fill"></i> Print
                        </button>
                      </div>
                      
                      <div className="px-3 py-2 border-bottom border-warning-subtle d-flex justify-content-between bg-light">
                        <button className="btn btn-sm btn-link text-decoration-none p-0 fw-bold" style={{ color: 'var(--saffron-primary)', fontSize: '0.75rem' }} onClick={() => setAllSamagriState(selectedPooja.id, true)}>
                          <i className="bi bi-check-all me-1"></i>Select All
                        </button>
                        <button className="btn btn-sm btn-link text-decoration-none p-0 text-muted fw-bold" style={{ fontSize: '0.75rem' }} onClick={() => setAllSamagriState(selectedPooja.id, false)}>
                          <i className="bi bi-x-circle me-1"></i>Clear All
                        </button>
                      </div>

                      <div className="p-3" style={{ maxHeight: '280px', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'var(--marigold-gold) transparent' }}>
                        <div className="d-flex flex-column gap-2">
                          {selectedPooja.samagri.map((s, idx) => (
                            <div 
                              key={idx}
                              className={`samagri-card ${s.checked ? 'completed' : ''}`} 
                              onClick={() => toggleSamagriCheck(selectedPooja.id, idx)}
                            >
                              <div className="samagri-checkbox-modern">
                                <i className={`bi ${s.checked ? 'bi-check-lg' : ''}`}></i>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="m-0 item-title" style={{ fontSize: '0.85rem' }}>{s.item}</h6>
                                <span className="badge bg-warning-subtle text-dark border border-warning" style={{ fontSize: '0.65rem' }}>{s.qty}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW: GROUP BOOKING */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'multipandit' && (
          <div className="animate-fade">
            <h2 className="traditional-title text-center">Group Ritual Booking</h2>
            <p className="text-center text-muted">Book multiple Brahmins or Pandits for massive chanting, Hawan, or family bhojans.</p>
            <div className="traditional-divider">
              <i className="bi bi-people-fill divider-icon"></i>
            </div>

            <div className="row g-4">
              {/* Form & Configuration column */}
              <div className="col-lg-7">
                <div className="card shadow-sm border border-warning rounded-4 p-4">
                  <h4 className="font-marcellus text-crimson border-bottom pb-2 fw-bold">Configure Spiritual Chanting Collective</h4>
                  
                  <form onSubmit={handleMultiPanditSubmit} className="mt-3">
                    <div className="row g-3">
                      {/* Name */}
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Devotee Name</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="e.g. Rajesh Kumar" 
                          value={multiPanditForm.contactName}
                          onChange={(e) => setMultiPanditForm(prev => ({ ...prev, contactName: e.target.value }))}
                          required
                        />
                      </div>
                      
                      {/* Phone */}
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Contact Phone Number</label>
                        <input 
                          type="tel" 
                          className="form-control" 
                          placeholder="e.g. 9876543210" 
                          value={multiPanditForm.phone}
                          onChange={(e) => setMultiPanditForm(prev => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>

                      {/* Ritual Type */}
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Ritual Type</label>
                        <select 
                          className="form-select"
                          value={multiPanditForm.ritualType}
                          onChange={(e) => setMultiPanditForm(prev => ({ ...prev, ritualType: e.target.value }))}
                        >
                          <option value="Bhandara / Brahmin Bhoj">Brahmin Bhoj & Dakshina (ब्राह्मण भोजन)</option>
                          <option value="Mass Gayatri Chanting Collective">Mass Gayatri Chanting Collective</option>
                          <option value="Maha Rudrashanti Hawan (Complex Fire Ritual)">Maha Rudrashanti Hawan</option>
                          <option value="Srimad Bhagavat Katha Saptah Chanting">Srimad Bhagavat Katha (7 Days)</option>
                        </select>
                      </div>

                      {/* Date & Time */}
                      <div className="col-md-6">
                        <div className="row g-2">
                          <div className="col-6">
                            <label className="form-label small fw-bold">Date</label>
                            <input 
                              type="date" 
                              className="form-control" 
                              value={multiPanditForm.date}
                              onChange={(e) => setMultiPanditForm(prev => ({ ...prev, date: e.target.value }))}
                              required
                            />
                          </div>
                          <div className="col-6">
                            <label className="form-label small fw-bold">Time</label>
                            <input 
                              type="time" 
                              className="form-control" 
                              value={multiPanditForm.time}
                              onChange={(e) => setMultiPanditForm(prev => ({ ...prev, time: e.target.value }))}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Pandit Collective Size Selector */}
                      <div className="col-12">
                        <label className="form-label small fw-bold d-block">Pandit Collective Size (Chanting Strength)</label>
                        <div className="d-flex justify-content-between gap-2 overflow-auto pb-1">
                          {[11, 21, 51, 101].map(count => (
                            <button 
                              type="button" 
                              key={count}
                              className={`btn flex-fill py-2 text-nowrap ${multiPanditCount === count ? 'btn-saffron fw-bold' : 'btn-outline-warning text-dark'}`}
                              onClick={() => setMultiPanditCount(count)}
                              style={{ borderRadius: '10px', fontSize: '0.85rem' }}
                            >
                              {count} Pandits
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Pandit Grade Selection */}
                      <div className="col-md-6">
                        <label className="form-label small fw-bold d-block">Pandit Scholar Grade</label>
                        <div className="btn-group w-100" role="group">
                          <button 
                            type="button" 
                            className={`btn btn-sm ${multiPanditGrade === 'Standard' ? 'btn-saffron' : 'btn-outline-warning text-dark'}`}
                            onClick={() => setMultiPanditGrade('Standard')}
                          >
                            Standard Scholars
                          </button>
                          <button 
                            type="button" 
                            className={`btn btn-sm ${multiPanditGrade === 'Acharya' ? 'btn-saffron' : 'btn-outline-warning text-dark'}`}
                            onClick={() => setMultiPanditGrade('Acharya')}
                          >
                            Eminent Acharyas (+50%)
                          </button>
                        </div>
                      </div>

                      {/* Venue Address */}
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Venue Address / Location Details</label>
                        <input 
                          type="text"
                          className="form-control"
                          placeholder="e.g. H.No 24, Saket, Delhi"
                          value={multiPanditForm.venue}
                          onChange={(e) => setMultiPanditForm(prev => ({ ...prev, venue: e.target.value }))}
                          required
                        />
                      </div>

                      {/* Add-ons Configuration */}
                      <div className="col-12 mt-3">
                        <label className="form-label small fw-bold d-block">Special Add-on Deliverables</label>
                        <div className="row g-2">
                          <div className="col-6">
                            <div 
                              className={`p-3 border rounded-3 cursor-pointer h-100 d-flex flex-column justify-content-between ${multiPanditSamagri ? 'border-orange bg-warning-subtle' : 'border-light'}`}
                              onClick={() => setMultiPanditSamagri(!multiPanditSamagri)}
                            >
                              <div className="d-flex justify-content-between align-items-center mb-1">
                                <strong className="small">Pure Samagri Kit</strong>
                                <input type="checkbox" checked={multiPanditSamagri} readOnly />
                              </div>
                              <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Fresh herbs, coconut, mango wood, pure cow ghee and sweet offerings included.</small>
                              <span className="fw-bold mt-2 text-crimson small">+₹2,500</span>
                            </div>
                          </div>

                          <div className="col-6">
                            <div 
                              className={`p-3 border rounded-3 cursor-pointer h-100 d-flex flex-column justify-content-between ${multiPanditLiveStream ? 'border-orange bg-warning-subtle' : 'border-light'}`}
                              onClick={() => setMultiPanditLiveStream(!multiPanditLiveStream)}
                            >
                              <div className="d-flex justify-content-between align-items-center mb-1">
                                <strong className="small">Live 4K Broadcast</strong>
                                <input type="checkbox" checked={multiPanditLiveStream} readOnly />
                              </div>
                              <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Private streaming link for family members abroad with digital audio mixing.</small>
                              <span className="fw-bold mt-2 text-crimson small">+₹3,500</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Summary Checkout Card */}
              <div className="col-lg-5">
                <div className="card shadow-sm border border-warning rounded-4 p-4" style={{ backgroundColor: '#FFFDF0', position: 'sticky', top: '90px' }}>
                  <h4 className="font-marcellus text-crimson border-bottom pb-2 fw-bold">Sacred Summary</h4>
                  
                  {/* Performance stats */}
                  <div className="my-3">
                    <div className="d-flex justify-content-between border-bottom py-1 small">
                      <span>Collective Strength:</span>
                      <strong className="text-dark">{multiPanditCount} Gurukul Priests</strong>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-1 small">
                      <span>Combined Devotional Experience:</span>
                      <strong className="text-dark">{multiPanditCount * (multiPanditGrade === 'Acharya' ? 18 : 12)}+ Years</strong>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-1 small">
                      <span>Ritual Duration:</span>
                      <strong className="text-dark">3.5 - 4.5 Hours</strong>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-1 small">
                      <span>Spiritual Resonance Energy:</span>
                      <span className="text-warning">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </span>
                    </div>
                  </div>

                  {/* Dynamic spiritual text message */}
                  <div className="p-3 bg-white rounded border border-warning-subtle mb-3">
                    <small className="text-muted d-block mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--saffron-primary)' }}>VIBRATIONAL ADVANTAGES</small>
                    <p className="m-0 small text-dark" style={{ lineHeight: '1.4' }}>
                      {multiPanditCount === 11 && 'Chanting of 11 Brahmins creates beautiful, home-wide positive protection, dispersing domestic stress and cleaning minor vastu conflicts.'}
                      {multiPanditCount === 21 && 'The chanting of 21 Gurukul priests raises strong high-vibe resonance, excellent for commercial purifications, shops, or family peace rites.'}
                      {multiPanditCount === 51 && 'Chanting with 51 eminent scholars triggers massive protective spiritual resonance. Highly recommended for healing diseases, pitra blessings, or marriage ceremonies.'}
                      {multiPanditCount === 101 && 'A collective of 101 scholars represents a grand Vedic Yagya. Cleanses generations of ancestors (Pitra), ensures permanent positive family growth, and absolute purity.'}
                    </p>
                  </div>

                  {/* Financial breakdown */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between small text-muted mb-1">
                      <span>Base Brahmin Dakshina:</span>
                      <span>₹{multiPanditCount * (multiPanditGrade === 'Acharya' ? 1500 : 800)}</span>
                    </div>
                    {multiPanditSamagri && (
                      <div className="d-flex justify-content-between small text-muted mb-1">
                        <span>Vedic Samagri Kit:</span>
                        <span>+₹2,500</span>
                      </div>
                    )}
                    {multiPanditLiveStream && (
                      <div className="d-flex justify-content-between small text-muted mb-1">
                        <span>4K Broadcast & setup:</span>
                        <span>+₹3,500</span>
                      </div>
                    )}
                    <div className="d-flex justify-content-between fs-5 text-crimson font-marcellus fw-bold mt-2 pt-2 border-top">
                      <span>Total Dakshina:</span>
                      <span>₹{calculateMultiPanditTotal()}</span>
                    </div>
                  </div>

                  <button 
                    type="button" 
                    className="btn btn-saffron w-100 py-2 fs-5 font-marcellus fw-bold"
                    onClick={handleMultiPanditSubmit}
                  >
                    SACRED CONFIRMATION
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW: MY BOOKINGS HISTORY */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'bookings' && (
          <div className="animate-fade">
            <h2 className="traditional-title text-center">Your Booking Records</h2>
            <div className="traditional-divider">
              <i className="bi bi-journal-bookmark-fill divider-icon"></i>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-9">
                {myBookings.length > 0 ? (
                  myBookings.map((b) => (
                    <div className="card shadow-sm border border-warning rounded-4 mb-3 overflow-hidden" key={b.id}>
                      <div className="card-header bg-light d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-orange">Booking ID: {b.id}</span>
                        <span className={`badge ${b.status.includes('Confirmed') ? 'bg-success' : 'bg-warning'} px-3`}>{b.status}</span>
                      </div>
                      <div className="card-body">
                        <div className="row g-3">
                          <div className="col-md-8">
                            <h4 className="font-marcellus text-crimson fw-bold h5 mb-2">{b.poojaName}</h4>
                            <p className="m-0 text-muted small"><strong>Conducting Priest:</strong> {b.panditName}</p>
                            <p className="m-0 text-muted small"><strong>Schedule Date:</strong> {b.date} at {b.time}</p>
                            <p className="m-0 text-muted small"><strong>Venue:</strong> {b.venue}</p>
                            {b.gotra && <p className="m-0 text-muted small"><strong>Gotra Chanted:</strong> {b.gotra} Gotra</p>}
                            {b.nakshatra && <p className="m-0 text-muted small"><strong>Nakshatra/Star:</strong> {b.nakshatra}</p>}
                            <p className="mt-2 mb-0 text-muted small">
                              <strong>Ingredients / Samagri:</strong> {b.includeSamagri ? 'Pandit will bring the complete Samagri package.' : 'Devotee bringing own samagri (Checklist active).'}
                            </p>
                          </div>
                          <div className="col-md-4 d-flex flex-column justify-content-between align-items-md-end text-md-end">
                            <div>
                              <span className="text-muted d-block small">Dakshina Offered</span>
                              <span className="fs-4 text-crimson font-marcellus fw-bold">₹{b.dakshina}</span>
                            </div>
                            <div className="d-flex gap-2 mt-3 mt-md-0">
                              <a href={`tel:${b.panditPhone}`} className="btn btn-sm btn-outline-danger" onClick={(e) => { e.preventDefault(); alert(`Calling: ${b.panditPhone}`); }}>
                                <i className="bi bi-telephone-fill me-1"></i> Call Pandit
                              </a>
                              <button 
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => {
                                  const matchingPooja = POOJAS_DATA.find(p => p.name === b.poojaName) || POOJAS_DATA[0];
                                  printChecklist(b.poojaName, matchingPooja.samagri);
                                }}
                              >
                                <i className="bi bi-printer-fill me-1"></i> Checklist
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-5">
                    <i className="bi bi-journal-x fs-1 text-muted"></i>
                    <h4 className="mt-3">No active bookings.</h4>
                    <p className="text-muted">Explore our services and book a priest.</p>
                    <button className="btn btn-saffron mt-2" onClick={() => setActiveTab('pandits')}>Book a Pandit</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW: KUNDALI MATCH AI */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'kundali' && (
          <AIAstrologer apiKey="AIzaSyCqkauclR0dS3KL09DxD3XG1KQnEuAOo3k" />
        )}

      </div>

      {/* Decorative Marigold Garland Footer Trim */}
      <div className="marigold-garland"></div>

      {/* Footer */}
      <footer className="bg-dark text-white pt-4 pb-3 mt-5 border-top border-4 border-warning">
        <div className="container-fluid px-4 px-xl-5">
          <div className="row g-4 justify-content-between">
            <div className="col-md-5">
              <h5 className="font-marcellus text-warning"><i className="bi bi-brightness-high me-2"></i> VedaBook Seva Platform</h5>
              <p className="small text-white-50 mt-2" style={{maxWidth: '450px'}}>
                A digital medium created to sustain Vedic rituals and connect certified Sanskrit pandits and Shastri scholars with devotees across India. All Pandits registered have verified credentials, degrees, and moral characters.
              </p>
              <div className="d-flex gap-2 fs-5 mt-2">
                <i className="bi bi-facebook text-warning cursor-pointer"></i>
                <i className="bi bi-youtube text-warning cursor-pointer"></i>
                <i className="bi bi-instagram text-warning cursor-pointer"></i>
                <i className="bi bi-twitter text-warning cursor-pointer"></i>
              </div>
            </div>
            <div className="col-md-3">
              <h6 className="font-marcellus text-warning">Quick Menu Links</h6>
              <ul className="list-unstyled small mt-2">
                <li><a href="#" className="text-white-50 text-decoration-none" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>Home Dashboard</a></li>
                <li><a href="#" className="text-white-50 text-decoration-none" onClick={(e) => { e.preventDefault(); setActiveTab('pandits'); }}>Book Vedic Pandit</a></li>
                <li><a href="#" className="text-white-50 text-decoration-none" onClick={(e) => { e.preventDefault(); setActiveTab('poojas'); }}>Pooja Vidhi Guides</a></li>
                <li><a href="#" className="text-white-50 text-decoration-none" onClick={(e) => { e.preventDefault(); setActiveTab('multipandit'); }}>Mass Bhoj Booking</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h6 className="font-marcellus text-warning">Devotional Support</h6>
              <p className="small text-white-50 mt-2 mb-1">VedaBook Seva Coordinator Office:</p>
              <p className="small text-warning fw-bold mb-1"><i className="bi bi-telephone-fill me-1"></i> +91 99999 88888</p>
              <p className="small text-white-50"><i className="bi bi-envelope-fill me-1"></i> seva@vedabook.org</p>
            </div>
          </div>
          <div className="text-center mt-3 pt-3 border-top border-secondary small text-white-50">
            &copy; 2026 VedaBook Seva Trust. Built with pure Vedic respect and modern React technologies.
          </div>
        </div>
      </footer>

      {/* ==========================================
          MODAL: Pandit Booking Form Modal
      ========================================== */}
      {bookingPandit && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)', overflowY: 'auto'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-3 border-warning" style={{ borderRadius: '20px' }}>
              <div className="modal-header bg-light">
                <h5 className="modal-title font-marcellus text-crimson fw-bold">
                  Book {bookingPandit.name}
                </h5>
                <button type="button" className="btn-close" onClick={() => setBookingPandit(null)}></button>
              </div>
              <form onSubmit={handleBookingSubmit}>
                <div className="modal-body">
                  <div className="d-flex align-items-center mb-3 p-2 bg-light rounded border">
                    <img src={bookingPandit.image} alt={bookingPandit.name} style={{width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover'}} className="me-2" />
                    <div>
                      <h6 className="m-0 font-marcellus">{bookingPandit.name}</h6>
                      <small className="text-muted">Base Dakshina: ₹{bookingPandit.dakshina} | Exp: {bookingPandit.experience} Yrs</small>
                    </div>
                  </div>

                  <div className="row g-3">
                    {/* Select Ritual Type */}
                    <div className="col-12">
                      <label className="form-label small fw-bold">Select Auspicious Ritual</label>
                      <select 
                        className="form-select"
                        value={bookingFormData.poojaType}
                        onChange={(e) => setBookingFormData(prev => ({ ...prev, poojaType: e.target.value }))}
                      >
                        {bookingPandit.specialties.map(spec => (
                          <option key={spec} value={spec}>{spec}</option>
                        ))}
                        <option value="Custom Pooja Ritual">Custom Pooja (Discuss with Priest)</option>
                      </select>
                    </div>

                    {/* Date and Time */}
                    <div className="col-6">
                      <label className="form-label small fw-bold">Select Date</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        value={bookingFormData.date}
                        onChange={(e) => setBookingFormData(prev => ({ ...prev, date: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-bold">Time</label>
                      <input 
                        type="time" 
                        className="form-control" 
                        value={bookingFormData.time}
                        onChange={(e) => setBookingFormData(prev => ({ ...prev, time: e.target.value }))}
                        required
                      />
                    </div>

                    {/* Gotra & Nakshatra Customizer fields (For authentic devotional custom chanting) */}
                    <div className="col-6">
                      <label className="form-label small fw-bold">Gotra / गोत्र (Optional)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. Kashyap, Bhardwaj" 
                        value={bookingFormData.gotra}
                        onChange={(e) => setBookingFormData(prev => ({ ...prev, gotra: e.target.value }))}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-bold">Nakshatra / नक्षत्र (Optional)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. Ashwini, Rohini" 
                        value={bookingFormData.nakshatra}
                        onChange={(e) => setBookingFormData(prev => ({ ...prev, nakshatra: e.target.value }))}
                      />
                    </div>

                    {/* Phone Contact */}
                    <div className="col-12">
                      <label className="form-label small fw-bold">Your Contact Phone Number</label>
                      <input 
                        type="tel" 
                        className="form-control" 
                        placeholder="e.g. 9876543210" 
                        value={bookingFormData.phone}
                        onChange={(e) => setBookingFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>

                    {/* Venue */}
                    <div className="col-12">
                      <label className="form-label small fw-bold">Ritual Venue (Full Address)</label>
                      <textarea 
                        className="form-control" 
                        rows="2" 
                        placeholder="Please provide full home or temple address where ritual will happen..."
                        value={bookingFormData.venue}
                        onChange={(e) => setBookingFormData(prev => ({ ...prev, venue: e.target.value }))}
                        required
                      ></textarea>
                    </div>

                    {/* Samagri kit option */}
                    <div className="col-12">
                      <div className="form-check form-switch bg-light p-2 rounded border">
                        <input 
                          className="form-check-input ms-0 me-2" 
                          type="checkbox" 
                          id="samagriSwitch" 
                          checked={bookingFormData.includeSamagriKit}
                          onChange={(e) => setBookingFormData(prev => ({ ...prev, includeSamagriKit: e.target.checked }))}
                        />
                        <label className="form-check-label small fw-bold" htmlFor="samagriSwitch">
                          Add Complete Samagri Package (+₹1,200)
                        </label>
                        <small className="text-muted d-block" style={{fontSize: '0.7rem'}}>Pandit ji will bring fresh flowers, honey, sandalwood, mango wood, pure ghee and required leaves.</small>
                      </div>
                    </div>

                    {/* Special Instructions */}
                    <div className="col-12">
                      <label className="form-label small fw-bold">Special Ritual Custom Instructions (Optional)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. need North Indian style setup, specific rituals, etc."
                        value={bookingFormData.customInstructions}
                        onChange={(e) => setBookingFormData(prev => ({ ...prev, customInstructions: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer bg-light">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setBookingPandit(null)}>Cancel</button>
                  <button type="submit" className="btn btn-saffron px-4">Confirm Booking</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: Call Simulator Overlay
      ========================================== */}
      {currentCall && (
        <div className="call-overlay">
          <div className="call-container">
            <div className="call-avatar">
              <img src={currentCall.image} alt={currentCall.name} />
              {callStatus === 'dialing' && <div className="call-pulse"></div>}
              {callStatus === 'connected' && <div className="call-pulse" style={{animationDuration: '2.5s', borderColor: 'green'}}></div>}
            </div>

            <h4 className="font-marcellus text-warning m-0">{currentCall.name}</h4>
            <small className="text-muted d-block mb-3">{currentCall.title}</small>

            {callStatus === 'dialing' && (
              <div className="my-3">
                <span className="spinner-grow spinner-grow-sm text-warning me-2"></span>
                <span className="fw-bold text-orange">Dialing Priest...</span>
              </div>
            )}

            {callStatus === 'connected' && (
              <div className="my-3 text-success fw-bold">
                <i className="bi bi-record-fill text-danger me-1 animate-pulse"></i> 
                Connected - {formatTime(callTimerVal)}
              </div>
            )}

            {callStatus === 'ended' && (
              <div className="my-3 text-danger fw-bold">
                <i className="bi bi-telephone-x-fill me-1"></i> Call Disconnected
              </div>
            )}

            <div className="d-flex justify-content-center gap-3 my-4">
              <button 
                className={`call-btn-action ${callMuted ? 'active' : ''}`} 
                onClick={() => setCallMuted(!callMuted)}
                title="Mute Call"
                disabled={callStatus !== 'connected'}
              >
                <i className={`bi ${callMuted ? 'bi-mic-mute-fill' : 'bi-mic-fill'}`}></i>
              </button>
              
              <button 
                className={`call-btn-action ${callSpeaker ? 'active' : ''}`} 
                onClick={() => setCallSpeaker(!callSpeaker)}
                title="Speaker Mode"
                disabled={callStatus !== 'connected'}
              >
                <i className={`bi ${callSpeaker ? 'bi-volume-up-fill' : 'bi-volume-down-fill'}`}></i>
              </button>
            </div>

            <button className="call-btn-hangup" onClick={endCall} title="End Call">
              <i className="bi bi-telephone-x-fill"></i>
            </button>
            
            <p className="small text-muted mt-3 mb-0" style={{fontSize: '0.7rem'}}>
              Simulating direct connection to {currentCall.name}. Talk with the priest about muhurat or custom arrangements.
            </p>
          </div>
        </div>
      )}

      {/* ==========================================
          OVERLAY: Animated Confetti Booking Loader
      ========================================== */}
      {confirmedBooking && (
        <div className="confirm-overlay text-center">
          <i className="bi bi-yin-yang mandala-loader"></i>
          <h2 className="traditional-title text-orange mb-2">Auspicious Booking Registering...</h2>
          <div className="spinner-border text-warning my-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="card border-2 border-warning p-4 mx-auto mt-3 shadow-lg" style={{maxWidth: '450px', backgroundColor: '#FFFDF6'}}>
            <h5 className="text-success fw-bold font-marcellus"><i className="bi bi-check-circle-fill me-1"></i> Sankalpa Confirmed!</h5>
            <div className="marigold-garland-double mt-2"></div>
            <p className="m-1 small text-muted text-start"><strong>Ritual:</strong> {confirmedBooking.poojaName}</p>
            <p className="m-1 small text-muted text-start"><strong>Priest:</strong> {confirmedBooking.panditName}</p>
            <p className="m-1 small text-muted text-start"><strong>Date & Time:</strong> {confirmedBooking.date} at {confirmedBooking.time}</p>
            {confirmedBooking.gotra && <p className="m-1 small text-muted text-start"><strong>Gotra Chanted:</strong> {confirmedBooking.gotra} Gotra</p>}
            {confirmedBooking.nakshatra && <p className="m-1 small text-muted text-start"><strong>Nakshatra:</strong> {confirmedBooking.nakshatra}</p>}
            <p className="m-1 small text-muted text-start"><strong>Dakshina Offered:</strong> ₹{confirmedBooking.dakshina}</p>
            <div className="marigold-garland-double mt-2 mb-0"></div>
            <p className="m-0 mt-2 small text-success fw-bold">SMS Sent! Pandit ji will call you shortly to confirm Muhurat details.</p>
          </div>
        </div>
      )}

      {/* ==========================================
          AI GUIDE WIDGET
      ========================================== */}
      <AIGuideWidget apiKey="AIzaSyCqkauclR0dS3KL09DxD3XG1KQnEuAOo3k" />

    </div>
  );
}

export default App;
