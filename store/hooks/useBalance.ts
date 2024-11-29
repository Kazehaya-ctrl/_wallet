"use client";

import { balance } from "../atoms/balance";
import { useRecoilValue } from "recoil";

export default function useBalance(): number {
	try {
		return useRecoilValue(balance);
	} catch (e) {
		console.log("Error" + e);
		return 0;
	}
}
