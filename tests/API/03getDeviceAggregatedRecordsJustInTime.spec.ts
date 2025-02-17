import { test } from '@playwright/test';
import { updatePayloads } from '../../utils/upgradePayloads';
import { validateApiResponses } from '../../utils/validateApi';

const algFileName = '03alg_payload';
const anaFileName = '03ana_payload';

test.beforeAll(() => updatePayloads(
    '1w',
    algFileName, 
    anaFileName
));

test('Validate Algorithms and Analysis API responses - getDeviceAggregatedRecords', async ({ page, request }) => 
    await validateApiResponses(
        page, 
        request, 
        algFileName, 
        anaFileName
));
