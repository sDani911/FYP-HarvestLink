import React, {useEffect, useState} from "react";
import axios from "../../axiosConfig";
import {useParams} from "react-router";
export default function RouteView() {
    const { id } = useParams();
    const [routeData, setRouteData] = useState([]);
    const [driverData, setDriverData] = useState([]);
    const [data, setData] = useState({
        driverId: 0,
    });

    const submitForm = async() => {
        try {

            const response = await axios.post(`/AssignDriverToRoute/${id}`, data);
            if (response) {
                setRouteData(response.data.data.data)
                console.log("Data successfully sent");
            } else {
                console.error("Failed to send data:", response.status);
            }
        } catch (error) {
            console.error("Error sending data:", error);
        }
    }
    useEffect(() => {
        const fetchRoute = async () => {
            try {
                const response = await axios.get(`/ShippingCompanyRouteData/${id}`);
                const { data } = await response.data;
                setRouteData(data);
                fetchDriver(data.shipping_company_id);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const fetchDriver = async (id) => {
            try {
                const response = await axios.get(`/ShippingCompanyDriverList`);
                const { data } = await response.data;
                setDriverData(data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchRoute();
    }, [id]);

    return (
        <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
            <div className="flex items-end justify-between h-[60px]">
                <h2 className="text-3xl font-bold  px-6 py-3  rounded-md">
                    Assign Driver To Route
                </h2>
                <button
                    className={`bg-blue-600 text-white text-xl px-4 py-2 rounded-lg `}
                    onClick={submitForm}
                >
                    Submit
                </button>
            </div>
            <hr className="my-4 h-1 bg-white" />
            <form method="post" className="grid grid-cols-1 gap-4 mt-2">
                <div className="p-4 grid grid-cols-1 gap-4">
                        <div className="p-4 grid grid-cols-1 gap-4">
                            <h2 className="mx-4 mt-2 text-3xl font-bold text-black">
                                Driver
                            </h2>
                            <label className="text-white">Select Driver</label>
                            <select
                                className="w-full h-10 px-4 rounded-xl border-2 border-white"
                                name="driverId"
                                value={data.driverId}
                                onChange={(e) => setData({ ...data, driverId: e.target.value })}
                            >
                                <option value="">Select Driver</option>
                                {driverData.map((driver) => (
                                    <option key={driver.id} value={driver.id}>
                                        {driver.user.first_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    <h2 className="mx-4 mt-2 text-3xl font-bold text-black">
                        Route Details
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
                                <td className="border p-2 capitalize">Driver</td>
                                <td className="border p-2">{routeData.driver_id ? routeData.driver.user.first_name : 'UnAssigned'}</td>
                            </tr>
                            <tr>
                                <td className="border p-2 capitalize">Pickup Location</td>
                                <td className="border p-2">{routeData.pickup_location} </td>
                            </tr>
                            <tr>
                                <td className="border p-2 capitalize">Delivery Location</td>
                                <td className="border p-2">{routeData.delivery_location} </td>
                            </tr>
                            <tr>
                                <td className="border p-2 capitalize">Pickup Date & Time</td>
                                <td className="border p-2">{routeData.pickup_time} </td>
                            </tr>
                            <tr>
                                <td className="border p-2 capitalize">Delivery Date & Time</td>
                                <td className="border p-2">{routeData.delivery_time} </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </form>
        </div>
    );
}
