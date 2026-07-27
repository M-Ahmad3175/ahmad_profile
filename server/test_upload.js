require('dotenv').config();
(async ()=>{
  try{
    const fetch = globalThis.fetch;
    if(!fetch) throw new Error('No global fetch available in this Node runtime');

    const loginRes = await fetch('http://localhost:5000/api/v1/auth/login',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD})
    });

    console.log('Login status', loginRes.status);
    const setCookie = loginRes.headers.get('set-cookie') || loginRes.headers.get('Set-Cookie');
    console.log('Set-Cookie header:', setCookie);
    const json = await loginRes.json().catch(()=>null);
    console.log('Login body:', json);

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
    console.log('Upload status', uploadRes.status);
    const text = await uploadRes.text();
    console.log('Upload response body:', text);
  }catch(e){
    console.error('Test error', e);
  }
})();
