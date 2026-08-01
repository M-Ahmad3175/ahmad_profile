require('dotenv').config();
(async ()=>{
  try{
    const fetch = globalThis.fetch;
    if(!fetch) throw new Error('No global fetch available');

    const loginRes = await fetch('http://localhost:5000/api/v1/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify({email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD})});
    const setCookie = loginRes.headers.get('set-cookie') || loginRes.headers.get('Set-Cookie');

    const headers = {};
    if(setCookie) headers['cookie'] = setCookie.split(';')[0];

    const res = await fetch('http://localhost:5000/api/v1/dashboard',{method:'GET', headers});
    const text = await res.text();
  }catch(e){
    console.error('Test error', e);
  }
})();
