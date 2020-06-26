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
  <div style="height: 350px; width: 40%;">
    <h3>Posts por tipo de conteudo</h3>
    <div id="chart"></div>
  </div>
  <div style="height: 350px; width: 60%!important;">
    <h3>Posts por mes</h3>
    <div id="timeline"></div>
  </div>
  `

  document.getElementById('charts').innerHTML = content

  populatePieChart(pieData, pieLabel)
  populateLineChart(lineData, lineLabel)

}

function populatePieChart(data, label) {

  var options = {
    series: data,
    xaxis: {
        position: 'bottom'
    },
    chart: {
    width: "80%",
    height: 350,
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
    height: 350
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
        return "$ " + val + " thousands"
      }
    }
  }
  };
  
  var timeline = new ApexCharts(document.querySelector("#timeline"), options);
  timeline.render();
  
}

