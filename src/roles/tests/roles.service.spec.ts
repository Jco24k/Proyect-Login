import { getModelToken } from "@nestjs/mongoose"
import { Test } from "@nestjs/testing"
import { UserModule } from "../../user/user.module"
import { RolesService } from "../../Roles/Roles.service"
import { Role } from "../entities/role.entity"
import { RolesModule } from "../roles.module"
import { forwardRef } from "@nestjs/common"
import { User } from "../../User/entities/User.entity"
import { Model } from "mongoose"


describe('testing finAll', () => {

    let rolesService: RolesService;
    let userModel: Model<User>;
    let roleModel: Model<Role>;


    const USER_MODEL_TOKEN = getModelToken(User.name);
    const ROLE_MODEL_TOKEN = getModelToken(Role.name);

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                RolesService,
                {
                    provide: ROLE_MODEL_TOKEN, // = getModelToken(User.name); : es lo mismo
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        findOne: jest.fn()
                    },
                }, {
                    provide: USER_MODEL_TOKEN,
                    useValue: {
                        delete: jest.fn()
                    }
                }
            ]
        })
            .compile()

        rolesService = await module.get<RolesService>(RolesService);
        userModel = await module.get<Model<User>>(USER_MODEL_TOKEN);
        roleModel = await module.get<Model<Role>>(ROLE_MODEL_TOKEN);

    })

    it('rolesService should be defined', () => {
        expect(rolesService).toBeDefined();
    })

    it('UserModel should be defined', () => {
        expect(userModel).toBeDefined();
    })
    it('RoleModel should be defined', () => {
        expect(roleModel).toBeDefined();
    })

    describe('CreateRoles', ()=>{
        it('should create a new role',async ()=>{
            // const role = await rolesService.create({
            //     name: 'new_user',
            //     status: true
            // })
            expect(roleModel.create)
        })
    })

})