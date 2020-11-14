import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from './../../api/api_tweet';
import { toast } from 'react-toastify';
import { uploadUserPhoto } from '../../api/api_auth';

const BestUsers = ({ name, id, img }) => {
    const getImage = () => {
        if (img)
            return img;
        return "/img/user.png"
    }
    return (
        <div className="col-12 best-twitter-profiles" >
            <img src={getImage()} alt="Bests-Twitter" />
            <div className="">
                <h6>{name}</h6>
                <p>{id}</p>
            </div>
        </div>
    );
};
const LeftSidebar = () => {

    const [Users, setUsers] = useState([]);
    const [anchor, setAnchor] = useState([]);
    const [imageFile, setImageFile] = useState();
    const [imagePath, setImagePath] = useState();
    const inputRef = useRef();
    const handleShowSetting = () => {
        if (anchor) {
            setAnchor(null);
        } else {
            setAnchor("show");
        }
    }
    useEffect(() => {
        getUsers((isOk, data) => {
            if (!isOk)
                return toast.warning(`یوزرا از سرور دریافت نشدن ${data}`);
            setUsers(data);
        })
    }, []);
    const handleLogOut = () => {
        localStorage.clear();
        window.location.reload();
    }
    const getImage = () => {
        if (imagePath)
            return imagePath;
        if (localStorage.getItem("image") && localStorage.getItem("image") !== 'undefined')
            return localStorage.getItem("image");
        return "/img/user.png"
    }
    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
            console.log(imageFile);

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePath(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);

            const formData = new FormData();
            formData.append("image", e.target.files[0]);
            uploadUserPhoto(formData, (isOk, data) => {
                if (!isOk)
                    toast.error(`آپلود نا موفق ${data}`);
                toast.success("آپلود موفقیت آمیز بود");
                localStorage.setItem("image", data.imagePath);

            });
        }
    }
    return (
        <div className="col-sm-2"  >
            <div className="avatar-section" onClick={handleShowSetting} >
                <img className="img-avatar" src={getImage()} alt="avatar" />
                <div className="">
                    <h6>{localStorage.getItem("name")}</h6>
                    <p className="text-secondary">{localStorage.getItem("username")}</p>
                </div>
            </div>
            <div className={anchor ? "pnl-account-setting" : "pnl-account-setting show"}
                onMouseLeave={handleShowSetting}>
                <div className="text-right anchor-item" onClick={handleLogOut}>
                    <p>خروج</p>
                </div>
                <div className="text-right anchor-item" onClick={() => (inputRef.current.click())}>
                    <p>تغییر تصویر</p>
                </div>
            </div>
            <input ref={inputRef} type={'file'} style={{ display: "none" }} onChange={handleAvatarChange} />

            <div className="best-twitter">
                <h4 className="title">بهترین  خبرنگاران</h4>
                {Users.map(item =>
                    <Link to={`/users/${item._id}/${item.name}`} className="btn btn-outline-secondary hashtag">
                        <BestUsers name={item.name} id={item.username} img={item.image} />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default LeftSidebar;