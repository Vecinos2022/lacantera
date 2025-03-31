export interface route {
  icon?: React.ElementType; // Icon component
  title: string;
  route: string | null;
  childRoutes?: route[];

  show?: boolean; // Whether to show the route in the navbar
}
