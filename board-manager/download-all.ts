import * as fetch from 'isomorphic-fetch';
let json_url = 'http://downloads.arduino.cc/packages/package_index.json';
function scan(o) {
    let ks = Object.keys(o);
    let res = [];
    ks.forEach(k => {
        let d = o[k];
        if (typeof d == "string") {
            res.push(d);
        } else {
            res = res.concat(scan(d));
        }
    });
    return res;
}
import * as http from 'http';
import * as fs from 'fs';

async function download(x) {
    console.log('download', x.name)
    var file = fs.createWriteStream('dl/' + x.name);
    var request = http.get(x.url, function (response) {
        console.log('saving ', x.name);
        response.pipe(file);
    });
}
async function main() {
    let res = await fetch(json_url);
    res = await res.json();
    let ps = scan(res)
        .filter(x => x.includes('http'))
        .map(x => {
            let xs = x.split('/');
            let name = xs[xs.length - 1];
            let url = x;
            return {
                url: url
                , name: name
            };
        })
        .filter(x => x.name.includes('.'))
        .map(x => x.name + ' ' + x.url)
    // .map(x=>download(x))
    // .map(x => fetch(x.url)
    //     .then(res => {
    //         console.log('downloaded', x.name);
    //         return ({
    //             res: res
    //             , name: x.name
    //             , url: x.url
    //         })
    //     })
    // );
    // let ress = await Promise.all(ps);
    // console.log(ress);
    console.log(ps.join('\n'))
}
console.log('start');
main();
