import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../User/entities/User.entity';
import { AuthUserDto } from './dto/auth-user.dto';
import { JwtPayload } from './interfaces';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {

  }
  async auth(authUserDto: AuthUserDto) {
    const { password, username } = authUserDto;
    // VERIFICAR EN BD 
    const user = await this.userModel.findOne(
      { username:username },
      { username:true, password:true}
    );
    if(!user){
      throw new UnauthorizedException('Credentials are not valid (username)');
    }
    if(!bcrypt.compareSync(password,user.password)){
      throw new UnauthorizedException('Credentials are not valid (password)');
    }

    return {
      ...user.toJSON(),//ESPARCIR LASVARIABLES DEL USUARIO
      token: this.getJwtToken({ id: user.id })
    };
  }


  getJwtToken(payload: JwtPayload) { return this.jwtService.sign(payload) }

}
