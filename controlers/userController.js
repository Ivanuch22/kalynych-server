const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const AWS = require("aws-sdk");

const generateJWT = require("../helpers/generateJWT")
const { send } = require('../services/emailService');
const { User, Learner, Expert, Token } = require("../models/models");
const ApiError = require("../error/AppiError");

const S3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_S3,
  secretAccessKey: process.env.SECRET_ACCESS_S3,
});

const sendVerification = async (email, id) => {
  let verificationLink = `${process.env.PUBLIC_URL}:5500/api/users/verify/${id}`;
  await send(email, 'Verify Email', `<p>Click <a href=${verificationLink}>here</a> to Verify your Email.</p>`);
}

class UserController {
  async registration(req, res, next) {
    let { email, password, full_name, country, isSendMessage, current_role } = req.body;

    if (!email || !password) return next(ApiError.badRequest("Incorrect email or password"));

    if (current_role == null) {
      current_role = "LEARNER";
    }

    const candidate = await User.findOne({ where: { email } });

    if (candidate) return next(ApiError.userAlreadyAxist("A user with this email already exists"));

    try {
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        email,
        full_name,
        country,
        current_role,
        isSendMessage,
        password: hashPassword
      });
      const token = generateJWT.tokens(user.id, user.email, current_role);
      await generateJWT.saveRefreshToken(user.id, token.refresh);
      try {
        sendVerification(email, user.id);
      } catch {
        console.log("emailer is not working")
      }
      return res.json({ status: 200, token, userId: user.id });

    } catch (e) {
      return next(ApiError.badRequest(`Incorrect email or password ${e}`));
    }
  }

  async authentification(req, res, next) {
    const { userid } = req.params;

    const user = await User.findOne({ where: { id: userid, } });
    if (!user) return next(ApiError.badRequest("Not found"));

    await user.update({ is_verified: true });
    return res.json({ status: 200, message: "email is verified" })


  }
  async sendVerificatoin(req, res, next) {
    const { email } = req.body;
    const candidate = await User.findOne({ where: { email } });

    if (!candidate) return next(ApiError.badRequest("Bad email"));

    sendVerification(email, candidate.id);
    return res.json({ status: 200, message: "Message send" });


  }
  async updateEmail(req, res, next) {
    const { email } = req.body;
    const { id } = req.user;
    const candidate = await User.findOne({ where: { email } });

    if (candidate) return next(ApiError.badRequest("User with this email aready exist"));
    if (!id) return next(ApiError.badRequest("User not found"));

    const user = await User.findOne({ where: { id } })

    await user.update({ email: email });

    sendVerification(email, user.id);

    const tokens = generateJWT.tokens(user.id, user.email, user.current_role);
    return res.json({ status: 200, tokens, message: "email is changed" })


  }
  async update(req, res, next) {
    const {
      email,
      password,
      is_verified,
      full_name,
      phone,
      country,
      state,
      city,
      zip_code,
      secret_question,
      secret_answer,
      alternate_email,
      alternate_phone,
      current_role
    } = req.body;
    const files = req.files;
    const { id } = req.user;



    if (!id) return next(ApiError.badRequest("Need id for update user"));

    const user = await User.findOne({ where: { id } });
    if (!user) return next(ApiError.badRequest("User is not found"));

    let afterUpdateUser;

    const img = files !== null && files !== undefined ? files.img : undefined;
    let avatarName = uuid.v4() + ".jpg";
    let fileUrl;
    try {
      if (!img) {
        console.log("user not add avatar");
      } else {
        console.log(req.files);
        const uploadParams = {
          Body: img.data,
          Bucket: process.env.BUCKET_NAME,
          Key: avatarName,
          ContentType: "image/jpeg",
          ACL: "public-read",
        };

        const uploadResult = await S3.upload(uploadParams).promise();
        console.log("File uploaded to S3:", uploadResult);
        fileUrl = uploadResult.Location;
      }
    } catch (e) {
      console.error("Error uploading file to S3:", e);
      return res.json({ status: 500, error: "Internal Server Error" });
    }

    try {
      const userUpdateObject = {};
      if (fileUrl) userUpdateObject.avatar = fileUrl;
      if (current_role) userUpdateObject.current_role = current_role;
      if (email) userUpdateObject.email = email
      if (password) userUpdateObject.password = password
      if (is_verified) userUpdateObject.is_verified = is_verified
      if (full_name) userUpdateObject.full_name = full_name
      if (phone) userUpdateObject.phone = phone
      if (country) userUpdateObject.country = country
      if (state) userUpdateObject.state = state
      if (city) userUpdateObject.city = city
      if (zip_code) userUpdateObject.zip_code = zip_code
      if (secret_question) userUpdateObject.secret_question = secret_question
      if (secret_answer) userUpdateObject.secret_answer = secret_answer
      if (alternate_email) userUpdateObject.alternate_email = alternate_email
      if (alternate_phone) userUpdateObject.alternate_phone = alternate_phone
      if (Object.keys(userUpdateObject).length > 0) {
        const [rowsUpdatedUser, [userAfterUpdate]] = await User.update(
          userUpdateObject,
          { returning: true, where: { id } }
        );
        afterUpdateUser = userAfterUpdate.dataValues;
        console.log("User updated:", userAfterUpdate);
      }
    } catch (e) {
      console.log(e);
      res.json({ status: 404, error: "Error updating user data" });
    }

    const userWithoutPassword = { ...afterUpdateUser, password: undefined };
    return res.json({
      status: 200,
      user: userWithoutPassword,
    });
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return next(ApiError.badRequest("User is not found"));

    let comparePasswordd = bcrypt.compareSync(password, user.password);

    if (!comparePasswordd) return next(ApiError.badRequest("User password incorect"));

    const token = generateJWT.tokens(user.id, user.email, user.current_role);
    generateJWT.updateRefreshToken(user.id, token.refresh);

    return res.json({ token });
  }
  async forgotPassword(req, res, next) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) return next(ApiError.badRequest("User is not found"));

      const token = jwt.sign({ id: user.id, email: user.email, current_role: user.current_role }, process.env.SECRET_KEY_ACESS, { expiresIn: '1h' });

      await send(email, 'Password Reset', `<p>Click <a href="${process.env.PUBLIC_URL}:5500/${token}">here</a> to reset your password.</p>`);
      console.log('Email sent successfully');

      res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async resetPassword(req, res, next) {
    const { token, newPassword } = req.body;

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY_ACESS);

      const hashedPassword = await bcrypt.hash(newPassword, 5);

      const updatedUser = await User.update(
        { password: hashedPassword },
        { returning: true, where: { id: decodedToken.id } }
      );

      if (!updatedUser) return res.status(404).json({ error: 'User not found' });

      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) return next(ApiError.badRequest("Refresh token not found"));

      const existingToken = await Token.findOne({ where: { refreshToken } });

      if (!existingToken) return next(ApiError.badRequest("Invalid refresh token."));

      jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH, (err, user) => {
        if (err) return next(ApiError.badRequest("Invalid refresh token."));

        const tokens = generateJWT.tokens(user.id, user.email, user.current_role);
        generateJWT.updateRefreshToken(user.id, tokens.refresh);

        res.json({ status: 200, tokens });
      });

    } catch (error) {
      return next(ApiError.internal("Internal Server Error"));
    }

  }
  async check(req, res) {
    const { email, current_role } = req.user;

    let user;
    let userWithoutPassword;

    switch (current_role) {
      case "LEARNER":
        user = await User.findOne({ where: { email } });
        userWithoutPassword = { ...user, password: undefined };
        learner = await Learner.findOne({ where: { userId: user.id } });
        return res.json({ user: userWithoutPassword, learner });
      case "EXPERT":
        user = await User.findOne({ where: { email } });
        userWithoutPassword = { ...user, password: undefined };
        const expert = await Expert.findOne({ where: { userId: user.id } });
        return res.json({ user: userWithoutPassword, expert });
    }
  }
}

module.exports = new UserController();


