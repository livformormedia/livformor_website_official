import fs from 'fs';
import path from 'path';

const filesToProcess = [
    'scripts.js',
    'organic_scripts_extended_1.js',
    'organic_scripts_extended_2.js',
    'organic_scripts_extended_3.js',
    'organic_scripts_extended_4.js',
    'organic_scripts_extended_5.js'
];

filesToProcess.forEach(fileName => {
    const filePath = path.join(process.cwd(), 'src/data', fileName);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // "speed-to-lead" should be kept according to Niche Dictionary
        content = content.replace(/speed-to-patient inquiry/gi, 'speed-to-lead');

        // "patient patient inquiries" -> "patient inquiries"
        content = content.replace(/patient patient inquiries/gi, 'patient inquiries');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Reverted phrasing in ${fileName}.`);
        }
    }
});
