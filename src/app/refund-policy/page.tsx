
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Payment and Refund Policy | Infysmart Solutions",
    description: "Payment and Refund Policy for Infysmart Solutions products and services.",
};

export default function RefundPolicyPage() {
    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
                    Payment and Refund Policy
                </h1>
                <div className="prose prose-blue max-w-none text-gray-500">
                    <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Payment Terms</h2>
                    <p className="mb-4">
                        Infysmart Solutions accepts various methods of payment including credit/debit cards, bank transfers, and UPI. Payment terms for services such as installation, AMC, or bulk product purchases will be specified in the invoice or contract provided to you.
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li><strong>Products:</strong> 100% advance payment is required for product dispatch unless otherwise agreed in writing.</li>
                        <li><strong>Services/Projects:</strong> A standard advance of 50-70% is required to mobilise resources, with the balance due upon completion/commissioning.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Cancellation Policy</h2>
                    <p className="mb-4">
                        <strong>Orders:</strong> Orders once placed cannot be cancelled if the material has already been dispatched. If the order is cancelled before dispatch, a cancellation fee of 5% may be applicable to cover processing charges.
                    </p>
                    <p className="mb-4">
                        <strong>Services:</strong> Service appointments can be rescheduled or cancelled with at least 24 hours notice. Cancellations made within 24 hours of the scheduled service time may incur a visitation charge.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Refund Policy</h2>
                    <p className="mb-4">
                        Refunds will be processed under the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li><strong>Defective Products:</strong> If a product is found to be defective upon delivery, it will be replaced. If a replacement is not available, a full refund will be initiated.</li>
                        <li><strong>Service Satisfaction:</strong> If you are not satisfied with our service, please report the issue within 48 hours. We will attempt to rectify the issue. If the issue cannot be resolved, a partial or full refund may be considered at the discretion of management.</li>
                    </ul>
                    <p className="mb-4">
                        Refunds will be processed within 7-10 working days to the original mode of payment.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Warranty</h2>
                    <p className="mb-4">
                        Products sold by Infysmart Solutions carry the respective manufacturer's warranty. Infysmart Solutions will assist in the warranty claim process but is not directly liable for manufacturing defects. Service warranty is provided as per the terms mentioned in the AMC or installation contract.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Contact Us</h2>
                    <p className="mb-4">
                        For any queries regarding payments or refunds, please contact our accounts department at <a href="mailto:accounts@infysmart.com" className="text-brand-blue hover:underline">accounts@infysmart.com</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
