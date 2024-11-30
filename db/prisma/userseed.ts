import prisma from "../dbindex";
import bcrypt from "bcrypt";

async function main() {
	const loid = await prisma.user.upsert({
		where: { phone: 1111111 },
		update: {},
		create: {
			name: "loid",
			phone: 1111111,
			email: "loid@gmail.com",
			password: await bcrypt.hash("loid", 10),
			Balance: {
				create: {
					amount: 200000,
					locked: 3000,
				},
			},
			OnRampTransactions: {
				create: {
					amount: 2000,
					provider: "HDFC",
					token: "123a",
					state: "Success",
					startTime: new Date(),
				},
			},
		},
	});
	const Kazehaya = await prisma.user.upsert({
		where: { phone: 999999999 },
		update: {},
		create: {
			name: "Kazehaya",
			phone: 999999999,
			email: "kazehaya@gmail.com",
			password: await bcrypt.hash("bob", 10),
			Balance: {
				create: {
					amount: 3000000,
					locked: 3000,
				},
			},
			OnRampTransactions: {
				create: {
					amount: 3000,
					provider: "SBI",
					token: "34543a",
					state: "Failure",
					startTime: new Date(),
				},
			},
		},
	});
	console.log({ Kazehaya, loid });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
