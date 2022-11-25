import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Console } from 'console';
import { isValidObjectId } from 'mongoose';


//ARCHIVO VALIDA QUE EL ID SEA DE MONGO DB
@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(!isValidObjectId(value))
      throw new BadRequestException(`${value} is not a  valid MongoID`);
    return value;
  }
}
