import {Page,expect} from '@playwright/test'

export class DemoSauceApp{

    private _page : Page;
    // locators 
    private _username : string = '[data-test="username"]';
    private _password : string = '[data-test="password"]';
    private _loginBtn : string = '[data-test="login-button"]';
    private _errorMsg : string = '[data-test="error"]';
    private _inventoryURL : string = '/inventory.html';

    constructor(page:Page){
        this._page = page;
    }

    // launch the demo sauce application
    public async gotoHomePage(){
        await this._page.goto('/');
        // wait for object to be loaded
        await this._page.waitForSelector(this._username);
        await this._page.waitForSelector(this._password);
        await this._page.waitForSelector(this._loginBtn);
    }

    // login to demo sauce aplication
    public async login(username: string,pwd : string) {
        await this._page.locator(this._username).fill(username);
        await this._page.locator(this._password).fill(pwd);
        await this._page.locator(this._loginBtn).click();
        await this._page.waitForLoadState();
        await this._page.waitForURL(this._inventoryURL);
    }

    // this smethod perform upto clicking login button,do not verify landing screen.
    // This method is to verify different login error messages. 
    public async trylogin(username: string,pwd : string){
        await this._page.locator(this._username).fill(username);
        await this._page.locator(this._password).fill(pwd);
        await this._page.locator(this._loginBtn).click();
    }

    public async checkLoginFieldsVisible(){
        await expect(this._page.locator(this._username)).toBeVisible();
        await expect(this._page.locator(this._password)).toBeVisible();
        await expect(this._page.locator(this._loginBtn)).toBeVisible();
    }

    public async checkErrorMsgAppearing(err:string){
        await expect(this._page.locator(this._errorMsg)).toContainText(err);
    }
    
}