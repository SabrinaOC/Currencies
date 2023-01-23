import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForexLandingPageComponent } from './pages/forex-landing-page/forex-landing-page.component';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { RouterModule } from '@angular/router';
import { routes } from './forex.routing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const loader = ['en', 'es'].reduce((acc, lang) => {
  acc[lang] = () => import(`./i18n/forex.${lang}.json`);
  return acc;
}, {});

@NgModule({
  declarations: [
    ForexLandingPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'forex',
        loader
      }
    }
  ],
})
export class ForexModule { }
