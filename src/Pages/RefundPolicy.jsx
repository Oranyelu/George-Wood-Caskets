import React from 'react';

const RefundPolicy = () => {
    return (
        <div className="container mx-auto px-4 py-8 font-montserrat max-w-[1300px] mt-[70px] min-h-screen transition-colors duration-300">
            <h1 className="text-3xl font-bold mb-6 text-[#135B3A] dark:text-green-500">Refund and Return Policy</h1>
            <p className="mb-6 text-gray-500 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">1. Returns</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We have a [Number]-day return policy, which means you have [Number] days after receiving your item to request a return.
                    To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
                </p>
            </section>

            <section className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">2. Refunds</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too.
                </p>
            </section>

            <section className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">3. Exceptions / Non-returnable items</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Certain types of items cannot be returned, custom products (such as special orders or personalized items). Please get in touch if you have questions or concerns about your specific item.
                </p>
            </section>

            <section className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">4. Damages and issues</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
                </p>
            </section>
        </div>
    );
};

export default RefundPolicy;
