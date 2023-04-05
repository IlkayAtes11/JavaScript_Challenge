// Get the url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

///////////////////////// CHARTS ///////////////////////////////////////

// Creating function
function Chart(id) {
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
      var OTU_top_10 = (samples.otu_ids.slice(0, 10)).reverse();
      console.log(OTU_top_10);
      
      // get the otu id's to the desired form for the plot
      var OTU_id = OTU_top_10.map(d => "OTU " + d)
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
          title: "Top 10 Bacteria Culteres Found",
          height: 500,
          width: 800
      };

      // create the bar chart
      Plotly.newPlot("bar", data, layout);
    
////////////////////// The Bubble Chart  //////////////////////////////

      // create trace variable 
      var trace1 = {
          x: samples.otu_ids,
          y: samples.sample_values,
          mode: "markers",
          marker: {
              size: samples.sample_values,
              color: samples.otu_ids,
              colorscale: "Earth"
          },
          text: samples.otu_labels
      };

      // set the layout
      var layout = {
          title: "Bacteria Cultures Per Sample",
          xaxis:{title: "OTU ID"},
          height: 800,
          width: 1300
      };

      // creating data variable 
      var data = [trace1];

      // create the chart
      Plotly.newPlot("bubble", data, layout); 
    });
  }  

  ////////////////////////// Drop Down Info Box /////////////////////////////////////////

// creating the function to get the data
function Data(id) {
  // data from the url
  d3.json(url).then((data)=> {
      
      // get the metadata
      var metadata = data.metadata;

      // filter meta data
      var metaID = metadata.filter(meta => meta.id.toString() === id)[0];
      var demInfo = d3.select("#sample-metadata");

      // Use `.html("") to clear any existing metadata
      demInfo.html("");

      //get meta data for selected id
      Object.entries(metaID).forEach((id) => {   
              demInfo.append().text(id[0].toUpperCase() +": " +id[1] + "\n");    
      });
  });
}

// create the function for the change event
function optionChanged(id) {
  Chart(id);
  Data(id);
}

// create the function for the initial data rendering
function init() {
  // dropdown menu 
  var dropdownmenu = d3.select("#selDataset");

  // data from the url
  d3.json(url).then((data)=> {
      console.log(data)

      // creating options for dropdown menu
      data.names.forEach(function(name) {
          dropdownmenu.append("option").text(name).property("value");
      });

      Chart(data.names[0]);
      Data(data.names[0]);
  });
}

// Initialize the dashboard
init();
