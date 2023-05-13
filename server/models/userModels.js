import mongoose from 'mongoose'

const userSchema = new mongoose.Schema (
    {
        name :{type :String , require: [true , "name is require"]},
        email :{type :String , require: [true , "email is require"]},
        password :{type :String , require: [true , "password is require"]},
    }

)

const userModel = mongoose.model('users',userSchema)

export default userModel