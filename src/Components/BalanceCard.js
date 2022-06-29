import React, { useEffect } from "react";
import { Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { loadBalance } from "../redux/actions/actions";

const gridStyle = {
  width: "25%",
  textAlign: "center",
  border: "1px solid #ccc",
};

const BalanceCard = () => {
  const { balance } = useSelector((state) => state.data);
  const balanceData = balance.results;
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBalance());
  }, [dispatch]);

  return (
    <>
      <h2 className="text-center mb-2">Your Balance</h2>

      <div className="d-flex justify-content-center mb-5">
        <label>USD Balance</label>
        <Card.Grid className="mx-3" style={gridStyle}>
          {balanceData ? balanceData.usdBalance : 0}
        </Card.Grid>

        <label>Iraqi Balance</label>
        <Card.Grid className="mx-3" style={gridStyle}>
          {balanceData ? balanceData.iqdBalance : 0}
        </Card.Grid>
      </div>
    </>
  );
};

export default BalanceCard;
