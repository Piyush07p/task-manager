
import { userModel } from "@/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createDb } from "@/db/connectDb";


export async function GET(request){
 
  const authToken=request.cookies.get('loginToken')?.value;
  const data=jwt.verify(authToken,process.env.JWT_KEY);
  console.log(data)
  await createDb();
  const userData=await userModel.findById(data._id).select('-password');

  return NextResponse.json(userData)

}