import axios from '../env/axios-instance'

export const getDataApi = (endpoint) => {
    return axios.get(endpoint).then((response) => {
        return response.data.response;
    }).catch(err => {
        console.log(err);
        return err;
    })
}

export const postDataApi = (endpoint, data) => {
    return axios.post(endpoint, data).then((response) => {
        return response.data;
    }).catch(err => {
        console.log(err);
        return err;
    })
}