import * as yup from 'yup';

const signupSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, 'Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number and one special character'),
    confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Passwords must match')
})

export default signupSchema;  