
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/90 to-secondary/90 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Connecting Expertise with Opportunity
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Join our specialized platform that connects top consultants in employment, training,
                and ability management with organizations seeking their expertise.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/consultant/register">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                    Join as a Consultant
                  </Button>
                </Link>
                <Link to="/organization/register">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    Register Organization
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Professional collaboration" 
                className="rounded-lg shadow-xl max-w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Why Choose Our Platform</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our specialized platform offers unique benefits for both consultants and organizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">For Consultants</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Create a professional profile showcasing your expertise</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Securely share your credentials with potential clients</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Specify your service areas and rate structure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Connect with organizations seeking your specific skills</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">For Organizations</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Find qualified consultants based on specific expertise</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Search by location, keywords, and specialties</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>View verified professional credentials</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Connect directly with industry experts</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Platform Benefits</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Secure document storage and sharing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Focused on employment, training, and ability management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Streamlined connection process</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Premium support from our team</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl shadow-lg">
            <div className="px-6 py-12 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Join our platform today and discover a new way to connect expertise with opportunity
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/pricing">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    View Pricing
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
