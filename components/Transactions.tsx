import TransactionCard from "./ui/transactioncard";
import fetchTrx from "@/app/lib/actions/trx";
import { authOptons } from "@/app/lib/auth";
import { getServerSession } from "next-auth";

export default async function TransactionsComponent() {
	const session = await getServerSession(authOptons);
	const trxDetails = (await fetchTrx(session)) || [];
	return (
		<>
			<div className="max-w-3xl mx-auto">
				{trxDetails.map((element, index) => (
					<TransactionCard
						provider={element.provider}
						time={element.startTime.toString()}
						key={index}
						amount={element.amount}
						transactionId={element.id}
						status={element.state}
					/>
				))}
			</div>
		</>
	);
}
