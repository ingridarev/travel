import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

export function HolidayAgencyMover(props) {
    const [agencies, setAgencies] = useState([]);
    const [selectedAgency, setSelectedAgency] = useState('');

    useEffect(() => {
        fetch('/api/v1/agencys')
            .then(response => response.json())
            .then(setAgencies);
    }, []);

    const assignHolidayToAgency = () => {
        fetch(`/api/v1/holidays/${props.id}/addagency?holidayId=${selectedAgency}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then((holiday) => props.onHolidayChange(holiday));
    };

    return (<div>
        <Form.Group>
            <Form.Select value={selectedAgency} onChange={(e) => setSelectedAgency(e.target.value)}>
            <option value=''>---</option>
            {
                agencies.map(
                    (agency) => (<option key={agency.id} value={agency.id}>{agency.name}</option>)
                )
            }
        </Form.Select>
      </Form.Group>
        <Button variant="outline-dark m-2" onClick={assignHolidayToAgency}>Assign</Button>
    </div>);
}