import React, { useState } from 'react';

const OLD_TAX_REGIME = [
  { upTo: 250000, rate: 0 },
  { upTo: 500000, rate: 0.05 },
  { upTo: 1000000, rate: 0.2 },
  { upTo: Infinity, rate: 0.3 },
];

const OLD_TAX_REGIME_SENIOR = [
  { upTo: 300000, rate: 0 },
  { upTo: 500000, rate: 0.05 },
  { upTo: 1000000, rate: 0.2 },
  { upTo: Infinity, rate: 0.3 },
];

const NEW_TAX_REGIME = [
  { upTo: 250000, rate: 0 },
  { upTo: 500000, rate: 0.05 },
  { upTo: 750000, rate: 0.1 },
  { upTo: 1000000, rate: 0.15 },
  { upTo: 1250000, rate: 0.2 },
  { upTo: 1500000, rate: 0.25 },
  { upTo: Infinity, rate: 0.3 },
];

const IncomeTaxCalculator = () => {
  const [income, setIncome] = useState('');
  const [hra, setHra] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [deductions, setDeductions] = useState('');
  const [professionalTax, setProfessionalTax] = useState('');
  const [age, setAge] = useState('');
  const [taxRegime, setTaxRegime] = useState('New Tax Regime');
  const [calculatedTax, setCalculatedTax] = useState(null);

  const calculateTax = (income, slabs) => {
    let tax = 0;
    let previousLimit = 0;

    for (const slab of slabs) {
      if (income > slab.upTo) {
        tax += (slab.upTo - previousLimit) * slab.rate;
        previousLimit = slab.upTo;
      } else {
        tax += (income - previousLimit) * slab.rate;
        break;
      }
    }
    return tax;
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    const incomeAmount = parseFloat(income) || 0;
    const hraAmount = parseFloat(hra) || 0;
    const otherIncomeAmount = parseFloat(otherIncome) || 0;
    const deductionsAmount = parseFloat(deductions) || 0;
    const professionalTaxAmount = parseFloat(professionalTax) || 0;

    if (isNaN(incomeAmount) || incomeAmount < 0) {
      alert('Please enter a valid income amount.');
      return;
    }

    const slabs = taxRegime === 'Old Tax Regime'
      ? age >= 60
        ? OLD_TAX_REGIME_SENIOR
        : OLD_TAX_REGIME
      : NEW_TAX_REGIME;

    const totalIncome = incomeAmount + otherIncomeAmount - hraAmount - professionalTaxAmount;
    const taxableIncome = Math.max(totalIncome - deductionsAmount, 0); // Ensure taxable income is non-negative
    const tax = calculateTax(taxableIncome, slabs);
    setCalculatedTax({ taxableIncome, totalIncome, tax });
  };

  const handleReset = () => {
    setIncome('');
    setHra('');
    setOtherIncome('');
    setDeductions('');
    setProfessionalTax('');
    setAge('');
    setCalculatedTax(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-blue-50">
      <div className="bg-white p-10 rounded shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-6">Advanced Income Tax Calculator</h2>
        <form onSubmit={handleCalculate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold">Annual Income:</label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Enter your annual income"
              />
            </div>
            <div>
              <label className="block font-semibold">HRA (Exemption):</label>
              <input
                type="number"
                value={hra}
                onChange={(e) => setHra(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Enter HRA exemption"
              />
            </div>
            <div>
              <label className="block font-semibold">Other Income:</label>
              <input
                type="number"
                value={otherIncome}
                onChange={(e) => setOtherIncome(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Income from other sources"
              />
            </div>
            <div>
              <label className="block font-semibold">Professional Tax:</label>
              <input
                type="number"
                value={professionalTax}
                onChange={(e) => setProfessionalTax(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Enter professional tax"
              />
            </div>
            <div>
              <label className="block font-semibold">Age:</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Enter your age"
              />
            </div>
            <div>
              <label className="block font-semibold">Deductions (e.g., 80C, 80D):</label>
              <input
                type="number"
                value={deductions}
                onChange={(e) => setDeductions(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Enter total deductions"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold">Tax Regime:</label>
            <div className="flex space-x-4 mt-2">
              <button
                type="button"
                onClick={() => setTaxRegime('Old Tax Regime')}
                className={`py-2 px-4 rounded ${
                  taxRegime === 'Old Tax Regime' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                Old Tax Regime
              </button>
              <button
                type="button"
                onClick={() => setTaxRegime('New Tax Regime')}
                className={`py-2 px-4 rounded ${
                  taxRegime === 'New Tax Regime' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                New Tax Regime
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {taxRegime === 'Old Tax Regime'
                ? 'The old tax regime allows you to claim deductions like HRA, 80C, etc.'
                : 'The new tax regime offers simplified tax rates without deductions.'}
            </p>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-6 rounded font-semibold hover:bg-green-600"
            >
              Calculate Tax
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-red-500 text-white py-2 px-6 rounded font-semibold hover:bg-red-600"
            >
              Reset
            </button>
          </div>
        </form>

        {calculatedTax && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Tax Summary:</h3>
            <p>Total Income: ₹{calculatedTax.totalIncome.toFixed(2)}</p>
            <p>Taxable Income: ₹{calculatedTax.taxableIncome.toFixed(2)}</p>
            <p>Calculated Tax: ₹{calculatedTax.tax.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeTaxCalculator;
