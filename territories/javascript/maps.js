google.charts.load('current', {
  'packages':['geochart'],
});
google.charts.setOnLoadCallback(drawRegionsMap1);
google.charts.setOnLoadCallback(drawRegionsMap2);
google.charts.setOnLoadCallback(drawRegionsMap3);
google.charts.setOnLoadCallback(drawRegionsMap4);
google.charts.setOnLoadCallback(drawRegionsMap5);

function drawRegionsMap1() {
  var data = google.visualization.arrayToDataTable([
    ['Country', {'type': 'string', 'role': 'tooltip'},],
    ['Guam', 'SNAP: Yes\nMedicaid: Yes (Modified)\nTANF: Yes'],
  ]);

  var options = {
    region: 'GU',
    tooltip: {
      textStyle: {
        fontName: 'Computer Modern Sans',
      }
    }
  };
  var chart = new google.visualization.GeoChart(document.getElementById('guam'));
  chart.draw(data, options);
}

function drawRegionsMap2() {
  var data = google.visualization.arrayToDataTable([
    ['Country',],
    ['Northern Mariana Islands'],
  ]);
  var options = {
    region: 'MP',
    tooltip: {
      textStyle: {
        fontName: 'Computer Modern Sans',
      }
    }
  };
  var chart = new google.visualization.GeoChart(document.getElementById('nmi'));
  chart.draw(data, options);
}


function drawRegionsMap3() {
  var data = google.visualization.arrayToDataTable([
    ['Country'],
    ['American Samoa'],
  ]);
  var options = {
    region: 'AS',
    tooltip: {
      textStyle: {
        fontName: 'Computer Modern Sans',
      }
    }
  };

  var chart = new google.visualization.GeoChart(document.getElementById('american_samoa'));
  chart.draw(data, options);
}

function drawRegionsMap4() {
  var data = google.visualization.arrayToDataTable([
    ['Country', {'type': 'string', 'role': 'tooltip'}],
    ['Puerto Rico', 'SNAP: No\nMedicaid: Partial\nTANF: Yes\nEITC: No\nCTC: No'],
  ]);
  var options = {
    region: 'PR',
    tooltip: {
      textStyle: {
        fontName: 'Computer Modern Sans',
      }
    }
  };
  var chart = new google.visualization.GeoChart(document.getElementById('puerto_rico'));
  chart.draw(data, options);
}

function drawRegionsMap5() {
  var data = google.visualization.arrayToDataTable([
    ['Country'],
    ['U.S. Virgin Islands'],
  ]);
  var options = {
    region: 'VI',
    tooltip: {
      textStyle: {
        fontName: 'Computer Modern Sans',
      }
    }
  };
  var chart = new google.visualization.GeoChart(document.getElementById('virgin_islands'));
  chart.draw(data, options);
}
    