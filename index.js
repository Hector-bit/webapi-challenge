/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/

const projects = require('./data/helpers/projectModel');
const actions = require('./data/helpers/actionModel');

const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('API home is working')
})

server.get('/api/projects', (req, res) => {
    projects.get()
    .then(projects => {
        // console.log('project', project)
        res.status(200).json(projects);
    })
    .catch(err => res.status(400).json('bad request'))
})

server.get('/api/projects/:id', (req, res) => {
    projects.get(req.params.id)
    .then(project => {
        if(project){
            res.status(200).json(project);
        } else {
            res.status(404).json('this project does not exist')
        }
    })
    .catch(err => res.status(400).json('bad request'))
})

server.get('/api/projects/:id/actions', (req, res) => {
    projects.getProjectActions(req.params.id)
    .then(action => {
        if(action){
            res.status(200).json(action);
        } else {
            res.status(404).json('this project does not exist')
        }
    })
    .catch(err => res.status(400).json('bad request'))
})

server.post('/api/projects/', (req, res) => {
    projects.insert(req.body)
    .then(project => {
        if(project){
            res.status(200).json(project);
        } else {
            res.status(404).json('project was not added')
        }
    })
    .catch(err => res.status(400).json('bad request'))
})

server.delete('/api/projects/:id', (req, res) => {
    projects.remove(req.params.id)
    .then(project => {
        if(project){
            res.status(200).json('project was deleted');
        } else {
            res.status(404).json('project was not deleted')
        }
    })
    .catch(err => res.status(400).json('bad request'))
})

server.put('/api/projects/:id', (req, res) => {
    projects.update(req.params.id, req.body)
    .then(project => {
        if(project){
            res.status(200).json(project);
        } else {
            res.status(404).json('project was not updated')
        }
    })
    .catch(err => res.status(400).json('bad request'))
})

//actions 

server.get('/api/projects/:id/actions/:id', (req, res) => {
    actions.get(req.params.id)
    .then(action => {
        if(action){
            res.status(200).json(action);
        } else {
            res.status(404).json('this action does not exist')
        }
    })
    .catch(err => res.status(400).json('bad request'))
})

server.post('/api/projects/:id/actions', (req, res) => {
    actions.insert(req.body)
    .then(action => {
        if(action){
            res.status(200).json(action);
        } else {
            res.status(404).json('action was not added')
        }
    })
    .catch(err => res.status(400).json('bad request'))
})

server.delete('/api/projects/:id/actions/:id', (req, res) => {
    actions.remove(req.params.id)
    .then(action => {
        if(action){
            res.status(200).json('action was deleted');
        } else {
            res.status(404).json('action was not deleted')
        }
    })
    .catch(err => res.status(400).json('bad request'))
})

server.put('/api/projects/:id/actions/:id', (req, res) => {
    actions.update(req.params.id, req.body)
    .then(action => {
        if(action){
            res.status(200).json(action);
        } else {
            res.status(404).json('action was not updated')
        }
    })
    .catch(err => res.status(400).json('bad request'))
})

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log('<=== API IS ON ===>')
})