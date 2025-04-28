import {Page,expect} from '@playwright/test';

export class Inventory{

    private _page: Page;
    private shopping_cart: string = '[data-test="shopping-cart-link"]';
    private menuBtn : string = '[id="react-burger-menu-btn"]';
    private _inventoryUrl : string = '/inventory.html';
    private _addBackpack : string = '[data-test="add-to-cart-sauce-labs-backpack"]';
    private _addbikeLIght : string = '[data-test="add-to-cart-sauce-labs-bike-light"]'; 
    private _addTeaShirt : string = '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]';
    private _addJacket : string = '[data-test="add-to-cart-sauce-labs-fleece-jacket"]';
    private _addOnsie : string = '[data-test="add-to-cart-sauce-labs-onesie"]';
    private _removeBackpack : string = '[data-test="remove-sauce-labs-backpack"]'; 
    private _removeBikeLight : string = '[data-test="remove-sauce-labs-bike-light"]'; 
    private _removeTeaShirt : string = '[data-test="remove-sauce-labs-bolt-t-shirt"]';
    private _removeJacket : string = '[data-test="remove-sauce-labs-fleece-jacket"]'; 
    private _removeOnsie : string = '[data-test="remove-sauce-labs-onesie"]'; 
    private _cartBadge : string = '[data-test="shopping-cart-badge"]'; 


    constructor(page:Page){
        this._page = page;
    }

    public async goto(){
        await this._page.goto(this._inventoryUrl);
        await this._page.waitForLoadState();
    }

    public async checkFieldsVisible(){
        await expect(this._page.locator(this.shopping_cart)).toBeVisible();
        await expect(this._page.locator(this.menuBtn)).toBeVisible();
    }

    public async addBackpack(){
        await expect(this._page.locator(this._addBackpack)).toBeVisible();
        await this._page.locator(this._addBackpack).click();
    }

    public async removeBackpack(){
        await this._page.locator(this._removeBackpack).click();
    }

    // after clicking add backpack, it toggles to RemoveBackPack
    public async verifyRemoveBackPackExists(){
        await expect(this._page.locator(this._removeBackpack)).toBeVisible();
    }
    // after clicking remove backpack, it toggles to Add backpack
    public async verifyAddBackPackExists(){
        await expect(this._page.locator(this._addBackpack)).toBeVisible();
    }

    public async addProductsAndVerifyToggle(){
        await this._page.locator(this._addBackpack).click();
        // await this._page.waitForLoadState();
        await this._page.locator(this._addbikeLIght).click();
        // await this._page.waitForLoadState();
        await this._page.locator(this._addTeaShirt).click();
        // await this._page.waitForLoadState();
        await this._page.locator(this._addJacket).click();
        // await this._page.waitForLoadState();
        await this._page.locator(this._addOnsie).click();
        // await this._page.waitForLoadState();

        await expect(this._page.locator(this._removeBackpack)).toBeVisible();
        await expect(this._page.locator(this._removeBikeLight)).toBeVisible();
        await expect(this._page.locator(this._removeTeaShirt)).toBeVisible();
        await expect(this._page.locator(this._removeJacket)).toBeVisible();
        await expect(this._page.locator(this._removeOnsie)).toBeVisible();
    }

    public async removeProductsAndVerifyToggle(){
        await this._page.locator(this._removeBackpack).click();
        await this._page.locator(this._removeBikeLight).click();
        await this._page.locator(this._removeTeaShirt).click();
        await this._page.locator(this._removeJacket).click();
        await this._page.locator(this._removeOnsie).click();

        await expect(this._page.locator(this._addBackpack)).toBeVisible();
        await expect(this._page.locator(this._addbikeLIght)).toBeVisible();
        await expect(this._page.locator(this._addTeaShirt)).toBeVisible();
        await expect(this._page.locator(this._addJacket)).toBeVisible();
        await expect(this._page.locator(this._addOnsie)).toBeVisible();        
    }

    public async checkCartItemsCount(countst : string){
        await expect(this._page.locator(this._cartBadge)).toContainText(countst.trim());
    }

    public async checkCartItemsCountEmpty(){
        await expect(this._page.locator(this._cartBadge)).toBeHidden();
    }


    public async logout(){
        await this._page.goto('/inventory.html#');
        await this._page.waitForLoadState();
    }
}