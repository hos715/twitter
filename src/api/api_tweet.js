
import { toast } from 'react-toastify';
import { getAxiosInstanceApi } from './api';

export const getAllTweets = (callback) => {
    getAxiosInstanceApi().post("/getAllTweet")
        .then(response => {
            const data = response.data;
            callback(true, data);
            console.log(data);
        }).catch(error => {
            callback(false, error);
            // toast.warning(`توییت ها ارور داره ${error}`);
            // console.log(error);
        })
};
export const getTweetByHashtagReq = (hashTag ,callback) => {
    getAxiosInstanceApi().post("/getAllTweet",{hashTag})
        .then(response => {
            const data = response.data;
            callback(true, data);
            console.log(data);
        }).catch(error => {
            callback(false, error);
        })
};
export const getTweetByUserReq = (user ,callback) => {
    getAxiosInstanceApi().post("/getAllTweet",{user})
        .then(response => {
            const data = response.data;
            callback(true, data);
            console.log(data);
        }).catch(error => {
            callback(false, error);
        })
};

export const likeTweetReq = (id, callback) => {
    getAxiosInstanceApi().get("/likeTweet/" + id)
        .then(response => {
            const data = response.data;
            callback(true, data);
        }).catch(error => {
            callback(false, error);
        });
};

export const getHashtags = (callback) => {
    getAxiosInstanceApi().get("/getAllHashTags")
        .then(response => {
            const data = response.data;
            callback(true, data);
        }).catch(error => {
            callback(false, error);
        });
};

export const getUsers = (callback) => {
    getAxiosInstanceApi().get("/getAllUser")
        .then(response => {
            const data = response.data;
            callback(true, data)
        }).catch(error => {
            toast.warning(`یوزر ارور داره ${error}`);
            callback(false, error);
        });

};
export const newTweetRequest = (data, callback) => {
    getAxiosInstanceApi().post("/newTweet", data)
        .then(response => {
            const data = response.data;
            callback(true, data);
        }).catch(error => {
            callback(false, error);
        });
};