const mongoose = require('mongoose');

var enqueteSchema = new mongoose.Schema({
    enqueteurname: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String
    },
    datedebut: {
        type: String
    },
    datefin: {
        type: String
    }
});

// Custom validation for email
enqueteSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('Enquete', enqueteSchema);