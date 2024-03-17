import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axiosConfig";

  function Signup() {

      const [name, setName] = useState('');
      const [cnic, setCNIC] = useState('');
      const [email, setEmail] = useState('');
      const [phoneNo, setPhoneNo] = useState('');

      const handleSubmit = async (e) => {
          e.preventDefault();

          try {
              const response = await axios.post('/appointment', {
                  name,
                  cnic,
                  email,
                  phoneNo,
              });

              if (response.status === 200) {
                  // Handle successful signup
                  console.log('Signup successful!');
              } else {
                  // Handle other status codes or errors
                  console.error('Signup failed:', response.data);
              }
          } catch (error) {
              console.error('Error occurred during signup:', error);
          }
      };

      return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 pt-20" >
        <div className="shadow-md p-6 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl min-w-[300px]">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <h2 className="mt-10 text-center text-2xl md:text-3xl font-bold leading-9 tracking-tight text-gray-900">
              Book an appointment with us!
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="Full Name" className="block text-sm font-medium leading-6 text-gray-900">
                    Full Name
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="Full Name"
                    type="text"
                    placeholder="First Middle Last"
                    required
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              {/* CNIC */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="cnic" className="block text-sm font-medium leading-6 text-gray-900">
                    CNIC
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="CNIC"
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="XXXXXX-XXXXXX-X"
                    required
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setCNIC(e.target.value)}
                    onWheel={(e) => e.preventDefault()} // prevent scrolling for number input
                  />
                </div>
              </div>
              {/* email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="user@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              {/* Phone Number */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                    Phone Number
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="Phone Number"
                    type="number"
                    placeholder="+92 0333 0000000"
                    required
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </div>
              </div>
              {/* Submission Button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Book Appointment
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-white-500">
              Already a member?{' '}
              <Link to='/Login' className="font-semibold leading-6 text-indigo-200 hover:text-indigo-500">
                Click to Login
              </Link>
            </p>
          </div>
        </div>
      </div>

    );
  }

export default Signup;
