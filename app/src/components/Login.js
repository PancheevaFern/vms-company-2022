import React from "react";
import { useForm } from "react-hook-form";

import PropTypes from "prop-types";
import { Form, Button, Row } from "react-bootstrap";

export function Login({ email, password, onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  
  return (
    <Form onSubmit={handleSubmit(onLogin)}>
      <div className = "container px-5" style={{padding: "30px", height:"600px"}}>
        <Form.Group className="mb-5" controlId="formBasicEmail">
        <div class="wrapper">
            <div className="col mx-1" style={{marginLeft: "30px", background: "white", padding: "30px", borderRadius:"10px", width:"300px"}}>
              <Row style={{ textAlign: "center" }}>
                <div className="font-face-gm" style={{ textAlign: "center" }}>
                <h3>VMS Stock System</h3>
                </div>
              </Row>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                defaultValue={email}
              {...register("email", { required: true })}
              />
              {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
              </Form.Text> */}
              
              <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                defaultValue={password}
                {...register("password", { required: true, min: 8 })}
                />
                {/* <Form.Text className="text-muted">
                We'll never share your password with anyone else.
                </Form.Text> */}
              </Form.Group>
              

              {/* <input type="submit" /> */}
              <div className="d-grid gap-2">
              <Button type="submit" className="btn btn-dark btn-lg btn-block" variant="outline-white">
                Login
              </Button>
              </div> 
          </div>
          </div>
          </Form.Group>
      </div>
    </Form>
  );
}

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onLogin: PropTypes.func,
};

Login.defaultProps = {
  email: null,
  password: false,
  onLogin: undefined,
};