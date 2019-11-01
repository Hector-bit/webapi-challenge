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

const express = require('express');
const server = express();
const projects = require('./data/helpers/projectModel')

server.use(express.json());

server.get('/', (req, res) => {
    res.send('API home is working')
})

// server.get('/api/projects', (req, res) => {
//     projects.get(req.body)
//     console.log('req.body', req.body)
//     .then(project => {
//         console.log('project', project)
//         res.status(200).json(project);
//     })
//     .catch(err => res.status(400).json('bad request'))
// })

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

server.listen(4000, () => {
    console.log('<=== API IS ON ===>')
})