import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';

import { ToastComponent } from './shared/toast/toast.component';
import { FamilyTreeComponent } from './family-tree/family-tree.component';
import { NodeEditorComponent } from './node-editor/node-editor.component';
import { PersonNodeComponent } from './person-node/person-node.component';
import { NodeCreatorComponent } from './node-creator/node-creator.component';

const routing = RouterModule.forRoot([
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home',  component: FamilyTreeComponent }
]);

@NgModule({
  declarations: [
    AppComponent,
    ToastComponent,
    FamilyTreeComponent,
    NodeEditorComponent,
    PersonNodeComponent,
    NodeCreatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    DataService,
    ToastComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
