const test = require('ava');

const { default: a } = require('../dist/index');


test('下载成功', async (t) => {
	const r = await a('http://127.0.0.1:8889/fsweb/getfile?id=06e75b24-0152-4fdb-8572-9c23a97396b2&download');
	t.is(r.name, 'Screenshot from 2020-02-07 21-19-26.png');
	t.not(r.data, null);
});

test('下载成功,不加download参数', async (t) => {
	const r = await a('http://127.0.0.1:8889/fsweb/getfile?id=06e75b24-0152-4fdb-8572-9c23a97396b2');
	t.is(r.name, 'Screenshot from 2020-02-07 21-19-26.png');
	t.not(r.data, null);
});

test('下载失败', async (t) => {
	const err = await t.throwsAsync(async () => {
		const r = await a('http://127.0.0.1:8889/fsweb/getfile?id=xxx.mp4&download');
		console.log(r);
	});
	t.is(err.message, 'Not Found');
});
