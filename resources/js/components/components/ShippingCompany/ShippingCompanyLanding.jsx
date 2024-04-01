import React, {useEffect, useState} from "react";
import ReactApexChart from 'react-apexcharts';
import DataTable from 'react-data-table-component';
import axios from "../../axiosConfig";
import {Link} from "react-router-dom";
import generate from "../../assets/icons/create.png";
import add from "../../assets/icons/add.png";

function ShippingCompany_Landing() {

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

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/ShippingCompanyDriverData?page=${currentPage}&view=${itemsPerPage}`);
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
            selector: (row) => row.user.first_name,
        },
        {
            name: 'Car',
            selector: (row) => row.vehicle.type,
        },
        {
            name: 'Availability',
            selector: (row) => row.availability_status,
        },
        {
            name: 'License',
            selector: (row) => row.license_number,
        },
        {
            name: 'Actions',
            selector: (row) => row.id,
            // width: '250px',
            cell: (row) => (
                <div className="flex flex-row items-center justify-center">
                    <Link to={`/UpdateDriver/${row.id}`}>
                        <button >
                            <img src={generate} alt="generate" className="w-6 h-6 mx-[9.75px]" />
                        </button>
                    </Link>
                </div>
            ),
        },
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
            <div className="flex flex-row items-center justify-between">
                <b><h1 className="my-6 sm:text-2xl md:text-4xl ">Drivers</h1></b>
                <Link to='/CreateDriver'>
                    <button
                        className={`flex items-center justify-between  px-2.5 py-1 rounded-3xl bg-[#4663CC] text-white text-l ${isHovered ? 'overflow-visible btn-expand-animate width' : 'overflow-hidden width btn-expand-animate'}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <img className="w-4 h-4 m-2 sm:w-5 sm:h-5 md:w-7 md:h-7" src={add} alt="Add Driver" />
                        {isHovered && <span className="p-1">Add Driver</span>}
                    </button>
                </Link>
            </div>
            {/* Tabular representation of all transaction for user */}
            <div className="my-4 sm:my-0 border-2 border-white z-[-20]">
                <DataTable
                    title="Drivers"
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
export default ShippingCompany_Landing;
