// Get the url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Creating function
function getChart(id) {
  // data from the url
  d3.json(url).then(function(data) {
      console.log(data)
      
      // filter sample values by id 
      var samples = data.samples.filter(s => s.id.toString() === id)[0];
      
      console.log(samples);

      // Getting the top 10 
      var samplevalues = samples.sample_values.slice(0, 10).reverse();
      console.log(samplevalues);

      // get only top 10 otu ids for the plot OTU and reversing it. 
      var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
      console.log(OTU_top);
      
      // get the otu id's to the desired form for the plot
      var OTU_id = OTU_top.map(d => "OTU " + d)
      console.log(OTU_id);

       // get the top 10 labels for the plot
      var labels = samples.otu_labels.slice(0, 10);
      console.log(labels);

     ////////////////////////////Bar Chart/////////////////////////
     
     // create trace variable
      var trace = {
          x: samplevalues,
          y: OTU_id,
          text: labels,
          type:"bar",
          orientation: "h",
      };

      // create data variable
      var data = [trace];

      // create layout variable
      var layout = {
          title: "Top 10 OTU Samples",
      };

      // create the bar chart
      Plotly.newPlot("bar", data, layout);
    
      //////////////////////////////// The bubble chart////////////////////////////////////////////////

      // create trace variable 
      var trace1 = {
          x: samples.otu_ids,
          y: samples.sample_values,
          mode: "markers",
          marker: {
              size: samples.sample_values,
              color: samples.otu_ids
          },
          text: samples.otu_labels
      };

      // set the layout
      var layout = {
          xaxis:{title: "OTU ID"},
          height: 800,
          width: 1200
      };

      // creating data variable 
      var data = [trace1];

      // create the chart
      Plotly.newPlot("bubble", data, layout); 
    });
  }  

  /////////////////////////////////////Demographic Info/////////////////////////////////////////

// creating the function to get the data
function getData(id) {
  // data from the url
  d3.json(url).then((data)=> {
      
      // get the metadata
      var metadata = data.metadata;

      // filter meta data
      var metaID = metadata.filter(meta => meta.id.toString() === id)[0];
      var demographicInfo = d3.select("#sample-metadata");

      //get meta data for selected id
      Object.entries(metaID).forEach((id) => {   
              demographicInfo.append().text(id[0] + ": " + id[1] + "\n");    
      });
  });
}

// create the function for the change event
function optionChanged(id) {
  getChart(id);
  getData(id);
}

// create the function for the initial data rendering
function init() {
  // dropdown menu 
  var dropdown = d3.select("#selDataset");

  // data from the url
  d3.json(url).then((data)=> {
      console.log(data)

      // creating options for dropdown menu
      data.names.forEach(function(name) {
          dropdown.append("option").text(name).property("value");
      });

      getChart(data.names[0]);
      getData(data.names[0]);
  });
}

init();
