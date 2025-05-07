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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Projects Dashboard</h1>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link href="/projects/create">
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="h-5 w-5 mr-2" />
                Create Project
              </button>
            </Link>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['name', 'status', 'createdAt', 'team', 'progress', 'actions'].map((key) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => key !== 'actions' && handleSort(key)}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        {key !== 'actions' && (
                          <FaSort
                            className={`h-3 w-3 ${
                              sortConfig.key === key
                                ? sortConfig.direction === 'asc'
                                  ? 'text-blue-500'
                                  : 'text-blue-500 rotate-180'
                                : 'text-gray-400'
                            }`}
                          />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {project.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            project.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : project.status === 'In Progress'
                              ? 'bg-yellow-100 text-yellow-800'
                              : project.status === 'Completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(project.createdAt), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.team}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link href={`/projects/${project.id}`}>
                          <Eye className="h-5 w-5 text-blue-600 hover:text-blue-800 cursor-pointer" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
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