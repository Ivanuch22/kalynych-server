const sequelize = require("../db/db");

const { DataTypes } = require("sequelize");


const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  avatar: { type: DataTypes.STRING },
  full_name: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
  state: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  zip_code: { type: DataTypes.STRING },
  secret_question: { type: DataTypes.STRING },
  secret_answer: { type: DataTypes.STRING },
  alternate_email: { type: DataTypes.STRING },
  alternate_phone: { type: DataTypes.STRING },
  current_role: { type: DataTypes.STRING, defaultValue: "LEARNER" },
  learner_for_in_key: {
    type: DataTypes.BOOLEAN,
  },
  expert_for_in_key: {
    type: DataTypes.BOOLEAN,
  },
});

const Learner = sequelize.define('learner', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  purpose: { type: DataTypes.STRING, },
  topics: { type: DataTypes.ARRAY(DataTypes.STRING), },
  way_for_learning: { type: DataTypes.ARRAY(DataTypes.STRING) },
  goals: { type: DataTypes.ARRAY(DataTypes.STRING) },
});
const Expert = sequelize.define("expert", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  field: { type: DataTypes.STRING },
  category: { type: DataTypes.ARRAY(DataTypes.STRING) },
  bio: { type: DataTypes.STRING },
  link_of_media: { type: DataTypes.STRING },
  aditional_service: { type: DataTypes.STRING },
  meetings: { type: DataTypes.BOOLEAN, defaultValue: false },
  workshops: { type: DataTypes.BOOLEAN, defaultValue: false },
});
const Token = sequelize.define("token", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER }, 
  refreshToken: { type: DataTypes.STRING }
})
const Colection  = sequelize.define("colection",{
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  access: { type: DataTypes.STRING },
  add_to: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },

})

User.hasOne(Learner);
User.hasOne(Expert);

Learner.belongsTo(User);
Expert.belongsTo(User);


module.exports = {
  User,
  Learner,
  Expert,
  Token
};
