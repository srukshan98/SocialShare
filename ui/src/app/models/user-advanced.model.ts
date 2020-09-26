import { UserLocationModel } from './user-location.model';
import { RoleModel } from "./role.model";

export class UserAdvancedModel {
    UserId?: number;
    Username: string;
    Password: string;
    FirstName: string;
    MiddleName?: string;
    LastName: string;
    DOB: Date | string;
    Country: string;
    State: string;
    Address: string;
    MobilePhone: string;
    Profession?: string;
    Industry: string;
    Roles: RoleModel[]; 
    Locations: UserLocationModel[];
}