d3.csv("https://gentarohamada.github.io/InfoVis2021/W10/w10_task01_data.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 512,
            margin: {top:10, right:10, bottom:20, left:100}
        };

        const bar_chart = new BarChart( config, data );
        bar_chart.update();
        d3.select('#reverse')
            .on('click', d => {
                data.reverse();
                bar_chart.update();
            });
        d3.select('#ascend')
            .on('click', d => {
                data.sort((a, b) => a.value - b.value);
                bar_chart.update();
            });
        d3.select('#descend')
            .on('click', d => {
                data.sort((a, b) => b.value - a.value);
                bar_chart.update();
            });
    })
    .catch( error => {
        console.log( error );
    });

class BarChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 128,
            margin: config.margin || {top:10, right:10, bottom:20, left:60}
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        // Initialize axis scales
        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleBand()
            .range( [0, self.inner_height] )
            .paddingInner(0.1);

        // Initialize axes
        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft( self.yscale )
            .tickSizeOuter(0);

        // Draw the axis
        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`)

        self.yaxis_group = self.chart.append('g')

    }

    update() {
        let self = this;

        const xmin = 0;
        const xmax = d3.max( self.data, d => d.value );
        self.xscale.domain( [xmin, xmax] );

        self.yscale.domain(self.data.map(d => d.label));

        self.chart.selectAll("rect")
            .data(self.data)
            .join("rect")
            .transition().duration(1000)
            .attr("x", 0)
            .attr("y", d => self.yscale(d.label))
            .attr("width", d => self.xscale(d.value))
            .attr("height", self.yscale.bandwidth());

        self.render();
    }

    render() {
        let self = this;

        self.xaxis_group
            .call( self.xaxis );
        
        self.yaxis_group
            .call( self.yaxis );

    }
}
