const Footer = () => {
  return (
    <footer className="mt-20 pt-8 pb-6 border-t border-gray-200 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center space-y-4">
          {/* Social Media Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Instagram */}
            <a
              href="#"
              className="group p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-white transition-all duration-200 hover:scale-110"
              aria-label="Visit us on Instagram"
            >
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
              >
                <rect x="4" y="4" width="16" height="16" rx="4" />
                <circle cx="12" cy="12" r="3" />
                <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="#"
              className="group p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-white transition-all duration-200 hover:scale-110"
              aria-label="Visit us on Facebook"
            >
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
              >
                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
              </svg>
            </a>

            {/* Telegram */}
            <a
              href="#"
              className="group p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-white transition-all duration-200 hover:scale-110"
              aria-label="Join our Telegram channel"
            >
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
              >
                <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
              </svg>
            </a>

            {/* Vimeo */}
            <a
              href="#"
              className="group p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-white transition-all duration-200 hover:scale-110"
              aria-label="Visit us on Vimeo"
            >
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
              >
                <path
                  d="M3 8.5l1 1s1.5 -1.102 2 -.5c.509 .609 1.863 7.65 2.5 9c.556 1.184 1.978 
                  2.89 4 1.5c2 -1.5 7.5 -5.5 8.5 -11.5c.444 -2.661 -1 -4 -2.5 -4c-2 0 -4.047 1.202 
                  -4.5 4c2.05 -1.254 2.551 1.003 1.5 3c-1.052 2.005 -2 3 -2.5 3c-.49 0 -.924 -1.165
                   -1.5 -3.5c-.59 -2.42 -.5 -6.5 -3 -6.5s-5.5 4.5 -5.5 4.5z"
                />
              </svg>
            </a>
          </div>

          {/* Copyright Text */}
          <p className="text-xs sm:text-sm font-medium text-gray-600 text-center px-4">
            © {new Date().getFullYear()} TRX Headphones. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
