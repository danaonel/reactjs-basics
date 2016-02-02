var Form = React.createClass({
    fields: [
        {
            field1: 'First Name'
        },
        {
            fields2: 'Last Name'
        }
    ],
    renderFields: function(value, i) {
        return (
            <Field 
                index={i}
                >{value}</Field>
        );
    },
    render: function() {
        return (<div className="form">
            {this.fields.map(this.renderFields)}
            More props children
            </div>
        );
    }
});
                