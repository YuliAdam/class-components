import React, { type ChangeEvent, type KeyboardEvent } from 'react';

interface Props {
  className: string;
  placeholder: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export default class Input extends React.Component<Props> {
  render() {
    return <input {...this.props} />;
  }
}
