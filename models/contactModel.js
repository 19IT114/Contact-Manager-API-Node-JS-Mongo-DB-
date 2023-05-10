const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    name: {
        type:String,
        required:[true, "Name cannot be empty..!"]
    },
    email:{
        type: String,
        required:[true, "Email cannot be empty..!"]
    },
    phone:{
        type: String,
        required:[true, "Phone number cannot be empty..!"]
    }
}, 
{
    timestamps : true
});

module.exports = mongoose.model("Contacts", contactSchema);