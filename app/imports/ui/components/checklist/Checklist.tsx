import React from 'react';
import { Segment } from 'semantic-ui-react';
import { ChecklistState } from '../../../api/checklist/ChecklistState';

/**
 * Base class for all checklist items.
 */
export class Checklist {
  private name: string;

  protected state: ChecklistState;

  constructor(name: string) {
    this.name = name;
  }

  /**
   * Updates the state of this Checklist.
   * @protected
   */
  protected updateState() {
    this.state = 'Improve';
  }

  public getState() {
    return this.state;
  }

  /**
   * Returns the name of the checklist.
   * @return {string}
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Returns the title of the checklist item.
   * @return {JSX.Element}
   */
  public getTitle(): JSX.Element {
    return <React.Fragment />;
  }

  /**
   * Returns the description section of the checklist item.
   * @return {JSX.Element}
   */
  public getDescription(): JSX.Element {
    return <React.Fragment />;
  }

  /**
   * Returns the details section of the checklist item.
   * @return {JSX.Element}
   */
  public getDetails(): JSX.Element {
    return <React.Fragment />;
  }

  public getActions(): JSX.Element {
    return <React.Fragment />;
  }

  public getChecklistItem(): JSX.Element {
    return (
      <Segment id={`checklist-${this.name}`}>
        {this.getTitle()}
        {this.getDescription()}
        {this.getDetails()}
        {this.getActions()}
      </Segment>
    );
  }

}
