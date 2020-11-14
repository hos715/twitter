import Axios from 'axios'

export const getAxiosInstanceJsonserver = () => {
    return Axios.create({
        baseURL: "http://localhost:3000/",
        headers: {
            all: {
                API_KEY: "ashdjkashdkjasjdnmّnajncjkasckja"
            }
        }
    });
};
export const getAxiosInstanceAuth = () => {
    return Axios.create({
        baseURL: "https://twitterapi.liara.run/api",
        headers: {
            all: {
                // API_KEY: "ashdjkashdkjasjdnmّnajncjkasckja"
            }
        }
    });
};
export const getAxiosInstanceApi = () => {
    return Axios.create({
        baseURL: "https://twitterapi.liara.run/api",
        headers: {
            'x-auth-token': localStorage.getItem("x-auth-token")
        }
    });
};