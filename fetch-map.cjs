const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson';
const dest = path.join(__dirname, 'public', 'india-topo.json');

https.get(url, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Failed to download: ${res.statusCode}`);
    process.exit(1);
  }
  
  const file = fs.createWriteStream(dest);
  res.pipe(file);
  
  file.on('finish', () => {
    file.close();
    console.log('Download completed');
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
