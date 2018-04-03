import { Player } from './players.class';
export class Team {
    _id?: String;
    name: String;
    coach?: String;
    referee?: String;
    division_id: String;
    difference?: number;
    comments?: String;
    club_id: String;
    category_id: String;
    players?: Player[];
    selected?: boolean;
    score?: number;
}

export class TeamSM {
    _id?: String;
    name: String;
    score?: number;
    made?: number;
    cashed?: number;
}

export class TeamSmall {
    _id: String;
    category_id: String;
    category: String;
    club_id: String;
    club: String;
    division?: String;
    division_id?: String;
    name?: String;
    isChecked?: boolean;
}

export class TeamFull {
    _id?: String;
    name: String;
    coach?: String;
    referee?: String;
    division: String;
    division_id: String;
    difference?: number;
    comments?: String;
    club: String;
    club_id: String;
    category: String;
    category_id: String;
    players?: Player[];
    selected?: boolean;
    score?: number;
}
