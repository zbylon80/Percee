import fs from 'fs';

export const updateJsonFile = (filePath: string, updateFn: (data: any) => void) => {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    updateFn(data);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf-8');
};