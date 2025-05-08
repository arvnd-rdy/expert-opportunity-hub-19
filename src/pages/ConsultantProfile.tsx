
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ConsultantProfile = () => {
  // Mock data for Phase 1
  const [profile, setProfile] = useState({
    firstName: "Jane",
    lastName: "Smith",
    title: "Senior HR Consultant",
    location: "Toronto, Ontario",
    remote: true,
    bio: "I'm a senior HR consultant with over 15 years of experience in employment strategy, workforce development, and organizational transformation. I specialize in helping organizations build inclusive workplace cultures and effective talent management programs.",
    expertise: ["Employment Strategy", "Diversity & Inclusion", "Workforce Development", "HR Transformation", "Training Program Design"],
    rateMin: 120,
    rateMax: 150,
    rateType: "hourly",
    availability: "Part-time",
    email: "jane.smith@example.com",
    phone: "(416) 555-1234",
    website: "janesmith-consulting.com",
    resume: null,
    certifications: [],
    insurance: null,
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

  const handleExpertiseAdd = (tag: string) => {
    if (tag && !editData.expertise.includes(tag)) {
      setEditData({
        ...editData,
        expertise: [...editData.expertise, tag]
      });
    }
  };

  const handleExpertiseRemove = (tag: string) => {
    setEditData({
      ...editData,
      expertise: editData.expertise.filter(t => t !== tag)
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Consultant Profile</h1>
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
            <div className="p-6 sm:p-8 bg-gradient-to-r from-primary to-secondary text-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {isEditing ? (
                      <div className="flex space-x-2">
                        <Input
                          name="firstName"
                          value={editData.firstName}
                          onChange={handleEditChange}
                          className="text-black max-w-[150px]"
                        />
                        <Input
                          name="lastName"
                          value={editData.lastName}
                          onChange={handleEditChange}
                          className="text-black max-w-[150px]"
                        />
                      </div>
                    ) : (
                      `${profile.firstName} ${profile.lastName}`
                    )}
                  </h2>
                  <div className="mt-1">
                    {isEditing ? (
                      <Input
                        name="title"
                        value={editData.title}
                        onChange={handleEditChange}
                        className="text-black mt-2"
                      />
                    ) : (
                      profile.title
                    )}
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end">
                  <div>
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
                  <div className="mt-1">
                    {profile.remote && (
                      <Badge className="bg-accent">{isEditing ? "Remote Available" : "Remote Available"}</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="profile" className="p-6 sm:p-8">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <div className="space-y-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">About Me</h3>
                      {isEditing ? (
                        <Textarea
                          name="bio"
                          value={editData.bio}
                          onChange={handleEditChange}
                          className="min-h-[150px]"
                        />
                      ) : (
                        <p className="text-gray-700">{profile.bio}</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Areas of Expertise</h3>
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {editData.expertise.map((tag) => (
                              <Badge key={tag} className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
                                {tag}
                                <button 
                                  onClick={() => handleExpertiseRemove(tag)}
                                  className="ml-1 text-primary hover:text-primary/80 focus:outline-none"
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
                              placeholder="Add new expertise"
                            />
                            <Button 
                              onClick={() => {
                                handleExpertiseAdd(newTag);
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
                          {profile.expertise.map((tag) => (
                            <Badge key={tag} className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">Rate Information</h3>
                        {isEditing ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label htmlFor="rateMin">Minimum Rate ($)</Label>
                                <Input
                                  id="rateMin"
                                  name="rateMin"
                                  type="number"
                                  value={editData.rateMin}
                                  onChange={handleEditChange}
                                />
                              </div>
                              <div>
                                <Label htmlFor="rateMax">Maximum Rate ($)</Label>
                                <Input
                                  id="rateMax"
                                  name="rateMax"
                                  type="number"
                                  value={editData.rateMax}
                                  onChange={handleEditChange}
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="rateType">Rate Type</Label>
                              <Input
                                id="rateType"
                                name="rateType"
                                value={editData.rateType}
                                onChange={handleEditChange}
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-gray-700">
                              <span className="font-semibold">Rate Range:</span> ${profile.rateMin} - ${profile.rateMax} {profile.rateType}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">Availability</h3>
                        {isEditing ? (
                          <Input
                            name="availability"
                            value={editData.availability}
                            onChange={handleEditChange}
                          />
                        ) : (
                          <p className="text-gray-700">{profile.availability}</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                      {isEditing ? (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={editData.email}
                              onChange={handleEditChange}
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={editData.phone}
                              onChange={handleEditChange}
                            />
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
                        <div className="space-y-2">
                          <p className="text-gray-700">
                            <span className="font-semibold">Email:</span> {profile.email}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-semibold">Phone:</span> {profile.phone}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-semibold">Website:</span> {profile.website}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="documents">
                <div className="space-y-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Resume/CV</h3>
                      <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center">
                        <p className="text-gray-500 mb-4">Upload your resume/CV in PDF format</p>
                        <Button variant="outline">Upload Resume</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Certifications</h3>
                      <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center">
                        <p className="text-gray-500 mb-4">Upload your professional certifications</p>
                        <Button variant="outline">Upload Certification</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Insurance Documentation</h3>
                      <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center">
                        <p className="text-gray-500 mb-4">Upload your insurance documentation</p>
                        <Button variant="outline">Upload Insurance</Button>
                      </div>
                    </CardContent>
                  </Card>
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
                          <Checkbox id="profile-views" />
                          <label htmlFor="profile-views" className="ml-2 text-sm font-medium">
                            Profile view alerts
                          </label>
                        </div>
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

export default ConsultantProfile;
