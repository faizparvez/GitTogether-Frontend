export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-6">
            Terms and Conditions
          </h1>

          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using GitTogether, you accept and agree to be
                bound by the terms and provision of this agreement. If you do
                not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                2. User Accounts
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To access certain features of GitTogether, you must create an
                account:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>You must provide accurate and complete information</li>
                <li>
                  You are responsible for maintaining the security of your
                  account
                </li>
                <li>You must be at least 13 years old to create an account</li>
                <li>
                  One person or legal entity may maintain no more than one free
                  account
                </li>
                <li>
                  You are responsible for all activities under your account
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                3. Acceptable Use
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree not to use GitTogether to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit malicious code or viruses</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Spam or send unsolicited messages</li>
                <li>Impersonate others or provide false information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                4. Content Ownership
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You retain ownership of content you post on GitTogether.
                However, by posting content, you grant us a worldwide,
                non-exclusive, royalty-free license to use, display, and
                distribute your content on the platform.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                <p className="text-blue-900 font-medium">
                  You are solely responsible for the content you share and must
                  ensure you have the right to post it.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                5. Subscription and Payments
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  Subscription fees are billed in advance on a recurring basis
                </li>
                <li>Prices are subject to change with 30 days notice</li>
                <li>No refunds for partial months or unused services</li>
                <li>Failure to pay may result in service suspension</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                6. Termination
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to suspend or terminate your account at our
                discretion if you violate these terms. You may also terminate
                your account at any time through account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                GitTogether is provided "as is" without warranties of any kind.
                We are not liable for any indirect, incidental, or consequential
                damages arising from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                8. Changes to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time.
                Continued use of GitTogether after changes constitutes
                acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                9. Contact Information
              </h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about these Terms and Conditions, contact us at{" "}
                <a
                  href="mailto:legal@gittogether.com"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  legal@gittogether.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
