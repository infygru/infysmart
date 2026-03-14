
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Payment and Refund Policy | Infysmart Solutions",
    description: "Payment and Refund Policy for Infysmart Solutions products and services.",
    alternates: { canonical: 'https://infysmart.com/refund-policy' },
    robots: { index: false, follow: false }
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

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Warranty & RMA (Return Merchandise Authorization)</h2>
                    <p className="mb-4">
                        Products sold by Infysmart Solutions carry the respective OEM (Original Equipment Manufacturer) warranty (e.g., Hikvision, Dahua, Matrix).
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li><strong>Dead on Arrival (DOA):</strong> If a camera, DVR, or bio-metric scanner is found to be non-functional immediately upon unboxing during installation, our technicians will replace it with a new unit from our inventory within 48 hours.</li>
                        <li><strong>In-Warranty Repairs (RMA):</strong> If a unit fails after successful commissioning but within the warranty period, InfySmart will unmount the device and facilitate the RMA process with the manufacturer&apos;s service center. <em>Refunds are not issued for hardware failures; only repairs or replacements as dictated by OEM policies.</em></li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. AMC (Annual Maintenance Contract) Refunds</h2>
                    <p className="mb-4">
                        Annual Maintenance Contracts govern ongoing service labor.
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li><strong>Premature Cancellation:</strong> If a client chooses to terminate an active AMC prior to its expiry date, refunds are processed on a pro-rata basis. The refund amount is calculated by deducting the cost of the months elapsed and a standard 10% administrative termination fee from the total contract value.</li>
                        <li><strong>Breach of SLA:</strong> If InfySmart fails to meet the documented Response Time Service Level Agreements (SLAs) for 3 consecutive breakdown calls, the client is entitled to terminate the contract and request a full refund of the remaining pro-rata AMC value without any administrative penalties.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-6 border-b pb-2">Frequently Asked Questions: Payments & Refunds</h2>

                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">If I cancel my solar installation after paying the advance, do I get a full refund?</h4>
                            <p className="text-sm">
                                It depends on the project stage. If you cancel before the structural fabrication (GI mounts) has commenced and before the panels are dispatched from the warehouse, you will receive a full refund minus a nominal site-survey charge. However, if custom mounting structures have already been welded and galvanized specifically for your roof dimensions, the material cost of those structures will be deducted from your advance.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">Can I return a CCTV camera if I decide I want a higher resolution model after installation?</h4>
                            <p className="text-sm">
                                Standard return policies do not apply to deployed electronic security equipment. Once a camera is unboxed, mounted, and weatherproof seals are broken, it cannot be resold as new. We encourage clients to thoroughly review the Technical Architecture Document (TAD) and view resolution demos before authorizing the installation. Upgrades post-installation require purchasing the new units.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">How long does a pro-rata AMC refund take to process?</h4>
                            <p className="text-sm">
                                Once an AMC termination request is formally approved by our accounts team, it takes between 7 to 10 Business Days for the pro-rata amount to be electronically transferred (via NEFT/RTGS) back to the originating corporate bank account.
                            </p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">Contact Accounts</h2>
                    <p className="mb-4">
                        For any queries regarding invoices, payment schedules, or initiating a refund request, please contact our billing department at <strong>accounts@infysmart.com</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
}
