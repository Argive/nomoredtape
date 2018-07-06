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
      "Insurance",
      "Health/Senior Services",
      "Social Services",
      "Economic Development",
      "Public Safety",
      "Public Service Commission",
      "Mental Health",
      "Agriculture",
      "Revenue",
      "Labor/Industrial Relations",
      "Transportation",
      "Office of Administration",
      "Elementary/Secondary Education",
      "Higher Education",
      "Conservation",
      "Corrections",
    ],
    datasets: [
      {
        label: 'Remaining',
        data: [
          15437,
          19270,
          16233,
          8317,
          7384,
          6851,
          4030,
          5302,
          4738,
          2952,
          2117,
          1703,
          2150,
          1824,
          1409,
          1100,
          106,
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
          8933,
          95,
          0,
          0,
          0,
          305,
          1684,
          60,
          27,
          539,
          229,
          475,
          0,
          36,
          0,
          0,
          65,
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
