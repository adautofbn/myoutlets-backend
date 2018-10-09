/**
 * @swagger
 *
 * definitions:
 *  Credenciais:
 *      type: object
 *      properties:
 *          email:
 *              type: string
 *              example: any@any.any
 *          password:
 *              type: string
 *              example: senha123
 *      required:
 *          - email
 *          - password
 *
 * /login:
 *
 *   post:
 *     tags:
 *      - Login
 *     summary: Faz login no My Outlet's
 *     description: Retorna uma mensagem confirmando que o usuário logou com sucesso
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: Credenciais
 *        in: body
 *        description: Email e senha de um usuário cadastrado
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Credenciais'
 *     responses:
 *       200:
 *         description: Login efetuado com sucesso
 *
 *   delete:
 *     tags:
 *      - Login
 *     summary: Faz logout no My Outlet's
 *     description: Retorna uma mensagem confirmando que o usuário deslogou com sucesso
 *     produces:
 *      - application/json
 *     responses:
 *        200:
 *          description: Usuário deslogado com uscesso
 *
 *
 * /login/check:
 *   get:
 *     tags:
 *      - Login
 *     summary: Checa o usuário que está logado
 *     description: Retorna informações sobre o usuário logado e seu status
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Usuário logado no momento
 */