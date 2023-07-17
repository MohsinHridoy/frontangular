import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { Error500Component } from './pages/error500/error500.component';
import { AdminLayoutsComponent } from './shared/components/layouts/administrative-content/admin-layouts/admin-layouts.component';
import { ClientLayoutsComponent } from './shared/components/layouts/Client-content/client-layouts/client-layouts.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [

  { path: '', redirectTo: '/auth', pathMatch: 'full' },

  {
    path: 'auth', component: AuthLayoutComponent,

    children: [
      {
        path: '', loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },

  {

    path: "admin", component: AdminLayoutsComponent, canActivate: [AuthGuard],

    children: [

      {
        path: 'stat', loadChildren: () => import('./views/pages/stat/stat.module').then(m => m.StatModule),canActivate: [AuthGuard],
      },

      {
        path: 'users', loadChildren: () => import('./views/pages/users/users.module').then(m => m.UsersModule),canActivate: [AuthGuard],
      },

      {
        path: 'profile', loadChildren: () => import('./views/pages/profile/profile.module').then(m => m.ProfileModule),canActivate: [AuthGuard]
      },
      { path: 'modules', loadChildren: () => import('./views/pages/module/module.module').then(m => m.ModuleModule) ,canActivate: [AuthGuard]
    }
      ,
      {
        path: 'role', loadChildren: () => import('./views/pages/roles/roles.module').then(m => m.RolesModule),canActivate: [AuthGuard]
      },
      {
        path: 'licenses', loadChildren: () => import('./views/pages/license/license.module').then(m => m.LicenseModule),canActivate: [AuthGuard]
      },
      {
        path: 'products', loadChildren: () => import('./views/pages/products/products.module').then(m => m.ProductsModule),canActivate: [AuthGuard]
      },
      {
        path: 'history', loadChildren: () => import('./views/pages/history/history.module').then(m => m.HistoryModule),canActivate: [AuthGuard]
      },
      {
        path: 'log', loadChildren: () => import('./views/pages/log/log.module').then(m => m.LogModule),canActivate: [AuthGuard]
      }
    ]

  },
  { path: "user", component: ClientLayoutsComponent ,canActivate: [AuthGuard],
  
  children: [

    {
      path: 'products', loadChildren: () => import('./client-views/product/product.module').then(m => m.ProductModule),canActivate: [AuthGuard],
    },

    {
      path: 'contact-Us', loadChildren: () => import('./client-views/contact/contact.module').then(m => m.ContactModule),canActivate: [AuthGuard],
    },
  ]
 
}, {
    "path": "error404",
    "component": Error404Component
  },
  {
    "path": "error500",
    "component": Error500Component
  },
  {
    "path": "**",
    "redirectTo": "error404",
    "pathMatch": "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
