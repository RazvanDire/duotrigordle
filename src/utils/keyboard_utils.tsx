import { LetterInfo } from "./types";

export function setRows(letters: string): LetterInfo[] {
	let row: LetterInfo[] = Array(letters.length).fill({letter: "", color: undefined});

	for (let i = 0; i < letters.length; i++) {
		row[i].letter = letters[i];
	}

	return row;
}