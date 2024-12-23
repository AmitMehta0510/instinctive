import React from 'react';
import { FaBook, FaChartBar } from "react-icons/fa";
import logo from '../assets/logo.png';
import { AiOutlineDashboard } from "react-icons/ai";
import { PiStudentBold } from "react-icons/pi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { RiSettingsLine } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation(); // Get current route

  return (
    <div className="w-64 h-screen text-gray-700 p-1 flex flex-col">
      <img src={logo} alt="" className='w-[50%] px-3 pt-5 ' />
      
      <nav className="flex-1">
        <ul className="space-y-4 p-4">
          {/* Dashboard Link */}
          <li
            className={` px-3 rounded flex justify-start items-center gap-3 py-3 font-semibold ${location.pathname === '/dashboard' ? 'bg-gray-200 text-black' : 'hover:bg-gray-200 hover:text-black'}`}
          >
            <Link className='flex gap-3 justify-center items-center' to="/dashboard">
              <AiOutlineDashboard /> Dashboard
            </Link>
          </li>

          {/* Students Link */}
          <li
            className={`px-3 rounded flex justify-start items-center gap-3 py-3 font-semibold ${location.pathname === '/studentsPage' ? 'bg-gray-200 text-black' : 'hover:bg-gray-200 hover:text-black'}`}
          >
            <Link className='flex gap-3 justify-center items-center'  to="/studentsPage">
              <PiStudentBold /> Students
            </Link>
          </li>

          {/* Chapter Link */}
          <li
            className={`px-3 rounded flex justify-start items-center gap-3 py-3 font-semibold ${location.pathname === '/chapter' ? 'bg-gray-200 text-black' : 'hover:bg-gray-200 hover:text-black'}`}
          >
            <Link className='flex gap-3 justify-center items-center'  to="/chapter">
              <FaBook /> Chapter
            </Link>
          </li>

          {/* Help Link */}
          <li
            className={`px-3 rounded flex justify-start items-center gap-3 py-3 font-semibold ${location.pathname === '/help' ? 'bg-gray-200 text-black' : 'hover:bg-gray-200 hover:text-black'}`}
          >
            <Link className='flex gap-3 justify-center items-center'  to="/help">
              <IoMdHelpCircleOutline /> Help
            </Link>
          </li>

          {/* Reports Link */}
          <li
            className={`px-3 rounded flex justify-start items-center gap-3 py-3 font-semibold ${location.pathname === '/reports' ? 'bg-gray-200 text-black' : 'hover:bg-gray-200 hover:text-black'}`}
          >
            <Link className='flex gap-3 justify-center items-center'  to="/reports">
              <FaChartBar /> Reports
            </Link>
          </li>

          {/* Settings Link */}
          <li
            className={`px-3 rounded flex justify-start items-center gap-3 py-3 font-semibold ${location.pathname === '/settings' ? 'bg-gray-200 text-black' : 'hover:bg-gray-200 hover:text-black'}`}
          >
            <Link className='flex gap-3 justify-center items-center'  to="/settings">
              <RiSettingsLine /> Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
