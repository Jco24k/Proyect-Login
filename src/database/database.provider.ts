import { DynamicModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ConnectOptions } from "mongoose";
import { Environment } from "src/common/enum/enviroment.enum";


export const DatabaseProvider: DynamicModule = MongooseModule.forRootAsync({
    imports: [ ConfigModule],
    useFactory: async (config: ConfigService)=>({
        uri: config.get<String>('MONGO_DB')
    }),
    inject: [ConfigService]
})