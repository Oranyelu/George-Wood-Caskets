import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300">
            <div className="max-w-[1300px] mx-auto px-4 md:px-8">
                <h1 className="text-3xl font-bold mb-6 text-[#135B3A] dark:text-green-500">Terms and Conditions</h1>
                <p className="mb-6 text-gray-500 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="space-y-6">
                    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">1. Agreement to Terms</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and George Wood Caskets ("we," "us" or "our"), concerning your access to and use of our website.
                        </p>
                    </section>

                    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">2. Products</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products.
                        </p>
                    </section>

                    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">3. Purchases and Payment</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We accept the following forms of payment: Paystack. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.
                        </p>
                    </section>

                    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">4. Return Policy</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Please review our Return Policy posted on the Site prior to making any purchases.
                        </p>
                    </section>

                    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">5. Contact Us</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
