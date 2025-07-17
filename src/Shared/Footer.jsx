// components/Footer.jsx

import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import CharityLogo from "./CharityLogo";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Project Info */}
        <div className="text-center">
          <CharityLogo />
          <h2 className="text-xl font-semibold mb-2 mt-9">ZeroWaste Initiative</h2>
          <p className="text-sm">
            Fighting food waste and feeding hope. We connect surplus to need —
            building a sustainable, hunger-free future.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-medium mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="/donate" className="hover:underline">
                Donate Food
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-medium mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-5 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-300"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-300"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-10 border-t border-green-700 pt-4">
        © {new Date().getFullYear()} ZeroWaste. Empowering communities through food.
      </div>
    </footer>
  );
};

export default Footer;
