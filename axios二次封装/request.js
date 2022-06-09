/*
* axios二次封装
* */
import axios from "axios";

// 定义开发与生产不同接口地址
const baseURL=process.env.NODE_ENV === "development" ? "开发服务器" : "生产服务器"
/*
* 创建axios实例
* */
const server =axios.create({
    baseURL,
    timeout:1000, // 设置超时，如果1s后还没请求回来，结束本次响应
})
/*
* 请求拦截
* */
server.interceptors.request.use(config=>{
    // 设置网络请求轻提示如：alert("网络请请求开始")
    // 设置请求头
    config.headers['Authorization'] = 'Bearer tokenxalfkjadlkjdfalksdfjlakdjf'
    return config
},error => {
    // 出错返回错误
    return Promise.reject(error)
})
/*
* 响应拦截
* */
server.interceptors.response.use(res=>{
    // 如果状态码是在200-300说明请请求成功
    if(res.status >= 200 && res.status <300){
        const {code,data} = res
        // 这个与后端部门定义返回的状态有关
        if(code === 200){
            return data
        }
    }else {
        const err = new Error("请求接口有误")
        return Promise.reject(err)
    }
},error => {
    return Promise.reject(error)
})
export default server
