import {test,expect} from '@playwright/test';
import { DemoSauceApp } from '../pages/demosauceapp';
import { Inventory } from '../pages/inventory';
import { ScreenShotHelper } from '../utils/screenshothelper';

test.describe.serial('Add remove product scenarios standard user', ()=> {
   
    // login and store the session first. 
    const _standardUserSession : string = './auth/standarduser.json';

        // instrucing playwright to use this storage state file. 
    test.use({storageState: _standardUserSession});

    test.beforeAll(async ({browser})=> {
        let username = "standard_user";
        let password = "secret_sauce";
        const usercontext = await browser.newContext();
        const userPage = await usercontext.newPage();               
        let demoSauce = new DemoSauceApp(userPage);
        await demoSauce.gotoHomePage();
        await demoSauce.login(username,password);
        // storing state of session in json file.
        await userPage.context().storageState({path: _standardUserSession});
    });

    test('TOGGLE_ADD_REMOVE_PRODUCT', async ({page},testinfo)=> {   
        const testname = 'TOGGLE';
        const inventory = new Inventory(page);
        await inventory.goto();
        await inventory.addBackpack();
        await inventory.verifyRemoveBackPackExists();
        await ScreenShotHelper.captureScreenShot(page,testinfo,`${testname}_ADD_TO_REMOVE`);
        await inventory.removeBackpack(); 
        await inventory.verifyAddBackPackExists();
        await ScreenShotHelper.captureScreenShot(page,testinfo,`${testname}_REMOVE_TO_ADD`);       
    });

    test('TOGGLE_MULTIPLE_PRODUCTS', async ({page}, testinfo)=> {
        const testname = 'TOGGLE_MULTIPLE_PRODUCTS';
        const inventory = new Inventory(page);
        await inventory.goto();
        await inventory.addProductsAndVerifyToggle();
        await ScreenShotHelper.captureScreenShot(page,testinfo,`${testname}_ADD_TO_REMOVE`);
        await inventory.removeProductsAndVerifyToggle();
        await ScreenShotHelper.captureScreenShot(page,testinfo,`${testname}_REMOVE_TO_ADD`);
    });

    test('ADD_MULTIPLE_PRODUCTS_UPDATE_CART_COUNT', async ({page}, testinfo)=> {
        const testname = 'CART_ITEMS_COUNT';
        const expCountStr = '5';
        const inventory = new Inventory(page);
        await inventory.goto();
        await inventory.addProductsAndVerifyToggle();
        await inventory.checkCartItemsCount(expCountStr);
        await ScreenShotHelper.captureScreenShot(page,testinfo,`${testname}_AFTER_ADDING_ITEMS`);
        await inventory.removeProductsAndVerifyToggle();
        await inventory.checkCartItemsCountEmpty();
        await ScreenShotHelper.captureScreenShot(page,testinfo,`${testname}_EMPTY_CART`);
    })

});