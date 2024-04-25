import React, { useState } from "react";
import { Progress2 } from "../Comp/Progress";
import axios from "../../axiosConfig";
const nextForm = () => {};
const prevForm = () => {};
export default function FarmerCreate() {

    const [cropInfo, setCropInfo] = useState({
        name: "",
        type: "",
        quantity: "",
        unit: "",
        startDate: "",
        endDate: "",
        seedPrice: "",
    });
    const [farmInfo, setFarmInfo] = useState({
        name: "",
        size: "",
        dateOfEstablishment: "",
        climateZone: "",
        street: "",
        city: "",
        state: "",
        country: "",
    });
    const [fertilizerInfo, setFertilizerInfo] = useState({
        fertilizerName: "",
        fertilizerPrice: "",
        fertilizerQuantity: "",
        fertilizerQuantityUnit: "",
        pesticideName: "",
        pesticidePrice: "",
    });
    const [currentStep, setCurrentStep] = useState(1);
    const nextForm = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };
    const prevForm = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };
    const updateCropInfo = (data) => {
        setCropInfo((prevData) => ({ ...prevData, ...data }));
    };
    const updateFarmInfo = (data) => {
        setFarmInfo((prevData) => ({ ...prevData, ...data }));
    };
    const updateFertilizerInfo = (data) => {
        setFertilizerInfo((prevData) => ({ ...prevData, ...data }));
    };
    const submitForm = async () => {
        try {
            const formData = {
                cropInfo,
                farmInfo,
                fertilizerInfo,
            };

            const response = await axios.post('/createFarm', formData);

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
        <div className="m-16 min-h-full">
            {currentStep === 1 && (
                <CropInformation nextForm={nextForm} cropInfo={cropInfo}  updateCropInfo={updateCropInfo}/>
            )}
            {currentStep === 2 && (
                <GeologicalInformation nextForm={nextForm} prevForm={prevForm} farmInfo={farmInfo} updateFarmInfo={updateFarmInfo}/>
            )}
            {currentStep === 3 && (
                <FertilizerInformation nextForm={nextForm} prevForm={prevForm} fertilizerInfo={fertilizerInfo} updateFertilizerInfo={updateFertilizerInfo} submitForm={submitForm}/>
            )}
        </div>
    );
}

// Separate function for Crop Information section
function CropInformation({ nextForm,cropInfo ,updateCropInfo }) {
    return (
        <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
            <div className="flex items-end justify-between h-[60px]">
                <h2 className="text-3xl font-bold  px-6 py-3  rounded-md">
                    Farmer Crop
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
                        Crop Information:
                    </h2>
                    <label className="text-white">Crop Name</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="CropName"
                        placeholder="Crop Name"
                        value={cropInfo.name}
                        onChange={(e) => updateCropInfo({ name: e.target.value })}
                    />

                    <label className="text-white">Crop Type</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="CropType"
                        placeholder="Crop Type"
                        value={cropInfo.type}
                        onChange={(e) => updateCropInfo({ type: e.target.value })}
                    />

                    <label className="text-white">Crop Quantity</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="number"
                        name="CropQuantity"
                        placeholder="Crop Quantity"
                        value={cropInfo.quantity}
                        onChange={(e) => updateCropInfo({ quantity: e.target.value })}
                    />
                    <label className="text-white">Unit</label>
                    <select
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        name="unit"
                        value={cropInfo.unit}
                        onChange={(e) => updateCropInfo({ unit: e.target.value })}
                    >
                        <option value="">Select Unit</option>
                        <option value="Ton">Ton</option>
                        <option value="Acres">Acres</option>
                        <option value="Kg">Kg</option>
                    </select>

                    <label className="text-white">Harvest Date</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="date"
                        name="HarvestDate"
                        placeholder="Harvest Date"
                        value={cropInfo.startDate}
                        onChange={(e) => updateCropInfo({ startDate: e.target.value })}
                    />
                    <label className="text-white">End Date</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="date"
                        name="endDate"
                        placeholder="End Date"
                        value={cropInfo.endDate}
                        onChange={(e) => updateCropInfo({ endDate: e.target.value })}
                    />

                    <label className="text-white">Seed Price</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="number"
                        name="SeedPrice"
                        placeholder="Seed Price"
                        value={cropInfo.seedPrice}
                        onChange={(e) => updateCropInfo({ seedPrice: e.target.value })}
                    />
                </div>
            </form>
        </div>
    );
}
// Separate function for Geological Information section
function GeologicalInformation({ nextForm, prevForm, farmInfo, updateFarmInfo }) {
    const handleInputChange = (field, value) => {
        updateFarmInfo({ ...farmInfo, [field]: value });
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
                    Farmer Crop
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
                        Geological Information
                    </h2>
                    <label className="text-white">Farm Name</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="FarmName"
                        placeholder="Farm Name"
                        value={farmInfo.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                    <label className="text-white">Farm Size</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="FarmSize"
                        placeholder="Farm Size"
                        value={farmInfo.size}
                        onChange={(e) => handleInputChange("size", e.target.value)}
                    />
                    <label className="text-white">Climate Zone</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="ClimateZone"
                        placeholder="Climate Zone"
                        value={farmInfo.climateZone}
                        onChange={(e) => handleInputChange("climateZone", e.target.value)}
                    />
                    <label className="text-white">Street</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="street"
                        placeholder="Street"
                        value={farmInfo.street}
                        onChange={(e) => handleInputChange("street", e.target.value)}
                    />

                    <label className="text-white">City</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="city"
                        placeholder="City"
                        value={farmInfo.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                    />

                    <label className="text-white">State</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="state"
                        placeholder="State"
                        value={farmInfo.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                    />

                    <label className="text-white">Country</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={farmInfo.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                    />
                    <label className="text-white">Date Of Establishment</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="date"
                        name="DateOfEstablishment"
                        placeholder="Date Of Establishment"
                        value={farmInfo.dateOfEstablishment}
                        onChange={(e) => handleInputChange("dateOfEstablishment", e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
}

// Separate function for Fertilizer Information section
function FertilizerInformation({  prevForm, fertilizerInfo, updateFertilizerInfo,submitForm }) {
    const handleInputChange = (field, value) => {
        updateFertilizerInfo({ ...fertilizerInfo, [field]: value });
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
                    Farmer Crop
                </h2>
                <button
                    className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
                    onClick={submitForm}
                >
                    Finish
                </button>
            </div>
            <hr className="my-4 h-1 bg-white" />
            <Progress2 level={3} />
            <form method="post" className="grid grid-cols-1 gap-4 mt-4">
                <div className=" p-4 grid grid-cols-1 gap-4">
                    <h2 className="mx-4 mt-4 text-3xl font-bold text-black">
                        Fertilizer Information
                    </h2>
                    <label className="text-white">Fertilizer Name</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="FertilizerName"
                        placeholder="Fertilizer Name"
                        value={fertilizerInfo.fertilizerName}
                        onChange={(e) => handleInputChange("fertilizerName", e.target.value)}
                    />
                    <label className="text-white">Fertilizer Quantity</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="number"
                        name="fertilizerQuantity"
                        placeholder="fertilizer Quantity"
                        value={fertilizerInfo.fertilizerQuantity}
                        onChange={(e) => handleInputChange("fertilizerQuantity", e.target.value)}
                    />
                    <label className="text-white">Unit</label>
                    <select
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        name="fertilizerQuantityUnit"
                        value={fertilizerInfo.fertilizerQuantityUnit}
                        onChange={(e) => handleInputChange("fertilizerQuantityUnit", e.target.value)}
                    >
                        <option value="">Select Unit</option>
                        <option value="Ton">Liters</option>
                        <option value="Acres">Acres</option>
                        <option value="Kg">Kg</option>
                    </select>
                    <label className="text-white">Fertilizer Price</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="number"
                        name="Price"
                        placeholder="Fertilizer Price"
                        value={fertilizerInfo.fertilizerPrice}
                        onChange={(e) => handleInputChange("fertilizerPrice", e.target.value)}
                    />
                    <label className="text-white">Pesticide Name</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="PesticideName"
                        placeholder="Pesticide Name"
                        value={fertilizerInfo.pesticideName}
                        onChange={(e) => handleInputChange("pesticideName", e.target.value)}
                    />
                    <label className="text-white">Pesticide Price</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="number"
                        name="PesticidePrice"
                        placeholder="Pesticide Price"
                        value={fertilizerInfo.pesticidePrice}
                        onChange={(e) => handleInputChange("pesticidePrice", e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
}