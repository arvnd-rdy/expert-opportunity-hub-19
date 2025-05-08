
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Search as SearchIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock consultant data for Phase 1
const consultants = [
  {
    id: 1,
    name: "Jane Smith",
    title: "Senior HR Consultant",
    location: "Toronto, Ontario",
    remote: true,
    rate: 150,
    rateType: "hourly",
    expertise: ["Employment Strategy", "Diversity & Inclusion", "Workforce Development"],
    description: "Experienced HR consultant with over 15 years in the field, specializing in diverse workplace culture development and employment strategy.",
    availability: "Part-time",
  },
  {
    id: 2,
    name: "Robert Johnson",
    title: "Training Program Specialist",
    location: "Vancouver, BC",
    remote: true,
    rate: 125,
    rateType: "hourly",
    expertise: ["Training Program Design", "E-Learning Development", "Workforce Development"],
    description: "Expert in designing comprehensive training programs with a focus on e-learning solutions for corporate environments.",
    availability: "Full-time",
  },
  {
    id: 3,
    name: "Sarah Williams",
    title: "Workforce Development Expert",
    location: "Montreal, Quebec",
    remote: false,
    rate: 175,
    rateType: "hourly",
    expertise: ["Workforce Development", "Career Coaching", "Employment Strategy"],
    description: "Specialist in workforce development strategies with a background in government and non-profit sectors.",
    availability: "Contract",
  },
  {
    id: 4,
    name: "Michael Chen",
    title: "Organizational Development Consultant",
    location: "Ottawa, Ontario",
    remote: true,
    rate: 140,
    rateType: "hourly",
    expertise: ["Organizational Development", "Change Management", "Leadership Training"],
    description: "Helps organizations navigate complex transitions and build resilient leadership teams.",
    availability: "Full-time",
  },
  {
    id: 5,
    name: "Emma Rodriguez",
    title: "Diversity & Inclusion Specialist",
    location: "Toronto, Ontario",
    remote: true,
    rate: 160,
    rateType: "hourly",
    expertise: ["Diversity & Inclusion", "Cultural Competency Training", "Workplace Culture"],
    description: "Passionate about creating inclusive workplaces through training, policy development, and organizational culture change.",
    availability: "Part-time",
  },
];

// Available expertise areas
const expertiseAreas = [
  "Employment Strategy",
  "Diversity & Inclusion",
  "Workforce Development",
  "Training Program Design", 
  "E-Learning Development",
  "Career Coaching",
  "Organizational Development",
  "Change Management",
  "Leadership Training",
  "Cultural Competency Training",
  "Workplace Culture",
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [rateRange, setRateRange] = useState([0, 200]);
  const [filteredConsultants, setFilteredConsultants] = useState(consultants);

  const handleExpertiseChange = (expertise: string) => {
    setSelectedExpertise(prevSelected => 
      prevSelected.includes(expertise)
        ? prevSelected.filter(e => e !== expertise)
        : [...prevSelected, expertise]
    );
  };

  const handleSearch = () => {
    const filtered = consultants.filter(consultant => {
      // Filter by search term
      const searchMatch = searchTerm === "" || 
        consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        consultant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultant.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by expertise
      const expertiseMatch = selectedExpertise.length === 0 || 
        selectedExpertise.some(exp => consultant.expertise.includes(exp));
      
      // Filter by remote option
      const remoteMatch = !remoteOnly || consultant.remote;
      
      // Filter by rate range
      const rateMatch = consultant.rate >= rateRange[0] && consultant.rate <= rateRange[1];
      
      return searchMatch && expertiseMatch && remoteMatch && rateMatch;
    });
    
    setFilteredConsultants(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedExpertise([]);
    setRemoteOnly(false);
    setRateRange([0, 200]);
    setFilteredConsultants(consultants);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Find Consultants</h1>
            <p className="mt-2 text-gray-600">
              Search for consultants in employment, training, and ability management
            </p>
          </div>
          
          {/* Search bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Search by name, title, expertise, or location..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filters */}
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Filters</h2>
                  
                  <div className="space-y-6">
                    {/* Expertise filter */}
                    <div>
                      <h3 className="text-sm font-medium mb-3">Areas of Expertise</h3>
                      <div className="space-y-2 max-h-60 overflow-auto pr-2">
                        {expertiseAreas.map((expertise) => (
                          <div key={expertise} className="flex items-center">
                            <Checkbox 
                              id={`expertise-${expertise}`}
                              checked={selectedExpertise.includes(expertise)}
                              onCheckedChange={() => handleExpertiseChange(expertise)}
                            />
                            <Label
                              htmlFor={`expertise-${expertise}`}
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {expertise}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Rate range filter */}
                    <div>
                      <h3 className="text-sm font-medium mb-3">Hourly Rate Range</h3>
                      <div className="px-1">
                        <Slider
                          value={rateRange}
                          min={0}
                          max={200}
                          step={5}
                          onValueChange={setRateRange}
                        />
                        <div className="flex justify-between mt-2 text-sm text-gray-500">
                          <span>${rateRange[0]}</span>
                          <span>${rateRange[1]}+</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Remote option */}
                    <div className="flex items-center">
                      <Checkbox 
                        id="remote-only" 
                        checked={remoteOnly}
                        onCheckedChange={(checked) => setRemoteOnly(checked === true)}
                      />
                      <Label
                        htmlFor="remote-only"
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remote only
                      </Label>
                    </div>
                    
                    {/* Filter actions */}
                    <div className="flex flex-col gap-2">
                      <Button onClick={handleSearch}>Apply Filters</Button>
                      <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Search results */}
            <div className="md:col-span-3">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  {filteredConsultants.length} {filteredConsultants.length === 1 ? 'Consultant' : 'Consultants'} Found
                </h2>
                <div className="text-sm text-gray-600">
                  {/* Placeholder for sorting options in Phase 1 */}
                  Sort by: <span className="font-medium">Relevance</span>
                </div>
              </div>

              {filteredConsultants.length > 0 ? (
                <div className="space-y-4">
                  {filteredConsultants.map((consultant) => (
                    <Card key={consultant.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900">{consultant.name}</h3>
                              <p className="text-gray-600">{consultant.title}</p>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <span>{consultant.location}</span>
                                {consultant.remote && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <Badge className="bg-accent/20 text-accent hover:bg-accent/30 border-accent/20">Remote Available</Badge>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="mt-2 sm:mt-0 sm:ml-4 text-right">
                              <p className="text-lg font-bold text-gray-900">${consultant.rate}</p>
                              <p className="text-sm text-gray-600">{consultant.rateType}</p>
                              <p className="text-sm text-gray-600">{consultant.availability}</p>
                            </div>
                          </div>
                          
                          <p className="mt-4 text-gray-700">{consultant.description}</p>
                          
                          <div className="mt-4 flex flex-wrap gap-2">
                            {consultant.expertise.map((skill) => (
                              <Badge key={skill} className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="mt-6 flex flex-wrap gap-2">
                            <Button>View Profile</Button>
                            <Button variant="outline">Save</Button>
                            <Button variant="outline">Contact</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-gray-500 mb-4">No consultants found matching your criteria.</p>
                    <Button onClick={clearFilters}>Clear Filters</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
