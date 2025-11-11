import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Card, CardContent, Button } from "@mui/material";
import { ProductContext } from "../Providers/ProductProvider";
import Products from "../assets/product-api"; // product data
import Services from "../assets/service-api"; // service data
import TestimonialsData from "../assets/Testinonials-api"; // testimonials
import Logo from "../assets/Favicon.svg"; // hero logo
import BKOL from "../assets/svgs/bookoflife.svg"; // Book of Life image

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
    <div className="bg-white min-h-screen flex flex-col font-montserrat">

      {/* === Notification === */}
      {notification && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white px-4 py-2 rounded shadow-lg text-center">
            {notification}
          </div>
        </div>
      )}

      {/* === Hero Section === */}
      <section className="bg-[#135B3A] text-white py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between rounded-b-[50px]">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Celebrating Life and <br /> Legacies since 1984
          </h1>
          <p className="mt-6 text-base md:text-lg text-gray-200">
            At George Wood Casket, we are deeply committed to the art of
            craftsmanship. Since 1984, our legacy has been built on creating
            high-quality, meticulously crafted caskets that honor life and
            legacy.
          </p>
        </div>
        <div className="mt-12 md:mt-0 flex flex-col items-center">
          <img src={Logo} alt="George Wood Logo" className="w-50 h-50 object-contain" />
          <p className="mt-4 text-xl font-semibold text-[#F0B52E]">41 Years</p>
        </div>
      </section>

      {/* === Featured Products Section === */}
      <section className="products-section pt-[40px] p-4">
        <header className="flex flex-col text-center">
          <h2 className="text-[24.8px] text-[#135B3A] font-bold">
            Featured Products
          </h2>
          <p className="text-[15px] text-[#8b6824] pb-7">
            Make your choice based on popular demand...
          </p>
        </header>

        {["Xclusive", "Classic"].map((category) => {
          const filteredProducts = featuredProducts.filter(
            (product) => product.label === category
          );

          return (
            <div key={category} className="mb-8">
              <h3 className="text-[20px] font-bold text-[#011309] mb-4">
                {category} Collection
              </h3>
              <ul className="flex gap-4 overflow-x-auto snap-x snap-mandatory"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {filteredProducts.map((product) => (
                  <li
                    key={product.id}
                    className="flex-shrink-0 w-[250px] bg-white bg-opacity-100 backdrop-filter backdrop-blur-md border border-white border-opacity-20 p-4 rounded-lg shadow-lg snap-center"
                  >
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-[166.66px] object-cover rounded-md"
                      />
                    </Link>
                    <h1 className="text-lg font-semibold mt-2 text-[#011309]">
                      {product.name}
                    </h1>
                    <p>Price: {product.price.toLocaleString()} NGN </p>
                    <p>Color: {product.color}</p>
                    <div className="w-full flex justify-end">
                      <button
                        className="bg-[#135B3A] text-white px-2 py-1 rounded mt-2 hover:bg-[#8b6824] active:bg-[#70541c] transition-colors"
                        onClick={() => handleAddToCart(product)}
                      >
                        Order Now
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <div className="text-center mt-6">
          <Link to="/products">
            <button className="bg-[#135B3A] text-white px-6 py-3 rounded hover:bg-[#8b6824] active:bg-[#70541c] transition-colors">
              View All Products
            </button>
          </Link>
        </div>
      </section>

      {/* === Featured Services Section === */}
      <section className="achievements-section pt-[40px] p-4">
        <header className="flex flex-col text-center">
          <h2 className="text-[24.8px] text-[#135B3A] font-bold pb-9">
            Featured Services
          </h2>
        </header>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {randomServices.map((service) => (
            <li
              key={service.id}
              className="bg-[#f0c068] bg-opacity-100 backdrop-filter backdrop-blur-md border border-white border-opacity-20 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center h-[200px] transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <h2 className="text-lg font-semibold text-[#135B3A] mb-2">
                {service.name}
              </h2>
              <p className="text-white text-center">
                {service.description || "Lorem ipsum dolor sit amet consectetur."}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* === Testimonials Section === */}
      <section className="w-full flex justify-center pt-10">
        <div className="w-[95%] flex flex-col text-white gap-8">
          <section className="flex justify-between sm:flex-row flex-col">
            <div>
              <h1 className="font-bold text-[25px] text-[#135B3A]">
                Why Choose George Wood Casket?
              </h1>
              <h2 className="text-[#8b6824]">Read what our customers have to say...</h2>
            </div>

            <div className="flex gap-5">
              <div className="text-center text-[#135B3A]">
                <h2 className="text-[25px] font-bold">482</h2>
                <p>Clients</p>
              </div>
              <div className="text-center text-[#135B3A]">
                <h2 className="text-[25px] font-bold">726</h2>
                <p>Projects</p>
              </div>
            </div>
          </section>

          {/* Book of Life Section */}
          <section className="flex flex-col md:flex-row justify-between items-center gap-5">
            <div className="bg-[#135B3A] md:max-w-[250px] w-full h-[250px] rounded-md flex flex-col items-center justify-center">
              <div className="flex items-center">
                <span className="text-[60px] font-bold">{averageRating.toFixed(1)}</span>
                <FaStar size={50} color="gold" />
              </div>
              <div className="text-center">
                <p className="font-bold text-[20px]">{(averageRating * 20).toFixed(0)}%</p>
                <p>Customer satisfaction</p>
              </div>
            </div>

  <div
    className="w-[100%] h-[250px] bg-no-repeat bg-center bg-cover rounded-xl relative overflow-hidden"
    style={{ backgroundImage: `url(${BKOL})` }}
  >
    <div className="absolute inset-0 flex flex-col justify-end items-start p-4 bg-black bg-opacity-40">
      <Link to="/book-of-life" className="text-white underline hover:text-[#A37E2C]">
        <h1 className="text-white text-md md:text-lg lg:text-xl font-bold hover:text-[#A37E2C]">
          Discover “The Book Of Life”
        </h1>
      </Link>
      <p className="text-white text-left text-xs md:text-sm lg:text-base">
        &ldquo;Step into the stories of those who shaped our journey. Each story is a reflection of love, strength, and unforgettable moments. In these pages, their legacies live on, offering comfort and inspiration.&rdquo;
      </p>
    </div>
  </div>
          </section>

          {/* Individual Testimonials */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 6)
              .map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-[#135B3A] bg-opacity-7 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg text-white flex flex-col gap-3"
                >
                  <p className="font-semibold underline text-lg">- {testimonial.name}</p>
                  <p className="text-sm">{testimonial.review}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, index) => (
                      <FaStar key={index} size={15} color="gold" />
                    ))}
                    {Array.from({ length: 5 - testimonial.rating }).map((_, index) => (
                      <FaStar key={index} size={15} color="gray" />
                    ))}
                  </div>
                </div>
              ))}
          </section>
        </div>
      </section>

      {/* === Latest Updates Section === */}
      <section className="mt-10 px-4 md:px-10 lg:px-20">
        <h2 className="text-2xl font-bold mb-6">Latest Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="rounded-lg overflow-hidden shadow-lg">
              <Link to={`/blog/${post.id}`}>
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover cursor-pointer" />
              </Link>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <Link to={`/blog/${post.id}`} className="text-primary hover:underline">
                  Read more →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link to="/blog">
            <Button variant="outline">View More Articles</Button>
          </Link>
        </div>
      </section>

      {/* === George Wood Foundation Section === */}
      <section className="flex flex-col p-6 text-[#135B3A] gap-8 mt-8 mb-10">
        <h1 className="text-[28px] md:text-[35px] font-bold underline text-center">
          GEORGE WOOD CHARITY FOUNDATION
        </h1>
        <div className="bg-[#135B3A] rounded-xl flex flex-col md:flex-row items-center gap-8 md:gap-12 p-6 md:p-10 w-[98%] md:w-[98%] mx-auto">
          <div className="w-full flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <h2 className="text-[#f0c068] text-[20px] md:text-[25px] font-bold">
              Celebrating Life and Legacy
            </h2>
            <p className="text-white text-sm md:text-base leading-relaxed">
              Discover the George Wood Charity Foundation: a beacon of hope dedicated to
              empowering the youth and inspiring a new generation of leaders.
              George Wood Charity Foundation is a non-profit organization that supports
              the local community through philanthropy and volunteerism. The
              Foundation is dedicated to advancing George Wood&#39;s mission of
              education, research, and service. Join us in nurturing the
              potential of young minds to create a brighter, more innovative
              future.
            </p>
            <Link to="giving">
              <button
                className="bg-white text-[#135B3A] font-semibold px-6 py-3 rounded-md shadow-lg hover:shadow-xl transition duration-300"
                style={{ minHeight: "56px", minWidth: "160px" }}
              >
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
