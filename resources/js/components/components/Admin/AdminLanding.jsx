import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import generate from '../../assets/icons/create.png'
import view from '../../assets/icons/eye.png';
import dump from '../../assets/icons/delete.png';
import { useNavigate, Link } from 'react-router-dom';
import axios from "../../axiosConfig";

export default function AdminLanding() {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Set the desired number of items per page
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteUser, setDeleteUser] = useState(null); // State to hold user to be deleted
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State to control visibility of delete confirmation

    useEffect(() => {
        fetchData();
    }, [currentPage, itemsPerPage, searchQuery]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/UserListing?page=${currentPage}&view=${itemsPerPage}&search=${searchQuery}`);
            const { data, last_page } = response.data.data;
            setData(data);
            setTotalPages(last_page);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const navigate = useNavigate();

    const handleDelete = (row) => {
        setDeleteUser(row);
        setShowDeleteConfirmation(true);
    };
    const confirmDelete = async () => {
        try {
            // Make the API call to delete the user
            await axios.post(`/deleteUser/${deleteUser.id}`); // Adjust the endpoint according to your API
            fetchData(); // Refetch data to update the component
            setShowDeleteConfirmation(false);
            setDeleteUser(null);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
        setDeleteUser(null);
    };

    const handleView = (row) => {
        navigate('/ViewUser', { state: row });
    };

    const handleEdit = (row) => {
        navigate('/EditUser', { state: row });
    };

    const handleSearch = () => {
        fetchData(); // Trigger fetchData to fetch data with new search query
    };

    const columns = [
        {
            name: 'User Id',
            selector: row => row.id,
            width: '100px',
        },
        {
            name: 'Name',
            selector: row => row.first_name +' '+ row.last_name,
        },
        {
            name: 'Role',
            selector: row => row.role.title,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Phone No',
            selector: row => row.phone_number,
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name: 'Actions',
            selector: 'actions',
            sortable: false,
            width: '150px',
            cell: row => (
                <div className="flex flex-row items-center justify-center">
                    <button onClick={() => handleView(row)}><img src={view} alt="view" className="w-6 h-6 mx-[9.75px]" /></button>
                    <button onClick={() => handleEdit(row)}> <img src={generate} alt="generate" className="w-6 h-6 mx-[9.75px]" /></button>
                    <button onClick={() => handleDelete(row)}><img src={dump} alt="delete" className="w-6 h-6 mx-[9.75px]" /></button>
                </div>
            ),
        },
    ];

    return (
        <div className="mx-16 sm:mx-8 md:mx-16 mb-10 mt-6">
            {
                showDeleteConfirmation === true ?
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-md">
                            <div className="mb-4">
                                <p className="text-center">Are you sure you want to delete this user?</p>
                            </div>
                            <div className="flex justify-center">
                                <button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2">Delete</button>
                                <button onClick={cancelDelete} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Cancel</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div>

                    </div>
            }
            <div className="flex flex-row items-center justify-between">
                <b><h1 className="my-6 sm:text-2xl md:text-4xl ">Users</h1></b>
                <div className="flex flex-row items-center  w-[200px]">
                    <Link to='/Appointment'>
                        <button
                            className={`flex items-center justify-center p-2.5 w-[150] mx-4 rounded-3xl bg-blue-500 text-white text-xl text-black`}
                        >
                            Appointment
                        </button>
                    </Link>
                </div>

            </div>
            <hr className="my-4" />
            <div className="flex items-end justify-end">
                <div className="flex items-center justify-center">
                    <div className="rounded-lg  bg-transparent p-5">
                        <div className="flex">
                            <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                                <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute w-5 fill-gray-500 transition">
                                    <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-full sm:w-auto">
                <div className="my-4 sm:my-0 border-2 border-white z-[-20]">
                    <DataTable
                        title="Users"
                        columns={columns}
                        data={data}
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
