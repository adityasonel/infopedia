import { axiosGet } from "./NetworkMethod";

let fetchList = value => {
    return new Promise((resolve, reject) => {
        axiosGet(value)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};

export { fetchList };
