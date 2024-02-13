const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
const STORAGE_TOKEN = '94O1AUPYPK0W3C8K39CQA4RUAG8P0YD4EKR5EE24';


async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => res.data.value);
}