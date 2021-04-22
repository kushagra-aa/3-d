const mongoose = require('mongoose');
const con_url_user = "mongodb+srv://kushagra:kgumatrt@cluster1.rommy.mongodb.net/3D?retryWrites=true&w=majority";


mongoose.connect(con_url_user, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connection Established Successfully');
    })
    .catch((error) => {
        console.error(error);
    })

module.exports = mongoose;