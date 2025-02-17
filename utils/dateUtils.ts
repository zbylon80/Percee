export const normalizeDateTime = (dateTime: string): string => {
    const date = new Date(dateTime);
    return date.toISOString().replace('Z', '');
}

export const adjustDate = (offsetDays: number, offsetHours: number, format: 'sql' | 'iso'): string => {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    date.setHours(date.getHours() + offsetHours, 0, 0, 0);
    
    return format === 'sql' 
        ? date.toISOString().replace('T', ' ').substring(0, 19)
        : date.toISOString();
};

export const getPreviousWeekDates = (): { previousMondayOffset: number; lastSundayOffset: number; } => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    const previousMondayOffset = dayOfWeek === 1 ? -7 : -(dayOfWeek + 6) % 7 - 7;
    const lastSundayOffset = dayOfWeek === 0 ? -7 : -dayOfWeek;

    return { previousMondayOffset, lastSundayOffset };
};