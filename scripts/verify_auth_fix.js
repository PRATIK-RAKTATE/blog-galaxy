

const API_URL = 'https://blog-galaxy.onrender.com/api/v1/auth';

async function verifyAuth() {
  const uniqueId = Date.now();
  const user = {
    name: `Test User ${uniqueId}`,
    email: `test${uniqueId}@example.com`,
    password: 'password123'
  };

  console.log('--- Starting Auth Verification ---');

  // 1. Register
  console.log(`\n1. Attempting Registration for ${user.email}...`);
  try {
    const regRes = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    
    const regData = await regRes.json();
    console.log('Registration Status:', regRes.status);
    console.log('Registration Response:', JSON.stringify(regData, null, 2));

    if (regData.success && regData.token) {
      console.log('✅ Registration Successful: Token received');
    } else {
      console.error('❌ Registration Failed: Missing token or success flag');
    }

  } catch (err) {
    console.error('❌ Registration Error:', err.message);
  }

  // 2. Login
  console.log(`\n2. Attempting Login for ${user.email}...`);
  try {
    const loginRes = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, password: user.password })
    });

    const loginData = await loginRes.json();
    console.log('Login Status:', loginRes.status);
    console.log('Login Response:', JSON.stringify(loginData, null, 2));

    if (loginData.success && loginData.token) {
      console.log('✅ Login Successful: Token received');
    } else {
      console.error('❌ Login Failed: Missing token or success flag');
    }

  } catch (err) {
    console.error('❌ Login Error:', err.message);
  }

  // 3. Invalid Login (Verify Error Handling)
  console.log(`\n3. Attempting Invalid Login for ${user.email} (Wrong Password)...`);
  try {
    const loginRes = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, password: "wrongpassword" })
    });

    const loginData = await loginRes.json();
    console.log('Invalid Login Status:', loginRes.status);
    console.log('Invalid Login Response:', JSON.stringify(loginData, null, 2));

    if (!loginData.success && loginData.message === "Email or password is incorrect") {
       console.log('✅ Error Handling Verified: Correct error message received');
    } else {
       console.log('❌ Error Handling Failed: Unexpected response');
    }

  } catch (err) {
      console.log('ℹ️ information: caught error during fetch (unexpected if backend returns 200 for logic errors):', err.message);
  }
}

verifyAuth();
