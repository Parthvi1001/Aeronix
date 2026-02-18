// Headphones Product Data
const products = [
    {
        id: 1,
        name: "Aeronix Rockerz 450",
        subtitle: "Adaptive ANC Commuter",
        price: 2499,
        badge: "CONSUMER",
        specs: { battery: "20h", audio: "HD", anc: "Basic" },
        image: "assets/headphones-1.jpg.jpeg"
    },
    {
        id: 2,
        name: "Aeronix Tune 770NC",
        subtitle: "Studio Tuned Precision",
        price: 4599,
        badge: "PRO",
        badgeClass: "pro",
        specs: { battery: "30h", audio: "Hi-Res", anc: "Advanced" },
        image: "assets/headphones-2.jpg.jpeg"
    },
    {
        id: 3,
        name: "Aeronix Horizon X",
        subtitle: "Flagship Wireless Suite",
        price: 7499,
        badge: "PRO",
        badgeClass: "pro",
        specs: { battery: "40h", audio: "Studio", anc: "Adaptive" },
        image: "assets/headphones-3.jpg.jpeg"
    },
    {
        id: 4,
        name: "Aeronix Studio H1",
        subtitle: "Mastering Reference",
        price: 10999,
        badge: "PRO",
        badgeClass: "pro",
        specs: { battery: "50h", audio: "Master", anc: "Premium" },
        image: "assets/headphones-4.jpg.jpeg"
    },
    {
        id: 5,
        name: "Aeronix Thunder",
        subtitle: "Immersive Gaming",
        price: 1699,
        badge: "CONSUMER",
        specs: { battery: "15h", audio: "Clear", anc: "Passive" },
        image: "assets/headphones-5.jpg.jpeg"
    },
    {
        id: 6,
        name: "Aeronix Nova Wave",
        subtitle: "Lifestyle Wireless",
        price: 3299,
        badge: "CONSUMER",
        specs: { battery: "25h", audio: "7.1", anc: "Game" },
        image: "assets/headphones-6.jpg.jpeg"
    },
    {
        id: 7,
        name: "Aeronix Sonic Lux",
        subtitle: "Premium Noise Shield",
        price: 1999,
        badge: "CONSUMER",
        specs: { battery: "18h", audio: "Bass+", anc: "Wind" },
        image: "assets/headphones-7.jpg.jpeg"
    },
    {
        id: 8,
        name: "Aeronix Quantum Pro",
        subtitle: "Producer's Choice",
        price: 5999,
        badge: "PRO",
        badgeClass: "pro",
        specs: { battery: "35h", audio: "Ref", anc: "Studio" },
        image: "assets/headphones-8.jpg.jpeg"
    }
];

const models = [
    { name: "Aeronix Rockerz 450", price: 2499 },
    { name: "Aeronix Tune 770NC", price: 4599 },
    { name: "Aeronix Horizon X", price: 7499 },
    { name: "Aeronix Studio H1", price: 10999 },
    { name: "Aeronix Thunder", price: 1699 },
    { name: "Aeronix Nova Wave", price: 3299 },
    { name: "Aeronix Sonic Lux", price: 1999 },
    { name: "Aeronix Quantum Pro", price: 5999 }
];

const audioOptions = [
    { name: "Standard HD", detail: "16-bit/44.1kHz", price: 0, included: true },
    { name: "Hi-Res Audio", detail: "24-bit/96kHz", price: 499 },
    { name: "Studio Master", detail: "24-bit/192kHz", price: 999 }
];

const batteryOptions = [
    { name: "Standard (20h)", price: 0, included: true },
    { name: "Extended (35h)", price: 399 },
    { name: "Ultra (50h)", price: 799 }
];

// Initialize using shared configurator
initProductConfigurator({
    products: products,
    models: models,
    audioOptions: audioOptions,
    batteryOptions: batteryOptions,
    productType: 'headphone',
    productTypeDisplay: 'Headphones'
});
