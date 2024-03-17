import React from 'react';

function Tax() {
  return (
    <div className="mx-16 sm:mx-8 md:mx-16 mb-10 mt-6">
      <h1 className="text-3xl font-bold mb-4">Tax Information</h1>
      <div className="bg-white shadow-md rounded-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Sales Tax</td>
              <td className="px-6 py-4 whitespace-nowrap">10%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Income Tax</td>
              <td className="px-6 py-4 whitespace-nowrap">15%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Property Tax</td>
              <td className="px-6 py-4 whitespace-nowrap">5%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Value Added Tax (VAT)</td>
              <td className="px-6 py-4 whitespace-nowrap">8%</td>
            </tr>
            {/* Add more rows for additional taxes */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tax;
