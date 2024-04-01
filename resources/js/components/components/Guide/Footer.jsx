import React from "react";
import facebook from "../../assets/icons/facebook.png";
import github from "../../assets/icons/github-logo.png"
import twitter from "../../assets/icons/twitter.png"
import { Link } from "react-router-dom";


function Footer() {
  return (
    <div className="bg-black text-white grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 py-8">
      <div className="text-center">
        <ul>
          <li className="m-4 sm:m-2 sm:text-sm sm:py-2">History</li>
          <li className="m-4 sm:m-2 sm:text-sm sm:py-2">Motivation</li>
          <li className="m-4 sm:m-2 sm:text-sm sm:py-2">Contributor</li>
        </ul>
      </div>
      <div className="text-center">
        <ul>
          <li className="m-4 sm:m-2 sm:text-sm sm:py-2">Join our Team</li>
          <li className="m-4 sm:m-2 sm:text-sm sm:py-2">Join our Network</li>
          <li className="m-4 sm:m-2 sm:text-sm sm:py-2">Login to Portal</li>
        </ul>
      </div>
      <div className="text-center">
        <ul>
          <li className="m-4 sm:m-2 sm:text-sm sm:py-2">Milestone</li>
          <li className="m-4 sm:m-2 sm:text-sm sm:py-2">Vision</li>
          <li className="m-4 sm:m-2 sm:text-sm sm:py-2">Aims</li>
        </ul>
      </div>
      <div></div>
      <div className="text-center flex flex-col items-center justify-end">
        <ul className="flex space-x-4 items-center justify-center">
          <li>
            <Link to="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <img src={facebook} alt="Harvest Link Facebook" className="w-8 h-8 object-contain bg-white rounded-full" />
            </Link>
          </li>
          <li>
            <Link to="https://github.com/usman9856/HarvestLink" target="_blank" rel="noopener noreferrer">
              <img src={github} alt="Harvest Link Github" className="w-8 h-8 object-contain bg-white rounded-full" />
            </Link>
          </li>
          <li>
            <Link to="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <img src={twitter} alt="Harvest Link Twitter" className="w-8 h-8 object-contain bg-white rounded-full" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
