import React, { useState } from "react";
import { Progress2 } from "../Comp/Progress";
import axios from "../../axiosConfig";

//////////////////////////////BACKEND ONLY//////////////////////////////

const nextForm = () => {};
const prevForm = () => {};

//////////////////////////////FRONTEND ONLY//////////////////////////////

export default function ManufactureCreate() {
    const [productInfo, setProductInfo] = useState({
        name: "",
        productQuantity: "",
        productQuality: "",
        license: "",
    });

    const [contactInfo, setContactInfo] = useState({
        contactPerson: "",
        email: "",
        contactNo: "",
    });

    const [addressInfo, setAddressInfo] = useState({
        address: "",
    });

    const updateProductInfo = (data) => {
        setProductInfo((prevData) => ({ ...prevData, ...data }));
    };

    const updateContactInfo = (data) => {
        setContactInfo((prevData) => ({ ...prevData, ...data }));
    };

    const updateAddressInfo = (data) => {
        setAddressInfo((prevData) => ({ ...prevData, ...data }));
    };
    const submitForm = async () => {
        try {
            const formData = {
                productInfo,
                contactInfo,
                addressInfo,
            };

            const response = await axios.post('/createManufacture', formData);

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
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const prevForm = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    return (
        <div className="m-16 min-h-full">
            {currentStep === 1 && <ManufacturingInformation nextForm={nextForm} productInfo={productInfo}  updateProductInfo={updateProductInfo}/>}
            {currentStep === 2 && (
                <ContactInformation nextForm={nextForm} prevForm={prevForm} contactInfo={contactInfo}  updateContactInfo={updateContactInfo}/>
            )}
            {currentStep === 3 && <Address nextForm={nextForm} prevForm={prevForm} submitForm={submitForm} addressInfo={addressInfo}  updateAddressInfo={updateAddressInfo}/>}

        </div>
    );
}

// Separate function for Manufacturing Information section
function ManufacturingInformation({ nextForm, productInfo, updateProductInfo }) {
    return (
        <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
            <div className="flex items-end justify-between h-[60px]">
                <h2 className="text-3xl font-bold  px-6 py-3  rounded-md">
                    Manufacturing
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
                        Manufacturing Information:
                    </h2>
                    <label className="text-white">Product Name</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="ProductName"
                        placeholder="Product Name"
                        value={productInfo.name}
                        onChange={(e) => updateProductInfo({ name: e.target.value })}
                    />

                    <label className="text-white">Production Quantity</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="ProductionQuantity"
                        placeholder="Production Quantity"
                        value={productInfo.productQuantity}
                        onChange={(e) => updateProductInfo({ productQuantity: e.target.value })}
                    />
                    <label className="text-white">Production Quality</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="ProductionQuality"
                        placeholder="Production Quality"
                        value={productInfo.productQuality}
                        onChange={(e) => updateProductInfo({ productQuality: e.target.value })}
                    />
                    <label className="text-white">Production License</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="ProductionLicense"
                        placeholder="Production License"
                        value={productInfo.license}
                        onChange={(e) => updateProductInfo({ license: e.target.value })}
                    />

                </div>
            </form>
        </div>
    );
}

// Separate function for Product Information section
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
                    Manufacturing
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
                    <label className="text-white">Contact Person Name</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="contactPerson"
                        placeholder="Name"
                        value={contactInfo.contactPerson}
                        onChange={(e) => updateContactInfo({ contactPerson: e.target.value })}
                    />
                    <label className="text-white">Contact Person Email</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="contactPerson"
                        placeholder="Email"
                        value={contactInfo.email}
                        onChange={(e) => updateContactInfo({ email: e.target.value })}
                    />
                    <label className="text-white">Contact No</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="contactNo"
                        placeholder="Phone Number"
                        value={contactInfo.contactNo}
                        onChange={(e) => updateContactInfo({ contactNo: e.target.value })}
                    />
                </div>
            </form>
        </div>
    );
}

// Separate function for Quantity Information section
function Address({ submitForm, prevForm,addressInfo,updateAddressInfo }) {
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
                    Manufacturing
                </h2>

                <button
                    className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
                    onClick={submitForm}
                >
                    Next
                </button>
            </div>
            <hr className="my-4 h-1 bg-white" />
            <Progress2 level={3} />
            <form method="post" className="grid grid-cols-1 gap-4 mt-4">
                <div className=" p-4 grid grid-cols-1 gap-4">
                    <h2 className="mx-4 mt-4 text-3xl font-bold text-black">
                        Address
                    </h2>
                    <label className="text-white">Address</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={addressInfo.address}
                        onChange={(e) => updateAddressInfo({ address: e.target.value })}
                    />
                </div>
            </form>
        </div>
    );
}

// // Separate function for Inspection Report section
// function InspectionReport({ nextForm, prevForm }) {
//     const submitForm = () => {};
//     return (
//         <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
//             <div className="flex items-end justify-between h-[60px]">
//                 <button
//                     className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
//                     onClick={prevForm}
//                 >
//                     Back
//                 </button>
//                 <h2 className="text-3xl font-bold  px-6 py-3  rounded-md">
//                     Manufacturing
//                 </h2>
//
//                 <button
//                     className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
//                     onClick={submitForm}
//                 >
//                     Finish
//                 </button>
//             </div>
//             <hr className="my-4 h-1 bg-white" />
//             <Progress level={4} />
//             <form method="post" className="grid grid-cols-1 gap-4 mt-4">
//                 <div className="p-4 grid grid-cols-1 gap-4">
//                     <h2 className="mx-4 mt-4 text-3xl font-bold text-black">
//                         Inspection Report
//                     </h2>
//                     <label className="text-white">Inspection Id</label>
//                     <input
//                         className="w-full h-10 px-4 rounded-xl border-2 border-white"
//                         type="text"
//                         name="InspectionId"
//                         placeholder="Inspection Id"
//                     />
//
//                     <label className="text-white">Inspection Start Date</label>
//                     <input
//                         className="w-full h-10 px-4 rounded-xl border-2 border-white"
//                         type="date"
//                         name="InspectionStart"
//                         placeholder="Inspection Start Date"
//                     />
//
//                     <label className="text-white">Inspection End Date</label>
//                     <input
//                         className="w-full h-10 px-4 rounded-xl border-2 border-white"
//                         type="date"
//                         name="InspectionEnd"
//                         placeholder="Inspection End Date"
//                     />
//
//                     <label className="text-white">Inspector Name</label>
//                     <input
//                         className="w-full h-10 px-4 rounded-xl border-2 border-white"
//                         type="text"
//                         name="InspectorName"
//                         placeholder="Inspector Name"
//                     />
//
//                     <label className="text-white">Department</label>
//                     <input
//                         className="w-full h-10 px-4 rounded-xl border-2 border-white"
//                         type="text"
//                         name="Department"
//                         placeholder="Department"
//                     />
//                 </div>
//             </form>
//         </div>
//     );
// }
