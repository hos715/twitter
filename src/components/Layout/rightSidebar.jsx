import React from 'react';
import { Link } from 'react-router-dom';

import Hashtag from './hashtag';

const RightSidebar = () => {
    return (
        <div className="sidebar-container col-sm-2">
            <Link to={"/"}>
                <div className="logopanel">
                    <img src={"/img/logo.png"} alt="لوگو" />
                    <h1>توییتر فارسی</h1>
                </div>
            </Link>
            <h3 className="right-sidebar-title">
                داغترین توییت ها
                </h3>
            <Hashtag />
        </div>
    );
};
export default RightSidebar;