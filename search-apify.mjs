import fetch from 'node-fetch';

async function searchApify() {
    const res = await fetch('https://api.apify.com/v2/store/actors?search=html%20to%20pdf');
    const data = await res.json();
    console.log(data.data.items.slice(0, 3).map(i => i.name));
}

searchApify();
