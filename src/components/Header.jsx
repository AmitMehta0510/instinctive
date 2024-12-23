import React from 'react'

function Header() {
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <div className="text-xl font-bold">Quyl Dashboard</div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/" className="hover:underline">Dashboard</a></li>
              <li><a href="/help" className="hover:underline">Help</a></li>
            </ul>
          </nav>
        </header>
      );
}

export default Header