import React, { useState } from "react";
import ReactApexChart from 'react-apexcharts';
import DataTable from 'react-data-table-component';

function Manufacture_Landing() {


    {/* //////////////////////////////BACKEND ONLY////////////////////////////// */ }

    //Data regarding the status from database is to be stored in here to be shown in the graph {
    const [barChartOptions, setBarChartOptions] = useState({
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
    });
    const [barChartSeries, setBarChartSeries] = useState([
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
        {
            name: "series-2",
            data: [35, 45, 40, 54, 39, 30, 72, 11]
        }
    ]);
    const [lineChartOptions, setLineChartOptions] = useState({
        chart: {
            id: "basic-line"
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
    });
    const [lineChartSeries, setLineChartSeries] = useState([
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
        {
            name: "series-2",
            data: [35, 45, 40, 54, 39, 30, 72, 11]
        }
    ]);
    const data = [
        { id: 1, manufactureId: 'TX123', dateCreated: '2023-01-01', criteria: 'Some Criteria', status: 'Completed' },
        { id: 2, manufactureId: 'TX456', dateCreated: '2023-01-02', criteria: 'Another Criteria', status: 'Pending' },
        { id: 3, manufactureId: 'TX789', dateCreated: '2023-01-03', criteria: 'Another Criteria', status: 'Failed' },
        { id: 4, manufactureId: 'TX987', dateCreated: "2023-01-04", criteria: "Different Criteria", status: "Completed" },
        { id: 5, manufactureId: 'TX654', dateCreated: "2023-01-05", criteria: "Some Criteria", status: "Pending" },
        { id: 6, manufactureId: 'TX321', dateCreated: "2023-01-06", criteria: "Another Criteria", status: "Failed" },
        { id: 7, manufactureId: 'TX555', dateCreated: "2023-01-07", criteria: "Different Criteria", status: "Completed" },
        { id: 8, manufactureId: 'TX111', dateCreated: "2023-01-08", criteria: "Some Criteria", "status": "Pending" },
        { id: 9, manufactureId: 'TX888', dateCreated: "2023-01-09", criteria: "Another Criteria", status: "Failed" },
        { id: 10, manufactureId: 'TX222', dateCreated: "2023-01-10", criteria: "Different Criteria", status: "Completed" },
        { id: 11, manufactureId: 'TX777', dateCreated: "2023-01-11", criteria: "Some Criteria", "status": "Pending" },
        { id: 12, manufactureId: 'TX444', dateCreated: "2023-01-12", criteria: "Another Criteria", status: "Failed" },
        { id: 13, manufactureId: 'TX999', dateCreated: "2023-01-13", criteria: "Different Criteria", status: "Completed" }

        // Add more data as needed
    ];
    // }

    {/* //////////////////////////////FRONTEND ONLY////////////////////////////// */ }
    const columns = [
        {
            name: 'Sr.',
            selector: 'id',

            width: '75px',
        },
        {
            name: 'Manufacture ID',
            selector: 'manufactureId',

            width: '250px',
        },
        {
            name: 'Date Created',
            selector: 'dateCreated',

            width: '250px',

        },
        {
            name: 'Criteria',
            selector: 'criteria',

            width: '250px',
        },
        {
            name: 'Status',
            selector: 'status',

            width: '100px',
        },
        // Add more columns as needed
    ];

    return (
        <div className='mx-4 my-2 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 2xl:mx-48 min-h-full'>
            {/* Graphical Representation of user data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <ReactApexChart
                        options={barChartOptions}
                        series={barChartSeries}
                        type="bar"
                        width="100%"
                    />
                </div>
                <div>
                    <ReactApexChart
                        options={lineChartOptions}
                        series={lineChartSeries}
                        type="line"
                        width="100%"
                    />
                </div>
            </div>

            <hr className="h-1 bg-white my-4" />

            {/* Tabular representation of all transaction for user */}
            <div className="my-4 sm:my-0 border-2 border-white z-[-20]">
                <DataTable
                    title="Manufacture Data Table"
                    columns={columns}
                    data={data}
                    className="rdt_Table"
                    selectableRows
                    fixedHeader
                    pagination
                    selectableRowsHighlight={true}
                    pointerOnHover={true}
                    highlightOnHover={true}
                />
            </div>

        </div>

    );


}

export default Manufacture_Landing;
