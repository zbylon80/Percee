import { Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.PLAYWRIGHT_USERNAME;
const password = process.env.PLAYWRIGHT_PASSWORD;

export async function login(page: Page) {
    if (!username || !password) {
        throw new Error('Username or password is not set in .env file!');
    }

    await page.goto(`${process.env.PLAYWRIGHT_BASE_URL}login`);
    await page.fill('#login', username);
    await page.fill('#password', password);
    await page.click('.login-button');
    await page.waitForNavigation();
}
