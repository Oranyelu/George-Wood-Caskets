

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300">
            <div className="max-w-[1300px] mx-auto px-4 md:px-8">
                <h1 className="text-3xl font-bold mb-6 text-[#135B3A] dark:text-green-500">Privacy Policy</h1>
                <p className="mb-6 text-gray-500 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="space-y-6">
                    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">1. Introduction</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Welcome to George Wood Caskets. We respect your privacy and are committed to protecting your personal data.
                            This privacy policy will inform you as to how we look after your personal data when you visit our website
                            and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">2. Data We Collect</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul className="list-disc list-inside ml-4 mt-2 text-gray-700 dark:text-gray-300 space-y-1">
                            <li>Identity Data: includes first name, last name.</li>
                            <li>Contact Data: includes email address and telephone numbers.</li>
                            <li>Transaction Data: includes details about payments to and from you and other details of products you have purchased from us.</li>
                        </ul>
                    </section>

                    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">3. How We Use Your Data</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc list-inside ml-4 mt-2 text-gray-700 dark:text-gray-300 space-y-1">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal or regulatory obligation.</li>
                        </ul>
                    </section>

                    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">4. Data Security</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                        </p>
                    </section>

                    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">5. Contact Us</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            If you have any questions about this privacy policy or our privacy practices, please contact us.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
