import express from 'express';
const router = express.Router();
import controller from '../../db/companies';

/**
@swagger
* /api/compaines/{id}:
*   get:
*     summary: Returns a specific customer
*     description: This endpoint will return a company based on the id
*     tags:
*       - Company
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the company
*         example: FjcJCHJALA4i
*     responses:
*       200:
*         description: company info
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 company:
*                   type: object
*                   properties:
*                     Id:
*                       type: integer
*                       description: The company ID.
*                       example: FjcJCHJALA4i
*                     name:
*                       type: string
*                       description: Name of the company.
*                       example: Facegle
*                     description:
*                       type: string
*                       description: The description of the company.
*                       example: We are a startup on a mission to disrupt social search engines. Think Facebook meet Google.
*       400:
*         description: Bad request. Please check API documentation
*       500:
*         description: Failure Response
*/
router.get("/company", auth.IsAdmin, controller.getCompany)