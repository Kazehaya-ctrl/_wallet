"use client";

import { atom } from "recoil";

export const balance = atom<number>({
	key: "balance",
	default: 3,
});
