import {useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { HOLIDAY_TYPES } from "../commons/constants";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';

export function UpdateHolidayPage(){

    const params = useParams();
    const [error, setError] = useState();

    const [holiday, setHoliday] = useState({
        name: "",
        type: "",
        destination: "",
    });

    useEffect(() => {
        fetch('/api/v1/holidays/' + params.id)
        .then(response => response.json())
        .then(setHoliday);
}, []);


const updateHoliday = () => {
    fetch("/api/v1/holidays/" + params.id, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(holiday)
    }).then(result => {
        if (!result.ok) {
            setError('Update failed');
        } else {
            setError();
        }
    });
};


    const updateProperty = (property, event) => {
        setHoliday({
            ...holiday,
            [property]: event.target.value
        });
    };


    return(
    <Container style={{ width: "25rem" }}>
      <Card>
        <Card.Body>
            <h3>Update Holiday</h3>

            <fieldset>
                <legend>{params.id}</legend>

                {error && (<div className='error'>{error}</div>)}

                {/* <label>Name</label>
                <input value={holiday.name} onChange={(e) => updateProperty('name', e)}></input>

                <label>Type</label>
                <select value={holiday.type} onChange={(e) => updateProperty('type', e)}>
                {Object.entries(HOLIDAY_TYPES)
                    .map(([key, value]) => <option key={key} value={key}>{value}</option>)}
                </select>

                <label>Destination</label>
                <input value={holiday.destination} onChange={(e) => updateProperty('destination', e)}></input>

                <button onClick={updateHoliday}>Update</button> */}
            </fieldset>

            <Form>

      <Form.Group className="mb-3" controlId="formName">
        <Form.Label htmlFor="name">Name</Form.Label>
        <Form.Control
                value={holiday.name} onChange={(e) => updateProperty('name', e)}
              />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formType">
        <Form.Label htmlFor="type">Holiday type</Form.Label>
        <Form.Select value={holiday.type} onChange={(e) => updateProperty('type', e)}>
        {Object.entries(HOLIDAY_TYPES)
                    .map(([key, value]) => <option key={key} value={key}>{value}</option>)}
              </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDestination">
        <Form.Label htmlFor="destination">Destination</Form.Label>
        <Form.Control value={holiday.destination} onChange={(e) => updateProperty('destination', e)}/>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formType">
      <Button variant="outline-dark" onClick={updateHoliday}>
                Update
              </Button>
      </Form.Group>

    </Form>

        </Card.Body>
      </Card>
    </Container>
    )
}