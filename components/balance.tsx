"use client";

import useBalance from "../store/hooks/useBalance";

export default function Balance() {
	const ub = useBalance();
	return <div>User Balance: {ub}</div>;
}
