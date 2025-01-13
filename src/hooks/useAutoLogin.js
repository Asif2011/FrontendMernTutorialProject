import { useState, useEffect } from "react"
import axios from "axios"
import { setUser } from "../store/userSlice"
import { useDispatch } from "react-redux"



function useAutoLogin() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    useEffect(
        () => {
            (async function autoLogin() {

                const api = axios.create({
                    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                let response
                try {
                    response = await api.get('/refresh')
                    console.log(`autoLogin called`)

                    if (response.status === 200) {
                        const user = {
                            _id: response.data.user._id,
                            username: response.data.user.username,
                            name: response.data.user.name,
                            auth: response.data.auth
                        }
                        dispatch(setUser(user))
                        console.log(`autologin try block completed`)
                    }
                } catch (error) {
                    console.log(`autologin catch block completed${error}`)
                    // console.log(`error in refreshing is:${error} and message is ${response.response.data.message}`)
                } finally {
                    setLoading(false)
                }
            }
            )()
        }
        ,
        []
    )
    return loading;// return true if not logged in, false if logged in
}

export default useAutoLogin