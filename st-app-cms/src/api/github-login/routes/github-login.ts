import { Core } from '@strapi/types';

type Route = Core.RouteInput
type Routes = {
	routes: Route[]
}

export default {
  routes: [
    {
      method: 'POST',
      path: '/github-login',
      handler: 'github-login.create',
      config: {
        policies: ['global::next-server-api-token'],
        auth: false,
      },
    },
  ],
} satisfies Routes
