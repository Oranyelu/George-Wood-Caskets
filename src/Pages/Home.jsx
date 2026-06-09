import { useContext, useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { ProductContext } from "../Providers/ProductProvider";
import { Helmet } from "react-helmet-async";
import ProductCard from "../Components/ProductCard";
import Services from "../assets/service-api"; // service data
import TestimonialsData from "../assets/Testinonials-api"; // testimonials
import Logo from "../assets/Favicon.svg"; // hero logo
import BKOL from "../assets/book_of_life.png"; // Book of Life image
import ScrollReveal from "../Components/ScrollReveal";

const ShinyText = ({ text }) => {
  return <div className="shiny-text">{text}</div>;
};

ShinyText.propTypes = {
  text: PropTypes.string.isRequired,
};


function HeroSection() {
  const foundingYear = 1984;
  const [years, setYears] = useState(new Date().getFullYear() - foundingYear);
  const [isVisible, setIsVisible] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setYears(new Date().getFullYear() - foundingYear);
    }, 1000 * 60 * 60 * 24); // Update daily just in case
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );
    if (logoRef.current) observer.observe(logoRef.current);
    return () => {
      if (logoRef.current) observer.unobserve(logoRef.current);
    };
  }, []);

  return (
    <section className="bg-[#135B3A] rounded-b-[50px] w-full pt-28 pb-20 relative z-0">

      <div className="max-w-[1300px] mx-auto px-6 md:px-10 lg:px-20 flex flex-col md:flex-row items-center justify-between text-white gap-10">
        {/* Left Content */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            <ShinyText text="Honouring Life and Legacies since 1984" />
          </h1>
          <p className="mt-6 text-base md:text-lg text-gray-200">
            At George Wood Casket, every creation tells a story. For over four
            decades, we have refined the art of craftsmanship, creating timeless
            pieces that embody love, dignity, and remembrance.
          </p>
        </div>

        {/* Right Logo with Years */}
        <div className="flex flex-col items-center perspective-[1000px]">
          <div ref={logoRef} className={`relative w-48 h-48 md:w-56 md:h-56 transition-transform duration-1000 transform-style-3d ${isVisible ? 'animate-spin-stop' : ''}`}>
            {/* Front Face */}
            <img
              src={Logo}
              alt="George Wood Logo"
              className="absolute inset-0 w-full h-full object-contain backface-hidden"
            />
            {/* Back Face - Grayscale Logo */}
            <div
              className="absolute inset-0 w-full h-full backface-hidden flex items-center justify-center p-2"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <img
                src={Logo}
                alt="George Wood Logo Back"
                className="w-full h-full object-contain grayscale brightness-50 contrast-125 drop-shadow-xl"
              />
            </div>
          </div>
          <p className="mt-4 text-5xl font-bold text-[#A37E2C]">{years} Years</p>
        </div>
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
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const postsSnapshot = await getDocs(postsCollection);
        const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const sortedPosts = postsList.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setPosts(sortedPosts.slice(0, 4));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
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
