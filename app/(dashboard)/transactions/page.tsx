import TransactionsComponent from "@/components/Transactions";
import { useSession } from "next-auth/react";

export default function Transactions() {
	return (
		<>
			<div className="text-3xl font-semibold font-sans text-purple-500 p-4">
				<TransactionsComponent />
			</div>
		</>
	);
}
