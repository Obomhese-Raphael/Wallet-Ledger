/**
 * @openapi
 * tags:
 *   - name: Wallet
 *     description: Wallet management endpoints
 */

/**
 * @openapi
 * /wallet:
 *   get:
 *     summary: Get authenticated user's wallet
 *     tags:
 *       - Wallet
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Wallet retrieved successfully
 *               data:
 *                 _id: "689123456789abcdef123456"
 *                 userId: "689123456789abcdef123455"
 *                 currency: "NGN"
 *                 createdAt: "2026-07-23T10:30:00.000Z"
 *                 updatedAt: "2026-07-23T10:30:00.000Z"
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /wallet/balance:
 *   get:
 *     summary: Get wallet balance
 *     tags:
 *       - Wallet
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet balance retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Wallet balance retrieved successfully
 *               data: 9500
 *       401:
 *         description: Unauthorized
 */

export {};
