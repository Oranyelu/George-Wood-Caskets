import { useContext, useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';
import Snowfall from 'react-snowfall';
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Card, CardContent } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { ProductContext } from "../Providers/ProductProvider";
import { Helmet } from "react-helmet-async";
import ProductCard from "../Components/ProductCard";
import Services from "../assets/service-api"; // service data
import TestimonialsData from "../assets/Testinonials-api"; // testimonials
import Logo from "../assets/Favicon.svg"; // hero logo
import BKOL from "../assets/book_of_life.png"; // Book of Life image
// import './ShinyText.css';

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
      <Snowfall color="#fff" />
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
      <Snowfall
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 50,
        }}
        snowflakeCount={40}
      />
      <Helmet>
        <title>George Wood Casket | Premium Caskets & Funeral Services</title>
        <meta name="description" content="Based in Enugu since 1984, we provide high-quality caskets and professional funeral services. Honouring life and legacies." />
        <link rel="canonical" href="https://georgewoodcasket.com/" />
      </Helmet>
      {/* === Hero Section === */}
      <HeroSection />



      {/* === Featured Products Section === */}
      <section className="pt-20 px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto w-full">
        <header className="flex flex-col text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-primary font-bold">
            Featured Products
          </h2>
          <p className="text-base md:text-lg text-secondary mt-2">
            Make your choice based on popular demand...
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/products">
            <button className="bg-[#135B3A] text-white px-6 py-3 rounded hover:bg-[#0E462D] transition-colors shadow-md font-bold">
              View All Products
            </button>
          </Link>
        </div>
      </section>

      {/* === Featured Services Section === */}
      <section className="pt-20 px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto w-full">
        <header className="flex flex-col text-center mb-10">
          <h2 className="text-3xl text-primary font-bold">
            Featured Services
          </h2>
        </header>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {randomServices.map((service) => (
            <Link
              key={service.id}
              to={`/book-service/${service.name.replace(/\s+/g, '-').toLowerCase()}`}
            >
              <li
                className="bg-[#F0B52E] p-6 rounded-lg shadow-lg flex flex-col items-center justify-center h-[200px] transform hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <h2 className="text-primary mb-2 font-bold text-center">
                  {service.name}
                </h2>
                <p className="text-[#011309] text-center">
                  {service.description || "Description coming soon."}
                </p>
                <span className="mt-4 text-[#135B3A] text-sm font-bold underline">Book Now</span>
              </li>
            </Link>
          ))}
        </ul>

        <div className="text-center mt-10">
          <Link to="/services">
            <button className="bg-[#135B3A] text-white px-6 py-3 rounded hover:bg-[#0E462D] transition-colors shadow-md font-bold">
              View More Services
            </button>
          </Link>
        </div>
      </section>

      {/* === Testimonials Section === */}
      <section className="pt-20 px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto w-full">
        <div className="flex flex-col gap-8">
          <section className="flex justify-between sm:flex-row flex-col">
            <div>
              <h1 className="font-bold text-3xl text-[#135B3A] dark:text-green-500">
                Why Choose George Wood Casket?
              </h1>
              <h2 className="text-[#A37E2C] font-semibold text-lg">
                Read what our customers have to say...
              </h2>
            </div>

            <div className="flex gap-5 text-[#135B3A] dark:text-green-400">
              <div className="text-center">
                <h2 className="text-2xl font-bold">488</h2>
                <p>Clients</p>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold">732</h2>
                <p>Projects</p>
              </div>
            </div>
          </section>

          {/* Book of Life Section */}
          <section className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="bg-[#135B3A] md:max-w-[250px] w-full h-[250px] rounded-md flex flex-col items-center justify-center text-white">
              <div className="flex items-center">
                <span className="text-5xl font-bold">
                  {averageRating.toFixed(1)}
                </span>
                <FaStar size={50} color="gold" />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">
                  {(averageRating * 20).toFixed(0)}%
                </p>
                <p>Customer satisfaction</p>
              </div>
            </div>

            <Link
              to="/book-of-life"
              className="w-full h-[250px] bg-no-repeat bg-center bg-cover rounded-xl relative overflow-hidden group cursor-pointer"
              style={{ backgroundImage: `url(${BKOL})` }}
            >
              <div
                id="book-of-life-overlay"
                className="absolute bottom-[-100%] left-0 w-full h-full bg-black bg-opacity-70 text-white p-4 flex flex-col justify-center items-start gap-2 transition-all duration-300 group-hover:bottom-0"
              >
                <h1 className="text-lg font-bold text-[#F0B52E] underline">
                  Discover “The Book Of Life”
                </h1>
                <p className="text-sm">
                  Step into the stories of those who shaped our journey.
                  Their legacies live on, offering comfort and inspiration.
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
                  className="bg-[#F0B52E] p-5 rounded-lg shadow-lg text-[#011309] flex flex-col gap-3 transition-transform hover:-translate-y-1"
                >
                  <p className="font-semibold underline text-lg">
                    - {testimonial.name}
                  </p>
                  <p className="text-sm">{testimonial.review}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <FaStar key={i} size={15} color="#011309" />
                    ))}
                    {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                      <FaStar key={i} size={15} color="gray" />
                    ))}
                  </div>
                </div>
              ))}
          </section>
        </div>
      </section>

      {/* === Latest Updates Section === */}
      <section className="pt-20 px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto w-full">
        <h2 className="text-3xl font-bold mb-8 text-[#135B3A] dark:text-green-500">
          Latest Updates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="rounded-2xl overflow-hidden shadow-lg bg-[#F0B52E] text-[#011309] transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <Link to={`/blog/${post.id}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </Link>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-[#011309]/80 mb-4 text-sm">
                  {post.description}
                </p>
                <Link
                  to={`/blog/${post.id}`}
                  className="text-[#135B3A] font-bold hover:underline transition-colors duration-200"
                >
                  Read more →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/blog">
            <button className="bg-[#135B3A] text-white px-6 py-3 rounded hover:bg-[#0E462D] transition-colors shadow-md font-bold">
              View More Articles
            </button>
          </Link>
        </div>
      </section>

      {/* === George Wood Foundation Section === */}
      <section className="pt-20 px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto w-full mb-20">
        <h1 className="text-3xl md:text-4xl font-bold text-[#135B3A] dark:text-green-500 mb-8">
          George Wood&#39;s Legacy
        </h1>
        <div className="bg-[#F0B52E] rounded-xl flex flex-col md:flex-row items-center gap-8 md:gap-12 p-6 md:p-10 w-full shadow-lg border border-white/10">
          <div className="w-full flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <h2 className="text-[#135B3A] text-xl md:text-2xl font-bold">
              Celebrating Life and Legacy
            </h2>
            <p className="text-[#011309] text-sm md:text-base leading-relaxed font-medium">
              George Wood&#39;s Legacy is a beacon of hope,
              dedicated to empowering youth and inspiring a new generation
              of leaders through education, mentorship, and service.
              Join us as we continue to nurture legacies and shape a
              brighter, more compassionate world.
            </p>
            <Link to="/giving">
              <button className="bg-[#135B3A] text-white font-semibold px-6 py-3 rounded-md shadow-lg hover:bg-[#0E462D] transition duration-300">
                Go to Page
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
