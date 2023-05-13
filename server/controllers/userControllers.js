import userModel from '../models/userModels.js'
import bcrypt from 'bcrypt'
import oldUser from '../services/exist/oldUser.js'
import jwt from 'jsonwebtoken'


export const registerController = async (req, res) => {
    try {
        
      const exisitingUser = await oldUser( {email:req.body.email});
      if (exisitingUser) {
        return res
          .status(200)
          .send({ message: "User Already Exist", success: false });
      }
      else{
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;

      const newUser = new userModel(req.body);
      await newUser.save();

      res.status(201).send({ message: "Register Sucessfully", success: true });
      }

    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: `Register Controller ${error.message}`,
      });
    }
}
export const loginController =async (req,res)=>{
        try {
                
          const user = await userModel.findOne({ email: req.body.email });

     if(user){
          const isMatch =await bcrypt.compare(req.body.password, user.password);

          if(isMatch){

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d", });
            res.status(200).send({ message: "Login Success", success: true, token });
          }
          else {
            return res.status(200).send({ message: "Invalid Email or Password", success: false });
          }
       
        }
      else  {
          return res
            .status(200)
            .send({ message: "user not found", success: false });
        }
        
        } catch (error) {
            console.log(error)
            res.status(500).send({sucess:false, message : `Login controller ${error.message}`})
        }
}
export const authController = async(req,res)=>{
    try {
      const user = await userModel.findById({ _id: req.body.userId });
      user.password = undefined;
      
      if (!user) {
        return res.status(200).send({
          message: "user not found",
          success: false,
        });
      } else {
        res.status(200).send({
          success: true,
          data: user,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "auth error",
        success: false,
        error,
      });
    }
}