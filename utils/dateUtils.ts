export function normalizeDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toISOString().replace('Z', '');
}