import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
           <Container>
               <Row>
                   <Col className='text-center py-3'>
                        Copyright Felipe Stuart &copy;2021 Eshop. GitHub repo <a href='www.github.com/Fest5'>here</a>
                   </Col>
               </Row>
            </Container> 
        </footer>
    )
}

export default Footer
