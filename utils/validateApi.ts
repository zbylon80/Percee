import { Page, APIRequestContext, expect } from '@playwright/test';
import { callApi } from './apiCalls';
import { normalizeDateTime } from './dateUtils';
import fs from 'fs';

interface DataEntry {
    DateTime: string;
    Value: number;
}

export async function validateApiResponses(
    page: Page,
    request: APIRequestContext,
    algPayloadName: string,
    anaPayloadName: string,
    resultDir: string = 'resultFiles/'
) {
    const algPayloadFile = `${algPayloadName}.json`;
    const anaPayloadFile = `${anaPayloadName}.json`;

    const responseAlg = await callApi(page, request, algPayloadFile, 'algorithms/validateExecution');
    const responseAlgBody = await responseAlg.json();

    const responseAna = await callApi(page, request, anaPayloadFile, 'analysis/getValues');
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

    if (!fs.existsSync(resultDir)) {
        fs.mkdirSync(resultDir, { recursive: true });
    }

    const resultAlgFile = `${resultDir}${algPayloadName}_extracted_result.json`;
    const resultAnaFile = `${resultDir}${anaPayloadName}_extracted_result.json`;

    fs.writeFileSync(resultAlgFile, JSON.stringify(extractedDataAlg, null, 2), 'utf-8');
    fs.writeFileSync(resultAnaFile, JSON.stringify(extractedDataAna, null, 2), 'utf-8');

    expect(extractedDataAlg).toEqual(extractedDataAna);
}
