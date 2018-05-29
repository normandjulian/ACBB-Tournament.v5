export class User {
    login: string;
    lastname: string;
    admin: boolean;
    rights: {
        team: boolean;
        club: boolean;
        pool: boolean;
    };
}
