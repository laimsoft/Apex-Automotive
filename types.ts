export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: string;
  fuel: string;
  transmission: string;
  image: string;
  category: 'Sports' | 'SUV' | 'Sedan' | 'Electric';
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface Stat {
  id: number;
  value: number;
  suffix: string;
  label: string;
}