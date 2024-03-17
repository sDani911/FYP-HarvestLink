import React, { useState } from "react";
import { Progress2 } from "../Comp/Progress";
import axios from "../../axiosConfig";

//////////////////////////////BACKEND ONLY//////////////////////////////

const nextForm = () => {};
const prevForm = () => {};

//////////////////////////////FRONTEND ONLY//////////////////////////////

export default function ShippingCompanyCreate() {
    const [shippingCompanyInfo, setShippingCompanyInfo] = useState({
        name: "",
        contactPerson: "",
        contactNo: "",
        email: "",
        licenseNumber: "",
    });

    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        cnic: "",
        cnicExpiry: "",
        qualification: "",
        profilePicture: "",
        email: "",
        password: "",
        phoneNumber: "",
        street: "",
        city: "",
        state: "",
        country: "",
    });

    const [vehicleInfo, setVehicleInfo] = useState({
        type: "",
        registration: "",
        licenseNumber: "",
        insurance: "",
        condition: "",
    });

    const updateShippingCompanyInfo = (data) => {
        setShippingCompanyInfo((prevData) => ({ ...prevData, ...data }));
    };

    const updateUserInfo = (data) => {
        setUserInfo((prevData) => ({ ...prevData, ...data }));
    };

    const updateVehicleInfo = (data) => {
        setVehicleInfo((prevData) => ({ ...prevData, ...data }));
    };
    const submitForm = async () => {
        try {
            const formData = {
                shippingCompanyInfo,
                userInfo,
                vehicleInfo,
            };

            const response = await axios.post('/createShippingCompany', formData);

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

    const [currentStep, setCurrentStep] = useState(1);

    const nextForm = () => {
        setCurrentStep((prevForm) => prevForm + 1);
    };

    const prevForm = () => {
        setCurrentStep((prevForm) => prevForm - 1);
    };

    return (
        <div className="m-16 min-h-full">
            {currentStep === 1 && <ShippingCompanyInformation nextForm={nextForm} shippingCompanyInfo={shippingCompanyInfo}  updateShippingCompanyInfo={updateShippingCompanyInfo}/>}
            {currentStep === 2 && (
                <UserInformation nextForm={nextForm} prevForm={prevForm} userInfo={userInfo}  updateUserInfo={updateUserInfo}/>
            )}
            {currentStep === 3 && <Vehicle  prevForm={prevForm} submitForm={submitForm} vehicleInfo={vehicleInfo}  updateVehicleInfo={updateVehicleInfo}/>}

        </div>
    );
}

// Separate function for ShippingCompany Information section
function ShippingCompanyInformation({ nextForm, shippingCompanyInfo, updateShippingCompanyInfo }) {
    return (
        <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
            <div className="flex items-end justify-between h-[60px]">
                <h2 className="text-3xl font-bold  px-6 py-3  rounded-md">
                    ShippingCompany
                </h2>
                <button
                    className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
                    onClick={nextForm}
                >
                    Next
                </button>
            </div>
            <hr className="my-4 h-1 bg-white" />
            <Progress2 level={1} />
            <form method="post" className="grid grid-cols-1 gap-4 mt-4">
                <div className="p-4 flex flex-col space-y-4">
                    <h2 className="mx-4 mt-4 text-3xl font-bold text-black">
                        Shipping Company Information:
                    </h2>
                    <label className="text-white">Shipping Company Name</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="name"
                        placeholder="Shipping Company Name"
                        value={shippingCompanyInfo.name}
                        onChange={(e) => updateShippingCompanyInfo({ name: e.target.value })}
                    />

                    <label className="text-white">Contact Person Name</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="contactPerson"
                        placeholder="Contact Person Name"
                        value={shippingCompanyInfo.contactPerson}
                        onChange={(e) => updateShippingCompanyInfo({ contactPerson: e.target.value })}
                    />

                    <label className="text-white">Contact No</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="contactNo"
                        placeholder="Contact No"
                        value={shippingCompanyInfo.contactNo}
                        onChange={(e) => updateShippingCompanyInfo({ contactNo: e.target.value })}
                    />

                    <label className="text-white">Email</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={shippingCompanyInfo.email}
                        onChange={(e) => updateShippingCompanyInfo({ email: e.target.value })}
                    />

                    <label className="text-white">Company License Number</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="licenseNumber"
                        placeholder="License Number"
                        value={shippingCompanyInfo.licenseNumber}
                        onChange={(e) => updateShippingCompanyInfo({ licenseNumber: e.target.value })}
                    />

                </div>
            </form>
        </div>
    );
}

// Separate function for Product Information section
function UserInformation({ nextForm, prevForm, userInfo, updateUserInfo }) {
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];

        // Display a preview of the selected image
        const reader = new FileReader();

        reader.onloadend = () => {
            updateUserInfo({ profilePicture: reader.result })
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            updateUserInfo({ profilePicture: "" }); // Clear the preview if no file selected
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
                <h2 className="text-3xl font-bold  px-6 py-3  rounded-md">
                    Driver Information
                </h2>
                <button
                    className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
                    onClick={nextForm}
                >
                    Next
                </button>
            </div>
            <hr className="my-4 h-1 bg-white" />
            <Progress2 level={2} />
            <form action="" className="grid grid-cols-1 gap-4 mt-4">
                <div className="p-4 grid grid-cols-1 gap-4">
                    <h2 className="mx-4 mt-4 text-3xl font-bold text-black">
                        Contact Information
                    </h2>
                    <label className="text-white">First Name</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={userInfo.firstName}
                        onChange={(e) => updateUserInfo({ firstName: e.target.value })}
                    />

                    <label className="text-white">Last Name</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={userInfo.lastName}
                        onChange={(e) => updateUserInfo({ lastName: e.target.value })}
                    />
                    <label className="text-white">Email</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={userInfo.email}
                        onChange={(e) => updateUserInfo({ email: e.target.value })}
                    />
                    <label className="text-white">Phone Number</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={userInfo.phoneNumber}
                        onChange={(e) => updateUserInfo({ phoneNumber: e.target.value })}
                    />

                    <label className="text-white">Password</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="password"
                        placeholder="Password"
                        value={userInfo.password}
                        onChange={(e) => updateUserInfo({ password: e.target.value })}
                    />

                    <label className="text-white">Gender</label>
                    <select
                    className="w-full h-10 px-4 rounded-xl border-2 border-white"
                    name="gender"
                    value={userInfo.gender}
                    onChange={(e) => updateUserInfo({ gender: e.target.value })}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="none">None</option>
                </select>


                    <label className="text-white">Date of Birth</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="date"
                        name="dateOfBirth"
                        placeholder="Date of Birth"
                        value={userInfo.dateOfBirth}
                        onChange={(e) => updateUserInfo({ dateOfBirth: e.target.value })}
                    />
                    <label className="text-white">Cnic</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="cnic"
                        placeholder="Cnic"
                        value={userInfo.cnic}
                        onChange={(e) => updateUserInfo({ cnic: e.target.value })}
                    />
                    <label className="text-white">Cnic Expiry</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="date"
                        name="cnicExpiry"
                        placeholder="cnic Expiry"
                        value={userInfo.cnicExpiry}
                        onChange={(e) => updateUserInfo({ cnicExpiry: e.target.value })}
                    />
                    <label className="text-white">Qualification</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="qualification"
                        placeholder="Qualification"
                        value={userInfo.qualification}
                        onChange={(e) => updateUserInfo({ qualification: e.target.value })}
                    />

                    <label className="text-white">Profile Picture</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="file"
                        name="profilepicture"
                        onChange={handleProfilePictureChange}
                    />
                    {userInfo.profilePicture && (
                        <img
                            className="mt-2 rounded-lg"
                            src={userInfo.profilePicture}
                            alt="Profile Preview"
                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                        />
                    )}

                    <label className="text-white">Street</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="street"
                        placeholder="Street"
                        value={userInfo.street}
                        onChange={(e) => updateUserInfo({ street: e.target.value })}
                    />
                    <label className="text-white">City</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="city"
                        placeholder="City"
                        value={userInfo.city}
                        onChange={(e) => updateUserInfo({ city: e.target.value })}
                    />
                    <label className="text-white">State</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="state"
                        placeholder="State"
                        value={userInfo.state}
                        onChange={(e) => updateUserInfo({ state: e.target.value })}
                    />
                    <label className="text-white">Country</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={userInfo.country}
                        onChange={(e) => updateUserInfo({ country: e.target.value })}
                    />
                </div>
            </form>
        </div>
    );
}

// Separate function for Quantity Information section
function Vehicle({ submitForm, prevForm,vehicleInfo,updateVehicleInfo }) {
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
                    ShippingCompany
                </h2>

                <button
                    className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
                    onClick={submitForm}
                >
                    Submit
                </button>
            </div>
            <hr className="my-4 h-1 bg-white" />
            <Progress2 level={3} />
            <form method="post" className="grid grid-cols-1 gap-4 mt-4">
                <div className=" p-4 grid grid-cols-1 gap-4">
                    <h2 className="mx-4 mt-4 text-3xl font-bold text-black">
                        Address
                    </h2>
                    <label className="text-white">Vehicle Type</label>
                    <select
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        name="type"
                        value={vehicleInfo.type}
                        onChange={(e) => updateVehicleInfo({ type: e.target.value })}
                    >
                        <option value="">Select Type</option>
                        <option value="car">Car</option>
                        <option value="truck">Truck</option>
                        <option value="Container">Container</option>
                    </select>

                    <label className="text-white">Registration</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="registration"
                        placeholder="Registration"
                        value={vehicleInfo.registration}
                        onChange={(e) => updateVehicleInfo({ registration: e.target.value })}
                    />
                    <label className="text-white">License Number</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="licenseNumber"
                        placeholder="License Number"
                        value={vehicleInfo.licenseNumber}
                        onChange={(e) => updateVehicleInfo({ licenseNumber: e.target.value })}
                    />
                    <label className="text-white">Insurance</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="insurance"
                        placeholder="Insurance"
                        value={vehicleInfo.insurance}
                        onChange={(e) => updateVehicleInfo({ insurance: e.target.value })}
                    />
                    <label className="text-white">Condition</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="condition"
                        placeholder="Condition"
                        value={vehicleInfo.condition}
                        onChange={(e) => updateVehicleInfo({ condition: e.target.value })}
                    />
                </div>
            </form>
        </div>
    );
}
