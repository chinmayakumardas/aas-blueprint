'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const teamLeads = [
  { id: '1', name: 'John Doe', department: 'Frontend Development' },
  { id: '2', name: 'Jane Smith', department: 'Backend Development' },
  { id: '3', name: 'Mike Johnson', department: 'UI/UX Design' },
  { id: '4', name: 'Sarah Williams', department: 'Project Management' },
  { id: '5', name: 'Robert Brown', department: 'Mobile Development' },
];

const CreateProjectForm = () => {
  const router = useRouter();
  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    projectName: '',
    clientName: '',
    startDate: '',
    endDate: '',
  });

  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTeamLead, setSelectedTeamLead] = useState(null);

  const filteredTeamLeads = teamLeads.filter((lead) =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamLeadSelect = (lead) => {
    setSelectedTeamLead(lead);
    setSearchTerm(lead.name);
    setIsDropdownOpen(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setDocuments((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeDocument = (index) => {
    const updated = [...documents];
    updated.splice(index, 1);
    setDocuments(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', { ...formData, teamLead: selectedTeamLead, documents });
    // Here you would typically make an API call to save the project
    router.push('/project/allproject');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-6 lg:p-8">
      <div className="w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Create New Project</h2>
            <Link href="/project/allproject">
              <button className="flex items-center bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Back to Projects
              </button>
            </Link>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-300">
                  Project Name
                </label>
                <input
                  type="text"
                  name="projectName"
                  id="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter project name"
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2 border text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="clientName" className="block text-sm font-medium text-gray-300">
                  Client Name
                </label>
                <input
                  type="text"
                  name="clientName"
                  id="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter client name"
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2 border text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="relative" ref={dropdownRef}>
                <label htmlFor="teamLeadSearch" className="block text-sm font-medium text-gray-300">
                  Team Lead
                </label>
                <input
                  type="text"
                  id="teamLeadSearch"
                  placeholder="Search team lead..."
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2 border text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  required
                />
                {selectedTeamLead && (
                  <div className="mt-2 p-2 bg-gray-700 rounded-md border border-gray-600">
                    <p className="text-white text-sm">
                      Selected: {selectedTeamLead.name} ({selectedTeamLead.department})
                    </p>
                  </div>
                )}
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredTeamLeads.length > 0 ? (
                      filteredTeamLeads.map((lead) => (
                        <div
                          key={lead.id}
                          className="p-2 hover:bg-gray-600 cursor-pointer text-white text-sm"
                          onClick={() => handleTeamLeadSelect(lead)}
                        >
                          <div className="font-medium">{lead.name}</div>
                          <div className="text-gray-400 text-xs">{lead.department}</div>
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-400 text-sm">No team leads found</div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-300">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2 border text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-300">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  min={formData.startDate}
                  required
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2 border text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="documents" className="block text-sm font-medium text-gray-300">
                Project Documents
              </label>
              <input
                type="file"
                id="documents"
                multiple
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer"
              />
              <p className="text-xs text-gray-400 mt-1">Upload any relevant documents (max 10MB each)</p>
            </div>

            {documents.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Uploaded Documents
                </label>
                <ul className="space-y-2">
                  {documents.map((doc, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-700 p-2 rounded-md border border-gray-600">
                      <span className="text-sm text-white truncate max-w-xs">{doc.name}</span>
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="text-red-400 hover:text-red-300 text-sm transition-colors duration-200"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Create Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectForm;
