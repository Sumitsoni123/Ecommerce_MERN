const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.LOCALDB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connection is successful");
}).catch((e) => {
    console.log("Not connected");
});
