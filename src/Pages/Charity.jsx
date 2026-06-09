import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../Components/ScrollReveal';

const Charity = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300">
            <Helmet>
                <title>George Wood Charity Foundation | Giving Back</title>
                <meta name="description" content="The George Wood Charity Foundation is dedicated to supporting our community and preserving our heritage." />
                <script type="application/ld+json">
                    {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "George Wood Charity Foundation",
              "description": "Philanthropic arm of George Wood Caskets.",
              "parentOrganization": {
                "@type": "Organization",
                "name": "George Wood Caskets"
              }
            }
          `}
                </script>
            </Helmet>

            <div className="container mx-auto px-4 max-w-[1300px]">
                <ScrollReveal className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#135B3A] dark:text-green-500 mb-4">{t('charity')}</h1>
                    <p className="text-lg text-brand-black/80 dark:text-gray-300 max-w-2xl mx-auto font-light">
                        We believe in giving back to the community that has supported us for generations. Join us in our mission to make a difference.
                    </p>
                </ScrollReveal>

                <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="bg-brand-card dark:bg-brand-card-dark p-8 rounded-2xl shadow-md border border-[#135B3A]/10 dark:border-white/5 text-brand-black dark:text-brand-white transition-colors">
                        <div className="h-40 bg-[#135B3A]/5 dark:bg-white/5 mb-6 rounded-2xl flex items-center justify-center text-4xl">
                            🤝
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-3 text-primary dark:text-green-400">Community Support</h3>
                        <p className="text-brand-black/80 dark:text-gray-300 text-sm leading-relaxed">Providing physical, emotional, and financial assistance to families in need during difficult moments.</p>
                    </div>
                    <div className="bg-brand-card dark:bg-brand-card-dark p-8 rounded-2xl shadow-md border border-[#135B3A]/10 dark:border-white/5 text-brand-black dark:text-brand-white transition-colors">
                        <div className="h-40 bg-[#135B3A]/5 dark:bg-white/5 mb-6 rounded-2xl flex items-center justify-center text-4xl">
                            📚
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-3 text-primary dark:text-green-400">Education Initiative</h3>
                        <p className="text-brand-black/80 dark:text-gray-300 text-sm leading-relaxed">Offering scholarships, vocational training, and mentorship programs for local youth to shape future leaders.</p>
                    </div>
                    <div className="bg-brand-card dark:bg-brand-card-dark p-8 rounded-2xl shadow-md border border-[#135B3A]/10 dark:border-white/5 text-brand-black dark:text-brand-white transition-colors">
                        <div className="h-40 bg-[#135B3A]/5 dark:bg-white/5 mb-6 rounded-2xl flex items-center justify-center text-4xl">
                            🏛️
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-3 text-primary dark:text-green-400">Heritage Preservation</h3>
                        <p className="text-brand-black/80 dark:text-gray-300 text-sm leading-relaxed">Sponsoring civic projects dedicated to preserving our rich cultural history, landmarks, and traditions.</p>
                    </div>
                </ScrollReveal>

                <ScrollReveal className="text-center mt-12">
                    <button className="bg-[#135B3A] dark:bg-green-700 hover:bg-[#0E462D] dark:hover:bg-green-800 text-white text-lg font-bold px-8 py-3.5 rounded-xl transition-colors shadow-lg">
                        Donate Now
                    </button>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default Charity;
