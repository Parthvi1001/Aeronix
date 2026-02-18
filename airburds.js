// Earbuds Product Data
const products = [
    {
        id: 1,
        name: "Aeronix Buds 4v ANC",
        subtitle: "Hybrid ANC Daily Driver",
        price: 1299,
        badge: "CONSUMER",
        specs: { battery: "24h", audio: "AAC", anc: "Basic" },
        info: "Perfect for daily use with comfortable fit and reliable connectivity.",
        image: "assets/earbuds-1.jpeg"
    },
    {
        id: 2,
        name: "Aeronix Nord Buds 2r True",
        subtitle: "Balanced Soundstage",
        price: 2499,
        badge: "PRO",
        badgeClass: "pro",
        specs: { battery: "30h", audio: "LDAC", anc: "Active" },
        info: "Professional-grade audio with adaptive ANC and transparency mode.",
        image: "assets/earbuds-2.jpg.jpeg"
    },
    {
        id: 3,
        name: "Aeronix Buds 3 Pro",
        subtitle: "Flagship Spatial Audio",
        price: 3499,
        badge: "PRO",
        badgeClass: "pro",
        specs: { battery: "36h", audio: "Hi-Res", anc: "Adaptive" },
        info: "Flagship model with adaptive ANC and lossless audio codec support.",
        image: "assets/earbuds-3.jpg.jpeg"
    },
    {
        id: 4,
        name: "Aeronix Wireless Buds 3 TWS",
        subtitle: "Ultra-Low Latency",
        price: 4499,
        badge: "PRO",
        badgeClass: "pro",
        specs: { battery: "40h", audio: "Studio", anc: "Premium" },
        info: "Ultimate audio experience with custom-tuned drivers.",
        image: "assets/earbuds-4.jpg.jpeg"
    },
    {
        id: 5,
        name: "Aeronix Dual Mic Z2",
        subtitle: "Clear Call Control",
        price: 1799,
        badge: "CONSUMER",
        specs: { battery: "28h", audio: "Bass+", anc: "Wind" },
        info: "IPX7 waterproof rating with secure fit wings for intense workouts.",
        image: "assets/earbuds-5.jpg.jpeg"
    },
    {
        id: 6,
        name: "Aeronix Echo Pods X",
        subtitle: "Featherlight Essentials",
        price: 999,
        badge: "CONSUMER",
        specs: { battery: "20h", audio: "Clear", anc: "Passive" },
        info: "Ultra-lightweight and compact design fits perfectly in any ear.",
        image: "assets/earbuds-6.jpg.jpeg"
    },
    {
        id: 7,
        name: "Aeronix Pulse Air S",
        subtitle: "Fitness Secure Fit",
        price: 1999,
        badge: "CONSUMER",
        specs: { battery: "32h", audio: "7.1", anc: "Game" },
        info: "Ultra-low latency mode for competitive gaming.",
        image: "assets/earbuds-7.jpg.jpeg"
    },
    {
        id: 8,
        name: "Aeronix Quantum Beat",
        subtitle: "Studio Reference",
        price: 2999,
        badge: "PRO",
        badgeClass: "pro",
        specs: { battery: "35h", audio: "Ref", anc: "Studio" },
        info: "Flat frequency response for accurate mixing and monitoring.",
        image: "assets/earbuds-8.jpg.jpeg"
    }
];

const models = [
    { name: "Aeronix Buds 4v ANC", price: 1299 },
    { name: "Aeronix Nord Buds 2r True", price: 2499 },
    { name: "Aeronix Buds 3 Pro", price: 3499 },
    { name: "Aeronix Wireless Buds 3 TWS", price: 4499 },
    { name: "Aeronix Dual Mic Z2", price: 1799 },
    { name: "Aeronix Echo Pods X", price: 999 },
    { name: "Aeronix Pulse Air S", price: 1999 },
    { name: "Aeronix Quantum Beat", price: 2999 }
];

const audioOptions = [
    { name: "Standard AAC", detail: "High-quality wireless audio", price: 0, included: true },
    { name: "LDAC Codec", detail: "3x higher quality streaming", price: 299 },
    { name: "Hi-Res Audio", detail: "Lossless wireless transmission", price: 599 }
];

const batteryOptions = [
    { name: "Standard (24h)", price: 0, included: true },
    { name: "Extended (36h)", price: 349 },
    { name: "Ultra (48h)", price: 599 }
];

// Initialize using shared configurator
initProductConfigurator({
    products: products,
    models: models,
    audioOptions: audioOptions,
    batteryOptions: batteryOptions,
    productType: 'earbud',
    productTypeDisplay: 'Earbuds'
});
