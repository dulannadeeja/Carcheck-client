import { useState } from "react";

const paymentMethods = [
  "Credit Card",
  "Debit Card",
  "PayPal",
  "Google Pay",
  "Apple Pay",
  // Add more payment methods as needed
];

function Payment() {
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);

  const handleToggleMethod = (method: string) => {
    if (selectedMethods.includes(method)) {
      setSelectedMethods(selectedMethods.filter((m) => m !== method));
    } else {
      setSelectedMethods([...selectedMethods, method]);
    }
  };

  return (
    <div className="mt-6">
      <p className="text-sm font-medium">Payment Options:</p>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {paymentMethods.map((method) => (
          <div key={method} className="flex items-center">
            <input
              type="checkbox"
              id={method}
              checked={selectedMethods.includes(method)}
              onChange={() => handleToggleMethod(method)}
              className="mr-2"
            />
            <label htmlFor={method}>{method}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Payment;
