import React, { useState, useEffect} from 'react';
import axios from 'axios';

export const Registrar = ( ) => {

    const [registroslogin, setRegistrosLogin] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [password, setPass] = useState('');
    const [estado, setEstado] = useState(false);
    const [rol, setRol] = useState([]);
    
    useEffect( () => {
        cargaRoles();
    }, [])


    //Boton guardar
    const botonGuardar = (e) => {
        e.preventDefault();
        guardaUsuario();
        // var miObjeto = {usuario, password, estado, rol };
        // setRegistrosLogin([...registroslogin, miObjeto]);
        limpiarFormulario();
    }
    
    const guardaUsuario = async() => {

        const url = 'http://localhost:8080/user';

        await axios.post(url, {
            "user_name": usuario, 
            "user_password": password, 
            "user_status": estado, 
            "RoleId": rol
        },
        {
            headers: { "x-token": sessionStorage.getItem('lambdaToken') 
        }})
            .then( response => alert(response))
            .catch( (error) => {alert('no se pudo guardar el usuario')
                console.log(error);
            })
        }

    const cargaRoles = async() => {

    const url = 'http://localhost:8080/role';

    await axios(url, {
          headers: { "x-token": sessionStorage.getItem('lambdaToken') }
          })
          .then( roles => setRol(roles.data.roles))
          .catch(error => console.log(error))
    }

    const limpiarFormulario = () => {
        setUsuario('');
        setPass('');
        setEstado('');
        setRol('');
        document.getElementById('miFormulario').reset();
    } 

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
                            <select className='form-select form-select-lg text-center' onChange={ (e) => setRol(e.target.value)} required>
                                <option value="">selecciona Opcion</option>
                                { 
                                    rol.map( (r) => {
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