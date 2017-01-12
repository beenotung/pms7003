import * as fetch from 'isomorphic-fetch';
let json_url = 'http://downloads.arduino.cc/packages/package_index.json';

function hasString(s, t) {
    return s.includes(t);
}

let list: string[] = [];

function scan(o) {
    if (typeof o === 'string')
        return false;
    Object.keys(o).forEach(x => {
        if (!scan(o[x])) {
            let url = o[x];
            let m = list.filter(x => x == url)[0];
            if (m) {
                // console.log('m', m);
                o[x] = `http://127.0.0.1:8081/${m}`;
            }
        }
    });
    return true;
}

async function getList() {
    let res = await fetch('http://127.0.0.1:8081/list');
    res = await res.text();
    return res.split('\n').filter(x => x.length > 0);
}

async function main() {
    console.log('download list');
    list = await getList();
    // console.log('list', list);
    console.log('download json');
    let res = await fetch(json_url);
    console.log('parse json');
    res = await res.json();
    await scan(res);
    console.log('==========res=========');
    console.log(JSON.stringify(res, null, '  '));
    console.log('__________');
    return 'ok';
}
console.log('start');
main();
