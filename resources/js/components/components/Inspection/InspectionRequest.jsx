import React, {useEffect, useState} from "react";
import axios from "../../axiosConfig";
export default function InvoiceNew() {

    return (
        <div className="m-16 min-h-full">
                <LandInformation  />
        </div>
    );
}


function LandInformation() {

    const [farmerCropData, setFarmerCropData] = useState([]);
    const [farmerFarmData, setFarmerFarmData] = useState([]);
    const [data, setData] = useState({
        farmId: 0,
        cropId: 0,
        requestDate: '',
    });
    const submitForm = async() => {
        try {
            const formData = {
                data,
            };

            const response = await axios.post('/createCropAuthentication', formData);

            if (response) {
                console.log("Data successfully sent");
            } else {
                console.error("Failed to send data:", response.status);
            }
        } catch (error) {
            console.error("Error sending data:", error);
        }
    }
    useEffect(() => {
        const fetchFarm = async () => {
            try {
                const response = await axios.get(`/farmerCropData?applyInspection=true`);
                const { data } = await response.data;
                setFarmerCropData(data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const fetchCrop = async () => {
            try {
                const response = await axios.get('/farmerFarmData');
                const { data } = await response.data;
                setFarmerFarmData(data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchFarm();
        fetchCrop();
    },[]);

    return (
        <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
            <div className="flex items-end justify-between h-[60px]">
                <h2 className="text-3xl font-bold  px-6 py-3  rounded-md">
                    Inspection
                </h2>
                <button
                    className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
                    onClick={submitForm}
                >
                    Submit
                </button>
            </div>
            <hr className="my-4 h-1 bg-white" />
            <form method="post" className="grid grid-cols-1 gap-4 mt-2">
                <div className="p-4 grid grid-cols-1 gap-4">
                    <h2 className="mx-4 mt-2 text-3xl font-bold text-black">
                        Crop Authentication
                    </h2>
                    <label className="text-white">Request Date</label>
                    <input
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        type="date"
                        name="requestDate"
                        placeholder="Request Date"
                        value={data.requestDate}
                        onChange={(e) => setData({ requestDate: e.target.value })}
                    />
                    <label className="text-white">Farm</label>
                    <select
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        name="farmId"
                        value={data.farmId}
                        onChange={(e) => setData({ ...data, farmId: e.target.value })}
                    >
                        <option value="">Select Farm</option>
                        {farmerFarmData.map((farm) => (
                            <option key={farm.id} value={farm.id}>
                                {farm.name}
                            </option>
                        ))}
                    </select>

                    <label className="text-white">Crop</label>
                    <select
                        className="w-full h-10 px-4 rounded-xl border-2 border-white"
                        name="cropId"
                        value={data.cropId}
                        onChange={(e) => setData({ ...data, cropId: e.target.value })}
                    >
                        <option value="">Select Crop</option>
                        {farmerCropData.map((crop) => (
                            <option key={crop.id} value={crop.id}>
                                {crop.name}
                            </option>
                        ))}
                    </select>

                </div>
            </form>
        </div>
    );
}

//
// function CropInformation({ nextForm }) {
//     const [cropName, setCropName] = useState("");
//     const [cropID, setCropID] = useState("");
//     const [plantDate, setPlantDate] = useState("");
//     const [harvestDate, setHarvestDate] = useState("");
//
//     return (
//         <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
//             <div className="flex items-end justify-between h-[60px]">
//                 <h2 className="text-3xl font-bold  px-6 py-3  rounded-md">
//                     Create Invoice
//                 </h2>
//                 <button
//                     className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
//                     onClick={nextForm}
//                 >
//                     Next
//                 </button>
//             </div>
//             <hr className="my-4 h-1 bg-white" />
//             {/* Assuming Progress2 is a component you've imported */}
//             <Progress2 level={2} />
//             <form action="" className="grid grid-cols-1 gap-4 mt-2">
//                 <div className="p-4 grid grid-cols-1 gap-4">
//                     <h2 className="mx-4 mt-2 text-3xl font-bold text-black">
//                         Crop Information
//                     </h2>
//                     <label className="text-white">Crop Name</label>
//                     <input
//                         className="w-full h-10 px-4 rounded-xl border-2 border-white"
//                         type="text"
//                         name="cropName"
//                         value={cropName}
//                         placeholder="Crop Name"
//                         onChange={(e) => setCropName(e.target.value)}
//                     />
//                     <label className="text-white">Crop Id</label>
//                     <input
//                         className="w-full h-10 px-4 rounded-xl border-2 border-white"
//                         type="text"
//                         name="cropID"
//                         value={cropID}
//                         placeholder="Crop ID"
//                         onChange={(e) => setCropID(e.target.value)}
//                     />
//                     <label className="text-white">Plantation Date</label>
//                     <input
//                         className="w-full h-10 px-4 rounded-xl border-2 border-white"
//                         type="date"
//                         name="plantDate"
//                         value={plantDate}
//                         placeholder="Plant Date"
//                         onChange={(e) => setPlantDate(e.target.value)}
//                     />
//                     <label className="text-white">Harvest Date</label>
//                     <input
//                         className="w-full h-10 px-4 rounded-xl border-2 border-white"
//                         type="date"
//                         name="harvestDate"
//                         placeholder="Harvest Date"
//                         value={harvestDate}
//                         onChange={(e) => setHarvestDate(e.target.value)}
//                     />
//                 </div>
//             </form>
//         </div>
//     );
// }
//
// function SenderInformation({ onSubmit }) {
//     const [accountName, setAccountName] = useState("");
//     const [accountID, setAccountID] = useState("");
//     const [totalPrice, setTotalPrice] = useState("");
//     const [date, setDate] = useState("");
//
//     const submitForm = () => {
//         // You can perform any necessary actions with the form data here
//         // For now, let's just log the data to the console
//         console.log({
//             accountName,
//             accountID,
//             totalPrice,
//             date,
//         });
//
//         // Call the provided onSubmit function
//         if (onSubmit) {
//             onSubmit({
//                 accountName,
//                 accountID,
//                 totalPrice,
//                 date,
//             });
//         }
//     };
//
//     return (
//         <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
//             <div className="flex items-end justify-between h-[60px]">
//                 <h2 className="text-3xl font-bold  px-6 py-3  rounded-md">
//                     Create Invoice
//                 </h2>
//                 <button
//                     className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg"
//                     onClick={submitForm}
//                 >
//                     Finish
//                 </button>
//             </div>
//             <hr className="my-4 h-1 bg-white" />
//             {/* Assuming Progress2 is a component you've imported */}
//             <Progress2 level={3} />
//             <form method="post" className="grid grid-cols-1 gap-4 mt-2">
//                 <div className="p-4 grid grid-cols-1 gap-4">
//                     <h2 className="mx-4 mt-2 text-3xl font-bold text-black">
//                         Sender Information
//                     </h2>
//                     <label className="text-white">Name</label>
//                     <input
//                         className="w-full h-10 px-4 rounded-xl border-2 border-white"
//                         type="text"
//                         value={accountName}
//                         name="AccountName"
//                         placeholder="Account Name"
//                         onChange={(e) => setAccountName(e.target.value)}
//                     />
//                     <label className="text-white">Account ID</label>
//                     <input
//                         className="w-full h-10 px-4 rounded-xl border-2 border-white"
//                         type="number"
//                         value={accountID}
//                         name="AccountID"
//                         placeholder="Account ID"
//                         onChange={(e) => setAccountID(e.target.value)}
//                     />
//
//                     <label className="text-white">Total Price</label>
//                     <input
//                         className="w-full h-10 px-4 rounded-xl border-2 border-white"
//                         type="text"
//                         value={totalPrice}
//                         name="TotalPrice"
//                         placeholder="$$$$"
//                         onChange={(e) => setTotalPrice(e.target.value)}
//                     />
//                     <label className="text-white">Date</label>
//                     <input
//                         className="w-full h-10 px-4 rounded-xl border-2 border-white"
//                         type="date"
//                         value={date}
//                         name="Date"
//                         onChange={(e) => setDate(e.target.value)}
//                     />
//                 </div>
//             </form>
//         </div>
//     );
// }
