import { Button } from './../components/ui/button';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  const gotoRegister = () => navigate("/register");

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="md:w-1/2 h-64 md:min-h-screen order-1 md:order-2">
        <img
          src="/expence-tracker.png"
          alt="Expense Tracker Illustration"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Left side: Content and Buttons (Order changed for mobile-first) */}
      <div className="flex flex-col justify-center items-center text-center p-8 md:w-1/2 order-2 md:order-1">
        <div className="max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Track Your Expenses Effortlessly
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Take control of your finances. Sign up to start managing your budget, tracking your spending, and achieving your financial goals.
          </p>
          <div className="flex justify-center items-center gap-4">
            <Button onClick={gotoRegister} size="lg" className="w-32 bg-orange-300">
              Register
            </Button>
          </div>
          <div className="mt-6">

          </div>
        </div>
      </div>

      {/* Right side: Image */}
    </div>
  );
}

export default Landing;