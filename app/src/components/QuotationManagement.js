import React, { useEffect, useState, useRef } from "react";
import {
  Row,
  Col,
  Form,
  Container,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";
import style from "../mystyle.module.css";

export default function QuotationManagement(data, clearDataItems, updateDataItems) {
    const API_URL = process.env.REACT_APP_API_URL;

    const [quotationRows, setQuotationRows] = useState([]);
    const [quotationData, setQuotationData] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
    fetch(`${API_URL}/customers`)
      .then((res) => res.json())
      .then((data) => {
        setQuotationData(data)
      });  
      }, []);

    useEffect(() => {
    let sum = 0;
    const z = quotationData.map((v, i) => {
        let amount = v.qty * v.ppu;
        sum += amount;
        return (
        <tr key={i}>
            <td className={style.textCenter}>
            <FaTrashAlt onClick={() => deleteQuotation(v)} />
            </td>
            <td className={style.textCenter}>{v.qty}</td>
            <td>{v.name}</td>
            <td className={style.textCenter}>{formatNumber(v.ppu)}</td>
            <td className={style.textRight}>{formatNumber(amount)}</td>
            <td className={style.textCenter}>{v.date}</td>
        </tr>
        );
    });
    
    setQuotationRows(z);
    setTotal(sum);
    }, [quotationData]);
    
    const deleteQuotation = (item) => {
    console.log(item);
    if (window.confirm(`Are you sure to delete [${data.name}]?`)) {
      fetch(`${API_URL}/customers/${item._id}`, {
        method: "DELETE",
        mode: "cors",
      })
        .then((res) => res.json())
        .then((json) => {
          // Successfully deleted
          console.log("DELETE Result", json);

          for (let i = 0; i < quotationData.length; i++) {
            if (quotationData[i]._id === item._id) {
              quotationData.splice(i,1);
              break;
            }
          }
        setQuotationData(quotationData);
            });
        }
    }  

    /*
    const  deleteQuotation = (item) => {
      var z = quotationData.filter((value, index, arr) => value.item != item);
      updateDataItems(z);
    };
    */

    const formatNumber = (x) => {
    x = Number.parseFloat(x)
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
      
    return (
    <Container className="px-5 py-5">
        <div style={{padding: "20px"}}></div>

        <div style={{background: "white", padding: "30px", borderRadius:"8px" }}>
        <h1>Quotation Management</h1>
        {/* API_URL: {API_URL} */}

        <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: "20px" }}>&nbsp;</th>
            <th className={style.textCenter}>Qty</th>
            <th className={style.textCenter}>Item</th>
            <th className={style.textCenter}>Price/Unit</th>
            <th className={style.textCenter}>Amount</th>
            <th className={style.textCenter}>Date</th>
          </tr>
        </thead>
        <tbody>{quotationRows}</tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className={style.textRight}>
              Total
            </td>
            <td className={style.textCenter}>
              {formatNumber(total)}
            </td>
          </tr>
        </tfoot>
      </Table>
      </div>
      </Container>

    )
}