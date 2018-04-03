import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({ name: 'rank' })
export class RankPipe implements PipeTransform {
    /**
     *
     * @param {any[]} array - Will be the Array of team to sort
     * @param {string} arg - will be the argument to sort (ex: 'score', 'made', ‘cashed'
     * @returns {TeamSM[]}
     */
    transform(array: any[], arg?: string, sort?: string): any[] {
        return _.orderBy(array, arg, [sort]);
    }
}
