import './Menu.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function Menu() {
    return (<div className="Menu">
        <Link to='/'><Button variant="outline-secondary m-2">Holiday List</Button></Link>
        <Link to='/create'><Button variant="outline-secondary">Create New Holiday</Button></Link>
    </div>);
}