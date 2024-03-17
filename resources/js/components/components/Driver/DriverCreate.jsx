import React, { useState } from "react";

export default function RouteCreate() {
    const [companyId, setCompanyId] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');

    const [selectedRoute, setSelectedRoute] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    // const [selectedStartLocation, setSelectedStartLocation] = useState(''); // Add this line
    // const [selectedEndLocation, setSelectedEndLocation] = useState(''); // Add this line
    const [selectedStartTime, setSelectedStartTime] = useState('');
    const [selectedEndTime, setSelectedEndTime] = useState('');
    const [selectedSource, setSelectedSource] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');

    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');

    const addRoute = () => { };
    const checkRoute = () => { };

    return (
        <div className="m-16 min-h-full">
            <div className="flex items-end justify-between h-[60px]">
                <h2 className="text-3xl font-bold px-6 py-3 rounded-md">Route</h2>
            </div>
            <hr className="my-4 h-1 bg-white" />
            <div className="my-12 mx-10 bg-blue-800 rounded-3xl shadow-2xl p-4">
                <form method="post" className="grid grid-cols-1 gap-4 mt-2">
                    <div className="p-4 grid grid-cols-1 gap-4">
                        
                        <div className="flex items-center justify-between"><h2 className="mx-4 mt-2 text-3xl font-bold text-black">Check Existing Route</h2>
                            <button className="bg-green-600 border-solid border-1 rounded-2xl px-6 py-2" onClick={checkRoute}>Check</button>
                        </div>
                        <label className="text-white">Route</label>
                        <select
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            name="Route"
                            value={selectedRoute}
                            onChange={(e) => setSelectedRoute(e.target.value)}
                        >
                            <option value="Route1">Route 1</option>
                            <option value="Route2">Route 2</option>
                        </select>

                        <label className="text-white">Source</label>
                        <select
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            name="Source"
                            value={selectedSource}
                            onChange={(e) => setSelectedSource(e.target.value)}
                        >
                            <option value="LocA">Loc A</option>
                            <option value="LocB">Loc B</option>
                        </select>

                        <label className="text-white">Destination</label>
                        <select
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            name="Destination"
                            value={selectedDestination}
                            onChange={(e) => setSelectedDestination(e.target.value)}
                        >
                            <option value="LocC">Loc C</option>
                            <option value="LocD">Loc D</option>
                        </select>

                        <label className="text-white">Date Start</label>
                        <input
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            type="date"
                            name="StartDate"
                            value={selectedStartDate}
                            onChange={(e) => setSelectedStartDate(e.target.value)}
                        />

                        <label className="text-white">Date End</label>
                        <input
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            type="date"
                            name="EndDate"
                            value={selectedEndDate}
                            onChange={(e) => setSelectedEndDate(e.target.value)}
                        />



                    </div>
                </form>
                <hr className="my-4 h-1 bg-white" />
                <form method="post" className="grid grid-cols-1 gap-4 mt-2">
                    <div className="p-4 grid grid-cols-1 gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="mx-4 mt-2 text-3xl font-bold text-black">Create Route</h2>
                            <button className="bg-green-600 border-solid border-1 rounded-2xl px-6 py-2" onClick={addRoute}>Create</button>
                        </div>


                        <label className="text-white">Route</label>
                        <select
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            name="Route"
                            value={selectedRoute}
                            onChange={(e) => setSelectedRoute(e.target.value)}
                        >
                            <option value="Route1">Route 1</option>
                            <option value="Route2">Route 2</option>
                        </select>

                        <label className="text-white">Source</label>
                        <select
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            name="Source"
                            value={selectedSource}
                            onChange={(e) => setSelectedSource(e.target.value)}
                        >
                            <option value="LocA">Loc A</option>
                            <option value="LocB">Loc B</option>
                        </select>

                        <label className="text-white">Destination</label>
                        <select
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            name="Destination"
                            value={selectedDestination}
                            onChange={(e) => setSelectedDestination(e.target.value)}
                        >
                            <option value="LocC">Loc C</option>
                            <option value="LocD">Loc D</option>
                        </select>

                        <label className="text-white">Start Date</label>
                        <input
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            type="date"
                            name="StartDate"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />

                        <label className="text-white">End Date</label>
                        <input
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            type="date"
                            name="EndDate"
                            value={selectedDate}  //{/* Note: Using the same value as Start Date, change as needed */}
                            onChange={(e) => setSelectedDate(e.target.value)} //{/* Note: Using the same handler as Start Date, change as needed */}
                        />

                        <label className="text-white">Start Time</label>
                        <input
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            type="time"
                            name="StartTime"
                            value={selectedStartTime}
                            onChange={(e) => setSelectedStartTime(e.target.value)}
                        />

                        <label className="text-white">End Time</label>
                        <input
                            className="w-full h-10 px-4 rounded-xl border-2 border-white"
                            type="time"
                            name="EndTime"
                            value={selectedEndTime}
                            onChange={(e) => setSelectedEndTime(e.target.value)}
                        />
                    </div>
                </form>
            </div>
        </div>

    );
}
