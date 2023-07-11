import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { CarSchema } from '../models/Car.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  // NOTE registers a new collection within mongodb. Cars is the property that we that we access in our code, the 'Car' string names the collection within mongodb, and the CarSchema locks down this collection with the restraints we set up in our CarSchema
  Cars = mongoose.model('Car', CarSchema)
}

export const dbContext = new DbContext()
