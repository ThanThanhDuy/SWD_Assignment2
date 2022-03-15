const database = require('../database/index')
const { DataTypes, Model } = require('sequelize')

class Job extends Model {}

Job.init(
  {
    idCongViec: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    tenCongViec: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    tenCongTy: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    mucLuong: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    mucLuongMin: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    mucLuongMax: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    hinhThucLamViec: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    gioiTinh: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    capBac: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    kinhNghiem: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    diaDiemLamViec: {
      type: DataTypes.STRING(6000),
      allowNull: false
    },
    urlImgCompany: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    addressCompany: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    nganhNghe: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    web: {
      type: DataTypes.STRING,
      allowNull: false
    },
    keywordSearch: {
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
