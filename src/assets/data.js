export const menuItems = [
    {
        id: 'men',
        label: 'Men',
        featured: {
            title: 'New Arrivals',
            description: 'Fresh drops for the new season.',
            image: null,
        },
        columns: [
            {
                title: 'Tops',
                links: [
                    { label: 'T-Shirts', link: 't-shirts' },
                    { label: 'Hoodies', link: 'hoodies' },
                    { label: 'Long Sleeves', link: 'long-sleeves' },
                    { label: 'Tank Tops', link: 'tank-tops' },
                    { label: 'Jackets', link: 'jackets' },
                ],
            },
            {
                title: 'Bottoms',
                links: [
                    { label: 'Shorts', link: 'shorts' },
                    { label: 'Joggers', link: 'joggers' },
                    { label: 'Leggings', link: 'leggings' },
                    { label: 'Sweatpants', link: 'sweatpants' },
                ],
            },
            {
                title: 'Accessories',
                links: [
                    { label: 'Caps & Beanies', link: 'caps-&-beanies' },
                    { label: 'Bags', link: 'bags' },
                    { label: 'Gloves', link: 'gloves' },
                    { label: 'Socks', link: 'socks' },
                ],
            },
        ],
        highlights: [
            { label: 'New Arrivals', link: 'new-arrivals' },
            { label: 'Best Sellers', link: 'best-sellers' },
            { label: 'Sale', badge: 'UP TO 40% OFF', link: 'sale' },
        ],
    },
    {
        id: 'women',
        label: 'Women',
        featured: {
            title: 'SS26 Collection',
            description: 'Built for performance. Designed to stand out.',
            image: null,
        },
        columns: [
            {
                title: 'Tops',
                links: [
                    { label: 'Sports Bras', link: 'sports-bras' },
                    { label: 'Tank Tops', link: 'tank-tops' },
                    { label: 'T-Shirts', link: 't-shirts' },
                    { label: 'Hoodies', link: 'hoodies' },
                    { label: 'Jackets', link: 'jackets' },
                ],
            },
            {
                title: 'Bottoms',
                links: [
                    { label: 'Leggings', link: 'leggings' },
                    { label: 'Shorts', link: 'shorts' },
                    { label: 'Joggers', link: 'joggers' },
                    { label: 'Skirts', link: 'skirts' },
                ],
            },
            {
                title: 'Accessories',
                links: [
                    { label: 'Bags', link: 'bags' },
                    { label: 'Hair Ties', link: 'hair-ties' },
                    { label: 'Socks', link: 'socks' },
                    { label: 'Water Bottles', link: 'water-bottles' },
                ],
            },
        ],
        highlights: [
            { label: 'New Arrivals', link: 'new-arrivals' },
            { label: 'Best Sellers', link: 'best-sellers' },
            { label: 'Sale', badge: 'UP TO 40% OFF', link: 'sale' },
        ],
    },
    {
        id: 'accessories',
        label: 'Accessories',
        featured: {
            title: 'Gear Up',
            description: 'Complete your kit with the essentials.',
            image: null,
        },
        columns: [
            {
                title: 'Training',
                links: [
                    { label: 'Gloves', link: 'gloves' },
                    { label: 'Knee Sleeves', link: 'knee-sleeves' },
                    { label: 'Wrist Wraps', link: 'wrist-wraps' },
                    { label: 'Belts', link: 'belts' },
                ],
            },
            {
                title: 'Carry',
                links: [
                    { label: 'Gym Bags', link: 'gym-bags' },
                    { label: 'Backpacks', link: 'backpacks' },
                    { label: 'Duffel Bags', link: 'duffel-bags' },
                ],
            },
            {
                title: 'Lifestyle',
                links: [
                    { label: 'Caps', link: 'caps' },
                    { label: 'Beanies', link: 'beanies' },
                    { label: 'Water Bottles', link: 'water-bottles' },
                    { label: 'Towels', link: 'towels' },
                ],
            },
        ],
        highlights: [
            { label: 'New Arrivals', link: 'new-arrivals' },
            { label: 'All Accessories', link: 'all-accessories' },
        ],
    },
    {
        id: 'sale',
        label: 'Sale',
        featured: {
            title: 'Up to 40% Off',
            description: "Limited stock. Don't sleep on it.",
            image: null,
        },
        columns: [
            {
                title: "Men's Sale",
                links: [
                    { label: 'Tops', link: 'tops' },
                    { label: 'Bottoms', link: 'bottoms' },
                    { label: 'Accessories', link: 'accessories' },
                ],
            },
            {
                title: "Women's Sale",
                links: [
                    { label: 'Tops', link: 'tops' },
                    { label: 'Bottoms', link: 'bottoms' },
                    { label: 'Accessories', link: 'accessories' },
                ],
            },
            {
                title: 'Final Sale',
                links: [
                    { label: 'Under $30', link: 'under-$30' },
                    { label: 'Under $50', link: 'under-$50' },
                    { label: 'Clearance', link: 'clearance' },
                ],
            },
        ],
        highlights: [{ label: 'Shop All Sale', badge: '40% OFF', link: 'shop-all-sale' }],
    },
];