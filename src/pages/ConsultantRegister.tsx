
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const ConsultantRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const { signUp, loading, user } = useAuth();

  // Redirect if user is already logged in
  if (user) {
    return <Navigate to="/consultant/profile" />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await signUp({
      email: formData.email,
      password: formData.password,
      userType: 'consultant',
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
  };

  const isDisabled = !formData.termsAccepted || 
    formData.password !== formData.confirmPassword ||
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    loading;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Register as a Consultant</h1>
            <p className="mt-2 text-gray-600">
              Join our platform to showcase your expertise and connect with organizations
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create your account</CardTitle>
              <CardDescription>
                Enter your information to create a consultant account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                    {formData.password !== formData.confirmPassword && formData.confirmPassword && (
                      <p className="text-sm text-red-500">Passwords do not match</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="termsAccepted" 
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => 
                      setFormData({...formData, termsAccepted: checked === true})}
                    disabled={loading}
                  />
                  <label
                    htmlFor="termsAccepted"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link to="/" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button type="submit" className="w-full" disabled={isDisabled}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                <div className="text-center text-sm">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary font-medium hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConsultantRegister;
