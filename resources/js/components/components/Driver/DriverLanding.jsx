import React, { useState } from "react";
import DataTable from "react-data-table-component";
import add from '../../assets/icons/add.png'
import generate from '../../assets/icons/create.png'
import view from '../../assets/icons/eye.png';
import { useNavigate, Link } from 'react-router-dom';

export default function DriverLanding() {

    const [selectedRows, setSelectedRows] = useState([]); // Initialize as an empty array
    const navigate = useNavigate();
    const handleView = (row) => {
        if (selectedRows.length > 0) {
            // Redirect to InvoiceView with selectedRows data
            console.log(selectedRows[0].batchId);

            navigate('/DriverView', { state: { batchId: selectedRows[0].batchId, date: selectedRows[0].dateCreated, Id:selectedRows[0].id,invoiceNumber:selectedRows[0].invoiceNumber,invoiceTitle:selectedRows[0].invoiceTitle,status:selectedRows[0].status} });
        }
        else {
            alert('No Invoice selected.\nPlease select invoice to view');
        }
    };
    const handleGenerate = () => { }
    const handleRowClick = (selectedRows) => {
        setSelectedRows(selectedRows.selectedRows);
        console.log(selectedRows.selectedRows)
    };
    const [isHovered, setIsHovered] = useState(false);


    const data = [
        { id: 1, jobs: 'Crop Harvesting', date: '2023-01-01', pickupTime: '10:00 AM', dropoffTime: '2:00 PM', cost: '$100', status: 'Completed', actions: null },
        { id: 2, jobs: 'Soil Testing', date: '2023-01-02', pickupTime: '11:30 AM', dropoffTime: '3:30 PM', cost: '$120', status: 'Pending', actions: null },
        { id: 3, jobs: 'Equipment Rental', date: '2023-01-03', pickupTime: '9:45 AM', dropoffTime: '1:45 PM', cost: '$80', status: 'Failed', actions: null },
        { id: 4, jobs: 'Irrigation Services', date: '2023-01-04', pickupTime: '1:00 PM', dropoffTime: '5:00 PM', cost: '$150', status: 'Completed', actions: null },
        { id: 5, jobs: 'Crop Planting', date: '2023-01-05', pickupTime: '10:30 AM', dropoffTime: '2:30 PM', cost: '$110', status: 'Pending', actions: null },
        { id: 6, jobs: 'Pest Control', date: '2023-01-06', pickupTime: '12:15 PM', dropoffTime: '4:15 PM', cost: '$90', status: 'Failed', actions: null },
        { id: 7, jobs: 'Fertilization', date: '2023-01-07', pickupTime: '2:30 PM', dropoffTime: '6:30 PM', cost: '$130', status: 'Completed', actions: null },
        { id: 8, jobs: 'Crop Inspection', date: '2023-01-08', pickupTime: '8:00 AM', dropoffTime: '12:00 PM', cost: '$110', status: 'Pending', actions: null },
        { id: 9, jobs: 'Land Plowing', date: '2023-01-09', pickupTime: '11:45 AM', dropoffTime: '3:45 PM', cost: '$95', status: 'Failed', actions: null },
        { id: 10, jobs: 'Farm Consultation', date: '2023-01-10', pickupTime: '3:15 PM', dropoffTime: '7:15 PM', cost: '$140', status: 'Completed', actions: null },
      ];



      const columns = [
        {
          name: 'Sr.',
          selector: 'id',

          width: '75px',
        },
        {
          name: 'Jobs',
          selector: 'jobs',

          width: '200px',
        },
        {
          name: 'Date',
          selector: 'date',

          width: '150px',
        },
        {
          name: 'Pickup Time',
          selector: 'pickupTime',

          width: '175px',
        },
        {
          name: 'Dropoff Time',
          selector: 'dropoffTime',

          width: '175px',
        },
        {
          name: 'Cost',
          selector: 'cost',

          width: '100px',
        },
        {
          name: 'Status',
          selector: 'status',

          width: '150px',
        },
        {
          name: 'Generate View',
          selector: 'actions',

          width: '250px',
          cell: row => (
            <div className="flex flex-row items-center justify-center">
              <button onClick={() => handleGenerate(row)}> <img src={generate} alt="generate" className="w-6 h-6 mx-[9.75px]" /></button>
              <button onClick={() => handleView(row)}>     <img src={view} alt="view" className="w-6 h-6 mx-[9.75px]" /></button>
              {/* Uncomment the following lines when you have the corresponding functions */}
              {/* <button onClick={() => handleDelete(row)}>   <img src={dump} alt="delete" className="w-6 h-6 mx-[9.75px]" /></button> */}
              {/* <Link to='/InvoiceRequest'><button onClick={() => handleRequest(row)}>  <img src={request} alt="reuquest" className="w-6 h-6 mx-[9.75px]" /></button></Link> */}
            </div>
          ),
        },
      ];




    return (
        <div className="mx-16 sm:mx-8 md:mx-16 mb-10 mt-6">
            <div className="flex flex-row items-center justify-between">
                <b><h1 className="my-6 sm:text-2xl md:text-4xl ">Driver</h1></b>
                <Link to='/DriverCreate'>
                    <button
                        className={`flex items-center justify-between  px-2.5 py-1 rounded-3xl bg-[#4663CC] text-white text-xl ${isHovered ? 'overflow-visible btn-expand-animate width' : 'overflow-hidden width btn-expand-animate'}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <img className="w-4 h-4 m-2 sm:w-5 sm:h-5 md:w-7 md:h-7" src={add} alt="new invoice" />
                        {isHovered && <span className="p-1">Book Driver</span>}
                    </button>
                </Link>
            </div>
            <hr className="my-4" />
            <div className="md:w-full sm:w-auto">
                <div className="my-4 sm:my-0 border-2 border-white z-[-20]">
                    <DataTable

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
