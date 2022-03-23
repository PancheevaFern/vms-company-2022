import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

import style from "../mystyle.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function QuotationTable({ data, clearDataItems, updateDataItems, saveQuotationItems}) {
  // const [dataItems, setDataItems] = useState(data);
  const [dataRows, setDataRows] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    const z = data.map((v, i) => {
      let amount = v.qty * v.price;
      sum += amount;
      return (
        <tr key={i}>
          <td className={style.textCenter}>
            <FaTrashAlt onClick={() => deleteItem(v.code, v.price)} />
          </td>
          <td className={style.textCenter}>{v.qty}</td>
          <td>{v.name}</td>
          <td className={style.textCenter}>{formatNumber(v.price)}</td>
          <td className={style.textRight}>{formatNumber(amount)}</td>
        </tr>
      );
    });

    setDataRows(z);
    setTotal(sum);
  }, [data]);

  const deleteItem = (code) => {
    var z = data.filter((value, index, arr) => value.code != code);
    updateDataItems(z);
  };

  const saveQuotationItem = () => {
    const item = data.map((currentData) => {
      return {
        code: currentData.code,
        name: currentData.name,
        ppu: currentData.price,
        qty: currentData.qty,
            }
    });

    saveQuotationItems(item);
  }

  const clearTable = () => {
    clearDataItems();
    setDataRows([]);
  };
  
  const formatNumber = (x) => {
    x = Number.parseFloat(x)
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <div style={{background: "white", padding: "20px", borderRadius:"8px" }}>
      <div style={{ textAlign: "center" }}>
      <h1>Quotation</h1>
      </div>
      <div className = "container px-5" style={{padding: "5px"}}></div>
      
      <Row className="mx-0 px-0">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "20px" }}>&nbsp;</th>
              <th className={style.textCenter}>Qty</th>
              <th className={style.textCenter}>Item</th>
              <th className={style.textCenter}>Price/Unit</th>
              <th className={style.textCenter}>Amount</th>
            </tr>
          </thead>
          <tbody>{dataRows}</tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className={style.textRight}>
                Total
              </td>
              <td className={style.textRight}>
                {formatNumber(total)}
              </td>
            </tr>
          </tfoot>
        </Table>
      </Row>
      
      <Row className="mx-0 px-0">
      <Button onClick={clearTable} variant="danger">
        Clear
      </Button>
      </Row>

      <div className = "container px-5" style={{padding: "5px"}}></div>

      <Row className="mx-0 px-0">
      <Button onClick={saveQuotationItem}>
        Save
      </Button>
      </Row>

      </div>
      </div>
  );
}

export default QuotationTable;