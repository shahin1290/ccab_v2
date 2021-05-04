import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Message from "../layout/Message";
import { TASK_ADD_REST } from "../../redux/constences/taskConst";
import {getTaskDetails,createTask,getTaskList,} from "../../redux/actions/taskAction";
import Loader from "../layout/Loader";
import Assignment from "../layout/Assingment";

export default function AssignmentScreen() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");

  const taskCreate = useSelector((state) => state.taskCreate);
  const { success: createSuccess, task } = taskCreate;
  //   console.log("task: ", task);

  const [succ, setSucc] = useState(createSuccess);
  // const array1 = [1, 2, 3, 4];
  // const reducer = (accumulator, currentValue) => accumulator + currentValue;

  // We need to verify the user is logged in
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = userLogin;

  const dispatch = useDispatch();
  const history = useHistory();
  // const taskDetails = useSelector((state) => state.taskDetails);
  // const { taskes, loading, error } = taskDetails;
  //   console.log("taskes", taskes);

  const taskList = useSelector((state) => state.taskList);
  const {
    tasks: listTaskes,
    loading: listLoading,
    error: listError,
  } = taskList;

  console.log(listTaskes);

  useEffect(() => {
    if (!userDetail) {
      history.push("/");
    }
    dispatch(getTaskList('6082ec902fd5dd19fe2fb186'));
  }, [dispatch, userDetail, history]);

  const submitHanlder = (e) => {
    e.preventDefault();
    dispatch(
      createTask({
        projectName,
        description,
        projectLink,
        _id: userDetail._id,
      })
    );

    setProjectName("");
    setDescription("");
    setProjectLink("");
  };




  return (
    <Container>
      <h1 className="">Assignments</h1>

      <Row>
        {listLoading ? (
          <Loader />
        ) : listError ? (
          <Message>{listError}</Message>
        ) : listTaskes.length ? (
          listTaskes
            .map((listTask) => (
              <Col lg={12} md={12} sm={12} key={listTask._id} className="py-3">
                <Assignment listTask={listTask} />
              </Col>
            ))
            .reverse()
        ) : (
          ""
        )}
      </Row>
    </Container>
  );
}
