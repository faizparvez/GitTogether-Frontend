export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-6">
            Privacy Policy
          </h1>

          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <p className="text-blue-900 leading-relaxed">
              At GitTogether, we take your privacy seriously. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you use our platform.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                1. Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-blue-700 mb-3 mt-4">
                Personal Information
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Name and email address</li>
                <li>
                  GitHub profile information (when you connect your account)
                </li>
                <li>Profile picture and bio</li>
                <li>Contact information you provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3 mt-4">
                Usage Information
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Browser type and version</li>
                <li>IP address and device information</li>
                <li>Pages visited and time spent on platform</li>
                <li>Interactions with other users</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3 mt-4">
                Payment Information
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Payment details are processed by Razorpay</li>
                <li>We do not store credit card information</li>
                <li>Transaction history for billing purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the collected information for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Providing and maintaining our services</li>
                <li>Processing transactions and subscriptions</li>
                <li>Connecting you with other developers</li>
                <li>Sending important updates and notifications</li>
                <li>Improving user experience and platform features</li>
                <li>Detecting and preventing fraud or abuse</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                3. Information Sharing
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell your personal information. We may share
                information with:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  <strong>Other Users:</strong> Profile information you make
                  public
                </li>
                <li>
                  <strong>Service Providers:</strong> Payment processors,
                  hosting services
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or
                  to protect rights
                </li>
                <li>
                  <strong>Business Transfers:</strong> In case of merger or
                  acquisition
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                4. Data Security
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement industry-standard security measures:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure password hashing</li>
                <li>Regular security audits</li>
                <li>Access controls and authentication</li>
                <li>Regular backups and disaster recovery plans</li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                <p className="text-yellow-900">
                  <strong>Note:</strong> No method of transmission over the
                  internet is 100% secure. While we strive to protect your data,
                  we cannot guarantee absolute security.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                5. Your Rights
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                6. Cookies and Tracking
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Keep you logged in</li>
                <li>Remember your preferences</li>
                <li>Analyze usage patterns</li>
                <li>Improve platform performance</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                7. Data Retention
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your information as long as your account is active or
                as needed to provide services. After account deletion, we may
                retain certain information for legal compliance, fraud
                prevention, and dispute resolution.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                8. Children's Privacy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                GitTogether is not intended for users under 13 years of age. We
                do not knowingly collect information from children. If we
                discover we have collected data from a child, we will delete it
                promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                9. Changes to Privacy Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy periodically. We will notify
                you of significant changes via email or platform notification.
                Continued use after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                10. Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed">
                For privacy-related questions or to exercise your rights,
                contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:privacy@gittogether.com"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    privacy@gittogether.com
                  </a>
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Response Time:</strong> Within 30 days
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
