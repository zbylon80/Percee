import { test } from '@playwright/test';
import { updatePayloadsForRawRecords } from '../../utils/upgradePayloads';
import { validateApiResponses } from '../../utils/validateApi';

const algFileName = '01alg_payload';
const anaFileName = '01ana_payload';

test.beforeAll(() => updatePayloadsForRawRecords(
    algFileName, 
    anaFileName
));

test('Validate Algorithms and Analysis API responses - getDeviceRawRecords', async ({ page, request }) => 
    await validateApiResponses(
        page, 
        request, 
        algFileName, 
        anaFileName
));
