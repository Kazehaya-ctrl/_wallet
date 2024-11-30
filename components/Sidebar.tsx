"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
	const session = useSession();
	const router = useRouter();
	return (
		<>
			<div className="flex h-screen">
				<div className="w-64 bg-zinc-900 text-white flex flex-col font-mono">
					<div className="p-4 text-center text-lg font-bold border-b border-gray-700">
						Hi, {session.data?.user?.name}
					</div>
					<nav className="flex-1 p-4">
						<ul className="space-y-2">
							<li>
								<button
									className="w-full text-left px-4 py-2 rounded hover:bg-gray-700"
									onClick={() => router.push("/dashboard")}
								>
									Dashboard
								</button>
							</li>
							<li>
								<button
									className="w-full text-left px-4 py-2 rounded hover:bg-gray-700"
									onClick={() => router.push("/transfer")}
								>
									Transfer
								</button>
							</li>
							<li>
								<button
									className="w-full text-left px-4 py-2 rounded hover:bg-gray-700"
									onClick={() => router.push("/transactions")}
								>
									Transactions
								</button>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
}
