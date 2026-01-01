import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ChevronRight, Star, MapPin, Phone, Mail, 
  Instagram, Facebook, Twitter, ArrowRight, CheckCircle, 
  ShieldCheck, Banknote, Wrench, RefreshCw, Play
} from 'lucide-react';
import { NAV_LINKS, CARS, SERVICES, TESTIMONIALS, STATS } from './constants';
import { Car } from './types';

// --- Utility Components ---

interface RevealOnScrollProps {
  children?: React.ReactNode;
  className?: string;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>
      {children}
    </div>
  );
};

const AnimatedCounter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasStarted(true);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime: number;
    const duration = 2000;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;
      
      if (progress < 1) {
        setCount(Math.floor(value * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    
    requestAnimationFrame(animate);
  }, [hasStarted, value]);

  return <span ref={ref} className="font-bold text-4xl md:text-5xl font-serif text-white">{count}{suffix}</span>;
};

// --- Main App Component ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Sports' | 'SUV' | 'Electric'>('All');

  // A reliable fallback image in case everything else fails
  const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredCars = activeFilter === 'All' 
    ? CARS 
    : CARS.filter(car => car.category === activeFilter);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-red-500" />;
      case 'Banknote': return <Banknote className="w-8 h-8 text-red-500" />;
      case 'Wrench': return <Wrench className="w-8 h-8 text-red-500" />;
      case 'RefreshCw': return <RefreshCw className="w-8 h-8 text-red-500" />;
      default: return <CheckCircle className="w-8 h-8 text-red-500" />;
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleResetFilter = () => {
    setActiveFilter('All');
    const inventorySection = document.getElementById('inventory');
    if (inventorySection) {
      inventorySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen font-sans selection:bg-red-500/30">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md py-4 shadow-lg border-b border-slate-800' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="text-2xl font-serif font-bold tracking-tighter text-white flex items-center gap-2">
            <span className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center text-sm font-sans">A</span>
            APEX
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a 
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="bg-white text-slate-950 px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-200 transition-colors"
            >
              Book Test Drive
            </a>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-t border-slate-800 p-6 flex flex-col gap-4 animate-in slide-in-from-top-5 shadow-2xl">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-lg text-slate-300 hover:text-white py-2"
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="bg-red-600 text-white px-5 py-3 rounded-lg text-center font-bold mt-2"
            >
              Book Test Drive
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Luxury Car Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in slide-in-from-left duration-1000 fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-semibold tracking-wider uppercase text-red-400">
              <Star className="w-3 h-3 fill-current" /> Premium Dealership
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight">
              Drive the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Extraordinary</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
              Experience the thrill of perfection. We curate the world's finest luxury and performance vehicles for those who demand excellence.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#inventory" 
                onClick={(e) => scrollToSection(e, '#inventory')}
                className="group px-8 py-4 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] flex items-center gap-2 cursor-pointer"
              >
                View Inventory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#about"
                onClick={(e) => scrollToSection(e, '#about')}
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" /> Learn More
              </a>
            </div>
            
            <div className="pt-8 flex gap-8 border-t border-white/10">
              <div>
                <p className="text-3xl font-serif font-bold text-white">1.2k+</p>
                <p className="text-sm text-slate-400">Vehicles in Stock</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-white">150+</p>
                <p className="text-sm text-slate-400">Expert Staff</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.id} className="text-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-slate-400 mt-2 font-medium tracking-wide uppercase text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inventory Section */}
      <section id="inventory" className="py-24 bg-slate-950 relative scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <RevealOnScroll>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Featured <span className="text-red-600">Inventory</span></h2>
              <p className="text-slate-400 max-w-xl">Browse our exclusive collection of premium vehicles, hand-picked for performance and luxury.</p>
            </RevealOnScroll>
            
            <RevealOnScroll className="delay-100">
              <div className="flex bg-slate-900 p-1 rounded-full border border-slate-800 overflow-x-auto max-w-full">
                {['All', 'Sports', 'SUV', 'Electric'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter as any)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeFilter === filter ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car, idx) => (
              <RevealOnScroll key={car.id} className={`delay-${idx * 100}`}>
                <div className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-900/10">
                  <div className="relative h-64 overflow-hidden bg-slate-800">
                    <img 
                      src={car.image} 
                      alt={`${car.make} ${car.model}`} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        // Prevent infinite loop if placeholder also fails
                        if (target.src !== PLACEHOLDER_IMAGE) {
                            target.src = PLACEHOLDER_IMAGE;
                        }
                      }}
                    />
                    
                    {/* Tags */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                      <div className="bg-slate-950/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10 shadow-lg">
                        {car.category}
                      </div>
                    </div>

                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{car.make} {car.model}</h3>
                        <p className="text-slate-400 text-sm">{car.year} • {car.mileage}</p>
                      </div>
                      <p className="text-red-500 font-bold text-xl">${car.price.toLocaleString()}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-600"></div>
                        {car.transmission}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-600"></div>
                        {car.fuel}
                      </div>
                    </div>

                    <a 
                      href="#contact"
                      onClick={(e) => scrollToSection(e, '#contact')}
                      className="w-full py-3 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 group-hover:bg-red-600 group-hover:text-white cursor-pointer"
                    >
                      View Details <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button 
              onClick={handleResetFilter}
              className="px-8 py-4 border border-slate-700 text-slate-300 rounded-full font-medium hover:bg-slate-800 hover:text-white transition-colors"
            >
              View Full Inventory
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-900 relative overflow-hidden scroll-mt-20">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Why Choose <span className="text-red-600">Apex</span></h2>
            <p className="text-slate-400">We don't just sell cars; we deliver an exceptional ownership experience backed by comprehensive services and guarantees.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, idx) => (
              <RevealOnScroll key={service.id} className={`delay-${idx * 100}`}>
                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-red-900/50 transition-colors h-full">
                  <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 text-red-500 border border-slate-800">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* About / Banner Section */}
      <section id="about" className="py-24 relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1562141961-b5d1855d7f30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Showroom" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <RevealOnScroll>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Our Mission is <br/>Your <span className="text-red-600">Satisfaction</span></h2>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                Founded in 2008, Apex Automotive has established itself as the premier destination for luxury and performance vehicles. We believe that buying a car should be as exciting as driving one.
              </p>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Our team of automotive enthusiasts carefully curates our inventory to ensure that every vehicle meets our exacting standards of quality, performance, and style.
              </p>
              <a 
                href="#services"
                onClick={(e) => scrollToSection(e, '#services')}
                className="px-8 py-3 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-200 transition-colors inline-block"
              >
                Learn More About Us
              </a>
            </RevealOnScroll>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-red-600/20 rounded-2xl blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Dealer Handshake" 
                className="relative rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif font-bold text-center text-white mb-16">Client <span className="text-red-600">Stories</span></h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <RevealOnScroll key={t.id} className={`delay-${idx * 100}`}>
                <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 relative">
                  <div className="flex gap-1 mb-4 text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-slate-300 mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-700" />
                    <div>
                      <h4 className="text-white font-bold text-sm">{t.name}</h4>
                      <p className="text-slate-500 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
            
            <div className="p-12">
              <h2 className="text-3xl font-serif font-bold text-white mb-6">Get in Touch</h2>
              <p className="text-slate-400 mb-8">Ready to find your dream car? Visit our showroom or send us a message.</p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-red-500 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Showroom Location</h4>
                    <p className="text-slate-400 text-sm">123 Premium Blvd, Beverly Hills, CA 90210</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-red-500 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Call Us</h4>
                    <p className="text-slate-400 text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-red-500 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Email Us</h4>
                    <p className="text-slate-400 text-sm">sales@apexautomotive.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-12">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors" />
                  <input type="text" placeholder="Last Name" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors" />
                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-400 focus:outline-none focus:border-red-600 transition-colors">
                  <option>Interested in buying</option>
                  <option>Selling my car</option>
                  <option>Book a Test Drive</option>
                  <option>General Inquiry</option>
                </select>
                <textarea rows={4} placeholder="Your Message" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"></textarea>
                <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors">
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="text-2xl font-serif font-bold text-white flex items-center gap-2 mb-6">
                <span className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center text-sm font-sans">A</span>
                APEX
              </a>
              <p className="text-slate-500 text-sm leading-relaxed">
                Premium luxury vehicle dealership dedicated to providing the highest quality cars and exceptional customer service.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-slate-500 text-sm">
                <li><a href="#inventory" onClick={(e) => scrollToSection(e, '#inventory')} className="hover:text-red-500 transition-colors">Inventory</a></li>
                <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-red-500 transition-colors">Services</a></li>
                <li><a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="hover:text-red-500 transition-colors">About Us</a></li>
                <li><a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="hover:text-red-500 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-3 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-red-500 transition-colors">Financing</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Trade-In</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Maintenance</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Consignment</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-sm">© 2024 Apex Automotive. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-slate-600">
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}