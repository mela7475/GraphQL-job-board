import express from 'express';
const router = express.Router();
//const logger = require("./winston")


/**
* @swagger
* /healthz:
*   get:
*     summary: Returns the health of the application
*     description: This endpoint will convey whether the application is up and running for any liveness probe purposes
*     tags:
*       - Health and Readiness
*     responses:
*       200:
*         description: Application is up and running.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   description: This value indicates the application is up.
*                   example: UP
*       500:
*         description: Application is not running.
*/
router.get("/healthz", (req, res) => {
	res.json({ status: "UP" })
	res.status(200)
})

/**
* @swagger
* /readyz:
*   get:
*     summary: Returns the readiness of the application
*     description: This endpoint will convey whether the components required for the application are all up and running for any readiness probe purposes
*     tags:
*       - Health and Readiness
*     responses:
*       200:
*         description: Everything is good.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 ready:
*                   type: boolean
*                   description: This value indicates that everything is good.
*                   example: true
*       500:
*         description: Something is wrong
*/
router.get("/readyz", async (req, res) => {
	try {
		res.status(200)
		res.json({
			"ready": true
		})
	} catch (error) {
		logger.error(`Error in /readyz, ${error}`)
		res.status(500)
		res.json({
			"ready": false
		})
	}
})

export default router