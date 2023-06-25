import React, { useState} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import {Registrar} from './Registrar';
import {Listar} from './Listar';
import {Estadistica} from './Estadistica';


export const Menu = (props) => {

    const [roles, setRoles] = useState([])

    const [reg, setReg] = useState('');
    const [lis, setLis] = useState('');
    const [est, setEst] = useState('');

  const cerrarSesion = () => {
    sessionStorage.removeItem('lambdaToken');
    sessionStorage.removeItem('userLambda')
    document.getElementById('caja_menu').style.display = 'none';
    document.getElementById('form_login').style.display = 'block';
    document.getElementById('txtusu').value = '';
    document.getElementById('txtpas').value = '';
    document.getElementById("txtusu").focus();
  }

  const op_registrar = async() => {
    setReg('1');
    setLis('0')
    setEst('0')
  }

  const op_listar = () => {
    setReg('0');
    setLis('1')
    setEst('0')
  }

  const op_estadistica = () => {
    setReg('0');
    setLis('0')
    setEst('1')
  }

    return (
        <>
        <div id='caja_menu' style={{ textAlign: 'left'}}>

            <strong className='h3'>
                Bienvenido {props.usu.toUpperCase().toUpperCase()}
            </strong>
            
            <nav className='navbar navbar-expand-lg navbar-light bg-light' style={{ marginTop: 20}}>
                <div className='container-fluid'>

                    <label className='navbar-brand h5' href='' >Menu Principal</label>

                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                        <div className='navbar-nav'>
                            <NavLink to='' className='nav-link h5 text-center' onClick={ op_registrar }>Registrar</NavLink>
                            <NavLink to='' className='nav-link h5 text-center' onClick={ op_listar }>Listar</NavLink>
                            <NavLink to='' className='nav-link h5 text-center'onClick={ op_estadistica }>Estadistica</NavLink>
                            <div><a className='nav-link h5 text-center' style={{color: 'blue'}} href=" " onClick={cerrarSesion}>Cerrar Sesion</a></div>
                        </div>
                    </div>
                </div>
            </nav>            
        </div>
        
        { reg === '1' && <Registrar /> }
        { lis === '1' && <Listar /> } 
        { est === '1' && <Estadistica/> }
        </>
    )
}