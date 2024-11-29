import CredentialProvider from "next-auth/providers/credentials";
import prisma from "@/db/dbindex";
import bcrypt from "bcrypt";

export const authOptons = {
	providers: [
		CredentialProvider({
			name: "Phone number",
			credentials: {
				phone: {
					label: "Phone number",
					type: "number",
					placeholder: "Phone number",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "Password",
				},
			},
			async authorize(credentials) {
				if (!credentials) return null;

				const { phone, password } = credentials;
				const phoneNumber =
					typeof phone === "string" ? parseInt(phone) : phone;

				const existingUser = await prisma.user.findUnique({
					where: {
						phone: phoneNumber,
					},
				});

				if (existingUser) {
					const passwordValidation = await bcrypt.compare(
						password,
						existingUser.password
					);
					if (passwordValidation) {
						return {
							id: existingUser.id.toString(),
							name: existingUser.phone.toString(),
							email: existingUser.email,
						};
					}
					return null;
				}

				try {
					const hashedPass = await bcrypt.hash(password, 10);
					const user = await prisma.user.create({
						data: {
							phone: phoneNumber,
							password: hashedPass,
						},
					});

					if (user) {
						return {
							id: user.id.toString(),
							name: user.phone.toString(),
							email: user.email,
						};
					}
					return null;
				} catch (e) {
					console.error("User not created in Database", e);
					return null;
				}
			},
		}),
	],
	secret: process.env.AUTH_SECRET,
	callbacks: {
		async session({ token, session }: any) {
			session.user.id = token.sub;

			return session;
		},
	},
};
