const bankOptions: Array<string> = ["HDFC", "SBI", "IDBI"];
export default function TransferCard({
	amount,
	setAmount,
	bank,
	setBank,
	handleClick,
}: {
	amount: number;
	setAmount: any;
	bank: number;
	setBank: any;
	handleClick: (e: any) => void;
}) {
	return (
		<>
			<div className="max-w-sm mx-auto my-10 p-6 bg-zinc-700 rounded-lg shadow-md text-black font-bold font-sans">
				<h2 className="text-2xl font-semibold text-center mb-4 text-white">
					Add Money
				</h2>

				<form className="space-y-4">
					<div>
						<label
							htmlFor="amount"
							className="block text-sm font-medium text-gray-700"
						>
							Amount
						</label>
						<input
							type="number"
							id="amount"
							name="amount"
							value={amount}
							onChange={(e) => setAmount(Number(e.target.value))}
							className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							placeholder="Enter amount"
							required
						/>
					</div>

					<div>
						<label
							htmlFor="bank"
							className="block text-sm font-medium text-gray-700"
						>
							Select Bank
						</label>
						<select
							id="bank"
							name="bank"
							value={bank}
							onChange={(e) => setBank(Number(e.target.value))}
							className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							required
						>
							<option value="-1" disabled>
								Select a bank
							</option>
							{bankOptions.map((bank, index) => (
								<option key={index} value={index}>
									{bank}
								</option>
							))}
						</select>
					</div>

					<div className="text-center">
						<button
							type="submit"
							className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							onClick={(e) => handleClick(e)}
						>
							Add Money
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
