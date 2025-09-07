import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdPeople,
  MdCalendarToday,
  MdMessage,
} from "react-icons/md";
import Navbar from "../components/Navbar";
import Faculty from "./Employee";
import Dashboard from "./Dashboard";
import CalendarPage from "./CalendarPage";
import Messages from "./Messages";

const MENU_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    component: Dashboard,
    icon: <MdDashboard size={20} />,
  },
  {
    id: "employees",
    label: "Employees",
    component: Faculty,
    icon: <MdPeople size={20} />,
  },
  {
    id: "calendar",
    label: "Calendar",
    component: CalendarPage,
    icon: <MdCalendarToday size={20} />,
  },
  {
    id: "messages",
    label: "Messages",
    component: Messages,
    icon: <MdMessage size={20} />,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("dashboard");

  const renderContent = () => {
    const MenuItem = MENU_ITEMS.find(
      item => item.id === selectedMenu
    )?.component;
    return MenuItem && <MenuItem />;
  };

  const handleMenuClick = menuId => {
    setSelectedMenu(menuId);
    navigate(`/dashboard?page=${menuId}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Full-width Header */}
      <header className="w-full">
        <Navbar />
      </header>

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-300 p-4">
          <ul className="space-y-2">
            {MENU_ITEMS.map(item => {
              return (
                <li
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`
    flex items-center gap-2 px-4 py-3 cursor-pointer w-full text-left
    font-medium text-lg transition-all duration-300 ease-in-out
    ${
      selectedMenu === item.id
        ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md rounded-r-full"
        : "text-gray-700 hover:bg-gray-200 hover:rounded-r-full"
    }
  `}
                >
                  <span className="flex items-center gap-2">
                    {item.icon} {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Home;
