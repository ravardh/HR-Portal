// import React, { useState } from "react";
// import {
//   Bell,
//   User,
//   Home,
//   Settings,
//   BarChart2,
//   ClipboardList,
//   CalendarCheck2,
//   MessageCircle,
//   FileText,
//   Camera,
// } from "lucide-react";

// const Dashboard = () => {
//   const [active, setActive] = useState("Dashboard");
//   const [profileImage, setProfileImage] = useState(null);
//   const employeeName = "Rajveer Choudhary";

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gradient-to-tr from bg-amber-300 via-pink-500 to-red-300">
//       {/* Sidebar */}
//       <aside className="w-72 bg-white/80 backdrop-blur-md border-r border-white/40 shadow-xl">
//         <div className="p-6 border-b border-gray-200 flex items-center gap-4">
//           {/* Profile Image or First Letter */}
//           <div className="relative w-12 h-12 rounded-full bg-indigo-300 flex items-center justify-center text-white font-bold text-xl overflow-hidden">
//             {profileImage ? (
//               <img src={profileImage} alt="Profile" className="object-cover w-full h-full" />
//             ) : (
//               employeeName[0]
//             )}
//             <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer">
//               <Camera size={14} className="text-indigo-500" />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="hidden"
//               />
//             </label>
//           </div>
//           <div>
//             <h2 className="text-lg font-bold text-indigo-700">{employeeName}</h2>
//             <p className="text-indigo-500 text-sm">
//               Blood: <span className="text-red-600">B+</span>
//             </p>
//           </div>
//         </div>

//         {/* Nav Items */}
//         <nav className="mt-6 px-2">
//           <ul className="space-y-2">
//             {[
//               ["Dashboard", <Home size={20} />],
//               ["My Attendance", <ClipboardList size={20} />],
//               ["Leave Requests", <CalendarCheck2 size={20} />],
//               ["Complaints", <MessageCircle size={20} />],
//               ["Suggestions", <FileText size={20} />],
//               ["Analytics", <BarChart2 size={20} />],
//               ["Settings", <Settings size={20} />],
//             ].map(([label, icon]) => (
//               <li key={label}>
//                 <button
//                   onClick={() => setActive(label)}
//                   className={`w-full flex items-center gap-3 p-3 rounded-lg transition duration-200 ${
//                     active === label
//                       ? "bg-indigo-200 text-indigo-800 font-semibold"
//                       : "hover:bg-indigo-100 text-gray-800"
//                   }`}
//                 >
//                   {icon}
//                   {label}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8 overflow-y-auto">
//         <header className="flex justify-between items-center mb-10">
//           <h1 className="text-4xl font-bold text-indigo-800">
//             {active === "Dashboard"
//               ? "Welcome to Your Employee Dashboard"
//               : `Employee Dashboard — ${active}`}
//           </h1>
//           <div className="flex items-center gap-4">
//             <Bell className="text-indigo-600" />
//             <User className="text-indigo-600" />
//           </div>
//         </header>

//         {/* Dashboard Content */}
//         {active === "Dashboard" ? (
//           <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             <Card title="Your Attendance Days" value="113" />
//             <Card title="Leaves Taken" value="6" />
//             <Card title="Open Complaints" value="1" />
//             <Card title="Suggestions Submitted" value="4" />
//             <Card title="Performance Rating" value="4.5 / 5" />
//             <Card title="Current Project" value="Project Phoenix" />
//           </section>
//         ) : (
//           <div className="bg-white/80 rounded-2xl p-10 shadow-md backdrop-blur-md text-indigo-800 text-xl">
//             This is the <strong>{active}</strong> section.
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// // Reusable Card Component
// const Card = ({ title, value }) => (
//   <div className="bg-white/80 rounded-2xl p-6 shadow-md backdrop-blur-md hover:scale-105 hover:shadow-xl transition-all duration-300">
//     <h2 className="text-gray-500">{title}</h2>
//     <p className="text-3xl font-bold text-indigo-700">{value}</p>
//   </div>
// );

// export default Dashboard;
