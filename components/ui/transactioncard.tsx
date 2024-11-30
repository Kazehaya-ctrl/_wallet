export default function TransactionCard({
	provider,
	transactionId,
	time,
	amount,
	status,
	key,
}: {
	provider: string;
	transactionId: number;
	time: string;
	amount: number;
	status: string;
	key: any;
}) {
	return (
		<>
			<div key={key}>
				<div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4 flex items-center justify-between">
					<div>
						<h3 className="text-base font-semibold text-gray-800">
							{provider}
						</h3>
						<p className="text-sm text-gray-500">
							Transaction ID: #{transactionId}
						</p>
					</div>
					<div className="text-right">
						<p className="text-base font-medium text-gray-800">${amount}</p>
						<p className="text-sm text-gray-500">{time}</p>
					</div>
					<span
						className={`ml-4 text-sm px-3 py-1 rounded-full  ${
							status === "Success"
								? "bg-green-100 text-green-600"
								: "bg-red-100 text-red-700"
						} font-medium`}
					>
						{status}
					</span>
				</div>
			</div>
		</>
	);
}
