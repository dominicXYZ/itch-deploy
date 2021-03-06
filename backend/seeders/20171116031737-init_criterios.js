'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('criterios', [
      // ANEXO XXIX
      {
        descripcion: 'Asiste puntualmente con el horario establecido',
        valor_max: 5,
        tipo: 'asesor_externo',
        anexo: 'XXIX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Trabajo en equipo y se comunica de forma efectiva (oral y escrita)',
        valor_max: 10,
        tipo: 'asesor_externo',
        anexo: 'XXIX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Tiene iniciativa para colaborar',
        valor_max: 5,
        tipo: 'asesor_externo',
        anexo: 'XXIX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Propone mejoras al proyecto',
        valor_max: 10,
        tipo: 'asesor_externo',
        anexo: 'XXIX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Cumple con los objetivos correspondientes al proyecto',
        valor_max: 15,
        tipo: 'asesor_externo',
        anexo: 'XXIX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Es ordenado y cumple satisfactoriamente con las actividades encomendadas en los tiempos establecidos del cronograma',
        valor_max: 15,
        tipo: 'asesor_externo',
        anexo: 'XXIX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Demuestra liderezgo en su actuar',
        valor_max: 10,
        tipo: 'asesor_externo',
        anexo: 'XXIX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Demuestra conocimiento en el ??rea de su especialidad',
        valor_max: 20,
        anexo: 'XXIX',
        tipo: 'asesor_externo',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Demuestra su comportamiento ??tico (es diciplinado, acata ??rdenes, respeta a sus compa??eros de trabajo, entre otros)',
        valor_max: 10,
        tipo: 'asesor_externo',
        anexo: 'XXIX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Asisti?? puntualmente a las reuniones de asesor??a ',
        valor_max: 10,
        tipo: 'asesor_interno',
        anexo: 'XXIX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Demuestra conocimiento en el ??rea de su especialidad',
        valor_max: 20,
        tipo: 'asesor_interno',
        anexo: 'XXIX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Trabaja en equipo y se comunica de forma efectiva (oral y escrita)',
        valor_max: 15,
        tipo: 'asesor_interno',
        anexo: 'XXIX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Es dedicado y proactivo en las actividades encomendadas',
        valor_max: 20,
        tipo: 'asesor_interno',
        anexo: 'XXIX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Es ordenado y cumple satisfactoriamente con las actividades encomendadas en los tiempos establecidos en el cronograma',
        valor_max: 20,
        tipo: 'asesor_interno',
        anexo: 'XXIX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Propone mejoras al proyecto',
        valor_max: 15,
        tipo: 'asesor_interno',
        anexo: 'XXIX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      // ANEXO XXX
      {
        descripcion: 'Portada',
        valor_max: 2,
        tipo: 'asesor_externo',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Agradecimientos',
        valor_max: 2,
        tipo: 'asesor_externo',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Resumen',
        valor_max: 2,
        tipo: 'asesor_externo',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Indice',
        valor_max: 2,
        tipo: 'asesor_externo',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Introducci??n',
        valor_max: 2,
        tipo: 'asesor_externo',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Problemas al resolver, prioriz??ndolos',
        valor_max: 5,
        tipo: 'asesor_externo',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Objetivos',
        valor_max: 5,
        tipo: 'asesor_externo',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Justificaci??n',
        valor_max: 0,
        tipo: 'asesor_externo',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Marco te??rico (fundamentos te??ricos)',
        valor_max: 10,
        tipo: 'asesor_externo',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Procedimiento y descripci??n de las actividades realizadas',
        valor_max: 5,
        tipo: 'asesor_externo',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Resultados, planos, gr??ficas, prototipos, manuales, programas, an??lisis estad??sticos, modelos matem??ticos, simulaciones, normativas, regulaciones, y restricciones, entre otros. Solo para proyectos que por su naturaleza lo requieran: estudio de mercado, estudio t??cnico y estudio economico.**',
        valor_max: 45,
        tipo: 'asesor_externo',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Conclusiones, recomendaciones y experiencia profesional adquirida',
        valor_max: 15,
        tipo: 'asesor_externo',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Competencias desarrolladas y/o aplicadas',
        valor_max: 3,
        tipo: 'asesor_externo',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Fuentes de informaci??n',
        valor_max: 2,
        tipo: 'asesor_externo',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      // QUEDAN PENDIENTES LOS DEL ASESOR INTERNO
      {
        descripcion: 'Portada',
        valor_max: 2,
        tipo: 'asesor_interno',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Agradecimientos',
        valor_max: 2,
        tipo: 'asesor_interno',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Resumen',
        valor_max: 2,
        tipo: 'asesor_interno',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Indice',
        valor_max: 2,
        tipo: 'asesor_interno',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Introducci??n',
        valor_max: 2,
        tipo: 'asesor_interno',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Problemas al resolver, prioriz??ndolos',
        valor_max: 5,
        tipo: 'asesor_interno',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Objetivos',
        valor_max: 5,
        tipo: 'asesor_interno',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Justificaci??n',
        valor_max: 0,
        tipo: 'asesor_interno',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Marco te??rico (fundamentos te??ricos)',
        valor_max: 10,
        tipo: 'asesor_interno',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Procedimiento y descripci??n de las actividades realizadas',
        valor_max: 5,
        tipo: 'asesor_interno',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Resultados, planos, gr??ficas, prototipos, manuales, programas, an??lisis estad??sticos, modelos matem??ticos, simulaciones, normativas, regulaciones, y restricciones, entre otros. Solo para proyectos que por su naturaleza lo requieran: estudio de mercado, estudio t??cnico y estudio economico.**',
        valor_max: 45,
        tipo: 'asesor_interno',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Conclusiones, recomendaciones y experiencia profesional adquirida',
        valor_max: 15,
        tipo: 'asesor_interno',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Competencias desarrolladas y/o aplicadas',
        valor_max: 3,
        tipo: 'asesor_interno',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Fuentes de informaci??n',
        valor_max: 2,
        tipo: 'asesor_interno',
        anexo: 'XXX',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      // ANEXO III
      {
        descripcion: 'Asiste puntualmente con el horario establecido',
        valor_max: 5,
        anexo: 'III',
        tipo: 'asesor_externo',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Trabajo en equipo',
        valor_max: 10,
        anexo: 'III',
        tipo: 'asesor_externo',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Tiene iniciativa para ayudar en las actividades encomendadas',
        valor_max: 10,
        anexo: 'III',
        tipo: 'asesor_externo',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Organiza su tiempo y trabaja sin necesidad de una superaci??n estrecha',
        valor_max: 5,
        anexo: 'III',
        tipo: 'asesor_externo',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Realiza mejoras al proyecto',
        valor_max: 10,
        anexo: 'III',
        tipo: 'asesor_externo',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Cumple con los objetivos correspondientes al proyecto',
        valor_max: 10,
        anexo: 'III',
        tipo: 'asesor_externo',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      
      {
        descripcion: 'Mostr?? responsabilidad y compromiso en la residencia profesional',
        valor_max: 5,
        anexo: 'III',
        tipo: 'asesor_interno',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Realiz?? un trabajo innovador en su ??rea de desempe??o',
        valor_max: 10,
        anexo: 'III',
        tipo: 'asesor_interno',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Aplica las competencias para la realizaci??n del proyecto',
        valor_max: 10,
        anexo: 'III',
        tipo: 'asesor_interno',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Es dedicado y proactivo en los trabajos encomendados',
        valor_max: 10,
        anexo: 'III',
        tipo: 'asesor_interno',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Cumple con los objetivos correspondiente al proyecto',
        valor_max: 10,
        anexo: 'III',
        tipo: 'asesor_interno',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        descripcion: 'Entrega en tiempo y forma el informe t??cnico',
        valor_max: 5,
        anexo: 'III',
        tipo: 'asesor_interno',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
