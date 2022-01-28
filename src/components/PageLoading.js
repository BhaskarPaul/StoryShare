import React from 'react';
import { BarLoader } from 'react-spinners';
import '../App.css';

const PageLoading = () => {
    return (
        <div className="page-loader">
            <BarLoader />
        </div>
    );
};

export default PageLoading;
