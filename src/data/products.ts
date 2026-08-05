export interface GlassesVariant {
  id: string;
  name: string;
  colorHex: string;
  colorName: string;
  badge?: string;
}

export interface GlassesStorage {
  id: string;
  size: string;
  priceAdd: number;
  description: string;
}

export interface GlassesLens {
  id: string;
  name: string;
  priceAdd: number;
  type: string;
}

export interface RecordingGlassesProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  badge: string;
  rating: number;
  reviewsCount: number;
  basePrice: number;
  originalPrice: number;
  description: string;
  features: string[];
  specs: {
    videoResolution: string;
    audio: string;
    battery: string;
    weight: string;
    connectivity: string;
    waterResistance: string;
  };
  variants: GlassesVariant[];
  storageOptions: GlassesStorage[];
  lensOptions: GlassesLens[];
  images: {
    hero: string;
    front: string;
    side: string;
    lifestyle: string;
    angle3D: string;
  };
  hardwareHotspots: {
    id: string;
    title: string;
    description: string;
    x: number; // percentage
    y: number; // percentage
  }[];
}

export const RECORDING_GLASSES_PRODUCTS: RecordingGlassesProduct[] = [
  {
    id: "odyssey-pro-titanium",
    slug: "pro-titanium-4k",
    name: "Odyssey Pro Titanium 4K",
    tagline: "The Flagship 4K HDR Voice-Activated Smart Recording Glasses",
    badge: "Flagship Edition",
    rating: 4.9,
    reviewsCount: 1248,
    basePrice: 349,
    originalPrice: 429,
    description:
      "Crafted from aerospace-grade ultra-lightweight titanium (42g). Experience seamless hands-free 4K HDR video capture, 3D spatial audio recording, and instant AI voice memory sync with SpokenOdyssey vault.",
    features: [
      "Ultra-HD 4K HDR Video @ 60 FPS with Gyro Stabilization",
      "Dual Directional Beamforming Microphones with Wind Noise Reduction",
      "Open-Ear Spatial Audio Speakers with Private Sound Boundary",
      "Privacy LED Indicator Light (Automated On-Air Glow)",
      "Touch Temple Gesture Controls & Voice Command Instant Capture",
      "12-Hour Continuous Battery + Quick-Charge Magnetic Case",
    ],
    specs: {
      videoResolution: "4K Ultra-HD (3840x2160) @ 60fps",
      audio: "Dual Beamforming Mics + Spatial Open-Ear Audio",
      battery: "12 Hours Active Use (Case provides 36 hours total)",
      weight: "42g (Aerospace Titanium Frame)",
      connectivity: "Wi-Fi 6 + Bluetooth 5.3 + Instant Vault Sync",
      waterResistance: "IPX4 Sweat & Weather Resistant",
    },
    variants: [
      { id: "onyx-black", name: "Onyx Black", colorHex: "#111827", colorName: "Onyx Black", badge: "Most Popular" },
      { id: "obsidian-silver", name: "Obsidian Silver", colorHex: "#9CA3AF", colorName: "Obsidian Silver" },
      { id: "midnight-indigo", name: "Midnight Indigo", colorHex: "#4A3AFF", colorName: "Midnight Indigo", badge: "Exclusive" },
    ],
    storageOptions: [
      { id: "64gb", size: "64 GB", priceAdd: 0, description: "Holds ~10,000 HD Photos / 4 Hours 4K Video" },
      { id: "128gb", size: "128 GB", priceAdd: 49, description: "Holds ~25,000 HD Photos / 10 Hours 4K Video" },
      { id: "256gb", size: "256 GB", priceAdd: 99, description: "Holds ~60,000 HD Photos / 24 Hours 4K Video" },
    ],
    lensOptions: [
      { id: "blue-light", name: "Clear Blue-Light Filter", priceAdd: 0, type: "Everyday Indoor & Screen Protection" },
      { id: "polarized-sun", name: "Polarized Sun UV400", priceAdd: 29, type: "Outdoor Sun Protection & Anti-Glare" },
      { id: "prescription-ready", name: "Prescription Compatible Mount", priceAdd: 39, type: "Ready for Optometrist Lenses" },
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80",
      front: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80",
      side: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=80",
      lifestyle: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=80",
      angle3D: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80",
    },
    hardwareHotspots: [
      { id: "camera", title: "4K Ultrawide Lens", description: "120° Field of View with hardware optical stabilization and automatic low-light enhancement.", x: 28, y: 35 },
      { id: "microphones", title: "Dual Beam Mics", description: "Studio-grade directional microphones isolate your voice while cancelling ambient wind noise.", x: 48, y: 48 },
      { id: "touch", title: "Touch Temple Sensor", description: "Tap to record, swipe for volume, hold to trigger Instant AI Memory Vault Sync.", x: 72, y: 42 },
      { id: "speaker", title: "Open-Ear Acoustic Chamber", description: "Rich spatial audio delivered directly to your ear canals without blocking external surroundings.", x: 84, y: 55 },
    ],
  },
  {
    id: "odyssey-sport-polarized",
    slug: "sport-polarized-edition",
    name: "Odyssey Sport Polarized Edition",
    tagline: "Action-Ready HD Recording Glasses for Outdoor Adventures",
    badge: "Active Sport",
    rating: 4.8,
    reviewsCount: 842,
    basePrice: 279,
    originalPrice: 329,
    description:
      "Engineered for outdoor athletes, cyclists, and travelers. Features IPX5 water resistance, anti-slip rubberized grips, and polarized UV400 lenses to capture intense outdoor memories.",
    features: [
      "Full HD 1080p Ultra-Smooth Action Video @ 60 FPS",
      "IPX5 Sweat & Water-Splash Resistance",
      "Polarized Shatterproof UV400 Sun Lenses Included",
      "Anti-Slip Ergonomic Rubber Temples for Active Grip",
      "10-Hour High-Capacity Battery Pack",
    ],
    specs: {
      videoResolution: "Full HD (1920x1080) @ 60fps",
      audio: "Wind-Shielded Stereo Microphones",
      battery: "10 Hours Active Outdoor Recording",
      weight: "46g (Impact-Resistant Polymer)",
      connectivity: "Bluetooth 5.3 + Quick Mobile Sync",
      waterResistance: "IPX5 High Water & Sweat Resistance",
    },
    variants: [
      { id: "stealth-matte", name: "Stealth Matte Black", colorHex: "#1F2937", colorName: "Stealth Matte Black" },
      { id: "cyber-amber", name: "Cyber Amber", colorHex: "#D97706", colorName: "Cyber Amber" },
      { id: "alpine-white", name: "Alpine White", colorHex: "#F3F4F6", colorName: "Alpine White" },
    ],
    storageOptions: [
      { id: "64gb", size: "64 GB", priceAdd: 0, description: "Holds ~15,000 HD Action Photos / 8 Hours Video" },
      { id: "128gb", size: "128 GB", priceAdd: 49, description: "Holds ~35,000 HD Action Photos / 20 Hours Video" },
    ],
    lensOptions: [
      { id: "polarized-sun", name: "Polarized Sun UV400", priceAdd: 0, type: "Included Standard Active Lens" },
      { id: "mirror-shield", name: "Iridium Mirror Lens", priceAdd: 19, type: "High-Contrast Glare Reduction" },
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
      front: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80",
      side: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=80",
      lifestyle: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=80",
      angle3D: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
    },
    hardwareHotspots: [
      { id: "camera", title: "Action HD Camera Lens", description: "Wide-angle lens built for high-velocity movement with anti-shake stabilization.", x: 30, y: 36 },
      { id: "grip", title: "Anti-Slip Rubber Grip", description: "Stays locked on your head during running, cycling, and intense outdoor sports.", x: 75, y: 44 },
    ],
  },
  {
    id: "odyssey-audio-blue-light",
    slug: "audio-blue-light-edition",
    name: "Odyssey Audio & Blue-Light Edition",
    tagline: "All-Day Voice Memory & Open-Ear Acoustic Smart Glasses",
    badge: "Everyday Comfort",
    rating: 4.9,
    reviewsCount: 619,
    basePrice: 219,
    originalPrice: 269,
    description:
      "Designed for creators, professionals, and daily journalers. Ultra-comfortable lightweight frame featuring open-ear directional audio speakers, clear blue-light filtering lenses, and 14-hour battery life.",
    features: [
      "Open-Ear Acoustic Micro-Drivers with Leak-Proof Sound Guard",
      "Clear Blue-Light Blocking Lenses for Screen Comfort",
      "14-Hour Extended Battery Life for All-Day Wear",
      "Instant Hands-Free Voice Note & Memory Journaling",
      "Lightweight Feather Frame (38g)",
    ],
    specs: {
      videoResolution: "Voice & Audio Capture Optimized",
      audio: "Dual Studio Mics + Directional Micro Drivers",
      battery: "14 Hours Continuous Playback / Standby 48 Hours",
      weight: "38g (Featherweight Acetate)",
      connectivity: "Bluetooth 5.3 + Multi-Device Pairing",
      waterResistance: "IPX4 Weather Resistant",
    },
    variants: [
      { id: "classic-tortoise", name: "Classic Tortoise", colorHex: "#78350F", colorName: "Classic Tortoise" },
      { id: "space-gray", name: "Space Gray", colorHex: "#4B5563", colorName: "Space Gray" },
    ],
    storageOptions: [
      { id: "64gb", size: "64 GB", priceAdd: 0, description: "Holds 500+ Hours of Voice Memory Audio Recordings" },
      { id: "128gb", size: "128 GB", priceAdd: 39, description: "Holds 1,200+ Hours of Voice Memory Audio Recordings" },
    ],
    lensOptions: [
      { id: "blue-light", name: "Clear Blue-Light Filter", priceAdd: 0, type: "Included Standard Blue-Light Protection" },
      { id: "reading-magnifier", name: "Reading Magnifier +1.5", priceAdd: 19, type: "Magnified Reading Assistant" },
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=80",
      front: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=80",
      side: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80",
      lifestyle: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=80",
      angle3D: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=80",
    },
    hardwareHotspots: [
      { id: "speakers", title: "Leak-Proof Acoustic Speakers", description: "Private sound boundary ensures audio is heard only by you.", x: 80, y: 52 },
      { id: "mics", title: "Clear Voice Microphones", description: "Captures ambient conversations and voice notes for your SpokenOdyssey memory vault.", x: 45, y: 46 },
    ],
  },
];
