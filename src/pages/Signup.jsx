import TextInput from '../components/TextInput'
import style from './Signup.module.css'
import signupSchema from "../schemas/signupSchema"
import { useFormik } from 'formik'
import { useNavigate } from "react-router-dom";
import { signupCall } from "../api/internal";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";


function SignupPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("")

    const handleSignup = async () => {
        const data = {
            name: values.name,
            username: values.username,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword
        }
        const response = await signupCall(data)
        if (response.status === 201) {
            const user = {
                _id: response.data.user._id,
                name: response.data.user.name,
                username: response.data.user.username,
                auth: response.data.auth
            }
            dispatch(setUser(user));
            navigate('/')
        }
        else {
            console.log(`response status is ${response.status} and \
                response code is ${response.code} and error is \
                ${response.response.data.messsage}`)
            if (response.code === 'ERR_BAD_REQUEST') {

                setError(response.response.data.message)
            }
            else {
                setError('Something went wrong')
            }
        }

    }

    const { handleChange, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            username: '',
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: signupSchema,
    })

    return (
        <div className={style.signupWrapper}>
            <div className={style.signupHeader}>create an account</div>
            <TextInput
                type='text'
                value={values.name}
                name='name'
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Name'
                error={errors.name && touched.name ? 1 : undefined}
                errorMessage={errors.name}
            />
            <TextInput
                type='text'
                value={values.username}
                name='username'
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Username'
                error={errors.username && touched.username ? 1 : undefined}
                errorMessage={errors.username}
            />
            <TextInput
                type='email'
                name='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Email'
                error={errors.email && touched.email ? 1 : undefined}
                errorMessage={errors.email}
            />
            <TextInput
                type='password'
                name='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Password'
                error={errors.password && touched.password ? 1 : undefined}
                errorMessage={errors.password}
            />

            <TextInput
                type='password'
                name='confirmPassword'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Confirm Password'
                error={errors.confirmPassword && touched.confirmPassword ? 1 : undefined}
                errorMessage={errors.confirmPassword}
            />

            <button className={style.signupButton}
                disabled={
                    errors.name || errors.username || errors.email || 
                    errors.password || errors.confirmPassword || 
                    !values.name || !values.username
                }
                onClick={handleSignup}>Sign up</button>
            <span>already have an account?
                <button className={style.login} onClick={() => { navigate('/login') }}>Login</button>
            </span>
            {console.log(`span error is:${error}`)}
            {error !== "" ? <p className={style.errorMessage}>{`error is:${error}`}</p> : ''}
        </div>
    )

}



// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { signupCall } from '../api/internal';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// const signupSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     username: Yup.string().required('Username is required'),
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     password: Yup.string()
//         .matches(
//             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//             'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character'
//         )
//         .required('Password is required'),
//     confirmPassword: Yup.string()
//         .oneOf([Yup.ref('password'), null], 'Passwords must match')
//         .required('Confirm Password is required'),
// });

// const SignupPage = () => {

//     const navigate = useNavigate();
//     const [error, setError] = useState("");

//     const handleSubmit = (values, { setSubmitting }) => {
//         setSubmitting(false);
//         signupCall(values).then((response) => {
//             console.log(`returning the respons from upper handlesubmit`)
//             const {message} = response
//             console.log(`returning the respons from handlesubmit:${message}`)
//             // console.log(`response found is:${JSON.stringify(response,null, 4)}`)
//             // console.log(`response message: ${response.response}`)
//             if (response.status === 201) {
//                 console.log(`request succeeded`)
//                 navigate('/');
//             }error
//             else if (response.code === 'ERR_BAD_REQUEST') {
//                 setError(response.response.data.message)
//                 console.log(`returning the respons from api internal:${error}`)
//             }
//             else{
//                 console.log(`error is ${response}`)
//             }
//         }).catch((e) => {
//             setError(e)
//             console.log('in the catch bloack')
//         });
//     }

//     return (
//         <div>
//             <h1>Signup Page</h1>
//             <Formik
//                 initialValues={{
//                     name: '',
//                     username: '',
//                     email: '',
//                     password: '',
//                     confirmPassword: '',
//                 }}error
//                 validationSchema={signupSchema}
//                 onSubmit={handleSubmit}
//             >
//                 {({ isSubmitting }) => (
//                     <Form>
//                         <div>
//                             <label>Name:</label>
//                             <Field type="text" name="name" />
//                             <ErrorMessage name="name" component="div" />
//                         </div>
//                         <div>
//                             <label>Username:</label>
//                             <Field type="text" name="username" />
//                             <ErrorMessage name="username" component="div" />
//                         </div>
//                         <div>
//                             <label>Email:</label>
//                             <Field type="email" name="email" />
//                             <ErrorMessage name="email" component="div" />
//                         </div>
//                         <div>
//                             <label>Password:</label>
//                             <Field type="password" name="password" />
//                             <ErrorMessage name="password" component="div" />
//                         </div>
//                         <div>
//                             <label>Confirm Password:</label>
//                             <Field type="password" name="confirmPassword" />
//                             <ErrorMessage name="confirmPassword" component="div" />
//                         </div>
//                         <button type="submit" disabled={isSubmitting}>
//                             Signup
//                         </button>
//                     </Form>
//                 )}
//             </Formik>
//         </div>
//     );
// };

export default SignupPage;