import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({name: 'isPhone', async: false})
export class IsPhoneConstraint implements ValidatorConstraintInterface {
  validate(phone: string) {
    // Your phone number validation logic here
    // You can use any library or regex to validate the phone number
    // For example, you can use a regex pattern to match a valid phone number
    const phoneRegex = /^\d{10}$/ // Assuming a 10-digit phone number
    return phoneRegex.test(phone)
  }
}

export function IsPhone(validationOptions?: ValidationOptions) {
  return function (object: ObjectConstructor, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhoneConstraint,
    })
  }
}
