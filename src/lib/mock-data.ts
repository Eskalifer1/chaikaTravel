import type { Room } from "@/types";

export const rooms: Room[] = [
  // --- Standard room, badge: frequently-booked, multiple rate plans including discount ---
  {
    id: "room-standard-city",
    name: "Standard City View Room",
    description:
      "A well-appointed room with a panoramic view of the city skyline. Ideal for solo travellers and couples looking for comfort at an accessible price.",
    badge: "frequently-booked",
    availableCount: 3,
    maxOccupancy: 2,
    areaSqm: 22,
    amenities: [
      { key: "wifi", label: "Free Wi-Fi" },
      { key: "tv", label: "Smart TV" },
      { key: "air-conditioning", label: "Air Conditioning" },
    ],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800",
    ],
    ratePlans: [
      {
        id: "rp-standard-city-nonref",
        roomId: "room-standard-city",
        price: 89,
        currency: "USD",
        cancellation: { type: "non-refundable" },
      },
      {
        id: "rp-standard-city-flex",
        roomId: "room-standard-city",
        price: 109,
        currency: "USD",
        cancellation: {
          type: "free-cancellation",
          deadline: "2026-09-13",
        },
      },
      {
        id: "rp-standard-city-bb",
        roomId: "room-standard-city",
        price: 129,
        originalPrice: 149,
        currency: "USD",
        cancellation: {
          type: "free-cancellation",
          deadline: "2026-09-13",
        },
        meal: { type: "breakfast", label: "Breakfast Included" },
      },
    ],
  },

  // --- Deluxe, badge: best-value, discount, all-inclusive rate ---
  {
    id: "room-deluxe-garden",
    name: "Deluxe Garden Suite",
    description:
      "Spacious suite opening onto a private terrace overlooking the hotel gardens. Perfect for a romantic getaway or a relaxing family stay.",
    badge: "best-value",
    availableCount: 5,
    maxOccupancy: 3,
    areaSqm: 38,
    amenities: [
      { key: "wifi", label: "Free Wi-Fi" },
      { key: "tv", label: "Smart TV" },
      { key: "air-conditioning", label: "Air Conditioning" },
      { key: "mini-bar", label: "Mini Bar" },
      { key: "breakfast", label: "Breakfast Available" },
    ],
    images: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
    ],
    ratePlans: [
      {
        id: "rp-deluxe-garden-nonref",
        roomId: "room-deluxe-garden",
        price: 159,
        originalPrice: 199,
        currency: "USD",
        cancellation: { type: "non-refundable" },
      },
      {
        id: "rp-deluxe-garden-flex",
        roomId: "room-deluxe-garden",
        price: 189,
        currency: "USD",
        cancellation: {
          type: "free-cancellation",
          deadline: "2026-09-14",
        },
      },
      {
        id: "rp-deluxe-garden-hb",
        roomId: "room-deluxe-garden",
        price: 239,
        originalPrice: 279,
        currency: "USD",
        cancellation: {
          type: "free-cancellation",
          deadline: "2026-09-14",
        },
        meal: { type: "half-board", label: "Half Board (Breakfast & Dinner)" },
      },
      {
        id: "rp-deluxe-garden-ai",
        roomId: "room-deluxe-garden",
        price: 299,
        currency: "USD",
        cancellation: {
          type: "free-cancellation",
          deadline: "2026-09-10",
        },
        meal: { type: "all-inclusive", label: "All Inclusive" },
      },
    ],
  },

  // --- Junior Suite, badge: upgrade, no available count (unknown availability) ---
  {
    id: "room-junior-suite",
    name: "Junior Suite",
    description:
      "An elegant junior suite featuring a separate living area, king-size bed, and a luxurious marble bathroom with a soaking tub.",
    badge: "upgrade",
    maxOccupancy: 2,
    areaSqm: 48,
    amenities: [
      { key: "wifi", label: "Free Wi-Fi" },
      { key: "tv", label: "65-inch Smart TV" },
      { key: "air-conditioning", label: "Air Conditioning" },
      { key: "mini-bar", label: "Mini Bar" },
      { key: "parking", label: "Free Valet Parking" },
    ],
    images: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800",
      "https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=800",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
    ],
    ratePlans: [
      {
        id: "rp-junior-nonref",
        roomId: "room-junior-suite",
        price: 249,
        currency: "USD",
        cancellation: { type: "non-refundable" },
      },
      {
        id: "rp-junior-flex",
        roomId: "room-junior-suite",
        price: 289,
        originalPrice: 319,
        currency: "USD",
        cancellation: {
          type: "free-cancellation",
          deadline: "2026-09-12",
        },
        meal: { type: "breakfast", label: "Breakfast Included" },
      },
    ],
  },

  // --- Executive Suite, badge: lowest-price, very limited availability (1 room) ---
  {
    id: "room-executive-suite",
    name: "Executive Suite",
    description:
      "Our flagship executive suite on the top floor. Features floor-to-ceiling windows, a private jacuzzi, and dedicated butler service.",
    badge: "lowest-price",
    availableCount: 1,
    maxOccupancy: 4,
    areaSqm: 85,
    amenities: [
      { key: "wifi", label: "Free Wi-Fi" },
      { key: "tv", label: "75-inch Smart TV" },
      { key: "air-conditioning", label: "Climate Control" },
      { key: "mini-bar", label: "Stocked Mini Bar" },
      { key: "pool", label: "Private Rooftop Pool Access" },
      { key: "gym", label: "24h Gym Access" },
      { key: "parking", label: "Private Garage" },
      { key: "breakfast", label: "Daily Breakfast" },
    ],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
    ],
    ratePlans: [
      {
        id: "rp-exec-nonref",
        roomId: "room-executive-suite",
        price: 549,
        originalPrice: 699,
        currency: "USD",
        cancellation: { type: "non-refundable" },
      },
      {
        id: "rp-exec-flex-bb",
        roomId: "room-executive-suite",
        price: 649,
        originalPrice: 749,
        currency: "USD",
        cancellation: {
          type: "free-cancellation",
          deadline: "2026-09-10",
        },
        meal: { type: "breakfast", label: "Breakfast Included" },
      },
      {
        id: "rp-exec-fb",
        roomId: "room-executive-suite",
        price: 799,
        currency: "USD",
        cancellation: {
          type: "free-cancellation",
          deadline: "2026-09-10",
        },
        meal: { type: "full-board", label: "Full Board (3 Meals Daily)" },
      },
    ],
  },

  // --- Edge case: room with no badge and no availableCount ---
  {
    id: "room-economy-single",
    name: "Economy Single Room",
    description:
      "Compact and functional room designed for solo business travellers who value efficiency. Everything you need, nothing you don't.",
    maxOccupancy: 1,
    areaSqm: 14,
    amenities: [
      { key: "wifi", label: "Free Wi-Fi" },
      { key: "tv", label: "TV" },
    ],
    images: [
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
    ],
    ratePlans: [
      {
        id: "rp-economy-single-nonref",
        roomId: "room-economy-single",
        price: 59,
        currency: "USD",
        cancellation: { type: "non-refundable" },
      },
      {
        id: "rp-economy-single-flex",
        roomId: "room-economy-single",
        price: 75,
        currency: "USD",
        cancellation: {
          type: "free-cancellation",
          deadline: "2026-09-15",
        },
      },
    ],
  },

  // --- Edge case: large family room, max 6 guests, all amenities ---
  {
    id: "room-family-suite",
    name: "Family Suite",
    description:
      "Thoughtfully designed for families, this two-bedroom suite includes bunk beds, a kitchenette, and a spacious lounge area with child-friendly furnishings.",
    badge: "frequently-booked",
    availableCount: 2,
    maxOccupancy: 6,
    areaSqm: 72,
    amenities: [
      { key: "wifi", label: "Free Wi-Fi" },
      { key: "tv", label: "Two Smart TVs" },
      { key: "air-conditioning", label: "Air Conditioning" },
      { key: "breakfast", label: "Kids Eat Free Breakfast" },
      { key: "pool", label: "Kids Pool Access" },
      { key: "parking", label: "Free Parking" },
    ],
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800",
    ],
    ratePlans: [
      {
        id: "rp-family-nonref",
        roomId: "room-family-suite",
        price: 219,
        currency: "USD",
        cancellation: { type: "non-refundable" },
      },
      {
        id: "rp-family-flex",
        roomId: "room-family-suite",
        price: 259,
        currency: "USD",
        cancellation: {
          type: "free-cancellation",
          deadline: "2026-09-14",
        },
      },
      {
        id: "rp-family-bb",
        roomId: "room-family-suite",
        price: 299,
        originalPrice: 339,
        currency: "USD",
        cancellation: {
          type: "free-cancellation",
          deadline: "2026-09-14",
        },
        meal: { type: "breakfast", label: "Breakfast for All Guests" },
      },
    ],
  },

  // --- Edge case: single rate plan only (no choice), no meal, no badge ---
  {
    id: "room-accessible",
    name: "Accessible Double Room",
    description:
      "Fully accessible room designed to meet the highest mobility standards. Roll-in shower, lowered furnishings, and wide doorways throughout.",
    availableCount: 2,
    maxOccupancy: 2,
    areaSqm: 30,
    amenities: [
      { key: "wifi", label: "Free Wi-Fi" },
      { key: "tv", label: "Smart TV" },
      { key: "air-conditioning", label: "Air Conditioning" },
    ],
    images: [
      "https://images.unsplash.com/photo-1622866306950-81d17097d458?w=800",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
    ],
    ratePlans: [
      {
        id: "rp-accessible-flex",
        roomId: "room-accessible",
        price: 115,
        currency: "USD",
        cancellation: {
          type: "free-cancellation",
          deadline: "2026-09-16",
        },
      },
    ],
  },

  // --- Edge case: deeply discounted (big originalPrice gap), badge: best-value ---
  {
    id: "room-penthouse",
    name: "Penthouse Panorama",
    description:
      "An extraordinary double-level penthouse wrapping three sides of the building. Includes a private infinity pool, outdoor kitchen, and 360° city views.",
    badge: "best-value",
    availableCount: 1,
    maxOccupancy: 5,
    areaSqm: 140,
    amenities: [
      { key: "wifi", label: "Dedicated Fibre Wi-Fi" },
      { key: "tv", label: "Cinema Screen" },
      { key: "air-conditioning", label: "Smart Climate System" },
      { key: "mini-bar", label: "Full Bar" },
      { key: "pool", label: "Private Infinity Pool" },
      { key: "gym", label: "In-suite Fitness Equipment" },
      { key: "parking", label: "Two Private Parking Spaces" },
      { key: "breakfast", label: "Private Chef Breakfast" },
    ],
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800",
    ],
    ratePlans: [
      {
        id: "rp-penthouse-nonref",
        roomId: "room-penthouse",
        price: 999,
        originalPrice: 1499,
        currency: "USD",
        cancellation: { type: "non-refundable" },
      },
      {
        id: "rp-penthouse-flex",
        roomId: "room-penthouse",
        price: 1199,
        originalPrice: 1499,
        currency: "USD",
        cancellation: {
          type: "free-cancellation",
          deadline: "2026-09-08",
        },
        meal: { type: "all-inclusive", label: "All Inclusive with Private Chef" },
      },
    ],
  },

  // --- Edge case: ocean-view, badge: upgrade, very tight deadline for free cancellation ---
  {
    id: "room-ocean-view",
    name: "Superior Ocean View Room",
    description:
      "Wake up to unobstructed ocean views from your private balcony. Light-filled interiors with coastal décor and premium bedding.",
    badge: "upgrade",
    availableCount: 4,
    maxOccupancy: 2,
    areaSqm: 28,
    amenities: [
      { key: "wifi", label: "Free Wi-Fi" },
      { key: "tv", label: "Smart TV" },
      { key: "air-conditioning", label: "Air Conditioning" },
      { key: "mini-bar", label: "Mini Bar" },
    ],
    images: [
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
    ],
    ratePlans: [
      {
        id: "rp-ocean-nonref",
        roomId: "room-ocean-view",
        price: 145,
        currency: "USD",
        cancellation: { type: "non-refundable" },
      },
      {
        id: "rp-ocean-flex-tight",
        roomId: "room-ocean-view",
        price: 175,
        currency: "USD",
        // Deadline is same day as check-in — edge case for UI display
        cancellation: {
          type: "free-cancellation",
          deadline: "2026-09-16",
        },
      },
      {
        id: "rp-ocean-bb",
        roomId: "room-ocean-view",
        price: 199,
        originalPrice: 229,
        currency: "USD",
        cancellation: {
          type: "free-cancellation",
          deadline: "2026-09-14",
        },
        meal: { type: "breakfast", label: "Breakfast Included" },
      },
    ],
  },

  // --- Edge case: no badge, very high occupancy (conference/group room), single image ---
  {
    id: "room-conference-suite",
    name: "Conference & Residence Suite",
    description:
      "A hybrid living and working suite with a built-in boardroom for up to 8 people. Ideal for executive retreats or long-stay business guests.",
    availableCount: 1,
    maxOccupancy: 8,
    areaSqm: 110,
    amenities: [
      { key: "wifi", label: "Dedicated Business Wi-Fi" },
      { key: "tv", label: "4K Presentation Screen" },
      { key: "air-conditioning", label: "Independent Zone Control" },
      { key: "mini-bar", label: "Complimentary Mini Bar" },
      { key: "parking", label: "Two Parking Spaces" },
      { key: "gym", label: "Gym Access" },
    ],
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"],
    ratePlans: [
      {
        id: "rp-conf-nonref",
        roomId: "room-conference-suite",
        price: 479,
        currency: "USD",
        cancellation: { type: "non-refundable" },
      },
      {
        id: "rp-conf-flex",
        roomId: "room-conference-suite",
        price: 549,
        currency: "USD",
        cancellation: {
          type: "free-cancellation",
          deadline: "2026-09-09",
        },
      },
      {
        id: "rp-conf-fb",
        roomId: "room-conference-suite",
        price: 649,
        originalPrice: 699,
        currency: "USD",
        cancellation: {
          type: "free-cancellation",
          deadline: "2026-09-09",
        },
        meal: { type: "full-board", label: "Full Board with Meeting Catering" },
      },
    ],
  },

  // --- Edge case: budget hostel-style, 0 children allowed (maxOccupancy 1), many rate plans ---
  {
    id: "room-studio-pod",
    name: "Studio Pod",
    description:
      "A cleverly designed micro-studio with a built-in Murphy bed, fold-out desk, and everything optimised for the minimalist traveller.",
    availableCount: 8,
    maxOccupancy: 1,
    areaSqm: 10,
    amenities: [
      { key: "wifi", label: "Free Wi-Fi" },
      { key: "air-conditioning", label: "Air Conditioning" },
    ],
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800",
    ],
    ratePlans: [
      {
        id: "rp-pod-nonref",
        roomId: "room-studio-pod",
        price: 39,
        currency: "USD",
        cancellation: { type: "non-refundable" },
      },
      {
        id: "rp-pod-flex",
        roomId: "room-studio-pod",
        price: 49,
        currency: "USD",
        cancellation: {
          type: "free-cancellation",
          deadline: "2026-09-15",
        },
      },
    ],
  },

  // --- Edge case: large discount but non-refundable only (no flexible rate available) ---
  {
    id: "room-superior-twin",
    name: "Superior Twin Room",
    description:
      "Classically furnished twin room with two queen beds, ideal for colleagues sharing or friends travelling together.",
    badge: "lowest-price",
    availableCount: 6,
    maxOccupancy: 3,
    areaSqm: 32,
    amenities: [
      { key: "wifi", label: "Free Wi-Fi" },
      { key: "tv", label: "Smart TV" },
      { key: "air-conditioning", label: "Air Conditioning" },
      { key: "breakfast", label: "Breakfast Available" },
    ],
    images: [
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
    ],
    ratePlans: [
      {
        id: "rp-twin-nonref-only",
        roomId: "room-superior-twin",
        price: 99,
        originalPrice: 179,
        currency: "USD",
        cancellation: { type: "non-refundable" },
      },
      {
        id: "rp-twin-bb",
        roomId: "room-superior-twin",
        price: 125,
        originalPrice: 199,
        currency: "USD",
        cancellation: { type: "non-refundable" },
        meal: { type: "breakfast", label: "Breakfast Included" },
      },
    ],
  },
];
