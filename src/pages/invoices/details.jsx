import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SYSTEM_URL, formatDate } from "../../global";
import Loading from "../loading";
import NavBar from "../navbar";
import { useLocation } from "react-router-dom";
import logo from "../../logo.png";
function InvoiceDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [totalDinar, setTotalDinar] = useState(0);
  const [totalDollar, setTotalDollar] = useState(0);

  var columns = [];

  let x = null;
  try {
    x = JSON.parse(location.state.description);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  Object.keys(x[0]).forEach((i) => {
    columns.push({
      dataField: i,
      text: i,
    });
  });
  columns.reverse();

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 15,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
  });

  const exportToPDF = () => {
    window.print();
  };

  return (
    <>
      <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <div className="container-fluid p-4 text-end">
          <div className="container text-center ">
            <button
              className="btn btn-warning"
              onClick={exportToPDF}
              id="no-print"
            >
              طباعة
            </button>
          </div>
          <div className="container-fluid d-flex">
            <div className="container text-start">
              <img src={logo} alt="" srcset="" width={250} />
            </div>

            <div className="container text-end" style={{ fontSize: "24px" }}>
              {location.state.created_at} <br />
              {location.state.invoice_id}
            </div>
          </div>

          <div className="container text-center ">
            <h1> فاتورة حساب</h1>
          </div>

          <div className="container text-center">
            <p style={{ fontSize: "20px" }}>{location.state.title}</p>
          </div>
          {loading ? (
            "..."
          ) : (
            <BootstrapTable
              className="text-center"
              hover={true}
              bordered={true}
              bootstrap4
              keyField="id"
              columns={columns ?? []}
              data={JSON.parse(location.state.description)}
            />
          )}
        </div>
      )}

      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <td className="text-end">
                {JSON.parse(location.state.description)
                  .reduce((accumulator, currentItem) => {
                    return accumulator + Number(currentItem.total);
                  }, 0)
                  .toLocaleString("en-US", {
                    style: "currency",
                    currency: "IQD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}
              </td>
              <td className="text-end">المجموع</td>
            </tr>
          </thead>
        </table>
      </div>
      <footer className="footer">
        <div className="container text-center">
          <p>
            www.nurarch.com | IQ : +964 770 968 11 35 |TR : +90 539 77 290 77 |
            info@nurarch.com 2 nd Floor, Aamal Bld , Amerat St.11 , Mansour ,
            Baghdad, Iraq Yakuplu Mh , Gocman sk , No:1 , D:18 , Beylikduzu ,
            Istanbul , Turkey
          </p>
        </div>
      </footer>
    </>
  );
}

export default InvoiceDetailsPage;
