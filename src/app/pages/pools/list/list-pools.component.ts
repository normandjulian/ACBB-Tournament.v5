import * as _ from 'lodash';
import { Category } from '../../classes/category.class';
import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { CreatePoolModalComponent } from './create/create-pool.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Pool, PoolSmall } from '../../classes/pool.class';
import { PoolService } from '../services/pool.service';

@Component({
    selector: 'app-list-pools',
    templateUrl: './list-pools.component.html',
    styleUrls: ['./../../../app.component.scss', '../pools.component.scss']
})
export class ListPoolsComponent {
    @Output() selected_pool = new EventEmitter<PoolSmall>();
    public pools: PoolSmall[];
    public pool: PoolSmall;
    public categories: Category[];
    public pools_filtered: PoolSmall[];
    private fCategory: string;

    constructor(
        private modalCtrl: NgbModal,
        private service: PoolService) {

        this.service.getPools().subscribe(
            (response: PoolSmall[]) => {
                this.pools = [...response];
                this.pools_filtered = [...response];

                this.filter();

                if (_.size(this.pools_filtered) !== 0) {
                    this.select_pool(_.first(this.pools_filtered));
                }

                if (!this.categories) {
                    this.categories = this.service.categories;
                }
            }
        );

        this.service.getPool().subscribe((response: PoolSmall) => this.pool = response);
    }

    public filter_category(category_id: string) {
        this.fCategory = !!category_id ? category_id : null;
        this.filter();
    }

    private filter() {
        const params: any = (this.fCategory) ? { category_id: this.fCategory } : {};
        this.pools_filtered = _.filter(this.pools, params);
    }

    public select_pool(pool: PoolSmall) {
        this.service.setPool(pool);
    }

    public create_new_pool() {
        const modal = this.modalCtrl.open(CreatePoolModalComponent);
        modal.componentInstance.category_id = this.fCategory || null;
    }
}
