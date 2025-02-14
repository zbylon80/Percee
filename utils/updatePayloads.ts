import fs from 'fs';
import path from 'path';

function getAdjustedDate(hoursOffset: number, format: 'sql' | 'iso'): string {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    now.setHours(now.getHours() + hoursOffset);
    return format === 'sql' 
        ? now.toISOString().replace('T', ' ').substring(0, 19) 
        : now.toISOString();
}

export function updatePayloads(algFile: string = 'alg_payload.json', anaFile: string = 'ana_payload.json', testName: string) {
    const updateFile = (filePath: string, updateFn: (data: any) => void) => {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        updateFn(data);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf-8');
    };

    updateFile(path.resolve(__dirname, `../testData/${algFile}.json`), (data) => {
        if (testName === 'getDeviceRawRecords') {
            data.body = data.body
                .replace(/sDateBegin:\s*'[^']+'/g, `sDateBegin:'${getAdjustedDate(-2, 'sql')}'`)
                .replace(/sDateEnd:\s*'[^']+'/g, `sDateEnd:'${getAdjustedDate(0, 'sql')}'`);
        } else if (testName === 'getDeviceAggregatedRecords') {
            console.log('test2');
        } else {
            console.log('test3');
        }
    });

    updateFile(path.resolve(__dirname, `../testData/${anaFile}.json`), (data) => {
        if (testName === 'getDeviceRawRecords') {
            data.analysisRangeModel.beginDate = getAdjustedDate(-3, 'iso');
            data.analysisRangeModel.endDate = getAdjustedDate(-1, 'iso');
        } else if (testName === 'getDeviceAggregatedRecords') {
            console.log('test2');
        } else {
            console.log('test3');
        }
    });
}
