import { HTMLAttributes, MouseEventHandler, ReactNode } from "react";

export interface Tab<TabId = string> {
  id: TabId;
  content?: ReactNode;
}

export interface TabsProps<TabId = string> extends HTMLAttributes<HTMLUListElement> {
  tabs: Array<Tab<TabId>>;
  selectedId?: string;
  onClickTab?: MouseEventHandler<HTMLLIElement>;
}
