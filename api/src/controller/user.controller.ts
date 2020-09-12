import { UserRoleMapService } from './../service/repositories/user-role-map.service';
import { UserRoleMapModel } from './../model/user-role-map.model';
import { UserRequestModel } from './../model/request/user-request.model';
import { UserAdvancedModel } from './../model/user-advanced.model';
import jwt from 'jsonwebtoken';
import { RequestConfig } from './../config/request.config';
import { ResponseConfig } from './../config/response.config';
import { UserService } from '../service/repositories/user.service';
import { AbstractController } from "./abstract.controller";
import { UserModel } from '../model/user.model';
import { RequestMapping, Route, Body, Query } from '../decorator/request.decorator';
import { RequestType } from '../constant/request.constant';
import { ConvertToString, ConvertToNullableString } from '../functions/conversions';
import Q from 'q';
import { SQLQueryResult } from '../model/query-result.model';
import { compare } from '../functions/hashing';
import secrets from '../../config/secrets.config.json';
import { NoAuth, OnlyAuth } from '../decorator/auth.decorators';
import { RoleModel } from '../model/role.model';

@Route('/user', 'LOCATION_USER')
export class UserController extends AbstractController {
    
    @RequestMapping()
    public async GetAll(@Body config: RequestConfig): Promise<ResponseConfig> {
        const service: UserService = new UserService(this.connection);
        let result: ResponseConfig;
        try {
            await Q.ninvoke(this.connection, 'connect');
            const items: UserModel[] = await service.ListAll(config);
            result = {
                IsSuccessful: true,
                Status: 200,
                Body: items
            };
        } catch(e) {
            result = {
                IsSuccessful: false,
                Status: 500,
                Body: e
            };
        } finally{
            this.connection.destroy();
        }
        
        return result;
    }

    @OnlyAuth()
    @RequestMapping(RequestType.GET, '/loggeduser')
    public GetLoggedUser(): ResponseConfig {
        
        return {
            IsSuccessful: true,
            Status: 200,
            Body: this.user
        };
    }

    @RequestMapping(RequestType.GET, '/:id')
    public async GetById(id: number): Promise<ResponseConfig> {
        const service: UserService = new UserService(this.connection);
        let result: ResponseConfig;
        try {
            await Q.ninvoke(this.connection, 'connect');
            const item: UserModel = await service.FetchById(id);
            result = {
                IsSuccessful: true,
                Status: 200,
                Body: item
            };
        } catch(e) {
            result = {
                IsSuccessful: false,
                Status: 500,
                Body: e
            };
        } finally{
            this.connection.destroy();
        }
        
        return result;
    }

    @NoAuth()
    @RequestMapping(RequestType.POST)
    public async Create(@Body userObj: UserRequestModel): Promise<ResponseConfig> {
        const service: UserService = new UserService(this.connection);

        let result: ResponseConfig;

        try {
            await Q.ninvoke(this.connection, 'connect');
            await Q.ninvoke(this.connection, 'beginTransaction');

            const user: UserModel = {
                Username: ConvertToString(userObj.Username),
                Password: ConvertToString(userObj.Password),
                FirstName: ConvertToString(userObj.FirstName),
                MiddleName: ConvertToNullableString(userObj.MiddleName),
                LastName: ConvertToString(userObj.LastName),
                DOB: ConvertToString(userObj.DOB),
                Country: ConvertToString(userObj.Country),
                State: ConvertToString(userObj.State),
                Address: ConvertToString(userObj.Address),
                MobilePhone: ConvertToString(userObj.MobilePhone),
                Profession: ConvertToNullableString(userObj.Profession),
                Industry: ConvertToString(userObj.Industry),
            };

            const lastId: number = (await service.Add(user))[0].insertId;

            if(userObj.Roles && userObj.Roles.length > 0) {
                const userRoleMapService: UserRoleMapService = new UserRoleMapService(this.connection);

                for (let i = 0; i < userObj.Roles.length; i++) {
                    const roleId: number = parseInt(userObj.Roles[i] as any, 10);
                    const item: UserRoleMapModel = {
                        UserId: lastId,
                        RoleId: roleId
                    };

                    await userRoleMapService.Add(item);
                }
            }

            await Q.ninvoke(this.connection, 'commit');

            result = {
                IsSuccessful: true,
                Status: 200,
                Body: null
            };
        }
        catch(e) {
            await Q.ninvoke(this.connection, 'rollback');
            result = {
                IsSuccessful: false,
                Status: 500,
                Body: e
            };
        } finally{
            this.connection.destroy();
        }

        return result;
    }

    @RequestMapping(RequestType.PUT, '/:id')
    public async Update(id: number, @Body userObj: UserRequestModel): Promise<ResponseConfig> {
        const service: UserService = new UserService(this.connection);

        let result: ResponseConfig;

        try {
            await Q.ninvoke(this.connection, 'connect');
            await Q.ninvoke(this.connection, 'beginTransaction');

            const user: UserModel = {
                Username: ConvertToString(userObj.Username),
                Password: ConvertToString(userObj.Password),
                FirstName: ConvertToString(userObj.FirstName),
                MiddleName: ConvertToNullableString(userObj.MiddleName),
                LastName: ConvertToString(userObj.LastName),
                DOB: ConvertToString(userObj.DOB),
                Country: ConvertToString(userObj.Country),
                State: ConvertToString(userObj.State),
                Address: ConvertToString(userObj.Address),
                MobilePhone: ConvertToString(userObj.MobilePhone),
                Profession: ConvertToNullableString(userObj.Profession),
                Industry: ConvertToString(userObj.Industry),
            };

            const item:SQLQueryResult = (await service.Edit(id, user))[0];

            const userRoleMapService: UserRoleMapService = new UserRoleMapService(this.connection);

            await userRoleMapService.RemoveByUserId(id);

            if(userObj.Roles && userObj.Roles.length > 0) {

                for (let i = 0; i < userObj.Roles.length; i++) {
                    const roleId: number = parseInt(userObj.Roles[i] as any, 10);
                    const item: UserRoleMapModel = {
                        UserId: id,
                        RoleId: roleId
                    };

                    await userRoleMapService.Add(item);
                }
            }

            await Q.ninvoke(this.connection, 'commit');

            result = {
                IsSuccessful: true,
                Status: 200,
                Body: null
            };
        }
        catch(e) {
            await Q.ninvoke(this.connection, 'rollback');
            result = {
                IsSuccessful: false,
                Status: 500,
                Body: e.code
            };
        } finally{
            this.connection.destroy();
        }

        return result;
    }
    @RequestMapping(RequestType.DEL, '/:id')
    public async Delete(id: number): Promise<ResponseConfig> {
        const service: UserService = new UserService(this.connection);
        
        let result: ResponseConfig;
        try {
            await Q.ninvoke(this.connection, 'connect');
            const item: SQLQueryResult = (await service.Remove(id))[0];
            if (item.affectedRows > 0) {
                result = {
                    IsSuccessful: true,
                    Status: 200,
                    Body: null
                };
            } else {
                throw 'No User Found';
            }
            
        } catch(e) {
            result = {
                IsSuccessful: false,
                Status: 500,
                Body: e
            };
        } finally{
            this.connection.destroy();
        }
        
        return result;
    }

    @NoAuth()
    @RequestMapping(RequestType.POST, '/login')
    public async Login(username: string, password: string): Promise<ResponseConfig> {
        const service: UserService = new UserService(this.connection);
        let result: ResponseConfig;
        try {
            await Q.ninvoke(this.connection, 'connect');
            const item: UserModel = await service.FetchByUsername(username);

            if (!compare(password, item.Password)) {
                throw 'Unauthorised!';
            }

            const token = jwt.sign({id: item.UserId}, secrets.jwtsecret, { expiresIn: '1 day' });

            result = {
                IsSuccessful: true,
                Status: 200,
                Body: Object.assign(item, {token: token})
            };
        } catch(e) {
            result = {
                IsSuccessful: false,
                Status: 401,
                Body: 'Authorisation Failed!'
            };
        } finally{
            this.connection.destroy();
        }
        
        return result;
    }

    public async GetAuthUserById(id: number): Promise<ResponseConfig> {
        const service: UserService = new UserService(this.connection);
        let result: ResponseConfig;
        try {
            await Q.ninvoke(this.connection, 'connect');
            const item: UserAdvancedModel = await service.FetchById(id);
            item.Roles = await service.FetchRolesByUserId(id);
            item.Locations = await service.FetchLocationByUserId(id);
            
            result = {
                IsSuccessful: true,
                Status: 200,
                Body: item
            };
        } catch(e) {
            result = {
                IsSuccessful: false,
                Status: 500,
                Body: e
            };
        } finally{
            this.connection.destroy();
        }
        
        return result;
    }
}