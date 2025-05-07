'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Eye, Search } from 'lucide-react';
import { FaSort } from 'react-icons/fa';
import { format } from 'date-fns';

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  // Sample project data
  const projects = [
    { id: 1, name: 'Website Redesign', status: 'Active', createdAt: '2025-03-15', team: 'Frontend', progress: 75 },
    { id: 2, name: 'Mobile App Dev', status: 'In Progress', createdAt: '2025-02-28', team: 'Mobile', progress: 40 },
    { id: 3, name: 'API Integration', status: 'Completed', createdAt: '2025-01-10', team: 'Backend', progress: 100 },
    { id: 4, name: 'UI/UX Overhaul', status: 'Pending', createdAt: '2025-04-01', team: 'Design', progress: 20 },
  ];

  // Sorting function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filtering function
  const filteredProjects = sortedProjects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Projects Dashboard</h1>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-64 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link href="/project/createproject">
              <button className="flex items-center bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <Plus className="h-5 w-5 mr-2" />
                Create Project
              </button>
            </Link>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-gray-800 shadow-2xl rounded-lg overflow-hidden border border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  {['name', 'status', 'createdAt', 'team', 'progress', 'actions'].map((key) => (
                    <th
                      key={key}
                      className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-green-400 transition-colors duration-200"
                      onClick={() => key !== 'actions' && handleSort(key)}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        {key !== 'actions' && (
                          <FaSort
                            className={`h-3 w-3 transition-transform duration-200 ${
                              sortConfig.key === key
                                ? sortConfig.direction === 'asc'
                                  ? 'text-green-500'
                                  : 'text-green-500 rotate-180'
                                : 'text-gray-400'
                            }`}
                          />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-700 transition-all duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {project.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            project.status === 'Active'
                              ? 'bg-green-900 text-green-200'
                              : project.status === 'In Progress'
                              ? 'bg-yellow-900 text-yellow-200'
                              : project.status === 'Completed'
                              ? 'bg-blue-900 text-blue-200'
                              : 'bg-red-900 text-red-200'
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {format(new Date(project.createdAt), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {project.team}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-24 bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link href={`/project/${project.id}`}>
                          <Eye className="h-5 w-5 text-green-500 hover:text-green-400 cursor-pointer transition-colors duration-200" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-400">
                      No projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;