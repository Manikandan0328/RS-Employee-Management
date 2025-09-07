import React from "react";
import { FaUsers, FaTasks, FaEnvelope, FaProjectDiagram } from "react-icons/fa";

const Dashboard = () => {
  // Example dummy data
  const stats = [
    { id: 1, title: "Total Employees", value: 25, icon: <FaUsers size={30} className="text-blue-500" /> },
    { id: 2, title: "Active Projects", value: 8, icon: <FaProjectDiagram size={30} className="text-green-500" /> },
    { id: 3, title: "Pending Tasks", value: 12, icon: <FaTasks size={30} className="text-yellow-500" /> },
    { id: 4, title: "Messages", value: 5, icon: <FaEnvelope size={30} className="text-red-500" /> },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4 hover:shadow-lg transition-shadow"
          >
            <div>{stat.icon}</div>
            <div>
              <p className="text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
