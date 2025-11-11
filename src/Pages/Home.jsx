import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Card, CardContent } from "@mui/material";
import { ProductContext } from "../Providers/ProductProvider";
import Products from "../assets/product-api"; // product data
import Services from "../assets/service-api"; // service data
import TestimonialsData from "../assets/Testinonials-api"; // testimonials
import Logo from "../assets/Favicon.svg"; // hero logo
import BKOL from "../assets/svgs/bookoflife.svg"; // Book of Life image

function HeroSection() {
  const foundingYear = 1984;
  const [years, setYears] = useState(new Date().getFullYear() - foundingYear);

  useEffect(() => {
    const interval = setInterval(() => {
      setYears(new Date().getFullYear() - foundingYear);
    }, 1000 * 60 * 60 * 24); // Update daily just in case

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#135B3A] text-white py-20 px-6 md:px-10 lg:px-20 flex flex-col md:flex-row items-center justify-between rounded-b-[50px] max-w-[1300px] mx-auto w-full">
      {/* Left Content */}
      <div className="max-w-xl text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
          Honouring Life <br /> and Legacies since 1984
        </h1>
        <p className="mt-6 text-base md:text-lg text-gray-200">
          At George Wood Casket, every creation tells a story. For over four
          decades, we have refined the art of craftsmanship, creating timeless
          pieces that embody love, dignity, and remembrance.
        </p>
      </div>

      {/* Right Logo with Years */}
      <div className="mt-12 md:mt-0 flex flex-col items-center">
        <img
          src={Logo}
          alt="George Wood Logo"
          className="w-48 h-48 md:w-56 md:h-56 object-contain animate-spin-slow"
        />
        <p className="mt-4 text-5xl font-bold text-[#F0B52E]">{years} Years</p>
      </div>
    </section>
  );
}

function Home() {
  const { addToCart } = useContext(ProductContext);
  const { productsData } = Products;
  const { servicesData } = Services;

  const [notification, setNotification] = useState(null);
  const [randomServices, setRandomServices] = useState([]);
  const [featuredProducts, setRandomProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [posts, setPosts] = useState([]);

  // --- Handle Add to Cart ---
  const handleAddToCart = (item) => {
    addToCart(item);
    setNotification(`Added to cart: ${item.name}`);
    setTimeout(() => setNotification(null), 3000);
  };

  // --- Select random products ---
  useEffect(() => {
    const getRandomItems = (arr, count) =>
      [...arr].sort(() => 0.5 - Math.random()).slice(0, count);

    const xclusiveProducts = getRandomItems(
      productsData.filter((p) => p.label === "Xclusive"),
      8
    );

    const classicProducts = getRandomItems(
      productsData.filter((p) => p.label === "Classic"),
      8
    );

    setRandomProducts([...xclusiveProducts, ...classicProducts]);
  }, [productsData]);

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
        const response = await fetch("/src/assets/blogPosts.json");
        const data = await response.json();
        const sortedPosts = data.sort(
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
    <div className="bg-white min-h-screen flex flex-col font-montserrat overflow-x-hidden">
      {/* === Hero Section === */}
      <HeroSection />

      {/* === Notification === */}
      {notification && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white px-4 py-2 rounded shadow-lg text-center">
            {notification}
          </div>
        </div>
      )}

      {/* === Featured Products Section === */}
      <section className="pt-20 px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto w-full">
        <header className="flex flex-col text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-[#135B3A] font-bold">
            Featured Products
          </h2>
          <p className="text-base md:text-lg text-[#8b6824] mt-2">
            Make your choice based on popular demand...
          </p>
        </header>

        {["Xclusive", "Classic"].map((category) => {
          const filteredProducts = featuredProducts.filter(
            (product) => product.label === category
          );

          return (
            <div key={category} className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-[#011309] mb-6">
                {category} Collection
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-4 rounded-lg shadow-lg flex flex-col transition-transform hover:scale-105 duration-300"
                  >
                    <Link
                      to={`/product/${product.id}`}
                      className="overflow-hidden rounded-md"
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-md"
                        loading="lazy"
                      />
                    </Link>

                    <div className="mt-3 flex flex-col flex-1">
                      <h1 className="text-lg font-semibold text-[#011309]">
                        {product.name}
                      </h1>
                      <p className="text-[#135B3A] font-medium mt-1">
                        Price: {product.price.toLocaleString()} NGN
                      </p>
                      <p className="text-gray-600 mt-1">
                        Color: {product.color}
                      </p>
                    </div>

                    <div className="mt-4 flex justify-center">
                      <button
                        className="bg-[#135B3A] text-white px-4 py-2 rounded w-full hover:bg-[#8b6824] active:bg-[#70541c] transition-colors"
                        onClick={() => handleAddToCart(product)}
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="text-center mt-10">
          <Link to="/products">
            <button className="bg-[#135B3A] text-white px-6 py-3 rounded hover:bg-[#8b6824] active:bg-[#70541c] transition-colors">
              View All Products
            </button>
          </Link>
        </div>
      </section>

      {/* === Featured Services Section === */}
      <section className="pt-20 px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto w-full">
        <header className="flex flex-col text-center mb-10">
          <h2 className="text-3xl text-[#135B3A] font-bold">
            Featured Services
          </h2>
        </header>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {randomServices.map((service) => (
            <li
              key={service.id}
              className="bg-[#F0B52E] p-6 rounded-lg shadow-lg flex flex-col items-center justify-center h-[200px] transform hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-lg font-semibold text-[#135B3A] mb-2 font-bold text-center">
                {service.name}
              </h2>
              <p className="text-white text-center">
                {service.description || "Description coming soon."}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* === Testimonials Section === */}
      <section className="pt-20 px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto w-full">
        <div className="flex flex-col text-white gap-8">
          <section className="flex justify-between sm:flex-row flex-col">
            <div>
              <h1 className="font-bold text-3xl text-[#135B3A]">
                Why Choose George Wood Casket?
              </h1>
              <h2 className="text-[#8b6824]">
                Read what our customers have to say...
              </h2>
            </div>

            <div className="flex gap-5 text-[#135B3A]">
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
            <div className="bg-[#135B3A] md:max-w-[250px] w-full h-[250px] rounded-md flex flex-col items-center justify-center">
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

            <div
              className="w-full h-[250px] bg-no-repeat bg-center bg-cover rounded-xl relative overflow-hidden"
              style={{ backgroundImage: `url(${BKOL})` }}
            >
              <div
                id="book-of-life-overlay"
                className="absolute bottom-[-100%] left-0 w-full h-full bg-black bg-opacity-70 text-white p-4 flex flex-col justify-center items-start gap-2 transition-all duration-300"
              >
                <Link
                  to="/book-of-life"
                  className="text-white underline hover:text-[#A37E2C]"
                >
                  <h1 className="text-lg font-bold">
                    Discover “The Book Of Life”
                  </h1>
                </Link>
                <p className="text-sm">
                  Step into the stories of those who shaped our journey.
                  Their legacies live on, offering comfort and inspiration.
                </p>
              </div>
            </div>
          </section>

          {/* Testimonials Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 6)
              .map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-[#135B3A] p-5 rounded-lg shadow-lg text-white flex flex-col gap-3"
                >
                  <p className="font-semibold underline text-lg">
                    - {testimonial.name}
                  </p>
                  <p className="text-sm">{testimonial.review}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <FaStar key={i} size={15} color="gold" />
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
        <h2 className="text-3xl font-bold mb-8 text-[#135B3A]">
          Latest Updates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="rounded-2xl overflow-hidden shadow-lg bg-[#F0B52E] text-[#135B3A] transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <Link to={`/blog/${post.id}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                />
              </Link>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-[#011309] mb-4 text-sm">
                  {post.description}
                </p>
                <Link
                  to={`/blog/${post.id}`}
                  className="text-[#135B3A] font-medium hover:text-[#011309] transition-colors duration-200"
                >
                  Read more →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/blog">
            <button className="bg-[#135B3A] text-white px-6 py-3 rounded hover:bg-[#8b6824] active:bg-[#70541c] transition-colors">
              View More Articles
            </button>
          </Link>
        </div>
      </section>

      {/* === George Wood Foundation Section === */}
      <section className="pt-20 px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto w-full mb-20">
        <h1 className="text-3xl md:text-4xl font-bold text-[#135B3A] mb-8">
          George Wood&#39;s Legacy
        </h1>
        <div className="bg-[#135B3A] rounded-xl flex flex-col md:flex-row items-center gap-8 md:gap-12 p-6 md:p-10 w-full">
          <div className="w-full flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <h2 className="text-[#f0c068] text-xl md:text-2xl font-bold">
              Celebrating Life and Legacy
            </h2>
            <p className="text-white text-sm md:text-base leading-relaxed">
              George Wood&#39;s Legacy is a beacon of hope,
              dedicated to empowering youth and inspiring a new generation
              of leaders through education, mentorship, and service.
              Join us as we continue to nurture legacies and shape a
              brighter, more compassionate world.
            </p>
            <Link to="/giving">
              <button className="bg-white text-[#135B3A] font-semibold px-6 py-3 rounded-md shadow-lg hover:shadow-xl transition duration-300">
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
