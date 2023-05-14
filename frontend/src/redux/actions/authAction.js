import api from '../../api/http'
import{REGISTER_SUCCESS,REGISTER_FAIL,AUTH_ERROR,USER_LOADED,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT,ClEAR_PROFILE} from '../types/type'
import setAuthToken from '../../utils/setAuthToken'
import { setAlert } from './alertAction'

//load user
export const laodUser=()=>async dispatch=>{
if(localStorage.token){
    setAuthToken(localStorage.token)
}
try {
    const res=await api.get('api/auth')
    console.log(res)
    dispatch({
        type:USER_LOADED,
        payload:res.data
    }
    )
} catch (error) {
    dispatch({
        type:AUTH_ERROR
    })
}
}
//Register user
export const register=({name,email,password,role},navigate)=> async dispatch =>{
    try {
        const res=await api.post('/api/users',{name,email,password,role})
        console.log( res.data.token)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
            
        })
        dispatch(laodUser())
        navigate("/dashboard")
    } catch (error) {
        const errors=error.response.data.errors
        console.log(error.response.data)
        if(errors){
            errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
     console.error(error)   
    }
        dispatch({
            type:REGISTER_FAIL,
            payload:error.response.data
        })
    }
}
//login user
export const login=({email,password},navigate)=> async dispatch =>{
    try {
        const res= await api.post('/api/auth',{email,password})
        console.log( res.data.token)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
            
        })
        dispatch(laodUser())
        navigate("/dashboard")
    } catch (error) {
        const errors=error.response.data.errors
        if(errors){
            errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
     console.error(error)   
    }
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data
        })
    }
}
//logout
export const logout=()=>async dispatch=>{
    
    dispatch({type:LOGOUT})

  
}