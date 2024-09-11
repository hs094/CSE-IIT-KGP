import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBoxOpen,
  faChartPie,
  faCog,
  faFileAlt,
  faHandHoldingUsd,
  faSignOutAlt,
  faTable,
  faTimes,
  faCalendarAlt,
  faMapPin,
  faInbox,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Badge,
  Image,
  Button,
  Dropdown,
  Accordion,
  Navbar,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../routes";
import ThemesbergLogo from "../assets/img/themesberg.svg";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";
import { FRONTEND_URL } from "../constants.js";

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button
            as={Nav.Link}
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">{children}</Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const {
      title,
      link,
      size,
      type,
      spl,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={20}
                height={20}
                className="sidebar-icon svg-icon"
              />
            ) : null}

            <span
              className="sidebar-text"
              style={{ fontSize: size, fontWeight: type }}
            >
              {title}
            </span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2"
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.assign(`${FRONTEND_URL}/sign-in`);
  };

  return (
    <>
      <Navbar
        expand={false}
        collapseOnSelect
        variant="dark"
        className="navbar-theme-primary px-4 d-md-none"
      >
        <Navbar.Brand
          className="me-lg-5"
          as={Link}
          to={Routes.DashboardOverview.path}
        >
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle
          as={Button}
          aria-controls="main-navbar"
          onClick={onCollapse}
        >
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={100} in={show} classNames="sidebar-transition">
        <SimpleBar
          className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}
        >
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image
                    src={ReactHero}
                    className="card-img-top rounded-circle border-white"
                  />
                </div>
                <div className="d-block">
                  <h5>Global Hospitals</h5>
                </div>
              </div>
              <Nav.Link
                className="collapse-close d-md-none"
                onClick={onCollapse}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              {!show && (
                <NavItem
                  title="Global Hospitals"
                  size="20px"
                  type="bold"
                  image={ReactHero}
                />
              )}
              <Dropdown.Divider className="my-3 border-indigo" />
              <NavItem
                title="Your Profile"
                link={Routes.DashboardOverview.path4}
                icon={faChartPie}
              />
              <NavItem
                title="Patient Tests"
                icon={faChartPie}
                link={Routes.PatientTest.path}
              />
              <NavItem
                title="Patient Treatments"
                icon={faChartPie}
                link={Routes.PatientTreatment.path}
              />
              <NavItem
                title="Patient Doses"
                icon={faChartPie}
                link={Routes.PatientDose.path}
              />
              
              <NavItem
                title="Add Procedures"
                icon={faChartPie}
                link={Routes.AddProcedure.path}
              />
              <NavItem
                title="Add Medications"
                icon={faChartPie}
                link={Routes.AddMedication.path}
              />
              <NavItem
                title="Add Rooms & Blocks"
                icon={faChartPie}
                link={Routes.AddRoom.path}
              />
              <NavItem
                title="Show Medications"
                icon={faChartPie}
                link={Routes.MedicineShow.path2}
              />

              <NavItem title="Patients on Treatment" icon={faChartPie} link={Routes.AdmPatients.path2} />

              <NavItem title="Doctors List" icon={faChartPie} link={Routes.Doctors.path3} />
              <NavItem title="All Patients List" icon={faChartPie} link={Routes.Patients.path2} />
              <NavItem title="All Tests List" icon={faChartPie} link={Routes.Tests.path} />
              <Button
                as={Link}
                onClick={handleSignOut}
                variant="secondary"
                className="upgrade-to-pro"
              >
                <FontAwesomeIcon icon={faRocket} className="me-1" /> SignOut{" "}
              </Button>
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
