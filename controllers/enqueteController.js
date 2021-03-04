const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Enquete = mongoose.model('Enquete');

router.get('/', (req, res) => {
    res.render("enquete/addOrEdit", {
        viewTitle: "Insert Enquete"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var enquete = new Enquete();
    enquete.enqueteurname = req.body.enqueteurname;
    enquete.email = req.body.email;
    enquete.datedebut = req.body.datedebut;
    enquete.datefin = req.body.datefin;
    enquete.save((err, doc) => {
        if (!err)
            res.redirect('enquete/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("enquete/addOrEdit", {
                    viewTitle: "Insert Enquete",
                    enquete: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Enquete.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('enquete/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("enquete/addOrEdit", {
                    viewTitle: 'Update Enquete',
                    enquete: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Enquete.find((err, docs) => {
        if (!err) {
            res.render("enquete/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving enquete list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'enqueteurname':
                body['fenqueteurnameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Enquete.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("enquete/addOrEdit", {
                viewTitle: "Update Enquete",
                enquete: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Enquete.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/enquete/list');
        }
        else { console.log('Error in enquete delete :' + err); }
    });
});

module.exports = router;