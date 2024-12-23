import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { LuMessageSquareMore } from "react-icons/lu";
import { LuSettings2 } from "react-icons/lu";
import { HiOutlineBell } from "react-icons/hi2";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import supabase from "../superbase_client";

function Topbar({ onSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .ilike("name", `%${searchTerm}%`); // Case-insensitive match

      if (error) {
        console.error("Error searching courses:", error.message);
      } else {
        setSearchResults(data);
        setShowSearchResults(true); // Show the card with results
      }
    } catch (error) {
      console.error("Error fetching courses:", error.message);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGlobalClick = () => {
    setIsMessageOpen(false);
    setIsNotificationOpen(false);
    setShowSearchResults(false);
  };

  const handleIconClick = (e) => {
    e.stopPropagation(); // Prevent the global click handler from triggering
  };

  useEffect(() => {
    // Add global click listener
    document.addEventListener("click", handleGlobalClick);
    return () => {
      // Cleanup listener on unmount
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <div className="relative">
      <div
        className="flex flex-row md:flex-row items-center justify-end p-4 bg-gray-100 shadow-md gap-4"
        onClick={handleGlobalClick}
      >
        {/* Search Bar */}
        <div
          className="flex justify-start items-center mr-16 bg-white border border-gray-300 rounded-lg w-[50%] md:w-[70%] relative"
          onClick={handleIconClick}
        >
          <p className="px-3">
            <IoSearch />
          </p>
          <input
            type="text"
            placeholder="Search your course"
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="flex-1 p-2 border-none rounded-lg outline-none text-[#3F526E]"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSearch();
            }}
            className="absolute right-4 px-5 py-1 bg-[#3F526E] text-white rounded-md hover:bg-[rgba(63,82,110,0.8)]"
          >
            Search
          </button>
        </div>

        <div className="w-[55%] md:w-[30%] pr-3">
          <div className="relative flex justify-center items-center gap-6 pr-5 w-[100%]">
            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-2xl p-2 bg-gray-200 rounded-lg"
            >
              <FaBars className="md:text-3xl text-xl" />
            </button>

            {/* Icons */}
            <div className="flex gap-6">
              <Link to="/help">
                <IoMdHelpCircleOutline
                  className="text-2xl cursor-pointer hover:text-blue-500"
                />
              </Link>
              <LuMessageSquareMore
                className="text-2xl cursor-pointer hover:text-blue-500"
                onClick={(e) => {
                  handleIconClick(e);
                  setIsMessageOpen(!isMessageOpen);
                  setIsNotificationOpen(false); // Close notifications
                }}
              />
              <Link to="/settings">
                <LuSettings2
                  className="text-2xl cursor-pointer hover:text-blue-500"
                />
              </Link>
              <HiOutlineBell
                className="text-2xl cursor-pointer hover:text-blue-500"
                onClick={(e) => {
                  handleIconClick(e);
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsMessageOpen(false); // Close messages
                }}
              />
            </div>

            {/* Profile Section */}
            <div
              className="relative flex items-center space-x-2 cursor-pointer"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <FaUserCircle className="text-gray-600 text-2xl" />
              <p className="hidden md:block text-sm font-medium">Amit Mehta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results Card */}
      {showSearchResults && (
        <div
          className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 w-[60%] max-w-sm z-50"
          onClick={(e) => handleIconClick(e)}
        >
          <h3 className="text-lg font-bold mb-4">Search Results</h3>
          {searchResults.length > 0 ? (
            searchResults.map((course) => (
              <div
                key={course.id}
                className="border border-gray-300 rounded-md p-2 mb-2"
              >
                {course.name}
              </div>
            ))
          ) : (
            <p>No courses found.</p>
          )}
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={(e) => {
              e.stopPropagation();
              setShowSearchResults(false);
            }}
          >
            Close
          </button>
        </div>
      )}

      {/* Message Toast */}
      {isMessageOpen && (
        <div
          className="absolute top-16 right-16 bg-white shadow-lg p-4 rounded-lg w-80"
          onClick={handleIconClick}
        >
          <p className="text-center text-gray-600">Start chat</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full">
            Start Chat
          </button>
        </div>
      )}

      {/* Notification Toast */}
      {isNotificationOpen && (
        <div
          className="absolute top-16 right-16 bg-white shadow-lg p-4 rounded-lg w-80"
          onClick={handleIconClick}
        >
          <p className="text-center text-gray-600">
            Your notifications will be shown here.
          </p>
        </div>
      )}
    </div>
  );
}

export default Topbar;
