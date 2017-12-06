import {
    Component,
    OnInit,
    Input,
    Pipe,
    Injectable
} from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection
} from 'angularfire2/firestore';
import {
    Observable
} from 'rxjs/Observable';
import {
    newItems
} from 'app/class/Items';
import {
    Items,
    ItemId
} from 'app/interface/Items';
import {
    ItemsService
} from 'app/services/item.service';
import {
    ItemsInStockService
} from 'app/services/ItemsInStock.service';
import {
    I18n,
    CustomDatepickerI18n
} from 'app/class/DatePicker';
import {
    NgbDatepickerI18n
} from '@ng-bootstrap/ng-bootstrap';
import {
    ActivatedRoute,
    Router,
} from "@angular/router";
import {
    Subscription
} from 'rxjs/Subscription';
import {
    Location
} from '@angular/common';
import {
    ItemInStockId,
    ItemsInStock
} from 'app/interface/item_in_stock';


@Component({
    selector: 'IncreaseItems',
    templateUrl: './increaseItem.component.html',
    styleUrls: ['./increaseItem.component.css'],
})
export class InscreaseItemsComponent implements OnInit {
    isNull: boolean = false;

    iscategoryNull: boolean;
    isstock_quantityNull: boolean;
    ispriceNull: boolean;
    isnameNull: boolean;
    itemId: string;
    sub: Subscription;
    itemObj: newItems;
    itemintock: Observable < ItemInStockId[] > ;
    number_quantity: number;
    @Input()
    item: newItems;
    iteminstock: ItemsInStock;
    constructor(private itemsService: ItemsService, private instockService: ItemsInStockService, private route: ActivatedRoute, private router: Router, private location: Location) {
    this.item = new newItems();
    this.isNull = false;
    this.sub = this.route.params.subscribe(params => {
        this.itemId = params['id'];
    });

    }
    ngOnInit() {
    this.getItem();
    this.itemintock = this.instockService.getItemByid(this.itemId);

    }

    onClose() {
    this.isNull = false;
    }
    onGoBack() {
    return this.router.navigate(['items']);

    }


    getItem() {

    this.itemsService.findItem(this.itemId).subscribe(params => this.item = params);
    }

    onaddItem() {

    if (this.number_quantity == 0 || this.number_quantity == null) {
        this.isstock_quantityNull = true;
        this.isNull = true;
    }

    this.item.sold_quantity = this.number_quantity + this.item.sold_quantity;

    this.item.stock_quantity = this.number_quantity + this.item.stock_quantity;


    if (this.item && this.item !== null) {

        if (this.itemsService.updateItem(this.itemId, this.item)) {

        this.instockService.create({
            item_id: this.itemId,
            in_quantity: this.number_quantity,
            in_date: new Date(),
            available: true
        });
        alert('successfully added!');
        this.isNull = false;
        this.item = new newItems;
        return this.location.back();

        }

    }

    }

    ngOnDestroy() {
    this.sub.unsubscribe();
    }
}
