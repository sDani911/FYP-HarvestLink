import React from 'react';
import { useLocation } from 'react-router-dom';
import DataTable from "react-data-table-component";

export default function InvoiceView() {
  const location = useLocation();
  const { batchId, date, Id, invoiceNumber, invoiceTitle, status } = location.state;
  let tax = 10;

  const data = [
    {
      item: 'Pixel Design System',
      price: 128.0,
      quantity: 1,
      discount: 50,
    },
    {
      item: 'Volt Dashboard Template',
      price: 69.0,
      quantity: 1,
      discount: 0,
    },
    {
      item: 'Customizable React Components Library',
      price: 95.0,
      quantity: 2,
      discount: 10,
    },
    {
      item: 'Professional Website Development Service',
      price: 500.0,
      quantity: 1,
      discount: 15,
    },
    {
      item: 'Mobile App Design Consultation',
      price: 200.0,
      quantity: 3,
      discount: 25,
    },
    {
      item: 'SEO Optimization Package',
      price: 150.0,
      quantity: 1,
      discount: 5,
    },
    {
      item: 'Socket P-11',
      price: 500.0,
      quantity: 1,
      discount: 15,
    },
    {
      item: 'Extender Component',
      price: 200.0,
      quantity: 3,
      discount: 25,
    },
    {
      item: 'Something',
      price: 150.0,
      quantity: 1,
      discount: 5,
    },


    // ... (additional entries for other items)
  ];



  data.forEach((entry) => {
    // Ensure numeric values
    entry.price = parseFloat(entry.price) || 0; // If price is not a number, default to 0
    entry.quantity = parseFloat(entry.quantity) || 0; // If quantity is not a number, default to 0
    entry.discount = parseFloat(entry.discount) || 0; // If discount is not a number, default to 0

    if (!entry.discount) {
      entry.total = entry.price * entry.quantity;
    } else {
      entry.total = entry.price * entry.quantity * (1 - entry.discount / 100);
    };
  });

  const subTotal = data.reduce((total, entry) => {
    // Ensure numeric values
    const price = parseFloat(entry.price) || 0;
    const quantity = parseFloat(entry.quantity) || 0;
    const discount = parseFloat(entry.discount) || 0;

    // Calculate total for each entry
    const entryTotal = !discount ? price * quantity : price * quantity * (1 - discount / 100);

    // Add entryTotal to the running total
    return total + entryTotal;
  }, 0);



  // Define columns
  const columns = [
    {
      name: 'ITEM',
      selector: 'item',

      width: '300px',
    },
    {
      name: 'PRICE',
      selector: 'price',

      width: '225px',
    },
    {
      name: 'QTY',
      selector: 'quantity',

      width: '225px',
    },
    {
      name: 'DISCOUNT',
      selector: 'discount',

      width: '225px',
    },
    {
      name: 'TOTAL',
      selector: 'total',

      width: '125px',
    },
  ];




  // Use the useLocation hook to get the state


  // Check if data is defined
  if (!location.state) {
    return (
      <div className='ml-16 my-16 mr-4 border-2 border-white'>
        <h1>No data available</h1>
      </div>
    );
  }

  return (
    <div className='ml-16 my-16 mr-4 border-2 border-white p-4 bg-white rounded-md shadow-md h-auto'>
      {/* Invoice no. */}
      <div>
        <p className="text-2xl"><span className="font-bold text-gray-700 ">Invoice # </span> {invoiceNumber}</p>
      </div>
      <br />
      {/* Company information */}
      <div className='flex flex-col items-end justify-end'>
        {/* name */}
        <div>
          <p className='text-xl font-serif font-bold'>Themesberg Inc.</p>
        </div>
        {/* your address */}
        <div>
          <p className='text-sm font-serif font-bold'>291 N 4th St, San Jose, CA 95112, USA</p>
        </div>
        {/* date created */}
        <div>
          <p className="text-sm">{date}</p>
        </div>
      </div>
      {/* Bill to */}
      <div>
        <h2>BILL TO</h2><br />
        <div>
          <p>Themesberg Inc., LOUISVILLE,<br /> Selby 3864 Johnson Street, United States of America <br /> VAT Code: AA-1234567890</p>
        </div>
      </div>
      {/* Invoice Detail */}
      <div className="mx-40  border-gray border-2 sm:my-0 w-[80%]">
        <DataTable
          columns={columns}
          data={data}
          className="rdt_Table"
          fixedHeader
          // pagination
          pointerOnHover={true}
          highlightOnHover={true}
        />
      </div>
      {/* Total */}
      <div className='grid grid-cols-2 items-end justify-end my-10 border-2 w-[20%] ml-auto'>
        <div className='flex flex-col items-start justify-between text-xl'>
          <p className='font-serif'>SUBTOTAL:</p>
          <p className='font-serif'>TAX:</p>
          <p className='font-serif'>TOTAL:</p>
        </div>
        <div className='flex flex-col items-end justify-between text-xl'>
          <p>${subTotal}</p>
          <p>{tax}%</p>
          <p>${(subTotal * (1 - tax / 100)).toFixed(2)}</p>
        </div>
      </div>




    </div>
  );
}


{/* <h1 className="text-3xl font-bold text-blue-800 mb-4">Invoice Details</h1>
// <p className="text-lg"><span className="font-bold text-gray-700">Sr.:</span> {Id}</p>
      <p className="text-lg"><span className="font-bold text-gray-700">Batch ID:</span> {batchId}</p>

    <p className="text-lg"><span className="font-bold text-gray-700">Invoice Title:</span> {invoiceTitle}</p>
    <p className="text-lg"><span className="font-bold text-gray-700">Status:</span> {status}</p>*/}
