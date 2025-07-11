'use client';

import { useState, useEffect } from 'react';

interface Certificate {
  id: string;
  name: string;
  provider: string;
  status: 'earned' | 'in-progress' | 'planned';
  progress: number;
  dateEarned?: string;
  expiryDate?: string;
  credentialId?: string;
  studyMaterials: string[];
  notes: string;
  files: string[];
}

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    provider: '',
    status: 'planned' as 'earned' | 'in-progress' | 'planned',
    progress: 0,
    dateEarned: '',
    expiryDate: '',
    credentialId: '',
    studyMaterials: '',
    notes: '',
    files: [] as string[]
  });

  useEffect(() => {
    const savedCertificates = localStorage.getItem('certificates');
    if (savedCertificates) {
      setCertificates(JSON.parse(savedCertificates));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('certificates', JSON.stringify(certificates));
  }, [certificates]);

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
    const newCertificate: Certificate = {
      id: Date.now().toString(),
      name: formData.name,
      provider: formData.provider,
      status: formData.status,
      progress: formData.progress,
      dateEarned: formData.dateEarned || undefined,
      expiryDate: formData.expiryDate || undefined,
      credentialId: formData.credentialId || undefined,
      studyMaterials: formData.studyMaterials.split('\n').filter(m => m.trim()),
      notes: formData.notes,
      files: formData.files
    };
    setCertificates([newCertificate, ...certificates]);
    setFormData({ name: '', provider: '', status: 'planned', progress: 0, dateEarned: '', expiryDate: '', credentialId: '', studyMaterials: '', notes: '', files: [] });
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'earned': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'in-progress': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'planned': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'earned': return 'ri-check-line';
      case 'in-progress': return 'ri-time-line';
      case 'planned': return 'ri-calendar-line';
      default: return 'ri-file-line';
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Certifications</h2>
          <p className="text-gray-400">Track your cybersecurity certifications and progress</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl transition-all duration-300 flex items-center space-x-3 whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <i className="ri-add-line text-xl"></i>
          <span className="font-semibold">Add Certificate</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
          <h3 className="text-2xl font-semibold text-white mb-8">Add New Certificate</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-3 font-medium">Certificate Name</label>
                <input
                  type="text"
                  placeholder="e.g., CompTIA Security+"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-sm transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-3 font-medium">Provider</label>
                <input
                  type="text"
                  placeholder="e.g., CompTIA, Cisco, EC-Council"
                  value={formData.provider}
                  onChange={(e) => setFormData({...formData, provider: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-sm transition-all duration-200"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-3 font-medium">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as 'earned' | 'in-progress' | 'planned'})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-sm transition-all duration-200 pr-8"
                >
                  <option value="planned">Planned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="earned">Earned</option>
                </select>
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
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-3 font-medium">Date Earned (if applicable)</label>
                <input
                  type="date"
                  value={formData.dateEarned}
                  onChange={(e) => setFormData({...formData, dateEarned: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-sm transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-3 font-medium">Expiry Date (if applicable)</label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-sm transition-all duration-200"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-3 font-medium">Credential ID (if earned)</label>
              <input
                type="text"
                placeholder="Certificate credential ID"
                value={formData.credentialId}
                onChange={(e) => setFormData({...formData, credentialId: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-sm transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-3 font-medium">Study Materials (one per line)</label>
              <textarea
                placeholder="Enter each study material on a new line"
                value={formData.studyMaterials}
                onChange={(e) => setFormData({...formData, studyMaterials: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-sm h-24 resize-none transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-3 font-medium">Notes</label>
              <textarea
                placeholder="Additional notes about this certification..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-sm h-24 resize-none transition-all duration-200"
                maxLength={500}
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-3 font-medium flex items-center space-x-2">
                <i className="ri-upload-cloud-line text-green-400"></i>
                <span>Upload Certificate Files & Study Materials</span>
              </label>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-sm transition-all duration-200 file:bg-green-600 file:border-0 file:rounded-lg file:px-4 file:py-2 file:text-white file:cursor-pointer file:mr-4"
              />
              {formData.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-gray-300 font-medium">Uploaded Files:</p>
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-800/30 px-3 py-2 rounded-lg">
                      <span className="text-gray-300 text-sm flex items-center space-x-2">
                        <i className="ri-file-line text-green-400"></i>
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
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer font-semibold shadow-lg"
              >
                Save Certificate
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

      {certificates.length === 0 ? (
        <div className="text-center py-16">
          <i className="ri-award-line text-6xl text-gray-600 mb-4"></i>
          <h3 className="text-xl text-gray-400 mb-2">No certificates added yet</h3>
          <p className="text-gray-500">Start by adding your first certification goal</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <h3 className="text-2xl font-bold text-white">{cert.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(cert.status)} flex items-center space-x-2`}>
                      <i className={getStatusIcon(cert.status)}></i>
                      <span className="capitalize">{cert.status}</span>
                    </span>
                  </div>
                  <p className="text-gray-400 text-lg">{cert.provider}</p>
                  {cert.dateEarned && (
                    <p className="text-green-400 text-sm mt-2">
                      <i className="ri-calendar-check-line mr-2"></i>
                      Earned: {cert.dateEarned}
                    </p>
                  )}
                  {cert.credentialId && (
                    <p className="text-blue-400 text-sm mt-1">
                      <i className="ri-key-line mr-2"></i>
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>
                <div className="text-right ml-6">
                  <div className="text-2xl font-bold text-green-400 mb-2">{cert.progress}%</div>
                  <div className="w-24 bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${cert.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {cert.notes && (
                <p className="text-gray-300 mb-6 leading-relaxed">{cert.notes}</p>
              )}
              
              {cert.studyMaterials.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <i className="ri-book-line text-blue-400"></i>
                    <span>Study Materials</span>
                  </h4>
                  <ul className="space-y-2">
                    {cert.studyMaterials.map((material, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <i className="ri-arrow-right-s-line text-blue-400 mt-0.5"></i>
                        <span>{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {cert.files.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <i className="ri-folder-line text-green-400"></i>
                    <span>Certificate Files</span>
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {cert.files.map((file, index) => (
                      <div key={index} className="bg-gray-800/30 px-3 py-2 rounded-lg text-sm">
                        <span className="text-gray-300 flex items-center space-x-2">
                          <i className="ri-file-line text-green-400"></i>
                          <span className="truncate">{file}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {cert.expiryDate && (
                <div className="mt-4 p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
                  <p className="text-yellow-400 text-sm">
                    <i className="ri-alarm-warning-line mr-2"></i>
                    Expires: {cert.expiryDate}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
