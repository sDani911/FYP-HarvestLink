import React, { useState } from "react";
import DataTable from "react-data-table-component";
import add from '../../assets/icons/add.png'
import generate from '../../assets/icons/create.png'
import view from '../../assets/icons/eye.png';
import dump from '../../assets/icons/delete.png';
import { useNavigate, Link } from 'react-router-dom';

export default function Appointment() {

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
        {
            name: 'Sr.',
            selector: (row, index) => index + 1,

            width: '75px',
        },
        {
            name: 'Full Name',
            selector: row => row.FullName,

            width: '200px',
        },
        {
            name: 'CNIC',
            selector: row => row.CNIC,

            width: '200px',
        },
        {
            name: 'Email',
            selector: row => row.Email,
            sortable: false,
            width: '200px',
        },
        {
            name: 'Phone',
            selector: row => row.Phone,
            sortable: false,
            width: '150px',
        },
        {

            name: 'Action',
            selector: 'actions',
            sortable: false,
            width: '150px',
            cell: row => (
                <div className="flex flex-row items-center justify-center">
                   <button className="" onClick={()=>navigate('/AdminCreate')}>Create Role</button>
                    {/* <button onClick={() => handleView(row)}><img src={view} alt="view" className="w-6 h-6 mx-[9.75px]" /></button>
                    <button onClick={() => handleEdit(row)}> <img src={generate} alt="generate" className="w-6 h-6 mx-[9.75px]" /></button>
                    <button onClick={() => handleDelete(row)}><img src={dump} alt="delete" className="w-6 h-6 mx-[9.75px]" /></button> */}
                </div>
            ),
        },
    ];

    const data = [
        { Sr: 1, FullName: 'John Doe', CNIC: '12345-6789012-3', Email: 'john.doe@example.com', Phone: '+1234567890' },
        { Sr: 2, FullName: 'Jane Smith', CNIC: '23456-7890123-4', Email: 'jane.smith@example.com', Phone: '+1987654321' },
        { Sr: 3, FullName: 'David Johnson', CNIC: '34567-8901234-5', Email: 'david.johnson@example.com', Phone: '+1122334455' },
        { Sr: 4, FullName: 'Emily Brown', CNIC: '45678-9012345-6', Email: 'emily.brown@example.com', Phone: '+1654321879' },
        { Sr: 5, FullName: 'Michael Wilson', CNIC: '56789-0123456-7', Email: 'michael.wilson@example.com', Phone: '+1765432987' },
        { Sr: 6, FullName: 'Sarah Martinez', CNIC: '67890-1234567-8', Email: 'sarah.martinez@example.com', Phone: '+1987654321' },
        { Sr: 7, FullName: 'Christopher Taylor', CNIC: '78901-2345678-9', Email: 'christopher.taylor@example.com', Phone: '+1122334455' },
        { Sr: 8, FullName: 'Jessica Anderson', CNIC: '89012-3456789-0', Email: 'jessica.anderson@example.com', Phone: '+1234567890' },
        { Sr: 9, FullName: 'Daniel Thomas', CNIC: '90123-4567890-1', Email: 'daniel.thomas@example.com', Phone: '+1765432987' },
        { Sr: 10, FullName: 'Amanda Hernandez', CNIC: '01234-5678901-2', Email: 'amanda.hernandez@example.com', Phone: '+1654321879' },
    ];


   return (
        <div className="mx-16 sm:mx-8 md:mx-16 mb-10 mt-6">
            <div className="flex flex-row items-center justify-between">
                <b><h1 className="my-6 sm:text-2xl md:text-4xl ">Appointment</h1></b>

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
                        title="Appointments"
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
