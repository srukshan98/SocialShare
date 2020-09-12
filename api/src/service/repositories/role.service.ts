import { RoleModel } from "../../model/role.model";
import { AbstractService } from "./abstract.service";
import { RequestConfig } from "../../config/request.config";
import Q from "q";

export class RoleService extends AbstractService<RoleModel> {
    MapItem(item: any): RoleModel {
        const user: RoleModel = new RoleModel();

        user.RoleId = parseInt(item.RoleId, 10);
        user.DisplayValue = item.DisplayValue;
        user.ValueCode = item.ValueCode;
        
        return user;
    }
    public async ListAll(config: RequestConfig): Promise<any> {
        const result = await Q.ninvoke(this.connection,'query', 'SELECT * FROM roles');

        return this.Map(result[0]);
    }
    public async FetchById(id: any): Promise<any> {
        const result = await Q.ninvoke(this.connection,'query', 'SELECT * FROM roles WHERE RoleId = ?', [id]);

        if (result[0][0]) {
            return this.Map(result[0][0]);
        } else {
            throw 'No Role Found'
        }
    }
    public async Add(item: RoleModel): Promise<any> {
        const insertQuery = `INSERT INTO roles SET ?`;

        this.UpdateItemMapping(item);
        
        return await Q.ninvoke(this.connection,'query', insertQuery, item);
                
    }
    UpdateItemMapping(item: RoleModel) {
        delete item.RoleId;
    }
    public async Edit(id: number, item: RoleModel): Promise<any> {
        const updateQuery = `UPDATE roles SET ? WHERE RoleId=?`;
        
        this.UpdateItemMapping(item);

        return await Q.ninvoke(this.connection,'query', updateQuery, [item, id]);
    }
    public async Remove(id: any): Promise<any> {
        const deleteQuery = `DELETE FROM roles WHERE RoleId=?`;

        return await Q.ninvoke(this.connection,'query', deleteQuery, [id]);
    }
}