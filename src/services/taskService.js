import { httpAxios } from "@/helper/axiosSetup";
import { taskModel } from "@/models/task";

export async function addTask(task){
    try {
      let result= await httpAxios.post('/api/tasks',task)
      .then((resp)=> resp.data)
      console.log("taskService--> ",result);
      return result;
    } catch (error) {
        console.log("taskServiceError--> ",error);
        return error
    }
}

export async function getTaskList(userId){
    try {

      let list=await httpAxios
      .get(`/api/users/${userId}/showtasks`)
      .then((resp)=>resp.data);
      console.log(list)
      return list
      
    } catch (error) {
      
    }
}

export async function deleteTask(taskId){
  console.log("taskServicedetlet-->", taskId)
    const result= await httpAxios
    .delete(`/api/tasks/${taskId}`)
    .then((resp)=>resp.data);
    return result;

}

export async function deleteAllTask(userId){
     console.log(userId)
     const result=await httpAxios
     .delete(`/api/tasks/deleteAll/${userId}`)
     .then((resp)=>resp.data);
     return result;
}

export async function updateTask(task_id){
     const result=await httpAxios
     .put(`/api/tasks/${task_id}`)
     .then((resp)=>resp.data);
     return result;

}

export async function editTask(task_id,editData){
   const result=await httpAxios
   .put(`api/tasks/updateTask/${task_id}`,editData)
   .then((resp)=>resp.data)
   return result;
}


export async function addStats(pendingTask,taskCompleted){
  const result=await httpAxios
  .post(`/api/statsdata`)
  .then((resp)=>resp.data);
  return result;

}