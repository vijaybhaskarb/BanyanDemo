import {test,expect} from '@playwright/test';
import { UserDetails } from '../datamodels/userdetails';
import { DemoSauceApp } from '../pages/demosauceapp';
import { Inventory } from '../pages/inventory';
import * as fs from 'fs';

const rawData = fs.readFileSync('./data/users.json','utf-8');
const users = JSON.parse(rawData);

test.describe('Validate login for multiple users', ()=> {

    
    users.forEach((user : UserDetails) => {
        test(`Login user test : ${user.username}`, async ({page},testInfo)=> {
            let demoSauce = new DemoSauceApp(page);
            await demoSauce.gotoHomePage();
            let image1name = `homepage_${user.username}.png`;
            const homepageScreenshot = await page.screenshot({ path: image1name, fullPage: true });
            await testInfo.attach(image1name,{
                body: homepageScreenshot,
                contentType : 'image/png'
            });
            await demoSauce.checkLoginFieldsVisible();
            await demoSauce.login(user.username,user.password);
            // check fields visible for user 
            console.log(`checking inventory page fields available to user : ${user.username}`);
            let invenory = new Inventory(page);
            let image2name = `inventory_${user.username}.png`;
            const inventoryPageScrShot =  await page.screenshot({ path: image2name, fullPage: true });
            await testInfo.attach(image1name,{
                body: inventoryPageScrShot,
                contentType : 'image/png'
            });
            invenory.checkFieldsVisible();
            invenory.logout();
        });

    });
});