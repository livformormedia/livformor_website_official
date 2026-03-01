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

const replacements = [
    // word boundaries to avoid replacing parts of other words
    { regex: /\bleads\b/gi, replacement: 'patient inquiries' },
    { regex: /\blead\b/gi, replacement: 'patient inquiry' },
    { regex: /\bsales call\b/gi, replacement: 'consultation' },
    { regex: /\bsales calls\b/gi, replacement: 'consultations' },
    { regex: /\brev share\b|\brevenue share\b/gi, replacement: 'performance pricing' },
    // Careful with "sales", context might be weird. We'll replace " sales " with " consultations " roughly, but maybe too broad. Let's do receptionist instead.
    { regex: /\breceptionist\b/gi, replacement: 'Care Coordinator' },
    { regex: /\breceptionists\b/gi, replacement: 'Care Coordinators' },
    { regex: /\bad spend\b/gi, replacement: 'patient acquisition budget' },
    { regex: /\badvertising spend\b/gi, replacement: 'patient acquisition budget' },
    { regex: /\bpackage\b/gi, replacement: 'treatment plan' },
    { regex: /\bpackages\b/gi, replacement: 'treatment plans' },
];

filesToProcess.forEach(fileName => {
    const filePath = path.join(process.cwd(), 'src/data', fileName);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        let changeCount = 0;

        replacements.forEach(({ regex, replacement }) => {
            const matches = content.match(regex);
            if (matches) {
                changeCount += matches.length;
                content = content.replace(regex, replacement);
            }
        });

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${fileName}: ${changeCount} replacements made.`);
        } else {
            console.log(`No changes made to ${fileName}.`);
        }
    } else {
        console.log(`File not found: ${fileName}`);
    }
});
