import { httpAxios } from "@/helper/axiosSetup";
import { notesModel } from "@/models/notesModel";


export async function createNotes(notes){
    try {
      let result= await httpAxios.post('/api/notes',notes)
      .then((resp)=> resp.data)
      console.log("notesService--> ",result);
      return result;
    } catch (error) {
        console.log("notesServiceError--> ",error);
        return error
    }
}


export async function getNotesList(userId){
  try {

    let list=await httpAxios
    .get(`/api/users/${userId}/shownotes`)
    .then((resp)=>resp.data);
    console.log(list)
    return list
    
  } catch (error) {
    
  }
}

export async function deleteAllNotes(userId){
  console.log(userId)
  const result=await httpAxios
  .delete(`/api/notes/deleteAll/${userId}`)
  .then((resp)=>resp.data);
  return result;

}

export async function deleteNotes(notesId){
  console.log("taskServicedetlet-->", notesId)
    const result= await httpAxios
    .delete(`/api/notes/${notesId}`)
    .then((resp)=>resp.data);
    return result;

}

export async function editNotes(task_id,editData){
  console.log("((())",editData)
  const result=await httpAxios
  .put(`api/notes/updateNotes/${task_id}`,editData)
  .then((resp)=>resp.data)
  return result;
}
