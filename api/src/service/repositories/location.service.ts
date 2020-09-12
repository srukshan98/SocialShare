import { LocationModel } from "../../model/location.model";
import { AbstractService } from "./abstract.service";
import { RequestConfig } from "../../config/request.config";
import Q from "q";

export class LocationService extends AbstractService<LocationModel> {
    MapItem(item: any): LocationModel {
        const location: LocationModel = new LocationModel();

        location.LocationId = parseInt(item.LocationId, 10);
        location.DisplayValue = item.DisplayValue;
        location.ValueCode = item.ValueCode;
        
        return location;
    }
    public async ListAll(config: RequestConfig): Promise<any> {
        const result = await Q.ninvoke(this.connection,'query', 'SELECT * FROM location');

        return this.Map(result[0]);
    }
    public async FetchById(id: any): Promise<any> {
        const result = await Q.ninvoke(this.connection,'query', 'SELECT * FROM location WHERE LocationId = ?', [id]);

        if (result[0][0]) {
            return this.Map(result[0][0]);
        } else {
            throw 'No Location Found'
        }
    }
    public async Add(item: LocationModel): Promise<any> {
        const insertQuery = `INSERT INTO location SET ?`;

        this.UpdateItemMapping(item);
        
        return await Q.ninvoke(this.connection,'query', insertQuery, item);
                
    }
    UpdateItemMapping(item: LocationModel) {
        delete item.LocationId;
    }
    public async Edit(id: number, item: LocationModel): Promise<any> {
        const updateQuery = `UPDATE location SET ? WHERE LocationId=?`;
        
        this.UpdateItemMapping(item);

        return await Q.ninvoke(this.connection,'query', updateQuery, [item, id]);
    }
    public async Remove(id: any): Promise<any> {
        const deleteQuery = `DELETE FROM location WHERE LocationId=?`;

        return await Q.ninvoke(this.connection,'query', deleteQuery, [id]);
    }
}