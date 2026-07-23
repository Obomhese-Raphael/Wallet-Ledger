/**
 * @openapi
 * tags:
 *   - name: Health
 *     description: API health check
 */

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Check API status
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is running.
 *         content:
 *           application/json:
 *             example:
 *               status: "OK"
 */

export {};
