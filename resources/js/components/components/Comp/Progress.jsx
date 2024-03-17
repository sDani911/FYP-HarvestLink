import React from "react";

function Progress({ level }) {
    return (
        <div className="flex flex-row items-center justify-center p-10">
            <div className={`border-2 border-solid border-white p-2 w-10 h-10 ${level >=1 ? 'bg-blue-500' : ''} flex items-center justify-center`} style={{ borderRadius: "50%" }}>1</div>
            <hr className={`border-2 border-solid  w-60 ${level > 1 ? 'border-blue-500' : ''}`} />

            <div className={`border-2 border-solid border-white p-2 w-10 h-10 ${level >=2 ? 'bg-blue-500' : ''} flex items-center justify-center`} style={{ borderRadius: "50%" }}>2</div>
            <hr className={`border-2 border-solid  w-60 ${level >2 ? 'border-blue-500' : ''}`} />

            <div className={`border-2 border-solid border-white p-2 w-10 h-10 ${level >= 3 ? 'bg-blue-500' : ''} flex items-center justify-center`} style={{ borderRadius: "50%" }}>3</div>
            <hr className={`border-2 border-solid  w-60 ${level >3 ? 'border-blue-500' : ''}`} />

            <div className={`border-2 border-solid border-white p-2 w-10 h-10 ${level === 4 ? 'bg-blue-500' : ''} flex items-center justify-center`} style={{ borderRadius: "50%" }}>4</div>
        </div>
    );
}
function Progress2({ level }) {
    return (
        <div className="flex flex-row items-center justify-center p-10">
            <div className={`border-2 border-solid border-white p-2 w-10 h-10 ${level >=1 ? 'bg-blue-500' : ''} flex items-center justify-center`} style={{ borderRadius: "50%" }}>1</div>
            <hr className={`border-2 border-solid  w-60 ${level > 1 ? 'border-blue-500' : ''}`} />

            <div className={`border-2 border-solid border-white p-2 w-10 h-10 ${level >=2 ? 'bg-blue-500' : ''} flex items-center justify-center`} style={{ borderRadius: "50%" }}>2</div>
            <hr className={`border-2 border-solid  w-60 ${level >2 ? 'border-blue-500' : ''}`} />

            <div className={`border-2 border-solid border-white p-2 w-10 h-10 ${level >= 3 ? 'bg-blue-500' : ''} flex items-center justify-center`} style={{ borderRadius: "50%" }}>3</div>

        </div>
    );
}
export { Progress, Progress2 };

