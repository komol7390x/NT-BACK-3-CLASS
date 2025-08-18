import {Request,Response} from 'express'
class UserController{
    create=async(req:Request,res:Response)=>{
        try {
            
        } catch (error:any) {
            res.status(500).json({
                statusCode:500,
                message:error.message||'Internal Server error'
            })
        }
    }
}

export default new UserController()