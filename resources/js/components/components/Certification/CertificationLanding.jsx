import React, { useState } from "react";
import DataTable from "react-data-table-component";
import generate from '../../assets/icons/create.png'
import view from '../../assets/icons/eye.png';
import { Link ,useNavigate} from "react-router-dom";
import add from '../../assets/icons/add.png'



export default function CertificateLanding() {

    const handleGenerate = () => { }
    const [selectedRows, setSelectedRows] = useState([]); // Initialize as an empty array
    const navigate = useNavigate();
    const handleView = (row) => {
        if (selectedRows.length > 0) {

            const { CertificateID, CertificateNumber, Validity, Status } = row;

            navigate('/CertificateDetail', {  state: {
                CertificateID,
                CertificateNumber,
                Validity,
                Status
            } });
        }
        else {
            alert('No Certificate selected.\nPlease select invoice to view');
        }
    };
    const [isHovered, setIsHovered] = useState(false);
    const handleRowClick = (selectedRows) => {
        setSelectedRows(selectedRows.selectedRows);
        console.log(selectedRows.selectedRows)
    };

    const data = [
        {
            Sr: 1,
            CertificateID: 'ABC123',
            CertificateNumber: 'CER-001',
            Name: 'John Doe',
            DateOfCertificate: '2023-01-01',
            Validity: '2022-2023',
            Status: 'Completed',
        },
        {
            Sr: 2,
            CertificateID: 'XYZ456',
            CertificateNumber: 'CER-002',
            Name: 'Jane Smith',
            DateOfCertificate: '2023-02-15',
            Validity: '2023-2024',
            Status: 'Pending',
        },
        {
            Sr: 3,
            CertificateID: 'DEF789',
            CertificateNumber: 'CER-003',
            Name: 'Bob Johnson',
            DateOfCertificate: '2023-03-10',
            Validity: '2024-2025',
            Status: 'InProgress',
        },
        {
            Sr: 4,
            CertificateID: 'GHI987',
            CertificateNumber: 'CER-004',
            Name: 'Alice Williams',
            DateOfCertificate: '2023-04-20',
            Validity: '2025-2026',
            Status: 'Completed',
        },
        {
            Sr: 5,
            CertificateID: 'JKL321',
            CertificateNumber: 'CER-005',
            Name: 'Chris Brown',
            DateOfCertificate: '2023-05-05',
            Validity: '2023-2024',
            Status: 'Pending',
        },
        {
            Sr: 6,
            CertificateID: 'MNO654',
            CertificateNumber: 'CER-006',
            Name: 'Eva Davis',
            DateOfCertificate: '2023-06-15',
            Validity: '2024-2025',
            Status: 'InProgress',
        },
        {
            Sr: 7,
            CertificateID: 'PQR987',
            CertificateNumber: 'CER-007',
            Name: 'Michael Lee',
            DateOfCertificate: '2023-07-01',
            Validity: '2025-2026',
            Status: 'Completed',
        },
        {
            Sr: 8,
            CertificateID: 'STU654',
            CertificateNumber: 'CER-008',
            Name: 'Sophie Miller',
            DateOfCertificate: '2023-08-10',
            Validity: '2023-2024',
            Status: 'Pending',
        },
        {
            Sr: 9,
            CertificateID: 'VWX321',
            CertificateNumber: 'CER-009',
            Name: 'David Wilson',
            DateOfCertificate: '2023-09-20',
            Validity: '2024-2025',
            Status: 'InProgress',
        },
        {
            Sr: 10,
            CertificateID: 'YZA987',
            CertificateNumber: 'CER-010',
            Name: 'Olivia Turner',
            DateOfCertificate: '2023-10-05',
            Validity: '2025-2026',
            Status: 'Completed',
        },
    ];


    const columns = [
        {
            name: 'Sr',
            selector: row => row.Sr,

            width: '75px',
        },
        {
            name: 'Name',
            selector: row => row.CertificateID,

            width: '175px',
        },
        {
            name: 'Certification Number',
            selector: row => row.CertificateNumber,

            width: '250px',
        },
        {
            name: 'Validity',
            selector: row => row.Validity,

            width: '250px',
        },
        {
            name: 'Action',
            selector: row => row.actions,

            width: '250px',
            cell: (row) => (
                <div className="flex flex-row items-center justify-center">
                    <button onClick={() => handleView(row)}>
                        <img src={view} alt="view" className="w-6 h-6 mx-[9.75px]" />
                    </button>
                </div>
            ),
        },
        {
            name: 'Status',
            selector: row => row.Status,

            width: '100px',
        },
    ];



    return (
        <div className="mx-16 sm:mx-8 md:mx-16 mb-10 mt-6">
            <div className="flex flex-row items-center justify-between">
                <b><h1 className="my-6 sm:text-2xl md:text-4xl ">Certificaiton</h1></b>
                <Link to='/GetCertificate'>
                    <button
                        className={`flex items-center justify-between  px-2.5 py-1 rounded-3xl bg-[#4663CC] text-white text-xl ${isHovered ? 'overflow-visible btn-expand-animate width' : 'overflow-hidden width btn-expand-animate'}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <img className="w-4 h-4 m-2 sm:w-5 sm:h-5 md:w-7 md:h-7" src={add} alt="new certificate" />
                        {isHovered && <span className="p-1">Get Certification</span>}
                    </button>
                </Link>
            </div>
            <hr className="my-4" />
            <div className="md:w-full sm:w-auto">
                <div className="my-4 sm:my-0 border-2 border-white z-[-20]">
                    <DataTable
                        title="Certification"
                        columns={columns}
                        data={data}
                        className="rdt_Table"
                        fixedHeader
                        pagination
                        selectableRows
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
