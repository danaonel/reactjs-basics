/* Stateless component - UI does not change once the component is mounted on the page */
var InputField = React.createClass({
    /* Custom methods */
    update: function() {
        this.props.onChange(this.refs.newAmount.getDOMNode().value, this.props.index);
    },
    remove: function() {
        this.props.onRemove(this.props.index);
    },
    
    /* Render method */
    render: function() {
        return (
            <p><label for={this.props.children.id}>{this.props.children.year}</label>
                <input key={this.props.children.id}
                    ref="newAmount"
                    defaultValue={this.props.children.amount}
                    onChange={this.update}
                    type="text"/>
                    <button onClick={this.remove} className="remove-btn">X</button>
                    </p>
            );
    }
});










