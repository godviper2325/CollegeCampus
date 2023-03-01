// export const initialState= {};


//  export const reducer=(state,action)=>{
//     if(action.type==="USER"){
//         return action.payload
//     }
//     if(action.ty==="CLEAR"){
//         return null
//     }
//     if(action.type==="UPDATE"){
//         return{
//             ...state,
//             followers:action.payload.followers,
//             following:action.payload.following
//         }
//     }
//     return state
//  }
//  export const initialState= {};
export const initialState= null


 export const reducer=(state,action)=>{
    if(action.type==="USER"){
        return action.payload
    }
    if(action.ty==="CLEAR"){
        return null
    }
    if(action.type==="UPDATE"){
        return{
            ...state,
            followers:action.payload.followers,
            following:action.payload.following
        }
    }
    return state
 }