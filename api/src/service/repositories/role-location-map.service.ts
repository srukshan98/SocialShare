import { RoleLocationMapModel } from "../../model/role-location-map.model";
import { AbstractService } from "./abstract.service";
import { RequestConfig } from "../../config/request.config";
import Q from "q";

export class RoleLocationMapService extends AbstractService<RoleLocationMapModel> {
    MapItem(item: any): RoleLocationMapModel {
        const roleLocationMap: RoleLocationMapModel = new RoleLocationMapModel();

        roleLocationMap.RoleId = parseInt(item.RoleId, 10);
        roleLocationMap.LocationId = parseInt(item.LocationId, 10);
        roleLocationMap.PermissionLevel = parseInt(item.PermissionLevel, 10);
        
        return roleLocationMap;
    }
    public async ListAll(config: RequestConfig): Promise<any> {
        const result = await Q.ninvoke(this.connection,'query', 'SELECT * FROM role_location_map');

        return this.Map(result[0]);
    }
    public async FetchByRoleId(id: any): Promise<any> {
        const result = await Q.ninvoke(this.connection,'query', 'SELECT * FROM role_location_map WHERE RoleId = ?', [id]);

        if (result[0]) {
            return this.Map(result[0]);
        } else {
            throw 'No Role Location Map Found'
        }
    }

    public async FetchByLocationId(id: any): Promise<any> {
        const result = await Q.ninvoke(this.connection,'query', 'SELECT * FROM role_location_map WHERE LocationId = ?', [id]);

        if (result[0]) {
            return this.Map(result[0]);
        } else {
            throw 'No Role Location Map Found'
        }
    }
    public async Add(item: RoleLocationMapModel): Promise<any> {
        const insertQuery = `INSERT INTO role_location_map SET ?`;
        
        return await Q.ninvoke(this.connection,'query', insertQuery, item);
                
    }
    public async RemoveByRoleId(id: any): Promise<any> {
        const deleteQuery = `DELETE FROM role_location_map WHERE RoleId=?`;

        return await Q.ninvoke(this.connection,'query', deleteQuery, [id]);
    }
    public async RemoveByLocationId(id: any): Promise<any> {
        const deleteQuery = `DELETE FROM role_location_map WHERE LocationId=?`;

        return await Q.ninvoke(this.connection,'query', deleteQuery, [id]);
    }
}