import axios from 'axios';

class HighlightService {
	highlightCorrect(str: string): string {
		return `<span class="correct">${str}</span>`;
	}

	highlightWrong(str: string): string {
		return `<span class="wrong">${str}</span>`;
	}
}

const instance = new HighlightService();

export { instance as HighlightService };
