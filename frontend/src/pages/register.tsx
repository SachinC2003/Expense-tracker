import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
  [key: string]: any;
}

function Register() {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/register/auth`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: credentialResponse.credential }),
        });

        const data = await res.json();
        console.log("Backend verified user:", data);

        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login Successful!");
        navigate("/dashboard");
      } catch (err) {
        console.error("Backend auth error:", err);
        toast.error("Login Failed. Try again.");
      }
    }
  };

  const handleLoginError = () => {
    console.error("Google Login Failed");
    toast.error("Google Login Failed");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Expense Tracker</h1>
        <img
          src="/logo.png"
          alt="Logo"
          className="w-20 h-20 mx-auto mb-6"
        />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Login or Sign Up</h2>
        <p className="text-gray-500 mb-6">
          Track your expenses easily with ExpenseTracker!
        </p>

        <div className="flex justify-center mb-4">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            shape="rectangular"
            theme="outline"
            size="large"
            useOneTap={false}
          />
        </div>

        <p className="text-xs text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default Register;
