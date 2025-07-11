'use client';

import { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed';
  startDate: string;
  endDate?: string;
  technologies: string[];
  objectives: string[];
  phases: {
    name: string;
    status: 'pending' | 'in-progress' | 'completed';
    description: string;
  }[];
  achievements: string[];
  challenges: string[];
  repository?: string;
  demoUrl?: string;
  progress: number;
  files: string[];
}

export default function FinalProject() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'planning' as 'planning' | 'in-progress' | 'completed',
    startDate: '',
    endDate: '',
    technologies: '',
    objectives: '',
    phases: '',
    achievements: '',
    challenges: '',
    repository: '',
    demoUrl: '',
    progress: 0,
    files: [] as string[]
  });

  useEffect(() => {
    const savedProjects = localStorage.getItem('finalProjects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('finalProjects', JSON.stringify(projects));
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
    const newProject: Project = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      status: formData.status,
      startDate: formData.startDate,
      endDate: formData.endDate || undefined,
      technologies: formData.technologies.split(',').map(t => t.trim()),
      objectives: formData.objectives.split('\n').filter(o => o.trim()),
      phases: formData.phases.split('\n').filter(p => p.trim()).map(phase => ({
        name: phase,
        status: 'pending' as 'pending',
        description: ''
      })),
      achievements: formData.achievements.split('\n').filter(a => a.trim()),
      challenges: formData.challenges.split('\n').filter(c => c.trim()),
      repository: formData.repository || undefined,
      demoUrl: formData.demoUrl || undefined,
      progress: formData.progress,
      files: formData.files
    };
    setProjects([newProject, ...projects]);
    setFormData({
      title: '', description: '', status: 'planning', startDate: '', endDate: '',
      technologies: '', objectives: '', phases: '', achievements: '', challenges: '',
      repository: '', demoUrl: '', progress: 0, files: []
    });
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'in-progress': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'planning': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Final Projects</h2>
          <p className="text-gray-400">Manage your capstone cybersecurity projects</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl transition-all duration-300 flex items-center space-x-3 whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <i className="ri-add-line text-xl"></i>
          <span className="font-semibold">Add Project</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
          <h3 className="text-2xl font-semibold text-white mb-8">Add New Final Project</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-3 font-medium">Project Title</label>
              <input
                type="text"
                placeholder="Enter project title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm transition-all duration-200"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-3 font-medium">Description</label>
              <textarea
                placeholder="Describe your project in detail..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm h-32 resize-none transition-all duration-200"
                maxLength={500}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-300 mb-3 font-medium">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as 'planning' | 'in-progress' | 'completed'})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm transition-all duration-200 pr-8"
                >
                  <option value="planning">Planning</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-3 font-medium">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-3 font-medium">End Date (optional)</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm transition-all duration-200"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-3 font-medium">Technologies (comma separated)</label>
              <input
                type="text"
                placeholder="Python, Kali Linux, Metasploit, Wireshark"
                value={formData.technologies}
                onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-3 font-medium">Progress ({formData.progress}%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value)})}
                className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-3 font-medium">Objectives (one per line)</label>
                <textarea
                  placeholder="Enter each objective on a new line"
                  value={formData.objectives}
                  onChange={(e) => setFormData({...formData, objectives: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm h-24 resize-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-3 font-medium">Project Phases (one per line)</label>
                <textarea
                  placeholder="Enter each phase on a new line"
                  value={formData.phases}
                  onChange={(e) => setFormData({...formData, phases: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm h-24 resize-none transition-all duration-200"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-3 font-medium">Achievements (one per line)</label>
                <textarea
                  placeholder="Enter each achievement on a new line"
                  value={formData.achievements}
                  onChange={(e) => setFormData({...formData, achievements: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm h-24 resize-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-3 font-medium">Challenges (one per line)</label>
                <textarea
                  placeholder="Enter each challenge on a new line"
                  value={formData.challenges}
                  onChange={(e) => setFormData({...formData, challenges: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm h-24 resize-none transition-all duration-200"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-3 font-medium">Repository URL (optional)</label>
                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  value={formData.repository}
                  onChange={(e) => setFormData({...formData, repository: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-3 font-medium">Demo URL (optional)</label>
                <input
                  type="url"
                  placeholder="https://project-demo.com"
                  value={formData.demoUrl}
                  onChange={(e) => setFormData({...formData, demoUrl: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-3 font-medium flex items-center space-x-2">
                <i className="ri-upload-cloud-line text-purple-400"></i>
                <span>Upload Project Files & Documentation</span>
              </label>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.zip,.rar"
                onChange={handleFileUpload}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm transition-all duration-200 file:bg-purple-600 file:border-0 file:rounded-lg file:px-4 file:py-2 file:text-white file:cursor-pointer file:mr-4"
              />
              {formData.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-gray-300 font-medium">Uploaded Files:</p>
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-800/30 px-3 py-2 rounded-lg">
                      <span className="text-gray-300 text-sm flex items-center space-x-2">
                        <i className="ri-file-line text-purple-400"></i>
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
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer font-semibold shadow-lg"
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

      {projects.length === 0 ? (
        <div className="text-center py-16">
          <i className="ri-rocket-line text-6xl text-gray-600 mb-4"></i>
          <h3 className="text-xl text-gray-400 mb-2">No final projects added yet</h3>
          <p className="text-gray-500">Start by adding your first major project</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-400 text-sm">
                    <span className="flex items-center space-x-2">
                      <i className="ri-calendar-line"></i>
                      <span>Started: {project.startDate}</span>
                    </span>
                    {project.endDate && (
                      <span className="flex items-center space-x-2">
                        <i className="ri-calendar-check-line"></i>
                        <span>Ended: {project.endDate}</span>
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right ml-6">
                  <div className="text-2xl font-bold text-purple-400 mb-2">{project.progress}%</div>
                  <div className="w-24 bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    ></div>
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
                        className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 px-4 py-2 rounded-full text-sm border border-purple-600/30 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {project.objectives.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                      <i className="ri-target-line text-orange-400"></i>
                      <span>Objectives</span>
                    </h4>
                    <ul className="space-y-2">
                      {project.objectives.map((objective, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                          <i className="ri-arrow-right-s-line text-orange-400 mt-0.5"></i>
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {project.phases.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                      <i className="ri-list-check text-green-400"></i>
                      <span>Project Phases</span>
                    </h4>
                    <ul className="space-y-2">
                      {project.phases.map((phase, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                          <i className="ri-arrow-right-s-line text-green-400 mt-0.5"></i>
                          <span>{phase.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {project.achievements.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                      <i className="ri-trophy-line text-yellow-400"></i>
                      <span>Achievements</span>
                    </h4>
                    <ul className="space-y-2">
                      {project.achievements.map((achievement, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                          <i className="ri-arrow-right-s-line text-yellow-400 mt-0.5"></i>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {project.challenges.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                      <i className="ri-alert-line text-red-400"></i>
                      <span>Challenges</span>
                    </h4>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                          <i className="ri-arrow-right-s-line text-red-400 mt-0.5"></i>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {project.files.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <i className="ri-folder-line text-purple-400"></i>
                    <span>Project Files</span>
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {project.files.map((file, index) => (
                      <div key={index} className="bg-gray-800/30 px-3 py-2 rounded-lg text-sm">
                        <span className="text-gray-300 flex items-center space-x-2">
                          <i className="ri-file-line text-purple-400"></i>
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
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 text-sm cursor-pointer"
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
