import { httpAxios } from "@/helper/axiosSetup";

export async function addUser(user){
    try {
      let result= await httpAxios.post('/api/users',user).then((resp)=> resp.data)
      console.log("userServiceRes--> ",result);
      return result;
    } catch (error) {
        console.log("userServiceErr--> ",error);
        return error;
    }
}

export async function loginUser(user){
  try {
    let result=await httpAxios
    .post('/api/login',user)
    .then((resp)=>resp.data);
    console.log("loginService--> ", result)
    return result;
    
  } catch (error) {
    console.log("loginServiceErr--> ", error)
    return error;
  }
}

export async function currentUser(){
  try {
    let result=await httpAxios
    .get('/api/currentUser')
    .then((resp)=>resp.data);
    
    return result;
    
  } catch (error) {
    console.log("currentServiceErr--> ", error)
    return error;
  }
}

export async function logoutUser(){
  try {
    let result=await httpAxios
    .post('/api/logout')
    .then((resp)=>resp.data);
    
    return result;
    
  } catch (error) {
    console.log("logoutServiceErr--> ", error)
    return error;
  }
}