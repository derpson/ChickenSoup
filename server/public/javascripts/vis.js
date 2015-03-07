(function() {
  var w = 1200,
    h = 800,
    maxNodeSize = 50,
    root;
 
  var vis;
  var force = d3.layout.force(); 

  vis = d3.select("body").append("svg");
   
  d3.json("flare.json", function(json) {
   
    root = json;
    root.fixed = true;
    root.x = w / 2;
    root.y = 120;
   
   
          // Build the arrow
    var defs = vis.insert("svg:defs").selectAll("marker")
        .data(["end"]);
   
   
    defs.enter().append("svg:marker")
        .attr("id", "end")               // As explained here: http://www.d3noob.org/2013/03/d3js-force-directed-graph-example-basic.html
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 10)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
      .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");
   
       update();
  });
   
   
  /**
   *   
   */
  function update() {
    var nodes = flatten(root),
        links = d3.layout.tree().links(nodes);
   
    // Restart the force layout.
    force.nodes(nodes)
          .links(links)
          .gravity(0.05)
      .charge(-1500)
      .linkDistance(100)
      .friction(0.5)
      .linkStrength(function(l, i) {return 1; })
      .size([w, h])
      .on("tick", tick)
          .start();
   
     var path = vis.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });
   
      path.enter().insert("svg:path")
        .attr("class", "link")
        .attr("marker-end", "url(#end)")
        .style("stroke", "#ccc");
   
   
    // Exit any old paths.
    path.exit().remove();
   
   
   
    // Update the nodes…
    var node = vis.selectAll("g.node")
        .data(nodes, function(d) { return d.id; });
   
   
    // Enter any new nodes.
    var nodeEnter = node.enter().append("svg:g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .on("click", click)
        .call(force.drag);
   
    // Append a circle
    nodeEnter.append("svg:circle")
        .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5; })
        .style("fill", color);
   
   /*
    * Uncomment this in case you want to have text in your nodes
    // Add text to the node (as defined by the json file) 
    nodeEnter.append("svg:text")
        .attr("text-anchor", "middle")
        .attr("dx", function(d) { return Math.sqrt(d.size) / 10 || 4.5; })
        .attr("dy", ".35em")
        .text(function(d) { return d.name; });
    */
   
    //Add an image to the node (if any)
    nodeEnter.append("svg:image")
          .attr("xlink:href",  function(d) { return d.logo;})
          .attr("x", function(d) { return (0);})
          .attr("y", function(d) { return (0 - (d.logoheight/2)) || -16;})
          .attr("height", function(d) { return d.logoheight || 16;})
          .attr("width", function(d) { return d.logowidth || 16;});
   
   
   
    // Exit any old nodes.
    node.exit().remove();
   
   
    // Re-select for update.
    path = vis.selectAll("path.link");
    node = vis.selectAll("g.node");
   
  function tick() {
   
   
      path.attr("d", function(d) {
   
       var dx = d.target.x - d.source.x,
             dy = d.target.y - d.source.y,
             dr = Math.sqrt(dx * dx + dy * dy);
             return   "M" + d.source.x + "," 
              + d.source.y 
              + "A" + dr + "," 
              + dr + " 0 0,1 " 
              + d.target.x + "," 
              + d.target.y;
    });
      node.attr("transform", nodeTransform);    
    }
  }
   
   
   
   
  /**
   * Gives the coordinates of the border for keeping the nodes inside a frame
   * http://bl.ocks.org/mbostock/1129492
   */ 
  function nodeTransform(d) {
    d.x =  Math.max(maxNodeSize, Math.min(w - (d.logowidth/2 || 16), d.x));
      d.y =  Math.max(maxNodeSize, Math.min(h - (d.logoheight/2 || 16), d.y));
      return "translate(" + d.x + "," + d.y + ")";
     }
   
  /**
   * Color leaf nodes orange, and packages white or blue.
   */ 
  function color(d) {
    return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
  }
   
  /**
   * Toggle children on click.
   */ 
  function click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
   
    update();
  }
   
   
  /**
   * Returns a list of all nodes under the root.
   */ 
  function flatten(root) {
    var nodes = []; 
    var i = 0;
   
    function recurse(node) {
      if (node.children) 
        node.children.forEach(recurse);
      if (!node.id) 
        node.id = ++i;
      nodes.push(node);
    }
   
    recurse(root);
    return nodes;
  } 
})();

