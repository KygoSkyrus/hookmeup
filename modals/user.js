const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens:[
        {
            token:{
                type:String,
                require:true
            }
        }
    ],
    active: {
    type: Boolean,
    required: true,
    default: false
    }
});

//hashing password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password =await bcrypt.hash(this.password, 12);
    }
    next();
});

//issuing jwt
userSchema.methods.generateAuthToken=async function(){
    try{
        let token =jwt.sign({_id:this._id},process.env.SECRETKEY);//to generrate token
        this.tokens=this.tokens.concat({token:token});//here the second token is the token generated in the above line
        //await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}


//connecting with collection
module.exports = mongoose.model('USER', userSchema); 