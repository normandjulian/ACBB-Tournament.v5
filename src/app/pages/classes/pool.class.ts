export class Pool {
    _id: string;
    name: string;
    start_date: string;
    field: string;
    back: Boolean;
    games?: Array<Game>;
    category_id: string;
    teams?: Object[];
}

export class PoolSmall {
    _id: string;
    name: string;
    category: string;
    category_id: string;
    engaged: number;
}

export class Game {
    _id: string;
    contest_id: string;
    date: string;
    field?: string;
    field_id: string;
    firstTeam: GameTeam;
    firstTeam_id: string;
    firstScore: number;
    secondTeam: GameTeam;
    secondTeam_id: string;
    secondScore: number;
    isSaved?: boolean;
}

class GameTeam {
    _id: string;
    name: string;
}
