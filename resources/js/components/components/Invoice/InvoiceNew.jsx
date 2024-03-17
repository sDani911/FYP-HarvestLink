import React, { useState } from "react";
import {Progress2} from "../Comp/Progress";
export default function InvoiceNew() {
    const [currentStep, setCurrentStep] = useState(1);

    const nextForm = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    return (
        <div className="m-16 min-h-full">
            {currentStep === 1 && (
                <InvoiceInformation nextForm={nextForm} />
            )}
            {/* {currentStep === 2 && (
                <InvoiceDetail nextForm={nextForm} />
            )} */}
            {currentStep === 2 && (
                <ReciverInformation nextForm={nextForm} />
            )}
            {currentStep === 3 && (
                <SenderInformation nextForm={nextForm} />
            )}
        </div>
    );
}

// Separate function for Invoice Information section





function InvoiceInformation({ nextForm }) {

    return (
        <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
            <div className="flex items-end justify-between h-[60px]">
                <h2 className="text-3xl font-bold  px-6 py-3  rounded-md">Farmer Crop</h2>
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
                    <h2 className="mx-4 mt-2 text-3xl font-bold text-black">Invoice Information</h2>
                    <label className="text-white">Inspection Id</label>
                    <input className="w-full h-10 px-4 rounded-xl border-2 border-white" type="text" name="InspectionId" placeholder="Inspection Id" />

                    <label className="text-white">Inspection Start Date</label>
                    <input className="w-full h-10 px-4 rounded-xl border-2 border-white" type="date" name="InspectionStart" placeholder="Inspection Start Date" />

                    <label className="text-white">Inspection End Date</label>
                    <input className="w-full h-10 px-4 rounded-xl border-2 border-white" type="date" name="InspectionEnd" placeholder="Inspection End Date" />

                    <label className="text-white">Inspector Name</label>
                    <input className="w-full h-10 px-4 rounded-xl border-2 border-white" type="text" name="InspectorName" placeholder="Inspector Name" />

                    <label className="text-white">Department</label>
                    <input className="w-full h-10 px-4 rounded-xl border-2 border-white" type="text" name="Department" placeholder="Department" />
                </div>
            </form>
        </div>
    );
}
// function InvoiceDetail({ nextForm }) {
//     const [descriptions, setDescriptions] = useState([]);
//     const [prices, setPrices] = useState([]);

//     const handleInputChange = (index, field, value) => {
//         if (field === 'description') {
//             const newDescriptions = [...descriptions];
//             newDescriptions[index] = value;
//             setDescriptions(newDescriptions);
//         } else if (field === 'price') {
//             const newPrices = [...prices];
//             newPrices[index] = value;
//             setPrices(newPrices);
//         }
//     };

//     return (
//         <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
//             <div className="flex items-end justify-between h-[60px]">
//                 <h2 className="text-3xl font-bold px-6 py-3 rounded-md">Create Invoice</h2>
//                 <button
//                     className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
//                     onClick={nextForm}
//                 >
//                     Next
//                 </button>
//             </div> <hr className="my-4 h-1 bg-white" />
//             <Progress2 level={2} />
//             <form method="post" className="grid grid-cols-1 gap-4 mt-2">
//                 <div className="p-4 flex flex-col space-y-4">
//                     <h2 className="mx-4 mt-2 text-3xl font-bold text-black">
//                         Input Invoice Detail
//                     </h2>
//                     <div className="flex felx-row items-center justify-around">
//                         <b>
//                             <h3 className="text-xl text-zinc-300">Description</h3>
//                         </b>
//                         <b>
//                             <h3 className="text-xl text-zinc-300">Price</h3>
//                         </b>
//                     </div>
//                     <div className="bg-blue-800 w-[1100px] ml-20">
//                         {[0, 1, 2, 3].map((index) => (
//                             <div key={index} className="flex felx-row items-center justify-center space-y-0">
//                                 <input
//                                     className={`w-40 border-2 border-black ${index === 0 && 'rounded-tl-xl'} ${index === 3 && 'rounded-bl-xl'}`}
//                                     type="text"
//                                     value={descriptions[index] || ''}
//                                     onChange={(e) => handleInputChange(index, 'description', e.target.value)}
//                                 />
//                                 <input
//                                     className="w-[750px] border-2 border-black"
//                                     type="text"
//                                     value={prices[index] || ''}
//                                     onChange={(e) => handleInputChange(index, 'price', e.target.value)}
//                                 />
//                                 <input
//                                     className={`w-40 border-2 border-black ${index === 0 && 'rounded-tr-xl'} ${index === 3 && 'rounded-br-xl'}`}
//                                     type="number"
//                                     value={prices[index] || ''}
//                                     onChange={(e) => handleInputChange(index, 'price', e.target.value)}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }

function ReciverInformation({ nextForm }) {
    const [name, setName] = useState("");
    const [accountID, setAccountID] = useState("");
    const [date, setDate] = useState("");
    const [email, setEmail] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAccountIDChange = (e) => {
        setAccountID(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
            <div className="flex items-end justify-between h-[60px]">
                <h2 className="text-3xl font-bold  px-6 py-3  rounded-md">Create Invoice</h2>
                <button className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg" onClick={nextForm}>Next</button>
            </div>
            <hr className="my-4 h-1 bg-white" />
            <Progress2 level={2} />
            <form action="" className="grid grid-cols-1 gap-4 mt-2">
                <div className="p-4 grid grid-cols-1 gap-4">
                    <h2 className="mx-4 mt-2 text-3xl font-bold text-black">Reciever Information</h2>
                    <label className="text-white">Name</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="Name"
                        value={name}
                        placeholder="Name"
                        onChange={handleNameChange}
                    />
                    <label className="text-white">Account ID</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        name="AccountID"
                        value={accountID}
                        placeholder="Account ID"
                        onChange={handleAccountIDChange}
                    />
                    <label className="text-white">Date</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="date"
                        name="Date"
                        value={date}
                        placeholder="Date"
                        onChange={handleDateChange}
                    />
                    <label className="text-white">Email</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="email"
                        name="Address"
                        placeholder="user@email.com"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); }}
                    />
                </div>
            </form>
        </div>
    );
}

function SenderInformation({ }) {
    const [accountName, setAccountName] = useState("");
    const [accountID, setAccountID] = useState("");
    const [reasonInvoice, setReasonInvoice] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [date, setDate] = useState("");

    const handleAccountNameChange = (e) => {
        setAccountName(e.target.value);
    };

    const handleAccountIDChange = (e) => {
        setAccountID(e.target.value);
    };

    const handleReasonInvoiceChange = (e) => {
        setReasonInvoice(e.target.value);
    };

    const handleTotalPriceChange = (e) => {
        setTotalPrice(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };
    const submitForm = () => { }
    return (
        <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
            <div className="flex items-end justify-between h-[60px]">
                <h2 className="text-3xl font-bold  px-6 py-3  rounded-md">Create Invoice</h2>
                <button className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg" onClick={submitForm}>Finish</button>
            </div>
            <hr className="my-4 h-1 bg-white" />
            <Progress2 level={3} />
            <form method="post" className="grid grid-cols-1 gap-4 mt-2">
                <div className="p-4 grid grid-cols-1 gap-4">
                    <h2 className="mx-4 mt-2 text-3xl font-bold text-black">Sender Information</h2>
                    <label className="text-white">Name</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        value={accountName}
                        name="AccountName"
                        placeholder="Account Name"
                        onChange={handleAccountNameChange}
                    />
                    <label className="text-white">Account ID</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="number"
                        value={accountID}
                        name="AccountID"
                        placeholder="Account ID"
                        onChange={handleAccountIDChange}
                    />
                    <label className="text-white">Sell/Purchase</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        value={reasonInvoice}
                        name="ReasonInvoice"
                        placeholder="Reason for Invoice"
                        onChange={handleReasonInvoiceChange}
                    />
                    <label className="text-white">Total Price</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="text"
                        value={totalPrice}
                        name="TotalPrice"
                        placeholder="$$$$"
                        onChange={handleTotalPriceChange}
                    />
                    <label className="text-white">Date</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="date"
                        value={date}
                        name="Date"
                        onChange={handleDateChange}
                    />
                </div>
            </form>
        </div>
    );
}
