import {test,expect} from '@playwright/test';
import { DemoSauceApp } from '../pages/demosauceapp';
import { Inventory } from '../pages/inventory';



test('draft', async ({page})=> {

    let username = "standard_user";
    let password = "secret_sauce";
    const demosauce = new DemoSauceApp(page);
    let demoSauce = new DemoSauceApp(page);
    await demoSauce.gotoHomePage();
    await demoSauce.checkLoginFieldsVisible();
    await demoSauce.login(username,password);
    const inventory = new Inventory(page);
    await inventory.goto();
    await inventory.addProductsAndVerifyToggle();
    await inventory.removeProductsAndVerifyToggle();
})