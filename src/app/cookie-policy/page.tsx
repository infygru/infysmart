
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cookie Policy | Infysmart Solutions",
    description: "Cookie Policy explaining how Infysmart Solutions uses cookies.",
};

export default function CookiePolicyPage() {
    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
                    Cookie Policy
                </h1>
                <div className="prose prose-blue max-w-none text-gray-500">
                    <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. What Are Cookies</h2>
                    <p className="mb-4">
                        Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. How We Use Cookies</h2>
                    <p className="mb-4">
                        When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>To enable certain functions of the Service</li>
                        <li>To provide analytics</li>
                        <li>To store your preferences</li>
                        <li>To enable advertisements delivery, including behavioral advertising</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Third-Party Cookies</h2>
                    <p className="mb-4">
                        In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Your Choices Regarding Cookies</h2>
                    <p className="mb-4">
                        If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Contact Us</h2>
                    <p className="mb-4">
                        If you have any questions about our Cookie Policy, please contact us.
                    </p>
                </div>
            </div>
        </div>
    );
}
