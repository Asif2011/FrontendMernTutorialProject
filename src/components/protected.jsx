import { Navigate } from 'react-router-dom'

function Protected({isauth, children}){
    if(isauth){
        return children
    }
    else{
        // return <Navigate to="/login" replace />
        return <Navigate to="/login" />
        
    }
}

export default Protected