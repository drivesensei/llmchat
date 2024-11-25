import { Menu, X } from 'lucide-react';
import Questions from './question';

import { sidebarOpen, toggleSidebar } from '../store/sidebar';
import { createQuestion } from '../actions/question'

export default function Sidebar() {
  return <>
      {/* Mobile sidebar toggle */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        {sidebarOpen.value ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <aside
        className={`${
          sidebarOpen.value ? 'translate-x-0' : '-translate-x-full'
        } scroll-y fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 border-r-2`}
      >
        <div className="p-4">
          <button className="btn btn-primary w-full" onClick={() => {
        console.info('creating...');
        createQuestion()
          }}>New Q/A</button>
        </div>

        <div className="grid items-center">
          <Questions />
        </div>
      </aside>
    </>
}
    
  