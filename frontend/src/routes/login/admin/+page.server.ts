export const actions = {
    default: async({ request, cookies }) => {
        const formData = await request.formData();
        console.log(formData);
        const email = formData.get('email');
        const password = formData.get('password');
        const res = await fetch('https://127.0.0.1:8000/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        console.log(data);
    }
}