
import { userModel } from '@/models/user';
import { NextResponse } from 'next/server';
import { createDb } from '@/db/connectDb';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


export async function POST(request){

      const {email,password}=await request.json();
      try {
        // 1. finding user
        await createDb();
        const userData = await userModel.findOne({ email: email });
        if (!userData) {
          throw new Error("invalid user")
        }
        // 2. password checking
        let isMatched = bcrypt.compareSync(password, userData.password);

        if(!isMatched){
          throw new Error("invalid credentails")
        }

        // 3. Generate Token-->
        const token= jwt.sign({
          _id:userData._id,
          name:userData.name
        },
          process.env.JWT_KEY
        );

        console.log("loginApi--->",token)
        //4. Store token in cookie
        let response= NextResponse.json({
          message:"Login success !!",
          success:true
        })

        response.cookies.set("loginToken",token,{
          expiresIn:"1d",
          httpOnly:true
        });

        return response;
      } 
      catch (error) {
        return NextResponse.json({
             Error:error.message,
             success:false
        })
      }
}