import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Charity = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-neutral min-h-screen font-sans pt-24 pb-12">
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

            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">{t('charity')}</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We believe in giving back to the community that has supported us for generations. Join us in our mission to make a difference.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="h-48 bg-gray-200 mb-4 rounded"></div>
                        <h3 className="text-xl font-bold text-primary mb-2">Community Support</h3>
                        <p className="text-gray-600">Providing assistance to families in need during difficult times.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="h-48 bg-gray-200 mb-4 rounded"></div>
                        <h3 className="text-xl font-bold text-primary mb-2">Education Initiative</h3>
                        <p className="text-gray-600">Scholarships and training programs for local youth.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="h-48 bg-gray-200 mb-4 rounded"></div>
                        <h3 className="text-xl font-bold text-primary mb-2">Heritage Preservation</h3>
                        <p className="text-gray-600">Projects dedicated to maintaining our cultural history and traditions.</p>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <button className="bg-secondary text-white text-xl font-bold px-8 py-3 rounded hover:bg-primary transition-colors">
                        Donate Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Charity;
