import { getPreviousWeekDates } from './dateUtils';
import { updateAlgFiles, updateAnaFiles } from './jsonUtils';

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
