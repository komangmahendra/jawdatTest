import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import { Col, Spinner, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function CardRouter(props) {

    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')
    const [data, setData] = useState('')
    const { device } = props

    function fetchDevice(){
        setLoading(true)

        axios.get(`devices/${device.ip}/${device.port}`)
        .then(({ data }) => {
            setData(data)
            setErr(null)
        })
        .catch(err => {
            setErr(err)
            setData({ message: err })
        })
        .finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if(!data){
            fetchDevice()
        }
        setInterval(() =>{fetchDevice()}, 30000)
    },[props])

    return (
        <>
        <Col lg={4} sm={12} className='p-1 justify-content-center' >
            <div className='shadow-sm p-2' style={{borderRadius:'20px', backgroundColor:'white'}}>
                <div className='d-flex justify-content-center mt-3'>
                    <img src='https://cdn2.iconfinder.com/data/icons/networking-icons-1/512/networking_icons-04.png' height='100px' width='100px'/>
                </div>
                <div>
                    {  
                        loading ?
                        <div className='p-2 mt-2' style={{ textAlign:'center' }}>
                            <p> hostname : <b>{ data.hostname ? data.hostname : 'Error' }</b>
                            <br/>
                            IP : <b>{ device.ip }</b>
                            <br/>
                            port : <b>{ device.port }</b>
                            <br/>
                            status : <b>{ !err && data ? <b style={{color:'green'}}>OK</b> : <b style={{color:'red'}}>NOK</b> }</b> </p>
                            { err || !data? null : 
                                <Link to={`/details/${device.ip}/${device.port}`}> 
                                    <Button variant="success" size="sm"> Detail </Button>
                                </Link>
                            }
                            <br />
                            <Spinner animation="grow" variant='info' className='mt-2'/>
                        </div>
                        :
                        <div className='p-2 mt-2' style={{ textAlign:'center' }}>
                            <p> hostname : <b>{ data.hostname ? data.hostname : 'Error' }</b>
                            <br/>
                            IP : <b>{ device.ip }</b>
                            <br/>
                            port : <b>{ device.port }</b>
                            <br/>
                            status : <b>{ !err && data ? <b style={{color:'green'}}>OK</b> : <b style={{color:'red'}}>NOK</b> }</b> </p>
                            { err || !data ? null : 
                                <Link to={`/details/${device.ip}/${device.port}`}> 
                                    <Button variant="success" size="sm"> Detail </Button>
                                </Link>
                            }
                        </div>
                    }
                    
                </div>
            </div>
        </Col>
        </>
    )
}
