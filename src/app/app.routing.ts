import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/notfound.component';




export const routes: Routes = [
  { path: '', redirectTo: 'productlist', pathMatch: 'full', },
  { path: 'productlist', loadChildren: () => import('./home/home.module').then(n => n.HomeModule) },  
  { path: 'shoppingcart', loadChildren: () => import('./shopping_list/shopping-list.module').then(n => n.ShoopingListModule) },  
  
  
  { path: 'not-found', component: NotFoundComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  //imports: [ RouterModule.forRoot( routes,{ useHash: false }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
