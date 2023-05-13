import userModel from "../../models/userModels.js";

const oldUser = async(email) =>{
   const exist = await userModel.findOne(email)
   if(exist){
    return true
   }
   else{
    return false
   }
}
export default oldUser