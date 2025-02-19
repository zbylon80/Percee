import fs from 'fs';
import path from 'path';
import { adjustDate } from './dateUtils';

const updateJsonFile = (filePath: string, updateFn: (data: any) => void) => {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    updateFn(data);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf-8');
};

export const updateAlgFiles = (algFiles: string[], sDateBeginOffsetDays: number, sDateBeginOffsetHours: number, sDateEndOffsetDays: number, sDateEndOffsetHours: number) => {
    algFiles.forEach((algFile) => {
        updateJsonFile(path.resolve(__dirname, `../testData/${algFile}.json`), (data) => {
            data.body = data.body
                .replace(/sDateBegin:\s*'[^']+'/g, `sDateBegin:'${adjustDate(sDateBeginOffsetDays, sDateBeginOffsetHours, 'sql')}'`)
                .replace(/sDateEnd:\s*'[^']+'/g, `sDateEnd:'${adjustDate(sDateEndOffsetDays, sDateEndOffsetHours, 'sql')}'`);
        });
    });
};

export const updateAnaFiles = (anaFiles: string[], beginDateOffsetDays: number, beginDateOffsetHours: number, endDateOffsetDays: number, endDateOffsetHours: number) => {
    anaFiles.forEach((anaFile) => {
        updateJsonFile(path.resolve(__dirname, `../testData/${anaFile}.json`), (data) => {
            Object.assign(data.analysisRangeModel, {
                beginDate: adjustDate(beginDateOffsetDays, beginDateOffsetHours, 'iso'),
                endDate: adjustDate(endDateOffsetDays, endDateOffsetHours, 'iso'),
            });
        });
    });
};