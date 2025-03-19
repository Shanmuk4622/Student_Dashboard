// Initialize Supabase client
const supabaseUrl = 'https://jwtmgwcilqgmjhsiwgtu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3dG1nd2NpbHFnbWpoc2l3Z3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNjgxNTIsImV4cCI6MjA1Nzk0NDE1Mn0.ubKykLz7X_62S4c3zviyNO_6Pz-Gz2W5htdbolROgIc'
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const authButtons = document.querySelector('.auth-buttons');
    const userProfile = document.querySelector('.user-profile');
    const logoutButton = document.getElementById('logoutButton');
    const welcomeMessage = document.querySelector('.welcome-section h2');

    // Hide user profile by default
    userProfile.style.display = 'none';

    // Check authentication state
    async function checkAuth() {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        
        if (session && session.user) {
            // User is logged in
            authButtons.style.display = 'none';
            userProfile.style.display = 'block';
            welcomeMessage.textContent = `Welcome back, ${session.user.email}!`;
        } else {
            // User is not logged in
            authButtons.style.display = 'flex';  // Changed to flex for better alignment
            userProfile.style.display = 'none';
            welcomeMessage.textContent = 'Welcome back, Student!';
        }
    }

    // Handle logout
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            const { error } = await supabaseClient.auth.signOut();
            if (error) {
                console.error('Error signing out:', error.message);
            } else {
                window.location.href = '/';
            }
        });
    }

    // Listen for authentication state changes
    supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
            checkAuth();
        } else if (event === 'SIGNED_OUT') {
            checkAuth();
        }
    });

    // Initial auth check
    checkAuth();
});
