var Form = React.createClass({displayName: "Form",
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
            React.createElement(Field, {
                index: i
                }, value)
        );
    },
    render: function() {
        return (React.createElement("div", {className: "form"}, 
            this.fields.map(this.renderFields), 
            "More props children"
            )
        );
    }
});
                