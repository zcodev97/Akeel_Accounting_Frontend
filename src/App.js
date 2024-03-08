import NoPage from "./pages/NoPage";
import LoginPage from "./pages/login";
import ContainersPage from "./pages/containers/records";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ContainerDetailsPage from "./pages/containers/details";
import CompaniesPage from "./pages/companies/records";
import CompanyDetailsPage from "./pages/companies/details";
import WithdrawsPage from "./pages/withdraws/records";
import DepositsPage from "./pages/deposits/records";
import AddContainerPage from "./pages/containers/add";
import AddCompanyPage from "./pages/companies/add";
import AddWithdrawPage from "./pages/withdraws/add";
import AddDepositPage from "./pages/deposits/add";
import DepositDetailsPage from "./pages/deposits/details";
import WithDrawDetialsPage from "./pages/withdraws/details";
import PersonTypePage from "./pages/withdraw_types/records";
import AddPersonTypePage from "./pages/withdraw_types/add";
import WithDrawReportPage from "./pages/withdraws/report";
import DepositsReportPage from "./pages/deposits/report";
import PersonalCompaniesPage from "./pages/personal/records";
import AddPersonalPage from "./pages/personal/add";
import InvoiceDetialsPage from "./pages/invoices/details";
import AddInvoicePage from "./pages/invoices/add";
import InvoicesPage from "./pages/invoices/records";
import BuildingCalcDetailsPage from "./pages/building calc/details";
import AddBuildingCalcPage from "./pages/building calc/add";
import BuildingCalcsPage from "./pages/building calc/records";
import WorkerCalcDetailsPage from "./pages/worker calc/details";
import AddWorkerCalcPage from "./pages/worker calc/add";
import WorkerCalcsPage from "./pages/worker calc/records";
import PersonalWithdrawsPage from "./pages/personal_withdraw/records";
import PersonalWithDrawDetialsPage from "./pages/personal_withdraw/details";
import AddPersonalWithdrawPage from "./pages/personal_withdraw/add";
import PersonalWithDrawReportPage from "./pages/personal_withdraw/report";
import { useEffect, useState } from "react";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Add event listeners for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Clean up event listeners when the component unmounts
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      {isOnline ? (
        <div className="App">
          <div className="container-fluid bg-white" style={{ height: "100vh" }}>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    localStorage.getItem("token") === null ||
                    localStorage.getItem("token") === undefined ? (
                      <LoginPage />
                    ) : (
                      <ContainersPage />
                    )
                  }
                />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/containers" element={<ContainersPage />} />
                <Route
                  path="/container_details"
                  element={<ContainerDetailsPage />}
                />
                <Route path="/add_container" element={<AddContainerPage />} />
                <Route path="/companies" element={<CompaniesPage />} />
                <Route path="/personal" element={<PersonalCompaniesPage />} />
                <Route path="/add_personal" element={<AddPersonalPage />} />
                <Route
                  path="/company_details"
                  element={<CompanyDetailsPage />}
                />
                <Route path="/add_company" element={<AddCompanyPage />} />
                <Route
                  path="/personal_withdraws"
                  element={<PersonalWithdrawsPage />}
                />
                <Route
                  path="/personal_withdraw_details"
                  element={<PersonalWithDrawDetialsPage />}
                />
                <Route
                  path="/add_personal_withdraw"
                  element={<AddPersonalWithdrawPage />}
                />
                <Route
                  path="/personal_withdraw_report"
                  element={<PersonalWithDrawReportPage />}
                />

                <Route path="/withdraws" element={<WithdrawsPage />} />
                <Route
                  path="/withdraw_details"
                  element={<WithDrawDetialsPage />}
                />
                <Route path="/withdraw_types" element={<PersonTypePage />} />
                <Route
                  path="/add_withdraw_type"
                  element={<AddPersonTypePage />}
                />
                <Route path="/add_withdraw" element={<AddWithdrawPage />} />
                <Route
                  path="/withdraw_report"
                  element={<WithDrawReportPage />}
                />
                <Route
                  path="/deposits_report"
                  element={<DepositsReportPage />}
                />
                {/*  */}
                <Route path="/deposits" element={<DepositsPage />} />
                <Route
                  path="/deposit_details"
                  element={<DepositDetailsPage />}
                />
                <Route path="/add_deposit" element={<AddDepositPage />} />

                {/* invoices */}
                <Route
                  path="/invoice_details"
                  element={<InvoiceDetialsPage />}
                />
                <Route path="/add_invoice" element={<AddInvoicePage />} />
                <Route path="/invoices" element={<InvoicesPage />} />

                {/* building calc  */}
                <Route
                  path="/building_calc_details"
                  element={<BuildingCalcDetailsPage />}
                />
                <Route
                  path="/add_building_calc"
                  element={<AddBuildingCalcPage />}
                />
                <Route path="/building_calcs" element={<BuildingCalcsPage />} />

                {/* worker calc */}
                <Route
                  path="/worker_calc_details"
                  element={<WorkerCalcDetailsPage />}
                />
                <Route
                  path="/add_worker_calc"
                  element={<AddWorkerCalcPage />}
                />
                <Route path="/worker_calcs" element={<WorkerCalcsPage />} />
                {/*  */}
                <Route path="*" element={<NoPage />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      ) : (
        <div
          className="container text-center text-danger border rounded  mt-4 d-flex"
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: window.innerHeight,
          }}
        >
          <p> لايوجد اتصال انترنت </p>
        </div>
      )}
    </>
  );
}

export default App;
