// import { Card, Stack, Table, Title } from "@mantine/core";
import { WALLET_ASSETS_USER_QUERY } from '../../../queries/OrdersAndWallets'
import React, { useState, useEffect } from "react";
import { useQuery} from '@apollo/client'
import TableGenerator from "../../trades/TableGenerator/TableGenerator";

export default function AssetsTable({walletid}) {
	// console.log("ASSETS TABLE L8")
	// console.log("WID",walletid)
	const [walletAssets, setWalletAssets] = useState([])
	const { loading: queryloading, error: queryError, data: queryData } = useQuery(WALLET_ASSETS_USER_QUERY, 
		{variables: {walletid}}
	);
	// console.log("ASSETS TABLE L12")
	console.log("QD ",queryData)
	useEffect(() => {
		try {
			if (queryData !== undefined && queryData.getWalletAssetsWalletID) {
				const res = queryData.getWalletAssetsWalletID
				setWalletAssets(res)
			}
		} catch (error) {}
	}, [walletid, queryloading, queryError, queryData])

	if(walletAssets.length) return (<TableGenerator DataObject = {walletAssets}/>)
	else return (<div>ERROR SHOWING ASSETS</div>)
	// return (
	// 	<div>
	// 	HI
	// 	{/* <TableGenerator DataObject = {walletAssets}/> */}
	// 	</div>
	// )
}