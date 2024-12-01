"use client";

import React, { useState } from "react";
import TransferCard from "./ui/addmoneycard";
import { bankOptions } from "./ui/addmoneycard";
import { useSession } from "next-auth/react";

export default function AddMoneyCard() {
	const [amount, setAmount] = useState<number>(0);
	const [bank, setBank] = useState<number>(-1);
	const [loading, setLoading] = useState<boolean>(false);
	const session = useSession();

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (amount === 0 || bank === -1) {
			alert("Either of input components are empty");
		} else {
			if (session.data && session.data.user) {
				setLoading(true);
				try {
					const response = await fetch(
						"http://localhost:3001/webhook/" + bankOptions[bank],
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								token: "SECRET",
								amount: amount,
								userid: Number(session.data.user.id),
							}),
						}
					);
					if (response.ok) {
						console.log("Transaction successful:", response.status);
					} else {
						console.error("Transaction failed:", response.status);
					}
				} catch (error) {
					console.error("Error during transaction:", error);
				} finally {
					setLoading(false);
				}
			}
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
			<button
				onClick={handleClick}
				disabled={loading}
				className="bg-blue-500 text-white p-2 rounded"
			>
				{loading ? <span className="animate-spin">🔄</span> : "Submit"}
			</button>
		</>
	);
}
