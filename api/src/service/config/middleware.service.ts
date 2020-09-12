import { IRequest } from '../../model/request.model';
import { Express } from 'express';
import { DatabaseService } from './database.service';
import bodyParser from 'body-parser';
import logger from "morgan";
import jwt from 'jsonwebtoken';
import cors from "cors";
import secrets from '../../../config/secrets.config.json';
import { UserController } from '../../controller/user.controller';

export class MiddlewareService {
    constructor(private app: Express) { }

    attachMiddleware(): void {
        this.attachBasics();
        this.attachDatabaseConnection();
        this.attachTokenValidator();
        this.attachUser();
        this.attachResponseSetup();
    }

    attachBasics() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(logger('dev'));
    }

    attachDatabaseConnection(): void {
        const dbService: DatabaseService = new DatabaseService();

        this.app.use((req: IRequest, res, next) => {
            const config = {
                connection: dbService.getConnection()
            };

            req.config = config;

            next();
        })
    }

    attachTokenValidator(): void {
        this.app.use((req: IRequest, res, next) => {
            try{
                let token: any = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
                if (token && token.startsWith('Bearer ')) {
                    // Remove Bearer from string
                    token = token.slice(7, token.length);
                }

                if (token) {
                    const decoded = jwt.verify(token, secrets.jwtsecret);

                    req.decoded = decoded;
                }
                next();
            } catch(e) {
                if (e && e.name === 'TokenExpiredError') {
                    return res.status(401).json({
                        success: false,
                        message: 'Token Expired'
                    });
                }
                return res.status(403).json({
                    success: false,
                    message: 'Token is not valid'
                });
            }
        });
    }

    attachUser() {
        this.app.use(async (req: IRequest, res, next) => {
            if (req.decoded && req.config) {
                const userController: UserController = new UserController(req.config.connection);
    
                const result = (await userController.GetAuthUserById(req.decoded.id));

                req.config.connection = (new DatabaseService()).getConnection();
    
                if (result.IsSuccessful) {
                    req.config.user = result.Body;
                }
            }

            next();
        });
    }

    attachResponseSetup() {
        const corsOpts = {
            origin: false,
            methods: ['GET', 'POST', 'PUT', 'DELETE']
        };

        this.app.use(cors(corsOpts));
    }
}