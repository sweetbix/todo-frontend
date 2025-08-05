import axios from 'axios';
import nProgress from 'nprogress';

nProgress.configure({ showSpinner:false });

axios.interceptors.request.use((config) => {
    nProgress.start();
    return config;
});

axios.interceptors.response.use(
    (response) => {
        nProgress.done();
        return response;
    },
    (error) => {
        nProgress.done();
        return Promise.reject(error);
    }
);

export default axios;