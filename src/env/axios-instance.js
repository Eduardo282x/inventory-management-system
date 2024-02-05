import axios from 'axios';

const instance = axios.create({ 
    baseURL: 'https://3kqd6h01-3008.use2.devtunnels.ms/api'
});

export default instance;