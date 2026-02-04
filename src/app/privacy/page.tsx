
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Infysmart Solutions",
  description: "Privacy Policy outlining how Infysmart Solutions collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-blue max-w-none text-gray-500">
          <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, request customer support, or otherwise communicate with us. The types of information we may collect include your name, email address, postal address, phone number, and any other information you choose to provide.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to provide, maintain, and improve our services, including to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Process transactions and send related information</li>
            <li>Send you technical notices, updates, security alerts, and support and administrative messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Communicate with you about products, services, offers, and events</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Log Data</h2>
          <p className="mb-4">
            We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer’s Internet Protocol (“IP”) address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Cookies</h2>
          <p className="mb-4">
            Our website uses "cookies" to collect information and to improve our Service. You have the option to either accept or refuse these cookies, and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our Service.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Security</h2>
          <p className="mb-4">
            We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Contact Us</h2>
          <p className="mb-4">
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
          </p>
        </div>
      </div>
    </div>
  );
}