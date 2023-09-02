import { BoardInfo, KeyColor } from "./types";

export function getKeyColor(keyLetter: string, board: BoardInfo): KeyColor | undefined {
	if (board.greens.some((letter) => letter.letter === keyLetter)) {
		return "green";
	}

	if (board.yellows.some((letter) => letter.letter === keyLetter)) {
		return "yellow";
	}

	if (board.grays.includes(keyLetter)) return "gray";
}