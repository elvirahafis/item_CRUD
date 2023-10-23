import {
  Form,
  Button,
  Card,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
// import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

function Updatedata() {
  const [name, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [user_id, setUserId] = useState("");
  const [image, setImage] = useState("");
  const [validation, setValidation] = useState({});
  //   const [listuser, setItems] = useState([]);
  //   history
  // const history = useHistory();
  //   get ID from parameter URL
  const { id } = useParams();
  const navigate = useNavigate();
  const getItems = async () => {
    const response = await axios.get(`http://localhost:3000/dataitem/${id}`);
    const data = await response.data.data;

    setTitle(data.name);
    setCategory(data.category);
    setStock(data.stock);
    setPrice(data.price);
    setUserId(data.user_id);
    setImage(data.image);
  };

  const updatePost = async (e) => {
    e.preventDefault();
    console.log(name, e);
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
            .post(`http://localhost:3000/updateitem/${id}`, {
              name: name,
              category: category,
              price: price,
              stock: stock,
              user_id: user_id,
              image: image,
            })
            .then(() => {
              Swal.fire("Save!", "success");
              navigate("/");
              getItems();
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
  useEffect(() => {
    getItems();
  }, []);
  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm"></Card>
          <Card className="border-0 rounded shadow-sm">
            <Card.Body>
              {validation.errors && (
                <Alert variant="danger">
                  <ul class="mt-0 mb-0">
                    {validation.errors.map((error, index) => (
                      <li key={index}>{`${error.param} : ${error.msg}`}</li>
                    ))}
                  </ul>
                </Alert>
              )}
              <Form onSubmit={updatePost}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nama Item</Form.Label>
                  <Form.Control
                    name="name"
                    type="name"
                    value={name || ""}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masukkan Title"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Kategori</Form.Label>
                  <Form.Control
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Masukkan Title"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Harga</Form.Label>
                  <Form.Control
                    type="text"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="Masukkan Title"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Stok</Form.Label>
                  <Form.Control
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Masukkan Title"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>User</Form.Label>
                  <Form.Control
                    type="text"
                    value={user_id}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Masukkan Title"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Masukkan Title"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Updatedata;
