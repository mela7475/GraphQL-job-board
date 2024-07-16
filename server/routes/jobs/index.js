import express from 'express';
const router = express.Router();
import controller from '../../db/jobs';

/**
@swagger
* /api/jobs/{id}:
*   get:
*     summary: Returns a specific job
*     description: This endpoint will return a job based on the id
*     tags:
*       - Job
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the company
*         example: f3YzmnBZpK0o
*     responses:
*       200:
*         description: company info
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 job:
*                   type: object
*                   properties:
*                     Id:
*                       type: integer
*                       description: The job ID.
*                       example: f3YzmnBZpK0o
*                     date:
*                       type: string
*                       description: Date the job was posted.
*                       example: 2023-01-26
*                     title:
*                       type: string
*                       description: Name of the job.
*                       example: Frontend Developer
*                     description:
*                       type: string
*                       description: The description of the job.
*                       example: We are looking for a Frontend Developer familiar with React..
*       400:
*         description: Bad request. Please check API documentation
*       500:
*         description: Failure Response
*/
router.get("/jobs", auth.IsAdmin, controller.getJob)