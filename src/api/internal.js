import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const login = async (data) => {
    let response
    try {
        response = await api.post('/login', data)
    } catch (e) {
        return e
    }
    return response
}

export const signout = async () => {
    let response
    try {
        response = await api.post('/logout')
    } catch (e) {
        return e
    }
    return response
}

export const signupCall = async (data) => {
    let response
    try {
        response = await api.post('/register', data)
    } catch (e) {
        return e
    }
    return response
}

export const getAllBlogs = async () => {
    let response
    try {
        response = await api.get('/allblogs')
    } catch (error) {
        return error
    }
    return response
}

export const createBlogAPI = async (data) => {
    let response;
    try {
        response = await api.post('/create', data)

    } catch (error) {
        return error
    }
    return response
}

api.interceptors.response.use(
    (config) => {
        console.log('interception auto response function is called')
        return config
    },
    async (error) => {
        console.log('interception auto error function is called')
        const original_request = error.config
        if ((error.response.status === 401 || error.response.status === 500) && original_request && !original_request._isRetry) {
            original_request._isRetry = true
            console.log('interceptor call with condition is true')
            try {
                await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/refresh`, {
                    withCredentials: true
                })
                return api.request(original_request)

            } catch (e) {
                return e
            }
        }
        throw error;
    }
)



export const getBlogByID = async (blogID)=>{
    let response;
    try {
        response = await api.get(`/blog/${blogID}`)
    } catch (error) {
        response = error
    }
    return response
}


export const updateBlogByID = async (newblogdata)=> {
    let response;
    try {
        response = await api.put('/update', newblogdata)
    } catch (e) {
        return e
    }
    return response
}