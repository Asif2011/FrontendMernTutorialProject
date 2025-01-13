import TextInput from "../components/TextInput"
import style from './login.module.css'
import loginSchema from "../schemas/loginSchema"
import { useFormik } from 'formik'
import { useNavigate } from "react-router-dom"
import { login } from '../api/internal'
import { setUser } from '../store/userSlice'
import { useDispatch } from "react-redux"
import { useState } from "react"


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error,setError] = useState("")
    
    const handleLogin = async () => {
        const data = {
            username: values.username,
            password: values.password,
        }
        
        const response = await login(data)
        if (response.status === 200) {
            const user = {
                _id: response.data.user._id,
                username: response.data.user.username,
                name: response.data.user.name,
                auth: response.data.auth
            }
            dispatch(setUser(user))
            navigate('/')
        }
        else {
            if (response.code === "ERR_BAD_REQUEST") {
                setError(response.response.data.message)
                console.log('ERR_BAD_REQUEST')
            }
            else{
                console.log(`unknown error request as:${response.code}`)
            }
        }

    }


    const { values, touched, handleBlur, handleChange, errors } = useFormik(
        {
            initialValues: {
                username: '',
                password: ''
            },
            validationSchema: loginSchema
        }
    )

    return (
        <div className={style.loginWrapper}>
            <div className={style.loginHeader}>Login to your account</div>
            <TextInput
                type='text'
                value={values.username}
                name='username'
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='username'
                error={errors.username && touched.username ? 1 : undefined}
                errorMessage={errors.username}
            />
            <TextInput
                type='password'
                value={values.password}
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='password'
                error={errors.password && touched.password ? 1 : undefined}
                errorMessage={errors.password}
            />
            <button onClick={handleLogin} className={style.loginButton}
            disabled={
                !values.username || !values.password ||
                errors.password || errors.username || !touched.username ||
                touched.password
            }
            >Login</button>
            <span>dont have an account
                <button onClick={() => navigate('/signup')} className={style.createAccount}>Register</button>
            </span>
            {error !== "" ? <p className={style.errorMessage}>{`error is:${error}`}</p> : ''}
        </div>
    )
}

export default Login