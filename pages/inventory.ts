import {Page,expect} from '@playwright/test';

export class Inventory{

    private _page: Page;
    private shopping_cart: string = '[data-test="shopping-cart-link"]';
    private menuBtn : string = '[id="react-burger-menu-btn"]';

    constructor(page:Page){
        this._page = page;
    }

    public async checkFieldsVisible(){
        await expect(this._page.locator(this.shopping_cart)).toBeVisible();
        await expect(this._page.locator(this.menuBtn)).toBeVisible();
    }

    public async logout(){
        await this._page.goto('/inventory.html#');
        await this._page.waitForLoadState();
    }
}