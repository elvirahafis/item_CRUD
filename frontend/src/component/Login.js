import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

const LoginU = () => {
  const [listuser, setItems] = useState([]);
  const getItems = () => {
    axios({
      method: "GET",
      url: `http://localhost:3000/users`,
    })
      .then((result) => {
        setItems(result.data.data);
        console.log(result.data.data);
      })
      .catch((err) => {
        console.log(err.toJSON());
      });
  };

  const deleteHandler = async (id) => {
    console.log(id);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios({
            method: "DELETE",
            url: `http://localhost:3000/delete/${id}`,
          });
          getItems();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  // getItems();

  return (
    <div className="container">
      <div className="container text-center">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nama</th>
              <th scope="col">Kategori</th>
              <th scope="col">Harga</th>
              <th scope="col">Stok</th>
              <th scope="col">Image</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {listuser.map((item) => {
              const { id, name, category, price, stock, image } = item;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{category}</td>
                  <td>Rp. {price}</td>
                  <td>{stock} pcs</td>
                  <td>{image}</td>

                  <td>
                    <button
                      onClick={() => deleteHandler(id)}
                      className="btn btn-sm btn-danger"
                    >
                      <MdDeleteOutline className="me-1" />
                      Delete
                    </button>
                    <Link to={`/editItem/${id}`}>
                      <button className="btn btn-sm btn-info">
                        <MdOutlineModeEdit className="me-1" />
                        Update
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="container text-center">
        <Link to={"/addItems"}>
          <button className="btn btn-sm btn-info"> Tambah Data</button>
        </Link>
      </div>
      <div className="container-fluid p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default LoginU;
