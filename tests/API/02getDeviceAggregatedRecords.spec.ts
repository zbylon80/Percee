import { test } from '@playwright/test';
import { updatePayloads } from '../../utils/upgradePayloads';
import { validateApiResponses } from '../../utils/validateApi';

const algFiles = ['0201alg_payload', '0202alg_payload', '0203alg_payload', '0204alg_payload'];
const anaFiles = ['0201ana_payload', '0202ana_payload', '0203ana_payload', '0204ana_payload'];

test.describe('Validate Algorithms and Analysis API responses - getDeviceAggregatedRecords', () => {
    test.beforeAll(() => updatePayloads(
        '1w',
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