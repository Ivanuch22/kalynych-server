/**
 * @swagger
 * tags:
 *   name: Expert
 *   description: Operations related to Expert management
 */

/**
 * @swagger
 * /api/expert/create:
 *   post:
 *     summary: Create expert profile
 *     tags: [Expert]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *               category:
 *                 type: string
 *               bio:
 *                 type: string
 *               link_of_media:
 *                 type: string
 *               aditional_service:
 *                 type: string
 *               meetings:
 *                 type: string
 *               workshops:
 *                 type: string
 *     responses:
 *       200:
 *         description: Expert profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 expert:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       description: User ID
 *                     field:
 *                       type: string
 *                       description: Expert's field
 *                     category:
 *                       type: string
 *                       description: Expert's category
 *                     bio:
 *                       type: string
 *                       description: Expert's biography
 *                     link_of_media:
 *                       type: string
 *                       description: Link to media
 *                     aditional_service:
 *                       type: string
 *                       description: Additional service
 *                     meetings:
 *                       type: string
 *                       description: Expert's meetings
 *                     workshops:
 *                       type: string
 *                       description: Expert's workshops
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       400:
 *         description: User not defined or expert already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 error:
 *                   type: string
 *                   example: User not defined or expert already exists
 */

/**
 * @swagger
 * /api/learner/create:
 *   post:
 *     summary: Create learner profile
 *     tags: [Learner]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               purpose:
 *                 type: string
 *               topics:
 *                 type: string
 *               way_for_learning:
 *                 type: string
 *               goals:
 *                 type: string
 *     responses:
 *       200:
 *         description: Learner profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 learner:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       description: User ID
 *                     purpose:
 *                       type: string
 *                       description: Learner's purpose
 *                     topics:
 *                       type: string
 *                       description: Learner's topics
 *                     way_for_learning:
 *                       type: string
 *                       description: Way for learning
 *                     goals:
 *                       type: string
 *                       description: Learner's goals
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       400:
 *         description: Learner or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 error:
 *                   type: string
 *                   example: Learner or user already exists
 */

/**
 * @swagger
 * /api/learners/update:
 *   post:
 *     summary: Update learner profile
 *     tags: [Learner]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               purpose:
 *                 type: string
 *               way_for_learning:
 *                 type: string
 *               goals:
 *                 type: string
 *               topics:
 *                 type: string
 *     responses:
 *       200:
 *         description: Learner profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Learner profile updated successfully
 *                 learner:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       description: User ID
 *                     purpose:
 *                       type: string
 *                       description: Learner's purpose
 *                     way_for_learning:
 *                       type: string
 *                       description: Way for learning
 *                     goals:
 *                       type: string
 *                       description: Learner's goals
 *                     topics:
 *                       type: string
 *                       description: Learner's topics
 *       400:
 *         description: No fields to update or incorrect current_role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 error:
 *                   type: string
 *                   example: No fields to update or incorrect current_role
 */











/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operations related to user management
 */

/**
 * @swagger
 * /api/users/registration:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               full_name:
 *                 type: string
 *               country:
 *                 type: string
 *               isSendMessage:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Successfully registered user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 token:
 *                   type: string
 *                 userId:
 *                   type: string
 *       400:
 *         description: Incorrect email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 error:
 *                   type: string
 *                   example: Incorrect email or password
 */

/**
 * @swagger
 * /api/users/update:
 *   post:
 *     summary: Update user information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               is_verified:
 *                 type: boolean
 *               full_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               country:
 *                 type: string
 *               state:
 *                 type: string
 *               city:
 *                 type: string
 *               zip_code:
 *                 type: string
 *               secret_question:
 *                 type: string
 *               secret_answer:
 *                 type: string
 *               alternate_email:
 *                 type: string
 *               alternate_phone:
 *                 type: string
 *               current_role:
 *                 type: string
 *                 enum: [LEARNER, EXPERT]
 *               img:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully updated user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: User ID
 *                     email:
 *                       type: string
 *                       description: User email
 *                     current_role:
 *                       type: string
 *                       enum: [LEARNER, EXPERT]
 *       400:
 *         description: Incorrect user data or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 error:
 *                   type: string
 *                   example: Incorrect user data or user not found
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: User not found or incorrect password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 error:
 *                   type: string
 *                   example: User not found or incorrect password
 */

/**
 * @swagger
 * /api/users/forgot-password:
 *   post:
 *     summary: Forgot password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset email sent successfully
 *       400:
 *         description: User not found or bad email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 error:
 *                   type: string
 *                   example: User not found or bad email
 */

/**
 * @swagger
 * /api/users/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset successfully
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 */

/**
 * @swagger
 * /api/users/send-verification:
 *   post:
 *     summary: send email verification
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message send
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Message send
 *       400:
 *         description: Bad email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 error:
 *                   type: string
 *                   example: Bad email
 */



/**
 * @swagger
 * /api/users/verify/{userid}:
 *   get:
 *     summary: Verify email
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Email is verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Email is verified
 *       400:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 error:
 *                   type: string
 *                   example: Not found
 */

/**
 * @swagger
 * /api/users/auth:
 *   get:
 *     summary: Check user authentication
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: User ID
 *                     email:
 *                       type: string
 *                       description: User email
 *                     current_role:
 *                       type: string
 *                       enum: [LEARNER, EXPERT]
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 401
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 */



/**
 * @swagger
 * /api/users/refresh:
 *   post:
 *     summary: Refresh access and refresh tokens
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token obtained during login
 *     responses:
 *       200:
 *         description: Tokens refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 tokens:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: Newly generated access token
 *                     refreshToken:
 *                       type: string
 *                       description: Newly generated refresh token
 *       401:
 *         description: Refresh token is required or invalid refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 401
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 error:
 *                   type: string
 *                   description: Internal Server Error message
 */

/**
 * @swagger
 * /api/users/update-email:
 *   post:
 *     summary: Update user email
 *     description: Update user email address. Requires authentication via JWT token.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *             description: New email address
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Email updated successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               tokens: { access_token: "your_access_token", refresh_token: "your_refresh_token" }
 *               message: Email is changed
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: User with this email already exists or User not found
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: Unauthorized, invalid or expired token
 */
