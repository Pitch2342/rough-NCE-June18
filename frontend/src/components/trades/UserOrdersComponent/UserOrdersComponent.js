import { useQuery} from '@apollo/client'
import { Stack} from "@mantine/core";
import React, { useState, useEffect } from "react";
import { CLOSED_ORDER_USER_QUERY, OPEN_ASK_ORDER_USER_QUERY, OPEN_BID_ORDER_USER_QUERY } from '../../../queries/OrdersAndWallets'
import TableGenerator from '../TableGenerator/TableGenerator'

const UserOrdersComponent = ({symbol, owner}) => {
  const [closedOrders, setClosedOrders] = useState([])
  const { loading: closeQueryloading, error: closeQueryError, data: closeQueryData } = useQuery(CLOSED_ORDER_USER_QUERY, {variables: {symbol, owner}}
  );

  useEffect(() => {
		try {
			if (closeQueryData !== undefined && closeQueryData.getClosedOrdersForSymbolAndUser) {
				const res = closeQueryData.getClosedOrdersForSymbolAndUser
				setClosedOrders(res)
			}
		} catch (error) {}
	}, [symbol, closeQueryloading, closeQueryError, closeQueryData])

  const [openAskOrders, setOpenAskOrders] = useState([])
  const { loading: openAskQueryloading, error: openAskQueryError, data: openAskQueryData } = useQuery(OPEN_ASK_ORDER_USER_QUERY, {variables: {symbol, owner}}
  );

  useEffect(() => {
		try {
			if (openAskQueryData !== undefined && openAskQueryData.getOpenAskOrdersForSymbolAndUser) {
				const res = openAskQueryData.getOpenAskOrdersForSymbolAndUser
				setOpenAskOrders(res)
			}
		} catch (error) {}
	}, [symbol, openAskQueryloading, openAskQueryError, openAskQueryData])

  const [openBidOrders, setOpenBidOrders] = useState([])
  const { loading: openBidQueryloading, error: openBidQueryError, data: openBidQueryData } = useQuery(OPEN_BID_ORDER_USER_QUERY, {variables: {symbol, owner}}
  );

  useEffect(() => {
		try {
			if (openBidQueryData !== undefined && openBidQueryData.getOpenBidOrdersForSymbolAndUser) {
				const res = openBidQueryData.getOpenBidOrdersForSymbolAndUser
				setOpenBidOrders(res)
			}
		} catch (error) {}
	}, [symbol, openBidQueryloading, openBidQueryError, openBidQueryData])

  console.log(closedOrders.length, openAskOrders.length, openBidOrders.length)

  if(closedOrders.length && openAskOrders.length && openBidOrders.length) {
    return (
      <div>
      <Stack>
        <TableGenerator DataObject = {closedOrders} title = {"CLOSED ORDERS"}/>
        <TableGenerator DataObject = {openAskOrders} title = {"OPEN ASK ORDERS"}/>
        <TableGenerator DataObject = {openBidOrders} title = {"OPEN BID ORDERS"}/>
      </Stack>
      </div>
    )
  }
	else {
    return (<div>ERROR SHOWING ORDERS</div>)
  }

};

export default UserOrdersComponent;
