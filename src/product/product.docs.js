/**
 * @swagger
 * /produto:
 *   get:
 *     summary: All products in stock
 *     description: Returns a JSON array with all products posted in the stock
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of all products
 *   post:
 *     summary: Add a product to stock
 *     description: Returns a message confirming addition to the stock
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name of product
 *         required: true
 *         in: string
 *         type: string
 *       - name: quant
 *         description: Quantity in stock
 *         in: integer
 *         type: integer
 *       - name: type
 *         description: Type of product
 *         required: true
 *         in: string
 *         type: string
 *     responses:
 *       200:
 *         description: product added
 */