export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-6">
            Shipping & Delivery Policy
          </h1>

          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="bg-blue-100 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Digital Service Notice
            </h3>
            <p className="text-blue-800 leading-relaxed">
              GitTogether is a digital platform providing software development
              networking services. As we offer purely digital services, no
              physical shipping is involved. All features and services are
              delivered electronically upon subscription activation.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                1. Service Delivery
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Upon successful payment and account verification:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Premium features are activated instantly</li>
                <li>Access is granted immediately to your account</li>
                <li>No waiting period or shipping time required</li>
                <li>Confirmation email sent within minutes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                2. Access & Availability
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our services are available 24/7 from anywhere in the world:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Accessible via web browser on any device</li>
                <li>No geographical restrictions</li>
                <li>Instant access upon account creation</li>
                <li>Cloud-based infrastructure ensures global availability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                3. Delivery Confirmation
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You will receive email confirmation containing:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-4">
                <li>Order details and transaction ID</li>
                <li>Subscription plan information</li>
                <li>Account access credentials (if new user)</li>
                <li>Getting started guide</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                4. Technical Requirements
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To access GitTogether services, you need:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Internet connection (broadband recommended)</li>
                <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                <li>Valid email address</li>
                <li>GitHub account (for certain features)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                5. Service Interruptions
              </h2>
              <p className="text-gray-700 leading-relaxed">
                While we strive for 99.9% uptime, occasional maintenance or
                technical issues may occur. We will notify users in advance of
                scheduled maintenance and work to resolve unplanned outages
                promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                6. Support & Assistance
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you experience any issues accessing our services after
                purchase, contact our support team at{" "}
                <a
                  href="mailto:support@gittogether.com"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  support@gittogether.com
                </a>{" "}
                for immediate assistance.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
