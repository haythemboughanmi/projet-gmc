import api from '../../api/http'
import{REGISTER_SUCCESS,REGISTER_FAIL,AUTH_ERROR,USER_LOADED,LOGIN_FAIL,LOGIN_SUCCESS} from '../types/type'
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
export const register=({name,email,password})=> async dispatch =>{
    try {
        const res=await api.post('/api/users',{name,email,password})
        console.log( res.data)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
            
        })
        dispatch(laodUser())
    } catch (error) {
        const errors=error.response.data.errors
        if(errors){
            errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
     console.error(error)   
    }
        dispatch({
            type:REGISTER_FAIL
        })
    }
}
//login user
export const login=(email,password)=> async dispatch =>{
    try {
        const res=await api.post('/api/auth',{email,password})
        console.log( res.data)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
            
        })
        dispatch(laodUser())
    } catch (error) {
        const errors=error.response.data.errors
        if(errors){
            errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
     console.error(error)   
    }
        dispatch({
            type:LOGIN_FAIL
        })
    }
}