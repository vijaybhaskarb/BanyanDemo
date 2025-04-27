import {test,expect} from '@playwright/test';
import { UserDetails } from '../datamodels/userdetails';
import { DemoSauceApp } from '../pages/demosauceapp';
import { Inventory } from '../pages/inventory';

const users : UserDetails[] = [
    {username : 'standard_user','password':'secret_sauce'},
    {username : 'performance_glitch_user','password':'secret_sauce'}
];

test.describe('Validate login for multiple users', ()=> {

    
    users.forEach((user : UserDetails) => {

        test(`Login user test : ${user.username}`, async ({page})=> {

            let demoSauce = new DemoSauceApp(page);
            demoSauce.gotoHomePage();
            await page.screenshot({ path: `homepage${user.username}.png`, fullPage: true });
            await demoSauce.checkLoginFieldsVisible();
            await demoSauce.login(user.username,user.password);
            // check fields visible for user 
            console.log(`checking inventory page fields available to user : ${user.username}`);
            let invenory = new Inventory(page);
            await page.screenshot({ path: `inventory${user.username}`, fullPage: true });
            invenory.checkFieldsVisible();
            invenory.logout();
        });

    });
});