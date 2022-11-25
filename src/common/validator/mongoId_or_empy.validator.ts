import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { isValidObjectId } from 'mongoose';

export function IsMongoIdValid(
  property: string,
  validationOptions?: ValidationOptions, each?: true
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsMongoIdValid',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          if (each) {
            return value.every((rol) => isValidObjectId(rol))
          }
          return (
            isValidObjectId(value) && value === relatedValue
          );
        },
      },
    });
  };
}
