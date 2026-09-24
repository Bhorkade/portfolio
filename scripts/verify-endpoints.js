async function test() {
  try {
    const frontendRes = await fetch('http://localhost:5173/');
    console.log('Frontend HTTP Status:', frontendRes.status);

    const healthRes = await fetch('http://localhost:5000/api/health');
    const healthData = await healthRes.json();
    console.log('Backend Health Status:', healthData);

    const contactRes = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Verification Bot',
        email: 'test@example.com',
        subject: 'System Check',
        message: 'Testing contact API endpoint directly',
      }),
    });
    const contactData = await contactRes.json();
    console.log('Contact POST Status:', contactRes.status, contactData);
  } catch (err) {
    console.error('Verification failed:', err.message);
  }
}

test();
