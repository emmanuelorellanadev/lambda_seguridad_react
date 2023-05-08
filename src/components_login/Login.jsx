import React, {  useState } from 'react';
import { Menu } from './Menu';
import axios from 'axios';

export const Login = () => { 

    const [miLogin, setMiLogin] = useState("false");
    const [ usu, setUsu] = useState('');
    const [pas, setPas] = useState('');

    const IniciarSesion = async(e) => {
        e.preventDefault();

        let txtusu = document.getElementById('txtusu').value; //usuario01
        let txtpas = document.getElementById('txtpas').value; //pass01
    
        //If the fields are void
        if(txtusu.length === 0 || txtpas.lenght === 0){
            alert('Complete los campos');
        }else{
            
            const url = 'http://localhost:8080/auth';
           
            axios.post(url, { 'name': txtusu, 'pass': txtpas})
            .then(res => { procSesion(res.data) })
            .catch( (e) => {
                if(e.response){
                    console.log(e.response.data);
                    console.log(e.response.status);
                    // console.log(e.response.header);
                    // console.log(e.toJSON())
                }

                alert('Intentalo de nuevo');
                cleanAll();
            } )
            
        //     fetch (url, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: {
        //             name: txtusu,
        //             pass: txtpas
        //         }
        //     })
        //         .then( resp => resp.json() )
        //         .then( resp => {
        //             console.log(resp)
        //         })

        }
    }

    const procSesion = ( sessionData ) => {
        console.log('no obtiene resultados del backend');
        console.log(sessionData);
        sessionData ? console.log('todo OK')
                    : console.log('todo MAL');;
        
    }

    const cleanAll = () => {
        
        let txtusu = document.getElementById('txtusu'); 
        let txtpas = document.getElementById('txtpas'); 
    
        txtusu.value = '';
        txtpas.value = '';
    }

    return (
        <div className='container' style={{background: "lightgrey", marginTop: 20, padding: 'top'}}>
            <form id='form_login'>
                <div>
                    <h1 style={{color: 'blue', textAlign: 'center'}}><strong>LOGIN</strong></h1>
                    <label htmlFor="txtusu"><strong>Username</strong></label>
                    <input value= 'user01' type="text" id='txtusu' style={{textAlign: 'center'}} className="form-control" onChange={ (e) => setUsu(e.target.value)} autoFocus required ></input>
                </div>
                <div>
                    <label htmlFor="txtpas"><strong>Password</strong></label>
                    <input value='pass01' type="password" id='txtpas' style={{textAlign: 'center'}} className="form-control" onChange={ (e) => setPas(e.target.value)} required></input>
                </div>
                <input type='submit'  className='btn btn-primary btn-lg' value='Login' onClick={IniciarSesion}/>
            </form>        

            { miLogin === 'true' && <Menu usu={usu}/> }    
        </div>
    )
}