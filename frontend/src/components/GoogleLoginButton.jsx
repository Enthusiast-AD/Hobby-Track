import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onLoginSuccess }) => {

  const handleSuccess = async (credentialResponse) => {
    
    const idToken = credentialResponse.credential;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(data.data);
      } else {
        console.error("Backend login failed:", data.message);
      }

    } catch (error) {
      console.error("Network error during login:", error);
    }
  };

  return (
    <div className="flex justify-center">
        
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
            theme="filled_black" 
            shape="pill"
        />
    </div>
  );
};

export default GoogleLoginButton;