import { Schema } from "mongoose";


// NOTE schema comes from mongoose, it allows us to put restraints on the data that is stored in the database, similar to how form validation works
export const CarSchema = new Schema({
  make: {
    // NOTE the data type for this property
    type: String,
    // NOTE this property must be present
    required: true,
    // NOTE the string can't be longer than 50 characters
    maxlength: 50,
    // NOTE the string can't be shorter than 3 characters
    minlength: 3
  },
  year: {
    type: Number,
    required: true,
    // NOTE number can't be greater than 2025
    max: 2025,
    // NOTE number can't be less than 1901
    min: 1901
  },
  model: { type: String, required: true, maxlength: 50, minlength: 1 },
  color: { type: String, maxlength: 100 },
  ownedByGrandma: {
    type: Boolean,
    required: true,
    // NOTE if the ownedByGrandma property is not supplied during the create, it will default to false
    default: false
  },
  miles: { type: Number, required: true, max: 1000000, min: 2 },
  engineType: {
    type: String,
    // NOTE enum means that the engineType property must be one of the strings in this array
    enum: ['v8', 'v6', 'v7', 'v19', 'big', 'small', 'electric', 'check', 'medium'],
    default: 'medium'
  },
  description: { type: String, maxlength: 500 },
  price: { type: Number, required: true, max: 1000000 },
  imgUrl: { type: String, required: true, default: 'https://images.unsplash.com/photo-1610884447640-42b8ec61a933?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1326&q=80', maxlength: 1000 },
  // NOTE this allows to keep track of which account created this car
  creatorId: {
    // NOTE objectId are the id's that are assigned automatically by mongoDB
    type: Schema.Types.ObjectId,
    required: true
  }
},
  {
    // NOTE allows us to have createdAt and updatedAt properties that are assigned automatically by the database
    timestamps: true,
    // NOTE more on virtuals tomorrow....
    toJSON: { virtuals: true }
  }
)