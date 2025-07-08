import React from 'react';

interface Props {
  className: string;
  placeholder: string;
  type: string;
  id: string;
  onChange: () => void;
}
interface State {
  value: string;
}

export default class Input extends React.Component<Props, State> {
  public state: State = {
    value: '',
  };

  render() {
    return <input {...this.props} value={this.state.value} />;
  }
}
