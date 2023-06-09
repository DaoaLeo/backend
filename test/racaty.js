import axios from "axios"
import cheerio from "cheerio"

extract("https://racaty.io
/asslnc57ncii").then(console.log)
async function extract(url) {
  url = url.replace(".net",".io").replace("http://","https://")
  const headers = {
    'referer': 'https://racaty.io',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36',
    'accept': 'application/json'
  };

  const regex = /(https?:\/\/racaty\.(io|net)\/([a-zA-Z\d]{12}))/;
  const match = url.match(regex);
  const _id = match[3];

  const payload = 'op=download2&id=' + _id + '&rand=&referer=&method_free=&method_premium=';

  const response = await axios.post(url, payload, { headers });
  const $ = cheerio.load(response.data);
  const file_url = $('#uniqueExpirylink').attr('href').replace(' ', '%20');
  const file_name = /\/\/.*\/.*\/(.*)/.exec(file_url)[1];

  return { file_url, file_name };
}
