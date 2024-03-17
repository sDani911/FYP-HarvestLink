import React, { useState } from "react";
import DataTable from "react-data-table-component";
import add from '../../assets/icons/add.png'
import generate from '../../assets/icons/create.png'
import view from '../../assets/icons/eye.png';
import dump from '../../assets/icons/delete.png';
import request from '../../assets/icons/request.png';
import { useNavigate, Link } from 'react-router-dom';
import InvoiceView from "./InvoiceView";

export default function Invoice() {

    const [selectedRows, setSelectedRows] = useState([]); // Initialize as an empty array
    const navigate = useNavigate();

    const handleView = (row) => {
        if (selectedRows.length > 0) {
            // Redirect to InvoiceView with selectedRows data
            console.log(selectedRows[0].batchId);

            navigate('/InvoiceView', { state: { batchId: selectedRows[0].batchId, date: selectedRows[0].dateCreated, Id:selectedRows[0].id,invoiceNumber:selectedRows[0].invoiceNumber,invoiceTitle:selectedRows[0].invoiceTitle,status:selectedRows[0].status} });
        }
        else {
            alert('No Invoice selected.\nPlease select invoice to view');
        }
    };

    const handleGenerate = () => { }
    const handleDelete = () => { }
    const handleRequest = () => { }



    const handleRowClick = (selectedRows) => {
        setSelectedRows(selectedRows.selectedRows);
        console.log(selectedRows.selectedRows)
    };


    const data = [
        { id: 1, batchId: 'B123', invoiceNumber: 'INV-001', invoiceTitle: 'Menu Manufacturing', dateCreated: '2023-01-01', status: 'Completed', actions: null },
        { id: 2, batchId: 'B456', invoiceNumber: 'INV-002', invoiceTitle: 'Crops', dateCreated: '2023-01-02', status: 'Pending', actions: null },
        { id: 3, batchId: 'B789', invoiceNumber: 'INV-003', invoiceTitle: 'Equipment Rental', dateCreated: '2023-01-03', status: 'Failed', actions: null },
        { id: 4, batchId: 'B987', invoiceNumber: 'INV-004', invoiceTitle: 'Farm Services', dateCreated: '2023-01-04', status: 'Completed', actions: null },
        { id: 5, batchId: 'B654', invoiceNumber: 'INV-005', invoiceTitle: 'Harvesting', dateCreated: '2023-01-05', status: 'Pending', actions: null },
        { id: 6, batchId: 'B321', invoiceNumber: 'INV-006', invoiceTitle: 'Menu Manufacturing', dateCreated: '2023-01-06', status: 'Failed', actions: null },
        { id: 7, batchId: 'B555', invoiceNumber: 'INV-007', invoiceTitle: 'Crops', dateCreated: '2023-01-07', status: 'Completed', actions: null },
        { id: 8, batchId: 'B111', invoiceNumber: 'INV-008', invoiceTitle: 'Equipment Rental', dateCreated: '2023-01-08', status: 'Pending', actions: null },
        { id: 9, batchId: 'B888', invoiceNumber: 'INV-009', invoiceTitle: 'Farm Services', dateCreated: '2023-01-09', status: 'Failed', actions: null },
        { id: 10, batchId: 'B222', invoiceNumber: 'INV-010', invoiceTitle: 'Harvesting', dateCreated: '2023-01-10', status: 'Completed', actions: null },
    ];


    const columns = [
        {
            name: 'Sr.',
            selector: 'id',

            width: '75px',
        },
        {
            name: 'Batch ID',
            selector: 'batchId',

            width: '175px',
        },
        {
            name: 'Invoice Number',
            selector: 'invoiceNumber',

            width: '200px',
        },
        {
            name: 'Title',
            selector: 'invoiceTitle',

            width: '250px',

        },
        {
            name: 'Date of Initiation',
            selector: 'dateCreated',

            width: '250px',
        },
        {
            name: 'Status',
            selector: 'status',

            width: '100px',
        },
        {
            name: 'Generate View Delete Request',
            selector: 'actions',

            width: '250px',
            cell: row => (
                <div className="flex flex-row items-center justify-center">
                    <button onClick={() => handleGenerate(row)}> <img src={generate} alt="generate" className="w-6 h-6 mx-[9.75px]" /></button>
                    <button onClick={() => handleView(row)}>     <img src={view} alt="view" className="w-6 h-6 mx-[9.75px]" /></button>
                    <button onClick={() => handleDelete(row)}>   <img src={dump} alt="delete" className="w-6 h-6 mx-[9.75px]" /></button>
                    {/* <Link to='/InvoiceRequest'><button onClick={() => handleRequest(row)}>  <img src={request} alt="reuquest" className="w-6 h-6 mx-[9.75px]" /></button></Link> */}
                </div>
            ),
        },
    ];


    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="mx-16 sm:mx-8 md:mx-16 mb-10 mt-6">
            <div className="flex flex-row items-center justify-between">
                <b><h1 className="my-6 sm:text-2xl md:text-4xl ">Invoice</h1></b>
                <Link to='/InvoiceNew'>
                    <button
                        className={`flex items-center justify-between  px-2.5 py-1 rounded-3xl bg-[#4663CC] text-white text-xl ${isHovered ? 'overflow-visible btn-expand-animate width' : 'overflow-hidden width btn-expand-animate'}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <img className="w-4 h-4 m-2 sm:w-5 sm:h-5 md:w-7 md:h-7" src={add} alt="new invoice" />
                        {isHovered && <span className="p-1">New Invoice</span>}
                    </button>
                </Link>
            </div>
            <hr className="my-4" />
            <div className="md:w-full sm:w-auto">
                <div className="my-4 sm:my-0 border-2 border-white z-[-20]">
                    <DataTable
                        title="Invoice Billings"
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
