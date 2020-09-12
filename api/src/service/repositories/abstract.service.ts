import { Connection } from 'mysql';
import { RequestConfig } from "../../config/request.config";

export abstract class AbstractService<T> {
    protected connection: Connection;
    constructor(connection: Connection) {
        this.connection = connection;
    }
    abstract MapItem(item: any): T;
    abstract ListAll(config: RequestConfig): Promise<T[]>;
    abstract Add(item: T): Promise<T>;
    
    protected Map(value: any | any[]): T | T[] {
        if (value.length) {
            return value.map((val: any) => this.MapItem(val));
        } else {
            return this.MapItem(value);
        }
    }
}