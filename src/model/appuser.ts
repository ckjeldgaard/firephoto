export class AppUser {

    private readonly uid: string;
    private readonly email: string;

    constructor(uid: string, email: string) {
        this.uid = uid;
        this.email = email;
    }

    public getUid(): string {
        return this.uid;
    }

    public getEmail(): string {
        return this.email;
    }
}
