import { Link } from "react-router-dom";
import AboutImage from "../assets/nigerian_workshop_team.png";
import ScrollReveal from "../Components/ScrollReveal";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col font-montserrat pt-24 pb-12 bg-brand-cream dark:bg-primary-dark transition-colors duration-300">
      <main className="max-w-[1300px] mx-auto px-4 md:px-8 flex-grow">

        {/* Hero Section */}
        <section className="text-center mb-12">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#135B3A] dark:text-green-500 mb-6">About Us</h1>
            <p className="text-lg text-brand-black/90 dark:text-gray-300 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Since 1984, we have committed ourselves to absolute craftsmanship, deep compassion, and dedicated community support.
            </p>
          </ScrollReveal>
          
          <ScrollReveal className="w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl mb-10 border border-[#135B3A]/10 dark:border-white/5">
            <img src={AboutImage} alt="George Wood Caskets Team" className="w-full h-full object-cover" />
          </ScrollReveal>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ScrollReveal className="bg-brand-card dark:bg-brand-card-dark p-8 rounded-2xl border border-[#135B3A]/10 dark:border-white/5 shadow-md flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#135B3A] dark:text-green-400 mb-5">
                George Wood Caskets
              </h2>
              <p className="text-base mb-6 text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
                Founded in 1984 by George-Wood Mmaduka Chime, George Wood Caskets has established itself as a leading casket manufacturer in Nigeria. With decades of experience, our dedication to craftsmanship and quality has earned us the reputation of producing the finest caskets in the country. Our commitment to excellence and client satisfaction is at the core of everything we do.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-serif font-bold text-[#A37E2C] dark:text-yellow-500 mb-3">
                Our Mission
              </h3>
              <p className="text-base text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
                At George Wood Caskets, we understand the significance of our products in commemorating loved ones. We aim to provide caskets that reflect dignity, respect, and the unique essence of each individual. Our team of skilled artisans employs traditional craftsmanship combined with modern techniques to create caskets that are not only reliable but also aesthetically pleasing.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal className="bg-brand-card dark:bg-brand-card-dark p-8 rounded-2xl border border-[#135B3A]/10 dark:border-white/5 shadow-md flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#135B3A] dark:text-green-400 mb-5">
                George Wood&apos;s Legacy
              </h2>
              <p className="text-base mb-6 text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
                In 2024, we expanded our mission of care and compassion with the establishment of George Wood&apos;s Legacy (formerly George Wood Charity Foundation). This new arm of our enterprise aims to impact the lives of people beyond our immediate clientele, extending our dedication to support and uplift communities across Nigeria.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-serif font-bold text-[#A37E2C] dark:text-yellow-500 mb-3">
                Our Services & Craftsmanship
              </h3>
              <ul className="text-sm space-y-2.5 text-brand-black/80 dark:text-gray-300 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-[#135B3A] dark:text-green-500 font-bold mt-0.5">•</span>
                  <span><strong>Custom Casket Design:</strong> Bespoke layouts to reflect the personal requests and style of our clients.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#135B3A] dark:text-green-500 font-bold mt-0.5">•</span>
                  <span><strong>Premium Materials:</strong> Using carefully selected premium hardwoods, bronze, and luxury velvet interiors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#135B3A] dark:text-green-500 font-bold mt-0.5">•</span>
                  <span><strong>Artisanal Quality:</strong> Every casket is individually hand-carved, sanded, and polished by master carpenters.</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ScrollReveal className="bg-brand-card dark:bg-brand-card-dark p-8 rounded-2xl border border-[#135B3A]/10 dark:border-white/5 shadow-md">
            <h2 className="text-2xl font-serif font-bold text-[#135B3A] dark:text-green-400 mb-4">
              Our Founder
            </h2>
            <p className="text-base text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
              George-Wood Mmaduka Chime, the visionary behind George Wood Caskets and George Wood&apos;s Legacy, has always believed in combining business excellence with deep social responsibility. His leadership and passion for making a difference have been the driving force behind our continuous growth and community impact.
            </p>
          </ScrollReveal>

          <ScrollReveal className="bg-brand-card dark:bg-brand-card-dark p-8 rounded-2xl border border-[#135B3A]/10 dark:border-white/5 shadow-md flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#135B3A] dark:text-green-400 mb-4">
                Our Commitment
              </h2>
              <p className="text-base mb-6 text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
                At George Wood Caskets and George Wood&apos;s Legacy, we deeply care about our clients and the broader community. We are committed to providing the highest quality products and services while actively contributing to the well-being and development of society.
              </p>
            </div>
            
            <div className="border-t border-[#135B3A]/15 dark:border-white/5 pt-4">
              <p className="text-sm text-brand-black/80 dark:text-gray-300 font-light">
                Need to reach us? Please contact us on our{" "}
                <Link
                  to="/contacts"
                  className="text-[#135B3A] dark:text-green-400 underline font-bold hover:text-green-700"
                >
                  speak with us page
                </Link>
                . We are honored to serve you.
              </p>
            </div>
          </ScrollReveal>
        </section>

      </main>
    </div>
  );
};

export default AboutUs;
