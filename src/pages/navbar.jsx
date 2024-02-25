import { useEffect } from "react";
import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Loading from "./loading";
import { SYSTEM_URL } from "../global";
import logo from "./deposits/logo.png";
// db password Qymbg5QhNbAzRn!

function NavBar() {
  const navigate = useNavigate();

  let navLinkClassName = "nav-link text-dark rounded border";

  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    localStorage.clear();

    setLoading(false);
    navigate("/login", { replace: true });
  }

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-sm navbar-dark  text-center rounded p-2"
        id="no-print"
      >
        <div className="container-fluid d-flex justify-content-between">
          {/* Start of the main navbar content */}
          <div>
            <Link className="navbar-brand text-primary p-2" to="/containers">
              <img src={logo} alt="" srcset="" width={50} />
            </Link>
            <button
              className="navbar-toggler bg-dark"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item rounded m-1">
                <Link className={navLinkClassName} to="/containers">
                  <h5>القاصات</h5>
                </Link>
              </li>
              <li className="nav-item rounded border-4 m-1">
                <Link className={navLinkClassName} to="/personal">
                  <h5>شخصي</h5>
                </Link>
              </li>
              <li className="nav-item rounded border-4 m-1">
                <Link className={navLinkClassName} to="/companies">
                  <h5>المشاريع</h5>
                </Link>
              </li>
              <li className="nav-item rounded border-4 m-1">
                <Link className={navLinkClassName} to="/withdraws">
                  <h5>الصرفيات</h5>
                </Link>
              </li>
              <li className="nav-item rounded border-4 m-1">
                <Link className={navLinkClassName} to="/deposits">
                  <h5>الايداعات</h5>
                </Link>
              </li>
              <li className="nav-item rounded border-4 m-1">
                <Link className={navLinkClassName} to="/withdraw_types">
                  <h5> القيود</h5>
                </Link>
              </li>
              <li className="nav-item rounded border-4 m-1">
                <Link className={navLinkClassName} to="/invoices">
                  <h5> الفواتير</h5>
                </Link>
              </li>
              <li className="nav-item rounded border-4 m-1">
                <Link className={navLinkClassName} to="/building_calcs">
                  <h5> ذرعات البنايات</h5>
                </Link>
              </li>
              <li className="nav-item rounded border-4 m-1">
                <Link className={navLinkClassName} to="/worker_calcs">
                  <h5> ذرعات الخلفات</h5>
                </Link>
              </li>
            </ul>
          </div>
          {/* End of the main navbar content */}

          {/* Start of user/logout buttons */}
          <div>
            <ul className="navbar-nav">
              <li className="nav-item btn m-1 p-2 border border-1 rounded">
                👤<b> {localStorage.getItem("username")}</b>
              </li>
              <li className="nav-item rounded m-1">
                <Link
                  className="nav-link text-light bg-danger rounded p-2 border border-3 border-danger"
                  to="/login"
                  onClick={handleLogout}
                >
                  <b>خروج</b>
                </Link>
              </li>
            </ul>
          </div>
          {/* End of user/logout buttons */}
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default NavBar;
