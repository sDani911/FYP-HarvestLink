import React from 'react';
import { useLocation } from 'react-router-dom';
import certificateImage from '../../assets/icons/image.png';
// import iconImage from "icon.png";
export default function InvoiceView() {
    const location = useLocation();
    const { CertificateID, CertificateNumber, Validity, Status } = location.state;

    const iconImage = null;
    // Check if data is defined
    if (!location.state) {
        return (
            <div className='ml-16 my-16 mr-4 border-2 border-white'>
                <h1>No data available</h1>
            </div>
        );
    }
    const displayImage = certificateImage ? certificateImage : iconImage;


    return (
        <div className='mx-16 sm:mx-8 md:mx-16 mb-10 mt-6'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-800 mb-2'>Certificate Detail</h1>
            </div>
            <div className='bg-white rounded-md shadow-md p-6'>
                {/* Certificate Image */}
                <div className='mb-8 flex justify-center items-center bg-gray-400 h-60 rounded-lg'>
                    <div className='flex justify-center items-center w-full h-full'>
                        <img src={displayImage} alt='Certificate' className='rounded-md shadow-md w-12 h-12' />
                    </div>
                </div>
                {/* Certificate Detail Header */}
                <div className='mb-8'>
                    <p className='text-gray-600'>Details for Certificate: {CertificateID}</p>
                </div>
                {/* Certificate Number */}
                <div className='mb-4'>
                    <p className='text-lg font-semibold text-gray-800'>Certificate Number</p>
                    <p className='text-gray-600'>{CertificateNumber}</p>
                </div>
                {/* Validity */}
                <div className='mb-4'>
                    <p className='text-lg font-semibold text-gray-800'>Validity</p>
                    <p className='text-gray-600'>{Validity}</p>
                </div>
                {/* Status */}
                <div className='mb-4'>
                    <p className='text-lg font-semibold text-gray-800'>Status</p>
                    <p className='text-gray-600'>{Status}</p>
                </div>
            </div>
        </div>
    );
}
