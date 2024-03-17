import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";



const EditRole = () => {
  // State variables to store form data
  const [title, setTitle] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState("");

  const location = useLocation();
  const rowData = location.state;

  useEffect(() => {
    setTitle(rowData.Role);
    setDescription(rowData.Description);
    setPermissions(rowData.Permission)
  })
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handlePermissionsChange = (e) => {
    setPermissions(e.target.value);
  };

  // Function to handle title input change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [option]: !prevState[option],
    }));
  };

  // Function to handle cluster selection
  const handleClusterSelect = (cluster, isChecked) => {
    const optionsInCluster = optionsByCluster[cluster];
    const updatedSelectedOptions = { ...selectedOptions };
    optionsInCluster.forEach((option) => {
      updatedSelectedOptions[option] = isChecked;
    });
    setSelectedOptions(updatedSelectedOptions);
  };

  // List of selectable options
  const optionsByCluster = {
    User: [
      "userAdd",
      "userView",
      "userDelete",
      "userUpdate",
    ],
    Ledger: [
      "ledgerView",
      "ledgerAdd",
      "ledgerUpdate",
      "ledgerDelete",
      "ledgerTrashed",
      "ledgerDownload",
      "bulkUpdateLedger",
    ],
    Permission: [
      "viewPermissionDetails",
      "permissionsView",
      "permissionsAdd",
      "permissionsUpdate",
      "permissionsDelete",
    ],
    Role: [
      "roleView",
      "roleAdd",
      "roleUpdate",
      "roleDelete",
    ],
    Attendance: [
      "attendanceView",
      "roleWiseAttendanceView",
      "attendanceAdd",
      "attendancesListingView",
      "attendancesListingUser",
      "attendanceDelete",
    ],
    Expense: [
      "expense",
      "expenseView",
      "expenseAdd",
      "expenseUpdate",
      "expenseDelete",
    ],
    ExpenseCategory: [
      "expenseCategory",
      "expenseCategoryView",
      "expenseCategoryAdd",
      "expenseCategoryUpdate",
      "expenseCategoryDelete",
    ],
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare data to be saved in the database
    const data = {
      title: title,
      permissions: Object.keys(selectedOptions).filter(
        (option) => selectedOptions[option]
      ),
    };
    console.log(data);
    // Perform submission logic here (e.g., send data to the backend)
  };

  const handleSave = () => {
    console.log(selectedOptions);

  };

  return (
    <div className="mx-16 sm:mx-8 md:mx-16 mb-10 mt-6">

      <div className="border border-solid black bg-blue-200 m-10 p-10">
        <form onSubmit={handleSubmit}>
          {/* Title input */}
          <table className="ml-16">
            <tbody>
              <tr>
                <td className="ml-14 text-xl font-medium text-gray-700 mr-4">Title:</td>
                <td className="w-[800px]">
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                    className="block w-full px-3 py-2 rounded-md bg-transparent border border-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    style={{ marginLeft: '40px' }}
                  />
                </td>
              </tr>
              <tr>
                <td className="ml-14 text-xl font-medium text-gray-700 mr-4">Description:</td>
                <td>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    className="block w-full px-3 py-2 rounded-md bg-transparent border border-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    style={{ marginLeft: '40px' }}
                  />
                </td>
              </tr>
              <tr>
                <td className="ml-14 text-xl font-medium text-gray-700 mr-4">No. of Permissions:</td>
                <td>
                  <input
                    type="text"
                    id="permissions"
                    value={permissions}
                    onChange={handlePermissionsChange}
                    className="block w-full px-3 py-2 rounded-md bg-transparent border border-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    style={{ marginLeft: '40px' }}
                  />
                </td>
              </tr>
            </tbody>
          </table>








          {/* Clusters of selectable options */}
          <div className="flex flex-wrap m-10"> {/* Add flex-wrap class */}
            {Object.entries(optionsByCluster).map(([cluster, options]) => (
              <div key={cluster} className="mx-6 my-1 border-2 border-solid w-64 bg-gray-200 px-6 rounded-2xl hover:shadow-lg transform transition-transform hover:-translate-y-1 hover:translate-x-1"> {/* Add margin for spacing */}
                <label className="flex items-center mb-2 w-full"> {/* Added w-full class to make label full width */}
                  <b className="mr-4">{cluster}</b> {/* Increased margin for spacing */}
                  <input
                    type="checkbox"
                    onChange={(e) => handleClusterSelect(cluster, e.target.checked)}
                    className="form-checkbox text-blue-500 h-5 w-5 mr-2"
                  />
                </label>

                {/* Wrap options in a flex container */}
                <div className="">
                  <br />
                  {options.map((option) => (
                    <div key={option} className="mr-2 mb-2"> {/* Add margin for spacing */}
                      <input
                        type="checkbox"
                        id={option}
                        checked={selectedOptions[option] || false}
                        onChange={() => handleOptionSelect(option)}
                      />
                      <label htmlFor={option}>{option}</label>
                      <br />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit button */}
          <div className="flex items-center justify-center ">
            <button type="button" className="bg-green-500 rounded-full px-4 py-2 w-96" onClick={handleSave}>
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );

};

export default EditRole;

