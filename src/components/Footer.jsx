import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Column 1: Contact Information */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          <ul className="space-y-4 text-gray-300">
            <li>
              <span className="font-medium">Email:</span>{' '}
              <a
                href="mailto:info@fundconnect.com"
                className="hover:underline">
                info@fundconnect.com
              </a>
            </li>
            <li>
              <span className="font-medium">Phone:</span> +880 1234 567890
            </li>
            <li>
              <span className="font-medium">Address:</span> 45 Winter Care St, Dhaka, Bangladesh
            </li>
          </ul>
        </div>

        {/* Column 2: Quick Links & Social Media */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
          <ul className="space-y-4 text-gray-300">
            <li>
              <a
                href="/about"
                className="hover:text-yellow-400 transition duration-200">
                About Us
              </a>
            </li>
            <li>
              <a
                href="/campaigns"
                className="hover:text-yellow-400 transition duration-200">
                Campaigns
              </a>
            </li>
            <li>
              <a
                href="/donate"
                className="hover:text-yellow-400 transition duration-200">
                Donate Now
              </a>
            </li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">Follow Us</h2>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start items-center">
          
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition duration-200">
              <FaFacebookF className="text-xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition duration-200">
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition duration-200">
              <FaInstagram className="text-xl" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition duration-200">
              <FaLinkedinIn className="text-xl" />
            </a>
          </div>
        </div>

        {/* Column 3: Newsletter Subscription */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Stay Informed</h2>
          <p className="text-gray-300 mb-4">
            Subscribe to receive updates on new campaigns and how you can help make a difference.
          </p>
          <form className="flex flex-col sm:flex-row items-stretch">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-t-md sm:rounded-l-md sm:rounded-t-none focus:outline-none text-gray-800"
            />
            <button
              className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-b-md sm:rounded-r-md sm:rounded-b-none hover:bg-yellow-500 transition duration-200">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} FundConnect-Crowdfunding. All Rights Reserved.
        </p>
        <p className="text-gray-400 mt-2">
          Designed and Developed by{' '}
          <a
            href="https://github.com/sumu9897"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:underline">
            Mohammad Sumon
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
