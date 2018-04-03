import { Game } from './../pages/classes/pool.class';
import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { Pool } from '../pages/classes/pool.class';

@Pipe({ name: 'orderpool' })
export class OrderPoolPipe implements PipeTransform {
    /**
     *
     * @param {any[]} array - Will be the Array of team to sort
     * @param {string} arg - will be the argument to sort (ex: 'score', 'made', ‘cashed'
     * @returns {TeamSM[]}
     */
    transform(array: Array<Game>): any[] {
        let virgin_games: Array<Game> = [];
        let filled_games: Array<Game> = [];

        array.forEach((game: Game) => {
            // console.log(game.firstScore, game.secondScore);
             if (!isNaN(game.firstScore) && !isNaN(game.secondScore)) {
                virgin_games.push(game);
             } else {
                filled_games.push(game);
             }
        });

        virgin_games = _.sortBy(virgin_games, ['date']);
        filled_games = _.sortBy(filled_games, ['date']);

        return _.concat(filled_games, virgin_games);
    }
}
