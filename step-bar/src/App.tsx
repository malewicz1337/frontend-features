import "./App.css";
import CheckoutStepBar from "./components/step-bar";

// import CustomerInfo from "./components/forms/customer-info-form";

const CHECKOUT_STEPS = [
  {
    name: "Customer Info",
    Component: () => <div>Provide your contact details.</div>,
  },
  {
    name: "Shipping Info",
    Component: () => <div>Enter your shipping address.</div>,
  },
  {
    name: "Review Order",
    Component: () => <div>Review the items in your order.</div>,
  },
  {
    name: "Delivery Options",
    Component: () => <div>Select your preferred delivery method.</div>,
  },
  {
    name: "Payment",
    Component: () => <div>Complete payment for your order.</div>,
  },
  {
    name: "Confirmation",
    Component: () => <div>Your order has been confirmed!</div>,
  },
];

function App() {
  return (
    <main>
      <h1>Checkout</h1>
      <CheckoutStepBar stepsConfig={CHECKOUT_STEPS} />
    </main>
  );
}

export default App;
