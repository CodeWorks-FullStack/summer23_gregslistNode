import { Auth0Provider } from "@bcwdev/auth0provider";
import { carsService } from "../services/CarsService.js";
import BaseController from "../utils/BaseController.js";

export class CarsController extends BaseController {
  constructor () {
    super('api/cars')
    this.router
      // NOTE no auth required
      .get('', this.getCars)
      .get('/:carId', this.getCarById)

      // NOTE anything after the .use requires a bearer token 
      .use(Auth0Provider.getAuthorizedUserInfo)
      // NOTE auth required

      .post('', this.createCar)
      .delete('/:carId', this.removeCar)
      .put('/:carId', this.updateCar)
  }

  async getCars(req, res, next) {
    try {
      const cars = await carsService.getCars()

      res.send(cars)
    } catch (error) {
      next(error)
    }
  }

  async getCarById(req, res, next) {
    try {
      const carId = req.params.carId

      const car = await carsService.getCarById(carId)

      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async createCar(req, res, next) {
    try {
      const carData = req.body

      // NOTE the .use will automatically attach the userInfo object to all of our requests. It contains the id, name, and picture of the user making the current HTML request. The id is what we use to validate who is making the request
      // NOTE we pull the Id of the user making the request and attach it to the requst body object
      // NOTE NEVER EVER trust the client to send this information to you in the request body
      carData.creatorId = req.userInfo.id

      const car = await carsService.createCar(carData)

      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async removeCar(req, res, next) {
    try {

      const carId = req.params.carId

      // NOTE we grab the user Id so that we can validate if the user is allowed to delete the specific car referenced in the route parameters
      const userId = req.userInfo.id

      await carsService.removeCar(carId, userId)

      res.send('Car was deleted!')

    } catch (error) {
      next(error)
    }
  }

  async updateCar(req, res, next) {
    try {

      const carId = req.params.carId

      // NOTE we grab the user Id so that we can validate if the user is allowed to edit the specific car referenced in the route parameters
      const userId = req.userInfo.id

      const carData = req.body

      const updatedCar = await carsService.updateCar(carId, userId, carData)

      res.send(updatedCar)

    } catch (error) {
      next(error)
    }
  }
}