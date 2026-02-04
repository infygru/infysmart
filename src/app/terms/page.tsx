
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Infysmart Solutions",
  description: "Terms and Conditions for using Infysmart Solutions services and website.",
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
          Terms and Conditions
        </h1>
        <div className="prose prose-blue max-w-none text-gray-500">
          <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Infysmart Solutions. These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to comply with and be bound by these terms. If you do not agree with any part of these terms, please do not use our website.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Intellectual Property Rights</h2>
          <p className="mb-4">
            Unless otherwise stated, Infysmart Solutions and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access this from Infysmart Solutions for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <p className="mb-4">You must not:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Republish material from Infysmart Solutions</li>
            <li>Sell, rent, or sub-license material from Infysmart Solutions</li>
            <li>Reproduce, duplicate, or copy material from Infysmart Solutions</li>
            <li>Redistribute content from Infysmart Solutions</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. User Responsibilities</h2>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Limitation of Liability</h2>
          <p className="mb-4">
            In no event shall Infysmart Solutions, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website whether such liability is under contract. Infysmart Solutions, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Revisions</h2>
          <p className="mb-4">
            Infysmart Solutions is permitted to revise these terms at any time as it sees fit, and by using this website you are expected to review these terms on a regular basis.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Governing Law</h2>
          <p className="mb-4">
            These terms will be governed by and interpreted in accordance with the laws of the India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms and Conditions, please contact us.
          </p>
        </div>
      </div>
    </div>
  );
}