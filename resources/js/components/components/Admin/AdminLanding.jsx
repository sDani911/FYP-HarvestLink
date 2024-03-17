import React, { useState } from "react";
import DataTable from "react-data-table-component";
import add from '../../assets/icons/add.png'
import generate from '../../assets/icons/create.png'
import view from '../../assets/icons/eye.png';
import dump from '../../assets/icons/delete.png';
import { useNavigate, Link } from 'react-router-dom';

export default function AdminLanding() {

    const [selectedRows, setSelectedRows] = useState([]); // Initialize as an empty array
    const navigate = useNavigate();


    const handleDelete = (row) => {
        if (selectedRows.length > 0) {
            navigate('/DeleteRole', { state: row });
        }
        else {
            alert('No Role selected.\nPlease select invoice to view');
        }
    };



    const handleRowClick = (selectedRows) => {
        setSelectedRows(selectedRows.selectedRows);
        console.log(selectedRows.selectedRows)
    };


    const handleView = (row) => {
        if (selectedRows.length > 0) {
            navigate('/ViewRole', { state: row });
        }
        else {
            alert('No Role selected.\nPlease select invoice to view');
        }
    };

    const handleEdit = (row) => {
        if (selectedRows.length > 0) {
            navigate('/EditRole', { state: row });
        }
        else {
            alert('No Role selected.\nPlease select invoice to view');
        }
    };




    const columns = [
        // {
        //     name: 'Sr.',
        //     selector: row => row.id,
        //
        //     width: '75px',
        // },
        {
            name: 'Role Id',
            selector: row => row.RoleId,

            width: '100px',
        },
        {
            name: 'Role',
            selector: row => row.Role,

            width: '200px',
        },
        {
            name: 'Description',
            selector: row => row.Description,

            width: '600px',
        },
        {
            name: 'Permission #',
            selector: row => row.Permission,
            sortable: false,
            width: '150px',
        },
        {
            name: 'Permissions',
            selector: row => row.Per,
            sortable: false,
            width: '150px',
        },
        {
            name: 'View Edit Delete',
            selector: 'actions',
            sortable: false,
            width: '150px',
            cell: row => (
                <div className="flex flex-row items-center justify-center">
                    <button onClick={() => handleView(row)}><img src={view} alt="view" className="w-6 h-6 mx-[9.75px]" /></button>
                    <button onClick={() => handleEdit(row)}> <img src={generate} alt="generate" className="w-6 h-6 mx-[9.75px]" /></button>
                    <button onClick={() => handleDelete(row)}><img src={dump} alt="delete" className="w-6 h-6 mx-[9.75px]" /></button>
                </div>
            ),
        },
    ];

    const data = [
        { id: 1, RoleId: 'R001', Role: 'Farmer', Description: 'Responsible for growing crops and raising livestock.', Permission: '15/20' },
        { id: 2, RoleId: 'R002', Role: 'Manufacturer', Description: 'Responsible for processing raw materials into finished products.', Permission: '18/20' },
        { id: 3, RoleId: 'R003', Role: 'Shipping', Description: 'Responsible for transporting goods from manufacturing facilities to distribution centers.', Permission: '16/20' },
        { id: 4, RoleId: 'R004', Role: 'Wholesaler', Description: 'Responsible for purchasing goods in bulk from manufacturers and selling them to retailers.', Permission: '17/20' },
        { id: 5, RoleId: 'R005', Role: 'Retailer', Description: 'Responsible for selling goods directly to consumers.', Permission: '19/20' },
        { id: 6, RoleId: 'R006', Role: 'Distributor', Description: 'Responsible for managing the distribution of goods to various retail outlets.', Permission: '16/20' },
        { id: 7, RoleId: 'R007', Role: 'Logistics Manager', Description: 'Responsible for overseeing the transportation and storage of goods.', Permission: '18/20' },
        { id: 8, RoleId: 'R008', Role: 'Quality Control Inspector', Description: 'Responsible for ensuring that products meet quality standards before they are shipped.', Permission: '16/20' },
        { id: 9, RoleId: 'R009', Role: 'Inventory Manager', Description: 'Responsible for monitoring and managing inventory levels to ensure efficient operations.', Permission: '17/20' },
        { id: 10, RoleId: 'R010', Role: 'Customer Service', Description: 'Responsible for providing assistance and support to customers.', Permission: '19/20' },
    ];


    const [isAppointmentHovered, setIsAppointmentHovered] = useState(false);
    const [isAddRoleHovered, setIsAddRoleHovered] = useState(false);

    return (
        <div className="mx-16 sm:mx-8 md:mx-16 mb-10 mt-6">
            <div className="flex flex-row items-center justify-between">
                <b><h1 className="my-6 sm:text-2xl md:text-4xl ">Admin Role</h1></b>
                <div className="flex flex-row items-center justify-between w-[350px]">
                    <Link to='/Appointment'>
                        <button
                            className={`flex items-center justify-center p-2.5 w-[150] mx-4 rounded-3xl bg-blue-500 text-white text-xl text-black`}
                        >
                            {/* <img className="w-4 h-4 m-2 sm:w-5 sm:h-5 md:w-7 md:h-7" src={add} alt="appointment" /> */}
                            Appointment
                        </button>
                    </Link>
                    <Link to='/AddRole'>
                        <button
                            className={`flex items-center justify-center p-2.5 w-[150px] mx-4 rounded-3xl bg-green-500 text-white text-xl`}
                        >
                            {/* <img className="w-4 h-4 m-2 sm:w-5 sm:h-5 md:w-7 md:h-7" src={add} alt="add_role" /> */}
                            Add Role
                        </button>
                    </Link>
                </div>

            </div>
            <hr className="my-4" />
            <div className="flex items-end justify-end">
                <div class="flex items-center justify-center">
                    <div class="rounded-lg  bg-transparent p-5">
                        <div class="flex">
                            <div class="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                                <svg viewBox="0 0 20 20" aria-hidden="true" class="pointer-events-none absolute w-5 fill-gray-500 transition">
                                    <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                                </svg>
                            </div>
                            <input type="text" class="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0" placeholder="" id="" />
                            <input type="button" value="Search" class="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-full sm:w-auto">
                <div className="my-4 sm:my-0 border-2 border-white z-[-20]">
                    <DataTable
                        title="Roles"
                        columns={columns}
                        data={data}
                        className="rdt_Table"
                        selectableRows
                        fixedHeader
                        pagination
                        selectableRowsHighlight={true}
                        pointerOnHover={true}
                        highlightOnHover={true}
                        onSelectedRowsChange={handleRowClick}
                    />
                </div>
            </div>
        </div>
    )
}
