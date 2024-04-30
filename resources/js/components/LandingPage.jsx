import React from "react";
import { Link } from "react-router-dom";
import wheat from './assets/images/LandPage_bg.jpg';


function Landing_Page() {
    return (
        <div className="my-1">

            <section className="bg-cover bg-center bg-no-repeat h-screen sm:h-96 my-2" style={{ backgroundImage: `url(${wheat})`, height: "90vh" }}>
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-4xl sm:text-6xl text-white text-center">Harvest-Link</h1>
                    <h2 className="text-3xl sm:text-5xl text-white text-center">The Next Frontier in Digital Farming</h2>
                </div>
            </section>

            <section className="my-2 bg-cover bg-center bg-no-repeat flex items-center justify-center text-xl sm:text-3xl fadeInRight" style={{ height: '70vh' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white text-center w-full">
                    <div className="shadow-slate-950">
                        <div>About Project?</div>
                    </div>
                    <div className="justify-end">
                        <div>This Project Aims to aid the current global food supply chain by making its records transparent, allowing the general public to see where their food is sourced from.</div>
                    </div>
                </div>
            </section>

            <section className="my-2 bg-cover bg-center bg-no-repeat h-screen sm:h-96 flex items-center justify-center text-xl sm:text-3xl fadeInRight" style={{ height: '70vh' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white text-center w-full">
                    <div className="shadow-slate-950">
                        Project incorporates emerging technology of blockchain with the current global food supply chain, thus helping countless stakeholders in their business and consumers to trace the history of the products they purchase.
                    </div>
                    <div className="justify-end">
                        What is this Project?
                    </div>

                </div>
            </section>

        </div>

    )
}

export default Landing_Page;
