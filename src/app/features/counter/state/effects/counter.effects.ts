import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { selectCountUiCurrent } from '..';
import * as commands from '../actions/counter.commands';
import * as events from '../actions/counter.events';
@Injectable()
export class CounterEffects {
  // Turn Events into Commands. "I" (the effect) decides what an event means, what has to happen when that event fires.

  // turn an event into a command
  countIncremented$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(events.incrementClicked),
      map(() => commands.incrementCounterCount())
    );
  });

  countDecremented$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(events.decrementClicked),
      map(() => commands.decrementCounterCount())
    );
  });

  persistCount$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(commands.decrementCounterCount, commands.incrementCounterCount),
      map(() => commands.saveCounterData())
    );
  });

  // these do some work on commands

  saveCounterData$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(commands.saveCounterData),
        concatLatestFrom(() => this.store.select(selectCountUiCurrent)),
        tap(([_, model]) =>
          localStorage.setItem('counter', JSON.stringify(model))
        )
      );
    },
    { dispatch: false }
  );

  // demo$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(tap((a) => console.log(a.type)));
  //   },
  //   { dispatch: false }
  // );

  // This is where we decide if an event happens, what should happen with that event.

  constructor(private actions$: Actions, private store: Store) {}
}

// Observables are a "stream" of things.
// If we want to do something with that stream, we divert it through a "pipe"
// You can put operators in the pipe, they let you do things like change the thing map,
// just do something with that thing, "tap"
