import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Presentation from "./Presentation";
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import FDAdmit from "./FDAdmit";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";
import FDAppoint from "./FDAppoint";
import AdmPatients from "./AdmPatients";
import Doctors from "./Doctors";
import Doc_Patient_List from "./Doc_Patient_List";
import Sidebar_admin from "../components/Sidebar_admin";
import Sidebar_doc from "../components/Sidebar_doc";
import Sidebar_patient_data from "../components/Sidebar_patient_data";
import PTest from "../components/PTest";
import PTreatment from "../components/PTreatment";
import PDose from "../components/PDose";
import PStay from "../components/PStay";
import AddBlock from "../components/AddBlock";
import AddRoom from "../components/AddRoom";
import AddMedication from "../components/AddMedication";
import AddProcedure from "../components/AddProcedure";
import PQuery from "../components/PQuery";
import Doc_Patient_Query from "./Doc_Patient_Query";
import DocMedication from "../components/DocMedication";
import DocTreatment from "../components/DocTreatment";
import { DocsignUp } from "../components/doctor_signup";
import Admin_Doc_add from "./Admin_Doc_add";
import Admin_del from "./Admin_del";
import Admin_Op_add from "./Admin_Op_add";
import Doc_Slot from "./Doc_Slot";
import operators from "./operators";
import { MedicationList } from "../components/Widgets";
import room_block from "./room_block";
import Procedures from "./Procedures";
import { DocAddSlot } from "../components/Doc_add_slot";
// import Doc_Slot_add from '../Doc_Slot_Add';

// documentation pages
import AboutUs from "./documentation/AboutUs";
import ContactUs from "./documentation/ContactUs";
import History from "./documentation/History";
import Vision from "./documentation/Vision";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/Doctors";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";
import patients from "./patients";
import medicines from "./medicines";
import invoicePdf from "../components/invoicePdf.js";
import invoiceHandler from "./invoiceHandler";
import ViewTests from "./ViewTests";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />

          <main className="content">
            {/* <Navbar /> */}
            <br />
            <Component {...props} />
            <br />
          </main>
        </>
      )}
    />
  );
};

const RouteWithSidebarAdmin = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar_admin />

          <main className="content">
            {/* <Navbar /> */}
            <br />
            <Component {...props} />
            <br />
          </main>
        </>
      )}
    />
  );
};

const RouteWithSidebarDoc = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar_doc />

          <main className="content">
            {/* <Navbar /> */}
            <br />
            <Component {...props} />
            <br />
          </main>
        </>
      )}
    />
  );
};

const RouteWithSidebarData = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar_patient_data />

          <main className="content">
            {/* <Navbar /> */}
            <br />
            <Component {...props} />
            <br />
          </main>
        </>
      )}
    />
  );
};

export default () => (
  <Switch>
    <RouteWithLoader
      exact
      path={Routes.Presentation.path}
      component={Presentation}
    />
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader
      exact
      path={Routes.ForgotPassword.path}
      component={ForgotPassword}
    />
    <RouteWithLoader
      exact
      path={Routes.ResetPassword.path}
      component={ResetPassword}
    />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader
      exact
      path={Routes.NotFound.path}
      component={NotFoundPage}
    />
    <RouteWithLoader
      exact
      path={Routes.ServerError.path}
      component={ServerError}
    />

    {/* Operators */}
    <RouteWithSidebar
      exact
      path={Routes.DashboardOverview.path}
      component={DashboardOverview}
    />
    <RouteWithSidebar
      exact
      path={Routes.Dashboards.path1}
      component={DashboardOverview}
    />
    {/* <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} /> */}
    <RouteWithSidebar
      exact
      path={Routes.Transactions.path}
      component={Transactions}
    />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar exact path={Routes.AdmPatients.path} component={AdmPatients} />
    <RouteWithSidebar exact path={Routes.FDAdmit.path} component={FDAdmit} />
    <RouteWithSidebar exact path={Routes.AdmPatients.path} component={AdmPatients} />
    <RouteWithSidebar
      exact
      path={Routes.Patients.path}
      component={patients}
    />
    <RouteWithSidebar
      exact
      path={Routes.FDAppoint.path}
      component={FDAppoint}
    />
    <RouteWithSidebar exact path={Routes.Doctors.path} component={Doctors} />
    <RouteWithSidebar
      exact
      path={Routes.BootstrapTables.path}
      component={BootstrapTables}
    />

    {/*Admin*/}
    <RouteWithSidebarAdmin
      exact
      path={Routes.DashboardOverview.path2}
      component={DashboardOverview}
    />
    <RouteWithSidebarAdmin
      exact
      path={Routes.Dashboards.path2}
      component={DashboardOverview}
    />
    <RouteWithSidebarAdmin
      exact
      path={Routes.Doc_add.path}
      component={Admin_Doc_add}
    />
    <RouteWithSidebarAdmin
      exact
      path={Routes.Usr_del.path}
      component={Admin_del}
    />
    <RouteWithSidebarAdmin
      exact
      path={Routes.Doc_show.path}
      component={Doctors}
    />
    <RouteWithSidebarAdmin
      exact
      path={Routes.Op_add.path}
      component={Admin_Op_add}
    />
    <RouteWithSidebarAdmin
      exact
      path={Routes.Op_show.path}
      component={operators}
    />

    {/*Data Entry*/}
    <RouteWithSidebarData
      exact
      path={Routes.DashboardOverview.path4}
      component={DashboardOverview}
    />
    <RouteWithSidebarData exact path={Routes.Doctors.path3} component={Doctors} />
    <RouteWithSidebarData
      exact
      path={Routes.Dashboards.path4}
      component={DashboardOverview}
    />
    <RouteWithSidebarData
      exact
      path={Routes.PatientTest.path}
      component={PTest}
    />
    <RouteWithSidebarData
      exact
      path={Routes.PatientTreatment.path}
      component={PTreatment}
    />
    <RouteWithSidebarData
      exact
      path={Routes.PatientDose.path}
      component={PDose}
    />
    <RouteWithSidebarData
    exact
    path={Routes.Tests.path}
    component = {ViewTests}
    />
    <RouteWithSidebarData
      exact
      path={Routes.MedicineShow.path2}
      component={medicines}
    />
    <RouteWithSidebarData
      exact
      path={Routes.PatientStay.path}
      component={PStay}
    />
    <RouteWithSidebarData
      exact
      path={Routes.AddProcedure.path}
      component={Procedures}
    />
    <RouteWithSidebarData
      exact
      path={Routes.AddMedication.path}
      component={AddMedication}
    />
    <RouteWithSidebarData
      exact
      path={Routes.AddRoom.path}
      component={room_block}
    />
    <RouteWithSidebarData
      exact
      path={Routes.AddBlock.path}
      component={AddBlock}
    />

    <RouteWithSidebarData
      exact
      path={Routes.Patients.path2}
      component={patients}
    />

    <RouteWithSidebarData exact path={Routes.AdmPatients.path2} component={AdmPatients} />

    {/*Doctors*/}
    <RouteWithSidebarDoc
      exact
      path={Routes.DashboardOverview.path3}
      component={DashboardOverview}
    />
    <RouteWithSidebarDoc
      exact
      path={Routes.Dashboards.path3}
      component={DashboardOverview}
    />
    <RouteWithSidebarDoc
      exact
      path={Routes.PatientShow.path2}
      component={Doc_Patient_List}
    />
    <RouteWithSidebarDoc
      exact
      path={Routes.Doc_Slot.path}
      component={Doc_Slot}
    />
    <RouteWithSidebarDoc
      exact
      path={Routes.PQuery.path}
      component={Doc_Patient_Query}
    />
    <RouteWithSidebarDoc
      exact
      path={Routes.MedicineShow.path}
      component={medicines}
    />
    <RouteWithSidebarDoc
    exact
    path={Routes.Tests.path2}
    component = {ViewTests}
    />

    <RouteWithSidebarDoc
      exact
      path={Routes.DocMedication.path}
      component={DocMedication}
    />
    <RouteWithSidebarDoc
      exact
      path={Routes.DocTreatment.path}
      component={DocTreatment}
    />
    <RouteWithSidebarDoc exact path={Routes.AdmPatients.path3} component={AdmPatients} />

    {/* components */}
    <RouteWithSidebar
      exact
      path={Routes.Accordions.path}
      component={Accordion}
    />
    <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
    <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
    <RouteWithSidebar
      exact
      path={Routes.Breadcrumbs.path}
      component={Breadcrumbs}
    />
    <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
    <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
    <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
    <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
    <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
    <RouteWithSidebar
      exact
      path={Routes.Pagination.path}
      component={Pagination}
    />
    <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
    <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
    <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
    <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
    <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
    <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />

    {/* documentation */}
    <RouteWithLoader exact path={Routes.AboutUs.path} component={AboutUs} />
    <RouteWithLoader
      exact
      path={Routes.ContactUs.path}
      component={ContactUs}
    />
    <RouteWithLoader exact path={Routes.History.path} component={History} />
    <RouteWithLoader exact path={Routes.Vision.path} component={Vision} />
    <RouteWithSidebar
      exact
      path={Routes.DocsFolderStructure.path}
      component={DocsFolderStructure}
    />
    <RouteWithLoader exact path={Routes.DocsBuild.path} component={DocsBuild} />
    <RouteWithSidebar
      exact
      path={Routes.DocsChangelog.path}
      component={DocsChangelog}
    />
    <RouteWithSidebar exact path = '/get/invoice/:id' component = {invoiceHandler} />

    <Redirect to={Routes.Presentation.path} />
  </Switch>
);
