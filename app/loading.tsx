import React from 'react';
import './spinner.css';
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

const loading = () => {
    return (
        <div id="overlay">
            <div className="spinner"></div>
        </div>
    );
};

export default loading;
