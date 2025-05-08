
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("consultant");
  const { signIn, loading, user } = useAuth();

  // Redirect if user is already logged in
  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Sign in to your account</CardTitle>
              <CardDescription className="text-center">
                Enter your email below to sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="consultant" className="w-full" onValueChange={setUserType}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="consultant">Consultant</TabsTrigger>
                  <TabsTrigger value="organization">Organization</TabsTrigger>
                </TabsList>

                <TabsContent value="consultant">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="consultant-email">Email</Label>
                      <Input 
                        id="consultant-email"
                        type="email" 
                        placeholder="name@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="consultant-password">Password</Label>
                        <Link to="/" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input 
                        id="consultant-password"
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="organization">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="organization-email">Email</Label>
                      <Input 
                        id="organization-email"
                        type="email" 
                        placeholder="name@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="organization-password">Password</Label>
                        <Link to="/" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input 
                        id="organization-password"
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  {userType === "consultant" ? (
                    <Link to="/consultant/register" className="text-primary font-medium hover:underline">
                      Register as Consultant
                    </Link>
                  ) : (
                    <Link to="/organization/register" className="text-primary font-medium hover:underline">
                      Register as Organization
                    </Link>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
