const express = require('express');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;

const Flow = require('../models/flowsModel.js');
const config = require('../config.js');

let router = express.Router();

const checkForErrors = ({ data }) => {
    let errors = {};
    let isValid = false;
    if (!data) {
        errors = { ...errors, title: 'This field is required' }
    }
    
    if (Object.keys(errors).length > 0) {
        return { isValid, errors };
    }
    isValid = true;
    return { isValid, errors };
}

const isAuthenticated = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const authorizationToken = authorizationHeader.split(' ')[1];
    if (authorizationToken) {
        jwt.verify(authorizationToken, config.jwtSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Failed to authenticate' });
            } else {
                req.authorId = decoded.id;
                next();
            }
        });
    } else {
        res.status(403).json({ error: 'No token provided' })
    }
}

router.get('/', (req, res) => {
    Flow.find({}, (err, flows) => {
        res.json({ flows });
    })
});

router.get('/get', (req, res) => {
    Flow.findOne({}, (err, flow) => {
        res.json({ flow });
    })
});

router.get('/myflows', (req, res) => {//, isAuthenticated
    Flow.find({authorId: req.authorId}, (err, flows) => {
        if (err) throw err;
        res.json({ flows });
    })
});

router.get('/:id', (req, res) => {
    Flow.findById(req.params.id, (err, flow) => {
        if (err) throw err;
        res.json({ flow });
    })
});

router.post('/t-add', async (req, res) => {
    const data = req.body.data || {};

    const { isValid, errors } = checkForErrors({ data });

    if (isValid) {
        const flow = await Flow.findOne();

        if (flow) {
            const updatedFlow = {
                data: data
            };
            try {
                await Flow.findByIdAndUpdate(flow._id, updatedFlow)
                res.json({ success: 'success' });
            } catch(e) {
                throw err;
            }
        } else {
            const newFlow = new Flow({
                data: data
            });
    
            try {
                await newFlow.save();
                res.json({ success: 'success' });
            } catch (e) {
                throw err;
            }
        }
    } else {
        res.json({ errors });
    }
});

router.post('/add', (req, res) => {//, isAuthenticated
    const title = req.body.title || '';
    const author = req.body.author || '';
    const body = req.body.body || '';
    const authorId = req.authorId;

    const { isValid, errors } = checkForErrors({ title, author, body });

    if (isValid) {
        const newFlow = new Flow({
            title: title,
            author: author,
            body: body,
            authorId: new ObjectId(authorId)
        });

        newFlow.save((err) => {
            if (err) throw err;
            else {
                res.json({ success: 'success' });
            }
        });
    } else {
        res.json({ errors });
    }
});

router.post('/edit/:id', (req, res) => {//, isAuthenticated
    const title = req.body.title || '';
    const author = req.body.author || '';
    const body = req.body.body || '';
    const authorId = req.authorId;

    const { isValid, errors } = checkForErrors({ title, author, body });

    if (isValid) {
        const updatedFlow = {
            title: req.body.title,
            author: req.body.author,
            body: req.body.body,
            authorId: new ObjectId(authorId)
        };

        Flow.findByIdAndUpdate(req.params.id, updatedFlow, err => {
            if (err) throw err;
            else res.json({ success: 'success' });
        });
    } else {
        res.json({ errors });
    }
});

router.delete('/delete/:id', (req, res) => {//, isAuthenticated
    Flow.remove({_id: req.params.id}, err => {
        res.json({ success: 'success' });
    });
});

module.exports = router;
