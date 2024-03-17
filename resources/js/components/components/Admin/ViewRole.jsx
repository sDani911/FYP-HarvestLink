import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import edit from '../../assets/icons/create.png'
import dump from '../../assets/icons/delete.png';
export default function ViewRole() {
    // Access state data passed from the previous page
    const location = useLocation();
    const navigate = useNavigate();
    const roleData = location.state;
    const handleEdit = () => { 
        navigate('/EditRole', { state: roleData });    };
    const handleDelete = () => { };
    return (
        <div className="mx-16 sm:mx-8 md:mx-16 mb-10 mt-6">
            <div className="flex flex-row items-center justify-between">
                <span><b><h1 className="my-6 sm:text-2xl md:text-4xl">View Role</h1></b></span>
                <span className="flex items-center justify-evenly w-60 mx-5">
                    <button onClick={handleEdit} className=" hover:border hover:border-gray hover:opacity-100 border border-gray opacity-70 rounded-3xl w-16 p-2 hover:bg-gray-300  "> <center><img className="w-6 h-6 mx-[9.75px]" src={edit} alt="Edit" /></center> </button>
                    <button onClick={handleDelete} className="border border-solid border-gray rounded-3xl w-16 p-2 bg-gray-300 opacity-70 hover:opacity-100"> <center><img className="w-6 h-6 mx-[9.75px]" src={dump} alt="Delete" /></center></button>
                </span>

            </div>
            <div className="md:w-full sm:w-auto flex items-center justify-center h-full min-h-[550px]">
                <table className="border border-black divide-solid" style={{ width: '600px' }}>
                    <tbody>
                        <tr>
                            <td className="border border-black p-2 w-40">
                                <span className="mr-5">Title</span>
                            </td>
                            <td className="border border-black p-2 w-full h-full">
                                <span className="ml-5">{roleData.Role}</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 w-40">
                                <span className="mr-5">Description</span>
                            </td>
                            <td className="border border-black p-2 w-full h-full">
                                <span className="ml-5">{roleData.Description}</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 w-40">
                                <span className="mr-5">Number of Permission</span>
                            </td>
                            <td className="border border-black p-2 w-full h-full">
                                <span className="ml-5">{roleData.Permission}</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 w-40">
                                <span className="mr-5">Permission</span>
                            </td>
                            <td className="border border-black p-2 w-full h-full">
                                <span className="ml-5">{roleData.Permission}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    );
}
