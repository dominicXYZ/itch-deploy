import React, {Component} from 'react';

import {Select, Row, Col} from 'antd';
const {Option} = Select

import axios from 'axios';

// Components
import Proyecto from '../components/Proyecto.jsx'

export default class ProyectosDeResidencia extends Component{
    constructor(props){
        super(props);
        this.state = {
            proyectos: props.proyectos,
            usuario: props.usuario,
            renderProyecto: null
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            proyectos: nextProps.proyectos,
            usuario: props.usuario,
            renderProyecto: null
        })
    }

    onChangeResidente = (id_alumno) => {
        axios.get(`/api/alumno/${id_alumno}/proyecto`)
            .then((res) => {
                if(res.status === 200){
                    // console.warn('proyecto', res.data)
                    this.setState({
                        renderProyecto:(<Proyecto proyecto={res.data} usuario={this.state.usuario}/>)
                    })
                }
            })
    }
    
    render(){
        const {proyectos, renderProyecto} = this.state
        // console.warn(')>', proye)
        return (
            <Row>
                <Col xs={24} lg={24}>
                    <Select 
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        placeholder="Seleccione al residente"
                        onChange={this.onChangeResidente}
                        style={{width: 400}}
                    >
                        {proyectos.map((proyecto, index) => {
                            return (
                                <Option key={index} value={`${proyecto.anteproyecto.alumno.id}`}>{`${proyecto.anteproyecto.alumno.no_control} - ${proyecto.anteproyecto.alumno.nombre} ${proyecto.anteproyecto.alumno.ap_paterno} ${proyecto.anteproyecto.alumno.ap_materno}`}</Option>
                            )
                        })}
                    </Select>
                </Col>
                <Col xs={24} lg={24} style={{marginTop: 25}}>
                    {renderProyecto}
                </Col>
            </Row>
        )
    }
}