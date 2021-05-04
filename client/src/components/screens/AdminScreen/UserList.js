import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Table, Row, Col, Modal, Button ,From, Form} from "react-bootstrap";
import Message from "../../layout/Message";
import { getUsers, deleteUser,UpdateUserRole } from "../../../redux/actions/userAction";
import { useHistory, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../layout/Loader";

export default function UserlistScreen() {
  const dispatch = useDispatch();

  
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { deleteSuccess } = userDelete;
  console.log("users: ", users);

 const userUpdateRole = useSelector((state) => state.userUpdateRole);
  const {  error:updateUserRoleErr  } = userUpdateRole;

  const history = useHistory();

  useEffect(() => {
    if (userDetail.user_type == 'AdminUser') {
     dispatch(getUsers());;
    } else {
       history.push("/")
    }
  }, [dispatch, userDetail,getUsers, history, deleteSuccess]);

  // const deleteHandler = (id) => {
  //   if (window.confirm("Are you sure ? ")) {
  //     dispatch(deleteUser(id));
  //     toast.info("User successfuly removed", {
  //       position: toast.POSITION.BOTTOM_RIGHT,
  //     });
  //   }
  // };
  /**
   * Notification
   */
  const notify = () => {
    toast.info("User successfuly removed", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  // modal

  const [show, setShow] = useState(false);
  const [userClickDelete, setUserClickDelete] = useState("");

  const [updatedUser, setupdatedUser] = useState({});
 const [showEditUser, setShowEditUser] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseEditUser  = () => setShowEditUser(false);
  const handleShowEditUser = ()=> setShowEditUser(true);
const _handleUpdateUserROle =()=>{
      //console.log(updatedUser);
      let role ={role:updatedUser.user_type} ;
      dispatch(UpdateUserRole(role,updatedUser._id))
      toast.info(
        updatedUser.name +
          " successfuly Updated",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
      if (!updateUserRoleErr){
        dispatch({type:'USER_UPDATE_REST'})
        dispatch(getUsers())
        setShowEditUser(false);
        
      }
}

  return (
    <>
    <div className="container " style={{paddingTop:'120px'}}>
      <h1 className="py-1">Users</h1>
      <div className="py-2">
        <Link to="/register">
          {" "}
          <i className="fas fa-user-plus"></i> Add User
        </Link>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>#</th>

              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length
              ? users.map((user) => (
                  <tr key={user._id}>
                    <td>{users.indexOf(user) + 1}</td>

                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.gender}</td>
                    <td>{user.user_type}</td>

                    <td>
                      <Container>
                        <Row>
                          <Col style={{padding:'0px'}}>
                             <a><i
                                className="fas fa-trash-restore text-danger"
                                onClick={() => {
                                  setUserClickDelete(user);
                                  handleShow();
                                }}></i></a> 
                        
                           

                            <Modal show={show} onHide={handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>Deleting User</Modal.Title>
                              </Modal.Header>
                              <Modal.Body style={{ color: "red" }}>
                                Are you sure to delete {userClickDelete.name} ?
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={() => {
                                    handleClose();
                                  }}
                                >
                                  Close
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() => {
                                    dispatch(deleteUser(userClickDelete._id));
                                    toast.info(
                                      userClickDelete.name +
                                        " successfuly removed",
                                      {
                                        position: toast.POSITION.BOTTOM_RIGHT,
                                      }
                                    );

                                    setShow(false);
                                  }}
                                >
                                  Ok
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </Col>


                          <Col style={{padding:'0px'}}>
                          <a><i
                                className="fas fa-user-edit text-danger"
                                onClick={() => {
                                  setupdatedUser(user);
                                  handleShowEditUser();
                                }}></i></a> 


                            <Modal show={showEditUser} onHide={handleCloseEditUser}>
                              <Modal.Header closeButton>
                                <Modal.Title>Update User Role</Modal.Title>
                              </Modal.Header>
                              <Modal.Body >
                                {updateUserRoleErr&&<p className="text-danger p-2">{updateUserRoleErr}</p>}
                                Choose the new role for:  <i>{updatedUser.name}</i> ?
                              
                               <div className="form-check">
                                  <input className="form-check-input" type="radio" value="StudentUser" name="userRole" id="StudentUser" defaultChecked
                                  onChange={(e)=>{setupdatedUser({...updatedUser,user_type:e.target.value})}}/>
                                  <label className="form-check-label" for="StudentUser" >
                                    Student
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" value="MentorUser" name="userRole" id="MentorUser"  
                                  onChange={(e)=>{setupdatedUser({...updatedUser,user_type:e.target.value})}}/>
                                  <label className="form-check-label" htmlFor="MentorUser">
                                    Mentor
                                  </label>
                                </div> 
                            


                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={() => {
                                    handleCloseEditUser();
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="success"
                                  onClick={_handleUpdateUserROle}
                                >
                                  Save Changes
                                </Button>
                              </Modal.Footer>
                            </Modal>


                          </Col>
                        </Row>
                      </Container>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </Table>
      )}
      {<ToastContainer />}
    </div></>
  );
}
