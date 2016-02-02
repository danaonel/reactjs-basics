var Form = React.createClass({
    propTypes: {
        count: function(props, propName) {
            if (typeof props[propName] !== "number"){
                return new Error('The count property must be a number');
            }
            if (props[propName] > 100) {
                return new Error("Creating " + props[propName] + " notes is ridiculous");
            }
        }
    },
    getInitialState: function() {
        return {
            years: [],
            chartType: 'line',
            total: 0
        };
    },
    
    /* Life Cycle methods */    
    componentWillMount: function() {
        /* Use componentWillMount to get JSON data */
        var self = this;
        $.getJSON("data/data.json", function(results){
            
            var data = results.data;
            
            data.forEach(function(data){
                var year = data.year
                    , amount = data.amount
                    ;
                self.add(year, amount);
            });
        });
    },
    componentDidUpdate: function() {
        
        var dataChartArr = []
            , p = this.state.years
            , chartType = this.state.chartType
            ;
        p.forEach(function(year){
            dataChartArr.push({
                x: parseInt(year.year),
                y: parseInt(year.amount),
                label: year.year,
                indexLabel: "$" + year.amount
            });
        });
        
        var chartData = dataChartArr;
        
        var chartCanvas = new CanvasJS.Chart("chartContainer", {
            theme: "theme2",
            title: {
                text: "Chart"
            },
            animationEnabled: true,
            axisX: {
              title: "Year"
            },
            axisY:{
              title: "Total Amount"
            },
            data: [
              {
                  type: chartType,
                  toolTipContent: "<span style='\"'color: {color};'\"'><strong>{label}:</strong></span> <strong> {indexLabel} </strong>",
                  lineThickness: 3,
                  dataPoints: chartData
              }
            ]
        });
        chartCanvas.render();
    },
    
    /* Custom methods */
    add: function(year, amount) {
        var arr = this.state.years
            , totalYears
            ;
            
        arr.push({
            id: this.nextId(),
            year: year,
            amount: amount
        });
        
        arr.sort(function(a, b) {
            return parseFloat(a.year) - parseFloat(b.year);
        });
        
        totalYears = arr.length;
        
        this.setState({
            years: arr, 
            total: totalYears
        });
    },
    update: function(newAmount, i) {
        var arr = this.state.years;
        arr[i].amount = newAmount;
        this.setState({years:arr});
    },
    remove: function(i) {
        var arr = this.state.years
            , totalYears
            ;
            
        arr.splice(i, 1);
        totalYears = arr.length;
        
        this.setState({
            years: arr, 
            total: totalYears
        });
    },
    updateChartType: function(event) {
        var chartSelectVal = event.target.value;
        this.setState({chartType: chartSelectVal});
    },
    addNewYear: function() {
        var newYearValue = this.refs.newYear.getDOMNode().value
            , newAmountValue = this.refs.newAmount.getDOMNode().value
            , defaultNewValue = 0
            , yearsArr = this.state.years
            ;

        if (this.state.total >= this.props.maxCount ) {
            alert( "This is getting ridiculous. ", this.props.maxTotal, ' is enough.' );
            return;
        }
        if ( newYearValue === '' || newYearValue === 'Year' ) {
            alert( "Enter Year" );
            return;
        }
        if ( newAmountValue === null ) {
            newAmountValue = 0;
        }
        var found = yearsArr.some(function (el) {
            return el.year === newYearValue;
        });
        if ( found ) {
            alert( newYearValue + " already exists." );
        } else {
            this.add(newYearValue, newAmountValue);
        }
            
        
    },
    eachYear: function(year, i) {
        return (
            <InputField
                index={i}
                onChange={this.update}
                onRemove={this.remove}
            >{year}</InputField>
            );
    },
    renderTable: function(year, i) {
        return (
            <ResultsTable 
                index={i}
                >{year}</ResultsTable>
        );
    },
    nextId: function() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    },
    
    /* Render method */
    render: function() {
            return (<div className="form"
                        key="app"
                        ref="myApp">
                        <div className="formFields">
                            <h2>Chart Generator</h2>
                            {this.state.years.map(this.eachYear)}
                            <p><input className="newYear" ref="newYear" defaultValue="Year" type="text"/> 
                                <input className="newAmount" ref="newAmount" defaultValue="Amount" type="text"/> 
                                <button className="add-btn" onClick={this.addNewYear}>Add New Year</button>
                            </p>
                            <p>
                                <label for="chartType">Chart</label>
                                <span className="selectInput">
                                  <select key="chartType" onChange={this.updateChartType}>
                                    <option value="line">Line</option>
                                    <option value="bar">Bar</option>
                                    <option value="pie">Pie</option>
                                    <option value="doughnut">Doughnut</option>
                                  </select>
                                </span>
                            </p>
                    
                        </div>
                        <div className="formTable" ref="formTable">
                            <h4>Table component</h4>
                            {this.state.years.map(this.renderTable)}
                        </div>
                    </div>
        );
    }
});