'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { cn } from '@/utils/clsx';
import Link from 'next/link';

export default function ProjectPage({ params }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ['Project Details', 'Team', 'Tasks'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-950 p-4 sm:p-6 lg:p-8">
      
      <div className="w-full bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-green-900/30 p-6">
        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="flex space-x-4 border-b border-gray-700 mb-6">
            {tabs.map((tab, index) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  cn(
                    'px-4 py-2 text-sm font-medium focus:outline-none cursor-pointer',
                    'border-b-2 transition-colors duration-150',
                    selected
                      ? 'border-green-500 text-green-400'
                      : 'border-transparent text-gray-400 hover:text-green-300 hover:border-green-700'
                  )
                }
              >
                {tab}
              </Tab>
            ))}
            <div className="flex justify-end mb-4">
        <Link href="/project/allproject">
          <button className="flex items-center bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Projects
          </button>
        </Link>
      </div>
          </Tab.List>

          <Tab.Panels className="text-gray-200">
            <Tab.Panel>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-green-400">Project Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h3 className="font-medium text-green-300">Project Name</h3>
                    <p className="mt-1">Project {params.id}</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h3 className="font-medium text-green-300">Team Lead ID</h3>
                    <p className="mt-1">TL-{params.id}001</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h3 className="font-medium text-green-300">Client ID</h3>
                    <p className="mt-1">CL-{params.id}001</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h3 className="font-medium text-green-300">Start Date</h3>
                    <p className="mt-1">2024-01-01</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h3 className="font-medium text-green-300">End Date</h3>
                    <p className="mt-1">2024-12-31</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h3 className="font-medium text-green-300">Status</h3>
                    <div className="mt-1">
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">45% Complete</p>
                    </div>
                  </div>
                </div>

              </div>
            </Tab.Panel>

            <Tab.Panel>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-green-400">Team Members</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((member) => (
                    <div key={member} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                      <div>
                        <h3 className="font-medium text-green-300">Team Member {member}</h3>
                        <p className="text-sm text-gray-400">Role</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </Tab.Panel>

            <Tab.Panel>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-green-400">Tasks</h2>
                <div className="space-y-2">
                  {[1, 2, 3].map((task) => (
                    <div key={task} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-green-300">Task {task}</h3>
                        <span className="px-2 py-1 text-sm bg-green-900/50 text-green-400 rounded border border-green-700">
                          In Progress
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-400">Task description goes here</p>
                    </div>
                  ))}
                </div>

              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}