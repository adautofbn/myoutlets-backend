/**
 * @swagger
 *
 * definitions:
 *  Produto:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *              example: nome
 *          quant:
 *              type: integer
 *              format: int32
 *              example: 1
 *          type:
 *              type: string
 *              example: camisa
 *
 * /produto:
 *   get:
 *     tags:
 *      - Produtos
 *     summary: Todos os produtos em estoque
 *     description: Retorna um array de JSON com todos os produtos em estoque
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: query
 *        name: type
 *        type: string
 *        description: Filtro de tipos de produtos do estoque
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
 *      - Produtos
 *     summary: Adiciona um produto ao estoque
 *     description: Retorna uma mensagem confirmando que o produto foi adicionado
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: Novo Produto
 *        in: body
 *        description: Propriedades do novo produto
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Produto'
 *     responses:
 *       200:
 *         description: Produto adicionado com sucesso
 *
 * /produto/{id}:
 *  get:
 *      tags:
 *          - Produtos
 *      summary: Um dos produtos em estoque
 *      description: Retorna um dos produtos em estoque
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: Numero do produto dentro do estoque
 *      responses:
 *          200:
 *              description: Produto em estoque
 *              schema:
 *                  $ref: '#/definitions/Produto'
 *
 *  put:
 *      tags:
 *          - Produtos
 *      summary: Atualizar produto em estoque
 *      description: Retorna uma mensagem confirmando a atualização do produto
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: Numero do produto dentro do estoque
 *          - name: Update
 *            in: body
 *            description: Valores a serem atualizados
 *            schema:
 *              $ref: '#/definitions/Produto'
 *      responses:
 *          200:
 *              description: Produto atualizado
 *
 *  delete:
 *      tags:
 *          - Produtos
 *      summary: Excluir produto do estoque
 *      description: Retorna uma mensagem confirmando a exclusão do produto
 *      produces:
 *          - string
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: Numero do produto dentro do estoque
 *      responses:
 *          200:
 *              description: Produto excluído
 */