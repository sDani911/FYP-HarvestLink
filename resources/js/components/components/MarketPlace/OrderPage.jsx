import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "../../axiosConfig";

function OrderPage() {
  const location = useLocation();
  const { id, productName, price, quantity, description, productLocation } = location.state;
    const [shippingCompany, setShippingCompany] = useState([]);

    const [deliveryAddress, setDeliveryAddress] = useState({
        deliveryDate: "",
        street: "",
        city: "",
        state: "",
        country: "",
        shippingCompany: "",
        crop_id: id,
    });
    const updateFarmInfo = (data) => {
        setDeliveryAddress((prevData) => ({ ...prevData, ...data }));
    };
    const handleInputChange = (field, value) => {
        if (field === "deliveryDate" && value) {
            const currentDate = new Date();
            const selectedDate = new Date(value);

            // Check if the selected date is within the next one month
            if (selectedDate < currentDate || selectedDate > new Date(currentDate.setMonth(currentDate.getMonth() + 1))) {
                // Display an error message or handle the invalid date as needed
                console.log("Invalid date. Please select a date within the next one month.");
                return;
            }
        }

        updateFarmInfo({ ...deliveryAddress, [field]: value });
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/ShippingCompany');
                setShippingCompany(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const submit = async () => {
        try {
            const formData = {
                deliveryAddress,
            };

            const response = await axios.post('/buyCropOnMarketplace', formData);

            if (response.ok) {
                const responseData = await response.json();
                console.log("Data successfully sent:", responseData);
            } else {
                console.error("Failed to send data:", response.status);
            }
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

  // Check if data is defined
  if (!location.state) {
      return (
          <div className="mx-16 sm:mx-8 md:mx-16 mb-10 mt-6">
              <div className='ml-16 my-16 mr-4 border-2 border-white'>
                  <h1>No data available</h1>
              </div>
          </div>
      );
  }

  return (
    <div className="mx-16 sm:mx-8 md:mx-16 mb-10 mt-6">

      <div className='bg-white rounded-md shadow-md p-6'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Order Shipping Data</h1>
      </div>
          <div className='bg-gray-200 p-4'>
              <h3 className='font-bold'>Delivery Address</h3>
              <label className="">Street</label>
              <input
                  className="w-full h-10 px-4 rounded-xl border-2 border-white"
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={deliveryAddress.street}
                  onChange={(e) => handleInputChange("street", e.target.value)}
              />

              <label className="">City</label>
              <input
                  className="w-full h-10 px-4 rounded-xl border-2 border-white"
                  type="text"
                  name="city"
                  placeholder="City"
                  value={deliveryAddress.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
              />

              <label className="">State</label>
              <input
                  className="w-full h-10 px-4 rounded-xl border-2 border-white"
                  type="text"
                  name="state"
                  placeholder="State"
                  value={deliveryAddress.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
              />

              <label className="">Country</label>
              <input
                  className="w-full h-10 px-4 rounded-xl border-2 border-white"
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={deliveryAddress.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
              />
              <label className="">Delivery Date</label>
              <input
                  className="w-full h-10 px-4 rounded-xl border-2 border-white"
                  type="date"
                  name="deliveryDate"
                  placeholder="Date Of Establishment"
                  value={deliveryAddress.deliveryDate}
                  onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  max={(new Date(new Date().setMonth(new Date().getMonth() + 1))).toISOString().split('T')[0]}
              />

          </div>
          <label className="text-white">Shipping Company</label>
          <select
              className="w-full h-10 px-4 rounded-xl border-2 mb-2"
              name="shippingCompany"
              value={deliveryAddress.shippingCompany}
              onChange={(e) => handleInputChange("shippingCompany", e.target.value)}
          >
              <option value="">Select Shipping Company</option>
              {shippingCompany.map((farm) => (
                  <option key={farm.id} value={farm.id}>
                      {farm.name}
                  </option>
              ))}
          </select>
          <div className='mb-2'>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>{productName}</h2>
      </div>
        {/* Certificate Detail Header */}
        <div className='mb-2'>
          <p className='text-gray-600'>Price: {price}</p>
        </div>
          <div className='mb-2'>
          <p className='text-gray-600'>Quantity: {quantity}</p>
        </div>
        {/* Certificate Number */}
        <div className='mb-4'>
          <p className='text-lg font-semibold text-gray-800'>Description</p>
          <p className='text-gray-600'>{description}</p>
        </div>

        {/* Status */}
        <div className='mb-4'>
          <p className='text-lg font-semibold text-gray-800'>Location</p>
          <p className='text-gray-600'>{productLocation}</p>
        </div>
          <button className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={submit}>
              Place Order
          </button>
      </div>
    </div>
  );
}

export default OrderPage;
