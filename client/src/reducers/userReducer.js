export const initialState= {};


 export const reducer=(state,action)=>{
    if(action.type==="USER"){
        return action.payload
    }
    if(action.ty==="CLEAR"){
        return null
    }
    return state
 }