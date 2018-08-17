import * as React from 'react';
import { TextField } from 'material-ui';

interface SearchBarProps {
    onChange: (textField: string) => void;
}

interface SearchBarState {
    searchField: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {

    constructor(props: SearchBarProps) {
        super(props);
        this.state = {
            searchField: '',
        };

        this._updateSearchField = this._updateSearchField.bind(this);
    }

    _updateSearchField(event: any) {
        this.setState({
            searchField: (event.target as HTMLInputElement).value,
        });
        this.props.onChange((event.target as HTMLInputElement).value);
    }

    render() {
        return (
            <div className="search-bar">
                <TextField
                    name="input-field"
                    className="input-field"
                    type="text"
                    hintText="Search"
                    value={this.state.searchField}
                    fullWidth={true}
                    onChange={this._updateSearchField}
                    underlineStyle={{margin: 1}}
                />
            </div>
        );
    }

}

export default SearchBar;