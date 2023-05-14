import api from '../../api/http'
import { setAlert } from './alertAction'
import {ClEAR_PROFILE, DELETE_ACCOUNT, GET_PROFILE,GET_PROFILES,PROFILE_ERROR, UPDATE_PROFILE,GET_REPOS,ADIMINDELETE} from '../types/type'
import axios from 'axios'
 
//get current profile
export const getCurrentProfile=()=> async dispatch =>{
    try {
        const res=await api.get('/api/profile/me')
        console.log(res.data)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
           
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
//get all profile
export const getAllProfile=()=> async dispatch =>{
    try {
        const res=await api.get('/api/profile')
        console.log(res)
        dispatch({
            type:GET_PROFILES,
            payload:res.data
           
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
//get profile by Id
export const getProfileById=(id)=> async dispatch =>{
    try {
        const res=await api.get(`/api/profile/user/${id}`)
        console.log(res.data)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
           
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
//get github repos
export const getGithybRepos=(username)=> async dispatch =>{
    try {
        const res=await api.get(`/api/profile/github/`+username)
        // const res=await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`)
        
        console.log(res)
        dispatch({
            type:GET_REPOS,
            payload:res.data
        })
        
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
// create or update profile 
export const createProfile=(formData,navigate,edit=false)=>async dispatch=>{
    try {
        const res=api.post('/api/profile',formData)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        dispatch(setAlert(edit ? 'Profile Updated':'Profile Created' ,'success'))
        if(!edit){
            navigate('/dashboard')
            // .push
        }
    } catch (error) {
        const errors=error.response.data.errors
        if(errors){
            errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
//add experience
export const addExperience=(formData,navigate)=>async dispatch=>{
    try {
        const res= api.put('/api/profile/experience',formData)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
            
        })
        console.log(
            res.data
        )
        dispatch(setAlert('Experience Added' ,'success'))
        
            navigate('/dashboard')
            // .push
        
    } catch (error) {
        const errors=error.response.data.errors
        if(errors){
            errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
//add education
export const addEducation=(formData,navigate)=>async dispatch=>{
    
    try {
        const res= api.put('/api/profile/education',formData)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Education Added' ,'success'))
        
            navigate('/dashboard')
            // .push
        
    } catch (error) {
        const errors=error.response.data.errors
        if(errors){
            errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
//delete Experience
export const deleteExperience=id=>async dispatch=>{
    try {
        const res=await api.delete(`/api/profile/experience/${id}`)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Experience Removed' ,'success'))

    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
//delete education
export const deleteEducation=id=>async dispatch=>{
    try {
        const res=await api.delete(`/api/profile/education/${id}`)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Education Removed' ,'success'))

    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
//delete account
export const deleteAccount=()=>async dispatch=>{
    if(window.confirm('Are you sure ? This can NOT be undone')){
        try {
            const res=await api.delete('/api/profile')
            dispatch({type:ClEAR_PROFILE})
            dispatch({type:DELETE_ACCOUNT})

            dispatch(setAlert('Your account has been permanantly deleted' ,'success'))
    
        } catch (error) {
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:error.response.statusText,status:error.response.status}
            })
        }
    }
   
}
//admin delete account 
export const adminDelete=(id,navigate)=>async dispatch=>{
    if(window.confirm('Are you sure ? This can NOT be undone')){
        try {
        const res=api.delete(`/api/profile/${id}`)
        
            dispatch({type:ADIMINDELETE})

            dispatch(setAlert('The account has been permanantly deleted' ,'success'))
            navigate('/dashboard')
        } catch (error) {
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:error.response.statusText,status:error.response.status}
            })
        }
    }
    
}