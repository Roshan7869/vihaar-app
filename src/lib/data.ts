import { FeaturedPlace, Place, User, WishlistItem, CategoryFilter } from "@/types";

// ============================================
// Category Filters
// ============================================
export const categoryFilters: CategoryFilter[] = [
    { id: "all", label: "All", isActive: true },
    { id: "trending", label: "Trending" },
    { id: "temples", label: "Temples" },
    { id: "tribal", label: "Tribal Art" },
    { id: "food", label: "Food Courts" },
];

export const exploreFilters: CategoryFilter[] = [
    { id: "temple", label: "Temple" },
    { id: "historical", label: "Historical Place" },
    { id: "natural", label: "Natural Place" },
    { id: "food", label: "Cafe & Food" },
];

// ============================================
// Featured Places (Carousel)
// ============================================
export const featuredPlaces: FeaturedPlace[] = [
    {
        id: "bastar-dussehra",
        title: "Bastar Dussehra 2024",
        subtitle: "Experience the 75-day long festival celebrating tribal deities.",
        location: "Jagdalpur",
        district: "Bastar",
        category: "festival",
        rating: 4.9,
        reviewCount: 280,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAnIgkRce0fLWTWkYWROgdWIDDwcFOEJiFzOTRCm6R3fcd3VH1F4fUWur5tCCJ32QaU9oubQxMh_m1c7kOJ33Xi8YoA6_gtct7w8_leVPiLnwWpD3W4R3lcNJ1meBF70KjqilUo2Zq6NDslEdWFzjBrqFMv5OgPf7aqFdqimLTgwoo1XFFcHMvi4Byajys6VU-CIK_96OrMwvBYGA2ytR2Au9XV1k877UtEivt9oFz7zH_YTtJeRGq2Q4X_2lwGu8Kh3ZLanbiYZ1J-"
        ],
        description: "Experience the 75-day long festival celebrating tribal deities.",
        tag: "Festival",
        tagType: "festival",
        eventDate: "Oct 12-24",
    },
    {
        id: "laxman-temple",
        title: "Laxman Temple",
        subtitle: "Explore the finest brick temple of ancient India.",
        location: "Sirpur",
        district: "Mahasamund",
        category: "heritage",
        rating: 4.7,
        reviewCount: 156,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBEAz2lmGYG_r7VYjtX6AOV8tPcepo1aNZNG9zRKL3TRpaDp22irmFt1mq_SVkeCAnXIk8_UKxkEAURFYtPIPSUaXKFZKADv_O07khu2D7l8eFUl7ULFu553NccDJCqRiMIYytR6HI95qTRKO0Q_5RyUkhZmRPhWi8fp9BsKLGwFkxjuJI06GQgkuzbKyacB95NeMukg8K4a3iekWkfXxN7pHAaHNHsvdazPlSniLz7eOLAYoC51VPI0vbVcCsV6ca6jnmY0cyPieQN"
        ],
        description: "Explore the finest brick temple of ancient India.",
        tag: "Heritage",
        tagType: "heritage",
        eventDate: "Open Daily",
    },
];

// ============================================
// Hidden Gems (Grid)
// ============================================
export const hiddenGems: Place[] = [
    {
        id: "chitrakote-falls",
        title: "Chitrakote Falls",
        subtitle: "The Niagara of India",
        location: "Jagdalpur",
        district: "Bastar",
        category: "waterfalls",
        rating: 4.8,
        reviewCount: 120,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBUzbwnnWYwa4M_Nfo0GYd7xQpExUdIHFBFUyw3aHnr8QB-PmjcHVO1wcn9rluDLoM4oHBc4n-9uTxPEOSvgCvg0vEbRfPyQK4VHuab0Ga1dp5vbNMfSkdw2bMwDGfKw8uWU7I-41j-erd1usHnfUsRs-4CAGkLQw2bpMISQ871W0aDH1jyDnQatqrgyImMg6nCvpYimhsijbomFgLHX1-4TX7mzScuInvoK7yuG5vllCGd2B_YOJ0kTJ2faGMRXr_Bwp3fIKeUrwyh"
        ],
        description: 'Often called the "Niagara of India", Chitrakote is the widest waterfall in India.',
        bestTime: "July - Oct",
        entryFee: "₹50 / person",
        isBookmarked: true,
    },
    {
        id: "mungeli-bada",
        title: "Mungeli Bada",
        subtitle: "Famous Street Food",
        location: "Mungeli",
        district: "Mungeli",
        category: "food",
        rating: 4.5,
        reviewCount: 89,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDEWAojWJ0US3uDsO7Xzqaueg3aDEsUHTeZ8VjHMHAJh1qNLfVObUngNP_iLMU18HXwgkiSwKSh3wauYmyIcEv5RDx-bS_jZE5lSXTWHn4Q1b7U27sH4LTZnkKcxOkbZs2RK9-TmHKCjdbeFGRIl42Ja2xN-DsTQTxynS5Gjj61qsuSG_1y6UugHQ5owc4J343KVTTepheElos3gCobtFhrFg5aS5rHoFA4djkevH3zm9ydP6itXUgDv6fW0mJgv4o_hLsITXk9z_Y-"
        ],
        description: "Famous for its delicious street food and local delicacies.",
    },
    {
        id: "kutumsar-caves",
        title: "Kutumsar Caves",
        subtitle: "Ancient Limestone Caves",
        location: "Kanger Valley",
        district: "Bastar",
        category: "caves",
        rating: 4.6,
        reviewCount: 102,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCKRS69Sykgz5_Tz6IEOad9r9Dw8oU7z8KI1v8j0qIY-NxKqnVoHBOHaCOrJONnsdg6qIRmUnNW40IviUeIaevX-Re8tmqNR5n8Kvdmlou0G3D0wLi9Ha-VCEOj6Zu6xBW2TPHy_SGx-7AVt03lylDHckSRo665GUCcKPOSgxrUOBnBGdhVRMSBBb5lDLtphRgFpckpJ1vmPFM--qgXk2ug9k7uVgtxl00FcA7geM8QU7978viiiSpwPJfTyDxljhE6ht2t38MGrRlO"
        ],
        description: "Ancient limestone caves with stunning stalactites and stalagmites.",
        isBookmarked: true,
    },
    {
        id: "kondagaon-arts",
        title: "Kondagaon Arts",
        subtitle: "Tribal Handicrafts",
        location: "Kondagaon",
        district: "Kondagaon",
        category: "tribal",
        rating: 4.4,
        reviewCount: 67,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBL5ORNk_LCsiX9mzmmBsTabOpwZkDlu-lMMwIjZ3wV-SocZ0B7rQ5Fyh9RZkWjp7vGLWVknNWaAy333zaySPuiyDMnu4aCbmSpIfMGzuzvud7umXfb6DCyyDV1JtvPTscPDPSk4uvg4_8WIEEIJ2NMqFxG0vQyAGxbQckkQvnowLSvGlLrrLYol8FrOcpXGcmKHA_ON7TrweGLKSWpwHz7lA2k3_lF8SbRfo1LWIYT5JBitFJ_6JeRVoH03IRX9cffXpdixHZmiIlz"
        ],
        description: "Experience the rich tribal heritage through traditional bell metal crafts.",
    },
];

// ============================================
// Explore Places (Swipeable Cards)
// ============================================
export const explorePlaces: Place[] = [
    {
        id: "chitrakote-falls",
        title: "Chitrakote Falls",
        subtitle: "The Niagara of India",
        location: "Bastar District",
        district: "Bastar",
        category: "nature",
        rating: 4.8,
        reviewCount: 120,
        distance: "2.1 km away",
        likes: 1200,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDx00Tm5GlOiP29dq6Fx3_yV5dXdSz3Tm6T6GnypVW6wGjyWsEWb2fytjm7NLsGGQWAR1HfMU-ULy4kX_rpVoZT4I58RkwK1Y0sX7y1v_ZhhnUOzK-Ko3fOBfnalMjOOSKquyWAHpo1qhHIClbCmgreCiOeTM7NqeXIyq_-LQCPvd_QQKA0kY89j5-NJi5HBIxFLuGNuBsyUCZRxv3jG2kzwX-u5dNJM1yugQkBeXRKsYztVClh7J-CiLlGq9PYMiR3lWjx-xwseWQ9"
        ],
        description: "Often called the 'Niagara of India', this massive waterfall creates a stunning mist and rainbows.",
        bestTime: "July - Oct",
        entryFee: "₹50 / person",
    },
    {
        id: "bhoramdeo-temple",
        title: "Bhoramdeo Temple",
        subtitle: "Khajuraho of Chhattisgarh",
        location: "Kabirdham",
        district: "Kabirdham",
        category: "temple",
        rating: 4.6,
        reviewCount: 89,
        distance: "4.5 km away",
        likes: 856,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAhMO86AU1XXZ4bhthXFU9GGia52d6wXMlZAW7AS67ZTDAl-4DheM0RLBeGY5apxlv_iyO-8mf2jUKxo3qqoroyseR-38ybQ9Qd4imIR2pMNzJt6IlnjQVpjyv8JREGg4IG4u0v7AK9VA7ATeDLiHjd9XJ_bwIaPbNaHnpxz-stGxq0ZDkVph9DajmcRCl-QP5bBCn60sqMqobBEneTCjKLnVsBxho9OjMIy-B2YqbNEQ3yCZsZQ-z0OzYKu2tfpSo2aOklHESp2n3m"
        ],
        description: "An ancient temple dedicated to Lord Shiva, known for its exquisite erotic carvings resembling Khajuraho.",
    },
    {
        id: "bastar-dussehra-explore",
        title: "Bastar Dussehra",
        subtitle: "75-Day Festival",
        location: "Jagdalpur",
        district: "Bastar",
        category: "festival",
        rating: 4.9,
        reviewCount: 280,
        distance: "12 km",
        likes: 3400,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCBIMXLqrUy0wdUvWPuMT98dH97NcIaeF_odP-qZR6rFMgLQSQvIVRBVYDu_EawjXYZzqj9QWv_Y3gUSmwDUlYl4bvlu1Gc1wRmbkzo_Z3Qyf_Uytx8rN4y0l4qaatOCvmUBGUITM1mrcheSnYgHqzofMGQZSfseg_QC6gKqOpnjS6tBN7vVEujLBDGjvtlmOOOCCJYJJi5jtRIooCbVmoMwVRLC2vAdM9ceaudpxSKcLKP32ZsUuxyhThYbS7H_KupgzfHgbZe2Ctt"
        ],
        description: "Experience the world's longest running festival spanning 75 days, celebrating tribal culture and deities.",
    },
    {
        id: "kanger-valley",
        title: "Kanger Valley",
        subtitle: "National Park",
        location: "Bastar",
        district: "Bastar",
        category: "nature",
        rating: 4.7,
        reviewCount: 145,
        distance: "18 km away",
        likes: 920,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDCKP9-9_jaWvNymWpFK2uT-Tuj9jEYtnLBp6ia_c71HM55ocIYVFa4sd6RVvUwq2_sL4mTEAHl9y3lRoZAPPAQrfdZES3wD7giBkTI8GE50q04Xyzsp-Ue4j3BTd0vr0oaSbR15sh1Gb0JyZQfcdmbiyn9u65pkMvtIesp49X_EXjfBn2t2KngyGxN433Z9nSvST1ZxWISw6G7fmWiXDEBnW4NLmL6_bNbrI84QbQ-9XaAGESW_EQg66bTyyjTLrBYf6CVCpTTB8wR"
        ],
        description: "A biodiversity hotspot featuring limestone caves, dense forests, and the famous Tirathgarh waterfalls.",
    },
];

// ============================================
// User Profile Data
// ============================================
export const currentUser: User = {
    id: "user-1",
    name: "Aditya Singh",
    location: "Raipur, Chhattisgarh",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-ODYKur4KFVkcZtPyn2Yn8rS1a1szWGwHGIiXptgqzEKGnNo6jZnjTmJ4YruhjpZZXtVAsqTkY6BEkJHTFGzAePKMuJxKSE8k9zKzrJS5CzXw74oEFw3d04Hxr2WT-ol1ZfGX2WZHyU_F-mqAcL7Cb8538RunH4h0Nc_RvD-MbBW5BctwoU5VkEbRACynpEu-L3MGQGA_YzrfuBOCJZ_UCpJf7C-3wBrF4v3equuQZEBsmKtLTuJ0sUWSg1N2t-TQPt-e4VQ2VmIm",
    totalVisits: 12,
    level: "gold",
    levelPercentile: "Top 5%",
    wishlist: ["chitrakote-falls", "bhoramdeo-temple", "mainpat"],
    visited: ["bastar-dussehra", "laxman-temple"],
};

export const wishlistItems: WishlistItem[] = [
    {
        id: "chitrakote-falls",
        title: "Chitrakote Falls",
        subtitle: "The Niagara of India",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXmxi-pwA62LXnTbuuPC_kHtE3pmZ0azxHi4DcscWypfrU54frujwS-u1uylX4sG0unTTBET8LdC1vxx3jWwo5blBUSZuBDHlhKH1EBmmMDVJ6IhSTE-9uKV0w6q6KdPzMlunaHzsmpmNwN3omIS5Oa_YmkaHSWn7s2AULgMkpQLDF5vQaFod2iTRhicZjamAoxaWr_6YZdzCPeIQr5sKXim4Qxcvi78iV1qh1q2k4aCPyhTW67JUf1bkOuQK561PzUPnZ2XumXOV_",
        distance: "284 km",
        rating: 4.8,
    },
    {
        id: "bhoramdeo-temple",
        title: "Bhoramdeo Temple",
        subtitle: "Khajuraho of Chhattisgarh",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbPS4T0ChsvEof1nLus3O5rKkiARmE_-WPkIcAkhMQjtIJn9kV_QwJ_Lk7t7-ZU2VJqjMqbBDf9G5fMI8ehV9PmdSK9ddftOmc8ZQ6qGMm5yxqI1uyfh8TPpqg_B3yp39ajGZu8kr1ZEKlfttWjap6QlUraav0iqvu3CaEiS_Eg7O9AoMojXqA95bfAdo7v9f2aKqdNDf_USj3G3vQV_V7-oxvb4pIpMSfQqApodIRLorDG_6762ZUhNZOxfNMMuNQGDNB6YYOkNVA",
        distance: "115 km",
        rating: 4.6,
    },
    {
        id: "mainpat",
        title: "Mainpat Hill Station",
        subtitle: "Shimla of Chhattisgarh",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATIA6fsXmBr9y1m6M-lp-6eh3nyChKffKDrk5U711SPhhz0VH9poOUZUdkhqR1Iube4AnyCxlwf90a_7RgujxEXjAVklf1WkbMZgQ6E_iZh6Dgr8Nq6yz-6kF3OD_Y0SylRAlyYaWt5D65j--tZHV7EvehWhNmZF81v2bf6k4VJgWjAntPQ174RAFRKfE8OGFab7OVqcSEfTnZWHDjSjYwv7m_SL_Ki8Rr69xrOcBqZUKDVi3ikfuewbDSuDR_5bn8sT6ErlQyVNyl",
        distance: "380 km",
        rating: 4.7,
    },
];

// ============================================
// Place Details (for detail pages)
// ============================================
export const placeDetails: Record<string, Place> = {
    "chitrakote-falls": {
        id: "chitrakote-falls",
        title: "Chitrakote Waterfalls",
        subtitle: "The Niagara of India",
        location: "Jagdalpur, Chhattisgarh",
        district: "Bastar",
        category: "nature",
        rating: 4.8,
        reviewCount: 120,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDqAYW-nQalnfboSE8qBWJQ-FWhJh3vQWsCHmb2rnPmK2331G3jWn1LKqaNxzZ5Rchw610CvNOpvthTiM-V-inH8PGaArAkY3L44TJbNOxIXw8AZUMVfq6Xnl0fc6cS-mJ6JW5VrOb06-KZ8_oQSb4Ge0TN-ONiBQvsKtjr86HiM8jrD4jgld-GCZkB7HZF8kr3N6xucO6WKAvsvqRqUHbwQAzHuMDszibGGQTAqQPodBZkfpA1v-zpXHYk-5X-BRMzGExH4DMTl2id"
        ],
        description: 'Often called the "Niagara of India", Chitrakote is the widest waterfall in India. The Indravati River falls from a height of 98 feet forming a horseshoe shape that is best viewed during the monsoon season.',
        bestTime: "July - Oct",
        entryFee: "₹50 / person",
    },
};

// Helper function to get place by ID
export function getPlaceById(id: string): Place | undefined {
    return placeDetails[id] || hiddenGems.find(p => p.id === id) || explorePlaces.find(p => p.id === id);
}
