import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

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
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#135B3A] dark:text-green-500 mb-4">{t('charity')}</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        We believe in giving back to the community that has supported us for generations. Join us in our mission to make a difference.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 transition-colors">
                        <div className="h-48 bg-gray-200 dark:bg-gray-700 mb-4 rounded flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">Image Placeholder</div>
                        <h3 className="text-xl font-bold text-[#135B3A] dark:text-white mb-2">Community Support</h3>
                        <p className="text-gray-600 dark:text-gray-300">Providing assistance to families in need during difficult times.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 transition-colors">
                        <div className="h-48 bg-gray-200 dark:bg-gray-700 mb-4 rounded flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">Image Placeholder</div>
                        <h3 className="text-xl font-bold text-[#135B3A] dark:text-white mb-2">Education Initiative</h3>
                        <p className="text-gray-600 dark:text-gray-300">Scholarships and training programs for local youth.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 transition-colors">
                        <div className="h-48 bg-gray-200 dark:bg-gray-700 mb-4 rounded flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">Image Placeholder</div>
                        <h3 className="text-xl font-bold text-[#135B3A] dark:text-white mb-2">Heritage Preservation</h3>
                        <p className="text-gray-600 dark:text-gray-300">Projects dedicated to maintaining our cultural history and traditions.</p>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <button className="bg-[#D4AF37] text-white text-xl font-bold px-8 py-3 rounded hover:bg-[#b5952f] transition-colors shadow-lg">
                        Donate Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Charity;
