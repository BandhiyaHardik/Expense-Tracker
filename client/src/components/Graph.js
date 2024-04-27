import React from 'react';
import { Chart, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Label from './Label';
import { useSelector } from 'react-redux';

Chart.register(ArcElement);

const Graph = () => {
  const transactionsFromStore = useSelector((state) => state.expensesReducer.transactions);

  // Calculate the total amount from the remaining transactions
  const totalAmount = transactionsFromStore.reduce((total, transaction) => {
    if (transaction.type === 'Expense' || transaction.type === 'Investment') {
      return total - Number(transaction.amount);
    } else {
      return total + Number(transaction.amount);
    }
  }, 0);

  // Extract the amounts from transactions and labels from types
  const transactionAmounts = transactionsFromStore.map((transaction) => transaction.amount);
  const transactionTypes = transactionsFromStore.map((transaction) => transaction.type);

  // Define a function to calculate the total amount for each type
  const typeAmounts = {};
  transactionAmounts.forEach((amount, index) => {
    const type = transactionTypes[index];
    if (!typeAmounts[type]) {
      typeAmounts[type] = 0;
    }
    if (type === 'Expense' || type === 'Investment') {
      typeAmounts[type] -= Number(amount);
    } else {
      typeAmounts[type] += Number(amount);
    }
  });

  // Extract unique types and their corresponding amounts
  const uniqueTypes = Object.keys(typeAmounts);
  const typeAmountValues = uniqueTypes.map((type) => typeAmounts[type]);

  // Define colors for the chart
  const colors = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    // Add more colors as needed for additional types
  ];

  // Create the chart data
  const chartData = {
    labels: uniqueTypes,
    datasets: [
      {
        data: typeAmountValues,
        backgroundColor: colors,
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    options: {
      cutout: 100,
    },
  };

  return (
    <div className="flex justify-center max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          <Doughnut {...config} data={chartData} />
          <h3 className="mb-4 font-bold title">
            Total
            <span className="block text-3xl text-emerald-400">
              {totalAmount < 0 ? '-' : ''}
              &#x20b9;{Math.abs(totalAmount)}
            </span>
          </h3>
        </div>
        <div className="flex flex-col py-10 gap-4">
          <Label />
        </div>
      </div>
    </div>
  );
};

export default Graph;
