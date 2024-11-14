export const handleSignup = async (data) => {
    const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const result = await res.json();
    return result.status;
 };
export const handleSignin = async (data) => {
    const res = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const result = await res.json();
    console.log(result.status);
    return result.status;
 };