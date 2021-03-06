import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';

import { Layout, Menu, Breadcrumb, Icon, Avatar, Modal, Input, Form, Alert} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';

import {getIsAuth} from '../api.jsx';

// components
import CambiarContrasenia from '../layoutComponents/CambiarContrasenia.jsx';
import RevisionAnteproyectos from '../periodo_residencia/revisionAnteproyectos.jsx';
import AddCandidatoAResidente from '../periodo_residencia/addCandidatoResidente.jsx';
import RevisionProyectoResidencia from '../docente/components/RevisionProyectoResidencia.jsx';
import RevisionSeguimientos from '../periodo_residencia/RevisionSeguimientos.jsx';

class LayoutDocente extends Component{
    constructor(){
        super();
        this.state = {
            collapsed: true,
            isAuth: true,
            usuario: null,
            departamento: null,
            componentRender: {
                title: null,
                render: null
            },
            visibleCambiarContrasenia: false,
        }
    }
    getIsAuth(){
        getIsAuth().then((usuario) => {
            if(usuario.rol === 'docente' || usuario.rol === 'subdirector_academico'){
                axios.get(`/api/departamento/${usuario.id_departamento}`)
                    .then(res => {
                        if(res.status === 200){
                            console.warn('departamento', res.data)
                            this.setState({
                                departamento: res.data,
                                isAuth: usuario.isAuth,
                                usuario: usuario,
                                componentRender: {
                                    title: 'Revisión de anteproyectos ',
                                    render: <RevisionAnteproyectos usuario={usuario} departamento={res.data}/>
                                }
                            })
                        }else{
                            this.setState({isAuth: false})
                        }
                    })
            }
            else{
                this.setState({isAuth: false})
            }
        })
    }
    componentWillMount(){
        this.getIsAuth()
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            visibleCambiarContrasenia: false
        });
    }
    
    
    handleMenu = ({item, key, selectedKeys}) => {
        if(key == 1){
            const {departamento, usuario} = this.state
            this.setState({
                componentSelected: key,
                visibleCambiarContrasenia: false,
                visible_add_docente: false,
                componentRender: {
                    title: 'Revisión de anteproyectos ',
                    render: <RevisionAnteproyectos usuario={usuario} departamento={departamento}/>
                }
            })
        }else if(key == 2){
            const {departamento, usuario} = this.state;
            // console.log('this=>',usuario)
            const presidente_academia = usuario.docente_carrera.find((docente) => docente.rol === 'presidente_academia');
            if(presidente_academia){
                // console.log(presidente_academia);
                this.setState({
                    componentSelected: key,
                    visibleCambiarContrasenia: false,
                    visible_add_docente: false,
                    componentRender: {
                        title: 'Registro de candidato a residente',
                        render: <AddCandidatoAResidente departamento={departamento} presidente_academia={presidente_academia} />
                    }
                })
            }else{
                this.setState({
                    componentSelected: key,
                    visibleCambiarContrasenia: false,
                    visible_add_docente: false,
                    componentRender: {
                        title: 'Permiso denegado',
                        render: <Alert message="Permiso denegado, solo el presidente de academia o jefe de departamento puede realizar esta acción." type="warning" showIcon/>
                    }
                })
            }
            
        }else if(key == 3){
            this.setState({
                visibleCambiarContrasenia: true,
                visible_add_docente: false
            })
        }else if(key == 4){ // proyectos de residencia
            axios.get(`/api/proyectos/asesor_interno/${this.state.usuario.id_docente}`)
                .then(res => {
                    if(res.status === 200){
                        this.setState({
                            componentSelected: key,
                            visibleCambiarContrasenia: false,
                            visible_add_docente: false,
                            componentRender: {
                                    title: 'Proyectos de residencia asignados',
                                    render: <RevisionProyectoResidencia proyectos={res.data} usuario={this.state.usuario}/>
                            }
                        })
                    }
                })
        }else if(key == 5){
            // revision seguimientos
            const {departamento, usuario} = this.state;
            // console.log('this=>',usuario)
            // console.log('this=>', departamento);
            const _usuario = usuario.docente_carrera.find((docente) => docente.rol === 'presidente_academia' || docente.rol === 'jefe_proyecto');
            if(_usuario){
                const carreras = departamento.carreras.filter(carrera => carrera.id === _usuario.id_carrera);
                this.setState({
                    componentSelected: key,
                    visibleCambiarContrasenia: false,
                    visible_add_docente: false,
                    componentRender: {
                        title: 'Revisión de seguimientos',
                        render: <RevisionSeguimientos carreras={carreras} usuario={_usuario} />
                    }
                })
            }else{
                this.setState({
                    componentSelected: key,
                    visibleCambiarContrasenia: false,
                    visible_add_docente: false,
                    componentRender: {
                        title: 'Permiso denegado',
                        render: <Alert message="Permiso denegado, solo el presidente de academia, jefe de departamento, jefe de proyecto ó el asesor interno del proyecto puede realizar esta acción." type="warning" showIcon/>
                    }
                })
            }
        }
    }
    render(){
        const {isAuth, componentSelected, componentRender, visibleCambiarContrasenia, usuario, departamento} = this.state
        // console.log(isAuth)
        return(
            isAuth ? (
                <Layout style={{minHeight:'100vh'}}>
                    <Sider
                        breakpoint="lg"
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                        
                    >
                        <div className="logo" style={{textAlign: 'center'}}>
                            <img src="/img/tec_logo.png" alt="logo_tec" height="100%"/>
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onSelect={this.handleMenu}>
                            
                            <Menu.Item key="1" >
                                <Icon type="solution" />
                                <span>Revisión anteproyectos</span>
                            </Menu.Item>
                            <Menu.Item key="2" >
                                <Icon type="usergroup-add"/>
                                <span>Agregar candidato a residente</span>
                            </Menu.Item>
                            
                            <Menu.Item key="4" >
                                <Icon type="book"/>
                                <span>Proyectos de residencia</span>
                            </Menu.Item>
                            <Menu.Item key="5" >
                                <Icon type="calendar"/>
                                <span>Revisión de seguimientos</span>
                            </Menu.Item>
                            <Menu.Divider/>
                            <SubMenu
                                key="sub1"
                                title={<span><Icon type="user" /><span>Usuario</span></span>}
                                >
                                <Menu.Item key="3">Cambiar contraseña</Menu.Item>
                                <Menu.Item ><a href="/api/usuario/logout"> <strong>Cerrar sesión</strong> </a> </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            {componentRender.title}
                        </Header>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
                            {componentRender.render}
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Sistema de Seguimiento de residencias del ITCH ©2017 Francisco Blanco 00fblanco@gmail.com
                        </Footer>
                    </Layout>
                    <CambiarContrasenia visible={visibleCambiarContrasenia}/>
                </Layout>
            ):
            (<Redirect to="/usuario/auth"/>)
        )
    }
}

export default LayoutDocente;