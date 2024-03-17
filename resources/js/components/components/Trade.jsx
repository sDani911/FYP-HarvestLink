import React from "react";
import DataTable from "react-data-table-component";


export default function Trade() {
    const data = [
        { id: 1, blockId: '9e7b7a19-99a1-4d6b-8fb5-4a2b996f0a92', blockTitle: 'Wheat', dateCreated: '2023-01-01', status: 'Completed' },
        { id: 2, blockId: '3b33c6c5-2c8a-483f-8a65-f52abfa1f4b5', blockTitle: 'Rice', dateCreated: '2023-01-02', status: 'Pending' },
        { id: 3, blockId: 'a0cd6c24-c2b3-4c6a-85e2-f0e4324ed2fe', blockTitle: 'Corn', dateCreated: '2023-01-03', status: 'Failed' },
        { id: 4, blockId: '4e7f1104-685f-4577-ae50-00707e9a929d', blockTitle: 'Barley', dateCreated: '2023-01-04', status: 'Completed' },
        { id: 5, blockId: 'eb0b9d70-1da3-44ae-aa5e-8c1d165b46f3', blockTitle: 'Oats', dateCreated: '2023-01-05', status: 'Pending' },
        { id: 6, blockId: '899c3fe7-e1c4-4cc3-b0b3-54f24f6ce76b', blockTitle: 'Wheat', dateCreated: '2023-01-06', status: 'Failed' },
        { id: 7, blockId: 'c6ee6c5e-6a6e-4652-9489-1f3eef46a982', blockTitle: 'Rice', dateCreated: '2023-01-07', status: 'Completed' },
        { id: 8, blockId: '0ea1e68b-82e2-41a9-90ac-d106f40d2ec4', blockTitle: 'Corn', dateCreated: '2023-01-08', status: 'Pending' },
        { id: 9, blockId: 'a7801af2-4b46-4b8c-bf60-09eb56d70b8e', blockTitle: 'Barley', dateCreated: '2023-01-09', status: 'Failed' },
        { id: 10, blockId: '013c9f1e-9f7a-4ff1-9204-0efbf16004f3', blockTitle: 'Oats', dateCreated: '2023-01-10', status: 'Completed' },
    ];

    const columns = [
        {
            name: 'Sr.',
            selector: 'id',

            width: '75px',
        },
        {
            name: 'Block Hash',
            selector: 'blockId',

            width: '350px',
        },
        {
            name: 'Title',
            selector: 'blockTitle',

            width: '250px',

        },
        {
            name: 'Date',
            selector: 'dateCreated',

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
        <div className="mx-16 mb-10 mt-6">
            <b><h1 className="my-6 text-4xl">Block Chain Records</h1></b>
            <hr className="my-4"/>
            <div>
                {/* Tabular representation of all transaction for user */}
                <div className="my-4 sm:my-0 border-2 border-white z-[-20]">
                    <DataTable
                        title="Transaction Data Table"
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
        </div>
    )
}
