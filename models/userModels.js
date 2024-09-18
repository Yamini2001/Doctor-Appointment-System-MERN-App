const { default: Password } = require('antd/es/input/Password');
const mysql2 = require('mysql2');

const userSchema = new mysql2.Schema({
    name:{
        type: String,
        required: [true,'name is require']
    },
    email:{
        type:String,
        required: [true,'email is require']
    },
    Password:{
        type:String,
        required: [true,'password is require']
    },

})

const userModel = mysql2.model('users',userSchema)

module.exports = userModel;