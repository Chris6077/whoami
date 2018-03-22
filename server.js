const express = require('express')
const app = express()

app.use(express.static('public'))

app.get("/", (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.send(
    JSON.stringify(
      { 
        ipaddress: request.get('x-forwarded-for').split(",")[0] || request.ip.split(",")[0],
        language: request.acceptsLanguages()[0],
        software: request.get('User-Agent').split("(")[1].split(")")[0]
      }
    )
  );
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})