import cors from 'cors';
import express from 'express';
import https, { Server } from 'https';
import fs from 'fs';

import { RouteService } from './service/config/route.service';
import { MiddlewareService } from './service/config/middleware.service';

let key: Buffer = fs.readFileSync(__dirname + '/config/cert/server.key');
let cert: Buffer = fs.readFileSync(__dirname + '/config/cert/server.crt');

let options: any = {
     key: key,
     cert: cert
};

const app = express();

app.use(cors());

// Connecting Middleware
let middlewareSerivice = new MiddlewareService(app);
middlewareSerivice.attachMiddleware();

// Connecting Routes
let routeService = new RouteService(app);
routeService.getRoutes();

const PORT = process.env.PORT || 3000;

let server: Server = https.createServer(options, app);
server.listen(PORT, () => {
     console.log(`Server is running in https://localhost:${PORT}`)
});