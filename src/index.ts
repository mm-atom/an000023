import { getExtension } from 'mime';
import fetch from 'node-fetch';
import { v4 } from 'uuid';

export default async function download(url: string) {
	const res = await fetch(url, {
		timeout: 60000
	});
	if (res.status > 299) {
		throw new Error(await res.text());
	}
	const headers = res.headers;
	const data = await res.buffer();
	const name = (() => {
		const cd = headers.get('content-disposition');
		if (cd) {
			return decodeURIComponent(cd.replace(/.*filename=/, ''));
		}
		const type = headers.get('Content-Type');
		const id = v4();
		if (type) {
			const ext = getExtension(type);
			if (ext) {
				return `${id}.${ext}`;
			}
			return id;
		}
		return id;
	})();
	return {
		data,
		name
	};
}
