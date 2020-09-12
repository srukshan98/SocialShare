import { RequestConfig } from './../config/request.config';
import { ResponseConfig } from './../config/response.config';
import { AbstractController } from "./abstract.controller";
import { RequestMapping, Route, Body, Query } from '../decorator/request.decorator';
import { RequestType } from '../constant/request.constant';
import { ConvertToString, ConvertToNullableString } from '../functions/conversions';
import Q from 'q';
import { SQLQueryResult } from '../model/query-result.model';
import { LocationService } from '../service/repositories/location.service';
import { LocationModel } from "../model/location.model";

@Route('/location', 'LOCATION_LOCATION')
export class LocationController extends AbstractController {
    
    @RequestMapping()
    public async GetAll(@Body config: RequestConfig): Promise<ResponseConfig> {
        const service: LocationService = new LocationService(this.connection);
        let result: ResponseConfig;
        try {
            await Q.ninvoke(this.connection, 'connect');
            const items: LocationModel[] = await service.ListAll(config);
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
    @RequestMapping(RequestType.GET, '/:id')
    public async GetById(id: number): Promise<ResponseConfig> {
        const service: LocationService = new LocationService(this.connection);
        let result: ResponseConfig;
        try {
            await Q.ninvoke(this.connection, 'connect');

            const item: LocationModel = await service.FetchById(id);
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
    @RequestMapping(RequestType.POST)
    public async Create(@Body locationObj: LocationModel): Promise<ResponseConfig> {
        const service: LocationService = new LocationService(this.connection);

        let result: ResponseConfig;

        try {

            await Q.ninvoke(this.connection, 'connect');

            const loc: LocationModel = {
                DisplayValue: ConvertToString(locationObj.DisplayValue),
                ValueCode: ConvertToString(locationObj.ValueCode),
            };

            const res: SQLQueryResult = (await service.Add(loc))[0];

            result = {
                IsSuccessful: true,
                Status: 200,
                Body: res
            };
        }
        catch(e) {
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
    public async Update(id: number, @Body locationObj: LocationModel): Promise<ResponseConfig> {
        const service: LocationService = new LocationService(this.connection);

        let result: ResponseConfig;

        try {

            await Q.ninvoke(this.connection, 'connect');

            const loc: LocationModel = {
                DisplayValue: ConvertToString(locationObj.DisplayValue),
                ValueCode: ConvertToString(locationObj.ValueCode),
            };

            const item:SQLQueryResult = (await service.Edit(id, loc))[0];

            result = {
                IsSuccessful: true,
                Status: 200,
                Body: item
            };
        }
        catch(e) {
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
    @RequestMapping(RequestType.DEL, '/:id')
    public async Delete(id: number): Promise<ResponseConfig> {
        const service: LocationService = new LocationService(this.connection);
        
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
                throw 'No Location Found';
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
}