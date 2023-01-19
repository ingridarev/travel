import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HolidayAgencyMover } from "../components/HolidayAgencyMover";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

export function ViewHoliday() {
  const [holiday, setHoliday] = useState({});

  const params = useParams();

  useEffect(() => {
    fetch("/api/v1/holidays/" + params.id)
      .then((response) => response.json())
      .then(setHoliday);
  }, [params.id]);

  return (
    <Container style={{ width: "25rem" }}>
      <Card>
        <Card.Body>
          <div>
            <b>ID</b>
          </div>
          <div>{holiday.id}</div>

          <div>
            <b>Name</b>
          </div>
          <div>{holiday.name}</div>

          <div>
            <b>Type</b>
          </div>
          <div>{holiday.type}</div>

          <div>
            <b>Description</b>
          </div>
          <div>{holiday.description}</div>

          <div>
            <b>Agency</b>
          </div>
          <div>{holiday.agency && holiday.agency.name}</div>

          <HolidayAgencyMover id={params.id} onHolidayChange={setHoliday} />
        </Card.Body>
      </Card>
    </Container>
  );
}
