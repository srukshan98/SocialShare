import { UserAdvancedModel } from './../model/user-advanced.model';
import { Connection } from 'mysql';
import { Request, Response } from 'express';

export abstract class AbstractController {
    connection: Connection;
    user: UserAdvancedModel;


    constructor(connection: Connection) {
        this.connection = connection;
    }
    // abstract GetAll(request: Request, response: Response): void;
    // abstract GetById(request: Request, response: Response): void;
    // abstract Create(request: Request, response: Response): void;
    // abstract Update(request: Request, response: Response): void;
    // abstract Delete(request: Request, response: Response): void;
}