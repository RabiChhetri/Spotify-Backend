const jwt=require('jsonwebtoken')

async function authArtist(req,res,next) {
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:'Unauthorized'
        })
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role!=="artist"){
            return res.status(409).json({
                message:'You are not allowed to upload music'
            })
        }
        req.user=decoded;
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json('Unathorized')
    }
}

async function authUser(req,res,next) {
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:'Unathorized'
        })
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role!=="user" && decoded.role!=="artist"){
            return res.status(403).json({
                message:'You dont have access'
            })
        }
        req.user=decoded
        next()
    } catch (error) {
        console.log(error)
         return res.status(401).json({
            message:'Unathorized'
        })
    }
    
}

module.exports={authArtist,authUser}