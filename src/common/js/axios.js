import axios from 'axios'

var  baseURL = '';
//const baseURL = 'http://yun-test.kinglian.net:9081';
//const baseURL = 'http://192.168.52.55:8080';   //鸿俊
//baseURL = 'http://192.168.51.90:8090';   //范巍权
//const baseURL = 'http://192.168.52.59:8080';     //浩彬
baseURL = 'http://192.168.52.57:8080';     //钟桂国 
//baseURL = 'http://192.168.52.55:8080';     //陈海洋
//baseURL = 'http://192.168.52.53:8080';     //曾海
//baseURL = 'http://yun-test.kinglian.net:9080'; //测试平台
//baseURL = 'http://ywgl.kinglian.cn'; //正式平台



const service = axios.create({
    baseURL: baseURL,              //api的 base_url
    timeout: 600000                //请求超时时间
});

service.interceptors.request.use(config => {
    return config;
},error => {
    Rromise.reject(error)
});

service.interceptors.response.use(response => {
    return response.data;          //返回数据
},error => {
    return Promise.reject(error)
})

export default service