export default function CancellationRefunds() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-6">
            Cancellation & Refund Policy
          </h1>

          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                1. Subscription Cancellation
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may cancel your GitTogether subscription at any time through
                your account settings. Upon cancellation, you will continue to
                have access to premium features until the end of your current
                billing period.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  Cancellations take effect at the end of the current billing
                  cycle
                </li>
                <li>
                  No partial refunds for unused time within a billing period
                </li>
                <li>You can reactivate your subscription at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                2. Refund Eligibility
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We offer refunds under the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  Technical issues preventing access to services within 7 days
                  of purchase
                </li>
                <li>Duplicate charges or billing errors</li>
                <li>
                  Service not as described (within 14 days of initial
                  subscription)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                3. Refund Process
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To request a refund, please contact our support team at
                support@gittogether.com with your order details. Refund requests
                are processed within 5-7 business days.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                <p className="text-blue-900 font-medium">
                  Refunds will be issued to the original payment method within
                  7-10 business days after approval.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                4. Non-Refundable Items
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Subscriptions cancelled after 14 days of purchase</li>
                <li>Premium features used extensively before cancellation</li>
                <li>
                  Promotional or discounted subscriptions (unless technical
                  issues)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                5. Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed">
                For any questions regarding cancellations or refunds, please
                reach out to us at{" "}
                <a
                  href="mailto:support@gittogether.com"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  support@gittogether.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}