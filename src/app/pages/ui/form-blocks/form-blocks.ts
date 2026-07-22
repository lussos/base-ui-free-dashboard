import { Component } from '@angular/core';
import {
  FormBillingComponent,
  FormCartComponent,
  FormCheckoutSummaryComponent,
  FormDeleteAccountComponent,
  FormFeedbackComponent,
  FormFilterComponent,
  FormLoginTabsComponent,
  FormNewsletterComponent,
  FormNotificationsComponent,
  FormPaymentComponent,
  FormReviewComponent,
  FormShippingComponent,
  FormSignupTabsComponent,
  FormSuccessMessageComponent,
  FormTeamInviteComponent,
  FormWizardComponent,
} from 'Base';
import { ShowcasePage, ShowcaseNavSection } from '../showcase-page';
import { ShowcaseSection } from '../showcase-section';

@Component({
  selector: 'app-ui-form-blocks',
  imports: [
    ShowcasePage,
    ShowcaseSection,
    FormBillingComponent,
    FormNotificationsComponent,
    FormFeedbackComponent,
    FormWizardComponent,
    FormTeamInviteComponent,
    FormCartComponent,
    FormCheckoutSummaryComponent,
    FormDeleteAccountComponent,
    FormFilterComponent,
    FormLoginTabsComponent,
    FormNewsletterComponent,
    FormPaymentComponent,
    FormReviewComponent,
    FormShippingComponent,
    FormSignupTabsComponent,
    FormSuccessMessageComponent,
  ],
  templateUrl: './form-blocks.html',
})
export class UiFormBlocks {
  protected readonly sections: ShowcaseNavSection[] = [
    { id: 'billing', label: 'Billing' },
    { id: 'payment', label: 'Payment' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'cart', label: 'Cart' },
    { id: 'checkout', label: 'Checkout summary' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'review', label: 'Review' },
    { id: 'newsletter', label: 'Newsletter' },
    { id: 'team-invite', label: 'Team invite' },
    { id: 'filter', label: 'Filter' },
    { id: 'login-tabs', label: 'Login tabs' },
    { id: 'signup-tabs', label: 'Signup tabs' },
    { id: 'wizard', label: 'Wizard' },
    { id: 'success', label: 'Success message' },
    { id: 'delete-account', label: 'Delete account' },
  ];
}
