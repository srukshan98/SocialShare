export class UserModel {
    UserId?: number;
    Username: string;
    Password: string;
    FirstName: string;
    MiddleName?: string;
    LastName: string;
    DOB: Date | string;
    Country: string;
    State?: string;
    Address?: string;
    MobilePhone?: string;
    Profession?: string;
    Industry?: string;
    TwitterToken?: string;
}
