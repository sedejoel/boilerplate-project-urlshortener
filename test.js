const dns = require('node:dns');
const options = {
  family: 4,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};
dns.lookup('example.com', (err, address, family) =>{
  console.log(err);
  console.log('address: %j family: IPv%s', address, family)});
// address: "2606:2800:220:1:248:1893:25c8:1946" family: IPv6

// When options.all is true, the result will be an Array.


