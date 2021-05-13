d3.csv("https://gentarohamada.github.io/InfoVis2021/W08/w08_task03_data.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
        };

        const bar_chart = new BarChart( config, data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

class BarChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.radius = Math.min( self.config.width, self.config.height ) / 2;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height)

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);

        self.pie = d3.pie()
            .value( d => d.value );
      
        self.arc = d3.arc()
            .innerRadius(0)
            .outerRadius(self.radius);

        self.pie_label = d3.arc()
            .innerRadius(self.radius - 60)
            .outerRadius(self.radius - 60);

        self.pie_chart = self.chart.selectAll(".pie")
            .data(self.pie(self.data))
            .enter()
            .append("g")
            .attr("class", "pie")

        // Initialize axis scales
        self.xscale = d3.scaleLinear()
            .range( [0, self.config.width] );

        self.yscale = d3.scaleLinear()
            .range( [0, self.config.height] )

    }

    update() {
        let self = this;

        const xmin = 0;
        const xmax = self.config.width;
        self.xscale.domain( [xmin, xmax] );

        const ymin = 0;
        const ymax = self.config.height;
        self.yscale.domain( [ymin, ymax] );

        self.render();
    }

    render() {
        let self = this;

        self.pie_chart.append("path")
            .attr('d', self.arc)
            .attr('fill', 'black')
            .attr('stroke', 'white')
            .style('stroke-width', '2px');

        self.pie_chart.append("text")
            .attr('fill', 'white')
            .attr("transform", d => `translate(${self.pie_label.centroid(d)})` )
            .attr("dy", "5px")
            .attr("text-anchor", "middle")
            .text( d => d.data.label)
    }
}
