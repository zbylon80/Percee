import { test, expect } from '@playwright/test';
import { callApi } from '../utils/apiCalls';

test('Validate Execution API', async ({ page, request }) => {
    const response = await callApi(page, request, 'algorytmy.json', 'algorithms/validateExecution');
    expect(response.status()).toBe(200);
    
    const responseBody = await response.text();
    console.log(`Response Status: ${response.status()}`);
    console.log(`Response Body: ${responseBody}`);
});
