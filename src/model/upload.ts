export class Upload {

    private readonly dUrl: string;
    private readonly uid: string;
    private readonly nickname: string;
    private readonly createdAt: number = new Date().getTime();
    private readonly starCount: number = 0;
    private readonly start: number[] = [];

    constructor(dUrl: string, uid: string, nickname: string) {
        this.dUrl = dUrl;
        this.uid = uid;
        this.nickname = nickname;
    }

    public getUid(): string {
        return this.uid;
    }

    public toObject(): object {
        return {
            dUrl: this.dUrl,
            uid: this.uid,
            nickname: this.nickname,
            createdAt: this.createdAt,
            starCount: this.starCount,
            start: this.start
        };
    }
}
