import React, {Component} from 'react';
import {message, Modal, Row, Col, Select, Table, Button, Input, Icon, Popconfirm, Badge} from 'antd';
const {Option, OptGroup}  = Select;

import axios from 'axios';
import moment from 'moment';
import PDF2 from 'react-pdf-js-infinite';
import uuid from 'uuid';

// components
import RevisionProyecto from './RevisionProyecto.jsx'
export default class revisionAnteproyectos extends Component{
    constructor(props){
        super(props);
        this.state = {
            usuario: props.usuario,
            carreras: props.carreras,
            renderProyecto: null,
            periodo: null,
            id_alumno: null
        }
    }
    
    handleChangePeriodo = (id_periodo) => {
        axios.get(`/api/periodo/${id_periodo}/proyectos`)
            .then(res => {
                if(res.status === 200){
                    this.setState({
                        periodo: res.data
                    })
                }
            })
    }
    handleChangeResidente = (id_alumno) => {
        const {usuario} = this.state
        axios.get(`/api/alumno/${id_alumno}/proyecto`)
            .then(res => {
                if(res.status === 200){
                    this.setState({
                        renderProyecto: (<RevisionProyecto key={uuid.v1()} updateProyecto={this.updateProyecto.bind(this)} proyecto={res.data} usuario={usuario}/>),
                        id_alumno
                    })
                }else{
                    message.warning('Ops, ocurrio un error interno, favor de reportar al administrador.')
                }
            })
    }
    updateProyecto = () => {
        const {usuario, id_alumno} = this.state
        axios.get(`/api/alumno/${id_alumno}/proyecto`)
            .then(res => {
                if(res.status === 200){
                    this.setState({
                        renderProyecto: (<RevisionProyecto key={uuid.v1()} updateProyecto={this.updateProyecto.bind(this)} proyecto={res.data} usuario={usuario}/>),
                        id_alumno
                    })
                }else{
                    message.warning('Ops, ocurrio un error interno, favor de reportar al administrador.')
                }
            })
    }

    render(){
        const {carreras, renderProyecto, periodo} = this.state
        return (
            <div>
                <Row type="flex" gutter={30}>
                    <Col xs={24} lg={6}>
                        <p>Seleccione el periodo</p>
                        <Select 
                            placeholder="Seleccione un periodo"
                            onChange={this.handleChangePeriodo}
                            style={{width: '100%'}}
                        >   
                            {carreras.map((carrera, i) => {
                                return (
                                    <OptGroup key={i} label={carrera.nombre}>
                                        {carrera.periodos.map((periodo, j) => {
                                            return (<Option key={uuid.v1()} value={`${periodo.id}`}>{`${periodo.periodo} ${periodo.ciclo}`}</Option>)
                                        })}
                                    </OptGroup>
                                )
                            })}
                        </Select>
                    </Col>
                    <Col xs={24} lg={10}>
                        <p>Seleccione un residente </p>
                        <Select
                            showSearch
                            placeholder="Seleccione un residente"
                            onChange={this.handleChangeResidente}
                            optionFilterProp="children"
                            style={{width: '100%'}}
                        >
                            {
                                periodo?
                                    periodo.anteproyectos.map((anteproyecto, i) => {
                                        return (<Option key={uuid.v1()} value={`${anteproyecto.alumno.id}`} >{` ${anteproyecto.alumno.no_control} - ${anteproyecto.alumno.nombre} ${anteproyecto.alumno.ap_paterno} ${anteproyecto.alumno.ap_materno}`}</Option>)
                                    })
                                :
                                    null
                            }
                        </Select>
                    </Col>
                </Row>
                {renderProyecto}                   
            </div>
        )
    }
}