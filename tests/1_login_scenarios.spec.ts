import {test} from '@playwright/test'
import { DemoSauceApp } from '../pages/demosauceapp';
import { Inventory } from '../pages/inventory';
import { ScreenShotHelper } from '../utils/screenshothelper';

// different login scenarios handled in this file.

test('LOGIN_VALID_USER', async ({page},testInfo)=> {
    let testname = 'LOGIN_VALID_USER'
    let username = "standard_user";
    let password = "secret_sauce";
    let demoSauce = new DemoSauceApp(page);
    await demoSauce.gotoHomePage();
    await demoSauce.checkLoginFieldsVisible();
    await demoSauce.login(username,password);
    // check inventory page fields are visible
    let invenory = new Inventory(page);
    await invenory.checkFieldsVisible();
    await ScreenShotHelper.captureScreenShot(page,testInfo,`${testname}_landing_page`);
    await invenory.logout();
});

test('REJECTED_INVALID_USERNAME', async ({page}, testInfo)=> {
    let test_name = "REJECTED_INVALID_USERNAME";
    let username = "non_existing_user";
    let password = "some_password";
    let expectedErrMsg = 'Epic sadface: Username and password do not match any user in this service';
    let demoSauce = new DemoSauceApp(page);
    await demoSauce.gotoHomePage();
    await demoSauce.checkLoginFieldsVisible();
    await demoSauce.trylogin(username,password);
    await ScreenShotHelper.captureScreenShot(page,testInfo,`${test_name}_ERROR`);
    await demoSauce.checkErrorMsgAppearing(expectedErrMsg);
});

test('REJECTED_INVALID_PASSWORD', async ({page}, testInfo)=> {
    let test_name = 'REJECTED_INVALID_PASSWORD';
    let username = "standard_user";
    let password = "invalid_password";
    let expectedErrMsg = 'Epic sadface: Username and password do not match any user in this service';
    let demoSauce = new DemoSauceApp(page);
    await demoSauce.gotoHomePage();
    await demoSauce.checkLoginFieldsVisible();
    await demoSauce.trylogin(username,password);
    await ScreenShotHelper.captureScreenShot(page,testInfo,`${test_name}_ERROR`);
    await demoSauce.checkErrorMsgAppearing(expectedErrMsg);
});

test('REJECTED_LOCKED_USER', async ({page}, testInfo)=> {
    let test_name = 'REJECTED_LOCKED_USER';
    let username = "locked_out_user";
    let password = "secret_sauce";
    let expectedErrMsg = 'Epic sadface: Sorry, this user has been locked out.';
    let demoSauce = new DemoSauceApp(page);
    await demoSauce.gotoHomePage();
    await demoSauce.checkLoginFieldsVisible();
    await demoSauce.trylogin(username,password);
    await ScreenShotHelper.captureScreenShot(page,testInfo,`${test_name}_ERROR`);
    await demoSauce.checkErrorMsgAppearing(expectedErrMsg);
});
















