import { NextResponse } from "next/server";

export function middleware(request){
    const authToken=request.cookies.get('loginToken')?.value;

    if(request.nextUrl.pathname==='/api/login'|| request.nextUrl.pathname==='/api/users'|| request.nextUrl.pathname==='/api/cron'){
        return 
    }
    
    const notAccessRoute= request.nextUrl.pathname==='/login'||request.nextUrl.pathname==='/Signup'||request.nextUrl.pathname==='/api/cron';
    // console.log("middleware called..")   
    if(notAccessRoute){

        console.log("inside notAccessRoute")
        if(authToken){
            console.log("inside loger")
            return NextResponse.redirect(new URL('/',request.url));
        }
    }else{
        if(!authToken){
            if(request.nextUrl.pathname.startsWith('/api')){
                return NextResponse.json({
                    message:"Access denied !!",
                    success:false
                },
                {
                    status:401,
                }
    
                );
            }
            return NextResponse.redirect(new URL('/login',request.url));
        }
    }

}

export const config={
    matcher:[
        '/',
        '/login',
        '/Signup',
        '/task',
        '/notes',
        '/noteslist',
        '/tasklist',
        '/profile',
        '/profile/:path*',
        '/api/:path*'
    ]
}