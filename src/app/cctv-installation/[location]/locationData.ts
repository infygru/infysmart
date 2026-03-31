export interface LocationData {
  slug: string;
  name: string;               // Full display name
  shortName: string;          // Used in H1 and meta
  state: string;
  type: 'city' | 'industrial' | 'district' | 'region';
  description: string;        // 2-3 sentence intro paragraph
  industryFocus: string;      // e.g. "IT Parks, Apartments, Retail Chains"
  areas: string[];            // Sub-areas / localities
  sameDay: boolean;
  deliveryNote: string;       // "Same-day" | "Next-day (within 24 hrs)" | "1–2 days"
  distanceNote: string;       // e.g. "~60 km from our Hosur base"
  reviewCount: number;
  rating: string;
  useCases: { title: string; desc: string }[];
  faqExtra?: { q: string; a: string }[];
  keywords: string[];
}

export const locationData: Record<string, LocationData> = {

  chennai: {
    slug: 'chennai',
    name: 'Chennai & Suburbs',
    shortName: 'Chennai',
    state: 'Tamil Nadu',
    type: 'city',
    description:
      "Chennai — Tamil Nadu's capital and South India's largest metro — is Infysmart's busiest service territory. From high-rise apartments in Velachery to manufacturing units in Ambattur, our Chennai teams handle over 90 CCTV installations annually across every zone of the city and its extended suburbs.",
    industryFocus: 'Apartments, IT Parks, Retail Chains, Schools, Hospitals',
    areas: [
      'Adyar & Besant Nagar', 'T. Nagar & Kodambakkam', 'Anna Nagar & Mogappair',
      'Velachery & Pallikaranai', 'OMR (Old Mahabalipuram Road)', 'ECR (East Coast Road)',
      'Porur & Valasaravakkam', 'Tambaram & Chromepet', 'Perungudi & Sholinganallur',
      'Guindy & Saidapet', 'Ambattur & Padi', 'Perambur & Kolathur',
      'Madhavaram & Redhills', 'Avadi & Thiruvallur',
    ],
    sameDay: true,
    deliveryNote: 'Same-day',
    distanceNote: '~100 km from our Hosur warehouse via NH44',
    reviewCount: 93,
    rating: '4.8',
    useCases: [
      { title: 'Apartment & Gated Community CCTV', desc: 'Full-complex coverage: entrance gate, lobby, stairwells, parking, lift cameras. Individual mobile access for flat owners. AMC plans from ₹450/camera/year.' },
      { title: 'Retail Shop & Showroom CCTV', desc: 'Counter, billing, storage room coverage. Anti-theft deterrence. Night vision and motion alert setup.' },
      { title: 'Office & IT Park CCTV', desc: 'Server room cameras, reception, meeting rooms, entry/exit monitoring. Integration with biometric access control.' },
      { title: 'Factory & Warehouse — Ambattur / Guindy', desc: 'Industrial-grade IP cameras for Ambattur and Guindy industrial estates. Fiber optic cabling, SIPCOT compliance documentation.' },
      { title: 'School & College Campus CCTV', desc: 'Entry gates, corridors, labs, parking. Timed recording aligned with school hours. Government-approved installations.' },
      { title: 'Hospital & Clinic CCTV', desc: 'Sensitive zone coverage with privacy-compliant camera placement. 24/7 recording for insurance and audit requirements.' },
    ],
    faqExtra: [
      { q: 'Which areas in Chennai do you cover for CCTV installation?', a: 'We cover all Chennai localities including Anna Nagar, Adyar, Velachery, OMR, ECR, Porur, Tambaram, Chromepet, T. Nagar, Ambattur, Guindy, Perambur, Sholinganallur, Perungudi, and all suburban areas.' },
    ],
    keywords: ['CCTV installation Chennai', 'CCTV camera installation service Chennai', 'CCTV camera price Chennai', 'buy CCTV camera Chennai', 'Hikvision dealer Chennai', 'CCTV for apartments Chennai', 'CCTV AMC service Chennai', 'CCTV repair Chennai'],
  },

  'hosur-krishnagiri': {
    slug: 'hosur-krishnagiri',
    name: 'Hosur, Krishnagiri District',
    shortName: 'Hosur & Krishnagiri',
    state: 'Tamil Nadu',
    type: 'district',
    description:
      "Infysmart is headquartered in Hosur, making it our home territory and fastest-served location. From SIPCOT's electronics and auto-component factories to Krishnagiri's mango belt agri-businesses and commercial establishments, we have the deepest local expertise in this district.",
    industryFocus: 'SIPCOT Factories, Industrial Units, Commercial, Agricultural Storage',
    areas: [
      'SIPCOT Hosur Phase I & II', 'Bagalur Industrial Corridor', 'Mathigiri & Thally Road',
      'Hosur Town & Bypass Road', 'Naganalli & Shoolagiri', 'Krishnagiri Town',
      'Bargur', 'Uthangarai', 'Pochampalli', 'Kaveripattinam', 'Attibele (border)',
    ],
    sameDay: true,
    deliveryNote: 'Same-day (our base location)',
    distanceNote: 'Our headquarters — zero travel time',
    reviewCount: 45,
    rating: '4.9',
    useCases: [
      { title: 'SIPCOT Industrial Unit CCTV', desc: 'Factory floor monitoring, perimeter PTZ cameras, fiber optic networking. SIPCOT audit-compliant installations with full documentation.' },
      { title: 'Warehouse & Godown CCTV', desc: 'Wide-angle coverage for large storage facilities. Motion-triggered recording to maximize HDD retention.' },
      { title: 'Auto Component Factory CCTV', desc: 'Production line monitoring with 5MP IP cameras. Integration with factory ERP systems for shift-based recording.' },
      { title: 'Commercial Shops in Hosur Town', desc: 'Quick 1-day installation for retail shops, jewellery stores, and showrooms in Hosur town area.' },
      { title: 'Agri-Business & Cold Storage — Krishnagiri', desc: 'Temperature-resistant camera housings for cold storage. Solar-powered cameras for remote farm sites.' },
      { title: 'Government & PSU Projects', desc: 'Proven track record with government-affiliated facilities in Hosur district. BIS-certified components and formal handover documentation.' },
    ],
    keywords: ['CCTV installation Hosur', 'CCTV camera Hosur', 'SIPCOT CCTV installation', 'factory CCTV Hosur', 'industrial CCTV Hosur', 'CCTV Krishnagiri', 'CCTV service Hosur'],
  },

  coimbatore: {
    slug: 'coimbatore',
    name: 'Coimbatore',
    shortName: 'Coimbatore',
    state: 'Tamil Nadu',
    type: 'city',
    description:
      "Coimbatore — India's textile and engineering capital — presents unique surveillance requirements. From dusty spinning mill floors needing IP67-rated cameras to modern IT campuses on Avinashi Road, Infysmart delivers purpose-built CCTV solutions for every sector of Coimbatore's diverse economy.",
    industryFocus: 'Textile Mills, Engineering Units, IT Campuses, Commercial, Apartments',
    areas: [
      'Gandhipuram', 'RS Puram', 'Saibaba Colony', 'Peelamedu', 'Singanallur',
      'Ukkadam', 'Vadavalli', 'Kuniyamuthur', 'Kovaipudur', 'Thudiyalur',
      'Avinashi Road', 'Sowripalayam', 'Sulur', 'Pollachi', 'Tirupur',
    ],
    sameDay: true,
    deliveryNote: 'Same-day',
    distanceNote: '~180 km from our Hosur base via NH544',
    reviewCount: 28,
    rating: '4.7',
    useCases: [
      { title: 'Spinning Mill & Textile Unit CCTV', desc: 'Dust-proof IP67 cameras for spinning and weaving floors. BSCI and ISO buyer audit-compliant cabling documentation.' },
      { title: 'IT Campus & Tech Park CCTV', desc: 'Enterprise-grade NVR with PoE infrastructure. Access control integration for multi-floor offices.' },
      { title: 'Apartment & Residential CCTV', desc: 'Full-complex coverage for gated communities in Peelamedu, RS Puram, and Saibaba Colony. AMC plans available.' },
      { title: 'Showroom & Jewellery Shop CCTV', desc: 'High-resolution 5MP cameras for detailed image capture at billing counters. 360° fisheye options for open showrooms.' },
      { title: 'Educational Institution CCTV', desc: 'Campus surveillance for colleges along Avinashi Road. Timed recording with remote monitoring for management.' },
      { title: 'Export Garment Factory CCTV', desc: 'Factory-wide coverage meeting international buyer CCTV audit standards. Full structured-cabling documentation provided.' },
    ],
    keywords: ['CCTV installation Coimbatore', 'CCTV camera Coimbatore', 'textile mill CCTV Coimbatore', 'CCTV for apartments Coimbatore', 'Hikvision dealer Coimbatore', 'CCTV service Coimbatore', 'CCTV AMC Coimbatore'],
  },

  dharmapuri: {
    slug: 'dharmapuri',
    name: 'Dharmapuri',
    shortName: 'Dharmapuri',
    state: 'Tamil Nadu',
    type: 'district',
    description:
      "Infysmart has completed proven projects in Dharmapuri district including a notable installation in Palacode. Based just ~60 km away in Hosur, our technicians can reach any location in Dharmapuri on the same day — making us the fastest-responding CCTV company in the district.",
    industryFocus: 'Shops, Factories, Government Offices, Schools, Petrol Bunks',
    areas: [
      'Dharmapuri Town', 'Palacode', 'Pennagaram', 'Harur',
      'Nallampalli', 'Pappireddipatti', 'Morappur', 'Kadathur',
      'Karimangalam', 'Bommidi', 'Thoppur', 'Hogenakkal Road',
    ],
    sameDay: true,
    deliveryNote: 'Same-day (call before noon)',
    distanceNote: '~60 km from our Hosur base via Dharmapuri Road',
    reviewCount: 18,
    rating: '4.9',
    useCases: [
      { title: 'Shops & Petty Businesses', desc: 'Quick 1-day installation for retail shops, jewellery stores, and medical shops in Dharmapuri town and surrounding areas.' },
      { title: 'Government & Panchayat Offices', desc: 'BIS-certified installations meeting government audit standards. Full documentation provided for PSU-grade projects like our Palacode deployment.' },
      { title: 'School & College CCTV', desc: 'Government school campus surveillance with timed recording. Approved installations for district education department requirements.' },
      { title: 'Factory & Godown CCTV', desc: 'Industrial-grade IP cameras for factories in Dharmapuri. Weather-resistant housings for outdoor perimeter coverage.' },
      { title: 'Petrol Bunk & Lodge CCTV', desc: 'Forecourt cameras with vehicle capture. Indoor and outdoor coverage. Remote monitoring on mobile.' },
      { title: 'Homes & Farms', desc: 'Solar-powered 4G cameras for remote farm sites with no internet. Home CCTV with mobile remote view.' },
    ],
    keywords: ['CCTV installation Dharmapuri', 'CCTV camera Dharmapuri', 'CCTV Palacode', 'CCTV Pennagaram', 'CCTV service Dharmapuri', 'CCTV installer Dharmapuri'],
  },

  karaikudi: {
    slug: 'karaikudi',
    name: 'Karaikudi, Sivaganga District',
    shortName: 'Karaikudi',
    state: 'Tamil Nadu',
    type: 'district',
    description:
      "Karaikudi and Sivaganga district — the heart of the Chettinad region — is home to historic Chettiar mansions, banks, and thriving textile businesses. Infysmart provides professional CCTV systems tailored for the region's unique mix of heritage properties, commercial establishments, and government institutions.",
    industryFocus: 'Banks, Textile Shops, Hotels, Commercial Establishments, Government',
    areas: [
      'Karaikudi Town', 'Devakottai', 'Sivaganga', 'Manamadurai',
      'Tiruppattur (Sivaganga)', 'Kandanur', 'Kallal', 'Keeranur',
      'Ilayangudi', 'Thiruppuvanam', 'Aruppukkottai',
    ],
    sameDay: false,
    deliveryNote: 'Next-day (within 24 hrs)',
    distanceNote: '~200 km from our base — next-day service',
    reviewCount: 12,
    rating: '4.8',
    useCases: [
      { title: 'Banks & Financial Institutions', desc: 'High-security CCTV for bank branches and ATM vestibules. Compliant with RBI CCTV guidelines. DVR with long retention.' },
      { title: 'Chettinad Hotels & Heritage Stays', desc: 'Discreet outdoor cameras for heritage property exteriors. Indoor lobby and corridor coverage with aesthetic placement.' },
      { title: 'Textile & Saree Shops', desc: 'Multi-angle showroom coverage for high-value textile inventory. Billing area monitoring and anti-shoplifting setup.' },
      { title: 'Government Offices & Collectorate', desc: 'CCTV for government offices, courts, and public buildings. Compliant with government surveillance specifications.' },
      { title: 'Schools & Hospitals', desc: 'Campus security for schools and hospitals in Sivaganga district. Timed recording and remote access for administrators.' },
      { title: 'Petrol Bunks & Commercial Properties', desc: 'Forecourt and canopy cameras. Vehicle entry/exit monitoring with night vision coverage.' },
    ],
    keywords: ['CCTV installation Karaikudi', 'CCTV camera Karaikudi', 'CCTV Sivaganga', 'CCTV service Karaikudi', 'CCTV installer Karaikudi', 'security camera Karaikudi'],
  },

  puducherry: {
    slug: 'puducherry',
    name: 'Puducherry (Pondicherry)',
    shortName: 'Puducherry',
    state: 'Puducherry (UT)',
    type: 'city',
    description:
      "Puducherry's mix of French colonial heritage, IT parks, hospitality industry, and government establishments creates diverse CCTV requirements. Infysmart provides professional installations for hotels, resorts, IT companies, apartments, and government buildings across Puducherry and its districts.",
    industryFocus: 'Hotels & Resorts, IT Companies, Government, Apartments, Retail',
    areas: [
      'White Town (French Quarter)', 'Lawspet', 'Reddiyarpalayam', 'Mudaliarpet',
      'Villianur', 'Oulgaret', 'Ariyankuppam', 'Bahour',
      'Karaikal', 'Mahe', 'Yanam',
    ],
    sameDay: false,
    deliveryNote: 'Next-day (within 24 hrs)',
    distanceNote: '~170 km from our base — next-day service',
    reviewCount: 14,
    rating: '4.8',
    useCases: [
      { title: 'Hotel & Resort CCTV', desc: 'Lobby, corridor, pool area, and parking coverage. Discreet placement for heritage hotels. Integration with existing PMS systems.' },
      { title: 'IT Park & Tech Company CCTV', desc: 'IP camera networks for IT campuses. Server room monitoring, access control integration, visitor management.' },
      { title: 'Government Building CCTV', desc: 'Installations for government offices, municipal buildings, and public institutions. Compliant documentation provided.' },
      { title: 'Apartment Complex CCTV', desc: 'Gated community coverage for the growing residential zones in Lawspet, Oulgaret, and Ariyankuppam.' },
      { title: 'Retail & Restaurant CCTV', desc: 'Shop and restaurant coverage on Mission Street and MG Road. Night vision for after-hours security.' },
      { title: 'Industrial Estate CCTV', desc: 'PIPDIC industrial estate camera systems. Perimeter security for manufacturing units.' },
    ],
    keywords: ['CCTV installation Puducherry', 'CCTV camera Puducherry', 'CCTV Pondicherry', 'CCTV service Puducherry', 'CCTV for hotels Puducherry', 'security camera Puducherry'],
  },

  cuddalore: {
    slug: 'cuddalore',
    name: 'Cuddalore',
    shortName: 'Cuddalore',
    state: 'Tamil Nadu',
    type: 'district',
    description:
      "Cuddalore district is home to one of India's largest petrochemical complexes (SIPCOT Cuddalore), NLC India Limited's coal mines, and a significant coastal fisheries sector. Infysmart delivers explosion-proof and marine-grade CCTV solutions alongside standard commercial installations across the district.",
    industryFocus: 'Petrochemical SIPCOT, NLC, Fisheries, Commercial, Schools',
    areas: [
      'Cuddalore Town', 'SIPCOT Cuddalore', 'NLC Colony', 'Neyveli',
      'Chidambaram', 'Kattumannarkoil', 'Panruti', 'Srimushnam',
      'Vriddhachalam', 'Kurinjipadi', 'Bhuvanagiri',
    ],
    sameDay: false,
    deliveryNote: 'Next-day (within 24 hrs)',
    distanceNote: '~240 km from our base — next-day service',
    reviewCount: 10,
    rating: '4.8',
    useCases: [
      { title: 'SIPCOT Cuddalore Industrial CCTV', desc: 'Petrochemical and chemical plant surveillance with explosion-proof rated camera housings where required. SIPCOT audit compliance.' },
      { title: 'NLC India Ltd. & Government CCTV', desc: 'Surveillance for NLC and government facilities with BIS-certified hardware and structured documentation.' },
      { title: 'Fisheries & Harbour CCTV', desc: 'Marine-grade IP67 cameras for harbour areas and fish markets. Corrosion-resistant enclosures for coastal environments.' },
      { title: 'Schools & Colleges — Chidambaram', desc: 'Campus surveillance for educational institutions near Annamalai University and government schools.' },
      { title: 'Shops & Commercial Properties', desc: 'Quick commercial CCTV installations for shops, showrooms, and offices in Cuddalore and Chidambaram.' },
      { title: 'Apartment & Residential CCTV', desc: 'Gated community and apartment complex security in Cuddalore town and Neyveli township.' },
    ],
    keywords: ['CCTV installation Cuddalore', 'CCTV camera Cuddalore', 'SIPCOT Cuddalore CCTV', 'CCTV service Cuddalore', 'NLC CCTV Neyveli', 'security camera Cuddalore'],
  },

  madurai: {
    slug: 'madurai',
    name: 'Madurai',
    shortName: 'Madurai',
    state: 'Tamil Nadu',
    type: 'city',
    description:
      "Madurai — Tamil Nadu's second-largest city and the Temple City — has a booming commercial economy with textile wholesale markets, hospitals, engineering colleges, and a growing IT sector. Infysmart provides professional CCTV for every scale of establishment across Madurai city and its outskirts.",
    industryFocus: 'Textile Markets, Hospitals, Hotels, IT, Educational Institutions',
    areas: [
      'Mattuthavani', 'Anna Nagar', 'KK Nagar', 'Sellur', 'Palanganatham',
      'Tallakulam', 'Iyer Bungalow', 'Alagar Kovil Road', 'Bypass Road',
      'Arapalayam', 'Sattur Road', 'Melur', 'Thirumangalam',
    ],
    sameDay: false,
    deliveryNote: 'Next-day (within 24 hrs)',
    distanceNote: '~310 km from our base — next-day service',
    reviewCount: 16,
    rating: '4.8',
    useCases: [
      { title: 'Textile Market & Wholesale Shop CCTV', desc: 'High-resolution cameras for large textile warehouses and Mattuthavani market establishments. Anti-theft coverage with multi-angle views.' },
      { title: 'Hospital & Medical College CCTV', desc: 'Sensitive zone coverage for Madurai\'s major hospitals and medical colleges. 24/7 recording for security and compliance.' },
      { title: 'Hotel & Lodge CCTV', desc: 'Tourism-focused CCTV for hotels near Meenakshi Amman Temple. Lobby, corridor, and parking coverage.' },
      { title: 'Engineering College & University CCTV', desc: 'Campus-wide surveillance for colleges and universities. Timed recording with remote monitoring for management.' },
      { title: 'Apartments & Gated Community', desc: 'Residential CCTV for the growing apartment clusters in Anna Nagar, KK Nagar, and Bypass Road.' },
      { title: 'Commercial & IT Office CCTV', desc: 'Office and IT company surveillance in Madurai\'s growing commercial zones. Access control integration available.' },
    ],
    keywords: ['CCTV installation Madurai', 'CCTV camera Madurai', 'CCTV service Madurai', 'security camera Madurai', 'CCTV for hospitals Madurai', 'Hikvision dealer Madurai'],
  },

  salem: {
    slug: 'salem',
    name: 'Salem',
    shortName: 'Salem',
    state: 'Tamil Nadu',
    type: 'city',
    description:
      "Salem — the Steel City of Tamil Nadu — is a major industrial and commercial centre with a large steel industry, textile manufacturing, and a growing healthcare sector. Infysmart provides CCTV installations for Salem's steel mills, factories, hospitals, malls, and residential complexes.",
    industryFocus: 'Steel Industry, Textile, Hospitals, Commercial, Malls',
    areas: [
      'Shevapet', 'Hasthampatti', 'Fairlands', 'Attur', 'Omalur',
      'Mettur', 'Yercaud Road', 'Four Roads', 'Suramangalam',
      'Kondalampatti', 'Gugai', 'Ammapet',
    ],
    sameDay: false,
    deliveryNote: 'Next-day (within 24 hrs)',
    distanceNote: '~210 km from our base — next-day service',
    reviewCount: 13,
    rating: '4.7',
    useCases: [
      { title: 'Steel Mill & Foundry CCTV', desc: 'High-temperature rated camera housings for steel plant environments. Perimeter security and production monitoring for steel mills.' },
      { title: 'Textile Factory & Mill CCTV', desc: 'Dust-resistant IP cameras for textile weaving and spinning units. Production monitoring and access control.' },
      { title: 'Hospital & Healthcare CCTV', desc: 'Multi-department coverage for Salem\'s hospitals and medical colleges. Compliance with healthcare security standards.' },
      { title: 'Mall & Shopping Complex CCTV', desc: 'High-traffic public area coverage for malls and commercial complexes. Multi-floor NVR systems with centralized monitoring.' },
      { title: 'Educational Campus CCTV', desc: 'School and college surveillance across Salem district. Government-approved installation documentation.' },
      { title: 'Apartment & Residential CCTV', desc: 'Gated community CCTV for residential complexes in Fairlands, Hasthampatti, and Suramangalam.' },
    ],
    keywords: ['CCTV installation Salem', 'CCTV camera Salem', 'CCTV service Salem', 'security camera Salem Tamil Nadu', 'factory CCTV Salem', 'CCTV for steel mill Salem'],
  },

  trichy: {
    slug: 'trichy',
    name: 'Trichy (Tiruchirappalli)',
    shortName: 'Trichy',
    state: 'Tamil Nadu',
    type: 'city',
    description:
      "Trichy is a major industrial city anchored by BHEL's heavy engineering complex, a large government sector, and thriving commercial markets. Infysmart provides professional CCTV for Trichy's heavy industries, government offices, hospitals, and residential complexes.",
    industryFocus: 'BHEL & Heavy Engineering, Government, Hospitals, Commercial, Residential',
    areas: [
      'Srirangam', 'Woraiyur', 'Thillai Nagar', 'K.K. Nagar', 'Ariyamangalam',
      'Palpannai', 'Bharathidasan Salai', 'BHEL Nagar', 'Kattur',
      'Manachanallur', 'Lalgudi', 'Karur (nearby)',
    ],
    sameDay: false,
    deliveryNote: 'Next-day (within 24 hrs)',
    distanceNote: '~300 km from our base — next-day service',
    reviewCount: 11,
    rating: '4.8',
    useCases: [
      { title: 'BHEL & Heavy Engineering Plant CCTV', desc: 'Industrial-grade IP cameras for BHEL\'s manufacturing zones. Perimeter security with fiber optic backbone and government-compliant documentation.' },
      { title: 'Government Office & Collectorate CCTV', desc: 'Surveillance for government buildings, courts, and collectorate complexes in Trichy. BIS-certified hardware.' },
      { title: 'Hospital & Medical College CCTV', desc: 'Multi-department surveillance for Mahatma Gandhi Memorial Hospital and private hospitals. 24/7 recording.' },
      { title: 'Temple & Tourist Area CCTV', desc: 'High-traffic area cameras for Rockfort Temple surroundings. PTZ cameras for open-area monitoring.' },
      { title: 'College & University Campus CCTV', desc: 'Campus-wide installations for NIT Trichy, Bharathidasan University, and affiliated colleges.' },
      { title: 'Commercial & Apartment CCTV', desc: 'Retail and residential coverage for Thillai Nagar, K.K. Nagar, and Ariyamangalam areas.' },
    ],
    keywords: ['CCTV installation Trichy', 'CCTV camera Trichy', 'CCTV service Tiruchirappalli', 'BHEL CCTV Trichy', 'security camera Trichy', 'industrial CCTV Trichy'],
  },

  vellore: {
    slug: 'vellore',
    name: 'Vellore',
    shortName: 'Vellore',
    state: 'Tamil Nadu',
    type: 'city',
    description:
      "Vellore is known for CMC Hospital, a major tannery industry, and Vellore Institute of Technology (VIT). The city's unique blend of world-class medical infrastructure, leather manufacturing, and a huge student population creates diverse and specialized CCTV requirements.",
    industryFocus: 'Hospitals, Tanneries, Educational Institutions, Commercial',
    areas: [
      'Katpadi', 'Saidapet', 'Gandhi Nagar', 'VIT Area', 'CMC Area',
      'Bagayam', 'Kaniyambadi Road', 'Arcot Road', 'Ranipet (nearby)',
      'Gudiyatham', 'Ambur', 'Vaniyambadi',
    ],
    sameDay: false,
    deliveryNote: 'Next-day (within 24 hrs)',
    distanceNote: '~130 km from our base — next-day service',
    reviewCount: 9,
    rating: '4.8',
    useCases: [
      { title: 'CMC Hospital & Private Hospital CCTV', desc: 'Multi-wing hospital surveillance with privacy-compliant zone placement. 24/7 recording for insurance and medical audit requirements.' },
      { title: 'Tannery & Leather Industry CCTV', desc: 'Chemical-resistant camera housings for tannery environments. Perimeter security for Ranipet and Ambur leather industrial zones.' },
      { title: 'VIT & Educational Campus CCTV', desc: 'Large-campus surveillance for VIT University and affiliated colleges. Multi-building NVR with centralized monitoring.' },
      { title: 'Hotel & Lodge CCTV', desc: 'Accommodation security for the large medical tourism and student visitor population. Lobby and corridor cameras.' },
      { title: 'Commercial & Retail CCTV', desc: 'Shop and market coverage in Vellore town. Jewellery shop-grade high-resolution cameras for high-value retail.' },
      { title: 'Apartment & Residential CCTV', desc: 'Growing residential zones near VIT and CMC. Gated community and apartment surveillance.' },
    ],
    keywords: ['CCTV installation Vellore', 'CCTV camera Vellore', 'CCTV service Vellore', 'hospital CCTV Vellore', 'CCTV CMC Vellore', 'security camera Vellore'],
  },

  'ambattur-industrial-estate': {
    slug: 'ambattur-industrial-estate',
    name: 'Ambattur Industrial Estate',
    shortName: 'Ambattur Industrial Estate',
    state: 'Tamil Nadu',
    type: 'industrial',
    description:
      "Ambattur Industrial Estate is one of Chennai's oldest and largest manufacturing clusters, housing engineering, automotive, garment, and electronics factories. As a SIPCOT-affiliated zone, it demands high-compliance surveillance. Infysmart has completed multiple industrial CCTV projects across Ambattur.",
    industryFocus: 'Engineering Factories, Auto Components, Garments, Electronics, Warehouses',
    areas: [
      'Ambattur Industrial Estate Phase I', 'Ambattur Industrial Estate Phase II',
      'Padi Industrial Area', 'Thirumulaivoyal', 'Ambattur OT (Old Town)',
      'Korattur', 'Anna Nagar West', 'Mogappair Industrial Area',
    ],
    sameDay: true,
    deliveryNote: 'Same-day (Chennai team)',
    distanceNote: 'Served by our Chennai metro team',
    reviewCount: 19,
    rating: '4.9',
    useCases: [
      { title: 'Factory Floor CCTV', desc: '5MP IP cameras covering production lines. Motion-based recording to optimize 30+ day retention. AI-based intrusion detection for restricted zones.' },
      { title: 'Perimeter & Gate Security', desc: 'PTZ cameras at entry/exit gates. ANPR (number plate recognition) for vehicle logging. Boom barrier integration available.' },
      { title: 'Warehouse & Storage CCTV', desc: 'Wide-angle coverage for large storage bays. Night vision and tamper-proof camera housings.' },
      { title: 'Worker Safety Zone Monitoring', desc: 'Camera zones for safety compliance monitoring. Compliant with industrial factory safety audit requirements.' },
      { title: 'Multi-Factory Estate CCTV', desc: 'Single NVR covering multiple factory units on a shared campus. Fiber optic backbone for long cable runs.' },
      { title: 'Corporate Office CCTV within Industrial Units', desc: 'Separate camera zones for office buildings within factory campuses. Access control integration.' },
    ],
    keywords: ['CCTV installation Ambattur industrial estate', 'factory CCTV Ambattur', 'industrial CCTV Ambattur', 'CCTV Ambattur Chennai', 'warehouse CCTV Ambattur', 'security camera industrial estate'],
  },

  'guindy-industrial-estate': {
    slug: 'guindy-industrial-estate',
    name: 'Guindy Industrial Estate',
    shortName: 'Guindy Industrial Estate',
    state: 'Tamil Nadu',
    type: 'industrial',
    description:
      "Guindy Industrial Estate — located in the heart of Chennai — is home to precision engineering, auto component, and manufacturing units. Its dense layout and high-security requirements make structured IP CCTV with fiber optic backbone the standard for compliance-conscious industrial clients here.",
    industryFocus: 'Precision Engineering, Auto Components, Pharma, Manufacturing',
    areas: [
      'Guindy Industrial Estate Phase I & II', 'Ekkattuthangal', 'Saidapet',
      'Alandur', 'Ramapuram', 'Ashok Nagar Industrial Area',
    ],
    sameDay: true,
    deliveryNote: 'Same-day (Chennai team)',
    distanceNote: 'Served by our Chennai metro team',
    reviewCount: 14,
    rating: '4.9',
    useCases: [
      { title: 'Precision Engineering Factory CCTV', desc: '5MP cameras for machine shop floors. Vibration-resistant mounts for heavy machinery environments.' },
      { title: 'Auto Component Unit CCTV', desc: 'Production and quality control monitoring. Multi-angle camera setup for assembly lines.' },
      { title: 'Pharmaceutical Factory CCTV', desc: 'GMP-compliant camera placements in clean rooms. Dust-sealed camera housings. Retention logs for FDA audits.' },
      { title: 'Perimeter & Entrance CCTV', desc: 'ANPR at factory gates for vehicle logging. PTZ cameras for wide-area perimeter coverage.' },
      { title: 'Office & Admin Block CCTV', desc: 'Separate NVR zone for admin and HR offices within industrial campus.' },
      { title: 'Multi-tenant Industrial Building', desc: 'Shared surveillance infrastructure for multi-company industrial buildings with separate recording zones per tenant.' },
    ],
    keywords: ['CCTV installation Guindy industrial estate', 'factory CCTV Guindy', 'industrial CCTV Guindy Chennai', 'auto component factory CCTV', 'security camera Guindy'],
  },

  'sriperumbudur-oragadam': {
    slug: 'sriperumbudur-oragadam',
    name: 'Sriperumbudur & Oragadam',
    shortName: 'Sriperumbudur & Oragadam',
    state: 'Tamil Nadu',
    type: 'industrial',
    description:
      "Sriperumbudur and Oragadam form India's most significant automotive and electronics manufacturing corridor — home to Samsung, Hyundai, Dell, Foxconn, Renault-Nissan, and hundreds of tier-1/tier-2 vendors. Infysmart provides enterprise-grade IP CCTV solutions for this demanding industrial ecosystem.",
    industryFocus: 'Automotive, Electronics, EMS, Tier-1/2 Auto Vendors, Logistics',
    areas: [
      'Sriperumbudur SIPCOT', 'Irungattukottai SIPCOT', 'Oragadam Industrial Corridor',
      'Mahindra World City', 'Kancheepuram Bypass', 'Vallam-Vadagal',
      'Singaperumalkoil', 'Cheyyar Road',
    ],
    sameDay: true,
    deliveryNote: 'Same-day (Chennai team)',
    distanceNote: 'Served by our Chennai metro team (~50 km from Chennai)',
    reviewCount: 22,
    rating: '4.9',
    useCases: [
      { title: 'Automotive Plant CCTV', desc: '32–64 camera IP networks for large automotive assembly plants. Fiber optic backbone, ANPR at all vehicle entry points.' },
      { title: 'Electronics/EMS Factory CCTV', desc: 'Clean room compatible cameras for PCB assembly lines. Anti-static housing. Integration with factory ERP for shift-based recording.' },
      { title: 'Tier-1/Tier-2 Vendor CCTV', desc: 'Scalable IP CCTV for component supplier plants. Meeting buyer audit standards (IATF 16949, ISO 9001).' },
      { title: 'Logistics & Warehousing CCTV', desc: 'Wide-area coverage for large logistics hubs and warehouses. License plate capture at loading docks.' },
      { title: 'Perimeter & Checkpoint Security', desc: 'PTZ cameras and ANPR for industrial zone entry/exit points. 24/7 recording with cloud backup options.' },
      { title: 'Worker Canteen & Amenity CCTV', desc: 'Security surveillance for canteens, locker rooms (exterior), and amenity buildings.' },
    ],
    keywords: ['CCTV installation Sriperumbudur', 'factory CCTV Sriperumbudur', 'industrial CCTV Oragadam', 'CCTV Mahindra World City', 'security camera SIPCOT Sriperumbudur'],
  },

  'sipcot-irungattukottai': {
    slug: 'sipcot-irungattukottai',
    name: 'SIPCOT Irungattukottai',
    shortName: 'SIPCOT Irungattukottai',
    state: 'Tamil Nadu',
    type: 'industrial',
    description:
      "SIPCOT Irungattukottai — adjacent to Sriperumbudur — is a dedicated industrial estate housing pharmaceutical, auto component, and specialty chemical manufacturers. Infysmart provides SIPCOT-compliant CCTV installations including explosion-proof options for chemical plant environments.",
    industryFocus: 'Pharma, Auto Components, Specialty Chemicals, Industrial',
    areas: [
      'SIPCOT Irungattukottai Phase I & II', 'Sriperumbudur Junction',
      'Mambakkam', 'Walajabad', 'Uthiramerur',
    ],
    sameDay: true,
    deliveryNote: 'Same-day (Chennai/Sriperumbudur team)',
    distanceNote: '~50 km from Chennai — same-day service',
    reviewCount: 11,
    rating: '4.9',
    useCases: [
      { title: 'Pharmaceutical Plant CCTV', desc: 'FDA-audit-compliant camera placements. GMP clean-room compatible camera enclosures. Long-retention recording.' },
      { title: 'Chemical Factory CCTV', desc: 'Explosion-proof rated camera housings for hazardous zones. IP68 cameras for washdown areas.' },
      { title: 'Auto Component Vendor CCTV', desc: 'Production monitoring for tier-1 and tier-2 auto vendors. Meeting OEM buyer audit standards.' },
      { title: 'Perimeter & Gate CCTV', desc: 'SIPCOT zone entry/exit monitoring. ANPR cameras for vehicle logging at estate gates.' },
      { title: 'Warehouse & Storage CCTV', desc: 'Wide-angle coverage for finished goods and raw material warehouses. Night vision coverage.' },
      { title: 'Corporate Admin Block', desc: 'Separate NVR zone for admin, HR, and corporate offices within industrial campus.' },
    ],
    keywords: ['CCTV installation SIPCOT Irungattukottai', 'factory CCTV Irungattukottai', 'industrial CCTV SIPCOT', 'pharma factory CCTV Sriperumbudur', 'security camera SIPCOT'],
  },

  'sipcot-siruseri': {
    slug: 'sipcot-siruseri',
    name: 'SIPCOT IT Park Siruseri',
    shortName: 'SIPCOT Siruseri',
    state: 'Tamil Nadu',
    type: 'industrial',
    description:
      "SIPCOT IT Park Siruseri on OMR is Chennai's premier IT and software services cluster, housing MNC campuses, BPO facilities, and R&D centres. Infysmart provides enterprise-grade IP camera networks, access control integration, and server room surveillance for IT companies in Siruseri.",
    industryFocus: 'IT Companies, BPO/KPO, R&D Centres, Data Centres, Tech Parks',
    areas: [
      'SIPCOT IT Park Siruseri', 'Sholinganallur', 'Perungudi', 'Karapakkam',
      'Kelambakkam', 'Pallavaram-Thoraipakkam Road', 'OMR IT Corridor',
    ],
    sameDay: true,
    deliveryNote: 'Same-day (Chennai team)',
    distanceNote: 'Served by our Chennai metro team',
    reviewCount: 16,
    rating: '4.8',
    useCases: [
      { title: 'IT Campus & MNC Office CCTV', desc: 'Enterprise NVR with VLAN-isolated camera networks. Integration with building management systems. Facial recognition access control.' },
      { title: 'Server Room & Data Centre CCTV', desc: 'Precision camera placement for server rooms. Temperature-stable camera housings. Integration with data centre DCIM platforms.' },
      { title: 'BPO / Call Centre CCTV', desc: 'Agent floor surveillance with privacy-compliant placement. Visitor management and reception camera coverage.' },
      { title: 'Car Park & Multi-storey CCTV', desc: 'Full basement and multi-storey parking coverage. ANPR at entry/exit barriers. Low-light cameras for underground parking.' },
      { title: 'Access Control Integration', desc: 'Seamless CCTV + biometric access control for high-security floors. Visitor management camera trigger systems.' },
      { title: 'Campus Perimeter & Boundary', desc: 'PTZ cameras for large IT campus perimeter. Motion-triggered alerts for after-hours intrusion.' },
    ],
    keywords: ['CCTV installation SIPCOT Siruseri', 'IT park CCTV OMR', 'office CCTV Siruseri', 'security camera SIPCOT IT park', 'CCTV for IT company Chennai OMR', 'data centre CCTV Chennai'],
  },

  'kanchipuram-vallam': {
    slug: 'kanchipuram-vallam',
    name: 'Kanchipuram & Vallam',
    shortName: 'Kanchipuram & Vallam',
    state: 'Tamil Nadu',
    type: 'district',
    description:
      "Kanchipuram district — renowned for silk sarees and textile manufacturing — also hosts a significant industrial corridor at Vallam, Walajabad, and Sriperumbudur. Infysmart provides CCTV for silk weaving cooperatives, industrial units, temples, and the growing residential areas of Kanchipuram.",
    industryFocus: 'Silk Weavers, Textile, Industrial Estates, Temples, Commercial',
    areas: [
      'Kanchipuram Town', 'Vallam', 'Walajabad', 'Uthiramerur',
      'Madurantakam', 'Chengalpattu', 'Tambaram (nearby)', 'Singaperumalkoil',
    ],
    sameDay: true,
    deliveryNote: 'Same-day (Chennai/Sriperumbudur team)',
    distanceNote: '~75 km from Chennai — same-day service',
    reviewCount: 13,
    rating: '4.8',
    useCases: [
      { title: 'Silk Weaving Co-operative CCTV', desc: 'Production floor cameras for silk weaving units. Anti-theft coverage for high-value inventory. Integration with cooperative management systems.' },
      { title: 'Temple & Heritage Site CCTV', desc: 'Discreet, weatherproof cameras for temple premises. Crowd monitoring during festivals. Compatible with temple trust security requirements.' },
      { title: 'Industrial Estate — Vallam CCTV', desc: 'Factory and warehouse surveillance for Vallam-Vadagal industrial corridor. Meeting Sriperumbudur zone buyer audit standards.' },
      { title: 'Jewellery & Textile Shop CCTV', desc: 'High-resolution showroom cameras for Kanchipuram\'s famous silk saree shops and jewellery retailers.' },
      { title: 'School & Educational CCTV', desc: 'Campus surveillance for Kanchipuram district schools and colleges. Government-approved installation.' },
      { title: 'Residential & Apartment CCTV', desc: 'Growing residential zones in Chengalpattu and Kanchipuram. Gated community and apartment surveillance.' },
    ],
    keywords: ['CCTV installation Kanchipuram', 'CCTV camera Kanchipuram', 'CCTV Vallam industrial', 'security camera Kanchipuram', 'factory CCTV Vallam', 'CCTV Chengalpattu'],
  },

  karnataka: {
    slug: 'karnataka',
    name: 'Karnataka',
    shortName: 'Karnataka',
    state: 'Karnataka',
    type: 'region',
    description:
      "Infysmart serves Karnataka's diverse security needs — from Bangalore's sprawling IT corridors and Electronic City factories to Mysore's tourism and heritage sector, and the steel industry belt around Hosapete and Bellary. Our cross-border GST billing and Karnataka-experienced teams ensure seamless service.",
    industryFocus: 'IT Parks, Factories, Hotels & Tourism, Steel Industry, Commercial',
    areas: [
      'Bengaluru (All zones)', 'Electronic City & Hosur Road', 'Whitefield & ITPB',
      'Mysuru (Mysore)', 'Tumkur', 'Hosapete & Bellary', 'Mangaluru',
      'Hubli-Dharwad', 'Belagavi (Belgaum)', 'Davangere', 'Shimoga',
    ],
    sameDay: false,
    deliveryNote: 'Next-day (within 24 hrs for Bangalore)',
    distanceNote: 'Bangalore is ~90 km from our Hosur base',
    reviewCount: 22,
    rating: '4.8',
    useCases: [
      { title: 'IT Park & Tech Company CCTV — Bangalore', desc: 'Enterprise IP camera networks for MNC offices in Electronic City, Whitefield, and Outer Ring Road. Access control integration.' },
      { title: 'Factory & Industrial Unit CCTV', desc: 'Industrial CCTV for manufacturing units across Karnataka. SIPCOT-equivalent audit compliance documentation.' },
      { title: 'Hotel & Tourism CCTV — Mysore', desc: 'Heritage hotel and resort surveillance for Mysore\'s tourism sector. Discreet camera placement for aesthetic environments.' },
      { title: 'Steel Industry CCTV — Hosapete', desc: 'High-temperature rated cameras for Hospet-Bellary steel plants. Perimeter security for large mining and smelting complexes.' },
      { title: 'Commercial & Retail CCTV', desc: 'Shop and mall surveillance across Karnataka\'s tier-1 and tier-2 cities. Remote monitoring for multi-location businesses.' },
      { title: 'Government & Municipal CCTV', desc: 'Installations for Karnataka government offices and municipal buildings. BIS-certified hardware with formal documentation.' },
    ],
    keywords: ['CCTV installation Karnataka', 'CCTV service Karnataka', 'CCTV Bangalore', 'CCTV Mysore', 'CCTV Tumkur', 'industrial CCTV Karnataka', 'security camera Karnataka'],
  },

  bangalore: {
    slug: 'bangalore',
    name: 'Bengaluru (Bangalore)',
    shortName: 'Bangalore',
    state: 'Karnataka',
    type: 'city',
    description:
      "Bangalore — India's Silicon Valley — is Infysmart's primary Karnataka service city. Our Hosur headquarters is just ~90 km from Electronic City via Hosur Road, enabling rapid deployment for IT companies, factories on the Hosur Road corridor, and residential complexes across South and Central Bangalore.",
    industryFocus: 'IT Parks, Factories, Apartments, Retail, Hospitals',
    areas: [
      'Electronic City Phase I & II', 'Whitefield & ITPB', 'Hosur Road', 'Sarjapur Road',
      'Bannerghatta Road', 'Anekal & Attibele', 'HSR Layout', 'Koramangala',
      'BTM Layout', 'JP Nagar', 'Jayanagar', 'Banashankari', 'Kengeri',
    ],
    sameDay: false,
    deliveryNote: 'Next-day (within 24 hrs)',
    distanceNote: '~90 km from our Hosur base via Hosur Road',
    reviewCount: 22,
    rating: '4.8',
    useCases: [
      { title: 'IT Office & MNC Campus CCTV', desc: 'Enterprise NVR with IP camera networks. VLAN isolation, server room cameras, access control integration for Electronic City and Whitefield campuses.' },
      { title: 'Factory & Industrial CCTV — Electronic City', desc: 'Manufacturing unit CCTV along Hosur Road corridor. Same engineering standards as our Hosur SIPCOT deployments.' },
      { title: 'Apartment & Gated Community CCTV', desc: 'Full-complex surveillance for Bangalore\'s growing apartment clusters in HSR Layout, JP Nagar, and Sarjapur Road.' },
      { title: 'Hospital & Healthcare CCTV', desc: 'Multi-department camera coverage for Bangalore hospitals. Compliance with NABH and healthcare security standards.' },
      { title: 'Retail & Mall CCTV', desc: 'High-traffic area coverage for malls and retail chains across Bangalore. Multi-branch centralized monitoring.' },
      { title: 'Startup Office CCTV', desc: 'Affordable 4–8 camera setups for startups in Koramangala, HSR Layout, and Indiranagar. Quick 1-day installation.' },
    ],
    keywords: ['CCTV installation Bangalore', 'CCTV camera Bangalore', 'CCTV Electronic City', 'CCTV Whitefield', 'security camera Bangalore', 'Hikvision dealer Bangalore', 'CCTV AMC Bangalore'],
  },

  'hosapete-tumkur': {
    slug: 'hosapete-tumkur',
    name: 'Hosapete & Tumkur',
    shortName: 'Hosapete & Tumkur',
    state: 'Karnataka',
    type: 'region',
    description:
      "Hosapete (Vijayanagara district) is the gateway to the Bellary-Hospet iron ore and steel belt — one of India's most significant heavy industry zones. Tumkur, a rapidly industrializing city north of Bangalore, hosts auto components and food processing units. Infysmart provides industrial and commercial CCTV for both cities.",
    industryFocus: 'Steel & Iron Ore (Hosapete), Auto Components, Food Processing (Tumkur)',
    areas: [
      'Hosapete Town', 'Sandur & Bellary (nearby)', 'Koppal', 'Hampi Road',
      'Tumkur Town', 'Kyatsandra Industrial Area', 'Tiptur', 'Gubbi', 'Sira',
    ],
    sameDay: false,
    deliveryNote: '1–2 days',
    distanceNote: 'Hosapete ~330 km · Tumkur ~160 km from our base',
    reviewCount: 8,
    rating: '4.8',
    useCases: [
      { title: 'Steel Plant & Iron Ore CCTV — Hosapete', desc: 'High-temperature rated camera housings for steel and iron ore processing plants. Explosion-proof options for smelting zones.' },
      { title: 'Mining Area Perimeter CCTV', desc: 'Wide-area PTZ cameras for open-cast mining perimeters. Ruggedized solar-powered cameras for remote sites.' },
      { title: 'Auto Component Unit CCTV — Tumkur', desc: 'Production monitoring for Tumkur\'s auto component factories. Meeting OEM supplier audit requirements.' },
      { title: 'Food Processing Unit CCTV', desc: 'Washdown-rated IP69K cameras for food processing and dairy factories in Tumkur. FSSAI-audit compliant placement.' },
      { title: 'Tourism & Heritage CCTV — Hampi', desc: 'Cameras for hotel and resort properties near Hampi World Heritage Site. Weatherproof, discreet placement.' },
      { title: 'Commercial & Residential CCTV', desc: 'Shop, apartment, and office installations in Hosapete and Tumkur towns. Quick installation, mobile remote view.' },
    ],
    keywords: ['CCTV installation Hosapete', 'CCTV camera Tumkur', 'steel plant CCTV Hosapete', 'industrial CCTV Bellary', 'security camera Tumkur Karnataka', 'CCTV Hampi'],
  },
};

export const allSlugs = Object.keys(locationData);
