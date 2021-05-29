export class Developer {
    avatar_url: string | undefined;
    login: string | undefined;
    url!: string;
    followers: number | undefined;
    public_repos: number | undefined;
    name: number | undefined;
}

export class Follower {
    login: string | undefined;
    html_url: string | undefined;
}

export class Repository {
    name: string | undefined;
    html_url: string | undefined;
}