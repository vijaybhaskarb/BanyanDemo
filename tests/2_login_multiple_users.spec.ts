import {test,expect} from '@playwright/test';
import { UserDetails } from '../datamodels/userdetails';
import { DemoSauceApp } from '../pages/demosauceapp';
import { ScreenShotHelper } from '../utils/screenshothelper';
import { Inventory } from '../pages/inventory';
import * as fs from 'fs';


// The following test is data driven test. Multiple data sets are 
// stored in user.json file. you can add as many users needed in user.json. 

const rawData = fs.readFileSync('./data/users.json','utf-8');
const users = JSON.parse(rawData);

test.describe('Validate login for multiple users', ()=> { 
    users.forEach((user : UserDetails) => {
        test(`Login user test : ${user.username}`, async ({page},testInfo)=> {
            let testname = `LOGIN_USER_${user.username}`;
            let demoSauce = new DemoSauceApp(page);
            await demoSauce.gotoHomePage();
            await ScreenShotHelper.captureScreenShot(page,testInfo,`${testname}_HOMEPAGE`);
            await demoSauce.checkLoginFieldsVisible();
            await demoSauce.login(user.username,user.password);
            // check fields visible for user 
            console.log(`checking inventory page fields available to user : ${user.username}`);
            let invenory = new Inventory(page); 
            await invenory.checkFieldsVisible();
            await ScreenShotHelper.captureScreenShot(page,testInfo,`${testname}_INVENTORY`);
            await invenory.logout();
        });
    });
});