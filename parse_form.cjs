const https = require('https');

https.get('https://docs.google.com/forms/d/e/1FAIpQLSfkLMdex0vEhy-S5LnApfXCZd1BPMH6jJ1foRYDSm_6ulRPNA/viewform?usp=dialog', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*\]);/);
    if (match && match[1]) {
      const parsed = JSON.parse(match[1]);
      const fields = parsed[1][1];
      fields.forEach(field => {
        if (field[4]) {
          console.log(`Title: ${field[1]}`);
          const entryIds = field[4].map(entry => entry[0]);
          console.log(`Entry IDs: entry.${entryIds.join(', entry.')}`);
          console.log('---');
        }
      });
    } else {
      console.log('Could not find FB_PUBLIC_LOAD_DATA_');
    }
  });
}).on('error', (err) => {
  console.error(err);
});
