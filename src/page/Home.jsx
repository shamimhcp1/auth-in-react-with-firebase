import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export const Home = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div className="text-lg font-semibold flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        console.log("User signed out");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back!</h1>
          <p className="text-sm text-gray-500">
            You are successfully logged in.
          </p>
        </div>

        <div className="border-t border-b border-gray-200 py-4 space-y-3">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Display Name
            </span>
            <p className="text-gray-700 font-medium">
              {user.displayName || "Not set"}
            </p>
          </div>

          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Email Address
            </span>
            <p className="text-gray-700 font-medium">{user.email}</p>
          </div>
        </div>

        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-200"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
