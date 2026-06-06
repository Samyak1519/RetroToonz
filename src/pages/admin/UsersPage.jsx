import { useState } from "react";

const usersData = [
  {
    id: 1,
    name: "Samyak",
    email: "samyak@email.com",
    role: "Admin",
    status: "Active",
    joined: "2026-04-01",
  },
  {
    id: 2,
    name: "Rahul",
    email: "rahul@email.com",
    role: "User",
    status: "Active",
    joined: "2026-04-10",
  },
  {
    id: 3,
    name: "Priya",
    email: "priya@email.com",
    role: "User",
    status: "Inactive",
    joined: "2026-03-20",
  },
  {
    id: 4,
    name: "Amit",
    email: "amit@email.com",
    role: "User",
    status: "Active",
    joined: "2026-04-05",
  },
  {
    id: 5,
    name: "Neha",
    email: "neha@email.com",
    role: "User",
    status: "Active",
    joined: "2026-04-08",
  },
  {
    id: 6,
    name: "Vikram",
    email: "vikram@email.com",
    role: "Admin",
    status: "Active",
    joined: "2026-03-15",
  },
  {
    id: 7,
    name: "Sneha",
    email: "sneha@email.com",
    role: "User",
    status: "Inactive",
    joined: "2026-04-11",
  },
  {
    id: 8,
    name: "Rohan",
    email: "rohan@email.com",
    role: "User",
    status: "Active",
    joined: "2026-04-12",
  },
  {
    id: 9,
    name: "Karan",
    email: "karan@email.com",
    role: "User",
    status: "Active",
    joined: "2026-03-28",
  },
  {
    id: 10,
    name: "Pooja",
    email: "pooja@email.com",
    role: "Admin",
    status: "Active",
    joined: "2026-04-02",
  },
];

// 🔥 Date Formatter
const formatDate = (dateStr) => {
  const date = new Date(dateStr);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export default function UsersPage() {
  const [filter, setFilter] = useState("All");

  const filteredUsers =
    filter === "All" ? usersData : usersData.filter((u) => u.role === filter);

  const now = new Date();

  // 📊 Stats
  const totalUsers = usersData.length;
  const totalAdmins = usersData.filter((u) => u.role === "Admin").length;

  const weeklyUsers = usersData.filter((u) => {
    const diff = (now - new Date(u.joined)) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;

  const monthlyUsers = usersData.filter((u) => {
    const diff = (now - new Date(u.joined)) / (1000 * 60 * 60 * 24);
    return diff <= 30;
  }).length;

  return (
    <div className="space-y-6 text-white">
      {/* 🔥 Header */}
      <div>
        <h1 className="text-2xl font-semibold">Users</h1>
        <p className="text-sm text-gray-400">Manage platform users</p>
      </div>

      {/* 📊 Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-black/50 border border-white/10 rounded-xl p-4">
          <p className="text-sm text-gray-400">Total Users</p>
          <h2 className="text-xl font-semibold mt-1">{totalUsers}</h2>
        </div>

        <div className="bg-black/50 border border-white/10 rounded-xl p-4">
          <p className="text-sm text-gray-400">Admins</p>
          <h2 className="text-xl font-semibold mt-1 text-indigo-400">
            {totalAdmins}
          </h2>
        </div>

        <div className="bg-black/50 border border-white/10 rounded-xl p-4">
          <p className="text-sm text-gray-400">New This Week</p>
          <h2 className="text-xl font-semibold mt-1 text-green-400">
            {weeklyUsers}
          </h2>
        </div>

        <div className="bg-black/50 border border-white/10 rounded-xl p-4">
          <p className="text-sm text-gray-400">New This Month</p>
          <h2 className="text-xl font-semibold mt-1 text-yellow-400">
            {monthlyUsers}
          </h2>
        </div>
      </div>

      {/* 🔥 Filter Tabs */}
      <div className="flex gap-2">
        {["All", "Admin", "User"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-2.5 py-1.5 rounded-lg text-sm transition ${
              filter === type
                ? "bg-indigo-500/20 text-indigo-400"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 📊 Table */}
      <div className="rounded-2xl bg-black/50 border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          {/* 🔝 Head */}
          <thead className="bg-white/5 text-gray-400">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Joined (DD-MM-YYYY)</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          {/* 🔽 Body */}
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="px-4 py-3 text-gray-400">{index + 1}</td>

                <td className="px-4 py-3 font-medium">{user.name}</td>

                <td className="px-4 py-3 text-gray-400">{user.email}</td>

                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-400">
                    {user.role}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-400">
                  {formatDate(user.joined)}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-md ${
                      user.status === "Active"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
