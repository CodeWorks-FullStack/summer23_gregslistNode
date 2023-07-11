import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CarsService {



  async getCars() {
    // NOTE "find" is a mongoose method used to bring back multiple pieces of data from a collection in our database. if no argument is provided, it will return everything
    // REVIEW https://mongoosejs.com/docs/api/model.html#Model.find()
    const cars = await dbContext.Cars.find()

    return cars
  }

  async getCarById(carId) {

    // NOTE findById is a mongoose method that will return one piece of data that has a matching _id in our database
    // REVIEW https://mongoosejs.com/docs/api/model.html#Model.findById()
    const car = await dbContext.Cars.findById(carId)

    if (!car) {
      throw new BadRequest(`No car found with this id: ${carId}`)
    }

    return car
  }

  async createCar(carData) {
    // NOTE create is a mongoose method that will store data in our database if it passes all of our validation set up in the chema registered to this collection
    // REVIEW https://mongoosejs.com/docs/api/model.html#Model.create()
    const car = await dbContext.Cars.create(carData)

    return car
  }

  async removeCar(carId, userId) {
    // NOTE works, but we need to do some checks before firing this off
    // await dbContext.Cars.findByIdAndDelete(carId)

    // NOTE we get the car that the user wants to delete so we can verify that the user actually created the car
    const carToDelete = await this.getCarById(carId)

    // NOTE if you are not the creator of the car, throw error
    // NOTE we have to 'toString' the property on this object since what mongoose maps our data into is not a normal POJO 
    if (carToDelete.creatorId.toString() != userId) {
      throw new Forbidden(`YOU ARE NOT THE OWNER OF THE ${carToDelete.make} ${carToDelete.model}`)
    }

    await carToDelete.remove()

  }

  async updateCar(carId, userId, carData) {

    const originalCar = await this.getCarById(carId)

    // NOTE if you are not the creator of the car, throw error
    if (originalCar.creatorId.toString() != userId) {
      throw new Forbidden(`YOU ARE NOT THE OWNER OF THE ${originalCar.make} ${originalCar.model}`)
    }

    originalCar.make = carData.make || originalCar.make
    originalCar.model = carData.model || originalCar.model
    originalCar.price = carData.price || originalCar.price
    originalCar.color = carData.color || originalCar.color
    // NOTE we only do this on bools
    originalCar.ownedByGrandma = carData.ownedByGrandma != null ? carData.ownedByGrandma : originalCar.ownedByGrandma

    // NOTE updates the original piece of data in the database
    await originalCar.save()

    return originalCar

  }
}

export const carsService = new CarsService()