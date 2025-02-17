import Footer from 'components/Footer';
import React from 'react';
/*adding aboutpage */
export default function aboutsaral() {
  return (
    <>
      <div className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Main Heading */}
          <h1 className="mb-12 text-center text-4xl font-bold text-purple-600 transition-colors hover:text-gray-800">
            About Us
          </h1>

          {/* Mission Statement */}
          <div className="mb-12 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 p-6 shadow-sm">
            <p className="text-center text-xl italic text-gray-800">
              "Simplifying event management and ticketing for organizers and attendees alike."
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8 text-gray-700">
            {/* Who We Are */}
            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-semibold text-purple-600">Who We Are</h2>
              <p className="text-lg leading-relaxed">
                Saral Events is your comprehensive event management and ticketing platform, born
                from the vision of making event organization truly simple. True to our name 'Saral'
                (meaning 'simple'), we believe that managing and attending events should be a
                seamless, stress-free experience for everyone involved.
              </p>
            </div>

            {/* What We Offer */}
            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-semibold text-purple-600">What We Offer</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-gray-800">For Event Organizers:</h3>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Intuitive event creation and management tools</li>
                    <li>Efficient ticket management system</li>
                    <li>Real-time analytics and reporting</li>
                    <li>Automated attendee communication</li>
                    <li>Customizable event pages</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-gray-800">For Attendees:</h3>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>User-friendly ticket booking interface</li>
                    <li>Secure payment processing</li>
                    <li>Digital ticket management</li>
                    <li>Event recommendations</li>
                    <li>Easy check-in process</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Our Commitment */}
            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-semibold text-purple-600">Our Commitment</h2>
              <p className="text-lg leading-relaxed">
                At Saral Events, we're committed to revolutionizing the event management landscape
                by providing a platform that combines simplicity with sophistication. We understand
                that every event is unique, and our platform is designed to adapt to your specific
                needs while maintaining its core promise of simplicity and efficiency.
              </p>
            </div>

            {/* Why Choose Us */}
            <div className="rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 p-8">
              <h2 className="mb-4 text-2xl font-semibold text-purple-600">
                Why Choose Saral Events
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ul className="list-disc space-y-3 pl-5">
                  <li className="text-lg">Seamless user experience</li>
                  <li className="text-lg">Hassle-free event management</li>
                  <li className="text-lg">Dedicated customer support</li>
                </ul>
                <ul className="list-disc space-y-3 pl-5">
                  <li className="text-lg">Secure and reliable platform</li>
                  <li className="text-lg">Transparent pricing</li>
                  <li className="text-lg">Continuous platform improvements</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Vision for Future */}
          <div className="mt-12 text-center">
            <h2 className="mb-4 text-2xl font-semibold text-purple-600">Our Vision</h2>
            <p className="text-lg leading-relaxed">
              We envision a future where organizing and attending events is as simple as a few
              clicks, where technology enhances rather than complicates the human experience of
              coming together. Join us in making this vision a reality.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
