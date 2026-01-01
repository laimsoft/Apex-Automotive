import { Car, Service, Testimonial, Stat } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Inventory', href: '#inventory' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export const CARS: Car[] = [
  {
    id: 1,
    make: 'Ferrari',
    model: '488 Spider',
    year: 2024,
    price: 325000,
    mileage: '850 mi',
    fuel: 'Petrol',
    transmission: 'Automatic',
    // Red Ferrari - Distinct high-end supercar look
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&q=80',
    category: 'Sports'
  },
  {
    id: 2,
    make: 'Mercedes-Benz',
    model: 'G-Class AMG',
    year: 2023,
    price: 185000,
    mileage: '4,200 mi',
    fuel: 'Petrol',
    transmission: 'Automatic',
    // White G-Wagon - Boxy luxury SUV
    image: 'https://images.unsplash.com/photo-1520031441872-265149a9e690?auto=format&fit=crop&w=800&q=80',
    category: 'SUV'
  },
  {
    id: 3,
    make: 'Porsche',
    model: '911 GT3',
    year: 2024,
    price: 210000,
    mileage: '1,500 mi',
    fuel: 'Petrol',
    transmission: 'Automatic',
    // Blue Porsche - Classic sports profile
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ebcc6?auto=format&fit=crop&w=800&q=80',
    category: 'Sports'
  },
  {
    id: 4,
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    price: 98000,
    mileage: '120 mi',
    fuel: 'Electric',
    transmission: 'Automatic',
    // Black Tesla - Sleek modern electric sedan
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    category: 'Electric'
  },
  {
    id: 5,
    make: 'BMW',
    model: 'M4 Competition',
    year: 2023,
    price: 92000,
    mileage: '2,800 mi',
    fuel: 'Petrol',
    transmission: 'Automatic',
    // Yellow/Gold BMW - Vibrant color contrast
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80',
    category: 'Sports'
  },
  {
    id: 6,
    make: 'Land Rover',
    model: 'Range Rover Sport',
    year: 2024,
    price: 115000,
    mileage: '3,100 mi',
    fuel: 'Diesel',
    transmission: 'Automatic',
    // Grey/Silver Range Rover - Premium SUV aesthetic
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80',
    category: 'SUV'
  }
];

export const SERVICES: Service[] = [
  {
    id: 1,
    title: 'Certified Pre-Owned',
    description: 'Every vehicle undergoes a rigorous 150-point inspection by certified technicians to ensure peak performance.',
    icon: 'ShieldCheck'
  },
  {
    id: 2,
    title: 'Exclusive Financing',
    description: 'Bespoke financial solutions with competitive rates tailored to your personal requirements.',
    icon: 'Banknote'
  },
  {
    id: 3,
    title: 'Premium Maintenance',
    description: 'State-of-the-art service center with factory-trained professionals using only genuine parts.',
    icon: 'Wrench'
  },
  {
    id: 4,
    title: 'Fair Trade-In',
    description: 'Receive an instant, competitive market valuation for your current luxury vehicle.',
    icon: 'RefreshCw'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Alexander Hunt',
    role: 'Business Executive',
    text: 'Apex Automotive provided an unparalleled buying experience. The attention to detail and customer service is world-class.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    role: 'Entrepreneur',
    text: 'I found my dream car here. The process was smooth, transparent, and surprisingly fast. Highly recommended.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 3,
    name: 'Marcus Chen',
    role: 'Architect',
    text: 'A truly premium selection of vehicles. The team understood exactly what I was looking for and delivered beyond expectations.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  }
];

export const STATS: Stat[] = [
  { id: 1, value: 15, suffix: '+', label: 'Years Experience' },
  { id: 2, value: 850, suffix: '+', label: 'Cars Sold' },
  { id: 3, value: 2000, suffix: '+', label: 'Happy Clients' },
  { id: 4, value: 50, suffix: '', label: 'Awards Won' },
];