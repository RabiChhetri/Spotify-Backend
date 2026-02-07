const mongosee=require('mongoose')

async function connectDB() {
 try {
    await mongosee.connect(process.env.MONGODB_URI)
    console.log('Connected to Database Sucessfully')
 } catch (error) {
    console.log('Database Connection Error',error)
 }   
}
module.exports=connectDB