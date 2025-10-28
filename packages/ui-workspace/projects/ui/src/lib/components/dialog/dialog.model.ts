import { Type } from '@angular/core';

export type DialogParams = TextContentParams | ComponentContentParams;

export type TextContentParams = BaseParams & {
  content: string;
};

type BaseParams = {
  title: string;
  icon?: Type<unknown>;
  /**
   * Called when the user selected something from the alert.
   * @param action The action the user decided to take
   * @param instance The instance of the content given the content
   */
  handleAction?: (
    action: 'confirm' | 'cancel',
  ) => void;
};

export type ComponentContentParams = BaseParams & {
  content: Type<unknown>;
};
