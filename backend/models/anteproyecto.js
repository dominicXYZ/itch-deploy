'use strict';
module.exports = (sequelize, DataTypes) => {
  var Anteproyecto = sequelize.define('Anteproyecto', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        notEmpty: {msg: 'El anteproyecto debe tener un nombre'}
      }
    },
    objetivo_general: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        notEmpty: {msg: 'El antrpoyecto debe tener un nombre'}
      }
    },
    dictamen:{
      type: DataTypes.ENUM,
      values: ['aprobado','no aprobado'],
      allowNull: false,
      defaultValue: 'no aprobado'
    },
    path_file_anteproyecto:{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    }
  });

  Anteproyecto.associate = (models) => {
    Anteproyecto.belongsTo(models.Alumno, {
      foreignKey: 'id_alumno',
      onDelete: 'CASCADE',
      as: 'alumno'
    });
    Anteproyecto.belongsTo(models.Periodo, {
      foreignKey: 'id_periodo',
      onDelete: 'CASCADE',
      as: 'periodo'
    });
    Anteproyecto.belongsTo(models.asesor_externo, {
      foreignKey: 'id_asesor_externo',
      onDelete: 'CASCADE',
      as: 'asesor_externo'
    })
  }
  return Anteproyecto;
};