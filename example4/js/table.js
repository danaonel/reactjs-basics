var ResultsTable = React.createClass({
    getInitialState: function() {
        return {
            year: this.props.children.year,
            amount: this.props.children.amount
        };
    },
    
    /* Life cycle methods */
    componentWillMount: function() {
        console.log(this.state.year, ' will mount');
        this.style = {
            color: this.legendColors.black
        };
    },
    componentDidMount: function() {
        console.log(this.state.year, ' did mount');
        this.style = {
            color: this.legendColors.black
        };
        // JS manipulation is triggered after the component finished initial rendering
        $(this.getDOMNode()).draggable({axis: 'y', containment: '.formTable'});
    },
    componentWillReceiveProps: function(nextProps) {
        console.log(this.state.year, ' will receive next props');
        this.setState({
            year: nextProps.children.year,
            amount: nextProps.children.amount
        });
        this.style = {
            color: this.legendColors.red
        };
        
    },
    // Overwrite shouldComponentUpdate to fine tune the DOM update
    shouldComponentUpdate: function(nextProps, nextState) {
        // this.state is the present state (soon to be old state)
        // nextProps is the new state that will trigger componentWillReceiveProps within which you can change to a new state
        return this.state.amount !== nextProps.children.amount;
    },
    componentWillUpdate: function() {
        console.log(this.state.year, ' will update');
        
        this.style = {
            color: this.legendColors.purple
        };
    },
    componentDidUpdate: function(prevProps, prevState) {
        console.log(this.state.year, ' with key ', this.props.children.id, ' did update' );
        // adding styles doesn't work because the DOM has already been modified
        this.style = {
            color: this.legendColors.green
        };
        // JS manipulation is triggered after the component finished updating and subsequent rendering
        // Any DOM manipulation triggered in componentDidMount method has to be re-triggered here as well
        // Comment out line 54 or line 22 and see when the component becomes draggable 
        $(this.getDOMNode()).draggable({axis: 'y', containment: '.formTable'});
        
        // Be careful with JS that manipulates the DOM
        // When new elements appear in the DOM, reactjs becomes confused when performing the diffing between virtial DOM and real DOM
        // Try to update more than 1 digit at the time. The chart updates correctly, but the paragraph doesn't because it chokes on letterfx
        $(this.getDOMNode()).letterfx({"fx":"wave","letter_end":"rewind","fx_duration":"300ms"});
    },
    // If you delete any element but the last element, you will notice that reactjs thinks the last element will be deleted and it will render the components will brand new props. This speaks to how the data flows from parent component <Form> to child component <Table>
    componentWillUnmount: function() {
        console.log(this.props.children.id, ' will be deleted. ', this.state.id, ' will be deleted.');
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
                ><strong>{this.state.year}</strong> reported <em>${this.state.amount}</em>. Key {this.props.children.id} Index {this.props.index}</p>
            );
    }
});










