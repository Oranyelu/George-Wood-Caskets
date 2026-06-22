import { useContext, useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { supabase } from "../supabase";
import { ProductContext } from "../Providers/ProductProvider";
import { Helmet } from "react-helmet-async";
import ProductCard from "../Components/ProductCard";
import Services from "../assets/service-api"; // service data
import TestimonialsData from "../assets/Testinonials-api"; // testimonials
import BKOL from "../assets/book_of_life.png"; // Book of Life image
import ScrollReveal from "../Components/ScrollReveal";

// Carousel Slide Assets
import woodworkingWorkshop from "../assets/woodworking_workshop.png";
import mercedesSvg from "../assets/serivices svgs/mercedes.svg";
import loweringDeviceSvg from "../assets/serivices svgs/loweringDevice.svg";
import photographyService from "../assets/photography_service.png";
import nigerianWorkshopTeam from "../assets/nigerian_workshop_team.png";

const ShinyText = ({ text }) => {
  return <span className="shiny-text">{text}</span>;
};

ShinyText.propTypes = {
  text: PropTypes.string.isRequired,
};

const slides = [
  {
    id: 1,
    subtitle: "Premium Craftsmanship",
    title: "Honouring Life & Legacies since 1984",
    description: `At George Wood Casket, every creation tells a story. For over ${new Date().getFullYear() - 1984} years, we have refined the art of craftsmanship, creating timeless pieces that embody love, dignity, and remembrance.`,
    image: woodworkingWorkshop,
    imageAlt: "George Wood Woodworking Workshop",
    isSvg: false,
    link: "/products",
    linkText: "Browse Our Caskets"
  },
  {
    id: 2,
    subtitle: "Emergency & Transport",
    title: "Dignified Ambulance Services",
    description: "Offering professional, swift, and respectful transport solutions. Our modern vehicles and compassionate medical staff are equipped to support your family during critical moments.",
    image: mercedesSvg,
    imageAlt: "George Wood Mercedes Ambulance Service",
    isSvg: true,
    link: "/services",
    linkText: "Our Services"
  },
  {
    id: 3,
    subtitle: "Graveside Ceremony",
    title: "Solemn Graveside Lowering Services",
    description: "Providing state-of-the-art lowering devices and graveside setup. We ensure a seamless, respectful, and dignified final transition for your loved ones.",
    image: loweringDeviceSvg,
    imageAlt: "Graveside Lowering Device",
    isSvg: true,
    link: "/services",
    linkText: "Our Services"
  },
  {
    id: 4,
    subtitle: "Memorial Capture",
    title: "Preserving Precious Memories",
    description: "Cherish the legacy of those you hold dear. Our professional memorial photography captures family bonds, solemn moments, and the celebration of a life beautifully lived.",
    image: photographyService,
    imageAlt: "Family Memorial Photography",
    isSvg: false,
    link: "/services",
    linkText: "Our Services"
  },
  {
    id: 5,
    subtitle: "Professional Care",
    title: "Compassionate Undertakers & Staff",
    description: "Our dedicated and professional undertakers guide you step-by-step with empathy. We manage every detail of the service, ensuring absolute peace of mind.",
    image: nigerianWorkshopTeam,
    imageAlt: "George Wood Undertakers and Staff Team",
    isSvg: false,
    link: "/services",
    linkText: "Our Services"
  }
];

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (distance > minSwipeDistance) {
      // Swipe left (next slide)
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (distance < -minSwipeDistance) {
      // Swipe right (previous slide)
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="bg-[#135B3A] rounded-b-[50px] w-full pt-28 pb-20 md:pt-36 md:pb-24 relative z-0 overflow-hidden min-h-[75vh] md:h-[75vh] md:max-h-[700px] lg:max-h-[800px] flex items-center select-none"
    >
      {/* Slides Track */}
      <div 
        className="flex transition-transform duration-1000 ease-in-out h-full items-center shrink-0"
        style={{ 
          transform: `translateX(-${currentSlide * (100 / slides.length)}%)`, 
          width: `${slides.length * 100}%` 
        }}
      >
        {slides.map((slide, index) => {
          const isActive = currentSlide === index;
          const isReverse = index % 2 === 1;

          // Each slide takes exactly 1/5th (20%) of the total width
          return (
            <div 
              key={slide.id} 
              style={{ width: `${100 / slides.length}%` }} 
              className="shrink-0 flex justify-center px-6 md:px-10 lg:px-20"
            >
              <div className={`max-w-[1300px] w-full flex flex-col ${isReverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between text-white gap-8 md:gap-16`}>
                
                {/* Image Column - Feathered with Background */}
                <div className={`w-full md:w-1/2 flex justify-center transition-all duration-1000 ${isActive ? 'scale-100 opacity-100 translate-x-0' : 'scale-95 opacity-0 ' + (isReverse ? 'translate-x-8' : '-translate-x-8')}`}>
                  <div className="relative w-full max-w-md md:max-w-lg h-60 sm:h-72 md:h-[320px] lg:h-[380px] overflow-hidden rounded-3xl">
                    <img 
                      src={slide.image} 
                      alt={slide.imageAlt}
                      className={`w-full h-full transition-transform duration-[5000ms] ease-out ${isActive ? 'scale-110' : 'scale-100'} ${slide.isSvg ? 'object-contain p-6' : 'object-cover'}`} 
                      draggable="false"
                    />
                    {/* Feathering overlays to blend borders into solid green background #135B3A */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#135B3A] via-transparent to-[#135B3A] pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#135B3A] via-transparent to-[#135B3A] pointer-events-none"></div>
                  </div>
                </div>

                {/* Text Column */}
                <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center pb-16 md:pb-0 px-2 md:px-0">
                  <span className={`text-[#A37E2C] font-bold text-xs md:text-sm uppercase tracking-widest mb-2 block transition-all duration-700 delay-100 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    {slide.subtitle}
                  </span>
                  
                  <h2 className={`text-3xl md:text-5xl font-extrabold leading-tight text-white mb-4 md:mb-6 transition-all duration-700 delay-200 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    {index === 0 ? <ShinyText text={slide.title} /> : slide.title}
                  </h2>
                  
                  <p className={`text-sm md:text-lg text-gray-200 leading-relaxed mb-6 md:mb-8 transition-all duration-700 delay-300 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    {slide.description}
                  </p>
                  
                  <div className={`transition-all duration-700 delay-300 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <Link to={slide.link}>
                      <button className="bg-[#A37E2C] hover:bg-[#C29E2E] text-white font-bold py-3 px-6 md:py-3.5 md:px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-xs md:text-sm tracking-wide">
                        {slide.linkText}
                      </button>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Speak with Us Button */}
      <Link 
        to="/contacts" 
        className="absolute bottom-6 left-6 md:left-10 lg:left-20 z-20 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-5 md:py-3.5 md:px-6 rounded-xl border border-white/20 hover:border-white/40 shadow-lg backdrop-blur-md transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 flex items-center gap-2 text-xs md:text-sm"
      >
        Speak with Us
      </Link>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-[#A37E2C] w-6 md:w-8' : 'bg-white/40 hover:bg-white/60'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}


function Home() {
  const { products, fetchProducts } = useContext(ProductContext);
  const { servicesData } = Services;

  const [randomServices, setRandomServices] = useState([]);
  const [featuredProducts, setRandomProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [posts, setPosts] = useState([]);

  // --- Ensure products are loaded (for direct landing on Home) ---
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  // --- Select random products ---
  useEffect(() => {
    if (products.length > 0) {
      const getRandomItems = (arr, count) =>
        [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
      setRandomProducts(getRandomItems(products, 8));
    }
  }, [products]);

  // --- Select random services ---
  useEffect(() => {
    const shuffledServices = servicesData.sort(() => 0.5 - Math.random());
    setRandomServices(shuffledServices.slice(0, 6));
  }, [servicesData]);

  // --- Load testimonials ---
  useEffect(() => {
    setTestimonials(TestimonialsData);

    const totalRating = TestimonialsData.reduce(
      (sum, testimonial) => sum + testimonial.rating,
      0
    );
    const avgRating = totalRating / TestimonialsData.length;
    setAverageRating(avgRating);
  }, []);

  // --- Load blog posts ---
  useEffect(() => {
    const fetchPostsFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);
        if (error) throw error;
        
        const mappedPosts = (data || []).map(post => ({
          ...post,
          date: post.created_at
        }));
        setPosts(mappedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPostsFromSupabase();
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden transition-colors duration-300 relative">

      <Helmet>
        <title>George Wood Casket | Premium Caskets & Funeral Services Since 1984</title>
        <meta name="description" content="Based in Enugu since 1984, we craft premium caskets and provide professional funeral services. Experience comfort, honor, and tradition with our dedicated team." />
        <link rel="canonical" href="https://georgewoodcasket.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FuneralService",
            "name": "George Wood Casket & Funeral Services",
            "image": "https://georgewoodcasket.com/Favicon.svg",
            "telephone": "+2348143904414",
            "email": "georgewoodcasket@gmail.com",
            "foundingDate": "1984",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "11 Senator Avenue, Opposite Milestone Hospital, Along Old Enugu-Onitsha Express Road",
              "addressLocality": "Okwojo Ngwo",
              "addressRegion": "Enugu",
              "addressCountry": "NG"
            },
            "priceRange": "$$",
            "areaServed": "Nigeria"
          })}
        </script>
      </Helmet>
      {/* === Hero Section === */}
      <HeroSection />



      {/* === Featured Products Section === */}
      <ScrollReveal className="pt-20 px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto w-full">
        <header className="flex flex-col text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-primary font-bold">
            Featured Creations
          </h2>
          <p className="text-base md:text-lg text-secondary mt-2">
            Explore our most requested comforting designs...
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {featuredProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products">
            <button className="bg-[#135B3A] text-white px-8 py-3.5 rounded-xl hover:bg-[#0E462D] transition-colors shadow-md font-bold text-sm tracking-wide">
              View All Products
            </button>
          </Link>
        </div>
      </ScrollReveal>

      {/* === The George Wood Bond Section === */}
      <ScrollReveal className="pt-20 px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto w-full">
        <div className="bg-brand-card dark:bg-brand-card-dark rounded-3xl p-8 md:p-12 shadow-xl border border-[#135B3A]/10 dark:border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 relative overflow-hidden">
          {/* Subtle elegant gold/green glow accent */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-secondary-gold/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-[#8C6A1C] dark:text-yellow-400 text-xs font-bold uppercase tracking-widest block mb-2">
              Introducing Pre-Need Peace of Mind
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#135B3A] dark:text-green-400 mb-4">
              The George Wood Bond
            </h2>
            <p className="text-[#16221B] dark:text-gray-300 text-sm md:text-base leading-relaxed mb-6 font-light">
              None of us can escape the silent passage of time, but we can choose how we prepare for it. The George Wood Bond is a compassionate, monthly pre-planning plan designed to shield your family from the sudden burden of funeral arrangements. Let us carry the weight, ensuring an honorable and dignified farewell when the day comes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-xs font-bold text-[#135B3A] dark:text-green-400">
              <span className="flex items-center gap-1">✓ Shield Family from Sudden Costs</span>
              <span className="flex items-center gap-1">✓ Tailored Honor Tiers</span>
              <span className="flex items-center gap-1">✓ Complete Arrangements Handled</span>
            </div>
          </div>
          
          <div className="shrink-0 w-full lg:w-auto">
            <Link to="/bonds" className="block w-full">
              <button className="w-full lg:w-auto bg-[#135B3A] hover:bg-[#0E462D] text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl tracking-wider text-sm uppercase">
                Secure Peace of Mind
              </button>
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* === Featured Services Section === */}
      <ScrollReveal className="pt-20 px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto w-full">
        <header className="flex flex-col text-center mb-10">
          <h2 className="text-3xl text-primary font-serif font-bold">
            Compassionate Services
          </h2>
          <p className="text-sm text-secondary mt-2">Professional care tailored to guide you step-by-step...</p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {randomServices.slice(0, 3).map((service) => (
            <Link
              key={service.id}
              to={`/book-service/${service.name.replace(/\s+/g, '-').toLowerCase()}`}
            >
              <li
                className="bg-brand-card dark:bg-brand-card-dark p-6 rounded-2xl shadow-md border border-[#135B3A]/10 dark:border-white/5 flex flex-col items-center justify-center h-[220px] transform hover:scale-103 hover:shadow-xl transition-all duration-300 cursor-pointer text-[#16221B] dark:text-brand-white"
              >
                <h2 className="text-primary dark:text-green-400 mb-2 font-serif font-bold text-center text-lg">
                  {service.name}
                </h2>
                <p className="text-brand-black/80 dark:text-gray-300 text-center text-sm leading-relaxed max-w-xs">
                  {service.description || "Description coming soon."}
                </p>
                <span className="mt-4 text-[#135B3A] dark:text-green-400 text-xs font-bold uppercase tracking-wider underline">Book Service</span>
              </li>
            </Link>
          ))}
        </ul>

        <div className="text-center mt-12">
          <Link to="/services">
            <button className="bg-[#135B3A] text-white px-8 py-3.5 rounded-xl hover:bg-[#0E462D] transition-colors shadow-md font-bold text-sm">
              View More Services
            </button>
          </Link>
        </div>
      </ScrollReveal>

      {/* === Testimonials Section === */}
      <ScrollReveal className="pt-20 px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto w-full">
        <div className="flex flex-col gap-8">
          <section className="flex justify-between sm:flex-row flex-col items-baseline border-b border-[#135B3A]/10 dark:border-white/10 pb-6">
            <div>
              <h2 className="font-serif font-bold text-3xl text-[#135B3A] dark:text-green-500">
                A Legacy of Comfort and Trust
              </h2>
              <p className="text-[#8C6A1C] dark:text-yellow-400 font-medium text-sm mt-1">
                Read what our families have to say about our care...
              </p>
            </div>

            <div className="flex gap-6 mt-4 sm:mt-0 text-[#135B3A] dark:text-green-400">
              <div className="text-center">
                <span className="text-3xl font-serif font-bold block">488+</span>
                <span className="text-xs uppercase tracking-wider text-gray-500">Families Served</span>
              </div>
              <div className="text-center">
                <span className="text-3xl font-serif font-bold block">732+</span>
                <span className="text-xs uppercase tracking-wider text-gray-500">Memorials</span>
              </div>
            </div>
          </section>

          {/* Book of Life Section */}
          <section className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="bg-[#135B3A] md:max-w-[250px] w-full h-[250px] rounded-2xl flex flex-col items-center justify-center text-white p-6 shadow-md shrink-0">
              <div className="flex items-center mb-2">
                <span className="text-5xl font-bold font-serif">
                  {averageRating.toFixed(1)}
                </span>
                <FaStar size={32} color="#C29E2E" className="ml-1" />
              </div>
              <div className="text-center">
                <p className="font-bold text-sm text-yellow-300 uppercase tracking-widest">
                  {(averageRating * 20).toFixed(0)}% Satisfaction
                </p>
                <p className="text-xs text-white/80 mt-1">Reflecting our standard of excellence</p>
              </div>
            </div>

            <Link
              to="/book-of-life"
              className="w-full h-[250px] bg-no-repeat bg-center bg-cover rounded-2xl relative overflow-hidden group cursor-pointer shadow-md"
              style={{ backgroundImage: `url(${BKOL})` }}
            >
              <div
                id="book-of-life-overlay"
                className="absolute bottom-[-100%] left-0 w-full h-full bg-black/75 text-white p-6 flex flex-col justify-center items-start gap-2 transition-all duration-500 group-hover:bottom-0 backdrop-blur-xs"
              >
                <h3 className="text-xl font-serif font-bold text-secondary-gold underline">
                  Discover “The Book Of Life”
                </h3>
                <p className="text-sm text-gray-200 max-w-xl font-light">
                  Step into the stories of those who shaped our journey. Their legacies live on, offering comfort and inspiration to generations to come.
                </p>
              </div>
            </Link>
          </section>

          {/* Testimonials Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 6)
              .map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-brand-card dark:bg-brand-card-dark p-6 rounded-2xl shadow-md border border-[#135B3A]/10 dark:border-white/5 text-[#16221B] dark:text-brand-white flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-sm font-light leading-relaxed italic">&quot;{testimonial.review}&quot;</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#135B3A]/5 dark:border-white/5">
                    <p className="font-serif font-bold text-xs uppercase tracking-wider text-[#135B3A] dark:text-green-400">
                      — {testimonial.name}
                    </p>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <FaStar key={i} size={12} color="#C29E2E" />
                      ))}
                      {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                        <FaStar key={i} size={12} color="gray" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </section>
        </div>
      </ScrollReveal>

      {/* === Latest Updates Section === */}
      <ScrollReveal className="pt-20 px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto w-full">
        <h2 className="text-3xl font-serif font-bold mb-8 text-[#135B3A] dark:text-green-500">
          Latest Reflections & Updates
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-3xl overflow-hidden shadow-md bg-brand-card dark:bg-brand-card-dark text-[#16221B] dark:text-brand-white border border-[#135B3A]/10 dark:border-white/5 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <Link to={`/blog/${post.id}`} className="overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-serif font-bold mb-2 leading-snug">{post.title}</h3>
                <p className="text-brand-black/80 dark:text-gray-300 mb-4 text-xs leading-relaxed line-clamp-3">
                  {post.description}
                </p>
                <Link
                  to={`/blog/${post.id}`}
                  className="text-[#135B3A] dark:text-green-400 font-bold hover:underline transition-colors duration-200 mt-auto text-xs uppercase tracking-wider"
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/blog">
            <button className="bg-[#135B3A] text-white px-8 py-3.5 rounded-xl hover:bg-[#0E462D] transition-colors shadow-md font-bold text-sm">
              View More Articles
            </button>
          </Link>
        </div>
      </ScrollReveal>

      {/* === George Wood Foundation Section === */}
      <ScrollReveal className="pt-20 px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto w-full mb-20">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#135B3A] dark:text-green-500 mb-8">
          George Wood&#39;s Legacy
        </h2>
        <div className="bg-brand-card dark:bg-brand-card-dark rounded-3xl flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-12 w-full shadow-xl border border-[#135B3A]/10 dark:border-white/5">
          <div className="w-full flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <h3 className="text-[#135B3A] dark:text-green-400 text-2xl font-serif font-bold">
              Celebrating Life and Giving Back
            </h3>
            <p className="text-brand-black dark:text-gray-300 text-sm md:text-base leading-relaxed font-light">
              George Wood&#39;s legacy is still centered on giving back to the community that nurtured us. Through the George Wood Foundation, we empower youth and support grieving families during their hardest times. Join us as we build a more compassionate world and keep spirits bright.
            </p>
            <Link to="/charity">
              <button className="bg-[#135B3A] text-white font-bold px-8 py-3.5 rounded-xl shadow-md hover:bg-[#0E462D] transition duration-300 text-sm">
                Support Our Foundation
              </button>
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

export default Home;
