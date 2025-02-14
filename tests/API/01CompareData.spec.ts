import { test } from '@playwright/test';
import { updatePayloads } from '../../utils/updatePayloads';
import { validateApiResponses } from '../../utils/validateApi';

const algFileName = '01alg_payload';
const anaFileName = '01ana_payload';

test.beforeAll(() => updatePayloads(
    algFileName, 
    anaFileName,
    'getDeviceRawRecords'
));

test('Validate Algorithms and Analysis API responses - getDeviceRawRecords', async ({ page, request }) => 
    await validateApiResponses(
        page, 
        request, 
        algFileName, 
        anaFileName
));
