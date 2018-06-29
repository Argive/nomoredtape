// Thank you, Elias Zamaria!
const addCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ruleTracker = document.getElementById("rule_tracker");

const ruleTrackerChart = new Chart(ruleTracker, {
  type: 'horizontalBar',
  data: {
    labels: [
      "All Rule Changes",
    ],
    datasets: [
      {
        label: ' Proposed (Informal)',
        data: [
          116,
        ],
        backgroundColor: [
          'rgba(224,19,4, 0.2)',
        ],
        borderColor: [
          'rgba(224,19,4, 1)',
        ],
        borderWidth: 1
      },
      {
        label: ' Proposed (Formal)',
        data: [
          323,
        ],
        backgroundColor: [
          'rgba(255,208,0, 0.2)',
        ],
        borderColor: [
          'rgba(255,208,0, 1)',
        ],
        borderWidth: 1
      },
      {
        label: ' Final Order',
        data: [
          55,
        ],
        backgroundColor: [
          "rgba(32,97,119, 0.2)",
        ],
        borderColor: [
          'rgba(32,97,119, 1)',
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Tracking the Formal Rulemaking Process',
      fontFamily: "'Average', 'sans-serif'",
      fontSize: 28,
    },
    legend: {
      reverse: false,
      position: 'top',
      labels: {
        fontFamily: "'Average', 'sans-serif'",
        fontSize: 17,
        fontStyle: 'bold'
      },
      onClick: function() {
        return;
      }
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        // display: false,
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
        display: false,
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
      mode: 'nearest',
      xPadding: 12,
      yPadding: 12,
      displayColors: false,
      itemSort: function(a, b) {
        return b.datasetIndex - a.datasetIndex;
      },
      position: 'average',
      callbacks: {
        title: function(data) {
          return;
        },
        label: function(tooltipItem, data) {
          // return ` ${addCommas(tooltipItem.yLabel)}`;
          const ruleCounts = data.datasets.map(dataset => {
            return dataset.data[0];
          })

          const totalCount = ruleCounts.reduce((acc, current) => {
            return acc + current;
          });

          if (tooltipItem.datasetIndex === 0) {
            const multiStringText = ['Proposed (Informal)'];
            multiStringText.push(`${addCommas(tooltipItem.xLabel)} rules (${Math.round((tooltipItem.xLabel / totalCount) * 100)}%)`);
            return multiStringText;
          } else if (tooltipItem.datasetIndex === 1) {
            const multiStringText = ['Proposed (Formal)'];
            multiStringText.push(`${addCommas(tooltipItem.xLabel)} rules (${Math.round((tooltipItem.xLabel / totalCount) * 100)}%)`);
            return multiStringText;
          } else {
            const multiStringText = ['Final Order'];
            multiStringText.push(`${addCommas(tooltipItem.xLabel)} rules (${Math.round((tooltipItem.xLabel / totalCount) * 100)}%)`);
            return multiStringText;
          }
        }
      },
      titleFontSize: 17,
      titleFontFamily: "'Average', 'sans-serif'",
      bodyFontSize: 17,
      bodyFontFamily: "'Average', 'sans-serif'",
      bodyFontStyle: 'bold',
    }
  }
});
