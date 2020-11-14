import React, { useState } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { loginApi, registerApi } from './../../api/api_auth';

const AuthPage = () => {

    const [tab, setTab] = useState('Login_Tab');

    //Login state
    const [usernameLogin, setUsernameLogin] = useState();
    const [passwordLogin, setPasswordLogin] = useState();

    //Register state
    const [fullnameRegister, setFullnameRegister] = useState();
    const [usernameRegister, setUsernameRegister] = useState();
    const [passwordRegister, setPasswordRegister] = useState();
    const [confPasswordRegister, setConfPasswordRegister] = useState();

    const validateLogin = (user) => {
        console.log("validation run");
        if (!user.username)
            return "نام کاربری باید حتما وارد شود";
        else if (!user.password)
            return "رمز عبور باید حتما وارد شود";
        else if (user.password.length < 6) {
            return "رمز عبور باید حداقل 6 کاراکتر باشد";
        }
    }
    const handleLogin = () => {
        const user = {
            username: usernameLogin,
            password: passwordLogin
        };
        const error = validateLogin(user);
        if (error)
            return toast.warning(error);
        loginApi(user, (isOk, data) => {
            if (!isOk)
                return toast.error(data);
            toast.success("ورود با موفقیت انجام شد")
            localStorage.setItem("name", data.name);
            localStorage.setItem("image", data.image);
            localStorage.setItem("username", data.username);
            localStorage.setItem("x-auth-token", data["x-auth-token"]);
            
            
        });
    };

    const validatePassword = (user) => {
        console.log("validation run");
        if (!user.name)
            return "نام و نام خانوادگی باید حتما وارد شود";
        if (!user.username)
            return "نام کاربری باید حتما وارد شود";
        else if (!user.password)
            return "رمز عبور باید حتما وارد شود";
        else if (!user.confPasswordRegister)
            return "تکرار رمز عبور باید حتما وارد شود";
        else if (user.confPasswordRegister !== user.password)
            return "رمز عبور و تکرار آن باید حتما مشبابه باشد";
        else if (user.password.length < 6) {
            return "رمز عبور باید حداقل 6 کاراکتر باشد";
        }
    }
    const handleRegister = () => {
        const user = {
            name: fullnameRegister,
            username: usernameRegister,
            password: passwordRegister,
            confPasswordRegister: confPasswordRegister,
        }
        const error = validatePassword(user);
        if (error)
            return toast.warning(`پیغام خطا: ${error}`);
        user.confPasswordRegister = undefined;
        registerApi(user, (isOk, data) => {
            if (!isOk)
                return toast.error(`ثبت نام انجام نشد دلیل: ${data}`);
            toast.success("ثبت نام با موفقیت انجام شد");
            localStorage.setItem("name:", data.name);
            localStorage.setItem("username:", data.username);
            localStorage.setItem("x-auth-token", data["x-auth-token"]);
        })
    }

    return (
        <div className="col-md-6 bg-light mx-auto mt-5">
            <h2 className="text-center text-primary col-12 p-3">ب توئیتر فارسی خوش آمدید</h2>
            <Tabs
                id="controlled-tab-example"
                activeKey={tab}
                onSelect={(T) => setTab(T)}
                style={{ display: "flex" }}
            >
                <Tab eventKey="Login_Tab" title="ورود" style={{ flex: "1" }}>
                    <form style={{ display: "grid", textAlign: "center" }} className="text-center p-5">
                        <input className="form-control" placeholder="نام کاربری"
                            value={usernameLogin} onChange={e => setUsernameLogin(e.target.value)} />
                        <br />
                        <input className="form-control" placeholder="رمز عبور"
                            value={passwordLogin} onChange={e => setPasswordLogin(e.target.value)} />
                        <br />
                        <Button variant="warning" size="lg" block onClick={handleLogin}>ورود</Button>
                    </form>
                </Tab>
                <Tab eventKey="Register_Tab" title="ثبت نام" style={{ flex: "1" }}>
                    <section>
                        <form style={{ display: "grid", textAlign: "center" }} className="text-center p-5">
                            <input className="form-control" placeholder="نام و نام خانوادگی"
                                value={fullnameRegister} onChange={e => setFullnameRegister(e.target.value)} />
                            <br />
                            <input className="form-control" placeholder="نام کاربری"
                                value={usernameRegister} onChange={e => setUsernameRegister(e.target.value)} />
                            <br />
                            <input className="form-control" placeholder="رمز عبور"
                                value={passwordRegister} onChange={e => setPasswordRegister(e.target.value)} />
                            <br />
                            <input className="form-control" placeholder="تکرار رمز عبور"
                                value={confPasswordRegister} onChange={e => setConfPasswordRegister(e.target.value)} />
                            <br />
                            <Button variant="primary" size="lg" block onClick={handleRegister}>ثبت نام</Button>
                        </form>
                    </section>
                </Tab>
            </Tabs>
        </div>
    );
}

export default AuthPage;