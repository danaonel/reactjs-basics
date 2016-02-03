var ResultsTable = React.createClass({displayName: "ResultsTable",
    getInitialState: function() {
        return {
            year: this.props.children.year,
            amount: this.props.children.amount
        };
    },
    nextId: function() {
        //this.uniqueId = this.uniqueId || 0;
        return this.state.id;
    },
    legendColors: {
        black: '#000000',
        green: '#30805d',
        purple: '#6c3296',
        red: 'red'
    },
    componentWillMount: function() {
        console.log(this.state.year, ' will mount');
        this.style = {
            color: this.legendColors.black
        };
    },
    componentDidMount: function() {
        console.log(this.state.year, ' with key ', this.props.children.id,  ' did mount');
        this.style = {
            color: this.legendColors.black
        };
        $(this.getDOMNode()).draggable({axis: 'y', containment: '.formTable'});
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
        // JS manipulation is triggered after the component updated
        $(this.getDOMNode()).draggable({axis: 'y', containment: '.formTable'});
        //$(this.getDOMNode()).letterfx({"fx":"wave","letter_end":"rewind","fx_duration":"300ms"});
    },    
    shouldComponentUpdate: function(nextProps, nextState) {
        return this.state.amount !== nextProps.children.amount;
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
    componentWillUnmount: function() {
        console.log(this.props.children, ' will be deleted');
    },
    componentDidUnmount: function() {
        console.log(this.props.children, ' will be deleted');
    },
    render: function() {
        return (
            React.createElement("p", {
                ref: "tableData", 
                key: this.props.children.id, 
                style: this.style
                }, React.createElement("strong", null, this.state.year), " reported ", React.createElement("em", null, "$", this.state.amount), "  this.props.data[key].")
            );
    }
});










