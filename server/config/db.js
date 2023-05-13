import mongoose from 'mongoose'

export const ConnectDb =async()=>{
    try {
        await mongoose.connect(process.env.URI)
        console.log(`connected database ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`Mongodb server issue ${error}`)
    }
}
