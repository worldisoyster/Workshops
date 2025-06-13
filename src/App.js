import React, { useState, useEffect } from 'react';
import { Search, Plus, Clock, Users, Target, BookOpen, Filter, Tag, Calendar, Download, Star } from 'lucide-react';

const WorkshopStorefront = () => {
  const [workshops, setWorkshops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWorkshop, setNewWorkshop] = useState({
    title: '',
    description: '',
    duration: '',
    participants: '',
    category: 'process-improvement',
    tags: '',
    materials: '',
    objectives: '',
    difficulty: 'intermediate'
  });

  // Initialize with sample data including your Kaizen workshop
  useEffect(() => {
    const sampleWorkshops = [
      {
        id: 1,
        title: "Kaizen Email Process Mapping",
        description: "Visual process mapping workshop to simplify email creation workflows using continuous improvement principles",
        duration: "2 hours",
        participants: "6-8 team members",
        category: "process-improvement",
        tags: ["kaizen", "email", "process-mapping", "burger-king", "continuous-improvement"],
        materials: "Sticky notes, markers, whiteboard, timer",
        objectives: "Map current email process, identify pain points, implement quick wins",
        difficulty: "intermediate",
        dateCreated: "2024-06-12",
        lastUpdated: "2024-06-12",
        featured: true,
        phases: [
          "Current State Mapping (45 min)",
          "Analysis & Simplification (50 min)", 
          "Action Planning (10 min)"
        ]
      },
      {
        id: 2,
        title: "Clues You Can Use: Personalization Lab",
        description: "Interactive brand personalization workshop using clue-based strategy development and cohort scenario analysis",
        duration: "2.5 hours",
        participants: "19 brand teams (5-6 per team)",
        category: "strategy",
        tags: ["personalization", "brand-strategy", "cohort-analysis", "clue-cards", "customer-insights"],
        materials: "Game boards, clue card packets, cohort scenarios, insights printouts, sticky notes, pens/markers",
        objectives: "Brainstorm personalization clues, build personalized moment strategies, create activation triggers",
        difficulty: "intermediate",
        dateCreated: "2024-06-12",
        lastUpdated: "2024-06-12",
        featured: false,
        phases: [
          "Introduction & Room Setup (20 min)",
          "Activity 1: Brainstorm Clues (45 min)",
          "Activity 2: Build Personalized Moment Strategy (60 min)",
          "Synthesis & Voting (25 min)"
        ]
      },
      {
        id: 3,
        title: "Dolor Sit Amet Facilitation",
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
        duration: "90 minutes",
        participants: "4-6 participants",
        category: "team-building",
        tags: ["consectetur", "adipiscing", "elit", "tempor"],
        materials: "Ullamco laboris, nisi ut aliquip, ex ea commodo",
        objectives: "Duis aute irure dolor in reprehenderit in voluptate velit esse",
        difficulty: "beginner",
        dateCreated: "2024-06-08",
        lastUpdated: "2024-06-09",
        featured: true
      }
    ];
    setWorkshops(sampleWorkshops);
  }, []);

  const categories = [
    { value: 'all', label: 'All Workshops', icon: BookOpen },
    { value: 'process-improvement', label: 'Process Improvement', icon: Target },
    { value: 'innovation', label: 'Innovation', icon: Star },
    { value: 'team-building', label: 'Team Building', icon: Users },
    { value: 'strategy', label: 'Strategy', icon: Calendar }
  ];

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || workshop.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddWorkshop = () => {
    const workshop = {
      id: workshops.length + 1,
      ...newWorkshop,
      tags: newWorkshop.tags.split(',').map(tag => tag.trim()),
      dateCreated: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      featured: false
    };
    setWorkshops([...workshops, workshop]);
    setNewWorkshop({
      title: '',
      description: '',
      duration: '',
      participants: '',
      category: 'process-improvement',
      tags: '',
      materials: '',
      objectives: '',
      difficulty: 'intermediate'
    });
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Workshop Artifact Storefront</h1>
          <p className="text-xl text-gray-600">Your curated collection of facilitation masterpieces</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search workshops, tags, or descriptions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Add Workshop
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Workshop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredWorkshops.map(workshop => (
            <div key={workshop.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              {workshop.featured && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 text-sm font-medium">
                  ⭐ Featured Workshop
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-gray-900 leading-tight">{workshop.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[workshop.difficulty]}`}>
                    {workshop.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{workshop.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{workshop.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>{workshop.participants}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Target className="h-4 w-4" />
                    <span className="truncate">{workshop.objectives}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {workshop.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                  {workshop.tags.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      +{workshop.tags.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    Updated {workshop.lastUpdated}
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium">
                    <Download className="h-4 w-4" />
                    Use Workshop
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Workshop Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Add New Workshop</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Workshop Title</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={newWorkshop.title}
                    onChange={(e) => setNewWorkshop({...newWorkshop, title: e.target.value})}
                    placeholder="e.g., Agile Retrospective Deep Dive"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    value={newWorkshop.description}
                    onChange={(e) => setNewWorkshop({...newWorkshop, description: e.target.value})}
                    placeholder="Brief description of the workshop's purpose and approach"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input
                      type="text"
                      required
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={newWorkshop.duration}
                      onChange={(e) => setNewWorkshop({...newWorkshop, duration: e.target.value})}
                      placeholder="e.g., 90 minutes"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Participants</label>
                    <input
                      type="text"
                      required
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={newWorkshop.participants}
                      onChange={(e) => setNewWorkshop({...newWorkshop, participants: e.target.value})}
                      placeholder="e.g., 5-8 team members"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={newWorkshop.category}
                      onChange={(e) => setNewWorkshop({...newWorkshop, category: e.target.value})}
                    >
                      {categories.slice(1).map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={newWorkshop.difficulty}
                      onChange={(e) => setNewWorkshop({...newWorkshop, difficulty: e.target.value})}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={newWorkshop.tags}
                    onChange={(e) => setNewWorkshop({...newWorkshop, tags: e.target.value})}
                    placeholder="e.g., retrospective, agile, continuous-improvement"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Materials Needed</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={newWorkshop.materials}
                    onChange={(e) => setNewWorkshop({...newWorkshop, materials: e.target.value})}
                    placeholder="e.g., Sticky notes, markers, timer, flipchart"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Key Objectives</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={newWorkshop.objectives}
                    onChange={(e) => setNewWorkshop({...newWorkshop, objectives: e.target.value})}
                    placeholder="What will participants achieve?"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add Workshop
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
                </div>
            </div>
          </div>
        )}

        {/* Stats Footer */}
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-600">{workshops.length}</div>
              <div className="text-gray-600">Total Workshops</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{workshops.filter(w => w.featured).length}</div>
              <div className="text-gray-600">Featured</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{categories.length - 1}</div>
              <div className="text-gray-600">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopStorefront;

export default App;
