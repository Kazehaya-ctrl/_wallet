"use client";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

export default function Appbar() {
	const session = useSession();

	const handleClick = async () => {
		if (session.data?.user) {
			await signOut();
		} else {
			signIn();
		}
	};
	return (
		<>
			<div className="flex flex-row justify-between border-b border-white text-xl">
				<div className="p-4 font-bold">PayTM</div>
				<div className="p-4 text-base font-bold">
					<button
						className={`border ${
							session.data?.user ? "border-red-500" : "border-blue-500"
						} px-4 rounded-md`}
						onClick={handleClick}
					>
						{session.data?.user ? "Logout" : "Login"}
					</button>
				</div>
			</div>
		</>
	);
}
