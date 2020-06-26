async function loadTypes() {
  types = {}
  pieData = []
  pieLabel = []

  dateMonth = {}
  lineData = []
  lineLabel = []

  const urlParams = new URLSearchParams(window.location.search);
  userId = urlParams.get('id');

  await fetch(`http://localhost:3333/api/users/${userId}`, {method: 'GET'})
    .then(response => response.json()
        .then(data => {
            user = data
            postsArray = data.posts.items
        })
    )
  postsArray.map(item => {  
    if(types[item.type] !== undefined){
      types[item.type] += 1
    }
    else {
      types[item.type] = 1
    }
    date = new Date(item.createdAt)

    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    month = date.getMonth()

    if(dateMonth[months[month]] !== undefined){
      dateMonth[months[month]] += 1
    }
    else {
      dateMonth[months[month]] = 1
    }
  })

  for( key in dateMonth) {
    lineData.push(dateMonth[key])
    lineLabel.push(key)
  }

  for( key in types) {
    pieData.push(types[key])
    pieLabel.push(key)
  }

  const content = 
  `
    <div style="min-height: 260px; width: 40%;">
      <h3>Posts por conteudo</h3>
      <div id="chart"></div>
    </div>
    <div style="min-height: 260px; width: 60%!important;">
      <h3>Posts por mes</h3>
      <div id="timeline"></div>
    </div>
    <div style="min-height: 260px; width: 100%!important;">
      <h3 style="text-align: center">Total do plano consumido</h3>
      <div id="gaugeChart"></div>
    </div>
  `

  document.getElementById('charts').innerHTML = content

  populatePieChart(pieData, pieLabel)
  populateLineChart(lineData, lineLabel)
  populateGaugeChart(user.plan_total, user.posts.items_total)

}

function populatePieChart(data, label) {

  var options = {
    series: data,
    xaxis: {
        position: 'bottom'
    },
    chart: {
    width: "80%",
    height: 260,
    type: 'pie',
  },
  labels: label,
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}

function populateLineChart(data, label) {

  var options = {
    series: [{
      data: data
    }],
    chart: {
    type: 'bar',
    height: 260,
    width: '100%'
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '5%',
    },
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories:label,
    labels:{
      show:true
    },
    title: {
      text: 'Months'
    }
  },
  yaxis: {
    title: {
      text: '( Posts )'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " posts"
      },
    },
  }
  };
  
  var timeline = new ApexCharts(document.querySelector("#timeline"), options);
  timeline.render();
  
}

function populateGaugeChart(total, posts) {
  usage = (posts*100)/total

  if( usage < 70 ) {
    color = 'rgb(0, 143, 251)'
  }
  else if ( usage >= 70 && usage < 90 ) {
    color = 'rgb(254, 176, 25)'
  }
  else {
    color = '#F44336'
  }

  console.log(usage)
  var options = {
    fill: {
      colors: [color]
    },
    series: [usage],
    chart: {
    height: 260,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '70%',
      }
    },
  },
  labels: ['Plano Usado'],
  };

  // var options = {
  //   series: [
  //     {
  //       name: "Desktops",
  //       data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  //     },
  //     {
  //       name: "phones",
  //       data: [22, 11, 35, 41, 79, 32, 59, 100, 148]
  //     },
  //     {
  //       name: "tvs",
  //       data: [42, 21, 15, 31, 49, 32, 59, 150, 48]
  //     }
  //   ],
  //   chart: {
  //   height: 350,
  //   type: 'line',
  //   zoom: {
  //     enabled: false
  //   }
  // },
  // dataLabels: {
  //   enabled: false
  // },
  // stroke: {
  //   curve: 'straight'
  // },
  // title: {
  //   text: 'Product Trends by Month',
  //   align: 'left'
  // },
  // grid: {
  //   row: {
  //     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
  //     opacity: 0.5
  //   },
  // },
  // xaxis: {
  //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  // }
  // };

  var gauge = new ApexCharts(document.querySelector("#gaugeChart"), options);
  gauge.render();
}
