$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "costarica_converted.csv",
    dataType: "text",
    success: function(data){plot(data);}
  });
});

var w = 600, h = 500;
var w1 = 580, h1 = 410; //w1=520, h1=410
var margin = {left: 60, top: 30, right: 20, bottom: 60};
var xScale = d3.scale.linear().range([margin.left, w-margin.right]);
var yScale = d3.scale.linear().range([h-margin.bottom, margin.top]);
var xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickFormat(d3.format("d"));
var yAxis = d3.svg.axis().scale(yScale).orient("left");
// var _ = require('underscore')._;
function name() {
    document.getElementById("plot").onclick = plot;

    var svg = d3.select("svg").style({width: w, height: h});
    svg.append("g")
      .attr("class", "x axis")
      .append("text")
      .attr("class", "x label")
      .text("x")
      .attr("font-size", 12)
      .attr("dx", (w-margin.right)/2)
      .attr("dy", "3.8em");

    svg.append("g")
      .attr("class", "y axis")
      .append("text")
      .attr("class", "y label")
      .text("y")
      .attr("font-size", 12)
      .attr("transform", "rotate(-90)")
      .attr("dy", "-3.8em")
      .attr("dx", -(h+margin.top-margin.bottom)/2)
      .attr("text-anchor", "middle");

    svg.append("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue");
}

function plot(data) {
    var svg = d3.select("svg");
    console.log(data);
    var raw = document.getElementById("csv").value;
    var data = d3.csv.parse(data); //"Korea_Fertility.csv"

    var keys = Object.keys(data[0]);
    var xExtent = d3.extent(data, function(e) { return +e[keys[0]]; });
    var yExtent = d3.extent(data, function(e) { return +e[keys[1]]; });

    xScale.domain(xExtent).nice();
    yScale.domain(yExtent).nice();

    xAxis.scale(xScale);
    yAxis.scale(yScale);

    d3.select(".x.axis")
      .attr("transform", "translate(0,"+yScale.range()[0]+")")
      .call(xAxis);
    d3.select(".y.axis")
      .attr("transform", "translate("+xScale.range()[0]+",0)")
      .call(yAxis);

    d3.select(".x.label").text(keys[0]);
    d3.select(".y.label").text(keys[1]);

    var line = d3.svg.line();
    line
      .x(function(d) { return xScale(d[keys[0]]); })
      .y(function(d) { return yScale(d[keys[1]]); });

    svg.select(".line").datum(data).attr("d", line);

    var points = svg.selectAll(".point").data(data);

    points.enter()
      .append("circle")
      .attr("class", "point")
      .attr("r", 1.5)
      .attr("fill", "steelblue")
      .attr("stroke", "steelblue");

    points.exit().remove();

    points
      .attr("cx", function(d){ return xScale(d[keys[0]]); })
      .attr("cy", function(d){ return yScale(d[keys[1]]); });
}

name();


// const w = 600; //800
// const h = 440; //400

const datalen = 15;
let svg = d3.select("svg")
  .attr("width",w1)
  .attr("height",h1);
  // .style.paddingLeft = "150px";

let background = svg.append("rect")
  .attr("class","background")
  .attr("width",w1)
  .attr("height",h1)
  .attr("x", 60)
  .attr("y",30);
  // .attr("x", 150);
  // .attr("dy", "3.8em");;
  // .attr("padding", "100px 0px 0px 0px");
// document.getElementById("background").style.backgroundPosition = "200px 40px";;

// let bands = svg.append("g")

// bands.selectAll("rect.band")
//   .data(_.range(datalen))
//   .enter()
//   .append("rect")
//   .attr("height",h)
//   .attr("width",w/datalen)
//   .attr("class","band")
//   .attr("x",d=>d*w/datalen);

// window.alert("YES");
let line1 = d3.svg.line()
  .x(d=>d[0])
  .y(d=>d[1]);
  // window.alert("NO");

let pathdata = {};
let path = svg.append("path")
  .attr("class","yourpath");


background

  .on("click",()=>{
    // window.alert(d3.event.offsetX);

    background
      .on("mousemove",function(d,i){
        position = Math.round(d3.event.offsetX / (w1 / datalen));
        pathdata[position] = [position * w1 / datalen, d3.mouse(this)[1]];
        path.datum(_.values(pathdata)).attr("d",line1);

      })
      .on("dblclick",()=>{
        background
          .on("mousemove",null)
      });

  });
