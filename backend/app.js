require("dotenv").config()
require('express-async-errors');
const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const router = require("./routes/main")
const connectDB = require("./MongoDB/Connect")
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');


app.use(bodyParser.json({ limit: '10mb' }));
//app.use(bodyParser.json()) 



app.use('/api/v1', router);

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`the server running on the port${port}`)
    })
  } catch (error) {
    console.log(error)

  }
}
start();