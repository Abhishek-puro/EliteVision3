import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>

      {/* Overview Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <p className="text-gray-600">Check your latest activity and interactions.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Messages</h2>
          <p className="text-gray-600">You have 5 unread messages.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Notifications</h2>
          <p className="text-gray-600">You have 3 new notifications.</p>
        </div>
      </div>

      {/* Detailed Info Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Username:</span>
            <span className="text-gray-600">john_doe</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span className="text-gray-600">john.doe@example.com</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Membership:</span>
            <span className="text-gray-600">Premium</span>
          </div>
        </div>
      </div>

      {/* Settings and Actions Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <button className="bg-[#28b4a4] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#28b4a4]">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
