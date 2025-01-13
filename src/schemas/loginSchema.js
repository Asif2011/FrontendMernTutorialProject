import * as yup from 'yup'

const loginSchema = yup.object().shape(
    {
        username: yup.string().min(2).max(30).required("Please Provide Username"),
        password: yup.string().min(8).max(30).required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character")
    }
)
export default loginSchema