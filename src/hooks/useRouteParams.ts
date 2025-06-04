import { useParams, useNavigate } from 'react-router-dom';

interface RouteParams {
  [key: string]: string;
}

export const useRouteParams = <T extends RouteParams>(
  params: T,
  validator: (params: T) => boolean,
  redirectPath: string = '/'
): T => {
  const routeParams = useParams() as T;
  const navigate = useNavigate();

  if (!validator(routeParams)) {
    navigate(redirectPath, { replace: true });
    throw new Error('Invalid route parameters');
  }

  return routeParams;
};

// Validators
export const movieIdValidator = (params: { id: string }): boolean => {
  return Boolean(params.id && /^\d+$/.test(params.id));
}; 