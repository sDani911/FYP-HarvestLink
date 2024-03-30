import React, { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { Progress } from "../Comp/Progress";
import axios from "../../axiosConfig";

export default function AdminLanding() {
  // State variables to store form data
  const location = useLocation();
  const rowData = location.state;

        const [personalInfo, setPersonalInfo] = useState({
            id: rowData.id,
            firstName: rowData.first_name,
            lastName: rowData.last_name,
            gender: rowData.gender,
            dateOfBirth: rowData.dob,
            cnic: rowData.cnic,
            cnicExpiry: rowData.cnic_expiry,
            qualification: rowData.qualification,
            profilePicture: "",
        });

        const [contactInfo, setContactInfo] = useState({
            email: rowData.email,
            password: "",
            phoneNumber: rowData.phone_number,
        });

        const [roleInfo, setRoleInfo] = useState({
            selectedRole: rowData.role.title,
        });
        const [addressInfo, setAddressInfo] = useState({
            street: rowData.address.street,
            city: rowData.address.city,
            state: rowData.address.state,
            country: rowData.address.country,
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
                {currentStep === 1 && <PersonalInformation nextForm={nextForm} personalInfo={personalInfo} updatePersonalInfo={updatePersonalInfo} />}
                {currentStep === 2 && (
                    <ContactInformation nextForm={nextForm} prevForm={prevForm} contactInfo={contactInfo} updateContactInfo={updateContactInfo} />
                )}
                {currentStep === 3 && <Role nextForm={nextForm} prevForm={prevForm} roleInfo={roleInfo} updateRoleInfo={updateRoleInfo} />}
                {currentStep === 4 && (
                    <SetupAddress prevForm={prevForm}
                                  updateAddressInfo={updateAddressInfo}
                                  personalInfo={personalInfo}
                                  contactInfo={contactInfo}
                                  roleInfo={roleInfo}
                                  addressInfo={addressInfo}
                    />
                )}
            </div>
        );
    }

    function PersonalInformation({ nextForm,personalInfo,updatePersonalInfo }) {

        const handleProfilePictureChange = (e) => {
            const file = e.target.files[0];

            // Display a preview of the selected image
            const reader = new FileReader();

            reader.onloadend = () => {
                updatePersonalInfo({ profilePicture: reader.result })
            };

            if (file) {
                reader.readAsDataURL(file);
            } else {
                updatePersonalInfo({ profilePicture: "" });
            }
        };

        return (
            <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
                <div className="flex items-end justify-between h-[60px]">
                    <h2 className="text-3xl font-bold  px-6 py-3  rounded-md">
                        Personal Information
                    </h2>
                    <button
                        className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
                        onClick={nextForm}
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
                            value={personalInfo.firstName}
                            onChange={(e) => updatePersonalInfo({ firstName: e.target.value })}
                            placeholder="First Name"
                        />

                        <label className="text-white">Last Name</label>
                        <input
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            type="text"
                            name="lastName"
                            value={personalInfo.lastName}
                            onChange={(e) => updatePersonalInfo({ lastName: e.target.value })}
                            placeholder="Last Name"
                        />

                        <label className="text-white">Gender</label>
                        <select
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            name="gender"
                            value={personalInfo.gender}
                            onChange={(e) => updatePersonalInfo({ gender: e.target.value })}
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
                            value={personalInfo.qualification}
                            onChange={(e) => updatePersonalInfo({ qualification: e.target.value })}
                            placeholder="Qualification"
                        />

                        <label className="text-white">Profile Picture</label>
                        <input
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            type="file"
                            name="profilePicture"
                            onChange={handleProfilePictureChange}
                        />
                        {personalInfo.profilePicture && (
                            <img
                                className="mt-2 rounded-lg"
                                src={personalInfo.profilePicture}
                                alt="Profile Preview"
                                style={{ maxWidth: '100%', maxHeight: '200px' }}
                            />
                        )}

                        <label className="text-white">Date of Birth</label>
                        <input
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            type="date"
                            name="dateOfBirth"
                            value={personalInfo.dateOfBirth}
                            onChange={(e) => updatePersonalInfo({ dateOfBirth: e.target.value })}
                            placeholder="Date of Birth"
                        />

                        <label className="text-white">CNIC</label>
                        <input
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            type="text"
                            name="cnic"
                            value={personalInfo.cnic}
                            onChange={(e) => updatePersonalInfo({ cnic: e.target.value })}
                            placeholder="CNIC"
                        />

                        <label className="text-white">Cnic Expiry</label>
                        <input
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            type="date"
                            name="cnicExpiry"
                            value={personalInfo.cnic_expiry}
                            onChange={(e) => updatePersonalInfo({ cnic_expiry: e.target.value })}
                            placeholder="Cnic Expiry"
                        />
                    </div>
                </form>
            </div>
        );
    }
// Separate function for Contact Information section
    function ContactInformation({ nextForm, prevForm, contactInfo, updateContactInfo }) {
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
                        onClick={nextForm}
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
                            value={contactInfo.email}
                            onChange={(e) => updateContactInfo({ email: e.target.value })}
                        />

                        <label className="text-white">Password</label>
                        <input
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            type="text"
                            name="Password"
                            placeholder="Password"
                            value={contactInfo.password}
                            onChange={(e) => updateContactInfo({ password: e.target.value })}
                        />

                        <label className="text-white">Phone Number</label>
                        <input
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={contactInfo.phoneNumber}
                            onChange={(e) => updateContactInfo({ phoneNumber: e.target.value })}
                        />
                    </div>
                </form>
            </div>
        );
    }
// Separate function for Role Information section
    function Role({ nextForm, prevForm, roleInfo, updateRoleInfo }) {

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
                        onClick={nextForm}
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
                            value={roleInfo.selectedRole}
                            onChange={(e)=>updateRoleInfo({selectedRole: e.target.value})}
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
    function SetupAddress({ prevForm, updateAddressInfo,personalInfo,contactInfo,roleInfo, addressInfo }) {
        const navigate = useNavigate();

        const handleFinishButtonClick = async () => {
            // Call the prop function to update addressInfo in the parent component
            try {
                const formData = {
                    personalInfo,
                    contactInfo,
                    roleInfo,
                    addressInfo
                };
                const id = personalInfo.id;
                const response = await axios.post(`/updateUser/${id}`, formData);

                if (response) {
                    navigate('/AdminLanding');
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
                            value={addressInfo.street}
                            onChange={(e)=>updateAddressInfo({street: e.target.value})}
                        />

                        <label className="text-white">City</label>
                        <input
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            type="text"
                            name="city"
                            placeholder="City"
                            value={addressInfo.city}
                            onChange={(e)=>updateAddressInfo({city: e.target.value})}
                        />

                        <label className="text-white">State</label>
                        <input
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            type="text"
                            name="state"
                            placeholder="State"
                            value={addressInfo.state}
                            onChange={(e)=>updateAddressInfo({state: e.target.value})}
                        />

                        <label className="text-white">Country</label>
                        <input
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={addressInfo.country}
                            onChange={(e)=>updateAddressInfo({country: e.target.value})}
                        />
                    </div>
                </form>
            </div>
        );
    }
