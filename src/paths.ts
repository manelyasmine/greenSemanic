export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    tasks: '/dashboard/tasks',
    emissions: '/dashboard/emissions',
    settings: '/dashboard/settings',
    data: '/dashboard/data',
    target: '/dashboard/target',
    report: '/dashboard/report',
    support: '/support',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
