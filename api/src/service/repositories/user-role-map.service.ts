import { UserRoleMapModel } from "../../model/user-role-map.model";
import { AbstractService } from "./abstract.service";
import { RequestConfig } from "../../config/request.config";
import Q from "q";

export class UserRoleMapService extends AbstractService<UserRoleMapModel> {
    MapItem(item: any): UserRoleMapModel {
        const userRoleMap: UserRoleMapModel = new UserRoleMapModel();

        userRoleMap.RoleId = parseInt(item.RoleId, 10);
        userRoleMap.UserId = parseInt(item.UserId, 10);
        
        return userRoleMap;
    }
    public async ListAll(config: RequestConfig): Promise<any> {
        const result = await Q.ninvoke(this.connection,'query', 'SELECT * FROM user_role_map');

        return this.Map(result[0]);
    }
    public async FetchByRoleId(id: any): Promise<any> {
        const result = await Q.ninvoke(this.connection,'query', 'SELECT * FROM user_role_map WHERE RoleId = ?', [id]);

        if (result[0]) {
            return this.Map(result[0]);
        } else {
            throw 'No User Role Map Found'
        }
    }

    public async FetchByUserId(id: any): Promise<any> {
        const result = await Q.ninvoke(this.connection,'query', 'SELECT * FROM user_role_map WHERE UserId = ?', [id]);

        if (result[0]) {
            return this.Map(result[0]);
        } else {
            throw 'No User Role Map Found'
        }
    }
    public async Add(item: UserRoleMapModel): Promise<any> {
        const insertQuery = `INSERT INTO user_role_map SET ?`;
        
        return await Q.ninvoke(this.connection,'query', insertQuery, item);
                
    }
    public async RemoveByRoleId(id: any): Promise<any> {
        const deleteQuery = `DELETE FROM user_role_map WHERE RoleId=?`;

        return await Q.ninvoke(this.connection,'query', deleteQuery, [id]);
    }
    public async RemoveByUserId(id: any): Promise<any> {
        const deleteQuery = `DELETE FROM user_role_map WHERE UserId=?`;

        return await Q.ninvoke(this.connection,'query', deleteQuery, [id]);
    }
}