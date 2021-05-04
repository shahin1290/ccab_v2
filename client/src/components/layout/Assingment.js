import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
export default function Assingment({ listTask }) {
  return (
    <>
      <Card>
        <Card.Header>
          <h6> {listTask.projectName}</h6>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {listTask.description.substring(1, 50)}{" "}...
            <div className="py-2">
               <Link to={"/assignment/" + listTask._id}>
              <span style={{ color: "blue" }}> Read more </span>{" "}
            </Link>
            </div>
           
          </Card.Text>

          <Card.Text>
            <span style={{ color: "green" }}>posted:</span>
            {listTask.createdAt.split("T")[0] +
              " : " +
              listTask.createdAt.split("T")[1].split(".")[0]}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
