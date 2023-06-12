import { React, useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import "./Content.css";

export default function Content() {
  const [tableData, setTableData] = useState([]);
  const [items, setItems] = useState(10);

  const getTableData = async () => {
    try {
      const res = await axios.get("https://api.coincap.io/v2/assets");
      setTableData(res.data.data);
    } catch (e) {
      return null;
    }
  };
  useEffect(() => {
    getTableData();
  }, []);

  const loadMoreItem = () => {
    setItems((prevItems) => prevItems + 10);
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Rank</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Market Cap</TableCell>
            <TableCell align="right">VWAP (24Hr)</TableCell>
            <TableCell align="right">Supply</TableCell>
            <TableCell align="right">Volume (24Hr)</TableCell>
            <TableCell align="right">Change (24Hr)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="tbody">
          {tableData.slice(0, items).map((data) => (
            <TableRow key={data.id}>
              <TableCell align="center">{data.rank}</TableCell>
              <TableCell align="left" className="name">
                <div className="name">
                  <img
                    className="logo"
                    src={`https://assets.coincap.io/assets/icons/${data.symbol.toLowerCase()}@2x.png `}
                    alt={data.name}
                  />
                  <div>
                    <span>{data.name}</span>
                    <br />
                    <span className="dataSymbol">{data.symbol}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell align="right">{`$${parseFloat(data.priceUsd).toFixed(
                2
              )}`}</TableCell>
              <TableCell align="right">{`$${
                data.marketCapUsd > 1000000000
                  ? (data.marketCapUsd / 1000000000).toFixed(2) + "b"
                  : (data.marketCapUsd / 1000000).toFixed(2) + "m"
              }`}</TableCell>
              <TableCell align="right">{`$${parseFloat(data.vwap24Hr).toFixed(
                2
              )}`}</TableCell>
              <TableCell align="right">
                {`${
                  data.supply > 1000000000
                    ? (data.supply / 1000000000).toFixed(2) + "b"
                    : (data.supply / 1000000).toFixed(2) + "m"
                }`}
              </TableCell>
              <TableCell align="right">
                {`$${
                  data.volumeUsd24Hr > 1000000000
                    ? (data.volumeUsd24Hr / 1000000000).toFixed(2) + "b"
                    : (data.volumeUsd24Hr / 1000000).toFixed(2) + "m"
                }`}
              </TableCell>
              <TableCell align="right">
                {`${parseFloat(data.changePercent24Hr).toFixed(2)}%`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button className="button" variant="contained" onClick={loadMoreItem}>
        Load More
      </Button>
    </TableContainer>
  );
}
