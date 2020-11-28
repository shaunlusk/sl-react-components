import * as React from 'react';

export interface ITabProps {
  label: string;
}

export class Tab extends React.Component<ITabProps, any> {
  public render() {
    return <div className="slrc-tab-content">{this.props.children}</div>
  }
}
