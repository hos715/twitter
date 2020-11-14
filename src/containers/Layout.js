import React, { useEffect, useState } from 'react';

import RightSidebar from '../components/Layout/rightSidebar.jsx';
import LeftSidebar from '../components/Layout/leftSidebar.jsx';
import { getProfileReq } from '../api/api_auth.js';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading'

const Layout = (props) => {

    const history = useHistory();
    const [wait, setWait] = useState(true);

    useEffect(() => {
        getProfileReq((isOk, data) => {
            if (!isOk) {
                toast.error(`به صفحه ورود منتقل خواهید شد ${data}`);
                localStorage.clear();
                return history.push("/login");
            }
            setWait(false);
            localStorage.setItem("name", data.name);
            localStorage.setItem("image", data.image);
            localStorage.setItem("username", data.username);
            localStorage.setItem("x-auth-token", data["x-auth-token"]);
        })
    }, [])
    if (wait)
        return <div className="col-12 text-secondary text-center">
            <ReactLoading className="m-auto" type={"cylon"} color={"gray"} height={'20%'} width={'20%'} />
            <h2>لطفا شکیبا باشید</h2>
        </div>;

    else
        return (

            <div className="row overflow-hidden">
                <RightSidebar />
                <div className="divider-y" />
                <div className="main text-right">
                    {props.children}
                </div>
                <div className="divider-y" />
                <LeftSidebar />
            </div>
        );
}

export default Layout;