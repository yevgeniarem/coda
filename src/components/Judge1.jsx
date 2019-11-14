import React from 'react';
import { Image, Form, Button, InputGroup } from 'react-bootstrap';

const Judge1 = () => {
  return (
    <div >
        <Image className='logo-img' src='./images/coda.svg' alt='CODA logo' />
        <Form className='login-form'>
          <Form.Group className='login-form-email' controlId='formBasicEmail'>
            {/* <Form.Label>email</Form.Label> */}
            <i class='far fa-envelope'></i>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i class='far fa-envelope'></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type='email' />
            </InputGroup>
            
          </Form.Group>

          <Form.Group className='login-form-password' controlId='formBasicPassword'>
            <Form.Label>password</Form.Label>
            <Form.Control type='password' />
          </Form.Group>

          <Button variant='primary'>LOGIN</Button>
        </Form>
    </div>
  );
}

export default Judge1;
