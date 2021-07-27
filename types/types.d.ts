export type LayoutProps = {
  children: JSX.Element;
  title: string;
  selectedKey: string[];
};

export type LayoutOptions = {
  title: string;
  path: string;
  icon: JSX.Element;
};

export type MainProps = {
  children: JSX.Element;
  title: string;
};
