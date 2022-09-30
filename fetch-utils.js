const SUPABASE_URL = 'https://vaeaghsayvgavcxiahde.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhZWFnaHNheXZnYXZjeGlhaGRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ0MDcxODYsImV4cCI6MTk3OTk4MzE4Nn0.A-8x8BOIVzCGkdOSW53UpHiz8ck4I1UhMfs--gmsAUA';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function createItem(item) {
    return await client.from('lists').insert(item).single();
}

export async function getItem() {
    return await client.from('lists').select('*').order('created_at');
}

export async function boughtItem(id) {
    return await client.from('lists').update({ bought: true }).eq('id', id).single();
}

export async function deleteAllItems() {
    const user = getUser();
    return await client.from('lists').delete().eq('user_id', user.id);
}

export async function deleteBoughtItems() {
    const user = getUser();
    return await client.from('lists').delete().match({ bought: true }).eq('user_id', user.id);
}

export async function deleteSelectedItem(id) {
    return await client.from('lists').delete().eq('id', id).single();
}
