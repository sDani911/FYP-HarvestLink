import React, { useState } from "react";
import { Progress } from "../Comp/Progress";
import axios from "../../axiosConfig";

const nextForm = () => {};
const prevForm = () => {};
export default function AdminCreate() {

    const [personalInfo, setPersonalInfo] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        cnic: "",
        cnicExpiry: "",
        qualification: "",
        profilePicture: "",
    });

    const [contactInfo, setContactInfo] = useState({
        email: "",
        password: "",
        phoneNumber: "",
    });

    const [roleInfo, setRoleInfo] = useState({
        selectedRole: "",
    });

    const [addressInfo, setAddressInfo] = useState({
        street: "",
        city: "",
        state: "",
        country: "",
    });


  const [currentStep, setCurrentStep] = useState(1);

  const nextForm = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevForm = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
    const updatePersonalInfo = (data) => {
        setPersonalInfo((prevData) => ({ ...prevData, ...data }));
    };

    const updateContactInfo = (data) => {
        setContactInfo((prevData) => ({ ...prevData, ...data }));
    };

    const updateRoleInfo = (data) => {
        setRoleInfo((prevData) => ({ ...prevData, ...data }));
    };

    const updateAddressInfo = (data) => {
        setAddressInfo((prevData) => ({ ...prevData, ...data }));
    };
  return (
    <div className="m-16 min-h-full">
        {currentStep === 1 && <PersonalInformation nextForm={nextForm} updatePersonalInfo={updatePersonalInfo} />}
        {currentStep === 2 && (
            <ContactInformation nextForm={nextForm} prevForm={prevForm} updateContactInfo={updateContactInfo} />
        )}
        {currentStep === 3 && <Role nextForm={nextForm} prevForm={prevForm} updateRoleInfo={updateRoleInfo} />}
        {currentStep === 4 && (
            <SetupAddress prevForm={prevForm}
                          updateWalletInfo={updateAddressInfo}
                          personalInfo={personalInfo}
                          contactInfo={contactInfo}
                          roleInfo={roleInfo}
            />
        )}
    </div>
  );
}

function PersonalInformation({ nextForm,updatePersonalInfo  }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [qualification, setQualification] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [cnic, setCnic] = useState("");
  const [cnicExpiry, setCnicExpiry] = useState("");

    const submitPersonalInfo = () => {
        // Call the prop function to update personalInfo in the parent component
        updatePersonalInfo({
            firstName,
            lastName,
            gender,
            qualification,
            profilePicture,
            dateOfBirth,
            cnic,
            cnicExpiry,
        });
        // Continue with other logic or navigation
        nextForm();
    };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleQualificationChange = (e) => {
    setQualification(e.target.value);
  };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];

        // Display a preview of the selected image
        const reader = new FileReader();

        reader.onloadend = () => {
            setProfilePicture(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setProfilePicture(""); // Clear the preview if no file selected
        }
    };


    const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleCnicChange = (e) => {
    setCnic(e.target.value);
  };

  const handleLegalPaperChange = (e) => {
      setCnicExpiry(e.target.value);
  };

  return (
    <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
      <div className="flex items-end justify-between h-[60px]">
        <h2 className="text-3xl font-bold  px-6 py-3  rounded-md">
          Personal Information
        </h2>
        <button
          className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
          onClick={submitPersonalInfo}
        >
          Next
        </button>
      </div>
      <hr className="my-4 h-1 bg-white" />
      <Progress level={1} />
      <form method="post" className="grid grid-cols-1 gap-4 mt-4">
        <div className="p-4 flex flex-col space-y-4">
          <h2 className="mx-4 mt-4 text-3xl font-bold text-black">
            Personal Information:
          </h2>
          <label className="text-white">First Name</label>
          <input
            className="w-full h-10 px-4 rounded-xl border-2 border-white"
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="First Name"
          />

          <label className="text-white">Last Name</label>
          <input
            className="w-full h-10 px-4 rounded-xl border-2 border-white"
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Last Name"
          />

            <label className="text-white">Gender</label>
            <select
                className="w-full h-10 px-4 rounded-xl border-2 border-white"
                name="gender"
                value={gender}
                onChange={handleGenderChange}
            >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="none">None</option>
            </select>


            <label className="text-white">Qualification</label>
          <input
            className="w-full h-10 px-4 rounded-xl border-2 border-white"
            type="text"
            name="qualification"
            value={qualification}
            onChange={handleQualificationChange}
            placeholder="Qualification"
          />

            <label className="text-white">Profile Picture</label>
            <input
                className="w-full h-10 px-4 rounded-xl border-2 border-white"
                type="file"
                name="profilepicture"
                onChange={handleProfilePictureChange}
            />
            {profilePicture && (
                <img
                    className="mt-2 rounded-lg"
                    src={profilePicture}
                    alt="Profile Preview"
                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
            )}

          <label className="text-white">Date of Birth</label>
          <input
            className="w-full h-10 px-4 rounded-xl border-2 border-white"
            type="date"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
            placeholder="Date of Birth"
          />

          <label className="text-white">CNIC</label>
          <input
            className="w-full h-10 px-4 rounded-xl border-2 border-white"
            type="text"
            name="cnic"
            value={cnic}
            onChange={handleCnicChange}
            placeholder="CNIC"
          />

          <label className="text-white">Cnic Expiry</label>
          <input
            className="w-full h-10 px-4 rounded-xl border-2 border-white"
            type="date"
            name="cnicExpiry"
            value={cnicExpiry}
            onChange={handleLegalPaperChange}
            placeholder="Cnic Expiry"
          />
        </div>
      </form>
    </div>
  );
}
// Separate function for Contact Information section
function ContactInformation({ nextForm, prevForm,updateContactInfo }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const submitContactInformation = () => {
        // Call the prop function to update personalInfo in the parent component
        updateContactInfo({
            email,
            password,
            phoneNumber,
        });
        // Continue with other logic or navigation
        nextForm();
    };

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    return (
      <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
        <div className="flex items-end justify-between h-[60px]">
          <button
            className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
            onClick={prevForm}
          >
            Back
          </button>
          <h2 className="text-3xl font-bold  px-6 py-3  rounded-md">
            Contact Information
          </h2>
          <button
            className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
            onClick={submitContactInformation}
          >
            Next
          </button>
        </div>
        <hr className="my-4 h-1 bg-white" />
        <Progress level={2} />
        <form action="" className="grid grid-cols-1 gap-4 mt-4">
          <div className="p-4 grid grid-cols-1 gap-4">
            <h2 className="mx-4 mt-4 text-3xl font-bold text-black">
              Contact Information
            </h2>
            <label className="text-white">Email</label>
            <input
              className="w-full h-10 px-4 rounded-xl border-2 border-white"
              type="text"
              name="Email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />

            <label className="text-white">Password</label>
            <input
              className="w-full h-10 px-4 rounded-xl border-2 border-white"
              type="text"
              name="Password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />

            <label className="text-white">Phone Number</label>
            <input
              className="w-full h-10 px-4 rounded-xl border-2 border-white"
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
        </form>
      </div>
    );
  }
// Separate function for Role Information section
function Role({ nextForm, prevForm, updateRoleInfo }) {
    const [selectedRole, setSelectedRole] = useState("");

    const submitRole = () => {
        // Call the prop function to update personalInfo in the parent component
        updateRoleInfo({
            selectedRole,
        });
        // Continue with other logic or navigation
        nextForm();
    };

    const handleRoleChange = (e) => {
      setSelectedRole(e.target.value);
    };

    return (
      <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
        <div className="flex items-end justify-between h-[60px]">
          <button
            className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
            onClick={prevForm}
          >
            Back
          </button>
          <h2 className="text-3xl font-bold  px-6 py-3  rounded-md">
            Role Information
          </h2>
          <button
            className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
            onClick={submitRole}
          >
            Next
          </button>
        </div>
        <hr className="my-4 h-1 bg-white" />
        <Progress level={3} />
        <form method="post" className="grid grid-cols-1 gap-4 mt-4">
          <div className=" p-4 grid grid-cols-1 gap-4">
            <h2 className="mx-4 mt-4 text-3xl font-bold text-black">
              Role Information
            </h2>
            <label className="text-white">Role</label>
            <select
              className="w-full h-10 px-4 rounded-xl border-2 border-white"
              name="Role"
              value={selectedRole}
              onChange={handleRoleChange}
            >
              <option value="">Select Role</option>
              <option value="Farmer">Farmer</option>
              <option value="Manufacture">Manufacture</option>
              <option value="ShippingCompany">Shipping Company</option>
              <option value="Admin">Admin</option>
            </select>

          </div>
        </form>
      </div>
    );
  }
// Separate function for Setup Wallet section
function SetupAddress({ prevForm, updateWalletInfo,personalInfo,contactInfo,roleInfo }) {
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");

    const handleStreetChange = (e) => {
        setStreet(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleStateChange = (e) => {
        setState(e.target.value);
    };

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    };

    const handleFinishButtonClick = async () => {
            // Call the prop function to update addressInfo in the parent component
            updateWalletInfo({
                street,
                city,
                state,
                country,
            });
            try {
                const formData = {
                    personalInfo,
                    contactInfo,
                    roleInfo,
                        addressInfo: {
                            street,
                            city,
                            state,
                            country,
                        },
                };

                const response = await axios.post('/createUser', formData);

                if (response.ok) {
                    const responseData = await response.json();
                    console.log("Data successfully sent:", responseData);
                } else {
                    console.error("Failed to send data:", response.status);
                }
            } catch (error) {
                console.error("Error sending data:", error);
            }
    };

    return (
        <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
            <div className="flex items-end justify-between h-[60px]">
                <button
                    className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
                    onClick={prevForm}
                >
                    Back
                </button>
                <h2 className="text-3xl font-bold px-6 py-3 rounded-md">Setup Wallet</h2>
                <button
                    className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
                    onClick={handleFinishButtonClick}
                >
                    Finish
                </button>
            </div>
            <hr className="my-4 h-1 bg-white" />
            <Progress level={4} />
            <form method="post" className="grid grid-cols-1 gap-4 mt-4">
                <div className="p-4 grid grid-cols-1 gap-4">
                    <h2 className="mx-4 mt-4 text-3xl font-bold text-black">
                        Address Information
                    </h2>
                    <label className="text-white">Street</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="street"
                        placeholder="Street"
                        value={street}
                        onChange={handleStreetChange}
                    />

                    <label className="text-white">City</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="city"
                        placeholder="City"
                        value={city}
                        onChange={handleCityChange}
                    />

                    <label className="text-white">State</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="state"
                        placeholder="State"
                        value={state}
                        onChange={handleStateChange}
                    />

                    <label className="text-white">Country</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={country}
                        onChange={handleCountryChange}
                    />
                </div>
            </form>
        </div>
    );
}
