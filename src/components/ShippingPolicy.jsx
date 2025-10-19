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

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                1. Nature of Service
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                GitTogether provides digital software services and does not
                involve the shipment of physical goods. All our services are
                delivered electronically through our online platform accessible
                via web browsers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                2. Service Delivery Method
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Since GitTogether is a digital service platform, there is no
                physical shipping involved. Services are delivered as follows:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  Instant activation of subscription upon successful payment
                  confirmation
                </li>
                <li>
                  Immediate access to premium features through your user
                  dashboard
                </li>
                <li>No delivery charges or shipping fees applicable</li>
                <li>
                  Services are accessible 24/7 from any location with internet
                  connectivity
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                3. Delivery Timeline
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Access to GitTogether services is provided immediately:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  <strong>Payment Processing:</strong> 1-2 minutes for payment
                  gateway confirmation
                </li>
                <li>
                  <strong>Account Activation:</strong> Instant activation upon
                  payment verification
                </li>
                <li>
                  <strong>Service Access:</strong> Available immediately after
                  activation
                </li>
                <li>
                  <strong>Email Confirmation:</strong> Sent within 5 minutes of
                  successful transaction
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                4. Delivery Confirmation
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Upon successful purchase, you will receive:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Email confirmation with transaction details and invoice</li>
                <li>Order ID and payment receipt</li>
                <li>Account activation notification</li>
                <li>Instructions to access subscribed features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                5. Geographic Availability
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                GitTogether services are available globally:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Accessible from any country with internet access</li>
                <li>No geographical restrictions on service delivery</li>
                <li>Multi-currency payment support through Razorpay</li>
                <li>24/7 availability across all time zones</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                6. Technical Requirements for Access
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To access GitTogether services after purchase:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Stable internet connection (minimum 2 Mbps recommended)</li>
                <li>Updated web browser (Chrome, Firefox, Safari, or Edge)</li>
                <li>Valid email address for account verification</li>
                <li>
                  Device compatibility: Desktop, laptop, tablet, or mobile
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                7. Delivery Failures and Resolution
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                In rare cases where service access is delayed:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Check your registered email for activation link</li>
                <li>Verify payment was processed successfully</li>
                <li>
                  Clear browser cache and cookies, then try logging in again
                </li>
                <li>
                  Contact support at support@gittogether.com if issue persists
                </li>
                <li>
                  Support team responds within 24 hours for delivery-related
                  queries
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                8. Service Interruptions
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We maintain high availability standards:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Target uptime: 99.9% service availability</li>
                <li>
                  Scheduled maintenance notifications sent 48 hours in advance
                </li>
                <li>Unplanned downtime resolved within 4 hours</li>
                <li>No additional charges for service interruptions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                9. Refund for Non-Delivery
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you do not receive access to services within 24 hours of
                payment, you are eligible for a full refund. Please refer to our
                Cancellation & Refund Policy for complete details on the refund
                process.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                10. Contact Information
              </h2>
              <p className="text-gray-700 leading-relaxed">
                For any questions or concerns regarding service delivery, please
                contact us at:
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@gittogether.com"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    support@gittogether.com
                  </a>
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Support Hours:</strong> Monday to Friday, 9:00 AM -
                  6:00 PM IST
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Emergency Support:</strong> Available for critical
                  access issues
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
