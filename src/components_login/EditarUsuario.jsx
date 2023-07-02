import React, { useState, useEffect} from 'react';
import axios from 'axios';

export const EditarUsuario = (  ) => {

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


    const buscaUsuario = async() => {
        const url = `http://localhost:8080/user/`;

        await axios.get(url, {
            headers: { "x-token": sessionStorage.getItem('lambdaToken')},
            params: {id: 64}
        })
            .then(respuesta => {console.log(respuesta.data.user)
                document.querySelector('#userName').value = respuesta.data.user.user_name
                document.querySelector('#userRole').value = 2
                document.querySelector('#userStatus').checked = respuesta.data.user.user_status
                
            })
            .catch(error => console.log(error))
    }   

    //Realiza accion al cargar componentes
    useEffect( () => {
        cargaRoles();
        buscaUsuario()
    }, [])

    //vista
    return (
        <div className='bg-light' style={{ marginTop:20, padding: 20}}>
            <div className='h3'>
                Formulario De Edicion de Usuario
                <br />
                <form id='miFormulario' onSubmit={botonGuardar}>
                    <div className='row' style={{ marginTop: 20}}>
                        <div className='col-6'>
                            <input id='userName' className='form-control form-control-lg text-center' type="text" placeholder='Digite El Nombre del Usuario' onChange={ (e) => setUsuario(e.target.value)} required />
                        </div>
                        <div className='col-6'>
                            <input className='form-control form-control-lg text-center' type="password" autoComplete='off' placeholder='Digite La Contrasena' onChange={ (e) => setPass(e.target.value)} required/>
                        </div>
                    </div>
                    <div className='row' style={{ marginTop: 20}}>
                        <div className='col-6'>
                            <select id='userRole' className='form-select form-select-lg text-center' on onChange={ (e) => {setRolSeleccionado(e.target.value)}} required>
                                <option  value="">selecciona Opcion</option>
                                { 
                                    roles.map( (r) => {
                                        return <option value={r.id} key={r.id}>{r.role_name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className='col-6'>
                            <label className='form-check-label' htmlFor="estadoUsuario">Estado</label>
                            <input id='userStatus' className='form-check-input' type='checkbox' onChange={ () => setEstado( !estado ) } />  
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