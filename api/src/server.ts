import { RouteService } from './service/config/route.service';
import { MiddlewareService } from "./service/config/middleware.service";
import express from "express";
import { routes, defaultPaths } from './decorator/request.decorator';
const app = express();

// Connecting Middleware
let middlewareSerivice = new MiddlewareService(app);
middlewareSerivice.attachMiddleware();

// Connecting Routes
let routeService = new RouteService(app);
routeService.getRoutes();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
     console.log(`Server is running in http://localhost:${PORT}`)
});