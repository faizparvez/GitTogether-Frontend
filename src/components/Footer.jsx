import { Link } from "react-router-dom";
import { useState } from "react";

/**
 * Reusable Social Link Component
 */
const SocialLink = ({ name, icon: Icon, href, ariaLabel }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel || name}
    className="p-2 rounded-lg bg-[#1a1614] hover:bg-[#c26328] transition-all duration-300 group"
  >
    <Icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
  </a>
);

/**
 * Reusable Footer Link Component
 */
const FooterLink = ({ href, children, external = false }) => (
  external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-[#ff734d] transition-colors duration-300 flex items-center group"
    >
      {children}
      <svg
        className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  ) : (
    <Link
      to={href}
      className="text-gray-400 hover:text-[#ff734d] transition-colors duration-300"
    >
      {children}
    </Link>
  )
);

/**
 * Icon Components
 */
const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="h-4 w-4 text-red-500 fill-red-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

/**
 * Main Footer Component
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const footerLinks = {
    product: [
      { name: "Browse", href: "/" },
      { name: "Connections", href: "/" },
      { name: "Requests", href: "/" },
      { name: "Pricing", href: "/" }
    ],
    company: [
      { name: "About Us", href: "/" },
      { name: "Team", href: "/" },
      { name: "Careers", href: "/" },
      { name: "Contact", href: "/" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/" },
      { name: "Terms of Service", href: "/" },
      { name: "Cookie Policy", href: "/" },
      { name: "Data Security", href: "/" }
    ]
  };

  const socialLinks = [
    { name: "GitHub", icon: GitHubIcon, href: "/", ariaLabel: "Visit our GitHub" },
    { name: "Twitter", icon: TwitterIcon, href: "/", ariaLabel: "Follow us on Twitter" },
    { name: "LinkedIn", icon: LinkedInIcon, href: "/", ariaLabel: "Connect on LinkedIn" },
    { name: "Email", icon: MailIcon, href: "/", ariaLabel: "Send us an email" }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <svg
                className="h-10 w-10 rounded-lg"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="100" height="100" rx="12" fill="#ff734d"/>
                <circle cx="30" cy="50" r="12" stroke="#FFFFFF" strokeWidth="6" fill="none" />
                <circle cx="70" cy="50" r="12" stroke="#FFFFFF" strokeWidth="6" fill="none" />
                <line x1="42" y1="50" x2="58" y2="50" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
              </svg>
              <span className="font-bold text-2xl bg-gradient-to-r from-[#ff734d] to-[#d64000] text-transparent bg-clip-text">
                GitTogether
              </span>
            </div>
           <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
  Empowering developers to connect, collaborate, and build together. 
  Discover like-minded coders, chat instantly, and kickstart meaningful tech partnerships — all in one place.
</p>

            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <SocialLink key={social.name} {...social} />
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-semibold text-xl mb-2 text-white">Stay Updated</h3>
              <p className="text-gray-400">Get the latest updates on developer connections and collaboration tips.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 bg-[#1a1614] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#ff734d] transition-colors duration-300"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#ff734d] to-[#d64000] text-white px-6 py-3 rounded-lg font-medium hover:shadow-orange-lg transition-all duration-300 whitespace-nowrap hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400">
            <p>&copy; {currentYear} GitTogether. All rights reserved.</p>
            <div className="hidden md:block w-px h-4 bg-gray-700"></div>
            <p className="text-sm">Connecting Developers Worldwide</p>
          </div>
          
          {/* Made with Love */}
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-sm">Made for developers by Faiz</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;