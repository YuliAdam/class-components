import React from 'react';

interface Props {
  text: string;
  onClick: () => void;
}

export default class Button extends React.Component<Props> {
  render() {
    return <button onClick={this.props.onClick}>{this.props.text}</button>;
  }
}
