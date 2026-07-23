/**
 * @openapi
 * tags:
 *   - name: Transactions
 *     description: Deposit, Withdraw, Transfer and Transaction History
 */

/**
 * @openapi
 * /transaction/deposit:
 *   post:
 *     summary: Deposit money into wallet
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DepositRequest'
 *     responses:
 *       201:
 *         description: Deposit successful
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /transaction/withdraw:
 *   post:
 *     summary: Withdraw money from wallet
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WithdrawRequest'
 *     responses:
 *       201:
 *         description: Withdrawal successful
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /transaction/transfer:
 *   post:
 *     summary: Transfer money to another user
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransferRequest'
 *     responses:
 *       201:
 *         description: Transfer successful
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /transaction:
 *   get:
 *     summary: Get transaction history
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum:
 *             - deposit
 *             - withdraw
 *             - transfer
 *
 *       - in: query
 *         name: reference
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - newest
 *             - oldest
 *
 *     responses:
 *       200:
 *         description: Transaction history retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /transaction/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 689a12b8c8fd59b8fd123456
 *     responses:
 *       200:
 *         description: Transaction retrieved successfully
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized
 */

export {};
c