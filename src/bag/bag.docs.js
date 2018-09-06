/**
 * @swagger
 *
 * definitions:
 *  productById:
 *      type: application/json
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
 *      - name: product
 *        in: body
 *        description: Novo produto
 *        required: true
 *        schema:
 *          $ref: '#/definitions/productById'
 *     responses:
 *       200:
 *         description: Produto adicionado com sucesso
 *
 *   delete:
 *     tags:
 *      - Bolsa
 *     summary: Exclui um produto da bolsa
 *     description: Retorna uma mensagem confirmando que o produto foi excluído
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: query
 *        name: id
 *        type: integer
 *        description: Id do produto que vai ser excluído
 *     responses:
 *        200:
 *          description: Produto excluído
 */