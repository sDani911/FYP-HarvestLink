import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import certificateImage from '../../assets/icons/image.png';

function ProductPage() {
  const location = useLocation();
  const { id, productName, price, quantity, description, location: productLocation, imageUrl } = location.state;

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

  const displayImage = imageUrl ? imageUrl : certificateImage;
    const navigate = useNavigate();

    const handleChoose = () => {

        navigate('/OrderPage', {
            state: {
                id,
                productName,
                price,
                quantity,
                description,
                productLocation,
                imageUrl
            }
        });
    };

  return (
    <div className="mx-16 sm:mx-8 md:mx-16 mb-10 mt-6">

      <div className='bg-white rounded-md shadow-md p-6'>
        {/* Certificate Image */}
        <div className='mb-8 flex justify-center items-center bg-gray-400 h-60 rounded-lg'>
          <div className='flex justify-center items-center w-full h-full'>
            <img src={displayImage} alt={productName} className='rounded-md shadow-md w-100 h-100' />
          </div>
        </div>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>{productName}</h1>
      </div>
        {/* Certificate Detail Header */}
        <div className='mb-8'>
          <p className='text-gray-600'>Price: {price}</p>
        </div>
          <div className='mb-8'>
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
          <button className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleChoose}>
              Buy
          </button>
      </div>
    </div>
  );
}

export default ProductPage;
