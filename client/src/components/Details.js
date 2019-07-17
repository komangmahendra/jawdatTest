import React, { useState, useEffect } from 'react'
import axios from '../api/axios'
import { Container, Spinner, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Details(props) {

    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')
    const [data, setData] = useState('')
    const { params } = props.match

    function fetchDevice(){
        setLoading(true)

        axios.get(`devices/${params.ip}/${params.port}`)
        .then(({ data }) => {
            setData(data)
        })
        .catch(err => {
            setErr(err)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchDevice()
    },[])

    return (
        <>
            <Container className='mt-5'>
                <div style={{ backgroundColor:'white', borderRadius:'20px' }} className='shadow-sm p-5'>
                    { loading ?
                        <Spinner animation="border" />
                        :
                        <div>
                            <h4> hostname : <b> { data.hostname } </b> </h4>
                            <h4> IP : <b> { params.ip } </b> </h4>
                            <h4> Port : <b> { params.port } </b> </h4>
                            <h4> IOS Version : <b> { data.version } </b> </h4>
                            <h4> Interface list : </h4>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Interface</th>
                                    <th>Status</th>
                                    <th>Protocol</th>
                                    <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { data && data.interface.map( (el, index) => {
                                        return <tr key={index}>
                                            <td>{ index + 1 }</td>
                                            <td>{ el.interface }</td>
                                            <td>{ el.status }</td>
                                            <td>{ el.protocol }</td>
                                            <td>{ el.description }</td>
                                        </tr>
                                    })}
                                    
                                </tbody>
                            </Table>
                            <Link to='/'><Button variant='success'> Home </Button></Link>
                        </div>
                    }
                </div>
            </Container>
            
        </>
    )
}
