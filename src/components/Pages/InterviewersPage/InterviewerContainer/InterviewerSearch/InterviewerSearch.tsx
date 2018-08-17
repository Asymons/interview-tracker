import * as React from 'react';
import SearchBar from '../../../../Shared/SearchBar/SearchBar';
import './InterviewerSearch.scss';

interface InterviewerSearchProps {
    searchFilter: (text: string) => void;
}

class InterviewerSearch extends React.Component<InterviewerSearchProps> {

    render() {
        return (
            <div className="interviewer-search">
                <SearchBar onChange={this.props.searchFilter}/>
            </div>
        );
    }
}

export default InterviewerSearch;