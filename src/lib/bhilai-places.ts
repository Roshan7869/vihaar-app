import { Place } from "@/types";

// ============================================
// Bhilai Tourism & Temples Database
// Reference Point: VIP Nagar, Bhilai - Coordinates: [81.4397, 21.1981]
// ============================================

export const bhilaiPlaces: Place[] = [
    // 1. DEOBALODA MAHADEV TEMPLE (3 km away) - Closest ancient temple
    {
        id: "deobaloda-mahadev-temple",
        title: "Deobaloda Mahadev Temple",
        subtitle: "13th-century Shiva Temple",
        location: "Deobaloda Village",
        district: "Bhilai",
        category: "temple",
        rating: 4.6,
        reviewCount: 287,
        likes: 1456,
        views_count: 3890,
        images: [
            "https://images.unsplash.com/photo-1599687352537-f2e0bf68e1d3?w=600&q=80",
            "https://images.unsplash.com/photo-1606596055424-fed3782ad398?w=600&q=80"
        ],
        description: "An ancient Shiva temple built in the 13th century by Kalchuri kings in the beautiful Navrang Mandap Nagar style. The temple houses a sacred Shivling placed three feet below the sanctum sanctorum. The Maha Shivaratri fair held here is renowned throughout the region. The temple features unique architectural elements and is surrounded by mythological significance with stories of secret passages leading to Arang.",
        short_description: "13th-century ancient Shiva temple with unique Kalchuri architecture and Maha Shivaratri celebrations",
        tags: ["ancient", "shiva-temple", "historical", "family-friendly", "free-entry", "spiritual"],
        distance: "3 km",
        entryFee: "Free",
        bestTime: "Oct - Mar",
        timings: {
            opens_at: "05:00 AM",
            closes_at: "09:00 PM",
            closed_days: []
        },
        price_info: { is_free: true, entry_fee: 0, currency: "INR" },
        google_maps_url: "https://maps.google.com/?q=Deobaloda+Mahadev+Temple+Bhilai"
    },

    // 2. MAITRI BAGH ZOO & PARK (5 km away)
    {
        id: "maitri-bagh-zoo",
        title: "Maitri Bagh Zoo & Park",
        subtitle: "Premier Zoo & Recreational Park",
        location: "Sector-1, Bhilai",
        district: "Bhilai",
        category: "nature",
        rating: 4.4,
        reviewCount: 1240,
        likes: 3456,
        views_count: 8900,
        images: [
            "https://images.unsplash.com/photo-1612317584292-a00ff9b88a81?w=600&q=80",
            "https://images.unsplash.com/photo-1605985535370-0cd5a237bf16?w=600&q=80"
        ],
        description: "A well-maintained zoo and park established by the Bhilai Steel Plant in collaboration with Russian architects. The park features exotic animal species including tigers, lions, elephants, and diverse bird species. Highlights include a musical fountain, toy train rides, landscaped gardens, man-made water bodies for boating, and a children's garden. Perfect for family outings and nature lovers seeking recreational activities.",
        short_description: "Premier zoo and park with exotic animals, toy train, musical fountain, and beautiful gardens",
        tags: ["zoo", "family-friendly", "recreational", "toy-train", "musical-fountain", "paid-entry"],
        distance: "5 km",
        entryFee: "₹75 / person",
        bestTime: "Oct - Mar",
        timings: {
            opens_at: "09:00 AM",
            closes_at: "06:00 PM",
            closed_days: ["Monday"]
        },
        price_info: { is_free: false, entry_fee: 75, currency: "INR" },
        google_maps_url: "https://maps.google.com/?q=Maitri+Bagh+Zoo+Bhilai"
    },

    // 3. CHANDI MANDIR TEMPLE (8 km away)
    {
        id: "chandi-mandir-temple",
        title: "Chandi Mandir Temple",
        subtitle: "Ancient Goddess Temple",
        location: "Near Durg City",
        district: "Bhilai",
        category: "temple",
        rating: 4.5,
        reviewCount: 432,
        likes: 2100,
        views_count: 5200,
        images: [
            "https://images.unsplash.com/photo-1609437281142-812a5f36f795?w=600&q=80"
        ],
        description: "One of the oldest and most significant temples in the Bhilai region, dedicated to Goddess Chandi (Durga). The temple has a serene ambiance with beautiful traditional architecture that reflects the region's cultural heritage. It attracts devotees during various Hindu festivals, especially during Navratri. The peaceful environment and spiritual energy make it a preferred pilgrimage site for both locals and tourists.",
        short_description: "Ancient Goddess Chandi temple with serene architecture and spiritual significance",
        tags: ["goddess-temple", "ancient", "serene", "spiritual", "free-entry", "family-friendly"],
        distance: "8 km",
        entryFee: "Free",
        bestTime: "Sep - Oct (Navratri)",
        timings: {
            opens_at: "06:00 AM",
            closes_at: "08:30 PM",
            closed_days: []
        },
        price_info: { is_free: true, entry_fee: 0, currency: "INR" },
        google_maps_url: "https://maps.google.com/?q=Chandi+Mandir+Bhilai"
    },

    // 4. DHOLKAL GANESH TEMPLE (12 km away)
    {
        id: "dholkal-ganesh-temple",
        title: "Dholkal Ganesh Temple",
        subtitle: "1000-Year-Old Hilltop Temple",
        location: "Dholkal Hills",
        district: "Bhilai",
        category: "temple",
        rating: 4.7,
        reviewCount: 654,
        likes: 2890,
        views_count: 7100,
        images: [
            "https://images.unsplash.com/photo-1599571300451-4d6b0861d28a?w=600&q=80"
        ],
        description: "Nestled amidst lush greenery on the Dholkal hills, this ancient temple is home to a 1000-year-old idol of Lord Ganesha. The temple is a significant spiritual destination and a challenging trekking spot for adventure enthusiasts. The hilltop location offers panoramic views of the surrounding landscape and forests. The combination of spiritual significance and natural beauty makes it a unique pilgrimage site that attracts both devotees and nature lovers.",
        short_description: "1000-year-old Ganesh idol in hilltop temple surrounded by greenery and trekking trails",
        tags: ["ganesh-temple", "ancient-idol", "trekking", "hill-top", "nature", "spiritual"],
        distance: "12 km",
        entryFee: "Free",
        bestTime: "Oct - Feb",
        timings: {
            opens_at: "05:00 AM",
            closes_at: "09:00 PM",
            closed_days: []
        },
        price_info: { is_free: true, entry_fee: 0, currency: "INR" },
        google_maps_url: "https://maps.google.com/?q=Dholkal+Ganesh+Temple+Bhilai"
    },

    // 5. BAMBALESHWARI TEMPLE DONGARGARH (40 km away)
    {
        id: "bambaleshwari-temple",
        title: "Bambaleshwari Temple",
        subtitle: "Hilltop Goddess Temple",
        location: "Dongargarh",
        district: "Rajnandgaon",
        category: "temple",
        rating: 4.8,
        reviewCount: 876,
        likes: 4200,
        views_count: 9800,
        images: [
            "https://images.unsplash.com/photo-1584395894874-345bc8511904?w=600&q=80"
        ],
        description: "A significant religious site perched atop a hill in Dongargarh, approximately 40 km from Bhilai. The temple is dedicated to Goddess Bambaléshwari and offers stunning views of the surrounding landscape and valleys. The temple complex features intricate carvings and traditional architecture. It's accessible via stone steps that provide a moderate climbing challenge. The hilltop location provides breathtaking panoramic vistas, making it a favorite destination for both spiritual seekers and photography enthusiasts.",
        short_description: "Hilltop goddess temple with stunning valley views and intricate temple architecture",
        tags: ["hilltop-temple", "goddess-temple", "scenic-views", "pilgrimage", "historical"],
        distance: "40 km",
        entryFee: "Free",
        bestTime: "Oct - Mar",
        timings: {
            opens_at: "05:00 AM",
            closes_at: "09:30 PM",
            closed_days: []
        },
        price_info: { is_free: true, entry_fee: 0, currency: "INR" },
        google_maps_url: "https://maps.google.com/?q=Bambaleshwari+Temple+Dongargarh"
    },

    // 6. SIYADEVI WATERFALL & TEMPLE (30 km away)
    {
        id: "siyadevi-waterfall",
        title: "Siyadevi Waterfall & Temple",
        subtitle: "Scenic Waterfall & Temple",
        location: "Near Balod",
        district: "Balod",
        category: "nature",
        rating: 4.6,
        reviewCount: 523,
        likes: 2456,
        views_count: 6700,
        images: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
        ],
        description: "A picturesque destination featuring a temple dedicated to Goddess Sita surrounded by natural beauty and lush forests. The waterfall here is particularly spectacular during monsoon season (July-February) when water cascades dramatically from the cliffs. The temple complex is located amidst serene natural surroundings with walking trails through dense forest. It's an ideal spot for trekking, picnicking, and nature photography, combining spiritual experiences with outdoor adventure.",
        short_description: "Scenic temple and waterfall in forested area, best visited during monsoon season",
        tags: ["waterfall", "temple", "trekking", "scenic", "monsoon", "picnic-spot"],
        distance: "30 km",
        entryFee: "Free",
        bestTime: "July - Feb",
        timings: {
            opens_at: "06:00 AM",
            closes_at: "06:00 PM",
            closed_days: []
        },
        price_info: { is_free: true, entry_fee: 0, currency: "INR" },
        google_maps_url: "https://maps.google.com/?q=Siyadevi+Waterfall+Balod"
    },

    // 7. TANDULA DAM (60 km away)
    {
        id: "tandula-dam",
        title: "Tandula Dam",
        subtitle: "Scenic Reservoir & Picnic Spot",
        location: "Tandula Village",
        district: "Balod",
        category: "nature",
        rating: 4.3,
        reviewCount: 412,
        likes: 1890,
        views_count: 4500,
        images: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
        ],
        description: "Located on the Tandula River near Balod, Tandula Dam is a popular recreational destination offering stunning views of the reservoir and surrounding landscapes. The dam is surrounded by picturesque scenery with lush green hills and peaceful water bodies. It's an ideal spot for picnics, nature walks, and wildlife observation. The serene environment and natural beauty make it perfect for family outings, photography sessions, and escaping the city hustle.",
        short_description: "Scenic dam with reservoir views, ideal for picnics and nature walks",
        tags: ["dam", "reservoir", "picnic", "nature-walk", "photography", "scenic-views"],
        distance: "60 km",
        entryFee: "Free",
        bestTime: "Oct - Mar",
        timings: {
            opens_at: "07:00 AM",
            closes_at: "05:30 PM",
            closed_days: []
        },
        price_info: { is_free: true, entry_fee: 0, currency: "INR" },
        google_maps_url: "https://maps.google.com/?q=Tandula+Dam+Balod"
    },

    // 8. DHAMDHA FORT & TEMPLES (35 km away)
    {
        id: "dhamdha-fort",
        title: "Dhamdha Fort & Ancient Temples",
        subtitle: "Medieval Fort & Temple Complex",
        location: "Dhamdha Village",
        district: "Durg",
        category: "historical",
        rating: 4.4,
        reviewCount: 289,
        likes: 1456,
        views_count: 3800,
        images: [
            "https://images.unsplash.com/photo-1606468174478-8e37bbe5c25d?w=600&q=80"
        ],
        description: "An ancient historical site featuring the Prachin Kila (oldest fort) and intricate temple structures showcasing incredible traditional architecture. The site is steeped in regional history and is home to multiple temples with ornate stone carvings and detailed sculptures. The fort ruins provide insights into the region's medieval period and the architectural styles of ancient kingdoms. It's a perfect destination for history enthusiasts, architecture lovers, and photographers exploring India's rich cultural heritage.",
        short_description: "Ancient fort with carved temples featuring medieval architecture and historical significance",
        tags: ["fort", "temples", "ancient", "architectural", "historical-site", "photography"],
        distance: "35 km",
        entryFee: "Free",
        bestTime: "Oct - Mar",
        timings: {
            opens_at: "06:00 AM",
            closes_at: "06:00 PM",
            closed_days: []
        },
        price_info: { is_free: true, entry_fee: 0, currency: "INR" },
        google_maps_url: "https://maps.google.com/?q=Dhamdha+Fort+Chhattisgarh"
    },

    // 9. PASHARWANATH TIRTH - JAIN TEMPLE (20 km away)
    {
        id: "pasharwanath-tirth",
        title: "Pasharwanath Tirth",
        subtitle: "Serene Jain Pilgrimage",
        location: "Nagpura",
        district: "Durg",
        category: "temple",
        rating: 4.7,
        reviewCount: 567,
        likes: 2800,
        views_count: 6400,
        images: [
            "https://images.unsplash.com/photo-1599571300451-4d6b0861d28a?w=600&q=80"
        ],
        description: "A prominent Jain pilgrimage site known for its serene environment and stunning architecture. The temple complex features intricately carved structures with remarkable stonework and detailed religious sculptures. It provides a peaceful retreat for spiritual reflection and meditation. The complex includes beautifully designed halls, courtyards, and gardens promoting a tranquil atmosphere. It attracts Jain pilgrims and spirituality seekers from across India and abroad.",
        short_description: "Serene Jain temple with intricate carvings and peaceful meditation environment",
        tags: ["jain-temple", "pilgrimage", "serene", "meditation", "architectural"],
        distance: "20 km",
        entryFee: "Free",
        bestTime: "Year-round",
        timings: {
            opens_at: "05:00 AM",
            closes_at: "09:00 PM",
            closed_days: []
        },
        price_info: { is_free: true, entry_fee: 0, currency: "INR" },
        google_maps_url: "https://maps.google.com/?q=Pasharwanath+Tirth+Nagpura"
    },

    // 10. UWASAGGHARAM PARSHWA TEERTH (15 km away)
    {
        id: "uwasaggharam-parshwa-teerth",
        title: "Uwasaggharam Parshwa Teerth",
        subtitle: "Modern Jain Temple Complex",
        location: "Nagpura",
        district: "Durg",
        category: "temple",
        rating: 4.5,
        reviewCount: 445,
        likes: 2200,
        views_count: 5300,
        images: [
            "https://images.unsplash.com/photo-1603693542136-d7d1dfeb33f2?w=600&q=80"
        ],
        description: "Founded in 1995, this is a famous Jain pilgrim spot with beautiful architecture and serene surroundings. Located on the banks of the Sheonath River in Nagpura, the temple complex combines spiritual significance with modern facilities. The site features ornate temple structures, landscaped gardens, a yoga center, and guest accommodations. The lakeside location provides a peaceful environment for meditation and spiritual practice, attracting both pilgrims and those seeking spiritual retreat.",
        short_description: "Modern Jain temple complex on riverbank with yoga center and guest facilities",
        tags: ["jain-temple", "pilgrimage", "lakeside", "yoga-center", "guest-house"],
        distance: "15 km",
        entryFee: "Free",
        bestTime: "Year-round",
        timings: {
            opens_at: "05:00 AM",
            closes_at: "09:00 PM",
            closed_days: []
        },
        price_info: { is_free: true, entry_fee: 0, currency: "INR" },
        google_maps_url: "https://maps.google.com/?q=Uwasaggharam+Parshwa+Teerth"
    },

    // 11. CIVIC CENTER BHILAI (7 km away)
    {
        id: "bhilai-civic-center",
        title: "Bhilai Civic Center",
        subtitle: "Shopping & Entertainment Hub",
        location: "Sector 3, Bhilai",
        district: "Bhilai",
        category: "art_craft",
        rating: 4.2,
        reviewCount: 1850,
        likes: 5600,
        views_count: 12000,
        images: [
            "https://images.unsplash.com/photo-1559034823-cd4628902d4a?w=600&q=80"
        ],
        description: "The vibrant heart of Bhilai, the Civic Center is a bustling shopping and entertainment hub offering a complete urban experience. The complex features modern shopping malls, restaurants, cafes, and entertainment options suitable for all ages. It's known for its lively atmosphere, especially in the evenings with street performances and cultural events. The area showcases the modern development of Bhilai while maintaining its cultural identity with local shops and traditional eateries.",
        short_description: "Vibrant shopping and entertainment hub with malls, restaurants, and cultural venues",
        tags: ["shopping", "entertainment", "dining", "cultural-hub", "family-friendly"],
        distance: "7 km",
        entryFee: "Free",
        bestTime: "Year-round",
        timings: {
            opens_at: "10:00 AM",
            closes_at: "10:00 PM",
            closed_days: []
        },
        price_info: { is_free: true, entry_fee: 0, currency: "INR" },
        google_maps_url: "https://maps.google.com/?q=Civic+Center+Bhilai"
    },

    // 12. GANGA MAIYA TEMPLE (18 km away)
    {
        id: "ganga-maiya-temple",
        title: "Ganga Maiya Temple",
        subtitle: "Sacred River Goddess Temple",
        location: "Jaumala",
        district: "Durg",
        category: "temple",
        rating: 4.4,
        reviewCount: 334,
        likes: 1678,
        views_count: 4200,
        images: [
            "https://images.unsplash.com/photo-1599571300451-4d6b0861d28a?w=600&q=80"
        ],
        description: "A sacred temple dedicated to Goddess Ganga with deep spiritual significance in the local Hindu community. The temple is located in a scenic area with peaceful surroundings and traditional architecture. The site holds importance during various Hindu festivals and seasons. Devotees visit the temple for spiritual blessing and meditation, making it an important pilgrimage destination. The temple's location and architecture reflect the region's religious and cultural heritage.",
        short_description: "Sacred goddess temple with spiritual significance and traditional architecture",
        tags: ["river-temple", "goddess-temple", "spiritual", "pilgrimage", "scenic"],
        distance: "18 km",
        entryFee: "Free",
        bestTime: "Year-round",
        timings: {
            opens_at: "05:00 AM",
            closes_at: "08:30 PM",
            closed_days: []
        },
        price_info: { is_free: true, entry_fee: 0, currency: "INR" },
        google_maps_url: "https://maps.google.com/?q=Ganga+Maiya+Temple"
    },

    // 13. RAJIV LOCHAN TEMPLE (10 km away)
    {
        id: "rajiv-lochan-temple",
        title: "Shri Rajiv Lochan Mandir",
        subtitle: "Peaceful Lord Vishnu Temple",
        location: "Sector 5, Bhilai",
        district: "Bhilai",
        category: "temple",
        rating: 4.6,
        reviewCount: 567,
        likes: 2345,
        views_count: 5600,
        images: [
            "https://images.unsplash.com/photo-1599571300451-4d6b0861d28a?w=600&q=80"
        ],
        description: "A beautiful and peaceful temple dedicated to Lord Rajiv Lochan (Lord Vishnu). The temple features traditional Hindu architecture with serene surroundings and well-maintained premises. It's a favorite spot for morning and evening prayers, attracting families and devotees from nearby areas. The temple provides a calm and meditative atmosphere in the bustling city environment, making it an ideal place for spiritual contemplation and family worship.",
        short_description: "Peaceful Lord Vishnu temple with serene environment and family-friendly atmosphere",
        tags: ["lord-vishnu", "family-friendly", "spiritual", "free-entry", "peaceful"],
        distance: "10 km",
        entryFee: "Free",
        bestTime: "Year-round",
        timings: {
            opens_at: "05:30 AM",
            closes_at: "09:00 PM",
            closed_days: []
        },
        price_info: { is_free: true, entry_fee: 0, currency: "INR" },
        google_maps_url: "https://maps.google.com/?q=Rajiv+Lochan+Temple+Bhilai"
    },

    // 14. KHARKHARA DAM (50 km away)
    {
        id: "kharkhara-dam",
        title: "Kharkhara Dam",
        subtitle: "1128m Engineering Marvel",
        location: "Kharkhara River",
        district: "Durg",
        category: "nature",
        rating: 4.3,
        reviewCount: 301,
        likes: 1567,
        views_count: 3900,
        images: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
        ],
        description: "An impressive engineering marvel, Kharkhara Dam spans 1128 meters across the Kharkhara River. The dam is surrounded by scenic landscapes and provides beautiful views, especially during monsoon season when water levels are high. It's a popular picnic destination for families and groups, offering activities like boating, fishing, and riverside walks. The area is perfect for nature photography and leisurely outdoor activities, providing an escape from urban life.",
        short_description: "1128-meter-long dam with scenic views, perfect for picnics and photography",
        tags: ["dam", "picnic", "scenic-views", "engineering-marvel", "photography"],
        distance: "50 km",
        entryFee: "Free",
        bestTime: "July - Oct",
        timings: {
            opens_at: "07:00 AM",
            closes_at: "05:30 PM",
            closed_days: []
        },
        price_info: { is_free: true, entry_fee: 0, currency: "INR" },
        google_maps_url: "https://maps.google.com/?q=Kharkhara+Dam"
    },

    // 15. BHILAI STEEL PLANT (6 km away) - Industrial Tourism
    {
        id: "bhilai-steel-plant",
        title: "Bhilai Steel Plant",
        subtitle: "Industrial Tourism Experience",
        location: "Bhilai Steel Plant Campus",
        district: "Bhilai",
        category: "event",
        rating: 4.5,
        reviewCount: 876,
        likes: 3456,
        views_count: 8900,
        images: [
            "https://images.unsplash.com/photo-1581092162562-40038f41dd12?w=600&q=80"
        ],
        description: "One of India's largest and most significant steel manufacturing facilities, the Bhilai Steel Plant is a marvel of industrial engineering. Guided tours are available for visitors interested in understanding the steel-making process, industrial development, and India's manufacturing capabilities. The plant showcases various sections including Coke Oven Battery, Blast Furnaces, Rail & Structure Mill, Plate Mill, and Wire Rod Mill. Tours provide insights into modern technology, industrial processes, and the plant's contribution to India's infrastructure development.",
        short_description: "India's largest steel plant with guided industrial tours and engineering exhibitions",
        tags: ["industrial-tour", "educational", "guided-tour", "engineering", "photographic"],
        distance: "6 km",
        entryFee: "₹50 / person",
        bestTime: "Weekdays",
        timings: {
            opens_at: "09:00 AM",
            closes_at: "04:30 PM",
            closed_days: ["Saturday", "Sunday"]
        },
        price_info: { is_free: false, entry_fee: 50, currency: "INR" },
        google_maps_url: "https://maps.google.com/?q=Bhilai+Steel+Plant"
    }
];

// ============================================
// Categorized Exports
// ============================================

// Temples & Religious Sites
export const bhilaiTemples = bhilaiPlaces.filter(
    place => place.category === "temple"
);

// Nature & Outdoor (waterfalls, dams, parks)
export const bhilaiNature = bhilaiPlaces.filter(
    place => place.category === "nature"
);

// Historical Sites
export const bhilaiHistorical = bhilaiPlaces.filter(
    place => place.category === "historical"
);

// Modern Attractions (civic center, steel plant)
export const bhilaiAttractions = bhilaiPlaces.filter(
    place => place.category === "art_craft" || place.category === "event"
);

// Helper to get nearby places sorted by distance
export function getBhilaiPlacesByDistance(): Place[] {
    return [...bhilaiPlaces].sort((a, b) => {
        const distA = parseInt(a.distance?.replace(/\D/g, "") || "0");
        const distB = parseInt(b.distance?.replace(/\D/g, "") || "0");
        return distA - distB;
    });
}
