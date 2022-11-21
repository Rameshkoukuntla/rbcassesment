
import { useState } from 'react';
import { useRouter } from 'next/router'
export default function Home() {
  const router = useRouter();
  const [data, setData] = useState({
    amount: 0,
    interestRate: 0,
    lengthOfloan: 0,
    duration: "monthly"
  });
  const [errors, setErrors] = useState({
    amount: "",
    interestRate: "",
    lengthOfloan: ""
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setErrors({
      ...errors, [e.target.name]: ""
    });

    if (isNaN(parseFloat(e.target.value))) {
      setErrors({
        ...errors, [e.target.name]: "Please Enter Valid Number"
      });
    }
    else {
      if (e.target.name === "amount" && (parseFloat(e.target.value) > 100000 || parseFloat(e.target.value) < 0)) {
        setErrors({
          ...errors, [e.target.name]: "Amount should not be greater than 100000 or not less than 0"
        });
      }
      if (e.target.name === "interestRate" && (parseFloat(e.target.value) > 20 || parseFloat(e.target.value) < 0)) {
        setErrors({
          ...errors, [e.target.name]: "Interset Rate should not be greater than 20 or not less than 0"
        });
      }
      if (e.target.name === "lengthOfloan" && data.duration === "yearly" && (parseFloat(e.target.value) > 30 || parseFloat(e.target.value) < 0)) {
        setErrors({
          ...errors, [e.target.name]: "Length of Loan Rate (Yearly) should not be greater than 30 or not less than 0"
        });
      }
      if (e.target.name === "lengthOfloan" && data.duration === "monthly" && (parseFloat(e.target.value) > 360 || parseFloat(e.target.value) < 0)) {
        setErrors({
          ...errors, [e.target.name]: "Length of Loan Rate (Yearly) should not be greater than 360 or not less than 0"
        });
      }
    }

    setData({
      ...data, [e.target.name]: e.target.value
    });
  }

  const calculatePaymentFormula = () => {
    const apr = data.interestRate / 1200;
    let term = data.lengthOfloan;
    if (data.duration === "yearly")
      term *= 12;
    var payment = data.amount * (apr * Math.pow((1 + apr), term)) / (Math.pow((1 + apr), term) - 1);
    return payment;
  }

  //const successMessage = 'Your monthly mortgage payment will be: '
  const calculateMortage = () => {
    for (var prop in errors) {
    
      if (errors[prop] !== "" && prop !== "duration") {
        alert("There is an error in the form, please check it")
        return;
      }
    }
    // We start the calculations
    const quotas: number = calculatePaymentFormula();
    setSuccessMessage(`Your monthly mortgage payment will be: ${quotas.toFixed(2)}`);


  }
  return (
    <main className="mortgage-form-wrapper">
      <header>
        <h1>Mortgage calculator</h1>
      </header>

      <div className="mortgage-form--row">
        <label htmlFor="amount-input">Mortgage Amount</label>
        <input type="number" onChange={handleChange} value={data.amount} name="amount" min="50000" placeholder="Min 50000" required />
        <p className="mortgage-form--help">{errors.amount}</p>
      </div>
      <div className="mortgage-form--row">
        <label htmlFor="interest-rate-input">Interest rate</label>
        <input type="number" value={data.interestRate} onChange={handleChange} name="interestRate" min="1" max="20" placeholder="Min 1% max 20%" required />
        <p className="mortgage-form--help">{errors.interestRate}</p>
      </div>
      <div className="mortgage-form--row">
        <label >Amortization Duration</label>
        <input type="radio" value="monthly" checked={data.duration === "monthly"} onChange={handleChange}
          name="duration" />
        <span>Monthly</span>
        <input type="radio" value="yearly" checked={data.duration === "yearly"} onChange={handleChange}
          name="duration" />
        <span>Yearly</span>
        <p></p>
      </div>
      <div className="mortgage-form--row">
        <label htmlFor="length-of-loan-input">Amortization Period (Yearly)</label>
        <input type="number" onChange={handleChange} value={data.lengthOfloan} name="lengthOfloan" min="1" max="40" placeholder="Min 1 year, max 40 years" required />
        <p className="mortgage-form--help">{errors.lengthOfloan}</p>
      </div>
      <div className="mortgage-form--row mortgage-form--row__button-wrapper">
        <button type="button" onClick={calculateMortage}>Calculate</button>
        <button type="reset" onClick={()=>router.push('/clock')}>Navigate To Clock</button>
      </div>

      <p className="motgage-result"><span className='success-message' >{successMessage}</span></p>
    </main>
  )
}
