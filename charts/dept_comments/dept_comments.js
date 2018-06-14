const deptComments = document.getElementById("dept_comments");

// Thank you, Elias Zamaria!
// const addCommas = (x) => {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };

const deptCommentsChart = new Chart(deptComments, {
  type: 'bar',
  data: {
    labels: [
      "Agriculture",
      "Conservation",
      "Public Safety",
      "Health/Senior Services",
      "Labor/Industrial Relations",
      "Office of Administration",
      "Public Service Commission",
      "Natural Resources",
      "Revenue",
      "Social Services",
      "Economic Development",
      "Transportation",
      "Insurance",
      "Corrections",
      "Elementary/Secondary Education",
      "Mental Health",
      "Higher Education"
    ],
    datasets: [{
      label: 'Comments Received',
      data: [
        2183,
        671,
        238,
        159,
        127,
        124,
        113,
        105,
        99,
        93,
        92,
        88,
        55,
        40,
        23,
        22,
        7,
      ],
      backgroundColor: [
        'rgba(217,98,0, 0.2)',
        'rgba(74,143,255, 0.2)',
        'rgba(32,97,119, 0.2)',
        'rgba(66,232,244, 0.2)',
        'rgba(4,201,201, 0.2)',
        'rgba(255,149,0, 0.2)',
        'rgba(255,0,128, 0.2)',
        'rgba(32,117,43, 0.2)',
        'rgba(255,208,0, 0.2)',
        'rgba(132,2,161, 0.2)',
        'rgba(255,208,0, 0.2)',
        'rgba(116,116,116, 0.2)',
        'rgba(56,209,201, 0.2)',
        'rgba(116,116,116, 0.2)',
        'rgba(224,19,4, 0.2)',
        'rgba(0,173,23, 0.2)',
        'rgba(32,97,119, 0.2)'
      ],
      borderColor: [
        'rgba(217,98,0, 1)',
        'rgba(74,143,255, 1)',
        'rgba(32,97,119, 1)',
        'rgba(66,232,244, 1)',
        'rgba(4,201,201, 1)',
        'rgba(255,149,0, 1)',
        'rgba(255,0,128, 1)',
        'rgba(32,117,43, 1)',
        'rgba(255,208,0, 1)',
        'rgba(132,2,161, 1)',
        'rgba(255,208,0, 0.2)',
        'rgba(116,116,116, 1)',
        'rgba(56,209,201, 1)',
        'rgba(116,116,116, 1)',
        'rgba(224,19,4, 1)',
        'rgba(0,173,23, 1)',
        'rgba(32,97,119, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
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
        ticks: {
          fontFamily: "'Average', 'sans-serif'",
          fontSize: 17,
          padding: 5,
          callback: function(value, index, values) {
            return addCommas(value);
          }
        }
      }]
    },
    tooltips: {
      titleFontSize: 17,
      titleFontFamily: "'Average', 'sans-serif'",
      bodyFontSize: 17,
      bodyFontFamily: "'Average', 'sans-serif'",
      callbacks: {
        label: function(tooltipItem, data) {
          return ` ${addCommas(tooltipItem.yLabel)} comments`;
        }
      },
    }
  }
});
