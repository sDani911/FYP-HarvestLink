import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import add from '../../assets/icons/add.png'
import view from '../../assets/icons/path-a-to-b.png';
import { Link } from 'react-router-dom';
import axios from "../../axiosConfig";

export default function RouteLanding() {

    const [inspectionData, setInspectionData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Set the desired number of items per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/ShippingCompanyRoutes?page=${currentPage}&view=${itemsPerPage}`);
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
            name: 'No.',
            selector: (row) => row.id,
            width: '90px'
        },
        {
            name: 'Pickup',
            selector: (row) => row.pickup_location,
        },
        {
            name: 'Delivery',
            selector: (row) => row.delivery_location,
        },
        {
            name: 'Pickup ',
            selector: (row) => row.pickup_time,
        },
        {
            name: 'Delivery ',
            selector: (row) => row.delivery_time,
        },
        {
            name: 'Status ',
            selector: (row) => row.status,
        },
    {
      name: 'View',
      selector: 'actions',
      width: '250px',
      cell: row => (
        <div className="flex flex-row items-center justify-center">
            <Link to={`/RouteView/${row.id}`}>
                <button>
                    <img src={view} alt="view" className="w-6 h-6 mx-[9.75px]" />
                </button>
            </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-16 sm:mx-8 md:mx-16 mb-10 mt-6">
      <hr className="my-4" />
      <div className="md:w-full sm:w-auto">
        <div className="my-4 sm:my-0 border-2 border-white z-[-20]">
          <DataTable
              title="Routes"
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
