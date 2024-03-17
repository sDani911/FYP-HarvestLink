import React, {useEffect, useState} from "react";
import axios from "../../axiosConfig";
import {useParams} from "react-router";
export default function AddCropToMarketPlace() {
    const { id } = useParams();
    const [farmerCropData, setFarmerCropData] = useState([]);
    const [data, setData] = useState({
        cropId: 0,
        description: '',
        sellingPrice: 0,
    });

    const [uploadedImageNames, setUploadedImageNames] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        setUploadedImageNames((prevImageNames) => [
            ...prevImageNames,
            ...files.map((file) => file.name)
        ]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreviews((prevPreviews) => [...prevPreviews, event.target.result]);
            };
            reader.readAsDataURL(file);
        });
    };
    const removeImage = (index) => {
        setUploadedImageNames((prevNames) => prevNames.filter((_, i) => i !== index));
        setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    };
    const submitForm = async() => {
        try {
            const formData = new FormData();
            formData.append('sellingPrice', data.sellingPrice);
            formData.append('description', data.description);
            imagePreviews.forEach((image, index) => {
                formData.append('images[]', image);
            });
            const response = await axios.post(`/placeCropOnMarketPlace/${id}`, formData);
            if (response) {
                setFarmerCropData(response.data.data.data)
                console.log("Data successfully sent");
            } else {
                console.error("Failed to send data:", response.status);
            }
        } catch (error) {
            console.error("Error sending data:", error);
        }
    }
    useEffect(() => {
        const fetchCrop = async () => {
            try {
                const response = await axios.get(`/crop/${id}`);
                const { data } = await response.data;
                setFarmerCropData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchCrop();
    }, [id]);

    return (
        <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
            <div className="flex items-end justify-between h-[60px]">
                <h2 className="text-3xl font-bold  px-6 py-3  rounded-md">
                    Add Crop To MarketPlace
                </h2>
                <button
                    className={`bg-blue-600 text-white text-xl px-4 py-2 rounded-lg ${farmerCropData.selling_price ? 'hidden' : ''}`}
                    onClick={submitForm}
                >
                    Submit
                </button>
            </div>
            <hr className="my-4 h-1 bg-white" />
            <form method="post" className="grid grid-cols-1 gap-4 mt-2">
                <div className="p-4 grid grid-cols-1 gap-4">

                    {!farmerCropData.selling_price && (
                        <div className="p-4 grid grid-cols-1 gap-4">
                            <h2 className="mx-4 mt-2 text-3xl font-bold text-black">
                                On Marketplace
                            </h2>
                            <label className="text-white">Selling Price</label>
                            <input
                                className="w-full h-10 px-4 rounded-xl border-2 border-white"
                                type="number"
                                name="sellingPrice"
                                placeholder="Selling Price"
                                value={data.sellingPrice}
                                onChange={(e) => setData({  ...data,sellingPrice: e.target.value })}
                            />
                            <label className="text-white">Description</label>
                            <input
                                className="w-full h-10 px-4 rounded-xl border-2 border-white"
                                type="text"
                                name="description"
                                placeholder="Give Some Details"
                                value={data.description}
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                            />
                            <label className="text-white">Upload Images</label>
                            <input
                                className="w-full h-10 px-4 rounded-xl border-2 border-white"
                                type="file"
                                name="images"
                                multiple
                                onChange={(e) => handleImageUpload(e)}
                            />
                            {uploadedImageNames.length > 0 && (
                                <div className="text-white">
                                    <p>Uploaded Images:</p>
                                    <ul>
                                        {uploadedImageNames.map((imageName, index) => (
                                            <li key={index} className="flex justify-between">
                                                <span>{imageName}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="ml-auto text-red-500"
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <hr className="my-4 h-1 bg-white" />
                        </div>
                    )
                    }

                    <h2 className="mx-4 mt-2 text-3xl font-bold text-black">
                        Crop Details
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border text-white">
                            <thead>
                            <tr>
                                <th className="border p-2">Field</th>
                                <th className="border p-2">Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="border p-2 capitalize">Name</td>
                                <td className="border p-2">{farmerCropData.name}</td>
                            </tr>
                            <tr className={` ${farmerCropData.status ? '' : 'hidden'}`}>
                                <td className="border p-2 capitalize">Status</td>
                                <td className="border p-2">{farmerCropData.status} </td>
                            </tr>
                            <tr>
                                <td className="border p-2 capitalize">Quantity</td>
                                <td className="border p-2">{farmerCropData.quantity} {farmerCropData.unit}</td>
                            </tr>
                            <tr className={` ${farmerCropData.selling_price ? '' : 'hidden'}`}>
                                <td className="border p-2 capitalize">Selling Price</td>
                                <td className="border p-2">{farmerCropData.selling_price} </td>
                            </tr>
                            <tr>
                                <td className="border p-2 capitalize">Seed Price</td>
                                <td className="border p-2">{farmerCropData.seed_price} </td>
                            </tr>
                            <tr>
                                <td className="border p-2 capitalize">Fertilizer</td>
                                <td className="border p-2">{farmerCropData.fertilizer_name} </td>
                            </tr>
                            <tr>
                                <td className="border p-2 capitalize">Fertilizer Price</td>
                                <td className="border p-2">{farmerCropData.fertilizer_price} </td>
                            </tr>
                            <tr>
                                <td className="border p-2 capitalize">Start Date</td>
                                <td className="border p-2">{farmerCropData.start_date} </td>
                            </tr>
                            <tr>
                                <td className="border p-2 capitalize">End Date</td>
                                <td className="border p-2">{farmerCropData.end_date} </td>
                            </tr>
                            <tr className={` ${farmerCropData.description ? '' : 'hidden'}`}>
                            <td className="border p-2 capitalize">Description</td>
                                <td className="border p-2">{farmerCropData.description} </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </form>
        </div>
    );
}
