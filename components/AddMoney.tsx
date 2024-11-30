"use client";

import { useState } from "react";
import TransferCard from "./ui/addmoneycard";

export default function AddMoneyCard() {
	const [amount, setAmount] = useState<number>(0);
	const [bank, setBank] = useState<number>(-1);
	const handleClick = (e: any) => {
		e.preventDefault();
		if (amount === 0 || bank === -1) {
			alert("Either of input components are empty");
		}
	};
	return (
		<>
			<TransferCard
				amount={amount}
				setAmount={setAmount}
				bank={bank}
				setBank={setBank}
				handleClick={(e) => handleClick(e)}
			/>
		</>
	);
}
