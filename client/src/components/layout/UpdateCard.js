// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import {
//   Col,
//   Container,
//   Modal,
//   Row,
//   Form,
//   Button,
//   Table,
//   Card,
// } from "react-bootstrap";
// import Loader from "../layout/Loader";
// import {
//   userProfileUpdate,
//   getUserDetails,
// } from "../../redux/actions/userAction";
// import Message from "../layout/Message";
// import { USER_PROFILE_UPDATE_REST } from "../../redux/constences/userConst";
// export default function UpdateCard() {
//   const dispatch = useDispatch();

//   // user must be logged in before!!!
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userDetail, loginSuccess } = userLogin;
//   // console.log("userDetail: ",userDetail)

//   const [loginSucc, setLoginSucc] = useState(loginSuccess);
//   // Getting user Details
//   const userDetails = useSelector((state) => state.userDetails);
//   const { loading, user, error } = userDetails;

//   // console.log("user ", user);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPass, setConfirmPass] = useState("");
//   const [message, setMessage] = useState(null);

//   // updating process
//   const userUpdate = useSelector((state) => state.userUpdate);
//   const { updateSuccess } = userUpdate;

//   const sumbitHandler = (e) => {
//     e.preventDefault();
//     if (password !== confirmPass) {
//       setMessage("passwords do not match!");
//     } else {
//       dispatch(userProfileUpdate({ id: user._id, name, email, password }));
//     }
//   };

//   return (
//     <>
//       <h3 style={{ color: "#1f9bcf" }}>Update Profile</h3>

//       {loading && <Loader />}
//       {error && <Message>{error}</Message>}
//       {message && <Message variant="danger">Password do not match!</Message>}
//       {updateSuccess &&
//         toast.info("Profile succefully updated!", {
//           position: toast.POSITION.TOP_LEFT,
//         })}
//       <Form onSubmit={sumbitHandler}>
//         <Form.Group controlId="name">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter name"
//             value={name}
//             onChange={(e) => {
//               setName(e.target.value);
//             }}
//           ></Form.Control>
//         </Form.Group>
//         <Form.Group controlId="formBasicEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//           />
//         </Form.Group>

//         <Form.Group controlId="passOne">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Password"
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//           />
//         </Form.Group>
//         <Form.Group controlId="passTwo">
//           <Form.Label>Repeat password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Repeat password"
//             onChange={(e) => {
//               setConfirmPass(e.target.value);
//             }}
//           />
//         </Form.Group>

//         <Button variant="info" type="submit" block>
//           update
//         </Button>
//       </Form>
//     </>
//   );
// }
