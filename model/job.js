const database = require('../database/index')
const { DataTypes, Model } = require('sequelize')

class Job extends Model {}

Job.init(
  {
    id_job: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name_job: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    name_company: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    salary: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    salary_min: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    salary_max: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    working_methods: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    level: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    experience: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    address_working: {
      type: DataTypes.STRING(6000),
      allowNull: false
    },
    url_img_company: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    address_company: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    career: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    web: {
      type: DataTypes.STRING,
      allowNull: false
    },
    keyword_search: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: database,
    modelName: 'Job',
    timestamps: false,
    freezeTableName: true
  }
)
module.exports = Job
