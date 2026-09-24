import fs from 'fs';
import path from 'path';

const filesToCopy = [
  {
    src: 'C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\5256c30c-cbd6-4df3-a391-52900e454596\\project_ladki_bahin_1790176451339.jpg',
    dest: 'public/images/project-ladki-bahin.jpg',
  },
  {
    src: 'C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\5256c30c-cbd6-4df3-a391-52900e454596\\project_portfolio_1790176555588.jpg',
    dest: 'public/images/project-portfolio.jpg',
  },
  {
    src: 'C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\5256c30c-cbd6-4df3-a391-52900e454596\\project_blood_bank_1790176724114.jpg',
    dest: 'public/images/project-blood-bank.jpg',
  },
  {
    src: 'C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\5256c30c-cbd6-4df3-a391-52900e454596\\project_sales_mgmt_1790177017911.jpg',
    dest: 'public/images/project-sales-mgmt.jpg',
  },
];

for (const { src, dest } of filesToCopy) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${src} -> ${dest}`);
  } else {
    console.warn(`Source not found: ${src}`);
  }
}
