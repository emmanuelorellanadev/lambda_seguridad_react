import React, { useState, useEffect} from 'react';
import axios from 'axios';

export const Registrar = ( ) => {

    // const [registroslogin, setRegistrosLogin] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [password, setPass] = useState('');
    const [estado, setEstado] = useState(false);
    const [roles, setRoles] = useState([]);
    const [rolSeleccionado, setRolSeleccionado] = useState('')
    
    //Boton guardar
    const botonGuardar = (e) => {
        e.preventDefault();
        guardaUsuario();
        limpiarFormulario();
    }
    
    //Guarda usuario
    const guardaUsuario = async() => {

        const url = 'http://localhost:8080/user';

        await axios.post(url, {
            "user_name": usuario, 
            "user_password": password, 
            "user_status": estado, 
            "RoleId": rolSeleccionado
        },
        {
            headers: { "x-token": sessionStorage.getItem('lambdaToken') 
        }})
            .then( response => {
                if (response.data.user_name) {
                    alert(`Usuario "${response.data.user_name}" guardado exitosamente`)
                }else{console.log(response);}
            })
            .catch( (error) => {
                alert(`${error.response.data.msg} \n ${error.response.data.error.name}`);
                console.log(error.response.data.error);
            })
    }

    //Carga los roles que se usan en select
    const cargaRoles = async() => {

        const url = 'http://localhost:8080/role';

        await axios(url, {
            headers: { "x-token": sessionStorage.getItem('lambdaToken') }
            })
            .then( roles => setRoles(roles.data.roles))
            .catch(error => console.log(error))
    }

    //Limpia formulario
    const limpiarFormulario = () => {
        setUsuario('');
        setPass('');
        setEstado(false);
        document.getElementById('miFormulario').reset();
    } 

    //Realiza accion al cargar componentes
    useEffect( () => {
        cargaRoles();
    }, [])

    //vista
    return (
        <div className='bg-light' style={{ marginTop:20, padding: 20}}>
            <div className='h3'>
                Formulario De Registro de Usuarios
                <br />
                <form id='miFormulario' onSubmit={botonGuardar}>
                    <div className='row' style={{ marginTop: 20}}>
                        <div className='col-6'>
                            <input className='form-control form-control-lg text-center' type="text" placeholder='Digite El Nombre del Usuario' onChange={ (e) => setUsuario(e.target.value)} required />
                        </div>
                        <div className='col-6'>
                            <input className='form-control form-control-lg text-center' type="password" autoComplete='off' placeholder='Digite La Contrasena' onChange={ (e) => setPass(e.target.value)} required/>
                        </div>
                    </div>
                    <div className='row' style={{ marginTop: 20}}>
                        <div className='col-6'>
                            <select className='form-select form-select-lg text-center' onChange={ (e) => {setRolSeleccionado(e.target.value)}} required>
                                <option value="">selecciona Opcion</option>
                                { 
                                    roles.map( (r) => {
                                        return <option value={r.id} key={r.id}>{r.role_name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className='col-6'>
                            <label className='form-check-label' htmlFor="estadoUsuario">Estado</label>
                            <input className='form-check-input' type='checkbox' id='estadoUsuario' onChange={ () => setEstado( !estado ) } checked={ estado } />  
                        </div>
                    </div>
                    <div className='row' style={{marginTop: 20}}>
                        <div className='col'>
                            <button className='btn btn-primary btn-lg'>Guardar Datos</button>
                        </div>
                    </div>
                 </form>
            </div>
        </div>
    )
}