import React from 'react';
import './spinner.css';

const loading = () => {
    return (
        <div className="flex justify-center items-center mb-32">
            {/* <p className="text-white">Loading...</p> */}
            {/* <div id="overlay"> */}
            <div className="spinner"></div>
            {/* </div> */}
        </div>
    );
};

export default loading;
