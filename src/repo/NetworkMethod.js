const axios = require("axios");

const axiosGet = url => {
    return axios({
        method: "GET",
        url: url,
        headers: {
            "Content-Type": "application/json"
        }
    });
};

export { axiosGet };
