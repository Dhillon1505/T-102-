'use client';

import { useState, useEffect } from 'react';

interface MiniProject {
  id: string;
  title: string;
  description: string;
  status: 'planned' | 'in-progress' | 'completed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  dateCompleted?: string;
  technologies: string[];
  learningOutcomes: string[];
  repository?: string;
  demoUrl?: string;
  timeSpent: string;
  files: string[];
}

export default function MiniProjects() {
  const [projects, setProjects] = useState<MiniProject[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'planned' as 'planned' | 'in-progress' | 'completed',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    dateCompleted: '',
    technologies: '',
    learningOutcomes: '',
    repository: '',
    demoUrl: '',
    timeSpent: '',
    files: [] as string[]
  });

  useEffect(() => {
    const savedProjects = localStorage.getItem('miniProjects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('miniProjects', JSON.stringify(projects));
  }, [projects]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setFormData({...formData, files: [...formData.files, ...fileNames]});
    }
  };

  const removeFile = (index: number) => {
    const newFiles = formData.files.filter((_, i) => i !== index);
    setFormData({...formData, files: newFiles});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: MiniProject = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      status: formData.status,
      difficulty: formData.difficulty,
      dateCompleted: formData.dateCompleted || undefined,
      technologies: formData.technologies.split(',').map(t => t.trim()),
      learningOutcomes: formData.learningOutcomes.split('\n').filter(o => o.trim()),
      repository: formData.repository || undefined,
      demoUrl: formData.demoUrl || undefined,
      timeSpent: formData.timeSpent,
      files: formData.files
    };
    setProjects([newProject, ...projects]);
    setFormData({
      title: '', description: '', status: 'planned', difficulty: 'beginner',
      dateCompleted: '', technologies: '', learningOutcomes: '', repository: '', demoUrl: '', timeSpent: '', files: []
    });
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'in-progress': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'planned': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'advanced': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.status === filter
  );

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Mini Projects</h2>
          <p className="text-gray-400">Track smaller projects and experiments</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-xl transition-all duration-300 flex items-center space-x-3 whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <i className="ri-add-line text-xl"></i>
          <span className="font-semibold">Add Mini Project</span>
        </button>
      </div>

      <div className="flex space-x-2">
        {['all', 'planned', 'in-progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
              filter === status
                ? 'bg-orange-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
          <h3 className="text-2xl font-semibold text-white mb-8">Add New Mini Project</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-3 font-medium">Project Title</label>
              <input
                type="text"
                placeholder="Enter project title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm transition-all duration-200"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-3 font-medium">Description</label>
              <textarea
                placeholder="Describe your mini project..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm h-32 resize-none transition-all duration-200"
                maxLength={500}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-300 mb-3 font-medium">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as 'planned' | 'in-progress' | 'completed'})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm transition-all duration-200 pr-8"
                >
                  <option value="planned">Planned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-3 font-medium">Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({...formData, difficulty: e.target.value as 'beginner' | 'intermediate' | 'advanced'})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm transition-all duration-200 pr-8"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-3 font-medium">Time Spent</label>
                <input
                  type="text"
                  placeholder="e.g., 2 hours"
                  value={formData.timeSpent}
                  onChange={(e) => setFormData({...formData, timeSpent: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm transition-all duration-200"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-3 font-medium">Date Completed (if applicable)</label>
              <input
                type="date"
                value={formData.dateCompleted}
                onChange={(e) => setFormData({...formData, dateCompleted: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-3 font-medium">Technologies (comma separated)</label>
              <input
                type="text"
                placeholder="Python, Nmap, Wireshark"
                value={formData.technologies}
                onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-3 font-medium">Learning Outcomes (one per line)</label>
              <textarea
                placeholder="Enter each learning outcome on a new line"
                value={formData.learningOutcomes}
                onChange={(e) => setFormData({...formData, learningOutcomes: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm h-24 resize-none transition-all duration-200"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-3 font-medium">Repository URL (optional)</label>
                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  value={formData.repository}
                  onChange={(e) => setFormData({...formData, repository: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-3 font-medium">Demo URL (optional)</label>
                <input
                  type="url"
                  placeholder="https://project-demo.com"
                  value={formData.demoUrl}
                  onChange={(e) => setFormData({...formData, demoUrl: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-3 font-medium flex items-center space-x-2">
                <i className="ri-upload-cloud-line text-orange-400"></i>
                <span>Upload Project Files & Documents</span>
              </label>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm transition-all duration-200 file:bg-orange-600 file:border-0 file:rounded-lg file:px-4 file:py-2 file:text-white file:cursor-pointer file:mr-4"
              />
              {formData.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-gray-300 font-medium">Uploaded Files:</p>
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-800/30 px-3 py-2 rounded-lg">
                      <span className="text-gray-300 text-sm flex items-center space-x-2">
                        <i className="ri-file-line text-orange-400"></i>
                        <span>{file}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-400 hover:text-red-300 cursor-pointer"
                      >
                        <i className="ri-close-line"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer font-semibold shadow-lg"
              >
                Save Project
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {filteredProjects.length === 0 ? (
        <div className="text-center py-16">
          <i className="ri-code-box-line text-6xl text-gray-600 mb-4"></i>
          <h3 className="text-xl text-gray-400 mb-2">
            {filter === 'all' ? 'No mini projects added yet' : `No ${filter} projects`}
          </h3>
          <p className="text-gray-500">
            {filter === 'all' ? 'Start by adding your first mini project' : `Add projects with ${filter} status`}
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <div className="flex space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(project.difficulty)}`}>
                        {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-400 text-sm">
                    <span className="flex items-center space-x-2">
                      <i className="ri-time-line"></i>
                      <span>{project.timeSpent}</span>
                    </span>
                    {project.dateCompleted && (
                      <span className="flex items-center space-x-2">
                        <i className="ri-calendar-check-line"></i>
                        <span>Completed: {project.dateCompleted}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
              
              {project.technologies.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <i className="ri-tools-line text-blue-400"></i>
                    <span>Technologies</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="bg-gradient-to-r from-orange-600/20 to-red-600/20 text-orange-300 px-4 py-2 rounded-full text-sm border border-orange-600/30 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {project.learningOutcomes.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <i className="ri-lightbulb-line text-yellow-400"></i>
                    <span>Learning Outcomes</span>
                  </h4>
                  <ul className="space-y-2">
                    {project.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <i className="ri-arrow-right-s-line text-yellow-400 mt-0.5"></i>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.files.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <i className="ri-folder-line text-orange-400"></i>
                    <span>Project Files</span>
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {project.files.map((file, index) => (
                      <div key={index} className="bg-gray-800/30 px-3 py-2 rounded-lg text-sm">
                        <span className="text-gray-300 flex items-center space-x-2">
                          <i className="ri-file-line text-orange-400"></i>
                          <span className="truncate">{file}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {(project.repository || project.demoUrl) && (
                <div className="flex space-x-4">
                  {project.repository && (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 text-sm cursor-pointer"
                    >
                      <i className="ri-github-line"></i>
                      <span>Repository</span>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 text-sm cursor-pointer"
                    >
                      <i className="ri-external-link-line"></i>
                      <span>Demo</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
