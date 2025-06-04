export interface RouteConfig {
  path: string;
  element: React.LazyExoticComponent<React.ComponentType>;
  errorElement?: React.ReactNode;
  children?: RouteConfig[];
}

export type AppRoutes = RouteConfig[];

export interface RouterError {
  status?: number;
  message: string;
} 