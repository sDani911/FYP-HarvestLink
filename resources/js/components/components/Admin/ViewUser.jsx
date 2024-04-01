import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import edit from '../../assets/icons/create.png';
export default function ViewUser() {
    // Access state data passed from the previous page
    const location = useLocation();
    const navigate = useNavigate();
    const Data = location.state;
    const handleEdit = () => {
        navigate('/EditUser', { state: Data });
    };

    return (
        <div className="mx-16 sm:mx-8 md:mx-16 mb-10 mt-6">
            <div className="flex flex-row items-center justify-between">
                <span><b><h1 className="my-6 sm:text-2xl md:text-4xl">User Details {Data.id}</h1></b></span>
                <span className="flex items-center justify-evenly w-60 mx-5">
                    <button onClick={handleEdit} className=" hover:border hover:border-gray hover:opacity-100 border border-gray opacity-70 rounded-3xl w-16 p-2 hover:bg-gray-300  "> <center><img className="w-6 h-6 mx-[9.75px]" src={edit} alt="Edit" /></center> </button>
                </span>
            </div>
            <div className="md:w-full sm:w-auto flex items-center justify-center h-full min-h-[550px]">
                <table className="border border-black divide-solid" style={{ width: '800px' }}>
                    <tbody>
                        <tr>
                            <td className="border border-black p-2 ">
                                <span className="mr-5">Role</span>
                            </td>
                            <td className="border border-black p-2  h-full">
                                <span className="ml-5">{Data.role.title}</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 ">
                                <span className="mr-5">Status</span>
                            </td>
                            <td className="border border-black p-2 w-full h-full">
                                <span className="ml-5">{Data.status}</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 ">
                                <span className="mr-5">First Name</span>
                            </td>
                            <td className="border border-black p-2  h-full">
                                <span className="ml-5">{Data.first_name}</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 ">
                                <span className="mr-5">Last Name</span>
                            </td>
                            <td className="border border-black p-2 w-full h-full">
                                <span className="ml-5">{Data.last_name}</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 ">
                                <span className="mr-5">DOB</span>
                            </td>
                            <td className="border border-black p-2 w-full h-full">
                                <span className="ml-5">{Data.dob}</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 ">
                                <span className="mr-5">Cnic</span>
                            </td>
                            <td className="border border-black p-2 w-full h-full">
                                <span className="ml-5">{Data.cnic}</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 ">
                                <span className="mr-5">Cnic Expiry</span>
                            </td>
                            <td className="border border-black p-2 w-full h-full">
                                <span className="ml-5">{Data.cnic_expiry}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
