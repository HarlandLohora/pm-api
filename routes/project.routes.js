const router = require("express").Router()
const Project = require("../models/Project.model")
const mongoose = require("mongoose")

router.get('/projects', (req, res) => {
    console.log("All Projects")
    Project.find()
        .then(allProjects => {
            console.log(allProjects)
            res.json(allProjects)
        })
        .catch((err) => console.log(err))
})

router.post('/projects', (req, res) => {
    const { title, description } = req.body
    //Project.create({title,description})
    Project.create(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch((err) => console.log(err))
})


//  GET /api/projects/:projectId -  Retrieves a specific project by id
router.get('/projects/:projectId', (req, res, next) => {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    // Each Project document has `tasks` array holding `_id`s of Task documents
    // We use .populate() method to get swap the `_id`s for the actual Task documents
    Project.findById(projectId)
        .populate("tasks", "_id title")
        .then(project => res.status(200).json(project))
        .catch(error => res.json(error));
});


// PUT  /api/projects/:projectId  -  Updates a specific project by id
router.put('/projects/:projectId', (req, res, next) => {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Project.findByIdAndUpdate(projectId, req.body, { new: true })
        .then((updatedProject) => res.json(updatedProject))
        .catch(error => res.json(error));
});


// DELETE  /api/projects/:projectId  -  Deletes a specific project by id
router.delete('/projects/:projectId', (req, res, next) => {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Project.findByIdAndRemove(projectId)
        .then(() => res.json({ message: `Project with ${projectId} is removed successfully.` }))
        .catch(error => res.json(error));
});


module.exports = router;