const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const {constants} = require("../constants");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getAllContacts = asyncHandler(async (req,res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    console.log(contacts);
  
    res.status(200).json(contacts)
});

//@desc Get a contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found..!");
    }
    else
    {
        res.status(200).json(contact);
    }
    
});

//@desc Add a contacts
//@route POST /api/contacts
//@access private
const addContact = asyncHandler(async (req,res) => {
    //console.log("The request body is ", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone)
    {
        res.status(403);
        throw new Error ("All fields are mandatory");
    }
    else{
        const contact = await Contact.create({
            name,
            email,
            phone,
            user_id: req.user.id,
        });
        res.status(201).json(contact);
    }
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req,res) => {
    const contact  = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found..!");
    }
    else
    {
        if(contact.user_id.toString() !== req.user.id)
        {
            res.status(403);
            throw new Error ("User dont have the permission to update other user contacts..!");
        }
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updatedContact);
    }
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found..!");
    }
    else
    {
        if(contact.user_id.toString() !== req.user.id)
        {
            res.status(403);
            throw new Error ("User dont have the permission to delete other user contacts..!");
        }
        await Contact.deleteOne(contact);
        res.status(200).json(contact);
    }
});

module.exports = {getAllContacts,getContact,addContact,updateContact,deleteContact};