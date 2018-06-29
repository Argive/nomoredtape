const ruleTracker = document.getElementById("rule_tracker");

// Thank you, Elias Zamaria!
const addCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

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
    legend: {
      reverse: false,
      position: 'bottom',
      labels: {
        fontFamily: "'Average', 'sans-serif'",
        fontSize: 17,
        fontStyle: 'bold'
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
      itemSort: function(a, b) {
        return b.datasetIndex - a.datasetIndex;
      },
      position: 'average',
      callbacks: {
        title: function(data) {
          return;
        },
      },
      titleFontSize: 17,
      titleFontFamily: "'Average', 'sans-serif'",
      bodyFontSize: 17,
      bodyFontFamily: "'Average', 'sans-serif'",
      bodyFontStyle: 'bold',
    }
  }
});
