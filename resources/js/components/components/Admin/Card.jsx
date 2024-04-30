import React from "react";

const SimpleCard = ({ title, data }) => {
    const styles = `
    .card {
      width: 190px;
      height: 254px;
      background: #f2f2f2; /* Light gray background */
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius: 20px;
      color: #07182E; /* Dark text color */
      text-align: center;
      padding: 20px;
      transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* Transition for hover effect */
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1); /* Shadow effect */
    }

    .card:hover {
      transform: translate(10px, -10px); 
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2); 
    }

    .card h2 {
      font-size: 2em;
      margin: 0;
    }

    .inner-border {
      position: absolute;
      background: rgba(211, 211, 211, 1.0); 
      inset: 5px;
      border-radius: 15px;
      width: calc(100% - 10px);
      height: calc(100% - 10px);
    }
  `;

    const SimpleCard = ({ title, data, options, selectedOptions, handleOptionSelect }) => {
        return (
            <div className="mx-16 sm:mx-8 md:mx-16 mb-10 mt-6">
                <div className="card">
                    <h2>{title}</h2>
                    <p>{data}</p>
                    {options.map((option) => (
                        <div key={option}>
                            <input
                                type="checkbox"
                                id={option}
                                checked={selectedOptions[option] || false}
                                onChange={() => handleOptionSelect(option)}
                            />
                            <label htmlFor={option}>{option}</label>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default SimpleCard;
