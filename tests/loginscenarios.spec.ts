import {test,expect} from '@playwright/test'
import { DemoSauceApp } from '../pages/demosauceapp';
import { Inventory } from '../pages/inventory';
import { UserDetails } from '../datamodels/userdetails';


test('login standard user', async ({page})=> {

    let demoSauce = new DemoSauceApp(page);
    await demoSauce.gotoHomePage();
    await demoSauce.checkLoginFieldsVisible();
    await demoSauce.login('standard_user','secret_sauce');
    console.log('login to ')
    // check inventory page fields are visible
    let invenory = new Inventory(page);
    await invenory.checkFieldsVisible();
    await invenory.logout();

});














