
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OrganizationProfile = () => {
  // Mock data for Phase 1
  const [profile, setProfile] = useState({
    name: "Acme Corporation",
    industry: "Technology",
    size: "201-500 employees",
    location: "Toronto, Ontario",
    description: "Acme Corporation is a leading technology company specializing in innovative solutions for workforce management and development. We're committed to creating inclusive workplaces and effective training programs for organizations of all sizes.",
    interests: ["Employment Strategy", "Diversity & Inclusion", "Workforce Development", "Training Program Design"],
    website: "acmecorp.com",
    contactName: "John Doe",
    contactTitle: "HR Director",
    contactEmail: "john.doe@acmecorp.com",
    contactPhone: "(416) 555-5678",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({...profile});

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleInterestAdd = (tag: string) => {
    if (tag && !editData.interests.includes(tag)) {
      setEditData({
        ...editData,
        interests: [...editData.interests, tag]
      });
    }
  };

  const handleInterestRemove = (tag: string) => {
    setEditData({
      ...editData,
      interests: editData.interests.filter(t => t !== tag)
    });
  };

  const handleSave = () => {
    setProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({...profile});
    setIsEditing(false);
  };

  const [newTag, setNewTag] = useState("");

  // Mock saved consultants for Phase 1
  const savedConsultants = [
    { id: 1, name: "Jane Smith", title: "Senior HR Consultant", expertise: ["Employment Strategy", "Diversity & Inclusion"] },
    { id: 2, name: "Robert Johnson", title: "Training Specialist", expertise: ["Training Program Design", "E-Learning Development"] },
    { id: 3, name: "Sarah Williams", title: "Workforce Development Expert", expertise: ["Workforce Development", "Career Coaching"] },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Organization Profile</h1>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 sm:p-8 bg-gradient-to-r from-secondary to-primary text-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {isEditing ? (
                      <Input
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className="text-black"
                      />
                    ) : (
                      profile.name
                    )}
                  </h2>
                  <div className="mt-1 flex items-center gap-2">
                    <span>
                      {isEditing ? (
                        <Input
                          name="industry"
                          value={editData.industry}
                          onChange={handleEditChange}
                          className="text-black mt-2 max-w-[200px]"
                        />
                      ) : (
                        profile.industry
                      )}
                    </span>
                    <span>•</span>
                    <span>
                      {isEditing ? (
                        <Input
                          name="size"
                          value={editData.size}
                          onChange={handleEditChange}
                          className="text-black mt-2 max-w-[200px]"
                        />
                      ) : (
                        profile.size
                      )}
                    </span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0">
                  {isEditing ? (
                    <Input
                      name="location"
                      value={editData.location}
                      onChange={handleEditChange}
                      className="text-black"
                    />
                  ) : (
                    profile.location
                  )}
                </div>
              </div>
            </div>

            <Tabs defaultValue="profile" className="p-6 sm:p-8">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="saved">Saved Consultants</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <div className="space-y-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">About Us</h3>
                      {isEditing ? (
                        <Textarea
                          name="description"
                          value={editData.description}
                          onChange={handleEditChange}
                          className="min-h-[150px]"
                        />
                      ) : (
                        <p className="text-gray-700">{profile.description}</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Areas of Interest</h3>
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {editData.interests.map((tag) => (
                              <Badge key={tag} className="flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary hover:bg-secondary/20 border border-secondary/20">
                                {tag}
                                <button 
                                  onClick={() => handleInterestRemove(tag)}
                                  className="ml-1 text-secondary hover:text-secondary/80 focus:outline-none"
                                >
                                  ×
                                </button>
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              value={newTag}
                              onChange={(e) => setNewTag(e.target.value)}
                              placeholder="Add new interest area"
                            />
                            <Button 
                              onClick={() => {
                                handleInterestAdd(newTag);
                                setNewTag("");
                              }}
                              variant="outline"
                              type="button"
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {profile.interests.map((tag) => (
                            <Badge key={tag} className="bg-secondary/10 text-secondary hover:bg-secondary/20 border border-secondary/20">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="contactName">Contact Name</Label>
                              <Input
                                id="contactName"
                                name="contactName"
                                value={editData.contactName}
                                onChange={handleEditChange}
                              />
                            </div>
                            <div>
                              <Label htmlFor="contactTitle">Title</Label>
                              <Input
                                id="contactTitle"
                                name="contactTitle"
                                value={editData.contactTitle}
                                onChange={handleEditChange}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="contactEmail">Email</Label>
                              <Input
                                id="contactEmail"
                                name="contactEmail"
                                type="email"
                                value={editData.contactEmail}
                                onChange={handleEditChange}
                              />
                            </div>
                            <div>
                              <Label htmlFor="contactPhone">Phone</Label>
                              <Input
                                id="contactPhone"
                                name="contactPhone"
                                value={editData.contactPhone}
                                onChange={handleEditChange}
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              name="website"
                              value={editData.website}
                              onChange={handleEditChange}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Contact Person</p>
                              <p className="text-gray-700 font-medium">{profile.contactName}</p>
                              <p className="text-gray-600">{profile.contactTitle}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Contact Details</p>
                              <p className="text-gray-700">{profile.contactEmail}</p>
                              <p className="text-gray-700">{profile.contactPhone}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Website</p>
                            <p className="text-gray-700">{profile.website}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="saved">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Saved Consultants</h3>
                    <Link to="/search">
                      <Button variant="outline">Find More Consultants</Button>
                    </Link>
                  </div>
                  
                  {savedConsultants.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {savedConsultants.map((consultant) => (
                        <Card key={consultant.id}>
                          <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <h4 className="text-lg font-semibold">{consultant.name}</h4>
                                <p className="text-gray-600">{consultant.title}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {consultant.expertise.map((tag) => (
                                    <Badge key={tag} className="bg-secondary/10 text-secondary hover:bg-secondary/20 border border-secondary/20">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="mt-4 sm:mt-0 flex space-x-2">
                                <Button variant="outline" size="sm">View Profile</Button>
                                <Button size="sm">Contact</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-gray-500 mb-4">You haven't saved any consultants yet.</p>
                        <Link to="/search">
                          <Button>Find Consultants</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <div className="space-y-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button>Change Password</Button>
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <h4 className="text-lg font-semibold mb-4">Notification Preferences</h4>
                      <div className="space-y-2">
                        {/* Just placeholders for Phase 1 */}
                        <div className="flex items-center">
                          <Checkbox id="email-notifications" />
                          <label htmlFor="email-notifications" className="ml-2 text-sm font-medium">
                            Email notifications
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="new-consultant-alerts" />
                          <label htmlFor="new-consultant-alerts" className="ml-2 text-sm font-medium">
                            New consultant alerts
                          </label>
                        </div>
                      </div>

                      <Separator className="my-6" />

                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold mb-4">Subscription</h4>
                        <div className="bg-secondary/10 p-4 rounded-md">
                          <p className="text-gray-700">
                            <span className="font-semibold">Current Plan:</span> Business
                          </p>
                          <p className="text-gray-700">
                            <span className="font-semibold">Renewal Date:</span> June 15, 2025
                          </p>
                        </div>
                        <Button>Manage Subscription</Button>
                      </div>

                      <Separator className="my-6" />

                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-red-600">Danger Zone</h4>
                        <Button variant="destructive">Delete Account</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrganizationProfile;
