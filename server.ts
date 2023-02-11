// const bodyParser = require('body-parser');
// const mongodb = require('./db/connect.ts');
const express = require('express');
const cors = require("cors");
var app = express();

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 8080;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
// })

// app.use('/', require('./routes/index.ts'));

app.get('/', (req, res)=> {
  res.send("Hello World")
})

// mongodb.initDb((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     app.listen(port);
//     console.log(`Server is running on port ${port}`);
//   }
// });

app.listen(port, ()=> {
      console.log(`Server is running on port ${port}`);
});