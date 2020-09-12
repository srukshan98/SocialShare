import { UserModel } from '../../model/user.model';
import { AbstractService } from "./abstract.service";
import { RequestConfig } from "../../config/request.config";
import Q from "q";
import { hash } from '../../functions/hashing';

export class UserService extends AbstractService<UserModel> {
    MapItem(item: any): UserModel {
        const user: UserModel = new UserModel();

        user.UserId = parseInt(item.UserId, 10);
        user.Username = item.Username;
        user.Password = item.Password;
        user.FirstName = item.FirstName;
        user.MiddleName = item.MiddleName;
        user.LastName = item.LastName;
        user.DOB = new Date(item.DOB);
        user.Country = item.Country;
        user.State = item.State;
        user.Address = item.Address;
        user.MobilePhone = item.MobilePhone;
        user.Profession = item.Profession;
        user.Industry = item.Industry;
        
        return user;
    }
    public async ListAll(config: RequestConfig): Promise<any> {
        const result = await Q.ninvoke(this.connection,'query', 'SELECT * FROM Users');

        return this.Map(result[0]);
    }
    public async FetchById(id: any): Promise<any> {
        const result = await Q.ninvoke(this.connection,'query', 'SELECT * FROM Users WHERE UserId = ?', [id]);

        if (result[0][0]) {
            return this.Map(result[0][0]);
        } else {
            throw 'No User Found'
        }
    }

    public async FetchByUsername(username: string): Promise<any> {
        const result = await Q.ninvoke(this.connection,'query', 'SELECT * FROM users WHERE Username=?', [username]);
        if (result[0][0]) {
            return this.Map(result[0][0]);
        } else {
            throw 'No User Found'
        }
    }
    public async Add(item: UserModel): Promise<any> {
        const insertQuery = `INSERT INTO users SET ?`;

        this.UpdateItemMapping(item);
        
        return await Q.ninvoke(this.connection,'query', insertQuery, item);
                
    }
    UpdateItemMapping(item: UserModel) {
        item.Password = hash(item.Password);
        delete item.UserId;
    }
    public async Edit(id: number, item: UserModel): Promise<any> {
        const updateQuery = `UPDATE users SET ? WHERE UserId=?`;
        
        this.UpdateItemMapping(item);

        return await Q.ninvoke(this.connection,'query', updateQuery, [item, id]);
    }
    public async Remove(id: any): Promise<any> {
        const deleteQuery = `DELETE FROM users WHERE UserId=?`;

        return await Q.ninvoke(this.connection,'query', deleteQuery, [id]);
    }

    public async FetchRolesByUserId(id: any): Promise<any> {
        const result = await Q.ninvoke(this.connection,'query', 
            'SELECT r.* FROM users u' +
            ' INNER JOIN user_role_map urm ON u.UserId=urm.UserId' +
            ' INNER JOIN roles r ON urm.RoleId=r.RoleId' +
            ' WHERE u.UserId=?', [id]);

        if (result[0][0]) {
            return result[0];
        } else {
            return [];
        }
    }

    public async FetchLocationByUserId(id: any): Promise<any> {
        const result = await Q.ninvoke(this.connection,'query', 
            'SELECT l.LocationId, l.ValueCode AS LocationValue, rlm.PermissionLevel FROM users u' +
            ' INNER JOIN user_role_map urm ON u.UserId=urm.UserId' +
            ' INNER JOIN role_location_map rlm ON urm.RoleId=rlm.RoleId' +
            ' INNER JOIN location l ON l.LocationId=rlm.LocationId'+
            ' WHERE u.UserId=?', [id]);

        if (result[0][0]) {
            return result[0];
        } else {
            return [];
        }
    }
}