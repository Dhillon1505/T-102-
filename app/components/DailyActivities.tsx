'use client';

import { useState, useEffect } from 'react';

interface Activity {
  id: string;
  date: string;
  topic: string;
  duration: string;
  description: string;
  skills: string[];
  progress: number;
  objectives: string[];
  resources: string[];
  files: string[];
}

export default function DailyActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    topic: '',
    duration: '',
    description: '',
    skills: '',
    progress: 0,
    objectives: '',
    resources: '',
    files: [] as string[]
  });

  useEffect(() => {
    const savedActivities = localStorage.getItem('dailyActivities');
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dailyActivities', JSON.stringify(activities));
  }, [activities]);

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
    const newActivity: Activity = {
      id: Date.now().toString(),
      date: formData.date,
      topic: formData.topic,
      duration: formData.duration,
      description: formData.description,
      skills: formData.skills.split(',').map(s => s.trim()),
      progress: formData.progress,
      objectives: formData.objectives.split('\n').filter(o => o.trim()),
      resources: formData.resources.split('\n').filter(r => r.trim()),
      files: formData.files
    };
    setActivities([newActivity, ...activities]);
    setFormData({ date: '', topic: '', duration: '', description: '', skills: '', progress: 0, objectives: '', resources: '', files: [] });
    setShowForm(false);
  };

  return (
    <div className="space-y-10 relative">
      <div className="absolute -top-4 right-0 text-4xl animate-bounce opacity-60">📚</div>
      <div className="absolute top-20 -left-8 text-3xl animate-pulse opacity-40">⚡</div>
      
      <div className="flex justify-between items-center relative">
        <div className="flex items-center space-x-4">
          <div className="text-6xl animate-bounce">📝</div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Daily Training Activities ⚡
            </h2>
            <p className="text-gray-400 flex items-center space-x-2">
              <span>🎯 Track your daily learning progress and skill development</span>
              <span className="animate-pulse">💪</span>
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl transition-all duration-300 flex items-center space-x-3 whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 relative group"
        >
          <span className="text-xl animate-bounce group-hover:animate-spin">➕</span>
          <i className="ri-add-line text-xl"></i>
          <span className="font-semibold">Log New Activity</span>
          <span className="text-xl animate-pulse">🚀</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-4 right-4 text-2xl animate-bounce">✨</div>
          <div className="absolute bottom-4 left-4 text-2xl animate-pulse opacity-50">🎨</div>
          
          <div className="flex items-center space-x-3 mb-8">
            <span className="text-3xl animate-bounce">📋</span>
            <h3 className="text-2xl font-semibold text-white bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Log New Training Activity
            </h3>
            <span className="text-2xl animate-pulse">⚡</span>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-gray-300 mb-3 font-medium flex items-center space-x-2">
                  <span>📅</span>
                  <span>Training Date</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all duration-200 hover:border-blue-400"
                  required
                />
              </div>
              <div className="relative">
                <label className="block text-gray-300 mb-3 font-medium flex items-center space-x-2">
                  <span>⏱️</span>
                  <span>Duration</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., 3 hours ⚡"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all duration-200 hover:border-blue-400"
                  required
                />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-gray-300 mb-3 font-medium flex items-center space-x-2">
                <span>🎯</span>
                <span>Topic/Subject</span>
              </label>
              <input
                type="text"
                placeholder="Training topic or subject area 🚀"
                value={formData.topic}
                onChange={(e) => setFormData({...formData, topic: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all duration-200 hover:border-blue-400"
                required
              />
            </div>
            
            <div className="relative">
              <label className="block text-gray-300 mb-3 font-medium flex items-center space-x-2">
                <span>📝</span>
                <span>Description</span>
              </label>
              <textarea
                placeholder="Describe what you learned and practiced in detail... ✨"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm h-32 resize-none transition-all duration-200 hover:border-blue-400"
                maxLength={500}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-gray-300 mb-3 font-medium flex items-center space-x-2">
                  <span>🛠️</span>
                  <span>Skills Developed (comma separated)</span>
                </label>
                <input
                  type="text"
                  placeholder="Python, Network Security, Penetration Testing ⚡"
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all duration-200 hover:border-blue-400"
                />
              </div>
              <div className="relative">
                <label className="block text-gray-300 mb-3 font-medium flex items-center space-x-2">
                  <span>📊</span>
                  <span>Progress Completion ({formData.progress}%) 🔥</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value)})}
                  className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider hover:bg-gray-600 transition-all duration-200"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-gray-300 mb-3 font-medium flex items-center space-x-2">
                  <span>🎯</span>
                  <span>Learning Objectives (one per line)</span>
                </label>
                <textarea
                  placeholder="Enter each objective on a new line 📋"
                  value={formData.objectives}
                  onChange={(e) => setFormData({...formData, objectives: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm h-24 resize-none transition-all duration-200 hover:border-blue-400"
                />
              </div>
              <div className="relative">
                <label className="block text-gray-300 mb-3 font-medium flex items-center space-x-2">
                  <span>📚</span>
                  <span>Resources Used (one per line)</span>
                </label>
                <textarea
                  placeholder="Enter each resource on a new line 🔗"
                  value={formData.resources}
                  onChange={(e) => setFormData({...formData, resources: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm h-24 resize-none transition-all duration-200 hover:border-blue-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-3 font-medium flex items-center space-x-2">
                <span>📁</span>
                <i className="ri-upload-cloud-line text-blue-400"></i>
                <span>Upload Activity Files & Screenshots</span>
              </label>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all duration-200 file:bg-blue-600 file:border-0 file:rounded-lg file:px-4 file:py-2 file:text-white file:cursor-pointer file:mr-4 hover:border-blue-400"
              />
              {formData.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-gray-300 font-medium flex items-center space-x-2">
                    <span>📂</span>
                    <span>Uploaded Files:</span>
                  </p>
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-800/30 px-3 py-2 rounded-lg hover:bg-gray-700/30 transition-colors">
                      <span className="text-gray-300 text-sm flex items-center space-x-2">
                        <i className="ri-file-line text-blue-400"></i>
                        <span>{file}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-400 hover:text-red-300 cursor-pointer hover:scale-110 transition-transform"
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
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer font-semibold shadow-lg hover:scale-105 flex items-center space-x-2"
              >
                <span>💾</span>
                <span>Save Activity</span>
                <span className="animate-bounce">✨</span>
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer font-semibold hover:scale-105 flex items-center space-x-2"
              >
                <span>❌</span>
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {activities.length === 0 ? (
        <div className="text-center py-16 relative">
          <div className="absolute inset-0 flex justify-center items-center opacity-10">
            <div 
              className="w-64 h-64 bg-cover bg-center rounded-full"
              style={{
                backgroundImage: `url('https://readdy.ai/api/search-image?query=cute%20anime%20character%20studying%20cybersecurity%20with%20books%20and%20computer%2C%20kawaii%20style%2C%20purple%20and%20blue%20colors%2C%20chibi%20art%20style%2C%20friendly%20expression%2C%20tech%20accessories%2C%20study%20motivation&width=300&height=300&seq=study-mascot-001&orientation=squarish')`,
              }}
            />
          </div>
          <div className="relative z-10">
            <div className="text-8xl mb-4 animate-bounce">📋</div>
            <h3 className="text-xl text-gray-400 mb-2 flex items-center justify-center space-x-2">
              <span>✨</span>
              <span>No activities logged yet</span>
              <span>✨</span>
            </h3>
            <p className="text-gray-500 flex items-center justify-center space-x-2">
              <span>🚀</span>
              <span>Start by adding your first training activity</span>
              <span>💫</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-8">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] relative overflow-hidden group">
              <div className="absolute top-4 right-4 text-2xl animate-bounce opacity-60 group-hover:animate-spin">⚡</div>
              <div className="absolute bottom-4 left-4 text-xl animate-pulse opacity-40">✨</div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl animate-bounce">🎯</span>
                    <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {activity.topic}
                    </h3>
                    <span className="text-xl animate-pulse">🚀</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                    <span className="flex items-center space-x-2 bg-gray-800/50 px-3 py-1 rounded-full hover:bg-gray-700/50 transition-colors">
                      <span>📅</span>
                      <i className="ri-calendar-line text-blue-400"></i>
                      <span>{activity.date}</span>
                    </span>
                    <span className="flex items-center space-x-2 bg-gray-800/50 px-3 py-1 rounded-full hover:bg-gray-700/50 transition-colors">
                      <span>⏱️</span>
                      <i className="ri-time-line text-green-400"></i>
                      <span>{activity.duration}</span>
                    </span>
                  </div>
                </div>
                <div className="text-right ml-6 relative">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl animate-bounce">🔥</span>
                    <div className="text-2xl font-bold text-blue-400">{activity.progress}%</div>
                    <span className="text-xl animate-pulse">⚡</span>
                  </div>
                  <div className="w-24 bg-gray-700 rounded-full h-3 relative overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 relative"
                      style={{ width: `${activity.progress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed text-lg">{activity.description}</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {activity.objectives.length > 0 && (
                  <div className="relative">
                    <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                      <span className="text-xl animate-bounce">🎯</span>
                      <i className="ri-target-line text-orange-400"></i>
                      <span>Learning Objectives</span>
                    </h4>
                    <ul className="space-y-2">
                      {activity.objectives.map((objective, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start space-x-2 group">
                          <i className="ri-arrow-right-s-line text-orange-400 mt-0.5 group-hover:animate-bounce"></i>
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {activity.resources.length > 0 && (
                  <div className="relative">
                    <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                      <span className="text-xl animate-bounce">📚</span>
                      <i className="ri-book-line text-green-400"></i>
                      <span>Resources Used</span>
                    </h4>
                    <ul className="space-y-2">
                      {activity.resources.map((resource, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start space-x-2 group">
                          <i className="ri-arrow-right-s-line text-green-400 mt-0.5 group-hover:animate-bounce"></i>
                          <span>{resource}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {activity.skills.length > 0 && (
                <div className="relative mb-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <span className="text-xl animate-bounce">🛠️</span>
                    <i className="ri-lightbulb-line text-purple-400"></i>
                    <span>Skills Developed</span>
                    <span className="text-lg animate-pulse">✨</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activity.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 px-4 py-2 rounded-full text-sm border border-blue-600/30 font-medium hover:scale-105 transition-transform duration-200 cursor-pointer"
                      >
                        ⚡ {skill} ✨
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activity.files.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <span className="text-xl animate-bounce">📁</span>
                    <i className="ri-folder-line text-blue-400"></i>
                    <span>Activity Files</span>
                    <span className="text-lg animate-pulse">✨</span>
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {activity.files.map((file, index) => (
                      <div key={index} className="bg-gray-800/30 px-3 py-2 rounded-lg text-sm hover:bg-gray-700/30 transition-colors">
                        <span className="text-gray-300 flex items-center space-x-2">
                          <i className="ri-file-line text-blue-400"></i>
                          <span className="truncate">{file}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
