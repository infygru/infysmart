
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Infysmart Solutions",
  description: "Terms and Conditions for using Infysmart Solutions services and website.",
  alternates: { canonical: '/terms' }
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

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Hardware Installation & Commissioning</h2>
          <p className="mb-4">
            For clients engaging InfySmart Solutions for physical infrastructure deployment (CCTV, Solar, Automation):
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Site Readiness:</strong> The client is responsible for providing necessary civil clearances, uninterrupted power supply, and safe working conditions for our installation teams. Delays caused by site unreadiness may incur additional remobilization charges.</li>
            <li><strong>Third-Party Damage:</strong> InfySmart Solutions is not liable for damages caused to installed equipment by third-party civil contractors, painters, or electricians working on the same premises after the equipment has been commissioned.</li>
            <li><strong>Force Majeure:</strong> We shall not be liable for any delay or failure to perform our obligations if such delay or failure is due to causes beyond our reasonable control, including but not limited to acts of God, extreme weather (e.g., cyclones affecting solar panels), strikes, or government restrictions.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Annual Maintenance Contracts (AMC)</h2>
          <p className="mb-4">
            Services rendered under an AMC are governed by the specific Service Level Agreement (SLA) signed between InfySmart Solutions and the client. General terms include:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>AMCs do not cover physical damage, liquid damage, or damage caused by voltage surges (unless specific surge protection devices were mandated and installed by InfySmart).</li>
            <li>Response times specified in the SLA are applicable only during standard business hours unless a 24/7 critical-response contract has been explicitly purchased.</li>
            <li>Any attempt to repair, modify, or reconfigure the hardware or software by unauthorized personnel will immediately void the active AMC.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">8. Governing Law</h2>
          <p className="mb-4">
            These terms will be governed by and interpreted in accordance with the laws of India. Any disputes arising from these terms or the provision of services shall be subject to the exclusive jurisdiction of the state and federal courts located in Chennai, Tamil Nadu.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-6 border-b pb-2">Frequently Asked Questions: Terms of Service</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2">If a camera gets damaged by lightning, does the warranty cover it?</h4>
              <p className="text-sm">
                No. Standard OEM warranties (from brands like Hikvision, Dahua) and our installation guarantees cover manufacturing defects and normal operational failures. &quot;Acts of God,&quot; including lightning strikes, floods, and severe voltage surges from the municipal grid, are strictly excluded from warranties. We strongly recommend clients ensure their premises have proper earthing and utilize our Surge Protection Devices (SPDs) to minimize this risk.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2">Can we use our own electrician to run the cables before you install the cameras?</h4>
              <p className="text-sm">
                While possible, it is not recommended. If a third-party electrician lays the cables, InfySmart Solutions cannot guarantee the video quality or network stability, as we cannot verify the shielding quality of the cable or if it was run too close to high-voltage lines (causing electromagnetic interference). If you choose to use your own cabling, our warranty will only cover the camera hardware itself, not signal degradation issues.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2">What happens if a product is discontinued by the manufacturer during my AMC?</h4>
              <p className="text-sm">
                Technology evolves rapidly. If a specific camera model or biometric scanner fails during your Comprehensive AMC, and that exact model has reached End-of-Life (EoL) by the manufacturer, InfySmart Solutions is obligated to replace the faulty unit with a newer model possessing equivalent or superior technical specifications at no additional cost to you.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">Contacting Legal</h2>
          <p className="mb-4">
            If you require clarification on any of these terms before signing a contract with InfySmart Solutions (A unit of Infygru Pvt Ltd), please contact our legal department at <strong>legal@infysmart.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}