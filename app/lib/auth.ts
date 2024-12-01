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
				const phoneNumber = typeof phone === "string" ? parseInt(phone) : phone;

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
							name: existingUser.name || "User",
							email: existingUser.email,
							image: existingUser.phone.toString(),
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
							name: user.name || " ",
							email: user.email,
							image: user.phone.toString(),
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
		async redirect({ url, baseUrl }: any) {
			if (url === baseUrl + "/api/auth/signin") {
				return baseUrl + "/dashboard";
			}
			return url;
		},
		async session({ token, session }: any) {
			session.user.id = token.sub;

			return session;
		},
	},
};
