/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { getCurrGoal } from '../API/apiData';
import { useAuth } from '../utils/context/authContext';

export default function NavBarAuth({ weekUid, setWeekUid }) {
  const { user } = useAuth();
  const [goal, setGoal] = useState([]);
  const getCurrentGoal = () => {
    getCurrGoal(user.uid).then(setGoal);
  };

  useEffect(() => {
    getCurrentGoal();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  setWeekUid(goal[0]?.weekUid);

  return (
    <Navbar className="nav-bar" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container className="nav-bar-container">
        <Link passHref href="/">
          <Navbar.Brand>Body Buddy</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link className="nav-text">Goal</Nav.Link>
            </Link>
            <Link passHref href="/weeks">
              <Nav.Link className="nav-text">Weeks</Nav.Link>
            </Link>
            <Link passHref href={`/stats/${weekUid}`}>
              <Nav.Link className="nav-text">Stats</Nav.Link>
            </Link>
            <Link passHref href="/info">
              <Nav.Link className="nav-text">Info</Nav.Link>
            </Link>
          </Nav>
          <button type="button" className="signout-btn" onClick={signOut}>signout</button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavBarAuth.propTypes = {
  weekUid: PropTypes.string.isRequired,
  setWeekUid: PropTypes.string,
};

NavBarAuth.defaultProps = {
  setWeekUid: '',
};
