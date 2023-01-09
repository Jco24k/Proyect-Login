import { Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Role } from "../../roles/entities/role.entity";
import { User } from "../../User/entities/User.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { //VALIDACION DEL JWT PERSONALIZADO

    constructor(
        @InjectModel(User.name)
        private readonly UserModel: Model<User>,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: JwtPayload): Promise<User> { 
        const { id } = payload;
        const user = await (await this.UserModel.findById(id));
        if (!user) throw new UnauthorizedException('Token not valid');
        if (!user.status) throw new UnauthorizedException('User is inactive, talk with an admin');
        return await (await this.UserModel.findById(id)).populate('roles');
    }
}