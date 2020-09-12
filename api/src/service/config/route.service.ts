import { routes, defaultPaths } from "../../decorator/request.decorator";
import * as ScanService from './scan.service';
import { Express } from 'express';
import { RouteType } from "../../constant/route.constant";

export class RouteService {
    constructor(private app: Express) {}
    getRoutes() {
        this.doScan();
        this.attachRoutes();
        this.attachDefaultPath();
    }

    private attachDefaultPath() {
        this.app.get("/", (req, res) => {
            res.send({
                routes: routes,
                paths: defaultPaths
            });
        });
    }

    private attachRoutes() {
        routes.forEach((route: RouteType) => {
            this.app.use(route.path, route.router);
        });
    }

    private doScan(): void {
        ScanService;
    }
}