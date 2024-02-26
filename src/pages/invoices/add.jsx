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

function AddInvoicePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);

  const [totalDepositsDinar, setTotalDepositsDinar] = useState(0);
  const [totalDepositsDollar, setTotalDepositsDollar] = useState(0);

  async function addInvoice() {
    setLoading(true);

    await fetch(SYSTEM_URL + "create_invoice/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      body: JSON.stringify({
        title: invoiceTitle,
        description:
          rows.length > 0 ? JSON.stringify(rows) : JSON.stringify([{ x: "x" }]),
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        alert("تم اضافة سجل ");
        navigate("/invoices", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        alert(error + "😕");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const [invoiceTitle, setInvoiceTitle] = useState("");

  const [rows, setRows] = useState([
    { title: "", count: "", price: "", total: "" },
  ]);

  const addRow = () => {
    setRows([...rows, { title: "", count: "", price: "", total: "" }]);
  };

  const deleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleChange = (index, key, value) => {
    const newRows = [...rows];
    newRows[index][key] = value;

    // Update the total price when count or price changes
    if (key === "count" || key === "price") {
      const count = parseInt(newRows[index]["count"]) || 0;
      const price = parseFloat(newRows[index]["price"]) || 0;
      newRows[index]["total"] = (count * price).toFixed(2);
    }

    setRows(newRows);
  };

  const getDataAsJSON = () => {
    console.log(rows);
    return JSON.stringify(rows);
  };

  return (
    <>
      <NavBar />
      <div className="container text-center" style={{ fontSize: "24px" }}>
        صفحة اضافة فاتورة
      </div>
      <div className="container text-center  mt-2 mb-2">
        <p style={{ fontSize: "20px" }}>عنوان الفاتورة</p>
        <input
          className="form-control"
          type="text"
          dir="rtl"
          value={invoiceTitle}
          onChange={(e) => setInvoiceTitle(e.target.value)}
        />
      </div>
      <div className="container-fluid" style={{ overflowX: "auto" }}>
        <div className="container-fluid text-center">
          <table className="table text-center">
            <thead>
              <tr>
                <th>Action</th>
                <th>Total</th>
                <th>Count</th>
                <th>Price</th>

                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <button
                      className="btn btn-light text-danger"
                      onClick={() => deleteRow(index)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <div className="container">{row.total}</div>
                  </td>
                  <td>
                    <input
                      dir="rtl"
                      type="number"
                      value={row.count}
                      onChange={(e) =>
                        handleChange(index, "count", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      dir="rtl"
                      type="number"
                      value={row.price}
                      onChange={(e) =>
                        handleChange(index, "price", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      dir="rtl"
                      value={row.title}
                      onChange={(e) =>
                        handleChange(index, "title", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="container text-center">
        <button className="btn btn-success" onClick={addRow}>
          اضافة حقل
        </button>
      </div>

      <hr />
      <div className="container text-center">
        <button className="btn btn-success" onClick={addInvoice}>
          حفظ الفاتورة
        </button>
      </div>
    </>
  );
}
export default AddInvoicePage;
