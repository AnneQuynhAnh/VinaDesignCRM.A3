document.addEventListener("DOMContentLoaded", (event) => {
  console.log("Document loaded.");

  let currentWeekRange = "firstHalf";

  const button = document.querySelector(".arrow-button");
  if (button) {
    updateButtonText(button, currentWeekRange);
    button.addEventListener("click", toggleWeekRange);
  } else {
    console.error("Button not found.");
  }

  function toggleWeekRange() {
    currentWeekRange =
      currentWeekRange === "firstHalf" ? "secondHalf" : "firstHalf";
    updateButtonText(button, currentWeekRange);
    fetchAndDisplayData(currentWeekRange);
  }

  function updateButtonText(button, weekRange) {
    button.textContent =
      weekRange === "firstHalf" ? "Tuần 1, 2 >" : "Tuần 3, 4 >";
    button.dataset.weekRange = weekRange;
  }

  function getWeekDays(startDate, endDate) {
    const weekDays = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    while (start <= end) {
      weekDays.push(new Date(start).toISOString().split("T")[0]);
      start.setDate(start.getDate() + 1);
    }

    return weekDays;
  }

  function formatCurrency(value) {
    // Format number with grouping separators and keep 3 decimal places
    return value.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function fetchAndDisplayData(weekRange) {
    let startDate, endDate;
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    if (weekRange === "firstHalf") {
      startDate = firstDayOfMonth.toISOString().split("T")[0];
      endDate = new Date(firstDayOfMonth.setDate(14))
        .toISOString()
        .split("T")[0];
    } else {
      startDate = new Date(firstDayOfMonth.setDate(15))
        .toISOString()
        .split("T")[0];
      endDate = new Date(
        firstDayOfMonth.getFullYear(),
        firstDayOfMonth.getMonth() + 1,
        0
      )
        .toISOString()
        .split("T")[0];
    }

    console.log(`Fetching data from ${startDate} to ${endDate}`);

    fetch(
      `/orders/weekly-summary-ad?start_date=${startDate}&end_date=${endDate}&daily=true`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetched for range:", data);

        if (!data || Object.keys(data).length === 0) {
          console.warn("No data found for the selected week range.");
          updateCharts([], startDate, endDate);
          return;
        }

        if (Array.isArray(data)) {
          updateCharts(data, startDate, endDate);
        } else if (typeof data === "object") {
          updateChartsWithSummary(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const ctxIncomeChart = document
    .getElementById("incomeChart")
    ?.getContext("2d");
  const ctxTotalIncomeChart = document
    .getElementById("totalIncomeChart")
    ?.getContext("2d");
  const ctxOrderSummaryChart = document
    .getElementById("orderSummaryChart")
    ?.getContext("2d");

  if (!ctxIncomeChart || !ctxTotalIncomeChart || !ctxOrderSummaryChart) {
    console.error("One or more chart contexts are null.");
    return;
  }

  const incomeChart = new Chart(ctxIncomeChart, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Total Income (Tổng tiền)",
          data: [],
          backgroundColor: "#000",
          borderColor: "#000",
          borderWidth: 1,
        },
        {
          label: "Completed Income (Thu Hoàn Tất)",
          data: [],
          backgroundColor: "#DF2524",
          borderColor: "#DF2524",
          borderWidth: 1,
        },
        {
          label: "Total Orders (Tổng đơn)",
          data: [],
          backgroundColor: "#28a745",
          borderColor: "#28a745",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: { beginAtZero: true, ticks: { color: "#000" } },
        x: { ticks: { color: "#000" } },
      },
      plugins: { legend: { display: true } },
    },
  });

  const totalIncomeChart = new Chart(ctxTotalIncomeChart, {
    type: "doughnut",
    data: {
      labels: ["Đã Thu", "Còn Nợ"],
      datasets: [{ data: [0, 0], backgroundColor: ["#DF2524", "#BEBEB3"] }],
    },
    options: {
      responsive: true,
      cutout: "70%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
      onClick: (evt, item) => {
        if (item.length > 0) {
          const index = item[0].index;
          const label = totalIncomeChart.data.labels[index];
          const value = totalIncomeChart.data.datasets[0].data[index];
          alert(`Income Detail:\n${label}: ${value} VND`);
        }
      },
    },
  });

  const orderSummaryChart = new Chart(ctxOrderSummaryChart, {
    type: "doughnut",
    data: {
      labels: [
        "Đơn Hoàn Tất",
        "Đơn Đang Tiến Hành",
        "Đơn Bị Huỷ",
        "Đơn Chưa Cập Nhật",
      ],
      datasets: [
        {
          data: [0, 0, 0, 0],
          backgroundColor: ["#28a745", "#DF2524", "#BEBEB3", "#FFDD57"],
        },
      ],
    },
    options: {
      responsive: true,
      cutout: "70%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
      onClick: (evt, item) => {
        if (item.length > 0) {
          const index = item[0].index;
          const label = orderSummaryChart.data.labels[index];
          const value = orderSummaryChart.data.datasets[0].data[index];
          alert(`Order Detail:\n${label}: ${value} orders`);
        }
      },
    },
  });

  function updateCharts(data, startDate, endDate) {
    const daysInRange = getWeekDays(startDate, endDate);

    const totalAmounts = [];
    const completedAmounts = [];
    const totalOrders = [];

    daysInRange.forEach((date) => {
      const matchingData = data.find(
        (item) => new Date(item.day).toISOString().split("T")[0] === date
      );
      totalAmounts.push(
        matchingData ? parseFloat(matchingData.total_amount) || 0 : 0
      );
      completedAmounts.push(
        matchingData ? parseFloat(matchingData.completed_amount) || 0 : 0
      );
      totalOrders.push(
        matchingData ? parseInt(matchingData.total_orders) || 0 : 0
      );
    });

    console.log("Total Amounts:", totalAmounts);
    console.log("Completed Amounts:", completedAmounts);
    console.log("Total Orders:", totalOrders);

    incomeChart.data.labels = daysInRange;
    incomeChart.data.datasets[0].data = totalAmounts.map(formatCurrency);
    incomeChart.data.datasets[1].data = completedAmounts.map(formatCurrency);
    incomeChart.data.datasets[2].data = totalOrders;
    incomeChart.update();

    const totalIncome = totalAmounts.reduce((acc, val) => acc + val, 0);
    const totalDeposited = completedAmounts.reduce((acc, val) => acc + val, 0);
    const totalDebt = totalIncome - totalDeposited;

    totalIncomeChart.data.datasets[0].data = [
      formatCurrency(totalDeposited),
      formatCurrency(totalDebt),
    ];
    totalIncomeChart.update();

    orderSummaryChart.data.datasets[0].data = [
      data.reduce((acc, item) => acc + (item.completed || 0), 0),
      data.reduce((acc, item) => acc + (item.processing || 0), 0),
      data.reduce((acc, item) => acc + (item.cancelled || 0), 0),
      data.reduce((acc, item) => acc + (item.notUpdated || 0), 0),
    ];
    orderSummaryChart.update();

    updateDisplayElements(totalIncome, totalDeposited, totalDebt, data);
  }

  function updateDisplayElements(totalIncome, totalDeposited, totalDebt, data) {
    const summaryTotalIncomeElement =
      document.getElementById("summaryTotalIncome");
    const summaryDepositedElement = document.getElementById("summaryDeposited");
    const summaryDebtElement = document.getElementById("summaryDebt");

    if (
      !summaryTotalIncomeElement ||
      !summaryDepositedElement ||
      !summaryDebtElement
    ) {
      console.error("One or more summary elements are not found.");
      return;
    }

    summaryTotalIncomeElement.textContent =
      formatCurrency(totalIncome) + " VND";
    summaryDepositedElement.textContent =
      formatCurrency(totalDeposited) + " VND";
    summaryDebtElement.textContent = formatCurrency(totalDebt) + " VND";
    document.getElementById("summaryTotalOrders").textContent = data.reduce(
      (acc, item) => acc + item.total_orders,
      0
    );
    document.getElementById("summaryCompletedOrders").textContent = data.reduce(
      (acc, item) => acc + (item.completed || 0),
      0
    );
    document.getElementById("summaryCancelledOrders").textContent = data.reduce(
      (acc, item) => acc + (item.cancelled || 0),
      0
    );
    document.getElementById("summaryProcessingOrders").textContent =
      data.reduce((acc, item) => acc + (item.processing || 0), 0);
    document.getElementById("summaryNotUpdatedOrders").textContent =
      data.reduce((acc, item) => acc + (item.notUpdated || 0), 0);
  }

  function updateChartsWithSummary(summaryData) {
    const totalIncome = parseFloat(summaryData.total_amount) || 0;
    const totalDeposited = parseFloat(summaryData.completed_amount) || 0;
    const totalDebt = totalIncome - totalDeposited;

    totalIncomeChart.data.datasets[0].data = [
      formatCurrency(totalDeposited),
      formatCurrency(totalDebt),
    ];
    totalIncomeChart.update();

    orderSummaryChart.data.datasets[0].data = [
      summaryData.completed || 0,
      summaryData.processing || 0,
      summaryData.cancelled || 0,
      summaryData.notUpdated || 0,
    ];
    orderSummaryChart.update();

    updateDisplayElements(totalIncome, totalDeposited, totalDebt, [
      summaryData,
    ]);
  }

  fetchAndDisplayData(currentWeekRange);
});
