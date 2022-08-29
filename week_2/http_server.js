const http = require("http");

http.createServer((request, response) => {
    console.log(request.url)
    response.write("Hello World!\n");
    response.write(`${request.url}`);
    response.end()
})
.listen(8000, () => console.log('Server Running...'))