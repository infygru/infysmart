
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cookie Policy | Infysmart Solutions",
    description: "Cookie Policy explaining how Infysmart Solutions uses cookies.",
    alternates: { canonical: 'https://infysmart.com/cookie-policy' },
    robots: { index: false, follow: false }
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

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Session vs. Persistent Cookies</h2>
                    <p className="mb-4">
                        Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on your personal computer or mobile device when you go offline, while Session Cookies are deleted as soon as you close your web browser. InfySmart uses both session and persistent cookies to operate the site securely and maintain user preferences.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Performance and Analytics</h2>
                    <p className="mb-4">
                        We utilize third-party analytics services (such as Google Analytics) to understand how visitors interact with our website. These tools use cookies to collect information such as:
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>The pages you visit most frequently on our site.</li>
                        <li>The time spent on technical spec sheets or product pages.</li>
                        <li>The geographic region from which you are accessing our site (to better route service requests).</li>
                    </ul>
                    <p className="mb-4">
                        This information is aggregated and anonymized. It helps us optimize the user experience and ensure we are providing the most relevant content regarding CCTV, Solar, and Automation technologies.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Your Choices Regarding Cookies</h2>
                    <p className="mb-4">
                        If you&apos;d like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-6 border-b pb-2">Cookie Policy FAQs</h2>

                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">Do your cookies track the CCTV cameras installed in my house?</h4>
                            <p className="text-sm">
                                Absolutely not. The cookies mentioned in this policy apply <strong>only</strong> to your browsing activity on infysmart.com. We do not use web cookies to interface with, track, or monitor the physical hardware (cameras, DVRs, bio-metric machines) installed at your premises.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">Can I use the InfySmart website if I disable all cookies?</h4>
                            <p className="text-sm">
                                Yes. You can browse our service catalogs, read our blog, and view our portfolio with cookies disabled. However, certain interactive features, such as submitting complex tender requirement forms or saving your location preferences for service routing, may not function optimally.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">Do you sell my cookie data to third parties?</h4>
                            <p className="text-sm">
                                No. InfySmart Solutions does not sell your browsing data, IP addresses, or cookie profiles to data brokers or marketing agencies. Analytics data is used strictly internally to improve our website design and customer service delivery.
                            </p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">Contact Us</h2>
                    <p className="mb-4">
                        If you have any questions about our Cookie Policy, please contact our web administration team at <strong>admin@infysmart.com</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
}
