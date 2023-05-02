import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import Box from "@mui/material/Box";
import Checkbox from "@material-ui/core/Checkbox";
import { InputLabel } from "@material-ui/core";
import { Input } from "@material-ui/core"; // ADD THIS LINE

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(3),
    minWidth: 120,
  },
  radioGroup: {
    flexDirection: "row",
  },
  textField: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  inputAdornment: {
    marginRight: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(3),
  },
}));

export default function CashCreditCalculator() {
  const classes = useStyles();

  const [facilityType, setFacilityType] = useState("");
  const [businessActivity, setBusinessActivity] = useState("");
  const [salesTurnover, setSalesTurnover] = useState("");
  const [isProfitable, setIsProfitable] = useState("");
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanDuration, setLoanDuration] = useState(1);
  const [isEligible, setIsEligible] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [optionList, setOptionList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [profitAfterTax, setProfitAfterTax] = useState(0);
  const [creditPeriod, setCreditPeriod] = useState(0);
  const [creditorsPosition, setCreditorsPosition] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [interestExpenses, setInterestExpenses] = useState(0);
  const [totalAccruals, setTotalAccruals] = useState("");
  const [depreciationExpenses, setDepreciationExpenses] = useState(0);
  const [loanAmountRequired, setLoanAmountRequired] = useState(0);
  const [emi, setEMI] = useState("");
  const [interestOutgo, setInterestOutgo] = useState("");
  const [totalServiceCost, setTotalServiceCost] = useState("");
  const [dscr, setDSCR] = useState("");
  const [tenure, setTenure] = useState("");
  const [loanType, setLoanType] = useState("");
  const [resetForm, setResetForm] = useState(false);
  const [isTermLoanSelected, setIsTermLoanSelected] = useState(false);
  const [someOtherCondition, setSomeOtherCondition] = useState(false);
  const [handleDifferentApplyButtonClick, setHandleDifferentApplyButtonClick] =
    useEffect(() => {
      if (facilityType === "term-loan") {
        const totalAccrualsInRupees = totalAccruals * 100000; // Convert Total Accruals from Lakhs to Rupees
        const loanAmount = Math.floor(totalAccrualsInRupees / 0.8); // Calculate Loan Amount Required as 80% of Total Accruals
        setLoanAmountRequired(loanAmount);
      }
    }, [facilityType, totalAccruals]);
  const handleTotalAccrualsChange = (event) => {
    setTotalAccruals(event.target.value);
  };

  const handleCreditorsPositionChange = (event) => {
    const newCreditorsPosition = event.target.value;
    setCreditorsPosition(newCreditorsPosition);
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (event) => {
    if (event.target.value === "no") {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  };

  const handleCreditPeriodChange = (event) => {
    setCreditPeriod(event.target.value);
  };

  const handleClick = () => {
    if (businessActivity === "manufacturing" && salesTurnover >= 77777) {
      const eligibleAmount = salesTurnover * 0.2;
      alert(
        `Congratulations! You are eligible for a Working Capital facility of ₹ ${eligibleAmount.toLocaleString(
          "en-IN",
          { maximumFractionDigits: 2 }
        )} Lakhs\nPlease click on Apply Now for further processing.`
      );
    } else if (
      (businessActivity === "trading" || businessActivity === "services") &&
      salesTurnover >= 99999
    ) {
      const eligibleAmount = salesTurnover * 0.15;
      alert(
        `Congratulations! You are eligible for a Working Capital facility of ₹ ${eligibleAmount.toLocaleString(
          "en-IN",
          { maximumFractionDigits: 2 }
        )} Lakhs\nPlease click on Apply Now for further processing.`
      );
    }
  };

  <Button
    variant="contained"
    onClick={() => {
      handleApplyButtonClick();
      handleClick();
    }}
  >
    Apply
  </Button>;

  const handleClick2 = () => {
    const emi = calculateEMI(loanAmountRequired, loanDuration);
    const interestOutgo = calculateInterestOutgo(
      loanAmountRequired,
      loanDuration
    );
    const totalServiceCost = loanAmountRequired + interestOutgo;
    const dscr = calculateDSCR(
      profitAfterTax,
      interestExpenses,
      depreciationExpenses,
      totalAccruals,
      emi
    );

    if (dscr < 1.2) {
      setResultMessage(
        "Sorry, You are not eligible for Term loan facility. Please adjust Loan Amount Required and/or Tenure to get eligibility. If still not eligible - Please visit our nearest branch & our representative will assist you."
      );
    } else {
      setResultMessage(
        `EMI ₹ ${emi.toLocaleString("en-IN", {
          maximumFractionDigits: 2,
        })} Lakhs\nInterest Outgo ₹ ${interestOutgo.toLocaleString("en-IN", {
          maximumFractionDigits: 2,
        })} Lakhs\nTotal Service Cost ₹ ${totalServiceCost.toLocaleString(
          "en-IN",
          { maximumFractionDigits: 2 }
        )} Lakhs\nDSCR ₹ ${dscr.toLocaleString("en-IN", {
          maximumFractionDigits: 2,
        })} Lakhs`
      );
    }
  };

  const handleApplyNowClick = () => {
    // Calculate EMI, Interest Outgo, Total Service Cost, and DSCR based on loanAmount, interestRate, and loanTenure
    const emi = calculateEmi(loanAmount, interestRate, loanTenure);
    const interestOutgo = calculateInterestOutgo(
      loanAmount,
      interestRate,
      loanTenure
    );
    const totalServiceCost = calculateTotalServiceCost(
      loanAmount,
      interestOutgo
    );
    const dscr = calculateDscr(emi, totalServiceCost, monthlyIncome);

    // Update state variables for each of the four fields
    setEmi(emi);
    setInterestOutgo(interestOutgo);
    setTotalServiceCost(totalServiceCost);
    setDscr(dscr);

    // Set showResults to true to display the results
    setShowResults(true);
  };

  const calculateTotalAccruals = () => {
    const totalAccruals =
      loanAmountRequired -
      interestExpenses -
      depreciationExpenses +
      profitAfterTax;
    return totalAccruals;
  };

  const handleLoanAmountChange = (event) => {
    setLoanAmount(event.target.value);
    setLoanAmountRequired(event.target.value * 100000);
    setTotalAccruals(calculateTotalAccruals());
  };

  const handleInterestExpensesChange = (event) => {
    const value = parseFloat(event.target.value);
    setInterestExpenses(value);
    if (value || profitAfterTax || depreciationExpenses) {
      const sum =
        (parseFloat(profitAfterTax) || 0) +
        (parseFloat(interestExpenses) || 0) +
        (parseFloat(depreciationExpenses) || 0);
      setTotalAccruals(sum);
    } else {
      setTotalAccruals("");
    }
  };

  const handleDepreciationExpensesChange = (event) => {
    const value = parseFloat(event.target.value);
    setDepreciationExpenses(value);
    if (value || profitAfterTax || interestExpenses) {
      const sum =
        (parseFloat(profitAfterTax) || 0) +
        (parseFloat(interestExpenses) || 0) +
        (parseFloat(depreciationExpenses) || 0);
      setTotalAccruals(sum);
    } else {
      setTotalAccruals("");
    }
  };

  const handleProfitAfterTaxChange = (event) => {
    const value = parseFloat(event.target.value);
    setProfitAfterTax(value);
    if (value || interestExpenses || depreciationExpenses) {
      setTotalAccruals(
        value +
          (parseFloat(interestExpenses) || 0) +
          (parseFloat(depreciationExpenses) || 0)
      );
    } else {
      setTotalAccruals("");
    }
  };

  const handleLoanAmountRequiredChange = (event) => {
    setLoanAmountRequired(parseFloat(event.target.value));
  };

  const handleTenureChange = (event) => {
    setTenure(parseFloat(event.target.value));
  };

  const handleCashCreditButtonClick = () => {
    setLoanType("Cash Credit");
    setResetForm(true);
  };

  const handleOverdraftButtonClick = () => {
    setLoanType("Overdraft");
    setResetForm(true);
  };

  const handleFacilityTypeChange = (event) => {
    setFacilityType(event.target.value);
    if (event.target.value === "term-loan") {
      setIsTermLoanSelected(true);
    } else {
      setIsTermLoanSelected(false);
    }
  };

  const handleApplyButtonClick = () => {
    const loanAmount = parseFloat(loanAmountRequired) || 0;
    const interestRate = 12.5 / 12 / 100; // assuming monthly interest rate of 12.5%
    const emi =
      (loanAmount * interestRate * Math.pow(1 + interestRate, tenure * 12)) /
      (Math.pow(1 + interestRate, tenure * 12) - 1);
    setEMI(emi);
    const interestOutgo = emi * tenure * 12 - loanAmount;
    setInterestOutgo(interestOutgo);
    const totalServiceCost = interestOutgo + loanAmount;
    setTotalServiceCost(totalServiceCost);
    const dscr = totalAccruals / emi;
    setDSCR(dscr);
    setShowResults(true);
    setResetForm(true);
    setShowResults(true);
  };

  const handleBusinessActivityChange = (event) => {
    setBusinessActivity(event.target.value);
  };

  const handleSalesTurnoverChange = (event) => {
    setSalesTurnover(event.target.value);
  };

  const handleProfitableChange = (event) => {
    setIsProfitable(event.target.value);
    if (event.target.value === "no") {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  };

  const handleLoanDurationChange = (event) => {
    setLoanDuration(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let repaymentAmount = 0;
    if (facilityType === "term-loan") {
      // Calculate the loan repayment based on the loan amount and loan duration
      const interestRate = 0.1; //Assume an interest rate of 10%
      const monthlyInterestRate = interestRate / 12;
      const numMonths = loanDuration * 12;
      const monthlyPayment =
        loanAmount *
        (monthlyInterestRate / (1 - (1 + monthlyInterestRate) ** -numMonths));
      repaymentAmount = monthlyPayment * numMonths;
    }

    // Display the Loan amount to the user
    alert(`Your Loan amount is: ₹${repaymentAmount}`);
  };

  return (
    <Box border={1} p={2} width={1 / 2} mx="auto">
      <div className={classes.root}>
        <div className={classes.heading}>
          <Typography variant="h4" component="h1" align="center">
            Cash Credit Calculator
          </Typography>
        </div>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center">
            <Typography style={{ width: "200px" }}>
              Type of Facility Required
            </Typography>
            <RadioGroup
              aria-label="facility-type"
              name="facility-type"
              value={facilityType}
              onChange={handleFacilityTypeChange}
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "20px",
              }}
            >
              <FormControlLabel
                value="cash-credit"
                control={<Radio />}
                label="Cash Credit"
              />

              <FormControlLabel
                value="overdraft"
                control={<Radio />}
                label="Overdraft"
              />
              <FormControlLabel
                value="term-loan"
                control={<Radio />}
                label="Term Loan"
              />
            </RadioGroup>
          </Box>

          {facilityType !== "term-loan" && (
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Box display="flex" alignItems="center">
                <Typography style={{ width: "200px", fontSize: "10.5pt" }}>
                  Business Activity
                </Typography>
                <FormControl style={{ minWidth: "150px", marginLeft: "20px" }}>
                  <Select
                    value={businessActivity}
                    onChange={handleBusinessActivityChange}
                    style={{ fontSize: "10.5pt" }}
                  >
                    <MenuItem
                      value="manufacturing"
                      style={{ fontSize: "10.5pt" }}
                    >
                      Manufacturing
                    </MenuItem>
                    <MenuItem value="trading" style={{ fontSize: "10.5pt" }}>
                      Trading
                    </MenuItem>
                    <MenuItem value="services" style={{ fontSize: "10.5pt" }}>
                      Services
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography style={{ width: "200px", fontSize: "10.5pt" }}>
                  Sales Turnover (of latest Financial Year)
                </Typography>
                <FormControl style={{ minWidth: "150px", marginLeft: "20px" }}>
                  <TextField
                    value={salesTurnover}
                    onChange={handleSalesTurnoverChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          style={{ marginRight: "10px", fontSize: "10.5pt" }}
                        >
                          ₹
                        </InputAdornment>
                      ),
                      inputProps: { style: { fontSize: "10.5pt" } },
                    }}
                  />
                </FormControl>
              </Box>
            </Box>
          )}

          {facilityType === "term-loan" ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              gap={2}
            >
              <TextField
                label="Profit After Tax"
                value={profitAfterTax}
                onChange={handleProfitAfterTaxChange}
                type="number"
              />
              <TextField
                label="Interest Expenses"
                value={interestExpenses}
                onChange={handleInterestExpensesChange}
                type="number"
              />
              <TextField
                label="Depreciation Expenses"
                value={depreciationExpenses}
                onChange={handleDepreciationExpensesChange}
                type="number"
              />
              <TextField
                label="Total Accruals"
                value={totalAccruals}
                type="number"
                disabled
              />
              <TextField
                label="Loan Amount Required"
                value={loanAmountRequired}
                onChange={handleLoanAmountRequiredChange}
                type="number"
              />
              <TextField
                label="Tenure (in years)"
                value={tenure}
                onChange={handleTenureChange}
                type="number"
              />
            </Box>
          ) : null}

          <Button
            variant="contained"
            onClick={() => {
              handleClick();
              handleApplyButtonClick();
            }}
          >
            Apply
          </Button>

          {isTermLoanSelected && showResults && (
            <>
              <TextField label="EMI" value={emi} type="number" disabled />
              <TextField
                label="Interest Outgo"
                value={interestOutgo}
                type="number"
                disabled
              />
              <TextField
                label="Total Service Cost"
                value={totalServiceCost}
                type="number"
                disabled
              />
              <TextField label="DSCR" value={dscr} type="number" disabled />
            </>
          )}
          <FormControl className={classes.formControl}>
            <FormLabel component="legend">Required Documents</FormLabel>
            <ul>
              <li>Application Form</li>
              <li>Last 2 years Audited Financial statements.</li>
              <li>Last 6 months Bank statements</li>
              <li>
                Undertaking from Borrower regarding Laminated Documents (For
                Takeover Cases)
              </li>
              <li>
                Copy of the sanction letter of the existing bank (For Takeover
                Cases)
              </li>
              <li>ITR of latest completed FY</li>
              <li>Sales (VAT) Tax Return of latest completed FY</li>
              <li>KYC Documents</li>
              <li>CMA Data including :</li>
              <ul>
                <li>Financial projections for the total tenure of Term Loan</li>
                <li>
                  DSCR calculation for term loan (if any) for total tenure
                </li>
              </ul>
            </ul>
          </FormControl>
          <Box></Box>
          <FormControl className={classes.formControl}>
            {/* Required Documents content */}
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleCheckboxChange}
                name="checked"
              />
            }
            label="I agree to the terms and conditions"
          />
        </Box>
        {/* Add a closing tag for the Box component here */}
      </div>
    </Box>
  );
}
