import React, { useState } from "react";
import { Progress2 } from "../Comp/Progress";

export default function InvoiceNew() {
    const [currentStep, setCurrentStep] = useState(1);

    const nextForm = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    return (
        <div className="m-16 min-h-full">
            {currentStep === 1 && (
                <CompanyInformation nextForm={nextForm} />
            )}
            {currentStep === 2 && (
                <CargoInformation nextForm={nextForm} />
            )}
            {currentStep === 3 && (
                <DeliveryInformation nextForm={nextForm} />
            )}
        </div>
    );
}

// Separate function for Invoice Information section

function CompanyInformation({ nextForm }) {
    // State variables for each input field
    const [companyId, setCompanyId] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');

    return (
        <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
            <div className="flex items-end justify-between h-[60px]">
                <h2 className="text-3xl font-bold  px-6 py-3  rounded-md">Book Driver</h2>
                <button
                    className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
                    onClick={nextForm}
                >
                    Next
                </button>
            </div>
            <hr className="my-4 h-1 bg-white" />
            <Progress2 level={1} />
            <form method="post" className="grid grid-cols-1 gap-4 mt-2">
                <div className="p-4 grid grid-cols-1 gap-4">
                    <h2 className="mx-4 mt-2 text-3xl font-bold text-black">Company Information</h2>

                    <label className="text-white">Company Id</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="CompanyId"
                        placeholder="Enter Company Id"
                        value={companyId}
                        onChange={(e) => setCompanyId(e.target.value)}
                    />

                    <label className="text-white">Company Name</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="CompanyName"
                        placeholder="Enter Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />

                    <label className="text-white">Company Address</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="CompanyAddress"
                        placeholder="Physical Address"
                        value={companyAddress}
                        onChange={(e) => setCompanyAddress(e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
}
function CargoInformation({ nextForm }) {
    const [cargoId, setCargoId] = useState('');
    const [cargoWeight, setCargoWeight] = useState('');
    const [cargoContent, setCargoContent] = useState('');
    const [cargoQuantity, setCargoQuantity] = useState('');

    return (
        <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
            <div className="flex items-end justify-between h-[60px]">
                <h2 className="text-3xl font-bold px-6 py-3 rounded-md">Book Driver</h2>
                <button
                    className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
                    onClick={nextForm}
                >
                    Next
                </button>
            </div>
            <hr className="my-4 h-1 bg-white" />
            <Progress2 level={2} />
            <form action="" className="grid grid-cols-1 gap-4 mt-2">
                <div className="p-4 grid grid-cols-1 gap-4">
                    <h2 className="mx-4 mt-2 text-3xl font-bold text-black">Cargo Information</h2>
                    <label className="text-white">Cargo Id</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="CargoId"
                        value={cargoId}
                        placeholder="e.g. M001"
                        onChange={(e) => setCargoId(e.target.value)}
                    />
                    <label className="text-white">Cargo Weight</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="CargoWeight"
                        value={cargoWeight}
                        placeholder="e.g 250kg"
                        onChange={(e) => setCargoWeight(e.target.value)}
                    />
                    <label className="text-white">Cargo Content</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="CargoContent"
                        value={cargoContent}
                        placeholder="e.g Wheat, Jam?"
                        onChange={(e) => setCargoContent(e.target.value)}
                    />
                    <label className="text-white">Cargo Quantity</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="CargoQuantity"
                        placeholder="e.g 5 pallets"
                        value={cargoQuantity}
                        onChange={(e) => setCargoQuantity(e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
}
function DeliveryInformation({ }) {
    const [pickupLocation, setPickupLocation] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [dropoffTimeEstimate, setDropoffTimeEstimate] = useState('');
    const [dropoffDate, setDropoffDate] = useState('');
    const [cost, setCost] = useState('');

    const submitForm = () => {
        // Implement your form submission logic here
    };

    return (
        <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
            <div className="flex items-end justify-between h-[60px]">
                <h2 className="text-3xl font-bold px-6 py-3 rounded-md">Book Driver</h2>
                <button className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg" onClick={submitForm}>Finish</button>
            </div>
            <hr className="my-4 h-1 bg-white" />
            <Progress2 level={3} />
            <form method="post" className="grid grid-cols-1 gap-4 mt-2">
                <div className="p-4 grid grid-cols-1 gap-4">
                    <h2 className="mx-4 mt-2 text-3xl font-bold text-black">Delivery Information</h2>

                    <label className="text-white">Pickup Location</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        value={pickupLocation}
                        name="PickupLocation"
                        placeholder="Enter Pickup Location"
                        onChange={(e) => setPickupLocation(e.target.value)}
                    />

                    <label className="text-white">Pickup Time</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="number"
                        value={pickupTime}
                        name="PickupTime"
                        placeholder="Enter Pickup Time"
                        onChange={(e) => setPickupTime(e.target.value)}
                    />

                    <label className="text-white">Pickup Date</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="date"
                        value={pickupDate}
                        name="PickupDate"
                        placeholder="Select Pickup Date"
                        onChange={(e) => setPickupDate(e.target.value)}
                    />

                    <label className="text-white">Dropoff Location</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        value={dropoffLocation}
                        name="DropoffLocation"
                        placeholder="Enter Dropoff Location"
                        onChange={(e) => setDropoffLocation(e.target.value)}
                    />

                    <label className="text-white">Dropoff Time Estimate</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        value={dropoffTimeEstimate}
                        name="DropoffTimeEstimate"
                        placeholder="Enter Dropoff Time Estimate"
                        onChange={(e) => setDropoffTimeEstimate(e.target.value)}
                    />

                    <label className="text-white">Drop Off Date</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="date"
                        value={dropoffDate}
                        name="DropoffDate"
                        placeholder="Select Dropoff Date"
                        onChange={(e) => setDropoffDate(e.target.value)}
                    />

                    <label className="text-white">Cost</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        value={cost}
                        name="Cost"
                        placeholder="Enter Cost"
                        onChange={(e) => setCost(e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
}