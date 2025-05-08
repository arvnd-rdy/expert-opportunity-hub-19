
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PricingTier {
  name: string;
  description: string;
  price: number;
  features: string[];
  mostPopular?: boolean;
  buttonText: string;
  buttonVariant: "default" | "outline";
}

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  const consultantTiers: PricingTier[] = [
    {
      name: "Basic",
      description: "Essential tools for independent consultants",
      price: billingCycle === "monthly" ? 49 : 39,
      features: [
        "Professional profile",
        "Document uploads (3 max)",
        "Basic search visibility",
        "Email notifications",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
    },
    {
      name: "Professional",
      description: "Everything you need for full visibility",
      price: billingCycle === "monthly" ? 99 : 79,
      features: [
        "Everything in Basic",
        "Enhanced profile visibility",
        "Unlimited document uploads",
        "Featured in search results",
        "Analytics dashboard",
        "Priority email support",
      ],
      mostPopular: true,
      buttonText: "Get Started",
      buttonVariant: "default",
    },
    {
      name: "Enterprise",
      description: "For consulting firms with multiple consultants",
      price: billingCycle === "monthly" ? 249 : 199,
      features: [
        "Everything in Professional",
        "Up to 5 consultant profiles",
        "Company branding",
        "Dedicated account manager",
        "Custom training solutions",
        "Priority placement in search",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
    },
  ];

  const organizationTiers: PricingTier[] = [
    {
      name: "Starter",
      description: "Basic access for small organizations",
      price: billingCycle === "monthly" ? 99 : 79,
      features: [
        "Organization profile",
        "Search for consultants",
        "View consultant profiles",
        "Save up to 10 favorite consultants",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
    },
    {
      name: "Business",
      description: "Full functionality for growing organizations",
      price: billingCycle === "monthly" ? 199 : 159,
      features: [
        "Everything in Starter",
        "Unlimited saved consultants",
        "Direct messaging with consultants",
        "Document access",
        "Team collaboration (up to 5 users)",
        "Analytics and reporting",
      ],
      mostPopular: true,
      buttonText: "Get Started",
      buttonVariant: "default",
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations",
      price: billingCycle === "monthly" ? 499 : 399,
      features: [
        "Everything in Business",
        "Unlimited team members",
        "Advanced analytics",
        "Dedicated account manager",
        "Custom integration solutions",
        "Priority support",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Transparent Pricing for All Users</h1>
            <p className="text-xl text-gray-600">
              Choose the plan that's right for you or your organization
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm bg-muted p-1">
              <button
                type="button"
                className={`px-4 py-2 text-sm rounded-md ${
                  billingCycle === "monthly"
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-600"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm rounded-md ${
                  billingCycle === "annually"
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-600"
                }`}
                onClick={() => setBillingCycle("annually")}
              >
                Annually <span className="text-accent">Save 20%</span>
              </button>
            </div>
          </div>

          <Tabs defaultValue="consultants" className="max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <TabsList className="inline-flex">
                <TabsTrigger value="consultants" className="px-8">For Consultants</TabsTrigger>
                <TabsTrigger value="organizations" className="px-8">For Organizations</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="consultants">
              <div className="grid md:grid-cols-3 gap-6">
                {consultantTiers.map((tier) => (
                  <Card 
                    key={tier.name}
                    className={
                      tier.mostPopular 
                      ? "border-primary shadow-md relative" 
                      : ""
                    }
                  >
                    {tier.mostPopular && (
                      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-0 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{tier.name}</CardTitle>
                      <p className="text-gray-500">{tier.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <span className="text-4xl font-bold">${tier.price}</span>
                        <span className="text-gray-500 ml-1">
                          /{billingCycle === "monthly" ? "mo" : "mo, billed annually"}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link to="/consultant/register" className="w-full">
                        <Button 
                          className="w-full"
                          variant={tier.buttonVariant}
                        >
                          {tier.buttonText}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="organizations">
              <div className="grid md:grid-cols-3 gap-6">
                {organizationTiers.map((tier) => (
                  <Card 
                    key={tier.name}
                    className={
                      tier.mostPopular 
                      ? "border-primary shadow-md relative" 
                      : ""
                    }
                  >
                    {tier.mostPopular && (
                      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-0 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{tier.name}</CardTitle>
                      <p className="text-gray-500">{tier.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <span className="text-4xl font-bold">${tier.price}</span>
                        <span className="text-gray-500 ml-1">
                          /{billingCycle === "monthly" ? "mo" : "mo, billed annually"}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link to="/organization/register" className="w-full">
                        <Button 
                          className="w-full"
                          variant={tier.buttonVariant}
                        >
                          {tier.buttonText}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="max-w-3xl mx-auto mt-16">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
                    <p className="text-gray-600">We accept all major credit cards, including Visa, Mastercard, and American Express. For Enterprise plans, we also offer invoicing options.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Can I upgrade or downgrade my plan later?</h3>
                    <p className="text-gray-600">Yes, you can change your plan at any time. When upgrading, we'll prorate the difference. When downgrading, changes will take effect at the start of your next billing cycle.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Is there a free trial available?</h3>
                    <p className="text-gray-600">We offer a limited preview of our platform, but full functionality requires a subscription. Contact our sales team for a personalized demo.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">How secure are the documents I upload?</h3>
                    <p className="text-gray-600">All documents are stored securely with enterprise-grade encryption. Access is strictly controlled based on user permissions and subscription level.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
            <p className="text-gray-600 mb-6">Contact our team to discuss custom pricing and features for your specific needs</p>
            <Button size="lg">Contact Sales</Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
