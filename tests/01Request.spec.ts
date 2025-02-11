import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const baseUrl = 'http://192.168.100.222/#/';
const username = process.env.PLAYWRIGHT_USERNAME as string;
const password = process.env.PLAYWRIGHT_PASSWORD as string;

test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}login`);
    await page.fill('#login', username);
    await page.fill('#password', password);
    await page.click('.login-button');
    await page.waitForNavigation();
});

const pagesToTest: string[] = [
    'home', 'dashboard', 'screenWithBackground', 'defaultCustomPage', 
    'synopticBoard', 'scheduler', 'alarms', 'weather', 'analysis', 'admin'
];

test.describe('Network requests status check', () => {
    for (const pageName of pagesToTest) {
        test(`Check if all network requests return status 200 on ${pageName}`, async ({ page }) => {
            const failedRequests: { url: string; status: number }[] = [];

            await page.goto(`${baseUrl}pages/${pageName}`);
            await page.waitForLoadState('networkidle');

            page.on('response', response => {
                if (!response.ok()) {
                    failedRequests.push({
                        url: response.url(),
                        status: response.status()
                    });
                }
            });

            expect(failedRequests).toHaveLength(0);

            if (failedRequests.length > 0) {
                console.log(`Failed requests on ${pageName}:`, failedRequests);
            }
        });
    }
});
