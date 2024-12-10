import React from 'react'

function kjasn() {
  return (
            <footer className="bg-[#1e1e1e] text-white py-8">
          <div className="container mx-auto px-4">
            {/* Top Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              {/* About Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">About Saral Events</h3>
                <p className="text-sm text-gray-400">
                  Saral Events is your one-stop destination for finding and exploring exciting events happening around you. Join us to make unforgettable memories.
                </p>
              </div>

              {/* Quick Links Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-sm text-gray-400 hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/events" className="text-sm text-gray-400 hover:text-white">
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm text-gray-400 hover:text-white">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-sm text-gray-400 hover:text-white">
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <p className="text-sm text-gray-400">Email: info@saralevents.com</p>
                <p className="text-sm text-gray-400">Phone: +91 78272 16955</p>
                <p className="text-sm text-gray-400">Headquarters: Bengaluru, Karnataka
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-600 my-4"></div>

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Saral Events. All rights reserved.</p>
              <div className="space-x-4 mt-4 sm:mt-0">
                <Link href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
  )
}

export default kjasn
