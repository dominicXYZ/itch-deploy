import React, {Component} from 'react';
import {Card, Icon, Form, Input, Button, Row, Col, Upload, Modal, Tooltip, Table, Switch, message, Tabs, Alert, Select} from 'antd';
import axios from 'axios';
import moment from 'moment';
import uuid from 'uuid';
const { Item } = Form;
const TabPane = Tabs.TabPane;



// Components
import FormAddObservacion from '../components/FormAddObservacion.jsx';
import FormAddSolucion from '../components/FormAddSolucion.jsx';
import RevisionSeguimiento from '../components/RevisionSeguimiento.jsx'

export default class Proyecto extends Component{

    constructor(props){
        super(props);
        this.state = {
            usuario: props.usuario,
            proyecto: props.proyecto,
            visibleAddObservacion: false,
            tipo_observacion: '',
            observaciones: [],
            asesorias: [],
            seguimientos: [],
            visibleAddSolucion: false,
            id_asesoria: null,
            renderSeguimiento: null
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            usuario: nextProps.usuario,
            proyecto: nextProps.proyecto,
            visibleAddObservacion: false,
            tipo_observacion: '',
            observaciones: [],
            asesorias: [],
            visibleAddSolucion: false,
            id_asesoria: null,
            seguimientos: [],
            renderSeguimiento: null
        })
    }
    componentWillMount(){
        this.updateObservaciones();
    }
    updateObservaciones = () => {
        const {proyecto} = this.state;
        axios.get(`/api/proyecto/${proyecto.id}/observaciones`)
            .then(res => {
                
                if(res.status === 200){
                    // console.warn('=>', res.data)
                    this.setState({
                        visibleAddObservacion: false,
                        visibleAddSolucion: false,
                        observaciones: res.data
                    })
                }
            })
    }
    showAgregarObservacionPlanTrabajo = () => {
        const {proyecto} = this.state;
        this.setState({
            tipo_observacion: 'plan_de_trabajo',
            visibleAddObservacion: true,
            visibleAddSolucion: false,
        })        
    }
    showAgregarObservacionCronograma = () => {
        const {proyecto} = this.state;
        this.setState({
            tipo_observacion: 'cronograma',
            visibleAddObservacion: true,
            visibleAddSolucion: false,
        })        
    }
    onChangeObservacion = (id_observacion, solucionada) => {
        axios.put('/api/proyecto/observacion', {
            id_observacion,
            solucionada
        }).then(res => {
            if(res.status === 200){
                message.success('Los cambios se han guardado.')
            }else{
                message.error('No se han guardado los cambios, reportar error al administrador.')
            }
        })
    }
    onChangeTabSeguimiento = (key) => {
        const {seguimientos, usuario} = this.state;
        const seguimiento = seguimientos.find(seg => seg.id==key);
        const currentDate = moment().format('YYYY-MM-DD');
        if(currentDate >= seguimiento.seguimiento.fecha_inicial && currentDate <= seguimiento.seguimiento.fecha_final){
            this.setState({
                renderSeguimiento: <RevisionSeguimiento updateSeguimientos={this.updateSeguimientos.bind(this)} usuario={usuario} seguimiento={seguimiento} />
            })
        }else{
            this.setState({
                renderSeguimiento: <Alert message={`No puede acceder al seguimiento,\n Fecha inicial: ${moment(seguimiento.seguimiento.fecha_inicial, 'YYYY-MM-DD').format('LL')} - Fecha final: ${moment(seguimiento.seguimiento.fecha_final, 'YYYY-MM-DD').format('LL')}`} type="warning" showIcon />
            })
        }
    }
    onChangeTab = (key) => {
        const {proyecto} = this.state;
        if(key === "asesorias"){
            axios.get(`/api/proyecto/${proyecto.id}/asesorias`)
                .then(res => {
                    if(res.status === 200){
                        this.setState({
                            visibleAddObservacion: false,
                            visibleAddSolucion: false,
                            asesorias: res.data
                        })
                    }
                })
        }else if(key === "seguimientos"){
            
            axios.get(`/api/proyecto/${proyecto.id}/seguimientos`)
                .then( res => {
                    if(res.status === 200){
                        console.warn('a>', res.data);
                        this.setState({
                            visibleAddObservacion: false,
                            visibleAddSolucion: false,
                            seguimientos: res.data,
                        })
                    }
                })
        }
        
    }
    updateSeguimientos = () =>{
        const {proyecto} = this.state;
        axios.get(`/api/proyecto/${proyecto.id}/seguimientos`)
        .then( res => {
            if(res.status === 200){
                console.warn('a>', res.data);
                this.setState({
                    visibleAddObservacion: false,
                    visibleAddSolucion: false,
                    seguimientos: res.data,
                })
            }
        })
    }
    showAddSolucion = (id_asesoria) => {
        this.setState({
            visibleAddSolucion: true,
            id_asesoria
        })
    }
    checkSolucion = (check, id_solucion) => {
        // alert(check+'=>'+id_solucion);
        axios.put('/api/proyecto/asesoria/solucion_recomendada', {
            id_solucion,
            solucionado: check
        }).then(res => {
            if(res.status === 200){
                message.success('Se ha actualizado la solución.')
            }else{
                message.error('Surgio un error al actualizar la solución. favor de reportarlo con el administrador.')
            }
        })
    }
    checkPermitirGenerarFormato = (check, id_asesoria) => {
        axios.put('/api/proyecto/asesoria_autorizar_formato', {
            permitir_generar_formato: check,
            id_asesoria
        }).then(res => {
            if(res.status === 200){
                message.success('Se ha realizado el cambio de autorizar el formato de asesoria')
            }else{
                message.error('Surgio un error al actualizar la autorización de la asesoria, favor de reportarlo con el administrador.')
            }
        })
            
    }
    showSoluciones = (id_asesoria) => {
        axios.get(`/api/proyecto/asesoria/${id_asesoria}/soluciones_recomendadas`)
            .then(res => {
                if(res.status === 200){
                    console.warn('soluciones', res.data)
                    const columnsSolucionesRecomendadas = [
                        {
                            title: 'Solucionado',
                            dataIndex: 'solucionado',
                            key: 'solucionado',
                            render: (text, record) => (
                                <Switch defaultChecked={record.solucionado} checkedChildren="Solucionado" onChange={(e) => this.checkSolucion(e, record.id)} unCheckedChildren={<Icon type="cross" />}/>
                            )
                        },
                        {
                            title: 'Solución',
                            dataIndex: 'solucion',
                            key: 'solucion',
                        }
                    ]
                    const soluciones = res.data.map((solucion, index) => {
                        return {
                            key: index,
                            id: solucion.id,
                            solucionado: solucion.solucionado,
                            solucion: solucion.solucion
                        }
                    }
                    )
                    Modal.info({
                        width: 800,
                        title: 'Soluciones recomendadas',
                        content: (
                            <div>
                                <Table size="small" columns={columnsSolucionesRecomendadas} dataSource={soluciones} pagination={{ pageSize: 5 }}  />
                            </div>
                        ),
                        onOk(){},
                    })
                }
            })
    }
    updateTipoAsesoria =(id_asesoria, tipo) => {
        axios.put('/api/asesoria/tipo', {
            id_asesoria,
            tipo
        }).then(res => {
                if(res.status === 200){
                    message.success('El tipo de asesoria se ha actualizado satisfactoriamente!')
                }else{
                    message.error('Ops, hemos tenido un problema, favor de reportar al administrador.')
                }
            })
    }
    render(){
        const {proyecto, visibleAddObservacion, tipo_observacion, usuario, observaciones, asesorias, id_asesoria, visibleAddSolucion, seguimientos, renderSeguimiento} = this.state
        // console.warn(usuario);
        const observacionesPlanTrabajo = observaciones.filter(obs => obs.tipo==='plan_de_trabajo').map((observacion) => {
            return {
                key: uuid.v1(),
                id: observacion.id,
                observacion: observacion.observacion,
                solucionada: observacion.solucionada
            }
        })

        const observacionesCronograma = observaciones.filter(obs => obs.tipo==='cronograma').map((observacion) => {
            return {
                key: uuid.v1(),
                id: observacion.id,
                observacion: observacion.observacion,
                solucionada: observacion.solucionada
            }
        })
        const columnsPlanTrabajo = [
            
            {
                title: 'Solucionada',
                dataIndex: 'solucionada',
                key: 'solucionada',
                render: (text, record) => (
                    <Switch  onChange={(check) => this.onChangeObservacion(record.id, check)} defaultChecked={record.solucionada} checkedChildren="Solucionada" unCheckedChildren={<Icon type="cross" />} />
                )
            },
            {
                title: 'Observación',
                dataIndex: 'observacion',
                key: 'observacion'
            }
        ]

        const columnsAsesorias = [
            {
                className: 'center-text',
                title: 'Fecha',
                dataIndex: 'fecha',
                key: 'fecha',
            },
            {
                className: 'center-text',
                title: 'Temas a asesorar',
                dataIndex: 'temas_a_asesorar',
                key: 'temas_a_asesorar',

            },
            {
                className: 'center-text',
                title: 'Avance',
                dataIndex: 'url_avance',
                key: 'url_avance',
                render: (text, record) => (
                    <a href={record.url_avance} target="_blank">Archivo de avance<Icon type="file-pdf"/></a>
                )
            },
            {
                className: 'center-text',
                title: 'Soluciones recomendadas',
                dataIndex: 'soluciones_recomendadas',
                key: 'soluciones_recomendadas',
                render: (text, record) => (
                    <span>
                        <Button style={{marginLeft: 2, marginRight: 2}} icon="bars" onClick={() => this.showSoluciones(record.id)}>Soluciones</Button>
                        <Button style={{marginLeft: 2, marginRight: 2}} icon="plus" onClick={() => this.showAddSolucion(record.id)}>Agregar solución</Button>
                    </span>
                )
            },
            {
                className: 'center-text',
                title: 'Tipo de asesoria',
                dataIndex: 'tipo',
                key: 'tipo',
                render: (text, record) => (
                    <Select defaultValue={record.tipo} onChange={(value)=>this.updateTipoAsesoria(record.id, value)} style={{width: '100%'}}>
                        <Option value="virtual">
                            Virtual
                        </Option>
                        <Option value="presencial">
                            Presencial
                        </Option>
                    </Select>
                )
            },
            {
                className: 'center-text',
                title: 'Generar formato',
                dataIndex: 'permitir_generar_formato',
                key: 'permitir_generar_formato',
                render: (text, record) => (
                    <Switch defaultChecked={record.permitir_generar_formato} checkedChildren="Autorizado" onChange={(e) => this.checkPermitirGenerarFormato(e, record.id)} unCheckedChildren="No autorizado"/>                    
                )
            }
        ]
        const _asesorias = asesorias.map((asesoria) => {
            return {
                key: uuid.v1(),
                id: asesoria.id,
                fecha: moment(asesoria.fecha, 'YYYY-MM-DD').format('ll'),
                temas_a_asesorar: asesoria.temas_a_asesorar,
                url_avance: asesoria.url_avance,
                soluciones_recomendadas: 'on',
                permitir_generar_formato: asesoria.permitir_generar_formato,
                tipo: asesoria.tipo
            }
        })
        
        return (
            <div>
                <Tabs key=".103." defaultActiveKey="1" onChange={(key) => this.onChangeTab(key) }>
                    <TabPane tab={<span><Icon type="book" />Proyecto</span>} key="proyecto">
                        <Form>
                            <Item label="Título: ">
                                <Input value={proyecto.anteproyecto.nombre}  readOnly />
                            </Item>
                            <Item label="Objetivo general: ">
                                <Input value={proyecto.anteproyecto.objetivo_general}  readOnly />
                            </Item>
                            
                            <Item label="Anteproyecto: ">
                                <Upload
                                    
                                    listType="picture-card"
                                    fileList={[{
                                        uid: -1,
                                        name: 'anteproyecto.pdf',
                                        status: 'done',
                                        url: `/api/anteproyecto/pdf/${proyecto.anteproyecto.path_file_anteproyecto}`
                                    }]}
                                />
                            </Item>
                        </Form>
                        <Row className="border-top">
                            <Col xs={24} lg={6} >
                                <h2 style={{marginBottom: 20}}>Plan de trabajo</h2>
                                <Item  label={(
                                        <span>
                                            Plan de trabajo&nbsp;
                                            <Tooltip title={`Ultima fecha de actualización: ${moment(proyecto.updatedAt).utc().format('ll')}`}>
                                                <Icon type="clock-circle-o"/>
                                            </Tooltip>
                                        </span>
                                    )}>
                                    <Upload
                                        className="file-preview"
                                        style={{width: 600}}
                                        listType="picture-card"
                                        fileList={[{
                                            uid: -1,
                                            name: 'plan_de_trabajo.pdf',
                                            status: 'done',
                                            url: `/api/plan_de_trabajo/pdf/${proyecto.filename_plan_trabajo}`
                                        }]}
                                    />
                                </Item>
                            </Col>
                            <Col xs={24} lg={18}>
                                <Button style={{marginBottom: 10, marginTop: 45}}  icon="plus" onClick={this.showAgregarObservacionPlanTrabajo}>Agregar observación</Button>
                                <Table title={() => 'Observaciones de plan de trabajo'} columns={columnsPlanTrabajo} dataSource={observacionesPlanTrabajo} pagination={{ pageSize: 4 }} />
                            </Col>
                        </Row>
                        <Row className="border-top">
                            <Col xs={24} lg={6} >
                                <h2 style={{marginBottom: 20}}>Cronograma de actividades</h2>
                                <Item  label={(
                                        <span>
                                            Cronograma de actividades&nbsp;
                                            <Tooltip title={`Ultima fecha de actualización: ${moment(proyecto.updatedAt).utc().format('ll')}`}>
                                                <Icon type="clock-circle-o"/>
                                            </Tooltip>
                                        </span>
                                    )}>
                                    <Upload
                                        className="file-preview"
                                        style={{width: 600}}
                                        listType="picture-card"
                                        fileList={[{
                                            uid: -1,
                                            name: 'cronograma.pdf',
                                            status: 'done',
                                            url: `/api/cronograma/pdf/${proyecto.filename_cronograma}`
                                        }]}
                                        onRemove={false}
                                    />
                                </Item>
                            </Col>
                            <Col xs={24} lg={18}>
                                <Button style={{marginBottom: 10,  marginTop: 45}}  icon="plus" onClick={this.showAgregarObservacionCronograma}>Agregar observación</Button>
                                <Table title={() => 'Observaciones del cronograma de actividades'} columns={columnsPlanTrabajo} dataSource={observacionesCronograma} pagination={{ pageSize: 4 }} />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={<span><Icon type="solution" />Asesorias</span>} key="asesorias">
                        <Row>
                            <Col xs={24} lg={24}>
                                <Table title={() => 'Asesorias'} columns={columnsAsesorias} dataSource={_asesorias} pagination={{ pageSize: 5 }} scroll={{ x: 1200 }} />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={<span><Icon type="calendar" />Seguimientos</span>} key="seguimientos">
                        <Tabs key="-99" tabPosition="left" defaultActiveKey="-1" onChange={(key) => this.onChangeTabSeguimiento(key)} >
                            {seguimientos.map(((seguimiento, index) => {
                                    // console.log('key', seguimiento.id)
                                    return (
                                        <TabPane tab={<span><Icon type="schedule" />{`Seguimiento ${index+1}`}</span>} key={seguimiento.id}>
                                            {renderSeguimiento}
                                        </TabPane>
                                    )
                            }))}
                        </Tabs>
                    </TabPane>
                </Tabs>
                <FormAddObservacion updateObservaciones={this.updateObservaciones.bind(this)} id_proyecto={proyecto.id} tipo={tipo_observacion} usuario={usuario} visible={visibleAddObservacion}/>
                <FormAddSolucion  id_asesoria={id_asesoria}  visible={visibleAddSolucion}/>


            </div>
        )
    }
}