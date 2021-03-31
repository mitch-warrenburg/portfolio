const fs = require('fs');
const path = require('path');

const buildDir = './build';
const htmlFileName = 'index.html';
const jsRegex = /^.*\..*\.(js)$/;
const fileRegex = /^.*\..*\.(css|js|png|jpg)$/;
const manifestFileName = 'manifest.webmanifest';

const renameFile = fileName => {
  const newFileName = fileName.replace('.', '-');
  const newFilePath = path.join(buildDir, newFileName);
  const filePath = path.join(buildDir, fileName);
  return fs.renameSync(filePath, newFilePath);
};

const replaceFileName = (fileName, fileText) => {
  return fileText.replace(new RegExp(fileName, 'g'), fileName.replace('.', '-'));
};

const renameFiles = async fileNames => {
  return fileNames.forEach(file => renameFile(file));
};

const replaceFilesInFileText = async (fileNames, targetFileName) => {
  const filePath = path.join(buildDir, targetFileName);
  let fileText = fs.readFileSync(filePath, 'utf8');

  fileNames.forEach(fileName => (fileText = replaceFileName(fileName, fileText)));
  fs.writeFileSync(filePath, fileText, 'utf8');
};

const filesToRename = fs.readdirSync(buildDir).filter(file => file.match(fileRegex));
const jsFilesToRename = filesToRename.filter(file => file.match(jsRegex));

const renameBuildOutput = async () => {
  await Promise.all(
    jsFilesToRename.map(jsFile => replaceFilesInFileText(filesToRename, jsFile))
  );
  await Promise.all([
    replaceFilesInFileText(filesToRename, htmlFileName),
    replaceFilesInFileText(filesToRename, manifestFileName),
  ]);

  await renameFiles(filesToRename);
};

renameBuildOutput().catch(console.error);
