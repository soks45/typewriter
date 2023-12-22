import axios from 'axios';

class FishTextService {
	getText(): Promise<string> {
		return axios(`https://fish-text.ru/get`).then((response) => response.data.text);
	}
}

const instance = new FishTextService();

export { instance as FishTextService };
