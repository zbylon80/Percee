import path from 'path';
import { adjustDate } from './dateUtils';
import { updateJsonFile } from './jsonUtils';
import { getPreviousWeekDates } from './dateUtils';

export const updatePayloadsForRawRecords = (algFile: string, anaFile: string) => {
    updateJsonFile(path.resolve(__dirname, `../testData/${algFile}.json`), (data) => {
        data.body = data.body
            .replace(/sDateBegin:\s*'[^']+'/g, `sDateBegin:'${adjustDate(0, -2, 'sql')}'`)
            .replace(/sDateEnd:\s*'[^']+'/g, `sDateEnd:'${adjustDate(0, 0, 'sql')}'`);
    });

    updateJsonFile(path.resolve(__dirname, `../testData/${anaFile}.json`), (data) => {
        Object.assign(data.analysisRangeModel, {
            beginDate: adjustDate(0, -3, 'iso'),
            endDate: adjustDate(0, -1, 'iso'),
        });
    });
};

export const updatePayloadsForAggregatedRecords = (algFile: string, anaFile: string) => {
    const { previousMondayOffset, lastSundayOffset } = getPreviousWeekDates();
    const midnight = -new Date().getUTCHours();

    updateJsonFile(path.resolve(__dirname, `../testData/${algFile}.json`), (data) => {
        data.body = data.body
            .replace(/sDateBegin:\s*'[^']+'/g, `sDateBegin:'${adjustDate(previousMondayOffset, midnight, 'sql')}'`)
            .replace(/sDateEnd:\s*'[^']+'/g, `sDateEnd:'${adjustDate(lastSundayOffset, midnight, 'sql')}'`);
    });

    updateJsonFile(path.resolve(__dirname, `../testData/${anaFile}.json`), (data) => {
        Object.assign(data.analysisRangeModel, {
            beginDate: adjustDate(previousMondayOffset, midnight - 1, 'iso'),
            endDate: adjustDate(lastSundayOffset, midnight - 1, 'iso'),
        });
    });
}
