import { NextResponse } from "next/server";

export function middleware(request){
    const authToken=request.cookies.get('loginToken')?.value;

    if(request.nextUrl.pathname==='/api/login'|| request.nextUrl.pathname==='/api/users'){
        return
    }
    
    const notAccessRoute= request.nextUrl.pathname==='/login'||request.nextUrl.pathname==='/Signup';
    // console.log("middleware called..")   
    if(notAccessRoute){
        if(authToken){
            return NextResponse.redirect(new URL('/profile',request.url));
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
        '/profile',
        '/task',
        '/tasklist',
        '/profile/:path*',
        '/api/:path*'
    ]
}