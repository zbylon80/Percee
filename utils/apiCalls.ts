import { Page, APIRequestContext } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { login } from './auth';

dotenv.config();

export async function callApi(page: Page, request: APIRequestContext, fileName: string, endpoint: string) {
    await login(page);

    const jwtToken = await page.evaluate(() => localStorage.getItem('jwt'));
    if (!jwtToken) {
        throw new Error('JWT token not found in localStorage!');
    }

    const filePath = path.join(__dirname, '../testData', fileName);
    if (!fs.existsSync(filePath)) {
        throw new Error(`File ${fileName} not found in testData directory!`);
    }

    const payload = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const baseUrl = process.env.PLAYWRIGHT_BASE_URL;
    if (!baseUrl) {
        throw new Error('PLAYWRIGHT_BASE_URL is not set in .env file!');
    }

    const response = await request.post(`${baseUrl}IZE/api/${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
        },
        data: payload,
    });

    return response;
}
