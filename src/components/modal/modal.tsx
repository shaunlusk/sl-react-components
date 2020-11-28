import * as React from 'react';

export interface IModalProps {
  handleClose(): void;
  show?: boolean;
  buttonText: string;
  title:string;
}

export class Modal extends React.Component<IModalProps, any> {
  private _showHideClassName(): string {
    return this.props.show ? 'slrc-modal slrc-modal-display-block' : 'slrc-modal slrc-modal-display-none';
  }

  public render() {
    return <div className={this._showHideClassName()}>
        <div className="slrc-modal-main">
          <div className="slrc-modal-title">{this.props.title}</div>
          <div className="slrc-modal-content">{this.props.children}</div>
          <div className="slrc-modal-buttons">
            <button className="slrc-modal-button" onClick={() => this.props.handleClose()}>{this.props.buttonText}</button>
          </div>
        </div>
      </div>;
  }
}
