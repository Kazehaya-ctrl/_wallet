import { authOptons } from "@/app/lib/auth";
import prisma from "@/db/dbindex";
import { getServerSession } from "next-auth";

async function fetchUserBalance() {
	const session = await getServerSession(authOptons);
	if (session) {
		const balanceDetail = await prisma.balance.findUnique({
			where: {
				userId: Number(session.user.id) || 0,
			},
		});
		return balanceDetail;
	}
}

export default async function Dashboard() {
	const userBalance = await fetchUserBalance();
	return (
		<>
			<div className="font-semibold font-sans text-3xl text-center text-purple-600">
				<div>Balance:</div>
				<div className="text-white">{userBalance?.amount}</div>
			</div>
		</>
	);
}
