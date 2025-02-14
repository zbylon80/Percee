import { test } from '@playwright/test';
import { updatePayloads } from '../../utils/updatePayloads';
import { validateApiResponses } from '../../utils/validateApi';

const algFileName = '02alg_payload';
const anaFileName = '02ana_payload';

// test.beforeAll(() => updatePayloads(
//     algFileName, 
//     anaFileName,
//     'getDeviceAggregatedRecords'
// ));

test('Validate Algorithms and Analysis API responses - getDeviceAggregatedRecords', async ({ page, request }) => 
    await validateApiResponses(
        page, 
        request, 
        algFileName, 
        anaFileName
));
