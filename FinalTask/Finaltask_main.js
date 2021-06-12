let input_data;
let scatter_plot;
let bar_chart;
let filter = [];

d3.csv("https://gentarohamada.github.io/InfoVis2021/FinalTask/Finaltask_data.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.people_2020 = +d.people_2020;
            d.people_2021 = +d.people_2021;
            d.deviation_value = +d.deviation_value;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['private','national','public']);

        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 512,
            height: 512,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: '2020',
            ylabel: '2021',
            cscale: color_scale
        }, input_data );
        scatter_plot.update();

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 512,
            height: 512,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'The number of University(2020+2021)',
            cscale: color_scale
        }, input_data );
        bar_chart.update();

        bar_chart2 = new BarChart2( {
            parent: '#drawing_region_barchart2',
            width: 512,
            height: 512,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'The number of People(2020+2021)',
            cscale: color_scale
        }, input_data );
        bar_chart2.update();
    })
    .catch( error => {
        console.log( error );
    });

function Filter() {
    if ( filter.length == 0 ) {
        scatter_plot.data = input_data;
    }
    else {
        scatter_plot.data = input_data.filter( d => filter.includes( d.species ) );
    }
    scatter_plot.update();
}
