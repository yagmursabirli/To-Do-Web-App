import { Router } from "express";
import { prisma } from '../db.js';

const router = Router()

//create a todo
router.post("/", async (req, res, next) => {
    try {
        const {title, description, status, priority, dueDate} = req.body;
        const newTask = await prisma.task.create({
            data: {title, description, status, priority, dueDate}
        })
        res.status(201).json(newTask)
        console.log(req.body);   
    } catch (e) {
        next(e)
    }

})

//read all - get all todos
router.get('/', async (req, res, next) => {
    try{
        const { q, status, priority, sortBy = 'createdAt', order = 'desc'} = req.query
        const tasks = await prisma.task.findMany({
            where: {
                AND: [
                    q ? {OR: [
                        {title: { contains: q, mode: 'insensitive'}},
                        {description: {contains: q, mode: 'insensitive'}},
                    ]} : {},
                    status ? {status} : {},
                    priority ? {priority} : {},
                ],
            },
            orderBy: { [sortBy]: order },
        })
        res.json(tasks)
    } catch(e) {next(e)}
})

// read one by id
router.get('/:id', async (req, res, next) => {
    try {
        
        const task = await prisma.task.findUnique({where : {id : req.params.id}})
        if(!task){
            return res.status(404).json({error: 'task cannot be found'}) 
        }
        res.json(task)
    } catch (e) {
        next(e)
    }
})

// update
router.put('/:id', async (req, res, next) => {
    try {
        
        const updated = await prisma.task.update({
            where: {id: req.params.id},
            data: req.body
        })
        res.json(updated)

    } catch (e) {
        next(e)
    }
})

// partial update - status
router.patch('/:id/status', async (req, res, next) => {
    try {
        const { status } = req.body;


        const updatedStatus = await prisma.task.update({
            where: { id: req.params.id },
            data: {
                status, 
                completedAt: status === 'completed' ? new Date() : null
            }
        });
        res.json(updatedStatus);
    } catch (e) {
        next(e);
    }
});

//delete a single task
router.delete('/:id', async (req, res, next) => {
    try {
        await prisma.task.delete({
            where: {id: req.params.id}
        })
        res.status(204).end()
    } catch (e) {
        next(e)
    }
})

// delete all




export default router