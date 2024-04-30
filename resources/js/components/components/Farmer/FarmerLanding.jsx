import React, {useEffect, useState} from "react";
import ReactApexChart from 'react-apexcharts';
import DataTable from 'react-data-table-component';
import axios from "../../axiosConfig";
import generate from '../../assets/icons/create.png'
import {Link} from "react-router-dom";

function Farmer_Landing() {

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
    const [inspectionData, setInspectionData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Set the desired number of items per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/farmerCropData?page=${currentPage}&view=${itemsPerPage}`);
                const { data, last_page } = await response.data.data;
                setInspectionData(data);
                setTotalPages(last_page);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [currentPage, itemsPerPage]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const columns = [
        {
            name: 'Name',
            selector: (row) => row.name,
        },
        {
            name: 'Type',
            selector: (row) => row.type,
        },
        {
            name: 'Quantity',
            selector: (row) => row.quantity + " " + row.unit,
        },
        {
            name: 'Start Date',
            selector: (row) => row.start_date,
        },
        {
            name: 'End Date',
            selector: (row) => row.end_date,
        },
        {
            name: 'Status',
            selector: (row) => row.status,
        },
        {
            name: 'Actions',
            selector: (row) => row.id,
            // width: '250px',
            cell: (row) => (
                <div className="flex flex-row items-center justify-center">
                    <Link to={`/AddCropToMarketPlace/${row.id}`}>
                    <button >
                        <img src={generate} alt="generate" className="w-6 h-6 mx-[9.75px]" />
                    </button>
                    </Link>
                </div>
            ),
        },
    ];

    return (
<<<<<<< HEAD
        <div className='mx-4 my-2 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 2xl:mx-48 min-h-full h-screen'>
=======
        <div className='mx-4 my-2 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 2xl:mx-48 min-h-full'>
>>>>>>> 5a8f618161e399c0ae5055468b878d4a350e9c5d
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
                    title="Crops"
                    columns={columns}
                    data={inspectionData}
                    className="rdt_Table"
                    fixedHeader
                    pagination
                    pointerOnHover={true}
                    highlightOnHover={true}
                    paginationPerPage={itemsPerPage}
                    paginationRowsPerPageOptions={[10]} // Set your desired rows per page options
                    paginationTotalRows={totalPages * itemsPerPage}
                    paginationServer
                    onChangePage={handlePageChange}
                />
            </div>

        </div>

    );


}

export default Farmer_Landing;
