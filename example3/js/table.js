var ResultsTable = React.createClass({
    // getInitialState: function() {
    //     return {
    //         year: this.props.children.year,
    //         amount: this.props.children.amount
    //     };
    // },
    
    /* Life cycle methods */
    componentWillMount: function() {
        console.log(this.props.children.year, ' will mount');
        this.style = {
            color: this.legendColors.black
        };
    },
    componentDidMount: function() {
        console.log(this.props.children.year, ' with key ', this.props.children.id,  ' did mount');
        this.style = {
            color: this.legendColors.black
        };
        // JS manipulation is triggered after the component finished initial rendering
        $(this.getDOMNode()).draggable({axis: 'y', containment: '.formTable'});
    },
    componentWillReceiveProps: function(nextProps) {
        console.log(this.props.children.year, ' will receive next props');
        // this.setState({
        //     year: nextProps.children.year,
        //     amount: nextProps.children.amount
        // });
        this.style = {
            color: this.legendColors.red
        };
        
    },
    
    /* shouldComponentUpdate must return a boolean */
    shouldComponentUpdate: function(nextProps, nextState) {
        return this.props.children.amount !== nextProps.children.amount;
    },
    componentWillUpdate: function() {
        console.log(this.props.children.year, ' will update');
        this.style = {
            color: this.legendColors.purple
        };
    },
    componentDidUpdate: function(prevProps, prevState) {
        console.log(this.props.children.year, ' with key ', this.props.children.id, ' did update' );
        
        // adding styles doesn't work because the DOM has already been updated and it requires a state change to update again
        this.style = {
            color: this.legendColors.green
        };
        
        // JS manipulation is triggered after the component finished updating and subsequent rendering
        $(this.getDOMNode()).draggable({axis: 'y', containment: '.formTable'});
        
        // Be careful with JS that manipulates the DOM
        // When new elements appear in the DOM, reactjs becomes confused when performing the diffing between virtial DOM and real DOM
        // Try to update more than 1 digit at the time. The chart updates correctly, but the paragraph doesn't because it chokes on letterfx
        $(this.getDOMNode()).letterfx({"fx":"wave","letter_end":"rewind","fx_duration":"300ms"});
    }, 
    componentWillUnmount: function() {
        console.log(this.props.children, ' will be deleted');
    },
    
    /* Custom methods/objects */
    legendColors: {
        black: '#000000',
        green: '#30805d',
        purple: '#6c3296',
        red: 'red'
    },
    
    /* Render method */
    render: function() {
        return (
            <p 
                ref="tableData"
                key={this.props.children.id}
                style={this.style}
                ><strong>{this.props.children.year}</strong> reported <em>${this.props.children.amount}</em>.</p>
            );
    }
});










