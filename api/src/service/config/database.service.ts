import config from '../../../config/connection.config.json';
import mysql, {Connection} from 'mysql';

export class DatabaseService{
    private connection: Connection;
    public getConnection(): Connection {
        this.connection = mysql.createConnection(config);
        return this.connection;
    }
}