import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import CardRouter from '../components/CardRouter'
import { Container, Spinner, Row, Col } from 'react-bootstrap'

export default function Home() {

    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')
    const [data, setData] = useState([])

    function fetchAllDevice(){
        setLoading(true)

        axios.get('/devices')
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
        fetchAllDevice()
    },[])

    return (
        <>
            <Container className='mt-5'>
                <Row>
                    {
                        loading ?
                        <Spinner />
                        :
                        data.map((el, index) => {
                            return <CardRouter key={index} device={el} />
                        })
                    }
                </Row>
            </Container>
        </>
    )
}
