import axios from 'axios';

const instance = axios.create({ 
    baseURL: 'https://bgm536w4-3008.use2.devtunnels.ms/api'
});

export default instance;