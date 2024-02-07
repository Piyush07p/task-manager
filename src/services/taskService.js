import { httpAxios } from "@/helper/axiosSetup";
import { taskModel } from "@/models/task";

export async function addTask(task){
    try {
      let result= await httpAxios.post('/api/tasks',task).then((resp)=> resp.data)
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
    .delete(`api/tasks/${taskId}`)
    .then((resp)=>resp.data);
    return result;

}