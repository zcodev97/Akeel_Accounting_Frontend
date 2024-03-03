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

function PersonalCompaniesPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [totalDinar, setTotalDinar] = useState(0);
  const [totalDollar, setTotalDollar] = useState(0);

  async function loadData() {
    setLoading(true);
    await fetch(SYSTEM_URL + "companies/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let filtered_data = data.filter(
          (i) => i.company_type?.title === "شخصي"
        );

        setTotalDinar(
          filtered_data.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.total_dinar;
          }, 0)
        );

        setTotalDollar(
          filtered_data.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.total_dollar;
          }, 0)
        );
        filtered_data.map((i) => {
          i.total_dinar = i.total_dinar.toLocaleString("en-US", {
            style: "currency",
            currency: "IQD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          });

          i.company_type = i.company_type?.title;

          i.total_dollar = i.total_dollar.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          });

          i.supervisor = i.supervisor.username;

          i.created_at = formatDate(new Date(i.created_at));
          i.container = i.container.name;
        });

        setData(filtered_data);
      })
      .catch((error) => {
        alert(error);
      });
    setLoading(false);
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
      dataField: "total_dollar",
      text: "مبلغ الدولار",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "total_dinar",
      text: "مبلغ الدينار",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "container",
      text: "قاصة",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "supervisor",
      text: "المسؤول",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "title",
      text: "اسم المشروع",
      sort: true,
      filter: textFilter(),
    },
  ];

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      navigate("/company_details", {
        state: {
          id: row.id,
          name: row.title,
          total_dinar: row.total_dinar,
          total_dollar: row.total_dollar,
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
            <h1> شخصي</h1>
          </div>

          <div className="container text-center">
            <div
              className="btn btn-dark text-light p-2 mt-2 mb-2"
              onClick={() => {
                navigate("/add_personal");
              }}
              style={{
                display:
                  localStorage.getItem("user_type") === "view"
                    ? "none"
                    : "inline-block",   
              }}
            >
              <h4>أضافة </h4>
            </div>
          </div>

          <div className="container-fluid text-center">
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
          </div>

          <div
            className="container-fluid"
            style={{ overflowX: "auto", margin: "0px", padding: "0px" }}
          >
            <BootstrapTable
              className="text-center"
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

export default PersonalCompaniesPage;
