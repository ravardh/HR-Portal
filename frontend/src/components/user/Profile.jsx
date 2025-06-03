import React, { useEffect, useState } from "react";
import axios from "../../config/api.jsx";
import {
  FiMail,
  FiBriefcase,
  FiPhone,
  FiCalendar,
  FiBookOpen,
  FiClock,
  FiMapPin,
  FiUser,
} from "react-icons/fi";
import { BiDonateBlood } from "react-icons/bi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { BsTelephoneInbound } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { BsCake2 } from "react-icons/bs";
import { FaTransgenderAlt, FaUserTie } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { GrStatusGood } from "react-icons/gr";
import { MdOutlineWeekend } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("user/profile", {});
        if (response.data?.user) {
          setUser(response.data.user);
          localStorage.setItem("userData", JSON.stringify(response.data.user));
        } else {
          throw new Error("User data not found");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load profile. Please login again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md p-6 bg-red-50 rounded-lg shadow">
          <h3 className="text-lg font-medium text-red-800">
            Error Loading Profile
          </h3>
          <p className="mt-2 text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md p-6 bg-yellow-50 rounded-lg shadow">
          <h3 className="text-lg font-medium text-yellow-800">
            Profile Unavailable
          </h3>
          <p className="mt-2 text-yellow-600">User data not available</p>
        </div>
      </div>
    );
  }

  // Helper component for consistent info cards
  const InfoCard = ({ icon, title, value, className = "" }) => (
    <div
      className={`p-4 bg-white rounded-lg border border-gray-200 ${className}`}
    >
      <div className="flex items-center space-x-3 text-gray-600">
        <div className="text-blue-500">{icon}</div>
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <p className="mt-1 text-gray-800 font-medium">{value || "-"}</p>
    </div>
  );

  // Section wrapper component
  const Section = ({ title, icon, children }) => (
    <div className="mb-8">
      <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
        <div className="text-blue-500 mr-2">{icon}</div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {user.personalDetails?.firstName} {user.personalDetails?.lastName}
          </h1>
          <p className="text-red-600 font-bold mt-1">{user.designation}</p>
        </div>
        <div className="mt-4 md:mt-0 bg-blue-50 px-4 py-2 rounded-lg">
          <p className="text-blue-700 font-medium">
            Employee ID: {user.employeeId || "N/A"}
          </p>
        </div>
      </div>

      {/* Personal Information Section */}
      <Section title="Personal Information" icon={<FiUser size={20} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard
            icon={<MdDriveFileRenameOutline size={18} />}
            title="Name"
            value={user.personalDetails?.name}
          />
          <InfoCard
            icon={<MdDriveFileRenameOutline size={18} />}
            title="Father Name"
            value={user.personalDetails?.fatherName}
          />
          <InfoCard
            icon={<FaTransgenderAlt size={18} />}
            title="Gender"
            value={user.personalDetails?.gender?.toUpperCase()}
          />
         
          <InfoCard
            icon={<FiMapPin size={18} />}
            title="Permanent Address"
            value={user.personalDetails?.permanentAddress}
          />
           <InfoCard
            icon={<FiMapPin size={18} />}
            title="Correspondence Address"
            value={user.personalDetails?.correspondenceAddress}
          />
          <InfoCard
            icon={<BsTelephoneInbound size={18} />}
            title="Telephone"
            value={user.personalDetails?.telephone}
          />
          <InfoCard
            icon={<FiPhone size={18} />}
            title="Phone Number"
            value={user.personalDetails?.mobile}
          />
          <InfoCard
            icon={<FiMail size={18} />}
            title="Email"
            value={user.personalDetails?.emailID}
          />
          <InfoCard
            icon={<BsCake2 size={18} />}
            title="Date of Birth"
            value={user.personalDetails?.dob}
          />
          <InfoCard
            icon={<FaHeart size={18} />}
            title="Marital Status"
            value={user.personalDetails?.maritalStatus?.toUpperCase()}
          />
          <InfoCard
            icon={<FaRegAddressCard size={18} />}
            title="PAN Card No"
            value={user.personalDetails?.panCardNo?.toUpperCase()}
          />

          <InfoCard
            icon={<BiDonateBlood size={18} />}
            title="Blood Group"
            value={user.personalDetails?.bloodGroup?.toUpperCase()}
          />
        </div>
      </Section>

      {/* Emergency Contact */}
      <Section title="Emergency Contact" icon={<FiPhone size={20} />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard title="Name" value={user.emergencyContactDetails?.name} />
          <InfoCard
            title="Relation"
            value={user.emergencyContactDetails?.relation}
          />
          <InfoCard
            title="Contact Number"
            value={user.emergencyContactDetails?.contactNo}
          />
        </div>
      </Section>

      {/* Education Details */}
      {user.educationalDetails?.length > 0 && (
        <Section title="Education" icon={<FiBookOpen size={20} />}>
          <div className="space-y-4">
            {user.educationalDetails.map((edu, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg border border-gray-200"
              >
                
                <div className="mt-3 grid grid-cols-1 md:grid-cols-5 gap-4">

                  <div>
                    <p className="text-xs text-gray-500">Degree</p>
                    <p className="text-sm text-gray-800">{edu.degree}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">University</p>
                    <p className="text-sm text-gray-800">{edu.university}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm text-gray-800">
                      {edu.from} - {edu.to}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Grade/Percentage</p>
                    <p className="text-sm text-gray-800">
                      {edu.percentageOrGrade}
                    </p>
                  </div>
                  {edu.specialization && (
                    <div>
                      <p className="text-xs text-gray-500">Specialization</p>
                      <p className="text-sm text-gray-800">
                        {edu.specialization}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Employment History */}
      {user.employmentDetails?.length > 0 && (
        <Section title="Employment History" icon={<FaUserTie size={20} />}>
          <div className="space-y-4">
            {user.employmentDetails.map((job, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg border border-gray-200"
              >
                
                <div className="mt-3 grid grid-cols-1 md:grid-cols-4 ">
                  <div>
                     <p className="text-xs text-gray-500">Organization</p>
                    <p className="text-sm text-gray-800">{job.organization}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Designation</p>
                    <p className="text-sm text-gray-800">{job.designation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm text-gray-800">
                      {job.periodOfService?.from} - {job.periodOfService?.to}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Annual CTC</p>
                    <p className="text-sm text-gray-800">₹ {job.annualCTC}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}


      
      {/* Family Details */}
      {user.familyDetails?.length > 0 && (
        <Section title="Family Members" icon={<FiUser size={20} />}>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
            {user.familyDetails.map((member, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg border border-gray-200"
              >
                <div className="mt-3 space-y-2 flex space-x-60">
                   <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="text-sm text-gray-800">{member.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Relation</p>
                    <p className="text-sm text-gray-800">{member.relation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Occupation</p>
                    <p className="text-sm text-gray-800">
                      {member.occupation || "-"}
                    </p>
                  </div>
                  {member.dob && (
                    <div>
                      <p className="text-xs text-gray-500">Date of Birth</p>
                      <p className="text-sm text-gray-800">{member.dob}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
      {/* Professional References */}
      {user.professionalReferences?.length > 0 && (
        <Section
          title="Professional References"
          icon={<FiBriefcase size={20} />}
        >
          <div className=" gap-4">
            {user.professionalReferences.map((ref, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg border border-gray-200"
              >
                <div className="mt-3 space-y-2 space-x-60 flex ">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>

                    <h3 className="font-medium text-gray-800">{ref.name}</h3>
                  </div>
                  {ref.organization && (
                    <div>
                      <p className="text-xs text-gray-500">Organization</p>
                      <p className="text-sm text-gray-800">
                        {ref.organization}
                      </p>
                    </div>
                  )}
                  {ref.designation && (
                    <div>
                      <p className="text-xs text-gray-500">Designation</p>
                      <p className="text-sm text-gray-800">{ref.designation}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-500">Contact</p>
                    <p className="text-sm text-gray-800">{ref.contactNo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
      {/* Employment Details Section */}
      <Section title="Employment Details" icon={<FiBriefcase size={20} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard
            icon={<FaUserTie size={18} />}
            title="Department"
            value={user.department?.toUpperCase()}
          />
          <InfoCard
            icon={<FiCalendar size={18} />}
            title="Hiring Date"
            value={user.hiringDate}
          />
          <InfoCard
            icon={<GrStatusGood size={18} />}
            title="Status"
            value={user.status}
          />
          <InfoCard
            icon={<GiTakeMyMoney size={18} />}
            title="Salary"
            value={`₹ ${user.salary}`}
          />
          <InfoCard
            icon={<FiClock size={18} />}
            title="Shift Time"
            value={`${user.shiftStartTime} - ${user.shiftEndTime}`}
          />
          <InfoCard
            icon={<MdOutlineWeekend size={18} />}
            title="Week Off"
            value={user.weekOff}
          />
        </div>
      </Section>
    </div>
  );
};

export default Profile;
