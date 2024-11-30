"use server";

import prisma from "@/db/dbindex";

export default async function fetchTrx(session: any) {
	if (session.user.id) {
		const onramptransactions = await prisma.onRampTransactions.findMany({
			where: {
				user_id: Number(session.user.id),
			},
		});
		return onramptransactions;
	}
	return null;
}
