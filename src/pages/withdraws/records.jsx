import { useEffect, useState } from "react";
import { SYSTEM_URL, formatDate } from "../../global";
import NavBar from "../navbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import Loading from "../loading";

function WithdrawsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [withdraws, setWithdraws] = useState([]);
  const [totalWithdrawsDinar, setTotalWithdrawsDinar] = useState(0);
  const [totalWithdrawsDollar, setTotalWithdrawsDollar] = useState(0);

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

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      navigate("/withdraw_details", {
        state: {
          invoice_id: row.invoice_id,
          container: row.container,
          company_name: row.company_name,
          price_in_dinar: row.price_in_dinar,
          price_in_dollar: row.price_in_dollar,
          description: row.description,
          withdraw_type: row.withdraw_type,
          created_at: row.created_at,
          out_to: row.out_to,
        },
      });
    },
  };

  async function loadAdminWithdraws() {
    setLoading(true);
    await fetch(SYSTEM_URL + "withdraws/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let filtered_data = data.filter(
          (i) => i.withdraw_type?.title !== "شخصي"
        );

        setTotalWithdrawsDinar(
          filtered_data.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price_in_dinar;
          }, 0)
        );

        setTotalWithdrawsDollar(
          filtered_data.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price_in_dollar;
          }, 0)
        );
        filtered_data.map((i) => {
          i.price_in_dinar = i.price_in_dinar.toLocaleString("en-US", {
            style: "currency",
            currency: "IQD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          });

          i.price_in_dollar = i.price_in_dollar.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          });

          i.created_at = formatDate(new Date(i.created_at));
          i.company_name = i.company_name.title;
          i.container = i.container.name;
          i.withdraw_type = i.withdraw_type.title;
        });
        setWithdraws(filtered_data);
      })
      .catch((error) => {
        alert(error);
      });
    setLoading(false);
  }

  async function loadWithdraws() {
    setLoading(true);
    await fetch(
      SYSTEM_URL + "company_withdraws/" + localStorage.getItem("company_id"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setTotalWithdrawsDinar(
          data.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price_in_dinar;
          }, 0)
        );

        setTotalWithdrawsDollar(
          data.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price_in_dollar;
          }, 0)
        );
        data.map((i) => {
          i.price_in_dinar = i.price_in_dinar.toLocaleString("en-US", {
            style: "currency",
            currency: "IQD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          });

          i.price_in_dollar = i.price_in_dollar.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          });

          i.created_at = formatDate(new Date(i.created_at));
          i.company_name = i.company_name.title;
          i.container = i.container.name;
          i.withdraw_type = i.withdraw_type.title;
        });
        setWithdraws(data);
      })
      .catch((error) => {
        alert(error);
      });
    setLoading(false);
  }

  const withdrawsColumns = [
    {
      dataField: "created_at",
      text: "تاريخ الانشاء",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "description",
      text: "التفاصيل",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "price_in_dollar",
      text: "مبلغ الدولار",
      sort: true,
      filter: textFilter(),
    },

    {
      dataField: "price_in_dinar",
      text: "مبلغ الدينار",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "out_to",
      text: "الى",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "withdraw_type",
      text: "نوع القيد",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "company_name",
      text: "اسم المشروع",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "container",
      text: "القاصة",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "withdraw_number",
      text: "تسلسل ",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "invoice_id",
      text: "تسلسل السجل",
      sort: true,
      filter: textFilter(),
    },
  ];
  useEffect(() => {
    localStorage.getItem("user_type") === "supervisor"
      ? loadWithdraws()
      : loadAdminWithdraws();
  }, []);
  return (
    <>
      <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <>
          {localStorage.getItem("user_type") === "supervisor" ? (
            <>
              <div className="container text-center">
                <h3> {localStorage.getItem("company_name")}</h3>
              </div>
            </>
          ) : (
            <></>
          )}
          <hr />
          <div className="container text-center">
            <h1 className="text-danger "> الصرفيات</h1>
          </div>
          <div className="container text-center">
            <div
              className="btn btn-primary m-2"
              onClick={() => {
                navigate("/add_withdraw");
              }}
              style={{
                display:
                  localStorage.getItem("user_type") === "view"
                    ? "none"
                    : "inline-block",
              }}
            >
              <b> اضافة</b>
            </div>
            <div
              className="btn btn-success m-2"
              onClick={() => {
                navigate("/withdraw_report");
              }}
            >
              <b> تقرير </b>
            </div>
          </div>

          <div className="container text-center">
            <table className="table table-strpied table-hover ">
              <tbody>
                <tr>
                  <td className="text-end">
                    {totalWithdrawsDinar.toLocaleString("en-US", {
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
                    {totalWithdrawsDollar.toLocaleString("en-US", {
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

          <div className="container-fluid" style={{ overflowX: "auto" }}>
            <BootstrapTable
              className="text-center"
              hover={true}
              bordered={true}
              bootstrap4
              keyField="id"
              columns={withdrawsColumns}
              data={withdraws}
              pagination={pagination}
              rowEvents={rowEvents}
              filter={filterFactory()}
            />
          </div>
        </>
      )}
    </>
  );
}
export default WithdrawsPage;
