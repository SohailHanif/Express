const http = require("http");
const path = require("path");
const fs = require("fs");
const Person = require("./person")

const server = http.createServer((request, response) => {
    console.log(request.url)
    let filePath = path.join(
        __dirname,
        'public',
        request.url === '/' ? 'index.html' : request.url
    )

    if (request.url == "/person"){
        response.writeHead(200, {'Content-Type' : 'application/json'});
        person1 = new Person("John", 25);
        response.end(JSON.stringify(person1))
    // Route that returns sum of numbers 
    } else if (request.url == "/sum"){
        response.writeHead(200, {'Content-Type' : 'application/json'});

        // array of numbers
        nums = [1, 2, 3, 4]
        sum = 0

        // Foreach function to add numbers together
        // nums.forEach(function(num) {
        //     console.log(num)
        //     sum += num
        // });

        // Arrow function to add numbers together
        nums.forEach(num => {
            console.log(num)
            sum += num
        });

        console.log(sum)
        response.end(JSON.stringify(sum))
    // Route to show other node features
    } else if (request.url == "/node"){
        response.writeHead(200, {'Content-Type' : 'application/json'});

        // Block scoping with var
        // for (var i = 0; i < 5; ++i){
        //     setTimeout(() => {
        //         console.log(`Var i: ${i}`)
        //     }, 1000)
        // }

        // Block scoping with let
        // for (let i = 0; i < 5; ++i){
        //     setTimeout(() => {
        //         console.log(`Let i: ${i}`)
        //     }, 1000)
        // }

        // Variadic function
        // function sum(...nums) {
        //     console.log(nums.reduce((total, a) => total + a, 0))
        // }
        // sum(1, 2, 4, 5, 7, 9)

        // const numbers = [10, 2, 3, 7, 5, 6];
        // // Spread operator with destructuring
        // const [one, two, ...rest] = numbers;
        // console.log(`One: ${one}, Two: ${two}`)
        // console.log(`Rest: ${rest}`)

        // var c = "cc"
        // var v = "vv"
        // // Property shorthand
        // var e = {c, v}
        
        // console.log(e)

        // Computed object keys
        // var name = "hello"

        // var obj = {
        //     [name]: "world"
        // }
        // console.log(obj)

        var one = 1
        var two = 2
        // Swap values
        var [one, two] = [two, one]
        console.log(`One: ${one}, Two: ${two}`)

        response.end("Success")
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            response.writeHead(404, {'Content-Type' : 'text/html'});
            if (err.code == 'ENOENT'){
                fs.readFile(path.join(__dirname, "public", "404.html"), (err, content) => {
                    response.end(content, 'utf8')
                })
            } else {
                response.end(`Error: ${err.code}`)
            }
        } else {
            response.writeHead(200, {'Content-Type' : 'text/html'});
            response.end(content, 'utf8')
        }
        }),
        "utf8",
        (err, data) => {
          if (err) throw err;
          console.log(data);
        }
});


const PORT = process.env.PORT || 8000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
