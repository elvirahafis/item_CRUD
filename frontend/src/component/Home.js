import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { MDBContainer, MDBCheckbox, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

function HomeLogin() {
  const [usr, setUsername] = useState("");
  const [pswd, setPassword] = useState("");
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();

  const InsertLogin = async (e) => {
    e.preventDefault();

    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save It!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios
            .post(`http://localhost:3000/login`, {
              username: usr,
              password: pswd,
            })

            .then(() => {
              Swal.fire("success");
              navigate("/home");
            })
            .catch((error) => {
              //assign validation on state
              setValidation(error.response.data);
            });
        }
      });
    } catch (err) {
      setValidation(err.response.data);
    }
  };
  return (
    <div>
      {validation.errors && (
        <Alert variant="danger">
          <ul class="mt-0 mb-0">
            {validation.errors.map((error, index) => (
              <li key={index}>{`${error.param} : ${error.msg}`}</li>
            ))}
          </ul>
        </Alert>
      )}
      <Form onSubmit={InsertLogin}>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="usr"
              type="usr"
              value={usr || ""}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan Username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              value={pswd}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan Password"
            />
          </Form.Group>
          <div className="d-flex justify-content-between mx-3 mb-4">
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Remember me"
            />
            <a href="!#">Forgot password?</a>
          </div>
          <Button variant="primary" type="submit">
            Submit
          </Button>

          <div className="text-center">
            <p>
              Not a member? <a href="#!">Register</a>
            </p>

            <div
              className="d-flex justify-content-between mx-auto"
              style={{ width: "40%" }}
            >
              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="facebook-f" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="twitter" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="google" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="github" size="sm" />
              </MDBBtn>
            </div>
          </div>
        </MDBContainer>
      </Form>
    </div>
  );
}

export default HomeLogin;
