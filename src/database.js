const fs = require('node:fs/promises');
const path = require('node:path');

const DEFAULT_DATA = {
  services: []
};

function createDatabase(filePath = path.join(__dirname, '..', 'data', 'services.json')) {
  async function ensureFile() {
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    try {
      await fs.access(filePath);
    } catch {
      await fs.writeFile(filePath, JSON.stringify(DEFAULT_DATA, null, 2));
    }
  }

  async function read() {
    await ensureFile();
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  }

  async function write(data) {
    await ensureFile();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  return {
    read,
    write
  };
}

module.exports = {
  createDatabase
};
