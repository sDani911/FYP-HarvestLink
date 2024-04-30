import React, {useState, useEffect} from "react";
import DataTable from "react-data-table-component";

import { Link } from "react-router-dom";
import add from '../../assets/icons/add.png'
import axios from "../../axiosConfig";

export default function InspectionLanding() {

    const [inspectionData, setInspectionData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Set the desired number of items per page
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Fetch data from your API endpoint with pagination parameters
        const fetchData = async () => {
            try {
                const response = await axios.get(`/farmerInspectionData?page=${currentPage}&view=${itemsPerPage}`);
                const { data, last_page } = await response.data.data;
                setInspectionData(data);
                setTotalPages(last_page);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [currentPage, itemsPerPage]);

    // ... (rest of your component code remains the same)

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const columns = [
        {
            name: 'Inspection ID',
            selector: (row) => row.id,

        },
        {
            name: 'Crop',
            selector: (row) => row.crop.name,

        },
        {
            name: 'Inspector Name',
            selector: (row) => row.authenticatedBy,

            cell: (row) => (
                <span>
                {row.authenticatedBy ? row.authenticatedBy.name : 'N/A'}
            </span>
            ),
        },
        {
            name: 'Date of Inspection',
            selector: (row) => row.request_date,

        },
        {
            name: 'Status',
            selector: (row) => row.grade_assign,

        },
    ];

    return (
        <div className="mx-16 sm:mx-8 md:mx-16 mb-10 mt-6 h-screen">
            <div className="flex flex-row items-center justify-between">
                <b><h1 className="my-6 sm:text-2xl md:text-4xl ">Inspection</h1></b>
                <Link to='/InspectionRequest'>
                    <button
                        className={`flex items-center justify-between  px-2.5 py-1 rounded-3xl bg-[#4663CC] text-white text-xl ${isHovered ? 'overflow-visible btn-expand-animate width' : 'overflow-hidden width btn-expand-animate'}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <img className="w-4 h-4 m-2 sm:w-5 sm:h-5 md:w-7 md:h-7" src={add} alt="Inspection" />
                        {isHovered && <span className="p-1">Request Inspection</span>}
                    </button>
                </Link>
            </div>
            <hr className="my-4" />
            <div className="md:w-full sm:w-auto">
                <div className="my-4 sm:my-0 border-2 border-white z-[-20]">
                    <DataTable
                        title="Inspection"
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
        </div>
    )
}
