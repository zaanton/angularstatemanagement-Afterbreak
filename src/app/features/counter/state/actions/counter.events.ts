import { createAction } from '@ngrx/store';
// Event actions often come from components. They are just saying "This happened".
// Naming is a past-tense description of some event that happened.
// usually come from components.
// They often mean that something needs to happen - something that needs to happen is a "command".
// Commands often turn into documents.


// So, for example, we might say
// Here's what our component knows - "incrementClicked"
// Effect that decides for now that incrementClicked means we should save the state to localStorage.


export const incrementClicked = createAction(
  '[counter event] increment button clicked'
);

export const decrementClicked = createAction(
  '[counter event] decrement button clicked'
);
