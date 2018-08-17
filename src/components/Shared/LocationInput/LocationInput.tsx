import * as React from 'react';
import { TextField } from 'material-ui';

type LocationInputProps = {
    location: string;
    onChangeLocation: (event: any, value: string) => void;
};

class LocationInput extends React.Component<LocationInputProps> {
    render() {
        const {location, onChangeLocation} = this.props;
        return (
            <div className="location-input">
                <TextField value={location} onChange={onChangeLocation} hintText="Location"/>
            </div>
        );
    }
}

export default LocationInput;