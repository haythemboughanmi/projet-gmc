import api from '../api/http.js'

const setAuthToken=token=>{
    if(token){
        api.defaults.headers.common['mytoken']=token
    }else{
        delete api.defaults.headers.common['mytoken']
    }
}
export default setAuthToken