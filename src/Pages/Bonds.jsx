import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Bonds = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-neutral min-h-screen font-sans pt-24 pb-12">
            <Helmet>
                <title>George Wood Bonds | Investment Opportunities</title>
                <meta name="description" content="Invest in the future with George Wood Bonds. Secure, reliable, and rooted in tradition." />
                <script type="application/ld+json">
                    {`
            {
              "@context": "https://schema.org",
              "@type": "FinancialProduct",
              "name": "George Wood Bonds",
              "description": "Investment opportunities with George Wood Caskets.",
              "brand": {
                "@type": "Brand",
                "name": "George Wood Caskets"
              }
            }
          `}
                </script>
            </Helmet>

            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">{t('bonds')}</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Secure your future with George Wood Bonds. We offer stable investment opportunities backed by our legacy of trust and excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-secondary">
                        <h2 className="text-2xl font-serif font-bold text-primary mb-4">Standard Bond</h2>
                        <p className="text-gray-600 mb-6">Perfect for short-term investment goals with guaranteed returns.</p>
                        <button className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition-colors">
                            Learn More
                        </button>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-primary">
                        <h2 className="text-2xl font-serif font-bold text-primary mb-4">Premium Bond</h2>
                        <p className="text-gray-600 mb-6">Long-term growth with exclusive benefits and higher yield rates.</p>
                        <button className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition-colors">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bonds;
