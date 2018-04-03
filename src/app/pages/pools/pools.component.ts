import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { Pool, PoolSmall } from '../classes/pool.class';
import { PoolService } from './services/pool.service';

@Component({
    selector: 'app-pools',
    templateUrl: './pools.component.html'
})
export class PoolsComponent implements OnInit {
    public pools: PoolSmall[];
    public pool: PoolSmall;

    constructor(private service: PoolService) { }

    ngOnInit() {
        this.service.http_get_parameters().subscribe();
    }

    public selected_pool(pool: PoolSmall) {
        this.pool = pool;
    }

    public updated_pool(pool: PoolSmall) {
        console.log(pool);
    }

    public deleted_pool(pool: PoolSmall) {
        console.log(pool);
    }
}
