import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

export function HolidayListPage() {
  const [holidays, setHolidays] = useState([]);

  const fetchHolidays = async () => {
    fetch("/api/v1/holidays")
      .then((response) => response.json())
      .then((jsonResponse) => setHolidays(jsonResponse));
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const removeHoliday = (id) => {
    fetch("/api/v1/holidays/" + id, {
      method: "DELETE",
      headers: JSON_HEADERS,
    }).then(fetchHolidays);
  };

  return (
    <Container style={{ width: "32rem" }}>
      <Card>
        <Card.Body>
          <div>
            <h3>Holiday List</h3>

            <table className="">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Pavadinimas</th>
                  <th>Tipas</th>
                  <th>Kryptis</th>
                </tr>
              </thead>
              <tbody>
                {holidays.map((holiday) => (
                  <tr key={holiday.id}>
                    <td>
                      <Link to={"/holidays/view/" + holiday.id}>
                        {holiday.id}
                      </Link>
                    </td>
                    <td>{holiday.name}</td>
                    <td>{holiday.type}</td>
                    <td>{holiday.destination}</td>
                    <td>
                      <Link to={"/holidays/update/" + holiday.id}>
                        <Button variant="outline-secondary m-2">Update</Button>
                      </Link>
                      <Button
                        variant="outline-danger"
                        onClick={() => removeHoliday(holiday.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
