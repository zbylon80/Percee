import { test } from '@playwright/test';
import { updatePayloadsForAggregatedRecords } from '../../utils/upgradePayloads';
import { validateApiResponses } from '../../utils/validateApi';

const algFileName = '02alg_payload';
const anaFileName = '02ana_payload';

test.beforeAll(() => updatePayloadsForAggregatedRecords(
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
