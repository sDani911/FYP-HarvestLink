import React, { useState } from "react";
import DataTable from "react-data-table-component";
import add from '../../assets/icons/add.png'
// import generate from '../../assets/icons/create.png'
import view from '../../assets/icons/path-a-to-b.png';
import { useNavigate, Link } from 'react-router-dom';

export default function RouteLanding() {

  const [selectedRows, setSelectedRows] = useState([]); // Initialize as an empty array
  const navigate = useNavigate();
  const handleView = (row) => {
    if (selectedRows.length > 0) {
      // Redirect to InvoiceView with selectedRows data
      console.log(selectedRows[0].batchId);

      navigate('/RouteView', { state: { batchId: selectedRows[0].batchId, date: selectedRows[0].dateCreated, Id: selectedRows[0].id, invoiceNumber: selectedRows[0].invoiceNumber, invoiceTitle: selectedRows[0].invoiceTitle, status: selectedRows[0].status } });
    }
    else {
      alert('No Invoice selected.\nPlease select invoice to view');
    }
  };
  const handleRowClick = (selectedRows) => {
    setSelectedRows(selectedRows.selectedRows);
    console.log(selectedRows.selectedRows)
  };
  const [isHovered, setIsHovered] = useState(false);


  const data = [
    { id: 1, route: 'Route 1', date: '2023-01-01', pickupTime: '10:00 AM', dropoffTime: '2:00 PM', company: 'Company 1', status: 'Completed', actions: null },
    { id: 2, route: 'Route 2', date: '2023-01-02', pickupTime: '11:30 AM', dropoffTime: '3:30 PM', company: 'Company 2', status: 'Pending', actions: null },
    { id: 3, route: 'Route 3', date: '2023-01-03', pickupTime: '9:45 AM', dropoffTime: '1:45 PM', company: 'Company 3', status: 'Failed', actions: null },
    { id: 4, route: 'Route 4', date: '2023-01-04', pickupTime: '1:00 PM', dropoffTime: '5:00 PM', company: 'Company 4', status: 'Completed', actions: null },
    { id: 5, route: 'Route 5', date: '2023-01-05', pickupTime: '10:30 AM', dropoffTime: '2:30 PM', company: 'Company 5', status: 'Pending', actions: null },
    { id: 6, route: 'Route 6', date: '2023-01-06', pickupTime: '12:15 PM', dropoffTime: '4:15 PM', company: 'Company 6', status: 'Failed', actions: null },
    { id: 7, route: 'Route 7', date: '2023-01-07', pickupTime: '2:30 PM', dropoffTime: '6:30 PM', company: 'Company 7', status: 'Completed', actions: null },
    { id: 8, route: 'Route 8', date: '2023-01-08', pickupTime: '8:00 AM', dropoffTime: '12:00 PM', company: 'Company 8', status: 'Pending', actions: null },
    { id: 9, route: 'Route 9', date: '2023-01-09', pickupTime: '11:45 AM', dropoffTime: '3:45 PM', company: 'Company 9', status: 'Failed', actions: null },
    { id: 10, route: 'Route 10', date: '2023-01-10', pickupTime: '3:15 PM', dropoffTime: '7:15 PM', company: 'Company 10', status: 'Completed', actions: null },
  ];
  const columns = [
    {
      name: 'Sr.',
      selector: 'id',

      width: '75px',
    },
    {
      name: 'Route',
      selector: 'route',

      width: '200px',
    },
    {
      name: 'Start Date',
      selector: 'date',

      width: '150px',
    },
    {
      name: 'End Date',
      selector: 'date',

      width: '150px',
    },
    {
      name: 'Start Time',
      selector: 'pickupTime',

      width: '175px',
    },
    {
      name: 'End Time',
      selector: 'dropoffTime',

      width: '175px',
    },
    {
      name: 'Company',
      selector: 'company',

      width: '100px',
    },
    {
      name: 'Status',
      selector: 'status',

      width: '150px',
    },
    {
      name: 'View',
      selector: 'actions',

      width: '250px',
      cell: row => (
        <div className="flex flex-row items-center justify-center">
          <button onClick={() => handleView(row)}>     <img src={view} alt="view" className="w-6 h-6 mx-[9.75px]" /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-16 sm:mx-8 md:mx-16 mb-10 mt-6">
      <div className="flex flex-row items-center justify-between">
        <b><h1 className="my-6 sm:text-2xl md:text-4xl ">Routes</h1></b>
        <Link to='/RouteCreate'>
          <button
            className={`flex items-center justify-between  px-2.5 py-1 rounded-3xl bg-[#4663CC] text-white text-l ${isHovered ? 'overflow-visible btn-expand-animate width' : 'overflow-hidden width btn-expand-animate'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img className="w-4 h-4 m-2 sm:w-5 sm:h-5 md:w-7 md:h-7" src={add} alt="new invoice" />
            {isHovered && <span className="p-1">Create Route</span>}
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
