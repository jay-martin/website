/*
function exportChartToPng(chartID){
  //fix weird back fill
  d3.select('#'+chartID).selectAll("path").attr("fill", "none");
  //fix no axes
  d3.select('#'+chartID).selectAll("path.domain").attr("stroke", "black");
  //fix no tick
  d3.select('#'+chartID).selectAll(".tick line").attr("stroke", "black");
  var svgElement = $('#'+chartID).find('svg')[0];
  saveSvgAsPng(svgElement, chartID+'.png');
}
*/

/*
function create_png(){
  console.log('in function');
  d3.selectAll("path").attr("fill", "none");
  d3.selectAll(".tick line, path.domain").attr("stroke", "black");
  var $container = $('#chart'),
      // Canvg requires trimmed content
      content = $container.html().trim(),
      canvas = document.getElementById('svg-canvas');
    // Draw svg on canvas
    Canvg(canvas, content);
}
*/


/* 
$("#save-btn").click(function() {
      $("#chart").get(0).toBlob(function(blob) {
        saveAs(blob, "chart_1.png");
    });
});
*/

/*
var btn = document.querySelector('button');
var svg = document.getElementById('test_svg');
var canvas = document.querySelector('canvas');

function triggerDownload (imgID) {
  var a = document.createElement('a');
  a.setAttribute('download', 'MY_COOL_IMAGE.png');
  a.setAttribute('href', imgID);
  a.setAttribute('target', '_blank');
}

function create_png() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var data = (new XMLSerializer()).serializeToString(svg);
  var DOMURL = window.URL || window.webkitURL || window;

  var img = new Image();
  var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
  var url = DOMURL.createObjectURL(svgBlob);

  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url);

    var imgURI = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');

    triggerDownload(imgURI);
  };

  img.src = url;
}
*/