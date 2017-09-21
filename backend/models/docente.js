'use strict';
module.exports = (sequelize, DataTypes) => {
  var Docente = sequelize.define('Docente', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'}
      }
    },
    ap_paterno: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'}
      }
    },
    ap_materno:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'}
      }
    },
    titulo:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'}
      }
    }
  }
  );
  Docente.associate = (models) => {
    Docente.hasOne(models.Usuario, {
      foreignKey: 'id_usuario',
      onDelete: 'CASCADE'
    });
    Docente.belongsTo(models.Departamento, {
      foreignKey: 'id_departamento',
      onDelete: 'CASCADE'
    })
  }
  return Docente;
};