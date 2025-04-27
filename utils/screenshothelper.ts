import {Page,TestInfo} from '@playwright/test';

export class ScreenShotHelper{

    static async captureScreenShot(page:Page, testInfo: TestInfo, screenshotName: string,){
        const screenshotPath = `./screenshots/${screenshotName}.png`;
        // capture the screenshot to screenshots location. 
        const screenshotBody = await page.screenshot({path : screenshotPath,fullPage : true});
        // attach to the report. 
        await testInfo.attach(screenshotName,{
            body: screenshotBody,
            contentType : 'image/png'
        });
    }



}