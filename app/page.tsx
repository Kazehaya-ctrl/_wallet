import { getServerSession } from "next-auth";
import { authOptons } from "./lib/auth";

export default async function Home() {
	const session = await getServerSession(authOptons);
	return <div className="font-mono font-bold">fasdfasdfasd</div>;
}
