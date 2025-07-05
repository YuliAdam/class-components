import React from 'react';

interface Props {
  text: string;
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
    return <input onChange={this.props.onChange}>{this.state.value}</input>;
  }
}
