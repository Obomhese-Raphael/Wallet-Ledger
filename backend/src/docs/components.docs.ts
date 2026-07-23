/**
 * @openapi
 * components:
 *   schemas:
 *
 *     DepositRequest:
 *       type: object
 *       required:
 *         - amount
 *       properties:
 *         amount:
 *           type: number
 *           example: 5000
 *
 *     WithdrawRequest:
 *       type: object
 *       required:
 *         - amount
 *       properties:
 *         amount:
 *           type: number
 *           example: 2500
 *
 *     TransferRequest:
 *       type: object
 *       required:
 *         - recipientEmail
 *         - amount
 *       properties:
 *         recipientEmail:
 *           type: string
 *           example: james@example.com
 *         amount:
 *           type: number
 *           example: 5000
 */

export {};
