import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home/home';
import TweetByHashtag from '../pages/tweetByHashtag';
import TweetsByUser from '../pages/tweetsByUser';
import NotFound404 from '../pages/404';
import Layout from './Layout';
import AuthPage from './../pages/Auth/Auth';
import { ToastContainer } from 'react-toastify';
import { TweetProvider } from '../context/tweetContext';


const App = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path={"/Login"} component={AuthPage} />
                    <PrivateRoute path={"/"} render={() =>
                        <TweetProvider>
                            <Layout>
                                <Switch>
                                    <Route exact path={"/hashtags/:hashtag"} component={TweetByHashtag} />
                                    <Route exact path={"/users/:id/:name"} component={TweetsByUser} />
                                    <Route exact path={"/"} component={Home} />
                                    <Route component={NotFound404} />
                                </Switch>
                            </Layout>
                        </TweetProvider>
                    } />
                </Switch>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
};
const isLogin = () => !!localStorage.getItem("x-auth-token");
const PrivateRoute = ({ render, ...props }) => {
    return <Route {...props} render={(props) => {
        if (isLogin(props))
            return render();
        else return <Redirect to={"/login"} />
    }} />
}
export default App;