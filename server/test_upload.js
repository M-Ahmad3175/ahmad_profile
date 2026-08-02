require('dotenv').config();
(async ()=>{
  try{
    const fetch = globalThis.fetch;
    if(!fetch) throw new Error('No global fetch available in this Node runtime');

    const serverUrl = process.env.SERVER_URL || 'http://localhost:5000';
    const loginRes = await fetch(`${serverUrl}/api/v1/auth/login`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD})
    });

    const setCookie = loginRes.headers.get('set-cookie') || loginRes.headers.get('Set-Cookie');
    const json = await loginRes.json().catch(()=>null);

    const b64='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=';
    const buf=Buffer.from(b64,'base64');

    const form = new FormData();
    const blob = new Blob([buf], { type: 'image/png' });
    form.append('image', blob, 'test.png');

    const headers = {};
    if(setCookie) headers['cookie'] = setCookie.split(';')[0];

    const uploadRes = await fetch('http://localhost:5000/api/v1/upload/profile',{
      method:'POST',
      headers: headers,
      body: form
    });
    const text = await uploadRes.text();
  }catch(e){
    console.error('Test error', e);
  }
})();
