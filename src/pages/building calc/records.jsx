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

function BuildingCalcsPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [totalDinar, setTotalDinar] = useState(0);
  const [totalDollar, setTotalDollar] = useState(0);

  async function loadData() {
    setLoading(true);
    await fetch(SYSTEM_URL + "get_all_building_calc/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.map((i) => {
          i.created_at = formatDate(new Date(i.created_at));
        });
        setData(data);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    {
      dataField: "created_at",
      text: "تاريخ الانشاء",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "title",
      text: " عنوان الفاتورة",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "invoice_id",
      text: " رقم الفاتورة",
      sort: true,
      filter: textFilter(),
    },
  ];

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      navigate("/building_calc_details", {
        state: {
          id: row.id,
          title: row.title,
          description: row.description,
          created_at: row.created_at,
          invoice_id: row.invoice_id,
        },
      });
    },
  };

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
  });

  return (
    <>
      <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <div
          className="container-fluid"
          style={{ margin: "0px", padding: "0px" }}
        >
          <div className="container text-center ">
            <h1> صفحة ذرعات البنايات</h1>
          </div>

          <div className="container text-center">
            <div
              className="btn btn-dark text-light p-2 mt-2 mb-2"
              onClick={() => {
                navigate("/add_building_calc");
              }}
              style={{
                display:
                  localStorage.getItem("user_type") === "view"
                    ? "none"
                    : "block",
              }}
            >
              <h4>أضافة </h4>
            </div>
          </div>

          {/* <div className="container text-center">
            <table className="table table-strpied table-hover ">
              <tbody>
                <tr>
                  <td className="text-end">
                    {totalDinar.toLocaleString("en-US", {
                      style: "currency",
                      currency: "IQD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td>مجموع الدينار</td>
                </tr>
                <tr>
                  <td className="text-end">
                    {totalDollar.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td>مجموع الدولار</td>
                </tr>
              </tbody>
            </table>
          </div> */}
          <div
            className="container-fluid"
            style={{ overflowX: "auto", margin: "0px", padding: "0px" }}
          >
            <BootstrapTable
              hover={true}
              bordered={true}
              bootstrap4
              keyField="id"
              columns={columns}
              data={data}
              pagination={pagination}
              filter={filterFactory()}
              rowEvents={rowEvents}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default BuildingCalcsPage;
