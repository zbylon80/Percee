import { test, expect } from '@playwright/test';
import { callApi } from '../utils/apiCalls';
import { updatePayloads } from '../utils/updatePayloads';
import { normalizeDateTime } from '../utils/dateUtils';
import fs from 'fs';

interface DataEntry {
    DateTime: string;
    Value: number;
}

test.beforeAll(() => {
    updatePayloads();
});

test('Validate Algorithms and Analysis API responses', async ({ page, request }) => {
    const responseAlg = await callApi(page, request, 'alg_payload.json', 'algorithms/validateExecution');
    const responseAlgBody = await responseAlg.json();

    const responseAna = await callApi(page, request, 'ana_payload.json', 'analysis/getValues');
    const responseAnaBody = await responseAna.json();

    const parsedResultAlg = JSON.parse(responseAlgBody.result) as { Data: DataEntry[] };
    const extractedDataAlg = parsedResultAlg.Data.map(({ DateTime, Value }: DataEntry) => ({
        DateTime: normalizeDateTime(DateTime),
        Value
    }));

    let extractedDataAna: DataEntry[] = [];

    if (responseAnaBody.data && responseAnaBody.data.length > 0) {
        extractedDataAna = responseAnaBody.data.flatMap((serie: any) =>
            serie.serieValues.map((entry: any) => ({
                DateTime: normalizeDateTime(entry.date),
                Value: entry.value,
            }))
        );
    }

    fs.writeFileSync('resultFiles/extracted_result_alg.json', JSON.stringify(extractedDataAlg, null, 2), 'utf-8');
    fs.writeFileSync('resultFiles/extracted_result_ana.json', JSON.stringify(extractedDataAna, null, 2), 'utf-8');

    expect(extractedDataAlg).toEqual(extractedDataAna);
});