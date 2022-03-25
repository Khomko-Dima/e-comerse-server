import { IMiddleware } from "./mddleware.interface";
import { NextFunction, Request, Response } from "express";
import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

export class ValidateQueryMiddleware implements IMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {}

  execute({query}: Request, res: Response, next: NextFunction) {
    const instance = plainToClass(this.classToValidate, query)
    validate(instance).then((errors) => {
      if (errors.length > 0) {
        res.status(422).send(errors)
      } else {
        next()
      }
    })
  }
}