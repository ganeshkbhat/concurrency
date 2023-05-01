const postData = { foo: 'bar' };
const options = { headers: { 'Authorization': 'Bearer <TOKEN>' } };

makePostRequest('https://example.com/api', postData, options)
    .then((response) => {
        console.log(`Status code: ${response.statusCode}`);
        console.log(`Response body: ${response.body}`);
    })
    .catch((error) => {
        console.error(error);
    });


const urls = ['https://www.google.com', 'https://www.google.com/search?q=javascript', 'https://www.google.com/search?q=web+workers'];
fetchMultipleUrls(urls)
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.error(error);
    });
