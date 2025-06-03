import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  // Add country codes array
  const countryCodes = [
    { value: "+91", label: "IN (+91)" },     // India
    { value: "+977", label: "NP (+977)" },   // Nepal
    { value: "+1", label: "US (+1)" },       // United States
    { value: "+1", label: "CA (+1)" },       // Canada
    { value: "+44", label: "UK (+44)" },     // United Kingdom
    { value: "+61", label: "AU (+61)" },     // Australia
    { value: "+86", label: "CN (+86)" },     // China
    { value: "+81", label: "JP (+81)" },     // Japan
    { value: "+49", label: "DE (+49)" },     // Germany
    { value: "+33", label: "FR (+33)" },     // France
    { value: "+39", label: "IT (+39)" },     // Italy
    { value: "+34", label: "ES (+34)" },     // Spain
    { value: "+7", label: "RU (+7)" },       // Russia
    { value: "+82", label: "KR (+82)" },     // South Korea
    { value: "+65", label: "SG (+65)" },     // Singapore
    { value: "+60", label: "MY (+60)" },     // Malaysia
    { value: "+62", label: "ID (+62)" },     // Indonesia
    { value: "+63", label: "PH (+63)" },     // Philippines
    { value: "+66", label: "TH (+66)" },     // Thailand
    { value: "+92", label: "PK (+92)" },     // Pakistan
    { value: "+880", label: "BD (+880)" },   // Bangladesh
    { value: "+94", label: "LK (+94)" },     // Sri Lanka
    { value: "+90", label: "TR (+90)" },     // Turkey
    { value: "+20", label: "EG (+20)" },     // Egypt
    { value: "+971", label: "AE (+971)" },   // UAE
    { value: "+966", label: "SA (+966)" },   // Saudi Arabia
    { value: "+254", label: "KE (+254)" },   // Kenya
    { value: "+27", label: "ZA (+27)" },     // South Africa
    { value: "+598", label: "UY (+598)" },   // Uruguay
  ];
  

  const [formData, setFormData] = useState({
    personalDetails: {
      name: "",
      fatherName: "",
      gender: "",
      correspondenceAddress: "",
      permanentAddress: "",
      altNumber: "",
      altNumberCountryCode: "+91", // Add country code
      mobile: "",
      mobileCountryCode: "+91", // Add country code
      emailID: "",
      dob: "",
      maritalStatus: "",
      panCardNo: "",
      bloodGroup: "",
      addharCardNo: "",
      image: "",
    },
    emergencyContactDetails: {
      name: "",
      relation: "",
      contactNo: "",
      contactNoCountryCode: "+91", // Add country code
    },
    educationalDetails: [
      {
        degree: "",
        university: "",
        from: "",
        to: "",
        percentageOrGrade: "",
        specialization: "",
      },
    ],
    employmentDetails: [
      {
        organization: "",
        designation: "",
        periodOfService: { from: "", to: "" },
        annualCTC: "",
        reasonForLeaving: "",
      },
    ],
    familyDetails: [
      {
        name: "",
        relation: "",
        occupation: "",
        phoneNo: "",
        phoneNoCountryCode: "+91", // Add country code
      },
    ],
    professionalReferences: [
      {
        name: "",
        organization: "",
        designation: "",
        contactNo: "",
        contactNoCountryCode: "+91", // Add country code
      },
    ],
    jobDetail: {
      department: "",
      designation: "",
      hiringDate: "",
      salary: "",
      password: "",
      role: "Employee",
      status: "Active",
      shiftStartTime: "09:00",
      shiftEndTime: "18:00",
      weekOff: "Sunday",
      bankDetails: {
        bankName: "",
        accountNo: "",
        ifscCode: "",
        branchAddress: "",
      },
    },
    sameAsPermanent: false,
  });

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      const { personalDetails } = formData;
      if (!personalDetails.name.trim())
        newErrors.name = "Full Name is required";
      if (!personalDetails.fatherName.trim())
        newErrors.fatherName = "Father's Name is required";
      if (!personalDetails.gender) newErrors.gender = "Gender is required";
      if (!personalDetails.dob) newErrors.dob = "Date of Birth is required";
      if (!personalDetails.maritalStatus)
        newErrors.maritalStatus = "Marital Status is required";
      if (!personalDetails.bloodGroup)
        newErrors.bloodGroup = "Blood Group is required";

      if (!personalDetails.panCardNo) {
        newErrors.panCardNo = "PAN Card No is required";
      } else if (
        !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(personalDetails.panCardNo)
      ) {
        newErrors.panCardNo = "Invalid PAN Card format";
      }

      if (!personalDetails.mobile) {
        newErrors.mobile = "Mobile Number is required";
      } else if (!/^[0-9]{10}$/.test(personalDetails.mobile)) {
        newErrors.mobile = "Invalid Mobile Number (10 digits required)";
      }

      if (!personalDetails.emailID) {
        newErrors.emailID = "Email ID is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalDetails.emailID)) {
        newErrors.emailID = "Invalid Email format";
      }

      if (!personalDetails.permanentAddress.trim())
        newErrors.permanentAddress = "Permanent Address is required";
      if (!personalDetails.correspondenceAddress.trim())
        newErrors.correspondenceAddress = "Correspondence Address is required";

      if (!personalDetails.addharCardNo) {
        newErrors.addharCardNo = "Aadhaar Card No is required";
      } else if (!/^\d{12}$/.test(personalDetails.addharCardNo)) {
        newErrors.addharCardNo = "Invalid Aadhaar Number (12 digits required)";
      }
    }  else if (step === 2) {
      formData.educationalDetails.forEach((edu, index) => {
        if (!edu.degree?.trim())
          newErrors[`eduDegree_${index}`] = "Degree is required";
        if (!edu.university?.trim())
          newErrors[`eduUniversity_${index}`] = "University is required";
        if (!edu.from?.trim())
          newErrors[`eduFrom_${index}`] = "From date is required";
        if (!edu.to?.trim())
          newErrors[`eduTo_${index}`] = "To date is required";
        if (!edu.percentageOrGrade?.trim())
          newErrors[`eduGrade_${index}`] = "Percentage/Grade is required";
      });

      // formData.employmentDetails.forEach((emp, index) => {
      //   if (!emp.organization?.trim())
      //     newErrors[`empOrg_${index}`] = "Organization is required";
      //   if (!emp.designation?.trim())
      //     newErrors[`empDesignation_${index}`] = "Designation is required";
      //   if (!emp.periodOfService?.from?.trim())
      //     newErrors[`empFrom_${index}`] = "From date is required";
      //   if (!emp.periodOfService?.to?.trim())
      //     newErrors[`empTo_${index}`] = "To date is required";
      //   if (!emp.annualCTC?.trim())
      //     newErrors[`empCTC_${index}`] = "Annual CTC is required";
      //   if (!emp.reasonForLeaving?.trim())
      //     newErrors[`empReason_${index}`] = "Reason for Leaving is required";
      // });
    } else if (step === 3) {
       const { emergencyContactDetails, familyDetails } = formData;
      // formData.professionalReferences.forEach((ref, index) => {
      //   if (!ref.name?.trim())
      //     newErrors[`refName_${index}`] = "Reference Name is required";
      //   if (!ref.contactNo?.trim()) {
      //     newErrors[`refContact_${index}`] = "Contact Number is required";
      //   } else if (!/^[0-9]{10}$/.test(ref.contactNo)) {
      //     newErrors[`refContact_${index}`] =
      //       "Invalid Contact Number (10 digits required)";
      //   }
      // });
           

      if (!emergencyContactDetails.name.trim())
        newErrors.emergencyName = "Emergency Contact Name is required";
      if (!emergencyContactDetails.relation.trim())
        newErrors.emergencyRelation = "Relation is required";

      if (!emergencyContactDetails.contactNo) {
        newErrors.emergencyContact = "Contact Number is required";
      } else if (!/^[0-9]{10}$/.test(emergencyContactDetails.contactNo)) {
        newErrors.emergencyContact =
          "Invalid Contact Number (10 digits required)";
      }

      familyDetails.forEach((member, index) => {
        if (!member.name?.trim())
          newErrors[`familyName_${index}`] = "Family Member Name is required";
        if (!member.relation?.trim())
          newErrors[`familyRelation_${index}`] = "Relation is required";
      });
    } else if (step === 4) {
      const { jobDetail } = formData;
      if (!jobDetail.department.trim())
        newErrors.department = "Department is required";
      if (!jobDetail.designation.trim())
        newErrors.designation = "Designation is required";
      if (!jobDetail.hiringDate)
        newErrors.hiringDate = "Hiring Date is required";

      if (!jobDetail.salary) {
        newErrors.salary = "Salary is required";
      } else if (!/^\d+$/.test(jobDetail.salary)) {
        newErrors.salary = "Salary must be a number";
      }

      if (!jobDetail.password) {
        newErrors.password = "Password is required";
      } else if (jobDetail.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (!jobDetail.confirmPassword) {
        newErrors.confirmPassword = "Confirm Password is required";   
      } else if (jobDetail.confirmPassword !== jobDetail.password) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (!jobDetail.bankDetails.bankName)
        newErrors.bankName = "Bank Name is required";

      if (!jobDetail.bankDetails.accountNo) {
        newErrors.accountNo = "Account No is required";
      } else if (!/^\d+$/.test(jobDetail.bankDetails.accountNo)) {
        newErrors.accountNo = "Account No must contain only numbers";
      }

      if (!jobDetail.bankDetails.ifscCode) {
        newErrors.ifscCode = "IFSC Code is required";
      } else if (
        !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(jobDetail.bankDetails.ifscCode)
      ) {
        newErrors.ifscCode = "Invalid IFSC Code format";
      }

      if (!jobDetail.bankDetails.branchAddress.trim())
        newErrors.branchAddress = "Branch Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      sameAsPermanent: checked,
      personalDetails: {
        ...prev.personalDetails,
        correspondenceAddress: checked
          ? prev.personalDetails.permanentAddress
          : prev.personalDetails.correspondenceAddress,
      },
    }));
  };

  const handlePersonalDetailsChange = (e) => {
    const { name, value } = e.target;
    if (name.endsWith('CountryCode')) {
      setFormData((prev) => ({
        ...prev,
        personalDetails: {
          ...prev.personalDetails,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        personalDetails: {
          ...prev.personalDetails,
          [name]: value,
        },
        sameAsPermanent:
          name === "permanentAddress" ? false : prev.sameAsPermanent,
      }));

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target;
    if (name.endsWith('CountryCode')) {
      setFormData((prev) => ({
        ...prev,
        emergencyContactDetails: {
          ...prev.emergencyContactDetails,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        emergencyContactDetails: {
          ...prev.emergencyContactDetails,
          [name]: value,
        },
      }));

      const errorKey = `emergency${name.charAt(0).toUpperCase() + name.slice(1)}`;
      if (errors[errorKey]) {
        setErrors((prev) => ({ ...prev, [errorKey]: undefined }));
      }
    }
  };

  const handleJobDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      jobDetail: {
        ...prev.jobDetail,
        [name]: value,
      },
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      jobDetail: {
        ...prev.jobDetail,
        bankDetails: {
          ...prev.jobDetail.bankDetails,
          [name]: value,
        },
      },
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleArrayFieldChange = (field, index, e) => {
    const { name, value } = e.target;
    const updatedArray = [...formData[field]];

    if (name.endsWith('CountryCode')) {
      updatedArray[index] = {
        ...updatedArray[index],
        [name]: value,
      };
    } else if (name.includes(".")) {
      const [parent, child] = name.split(".");
      updatedArray[index] = {
        ...updatedArray[index],
        [parent]: {
          ...updatedArray[index][parent],
          [child]: value,
        },
      };
    } else {
      updatedArray[index] = {
        ...updatedArray[index],
        [name]: value,
      };
    }

    setFormData((prev) => ({
      ...prev,
      [field]: updatedArray,
    }));

    const fieldPrefix = field.substring(0, 3);
    const errorKey = `${fieldPrefix}${
      name.charAt(0).toUpperCase() + name.slice(1)
    }_${index}`;
    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: undefined }));
    }
  };

  const addArrayField = (field, template) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], template],
    }));
  };

  const removeArrayField = (field, index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [field]: updatedArray,
    }));

    const fieldPrefix = field.substring(0, 3);
    setErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith(fieldPrefix) && key.endsWith(`_${index}`)) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        setErrors((prev) => ({
          ...prev,
          image: "Please select an image file",
        }));
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size should be less than 2MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          personalDetails: {
            ...prev.personalDetails,
            image: reader.result,
          },
        }));

        if (errors.image) {
          setErrors((prev) => ({ ...prev, image: undefined }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateStep(5)) {
      setLoading(false);
      return;
    }

    try {
      const submitData = {
        ...formData,
        personalDetails: {
          ...formData.personalDetails,
          maritalStatus: formData.personalDetails.maritalStatus.toLowerCase(),
        },
        jobDetail: {
          ...formData.jobDetail,
          role: formData.jobDetail.role,
          status: formData.jobDetail.status,
        },
      };

      delete submitData.sameAsPermanent;

      const response = await axios.post(
        "http://localhost:5000/auth/register",
        submitData
      );

      if (response.status === 201) {
        alert("Registration successful! Form will reset now.");
        window.location.reload(); 
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  // Helper function to render input field with error handling
  const renderInputField = (
    label,
    name,
    value,
    onChange,
    type = "text",
    required = false,
    placeholder = ""
  ) => (
    <div>
      <label className="block text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  // Helper function to render select field
  const renderSelectField = (
    label,
    name,
    value,
    onChange,
    options,
    required = false
  ) => (
    <div>
      <label className="block text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  // Add new helper function for phone input with country code
  const renderPhoneInputField = (
    label,
    name,
    value,
    countryCodeName,
    countryCodeValue,
    onChange,
    onCountryCodeChange,
    required = false,
    placeholder = ""
  ) => (
    <div>
      <label className="block text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex gap-2">
        <select
          name={countryCodeName}
          value={countryCodeValue}
          onChange={onCountryCodeChange}
          className="w-26 px-3 py-2 border rounded-md border-gray-300"
        >
          {countryCodes.map((code) => (
            <option key={code.value} value={code.value}>
              {code.label}
            </option>
          ))}
        </select>
        <input
          type="tel"
          name={name}
          value={value}
          onChange={onChange}
          className={`flex-1 px-3 py-2 border rounded-md ${
            errors[name] ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={placeholder}
        />
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  // Add new helper function specifically for month-year inputs
  const renderMonthYearField = (
    label,
    name,
    value,
    onChange,
    required = false
  ) => (
    <div>
      <label className="block text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="month"
        name={name}
        value={value || ""}
        onChange={(e) => {
          onChange({
            target: {
              name: name,
              value: e.target.value
            }
          });
        }}
        className={`w-full px-3 py-2 border rounded-md ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 py-4 px-6">
          <h1 className="text-2xl font-bold text-white">
            Employee Registration
          </h1>
          <div className="flex mt-2">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`flex-1 h-2 mx-1 rounded-full ${
                  step >= stepNumber ? "bg-white" : "bg-blue-400"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mx-6 mt-4">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderInputField(
                  "Full Name",
                  "name",
                  formData.personalDetails.name,
                  handlePersonalDetailsChange,
                  "text",
                  true
                )}
                {renderInputField(
                  "Father's Name",
                  "fatherName",
                  formData.personalDetails.fatherName,
                  handlePersonalDetailsChange,
                  "text",
                  true
                )}

                {renderSelectField(
                  "Gender",
                  "gender",
                  formData.personalDetails.gender,
                  handlePersonalDetailsChange,
                  [
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" },
                  ],
                  true
                )}

                {renderInputField(
                  "Date of Birth",
                  "dob",
                  formData.personalDetails.dob,
                  handlePersonalDetailsChange,
                  "date",
                  true
                )}

                {renderSelectField(
                  "Marital Status",
                  "maritalStatus",
                  formData.personalDetails.maritalStatus,
                  handlePersonalDetailsChange,
                  [
                    { value: "Single", label: "Single" },
                    { value: "Married", label: "Married" },
                    { value: "Divorced", label: "Divorced" },
                    { value: "Widowed", label: "Widowed" },
                  ],
                  true
                )}

                {renderSelectField(
                  "Blood Group",
                  "bloodGroup",
                  formData.personalDetails.bloodGroup,
                  handlePersonalDetailsChange,
                  [
                    { value: "A+", label: "A+" },
                    { value: "A-", label: "A-" },
                    { value: "B+", label: "B+" },
                    { value: "B-", label: "B-" },
                    { value: "AB+", label: "AB+" },
                    { value: "AB-", label: "AB-" },
                    { value: "O+", label: "O+" },
                    { value: "O-", label: "O-" },
                  ],
                  true
                )}

                {renderInputField(
                  "PAN Card No",
                  "panCardNo",
                  formData.personalDetails.panCardNo,
                  handlePersonalDetailsChange,
                  "text",
                  true,
                  "ABCDE1234F"
                )}
                {renderInputField(
                  "Aadhaar Card No",
                  "addharCardNo",
                  formData.personalDetails.addharCardNo,
                  handlePersonalDetailsChange,
                  "text",
                  true,
                  "123412341234"
                )}
                {renderPhoneInputField(
                  "Mobile Number",
                  "mobile",
                  formData.personalDetails.mobile,
                  "mobileCountryCode",
                  formData.personalDetails.mobileCountryCode,
                  handlePersonalDetailsChange,
                  handlePersonalDetailsChange,
                  true,
                  "9876543210"
                )}
                {renderPhoneInputField(
                  "Alternate Number",
                  "altNumber",
                  formData.personalDetails.altNumber,
                  "altNumberCountryCode",
                  formData.personalDetails.altNumberCountryCode,
                  handlePersonalDetailsChange,
                  handlePersonalDetailsChange,
                  false,
                  "9876543210"
                )}
                {renderInputField(
                  "Email ID",
                  "emailID",
                  formData.personalDetails.emailID,
                  handlePersonalDetailsChange,
                  "email",
                  true,
                  "example@domain.com"
                )}

                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">
                    Permanent Address*
                  </label>
                  <textarea
                    name="permanentAddress"
                    value={formData.personalDetails.permanentAddress}
                    onChange={handlePersonalDetailsChange}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.permanentAddress
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    rows="3"
                  ></textarea>
                  {errors.permanentAddress && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.permanentAddress}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">
                    Correspondence Address*{" "}
                    <input
                      type="checkbox"
                      checked={formData.sameAsPermanent}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    Same as Permanent Address
                  </label>
                  <textarea
                    name="correspondenceAddress"
                    value={formData.personalDetails.correspondenceAddress}
                    onChange={handlePersonalDetailsChange}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.correspondenceAddress
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    rows="3"
                  ></textarea>
                  {errors.correspondenceAddress && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.correspondenceAddress}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.image ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.image && (
                    <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                  )}
                  {formData.personalDetails.image && (
                    <div className="mt-2">
                      <img
                        src={formData.personalDetails.image}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Education & Employment */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Educational Details
              </h2>
              {formData.educationalDetails.map((education, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Education #{index + 1}</h3>
                    {formData.educationalDetails.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayField("educationalDetails", index)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderInputField(
                      "Degree",
                      "degree",
                      education.degree,
                      (e) =>
                        handleArrayFieldChange("educationalDetails", index, e),
                      "text",
                      true
                    )}
                    {renderInputField(
                      "University",
                      "university",
                      education.university,
                      (e) =>
                        handleArrayFieldChange("educationalDetails", index, e),
                      "text",
                      true
                    )}
                    {renderMonthYearField(
                      "From",
                      "from",
                      education.from,
                      (e) => handleArrayFieldChange("educationalDetails", index, e),
                      true
                    )}
                    {renderMonthYearField(
                      "To",
                      "to",
                      education.to,
                      (e) => handleArrayFieldChange("educationalDetails", index, e),
                      true
                    )}

                    {renderInputField(
                      "Percentage/Grade",
                      "percentageOrGrade",
                      education.percentageOrGrade,
                      (e) =>
                        handleArrayFieldChange("educationalDetails", index, e),
                      "text",
                      true
                    )}
                    {renderInputField(
                      "Specialization",
                      "specialization",
                      education.specialization,
                      (e) =>
                        handleArrayFieldChange("educationalDetails", index, e)
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addArrayField("educationalDetails", {
                    degree: "",
                    university: "",
                    from: "",
                    to: "",
                    percentageOrGrade: "",
                    specialization: "",
                  })
                }
                className="mt-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200"
              >
                + Add Education
              </button>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                Employment History
              </h2>
              {formData.employmentDetails.map((employment, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Employment #{index + 1}</h3>
                    {formData.employmentDetails.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayField("employmentDetails", index)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderInputField(
                      "Organization",
                      "organization",
                      employment.organization,
                      (e) =>
                        handleArrayFieldChange("employmentDetails", index, e),
                      "text",
                      true
                    )}
                    {renderInputField(
                      "Designation",
                      "designation",
                      employment.designation,
                      (e) =>
                        handleArrayFieldChange("employmentDetails", index, e),
                      "text",
                      true
                    )}
                    {renderMonthYearField(
                      "From Date",
                      "periodOfService.from",
                      employment.periodOfService?.from || "",
                      (e) => handleArrayFieldChange("employmentDetails", index, e),
                      true
                    )}
                    {renderMonthYearField(
                      "To Date",
                      "periodOfService.to",
                      employment.periodOfService?.to || "",
                      (e) => handleArrayFieldChange("employmentDetails", index, e),
                      true
                    )}
                    {renderInputField(
                      "Reason for Leaving",
                      "reasonForLeaving",
                      employment.reasonForLeaving,
                      (e) =>
                        handleArrayFieldChange("employmentDetails", index, e),
                      "text",
                      true,
                      "e.g. Personal Reasons"
                    )}
                    {renderInputField(
                      "Annual CTC",
                      "annualCTC",
                      employment.annualCTC,
                      (e) =>
                        handleArrayFieldChange("employmentDetails", index, e),
                      "text",
                      true,
                      "e.g. 500000"
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addArrayField("employmentDetails", {
                    organization: "",
                    designation: "",
                    periodOfService: { from: "", to: "" },
                    annualCTC: "",
                  })
                }
                className="mt-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200"
              >
                + Add Employment
              </button>
            </div>
          )}

          {/* Step 3: Professional References */}
          {step === 3 && (
            <div>
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Professional References
              </h2>
              {formData.professionalReferences.map((reference, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Reference #{index + 1}</h3>
                    {formData.professionalReferences.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayField("professionalReferences", index)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderInputField(
                      "Name",
                      "name",
                      reference.name,
                      (e) =>
                        handleArrayFieldChange(
                          "professionalReferences",
                          index,
                          e
                        ),
                      "text",
                      true
                    )}
                    {renderPhoneInputField(
                      "Contact Number",
                      "contactNo",
                      reference.contactNo,
                      "contactNoCountryCode",
                      reference.contactNoCountryCode,
                      (e) => handleArrayFieldChange("professionalReferences", index, e),
                      (e) => handleArrayFieldChange("professionalReferences", index, e),
                      true,
                      "9876543210"
                    )}
                    {renderInputField(
                      "Organization",
                      "organization",
                      reference.organization,
                      (e) =>
                        handleArrayFieldChange(
                          "professionalReferences",
                          index,
                          e
                        )
                    )}
                    {renderInputField(
                      "Designation",
                      "designation",
                      reference.designation,
                      (e) =>
                        handleArrayFieldChange(
                          "professionalReferences",
                          index,
                          e
                        )
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addArrayField("professionalReferences", {
                    name: "",
                    contactNo: "",
                    organization: "",
                    designation: "",
                  })
                }
                className="mt-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200"
              >
                + Add Reference
              </button>
            </div>

            //addd

             <div>
                <h2 className="text-xl font-semibold mb-4">
                  Emergency Contact Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderInputField(
                    "Name",
                    "name",
                    formData.emergencyContactDetails.name,
                    handleEmergencyContactChange,
                    "text",
                    true
                  )}
                  {renderInputField(
                    "Relation",
                    "relation",
                    formData.emergencyContactDetails.relation,
                    handleEmergencyContactChange,
                    "text",
                    true
                  )}
                  {renderPhoneInputField(
                    "Contact Number",
                    "contactNo",
                    formData.emergencyContactDetails.contactNo,
                    "contactNoCountryCode",
                    formData.emergencyContactDetails.contactNoCountryCode,
                    handleEmergencyContactChange,
                    handleEmergencyContactChange,
                    true,
                    "9876543210"
                  )}
                </div>

                <h2 className="text-xl font-semibold mt-8 mb-4">
                  Family Details
                </h2>
                {formData.familyDetails.map((member, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-md mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Family Member #{index + 1}</h3>
                      {formData.familyDetails.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField("familyDetails", index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {renderInputField(
                        "Name",
                        "name",
                        member.name,
                        (e) => handleArrayFieldChange("familyDetails", index, e),
                        "text",
                        true
                      )}
                      {renderInputField(
                        "Relation",
                        "relation",
                        member.relation,
                        (e) => handleArrayFieldChange("familyDetails", index, e),
                        "text",
                        true
                      )}
                      {renderInputField(
                        "Occupation",
                        "occupation",
                        member.occupation,
                        (e) => handleArrayFieldChange("familyDetails", index, e)
                      )}
                      {renderPhoneInputField(
                        "Phone Number",
                        "phoneNo",
                        member.phoneNo,
                        "phoneNoCountryCode",
                        member.phoneNoCountryCode,
                        (e) => handleArrayFieldChange("familyDetails", index, e),
                        (e) => handleArrayFieldChange("familyDetails", index, e),
                        false,
                        "9876543210"
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addArrayField("familyDetails", {
                      name: "",
                      relation: "",
                      occupation: "",
                      phoneNo: "",
                    })
                  }
                  className="mt-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200"
                >
                  + Add Family Member
                </button>
              </div>
              </div>
          )}

          {/* Step 4: Job Details */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Job Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderInputField(
                  "Department",
                  "department",
                  formData.jobDetail.department,
                  handleJobDetailsChange,
                  "text",
                  true
                )}
                {renderInputField(
                  "Designation",
                  "designation",
                  formData.jobDetail.designation,
                  handleJobDetailsChange,
                  "text",
                  true
                )}
                {renderInputField(
                  "Hiring Date",
                  "hiringDate",
                  formData.jobDetail.hiringDate,
                  handleJobDetailsChange,
                  "date",
                  true
                )}
                {renderInputField(
                  "Salary",
                  "salary",
                  formData.jobDetail.salary,
                  handleJobDetailsChange,
                  "text",
                  true,
                  "e.g. 500000"
                )}
                {renderInputField(
                  "Password",
                  "password",
                  formData.jobDetail.password,
                  handleJobDetailsChange,
                  "password",
                  true
                )}
                {renderInputField(
                  "Confirm Password",
                  "confirmPassword",
                  formData.jobDetail.confirmPassword,
                  handleJobDetailsChange,
                  "password",
                  true
                )}

                {renderSelectField(
                  "Role",
                  "role",
                  formData.jobDetail.role,
                  handleJobDetailsChange,
                  [
                    { value: "Employee", label: "Employee" },
                    { value: "HOD", label: "HOD" },
                    { value: "Director", label: "Director" },
                  ]
                )}

                {renderSelectField(
                  "Status",
                  "status",
                  formData.jobDetail.status,
                  handleJobDetailsChange,
                  [
                    { value: "Active", label: "Active" },
                    { value: "Suspended", label: "Suspended" },
                    { value: "Terminated", label: "Terminated" },
                    { value: "Retired", label: "Retired" },
                    { value: "Resigned", label: "Resigned" },
                  ]
                )}

                {renderInputField(
                  "Shift End Time",
                  "shiftEndTime",
                  formData.jobDetail.shiftEndTime,
                  handleJobDetailsChange,
                  "time"
                )}

                {renderSelectField(
                  "Week Off",
                  "weekOff",
                  formData.jobDetail.weekOff,
                  handleJobDetailsChange,
                  [
                    { value: "Sunday", label: "Sunday" },
                    { value: "Monday", label: "Monday" },
                    { value: "Tuesday", label: "Tuesday" },
                    { value: "Wednesday", label: "Wednesday" },
                    { value: "Thursday", label: "Thursday" },
                    { value: "Friday", label: "Friday" },
                    { value: "Saturday", label: "Saturday" },
                  ]
                )}
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4">Bank Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderInputField(
                  "Bank Name",
                  "bankName",
                  formData.jobDetail.bankDetails.bankName,
                  handleBankDetailsChange,
                  "text",
                  true
                )}
                {renderInputField(
                  "Account Number",
                  "accountNo",
                  formData.jobDetail.bankDetails.accountNo,
                  handleBankDetailsChange,
                  "text",
                  true
                )}
                {renderInputField(
                  "IFSC Code",
                  "ifscCode",
                  formData.jobDetail.bankDetails.ifscCode,
                  handleBankDetailsChange,
                  "text",
                  true,
                  "ABCD0123456"
                )}
                {renderInputField(
                  "Branch Address",
                  "branchAddress",
                  formData.jobDetail.bankDetails.branchAddress,
                  handleBankDetailsChange,
                  "text",
                  true
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Previous
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
