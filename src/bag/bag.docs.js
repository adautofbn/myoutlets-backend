/**
 * @swagger
 *
 * definitions:
 *  ProdutoById:
 *      type: object
 *      properties:
 *          id:
 *              type: integer
 *              format: int32
 *              example: 1
 *          quant:
 *              type: integer
 *              format: int32
 *              example: 1
 *      required:
 *          - id
 *
 * /bolsa:
 *   get:
 *     tags:
 *      - Bolsa
 *     summary: Todos os produtos na bolsa
 *     description: Retorna um array de JSON com todos os produtos na bolsa
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Array com todos os produtos
 *         schema:
 *              type: array
 *              items:
 *                  $ref: '#/definitions/Produto'
 *
 *   post:
 *     tags:
 *      - Bolsa
 *     summary: Adiciona um produto na bolsa
 *     description: Retorna uma mensagem confirmando que o produto foi adicionado
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: Produto
 *        in: body
 *        description: Produto do estoque que deve ser adicionado na bolsa
 *        required: true
 *        schema:
 *          $ref: '#/definitions/ProdutoById'
 *     responses:
 *       200:
 *         description: Produto adicionado com sucesso
 *
 *   delete:
 *     tags:
 *      - Bolsa
 *     summary: Exclui um produto da bolsa
 *     description: Retorna uma mensagem confirmando que o produto foi excluído
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: ID do Produto
 *        description: Id do produto que vai ser excluído
 *        type: object
 *        properties:
 *              id:
 *                  type: integer
 *                  format: int32
 *                  example: 1
 *     responses:
 *        200:
 *          description: Produto excluído da bolsa
 */