import { IRequest } from '../../model/request.model';
import { Express } from 'express';
import { DatabaseService } from './database.service';
import bodyParser from 'body-parser';
import logger from "morgan";
import jwt from 'jsonwebtoken';
import cors from "cors";
import secrets from '../../../config/secrets.config.json';
import { UserController } from '../../controller/user.controller';
import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import session from 'express-session';
import { writeFileSync } from 'fs';
import { Facebook, Twitter as TwitterSecret } from '../../config/secrets';

export class MiddlewareService {
    constructor(private app: Express) { }

    attachMiddleware(): void {
        this.attachBasics();
        this.attachDatabaseConnection();
        this.attachTokenValidator();
        this.attachUser();
        this.attachResponseSetup();
        this.attachPassportAuth();
    }

    attachBasics() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(logger('dev'));
        this.app.use(session({
            secret: 'My', resave: true, saveUninitialized: true
        }))
    }

    attachDatabaseConnection(): void {
        const dbService: DatabaseService = new DatabaseService();

        this.app.use((req: IRequest, res, next) => {
            try {
                const config = {
                    connection: dbService.getConnection()
                };
    
                req.config = config;
    
                next();
            } catch(e) {
                res.status(500).send(e)
            }
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

    attachPassportAuth() {
        passport.serializeUser(function (user, cb) {
            cb(null, user);
        });

        passport.deserializeUser(function (obj, cb) {
            cb(null, obj);
        });

        this.app.use(passport.initialize());
        this.app.use(passport.session());

        passport.use(new TwitterStrategy({
            consumerKey: TwitterSecret.consumerKey,
            consumerSecret: TwitterSecret.consumerSecret,
            callbackURL: "http://127.0.0.1:3000/twitter/callback",

        },
            (token, tokenSecret, profile, cb) => {
                cb(null, profile);
            }
        ));

        passport.use(new FacebookStrategy({
            clientID: Facebook.clientId,
            clientSecret: Facebook.clientSecret,
            callbackURL: "https://127.0.0.1:3000/facebook/callback",

        },
            (token, refreshToken, profile, cb) => {
                cb(null, profile);
            }
        ));
        
        this.app.get('/auth/twitter',
            passport.authenticate('twitter'), (req, res, next) => {
                console.log(req.user);
                next();
            });

        this.app.get('/auth/facebook',
            passport.authenticate('facebook'), (req, res, next) => {
                console.log(req.user);
                next();
            });

    }
}