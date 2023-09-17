// Constants for your chart dimensions
const margin = { top: 20, right: 20, bottom: 50, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Create SVG for the chart
const svg = d3.select("#chart-container")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Define your chart's x and y scales (example scales)
const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
const yScale = d3.scaleLinear().domain([0, 2500]).range([height, 0]);

// Create axes
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(xAxis);

svg.append("g")
  .call(yAxis);

// Function to plot a point on the chart
function plotPoint() {
  const pressure = parseFloat(document.getElementById("pressure").value);
  const temperature = parseFloat(document.getElementById("temperature").value);
  const drynessFraction = parseFloat(document.getElementById("drynessFraction").value);

  // Convert pressure and temperature to chart coordinates
  const x = xScale(temperature);
  const y = yScale(pressure);

  // Append a circle representing the point
  svg.append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", 5)
    .attr("fill", "red");

  // Optionally, label the point with the dryness fraction
  svg.append("text")
    .attr("x", x + 10)
    .attr("y", y - 10)
    .text(`DF: ${drynessFraction}`);
}

// Add click event listener to the "Plot Point" button
document.getElementById("plotButton").addEventListener("click", plotPoint);

