import path from 'path';
import { adjustDate } from './dateUtils';
import { updateJsonFile } from './jsonUtils';
import { getPreviousWeekDates } from './dateUtils';

const updateAlgFiles = (algFiles: string[], sDateBeginOffsetDays: number, sDateBeginOffsetHours: number, sDateEndOffsetDays: number, sDateEndOffsetHours: number) => {
    algFiles.forEach((algFile) => {
        updateJsonFile(path.resolve(__dirname, `../testData/${algFile}.json`), (data) => {
            data.body = data.body
                .replace(/sDateBegin:\s*'[^']+'/g, `sDateBegin:'${adjustDate(sDateBeginOffsetDays, sDateBeginOffsetHours, 'sql')}'`)
                .replace(/sDateEnd:\s*'[^']+'/g, `sDateEnd:'${adjustDate(sDateEndOffsetDays, sDateEndOffsetHours, 'sql')}'`);
        });
    });
};

const updateAnaFiles = (anaFiles: string[], beginDateOffsetDays: number, beginDateOffsetHours: number, endDateOffsetDays: number, endDateOffsetHours: number) => {
    anaFiles.forEach((anaFile) => {
        updateJsonFile(path.resolve(__dirname, `../testData/${anaFile}.json`), (data) => {
            Object.assign(data.analysisRangeModel, {
                beginDate: adjustDate(beginDateOffsetDays, beginDateOffsetHours, 'iso'),
                endDate: adjustDate(endDateOffsetDays, endDateOffsetHours, 'iso'),
            });
        });
    });
};

export const updatePayloads = (testType: string, algFiles: string[], anaFiles: string[]) => {
    const { previousMondayOffset, lastSundayOffset } = getPreviousWeekDates();
    const midnightUTCOffset = -new Date().getUTCHours();

    switch (testType) {
        case '15m':
            updateAlgFiles(algFiles, 0, -2, 0, 0);
            updateAnaFiles(anaFiles, 0, -3, 0, -1);
            break;

        case '1w':
            updateAlgFiles(algFiles, previousMondayOffset, midnightUTCOffset, lastSundayOffset, midnightUTCOffset);
            updateAnaFiles(anaFiles, previousMondayOffset, midnightUTCOffset - 1, lastSundayOffset, midnightUTCOffset - 1);
            break;

        default:
            console.warn(`Unknown test type: ${testType}`);
            break;
    }
};
