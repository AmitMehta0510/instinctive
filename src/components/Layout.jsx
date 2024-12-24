import React from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import Topbar from './Topbar';

function Layout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar/>
        
        {/* Main Content */}
        <div className="flex-1 p-4 bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
