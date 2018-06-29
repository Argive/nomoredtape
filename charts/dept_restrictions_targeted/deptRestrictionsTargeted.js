// Thank you, Elias Zamaria!
const addCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const deptRestrictions = document.getElementById("dept_restrictions_targeted");

const deptRestrictionsChart = new Chart(deptRestrictions, {
  type: 'bar',
  data: {
    labels: [
      "Natural Resources",
      "Public Safety",
      "Public Service Commission",
      "Revenue",
      "Mental Health",
      "Higher Education",
      "Transportation",
      "Labor/Industrial Relations",
      "Insurance",
      "Corrections",
      "Elementary/Secondary Education",
      "Agriculture",
      "Health/Senior Services",
      "Social Services",
      "Economic Development",
      "Office of Administration",
      "Conservation",
    ],
    datasets: [
      {
        label: 'Remaining',
        data: [
          15277,
          4956,
          4030,
          2844,
          4723,
          816,
          1703,
          2117,
          19270,
          171,
          1824,
          4738,
          16233,
          8317,
          7384,
          2150,
          1100,
        ],
        backgroundColor: [
          "rgba(32,97,119, 0.2)",
          "rgba(32,97,119, 0.2)",
          "rgba(32,97,119, 0.2)",
          "rgba(32,97,119, 0.2)",
          "rgba(32,97,119, 0.2)",
          "rgba(32,97,119, 0.2)",
          "rgba(32,97,119, 0.2)",
          "rgba(32,97,119, 0.2)",
          "rgba(32,97,119, 0.2)",
          "rgba(32,97,119, 0.2)",
          "rgba(32,97,119, 0.2)",
          "rgba(32,97,119, 0.2)",
          "rgba(32,97,119, 0.2)",
          "rgba(32,97,119, 0.2)",
          "rgba(32,97,119, 0.2)",
          "rgba(32,97,119, 0.2)",
          "rgba(32,97,119, 0.2)",
        ],
        borderColor: [
          'rgba(32,97,119, 1)',
          'rgba(32,97,119, 1)',
          'rgba(32,97,119, 1)',
          'rgba(32,97,119, 1)',
          'rgba(32,97,119, 1)',
          'rgba(32,97,119, 1)',
          'rgba(32,97,119, 1)',
          'rgba(32,97,119, 1)',
          'rgba(32,97,119, 1)',
          'rgba(32,97,119, 1)',
          'rgba(32,97,119, 1)',
          'rgba(32,97,119, 1)',
          'rgba(32,97,119, 1)',
          'rgba(32,97,119, 1)',
          'rgba(32,97,119, 1)',
          'rgba(32,97,119, 1)',
          'rgba(32,97,119, 1)',
        ],
        borderWidth: 1
      },
      {
        label: 'Targeted',
        data: [
          9093,
          2200,
          1684,
          647,
          639,
          593,
          475,
          229,
          95,
          65,
          36,
          27,
          0,
          0,
          0,
          0,
          0,
        ],
        backgroundColor: [
          'rgba(224,19,4, 0.2)',
          'rgba(224,19,4, 0.2)',
          'rgba(224,19,4, 0.2)',
          'rgba(224,19,4, 0.2)',
          'rgba(224,19,4, 0.2)',
          'rgba(224,19,4, 0.2)',
          'rgba(224,19,4, 0.2)',
          'rgba(224,19,4, 0.2)',
          'rgba(224,19,4, 0.2)',
          'rgba(224,19,4, 0.2)',
          'rgba(224,19,4, 0.2)',
          'rgba(224,19,4, 0.2)',
          'rgba(224,19,4, 0.2)',
          'rgba(224,19,4, 0.2)',
          'rgba(224,19,4, 0.2)',
          'rgba(224,19,4, 0.2)',
          'rgba(224,19,4, 0.2)',
        ],
        borderColor: [
          'rgba(224,19,4, 1)',
          'rgba(224,19,4, 1)',
          'rgba(224,19,4, 1)',
          'rgba(224,19,4, 1)',
          'rgba(224,19,4, 1)',
          'rgba(224,19,4, 1)',
          'rgba(224,19,4, 1)',
          'rgba(224,19,4, 1)',
          'rgba(224,19,4, 1)',
          'rgba(224,19,4, 1)',
          'rgba(224,19,4, 1)',
          'rgba(224,19,4, 1)',
          'rgba(224,19,4, 1)',
          'rgba(224,19,4, 1)',
          'rgba(224,19,4, 1)',
          'rgba(224,19,4, 1)',
          'rgba(224,19,4, 1)',
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    legend: {
      reverse: true,
      labels: {
        fontFamily: "'Average', 'sans-serif'",
        fontSize: 17,
        fontStyle: 'bold'
      }
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        stacked: true,
        ticks: {
          beginAtZero:true,
          autoSkip: false,
          fontFamily: "'Average', 'sans-serif'",
          fontSize: 17,
          padding: 5
        },
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          fontFamily: "'Average', 'sans-serif'",
          fontSize: 17,
          padding: 5,
          callback: function(value, index, values) {
            return addCommas(value);
          }
        },
      }]
    },
    tooltips: {
      mode: 'index',
      itemSort: function(a, b) {
        return b.datasetIndex - a.datasetIndex;
      },
      callbacks: {
        title: function(data) {
          if (data.length < 2) return;
          const multiStringText = [`${Math.round(data[0].yLabel / (data[0].yLabel + data[1].yLabel) * 100)}% of Restrictions Targeted`];
          return multiStringText;
        },
        label: function(tooltipItem, data) {
          // return ` ${addCommas(tooltipItem.yLabel)}`;
          if (tooltipItem.datasetIndex === 0) {
            return ` ${addCommas(tooltipItem.yLabel)} Remaining`;
          } else {
            return ` ${addCommas(tooltipItem.yLabel)} Targeted`;
          }
        }
      },
      titleFontSize: 17,
      titleFontFamily: "'Average', 'sans-serif'",
      bodyFontSize: 17,
      bodyFontFamily: "'Average', 'sans-serif'"
    }
  }
});
