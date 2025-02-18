import { test } from '@playwright/test';
import { updatePayloads } from '../../utils/upgradePayloads';
import { validateApiResponses } from '../../utils/validateApi';

const algFiles = ['0101alg_payload', '0102alg_payload', '0103alg_payload', '0104alg_payload'];
const anaFiles = ['0101ana_payload', '0102ana_payload', '0103ana_payload', '0104ana_payload'];

test.describe('Validate Algorithms and Analysis API responses - getDeviceRawRecords', () => {
    
    test.beforeAll(() => updatePayloads(
        '15m',
        algFiles, 
        anaFiles
    ));

    test('One id, one attribute', async ({ page, request }) => 
        await validateApiResponses(
            page, 
            request, 
            algFiles[0], 
            anaFiles[0]
    ));

    test('One id, two attributes', async ({ page, request }) => 
        await validateApiResponses(
            page, 
            request, 
            algFiles[1], 
            anaFiles[1]
    ));

    test('Two ids, one attribute', async ({ page, request }) => 
        await validateApiResponses(
            page, 
            request, 
            algFiles[2], 
            anaFiles[2]
    ));

    test('Two ids, two attributes', async ({ page, request }) => 
        await validateApiResponses(
            page, 
            request, 
            algFiles[3], 
            anaFiles[3]
    ));
});
