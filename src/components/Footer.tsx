
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">InSight Advantage</h3>
              <p className="text-gray-600 mb-4 max-w-xs">
                Connecting expert consultants with organizations in employment, training, and ability management.
              </p>
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">For Consultants</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/consultant/register" className="text-gray-600 hover:text-primary">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-gray-600 hover:text-primary">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">For Organizations</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/organization/register" className="text-gray-600 hover:text-primary">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to="/search" className="text-gray-600 hover:text-primary">
                    Find Consultants
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-600 hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 py-6">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} InSight Advantage Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
