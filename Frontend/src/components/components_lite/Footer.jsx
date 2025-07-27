import React from "react";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react"; // Import icons from lucide-react
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white">JobHive</h2>
          <p className="text-sm mt-3">
            Your go-to platform to find your dream job or hire top talent. Built
            for modern hiring needs.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-white">
                Jobs
              </Link>
            </li>
            
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>
              Email:{" "}
              <a href="mailto:hello@jobhive.com" className="hover:text-white">
                hello@jobhive.com
              </a>
            </li>
            <li>
              Support:{" "}
              <a href="mailto:support@jobhive.com" className="hover:text-white">
                support@jobhive.com
              </a>
            </li>
            <li>Location: India</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="hover:text-white" size={20} />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="hover:text-white" size={20} />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="hover:text-white" size={20} />
            </a>
            <a
              href="mailto:hello@jobhive.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="hover:text-white" size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} JobHive. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
