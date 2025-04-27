import {Page,expect} from '@playwright/test';
import { constrainedMemory } from 'process';

export class Inventory{

    private _page: Page;
    private shopping_cart: string = '[data-test="shopping-cart-link"]';
    private title : string = '[data-test="title"]';
    private menuBtn : string = '[id = "react-burger-menu-btn"]';
    private sortContainer : string = '[data-test="product-sort-container"]';
    private inventoryURL : string = ''
    private logoutLink : string = '[data-test="logout-sidebar-link"]';

    constructor(page:Page){
        this._page = page;
    }

    public async checkFieldsVisible(){

        await expect(this._page.locator(this.shopping_cart)).toBeVisible();
        await this._page.waitForSelector(this.title);
        await expect(this._page.locator(this.title)).toBeVisible();
        await expect(this._page.locator(this.menuBtn)).toBeVisible();
        await expect(this._page.locator(this.sortContainer)).toBeVisible();
    }

    public async logout(){
        await this._page.locator(this.menuBtn).click();
        await this._page.locator(this.logoutLink).click();
        await this._page.waitForURL('./');
    }
}