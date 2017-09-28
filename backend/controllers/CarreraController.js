const Carrera = require('../models').Carrera;
const Sequelize = require('../models').Sequelize;
const sequelize = require('../models').sequelize;
const docente_carreras = require('../models').docente_carreras;
const Periodo = require('../models').Periodo

module.exports.findById = (req, res) => {
    Carrera.findOne({
        where: {id: req.params.id},
        include: [{model: Periodo, as: 'periodos', attributes: ['id', 'periodo', 'ciclo', 'fecha_inicio', 'fecha_fin', 'fecha_inicio_entrega_anteproyecto', 'fecha_fin_entrega_anteproyecto', 'id_carrera'] } ] })
        .then((carrera) => {
            res.status(200).json(carrera);
        }).catch(err => {
            console.log(err)
            res.status(406).json({err: err})
        })
}
module.exports.addPeriodo = (req, res) => {
    const id_carrera = req.body.id_carrera,
            periodo = req.body.periodo_residencia,
            ciclo = req.body.ciclo,
            fecha_inicio = req.body.fechas_periodo[0],
            fecha_fin = req.body.fechas_periodo[1],
            fecha_inicio_entrega_anteproyecto = req.body.fechas_entrega_anteproyecto[0],
            fecha_fin_entrega_anteproyecto = req.body.fechas_entrega_anteproyecto[1];
    
    Periodo.create({
        periodo,
        ciclo,
        fecha_inicio, fecha_fin,
        fecha_inicio_entrega_anteproyecto, fecha_fin_entrega_anteproyecto,
        id_carrera
    }).then((periodo_added)=>{
        res.status(200).json(periodo_added);
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        console.log(err)
        res.status(406).json({err: err})
    }) 
}

module.exports.docentesAsignados = (req, res) => {
    const id_carrera = req.params.id_carrera
    docente_carreras.findAll({where: {id_carrera: id_carrera }})
        .then(docentes_asignados => {
            // console.log(docentes_asignados)
            res.status(200).json(docentes_asignados);
        }).catch(err => {
            res.status(406).json({err: err});
        });
}

module.exports.asignarEncargados = (req, res) => {
    console.log(req.body);
    const id_carrera = req.body.id_carrera,
        id_jefe_proyecto = req.body.id_jefe_proyecto,
        id_presidente_academia = req.body.id_presidente_academia;
        
    filterUpdate = {
        id_carrera: id_carrera,
        $or: [
            {rol: 'presidente_academia'},
            {rol: 'jefe_proyecto'}
        ]
    }
    // insertamos o actualizamos al presidente de academia
    sequelize.transaction((t) => {
        return docente_carreras.update({rol: 'deshabilitado'}, {where: filterUpdate}, {transaction: t})
            .then(presidente_updated => {
                return docente_carreras.upsert({
                    id_docente: id_presidente_academia,
                    id_carrera: id_carrera,
                    rol: 'presidente_academia'
                }, {transaction: t}).then(() => {
                    // insertamos o actualizamos al jefe de departamento
                    if(id_jefe_proyecto){
                        console.log('aqui')
                        return docente_carreras.upsert({
                            id_docente: id_jefe_proyecto,
                            id_carrera: id_carrera,
                            rol: 'jefe_proyecto'
                        }, {transaction: t})  
                    }else{
                        return sequelize.Promise.resolve();
                    }
                })
            })
    }).then((docente_carreras)=>{
        res.status(200).json(docente_carreras);
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        console.log(err)
        res.status(406).json({err: err})
    }) 

}
module.exports.asignarDocentes = (req, res) => {
    const id_carrera = req.body.id_carrera,
        array_docentes = req.body.array_docentes;
        console.log(array_docentes)
        console.log(id_carrera)
    sequelize.transaction((t) => {
        return docente_carreras.update({rol: 'deshabilitado'}, {where: {id_carrera, rol:'docente'}}, {transaction: t})
            .then(updated_docentes => {
                return sequelize.Promise.map(array_docentes, (docente) => {
                    return docente_carreras.upsert({
                        id_docente: docente.id,
                        id_carrera: id_carrera,
                        rol: 'docente'
                    },  {transaction: t});        
                })
            })
    }).then((docentes)=>{
        res.status(200).json(docentes);
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        console.log(err)
        res.status(406).json({err: err})
    }) 
}
module.exports.add = (req, res) => {
    const nombre = req.body.nombre,
        id_departamento = req.body.id_departamento;
    Carrera.create({
        nombre,
        id_departamento
    }).then((carrera)=>{
        res.status(200).json(carrera)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        res.status(406).json({err: err})
    })  
}