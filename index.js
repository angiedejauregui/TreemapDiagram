const pledgesURl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
const movieURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
const videoGameURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

d3.json(movieURL).then((data, error) => {
  if (error) {
    console.log(error);
  } else {
    const movieData = data;
    console.log(movieData);

    const hierarchy = d3
      .hierarchy(movieData, (node) => node.children)
      .sum((node) => node.value)
      .sort((node1, node2) => node2.value - node1.value); // ponde primero el valor mas grande

    const moviTiles = hierarchy.leaves();
    console.log(moviTiles);

    const width = 1000;
    const height = 600;
    const padding = 60;

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
  

    const createTreeMap = d3.treemap().size([width, height]);
    createTreeMap(hierarchy);

    const block = svg.selectAll("g").data(moviTiles).enter().append("g").attr("transform", (movie) => {
        return `translate(${movie.x0}, ${movie.y0})`
    });

    block
      .append("rect")
      .attr("class", "tile")
      .attr("fill", (movie) => {
        const category = movie.data.category;
        if (category === "Action") {
          return "orange";
        } else if (category === "Drama") {
          return "lightgreen";
        } else if (category === "Adventure") {
          return "crimson";
        } else if (category === "Family") {
          return "steelblue";
        } else if (category === "Animation") {
          return "pink";
        } else if (category === "Comedy") {
          return "khaki";
        } else if (category === "Biography") {
          return "tan";
        }
      })
      .attr("data-name", (movie) => movie.data.name)
      .attr("data-category", (movie) => movie.data.category)
      .attr("data-value", (movie) => movie.data.value)
      .attr("width", (movie) => movie.x1 - movie.x0)
      .attr("height", (movie) => movie.y1 - movie.y0)

    block.append("text")
      .text((movie) => movie.data.name)
      .attr("x", 5)
      .attr("y", 20)
    
    block.on("mouseover", function(e, movie) {
        const tooltip = d3.select("#tooltip")

        tooltip
                .style("opacity", 0.9)
                .style("left", e.pageX + 10 + "px")
                .style("top", e.pageY + 10 + "px") 
                .style("font-size", "14px");

            tooltip
                .attr("data-value", movie.data.value)
                .html(`Name: ${movie.data.name} <br/> Category: ${movie.data.category} <br/> Value: ${movie.data.value}`);
        }) 

        .on("mouseout", function(e) {
            d3.select("#tooltip").style("opacity", 0);
        })

        const tooltip = d3
            .select("body")
            .append("div")
            .attr("id", "tooltip")
            .style("opacity", "0")
            .style("position", "absolute")
            .style("background-color", "rgba(0, 0, 0, 0.8")
            .style("color", "#fff")
            .style("padding", "10px")

  }
});
